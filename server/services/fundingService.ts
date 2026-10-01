import { getDb, type DbClient } from '../db/database.ts';
import { walletService } from './walletService.ts';

export interface CreateFundingRequestInput {
  userId: number;
  amountNaira: number;
  transferReference?: string;
  proofImageUrl?: string;
  senderName?: string;
  senderBank?: string;
}

/**
 * Generates an automatic unique internal funding reference:
 * Format: DF-YYYYMMDD-XXXXXX
 */
export function generateFundingReference(): string {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(now.getUTCDate()).padStart(2, '0');
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `DF-${yyyy}${mm}${dd}-${randomSuffix}`;
}

export class FundingService {
  /**
   * User creates a manual bank transfer funding request.
   * DOES NOT credit wallet automatically! Request starts as PENDING.
   * Neither transferReference nor proofImageUrl is required.
   */
  public async createRequest(input: CreateFundingRequestInput) {
    const db = await getDb();
    const amountNaira = Number(input.amountNaira);

    // Validate that amount is greater than 0
    if (isNaN(amountNaira) || amountNaira <= 0) {
      throw new Error('Please enter a valid funding amount greater than ₦0.00');
    }

    const amountKobo = Math.round(amountNaira * 100);
    const internalReference = generateFundingReference();

    // Fetch existing bank settings to associate with this request
    const settingsRes = await db.query(
      'SELECT bank_name, account_number, account_name FROM app_settings WHERE id = 1'
    );
    const settings = settingsRes.rows[0] || {};
    const bankName = settings.bank_name || 'Moniepoint Microfinance Bank';
    const accountName = settings.account_name || 'DataHub Enterprise / Tech Services';
    const accountNumber = settings.account_number || '8145239012';

    // Optional customer inputs
    const transferRef = input.transferReference?.trim() || null;
    const proofUrl = input.proofImageUrl?.trim() || null;
    const senderName = input.senderName?.trim() || null;
    const senderBank = input.senderBank?.trim() || null;

    const res = await db.query(`
      INSERT INTO funding_requests (
        reference, internal_reference, user_id, amount_kobo, currency,
        bank_name, account_name, account_number,
        sender_name, sender_bank, transfer_reference, proof_image_url,
        status
      ) VALUES ($1, $1, $2, $3, 'NGN', $4, $5, $6, $7, $8, $9, $10, 'pending')
      RETURNING *
    `, [
      internalReference,
      input.userId,
      amountKobo,
      bankName,
      accountName,
      accountNumber,
      senderName,
      senderBank,
      transferRef,
      proofUrl
    ]);

    const row = res.rows[0];

    return {
      id: row.id,
      reference: row.reference,
      internalReference: row.internal_reference || row.reference,
      userId: row.user_id,
      amountNaira: Number(row.amount_kobo) / 100,
      amountKobo: Number(row.amount_kobo),
      currency: row.currency || 'NGN',
      bankName: row.bank_name,
      accountName: row.account_name,
      accountNumber: row.account_number,
      senderName: row.sender_name,
      senderBank: row.sender_bank,
      transferReference: row.transfer_reference,
      proofImageUrl: row.proof_image_url,
      status: row.status,
      createdAt: row.created_at
    };
  }

  /**
   * Admin approves a manual funding request.
   * Atomically verifies status is pending and credits wallet exactly once.
   */
  public async approveRequest(requestId: number, adminId: number) {
    const db = await getDb();

    return await db.transaction(async (tx: DbClient) => {
      // 1. Lock the funding request row to prevent race-condition double approvals
      const reqRes = await tx.query(
        'SELECT * FROM funding_requests WHERE id = $1 FOR UPDATE',
        [requestId]
      );

      if (reqRes.rows.length === 0) {
        throw new Error('Funding request not found.');
      }

      const req = reqRes.rows[0];

      if (req.status !== 'pending') {
        throw new Error(`Cannot approve: Request has already been ${req.status}.`);
      }

      const amountKobo = Number(req.amount_kobo);
      const internalRef = req.internal_reference || req.reference;
      const creditRef = `CREDIT-${internalRef}`;

      // 2. Credit the user's wallet with ledger entry within this atomic transaction
      await walletService.credit(
        req.user_id,
        amountKobo,
        creditRef,
        `Wallet Funding: +₦${(amountKobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 })} (Ref: ${internalRef})`,
        tx
      );

      // 3. Record transaction in transactions table
      await tx.query(`
        INSERT INTO transactions (
          reference, user_id, product_type, network, recipient_phone,
          provider, provider_reference, provider_cost_kobo,
          selling_price_kobo, profit_kobo, status, is_demo, metadata
        ) VALUES ($1, $2, 'wallet_funding', NULL, NULL, 'ManualBank', $3, $4, $4, 0, 'successful', false, $5)
      `, [
        internalRef,
        req.user_id,
        req.transfer_reference || internalRef,
        amountKobo,
        JSON.stringify({
          internal_reference: internalRef,
          transfer_reference: req.transfer_reference,
          sender_name: req.sender_name,
          sender_bank: req.sender_bank,
          bank_name: req.bank_name,
          account_number: req.account_number,
          approved_by_admin: adminId
        })
      ]);

      // 4. Update request status to 'approved'
      await tx.query(`
        UPDATE funding_requests
        SET status = 'approved',
            admin_id = $1,
            approved_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [adminId, requestId]);

      // 5. User Notification
      const amountNairaFormatted = (amountKobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
      await tx.query(`
        INSERT INTO user_notifications (user_id, title, message, type)
        VALUES ($1, 'Wallet Funding Approved', $2, 'funding_approved')
      `, [req.user_id, `Your funding of ₦${amountNairaFormatted} has been approved`]);

      // 6. Audit log
      await tx.query(`
        INSERT INTO admin_audit_logs (
          admin_id, action, target_id, target_type, details
        ) VALUES ($1, 'funding_approval', $2, 'funding_request', $3)
      `, [adminId, String(requestId), `Approved funding ${internalRef} of ₦${(amountKobo / 100).toFixed(2)} for user #${req.user_id}`]);

      return {
        success: true,
        requestId,
        internalReference: internalRef,
        amountNaira: amountKobo / 100,
        userId: req.user_id,
        status: 'approved'
      };
    });
  }

  /**
   * Admin rejects a manual funding request with a stated reason.
   */
  public async rejectRequest(requestId: number, adminId: number, rejectionReason?: string) {
    const db = await getDb();
    const reasonText = rejectionReason?.trim() || 'Payment could not be verified on bank statement';

    return await db.transaction(async (tx: DbClient) => {
      const reqRes = await tx.query(
        'SELECT * FROM funding_requests WHERE id = $1 FOR UPDATE',
        [requestId]
      );

      if (reqRes.rows.length === 0) {
        throw new Error('Funding request not found.');
      }

      const req = reqRes.rows[0];

      if (req.status !== 'pending') {
        throw new Error(`Cannot reject: Request has already been ${req.status}.`);
      }

      const internalRef = req.internal_reference || req.reference;

      await tx.query(`
        UPDATE funding_requests
        SET status = 'rejected',
            admin_id = $1,
            rejection_reason = $2,
            rejected_at = CURRENT_TIMESTAMP
        WHERE id = $3
      `, [adminId, reasonText, requestId]);

      const rejectedAmountNaira = (Number(req.amount_kobo) / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
      await tx.query(`
        INSERT INTO user_notifications (user_id, title, message, type)
        VALUES ($1, 'Funding Request Not Approved', $2, 'funding_rejected')
      `, [req.user_id, `Your funding request of ₦${rejectedAmountNaira} was declined: ${reasonText}`]);

      await tx.query(`
        INSERT INTO admin_audit_logs (
          admin_id, action, target_id, target_type, details
        ) VALUES ($1, 'funding_rejection', $2, 'funding_request', $3)
      `, [adminId, String(requestId), `Rejected funding request ${internalRef} (#${requestId}). Reason: ${reasonText}`]);

      return {
        success: true,
        requestId,
        internalReference: internalRef,
        status: 'rejected',
        reason: reasonText
      };
    });
  }

  /**
   * User fetches their funding history
   */
  public async getUserRequests(userId: number) {
    const db = await getDb();
    const res = await db.query(
      `SELECT * FROM funding_requests 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );

    return res.rows.map(r => ({
      id: r.id,
      reference: r.reference,
      internalReference: r.internal_reference || r.reference,
      userId: r.user_id,
      amountNaira: Number(r.amount_kobo) / 100,
      currency: r.currency || 'NGN',
      bankName: r.bank_name,
      accountName: r.account_name,
      accountNumber: r.account_number,
      senderName: r.sender_name,
      senderBank: r.sender_bank,
      transferReference: r.transfer_reference,
      proofImageUrl: r.proof_image_url,
      status: r.status,
      rejectionReason: r.rejection_reason,
      approvedAt: r.approved_at,
      rejectedAt: r.rejected_at,
      createdAt: r.created_at
    }));
  }
}

export const fundingService = new FundingService();
