import bcrypt from 'bcryptjs';
import { getDb } from '../db/database.ts';
import { walletService } from './walletService.ts';
import { clubkonnect, NETWORK_CODES } from './clubkonnectService.ts';

export interface PurchaseDataInput {
  userId: number;
  planId: string; // Internal DataHub plan ID
  recipientPhone: string;
  transactionPin: string;
}

export interface PurchaseAirtimeInput {
  userId: number;
  network: string; // 'MTN', 'AIRTEL', 'GLO', '9MOBILE'
  amountNaira: number;
  recipientPhone: string;
  transactionPin: string;
}

export class TransactionEngine {
  /**
   * Validates user and 4-digit transaction PIN
   */
  private async verifyUserAndPin(userId: number, pin: string) {
    const db = await getDb();
    const userRes = await db.query(
      'SELECT id, status, transaction_pin_hash FROM users WHERE id = $1',
      [userId]
    );

    if (userRes.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = userRes.rows[0];
    if (user.status === 'suspended') {
      throw new Error('Your account is suspended. Please contact support.');
    }

    if (!user.transaction_pin_hash) {
      throw new Error('Transaction PIN not set. Please set a 4-digit PIN in your Profile before transacting.');
    }

    const pinMatch = await bcrypt.compare(pin, user.transaction_pin_hash);
    if (!pinMatch) {
      throw new Error('Incorrect transaction PIN. Please verify your 4-digit PIN.');
    }

    return user;
  }

  /**
   * Process Mobile Data Purchase
   */
  public async processDataPurchase(input: PurchaseDataInput) {
    // 0. Ensure provider credentials are fully configured if in live mode (DEMO_MODE=false)
    // Throws immediately if required environment variables are missing, before wallet debit.
    clubkonnect.assertCredentialsConfigured();

    const db = await getDb();

    // 1. Verify User & PIN
    await this.verifyUserAndPin(input.userId, input.transactionPin);

    // 2. Validate phone number format
    const phone = clubkonnect.normalizePhone(input.recipientPhone);
    if (!clubkonnect.isValidNigerianPhone(phone)) {
      throw new Error('Invalid Nigerian phone number. Must be 11 digits (e.g., 08012345678).');
    }

    // 3. Retrieve Trusted Plan from Database using internal plan ID
    // CRITICAL: Frontend variation codes are strictly ignored; DB is the sole source of truth.
    const planRes = await db.query(
      'SELECT * FROM data_plans WHERE id = $1',
      [input.planId]
    );

    if (planRes.rows.length === 0) {
      throw new Error('Requested data plan does not exist.');
    }

    const plan = planRes.rows[0];
    if (!plan.is_active) {
      throw new Error('This data plan is currently unavailable.');
    }

    const providerCostKobo = Number(plan.provider_cost_kobo);
    const sellingPriceKobo = Number(plan.selling_price_kobo);
    const profitKobo = sellingPriceKobo - providerCostKobo;
    const providerCode = plan.provider_code;
    const network = plan.network.toUpperCase();

    // 4. Generate unique transaction reference
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `DH-DATA-${timestamp}-${randomSuffix}`;
    const isDemo = clubkonnect.isDemoMode();

    // 4.5. Pre-validate provider credentials in live mode before debiting wallet
    if (!isDemo) {
      clubkonnect.assertCredentialsConfigured();
    }

    // 5. Check and safely Debit Wallet
    const debitResult = await walletService.debit(
      input.userId,
      sellingPriceKobo,
      `DEBIT-${reference}`,
      `Purchase: ${plan.plan_name} for ${phone}`
    );

    if (!debitResult.success) {
      throw new Error(debitResult.error || 'Failed to debit wallet.');
    }

    // 6. Record transaction in database with status 'processing'
    const txRes = await db.query(`
      INSERT INTO transactions (
        reference, user_id, product_type, network, recipient_phone,
        plan_id, provider, provider_reference, provider_cost_kobo,
        selling_price_kobo, profit_kobo, status, is_demo, metadata
      ) VALUES ($1, $2, 'data', $3, $4, $5, 'ClubKonnect', '', $6, $7, $8, 'processing', $9, $10)
      RETURNING id
    `, [
      reference,
      input.userId,
      network,
      phone,
      plan.id,
      providerCostKobo,
      sellingPriceKobo,
      profitKobo,
      isDemo,
      JSON.stringify({ plan_name: plan.plan_name, data_amount: plan.data_amount, duration: plan.duration })
    ]);

    const transactionId = txRes.rows[0].id;

    // Log transaction event
    await db.query(`
      INSERT INTO transaction_events (transaction_id, event_type, details)
      VALUES ($1, 'debited', $2)
    `, [transactionId, `Debited ₦${(sellingPriceKobo / 100).toFixed(2)} from user wallet.`]);

    // 7. Dispatch to ClubKonnect
    let providerResult;
    try {
      providerResult = await clubkonnect.purchaseData({
        network,
        dataPlanCode: providerCode,
        recipientPhone: phone,
        requestId: reference
      });
    } catch (err: any) {
      // Never mask configuration/credentials errors as pending!
      if (err.message && (err.message.includes('ClubKonnect') || err.message.includes('CLUBKONNECT_'))) {
        throw err;
      }
      providerResult = {
        success: false,
        status: 'pending' as const,
        providerReference: '',
        statusCode: 'CLIENT_ERROR',
        statusMessage: err.message || 'Error communicating with provider'
      };
    }

    // 8. Handle Provider Response
    const isSuccess = providerResult.success || providerResult.status === 'SUCCESS' || providerResult.status === 'successful';
    const isTransientPending = providerResult.status === 'pending' || providerResult.isTransient;

    if (isSuccess) {
      // Confirmed success: immediately set status to SUCCESS in database
      await db.query(`
        UPDATE transactions
        SET status = 'SUCCESS',
            provider_reference = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [providerResult.providerReference || reference, transactionId]);

      await db.query(`
        INSERT INTO transaction_events (transaction_id, event_type, details)
        VALUES ($1, 'completed', $2)
      `, [transactionId, `Provider confirmed order ID ${providerResult.providerReference}. ${providerResult.statusMessage}`]);

      console.log(`[TransactionEngine] Data transaction ${reference} resolved: SUCCESS`);

      return {
        success: true,
        status: 'SUCCESS',
        reference,
        planName: plan.plan_name,
        network,
        recipientPhone: phone,
        amountNaira: sellingPriceKobo / 100,
        providerReference: providerResult.providerReference,
        message: providerResult.statusMessage || 'Data purchase completed successfully!'
      };
    } else {
      // After 3 retries (30 sec total): auto-refund wallet and set status to FAILED_REFUNDED
      const refundRef = `REFUND-${reference}`;
      await walletService.credit(
        input.userId,
        sellingPriceKobo,
        refundRef,
        `Auto-Refund: Network busy data purchase (${reference})`
      );

      const refundAmountNaira = (sellingPriceKobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
      const refundMsg = `Network busy, ₦${refundAmountNaira} refunded to wallet`;

      console.error(`[TransactionEngine] Data transaction ${reference} resolved: FAILED_REFUNDED - ${refundMsg}`);

      await db.query(`
        UPDATE transactions
        SET status = 'FAILED_REFUNDED',
            refund_reference = $1,
            provider_reference = COALESCE(NULLIF($2, ''), provider_reference),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
      `, [refundRef, providerResult.providerReference || '', transactionId]);

      await db.query(`
        INSERT INTO transaction_events (transaction_id, event_type, details)
        VALUES ($1, 'refunded', $2)
      `, [transactionId, `Provider network busy after 3 retries: ${providerResult.statusMessage}. Auto-refunded ₦${refundAmountNaira} to user wallet.`]);

      return {
        success: false,
        status: 'FAILED_REFUNDED',
        reference,
        planName: plan.plan_name,
        network,
        recipientPhone: phone,
        amountNaira: sellingPriceKobo / 100,
        refunded: true,
        refundReference: refundRef,
        providerReference: providerResult.providerReference,
        providerError: 'Network busy',
        message: refundMsg
      };
    }
  }

  /**
   * Process Airtime Purchase
   */
  public async processAirtimePurchase(input: PurchaseAirtimeInput) {
    // 0. Ensure provider credentials are fully configured if in live mode (DEMO_MODE=false)
    // Throws immediately if required environment variables are missing, before wallet debit.
    clubkonnect.assertCredentialsConfigured();

    const db = await getDb();

    // 1. Verify User & PIN
    await this.verifyUserAndPin(input.userId, input.transactionPin);

    // 2. Validate Network
    const network = input.network.toUpperCase();
    if (!NETWORK_CODES[network]) {
      throw new Error(`Unsupported mobile network: ${input.network}`);
    }

    // 3. Validate Phone
    const phone = clubkonnect.normalizePhone(input.recipientPhone);
    if (!clubkonnect.isValidNigerianPhone(phone)) {
      throw new Error('Invalid Nigerian phone number.');
    }

    // 4. Validate Amount
    const amountNaira = Number(input.amountNaira);
    if (isNaN(amountNaira) || amountNaira < 50 || amountNaira > 50000) {
      throw new Error('Airtime amount must be between ₦50 and ₦50,000.');
    }

    // 5. Look up network airtime product & discount
    const productRes = await db.query(
      'SELECT * FROM airtime_products WHERE network = $1',
      [network]
    );

    const discountPercent = productRes.rows.length > 0 ? Number(productRes.rows[0].discount_percent) : 2.0;

    // Face value in kobo
    const faceValueKobo = Math.round(amountNaira * 100);
    // User discount (e.g. 2% off)
    const sellingPriceKobo = Math.round(faceValueKobo * (1 - (discountPercent / 100)));
    // Provider cost estimate (ClubKonnect typical discount 3% to 4%)
    const providerDiscountPercent = 3.5;
    const providerCostKobo = Math.round(faceValueKobo * (1 - (providerDiscountPercent / 100)));
    const profitKobo = sellingPriceKobo - providerCostKobo;

    // 6. Generate Reference
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `DH-AIR-${timestamp}-${randomSuffix}`;
    const isDemo = clubkonnect.isDemoMode();

    // 6.5. Pre-validate provider credentials in live mode before debiting wallet
    if (!isDemo) {
      clubkonnect.assertCredentialsConfigured();
    }

    // 7. Debit Wallet
    const debitResult = await walletService.debit(
      input.userId,
      sellingPriceKobo,
      `DEBIT-${reference}`,
      `Airtime: ₦${amountNaira} ${network} to ${phone}`
    );

    if (!debitResult.success) {
      throw new Error(debitResult.error || 'Failed to debit wallet.');
    }

    // 8. Record transaction
    const txRes = await db.query(`
      INSERT INTO transactions (
        reference, user_id, product_type, network, recipient_phone,
        provider, provider_reference, provider_cost_kobo,
        selling_price_kobo, profit_kobo, status, is_demo, metadata
      ) VALUES ($1, $2, 'airtime', $3, $4, 'ClubKonnect', '', $5, $6, $7, 'processing', $8, $9)
      RETURNING id
    `, [
      reference,
      input.userId,
      network,
      phone,
      providerCostKobo,
      sellingPriceKobo,
      profitKobo,
      isDemo,
      JSON.stringify({ face_value_naira: amountNaira, discount_percent: discountPercent })
    ]);

    const transactionId = txRes.rows[0].id;

    // 9. Dispatch to Provider
    let providerResult;
    try {
      providerResult = await clubkonnect.purchaseAirtime({
        network,
        amountNaira,
        recipientPhone: phone,
        requestId: reference
      });
    } catch (err: any) {
      // Never mask configuration/credentials errors as pending!
      if (err.message && (err.message.includes('ClubKonnect') || err.message.includes('CLUBKONNECT_'))) {
        throw err;
      }
      providerResult = {
        success: false,
        status: 'pending' as const,
        providerReference: '',
        statusCode: 'CLIENT_ERROR',
        statusMessage: err.message || 'Error communicating with provider'
      };
    }

    // 10. Handle Provider Outcome
    const isSuccess = providerResult.success || providerResult.status === 'SUCCESS' || providerResult.status === 'successful';
    const isTransientPending = providerResult.status === 'pending' || providerResult.isTransient;

    if (isSuccess) {
      await db.query(`
        UPDATE transactions
        SET status = 'SUCCESS',
            provider_reference = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [providerResult.providerReference || reference, transactionId]);

      await db.query(`
        INSERT INTO transaction_events (transaction_id, event_type, details)
        VALUES ($1, 'completed', $2)
      `, [transactionId, `Provider airtime order ID ${providerResult.providerReference} confirmed.`]);

      console.log(`[TransactionEngine] Airtime transaction ${reference} resolved: SUCCESS`);

      return {
        success: true,
        status: 'SUCCESS',
        reference,
        productType: 'airtime',
        planName: `${network} ₦${amountNaira.toLocaleString()} Airtime`,
        network,
        recipientPhone: phone,
        amountNaira,
        airtimeAmount: amountNaira,
        chargedNaira: sellingPriceKobo / 100,
        providerReference: providerResult.providerReference,
        message: providerResult.statusMessage || `₦${amountNaira} airtime sent successfully to ${phone}!`
      };
    } else {
      // After 3 retries (30 sec total): auto-refund wallet and set status to FAILED_REFUNDED
      const refundRef = `REFUND-${reference}`;
      await walletService.credit(
        input.userId,
        sellingPriceKobo,
        refundRef,
        `Auto-Refund: Network busy airtime purchase (${reference})`
      );

      const refundAmountNaira = (sellingPriceKobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
      const refundMsg = `Network busy, ₦${refundAmountNaira} refunded to wallet`;

      console.error(`[TransactionEngine] Airtime transaction ${reference} resolved: FAILED_REFUNDED - ${refundMsg}`);

      await db.query(`
        UPDATE transactions
        SET status = 'FAILED_REFUNDED',
            refund_reference = $1,
            provider_reference = COALESCE(NULLIF($2, ''), provider_reference),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
      `, [refundRef, providerResult.providerReference || '', transactionId]);

      await db.query(`
        INSERT INTO transaction_events (transaction_id, event_type, details)
        VALUES ($1, 'refunded', $2)
      `, [transactionId, `Provider airtime network busy after 3 retries: ${providerResult.statusMessage}. Auto-refunded ₦${refundAmountNaira} to user wallet.`]);

      return {
        success: false,
        status: 'FAILED_REFUNDED',
        reference,
        productType: 'airtime',
        planName: `${network} ₦${amountNaira.toLocaleString()} Airtime`,
        network,
        recipientPhone: phone,
        amountNaira,
        airtimeAmount: amountNaira,
        chargedNaira: sellingPriceKobo / 100,
        refunded: true,
        refundReference: refundRef,
        providerReference: providerResult.providerReference,
        providerError: 'Network busy',
        message: refundMsg
      };
    }
  }

  /**
   * Admin Manually Retry a Pending Transaction
   */
  public async retryPendingTransaction(transactionId: number, adminId?: number) {
    const db = await getDb();
    const txRes = await db.query(
      'SELECT t.*, p.provider_code FROM transactions t LEFT JOIN data_plans p ON t.plan_id = p.id WHERE t.id = $1',
      [transactionId]
    );

    if (txRes.rows.length === 0) {
      throw new Error('Transaction not found.');
    }

    const tx = txRes.rows[0];
    if (tx.status !== 'pending' && tx.status !== 'processing') {
      return {
        success: tx.status === 'successful' || tx.status === 'SUCCESS',
        status: tx.status,
        message: `Transaction is already resolved as '${tx.status}'.`
      };
    }

    console.log(`[TransactionEngine] Admin #${adminId || 0} manually retrying pending transaction #${transactionId} (${tx.reference})...`);

    let providerResult: any;

    if (tx.product_type === 'data') {
      if (!tx.provider_code) {
        throw new Error('Associated data plan variation code not found.');
      }
      providerResult = await clubkonnect.purchaseData({
        network: tx.network,
        dataPlanCode: tx.provider_code,
        recipientPhone: tx.recipient_phone,
        requestId: tx.reference
      });
    } else if (tx.product_type === 'airtime') {
      let amountNaira = 0;
      try {
        const meta = typeof tx.metadata === 'string' ? JSON.parse(tx.metadata) : tx.metadata;
        amountNaira = Number(meta?.face_value_naira) || (Number(tx.selling_price_kobo) / 100);
      } catch {
        amountNaira = Number(tx.selling_price_kobo) / 100;
      }

      providerResult = await clubkonnect.purchaseAirtime({
        network: tx.network,
        amountNaira,
        recipientPhone: tx.recipient_phone,
        requestId: tx.reference
      });
    } else {
      throw new Error(`Manual retry not supported for product type '${tx.product_type}'`);
    }

    const isSuccess = providerResult.success || providerResult.status === 'SUCCESS' || providerResult.status === 'successful';

    if (isSuccess) {
      await db.query(`
        UPDATE transactions
        SET status = 'SUCCESS',
            provider_reference = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [providerResult.providerReference || tx.reference, transactionId]);

      await db.query(`
        INSERT INTO transaction_events (transaction_id, event_type, details)
        VALUES ($1, 'completed', $2)
      `, [transactionId, `Admin manual retry succeeded. Provider reference: ${providerResult.providerReference}. ${providerResult.statusMessage}`]);

      return {
        success: true,
        status: 'SUCCESS',
        message: `Retry successful! Order completed by provider (${providerResult.providerReference || 'Success'}).`
      };
    } else {
      // Failure on retry: execute auto-refund and set FAILED_REFUNDED
      const refundRef = `REFUND-RETRY-${tx.reference}`;
      const amountKobo = Number(tx.selling_price_kobo);
      const amountNairaFormatted = (amountKobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
      await walletService.credit(
        tx.user_id,
        amountKobo,
        refundRef,
        `Auto-Refund: Retry network busy (${tx.reference})`
      );

      await db.query(`
        UPDATE transactions
        SET status = 'FAILED_REFUNDED',
            refund_reference = $1,
            provider_reference = COALESCE(NULLIF($2, ''), provider_reference),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
      `, [refundRef, providerResult.providerReference || '', transactionId]);

      await db.query(`
        INSERT INTO transaction_events (transaction_id, event_type, details)
        VALUES ($1, 'refunded', $2)
      `, [transactionId, `Admin manual retry concluded: Network busy / failed. Auto-refunded ₦${amountNairaFormatted} to user wallet.`]);

      return {
        success: false,
        status: 'FAILED_REFUNDED',
        refunded: true,
        message: `Network busy, ₦${amountNairaFormatted} refunded to wallet.`
      };
    }
  }

  /**
   * Admin Manually Retry All Pending Transactions at once
   */
  public async retryAllPendingTransactions(adminId?: number) {
    const db = await getDb();
    const pendingTxRes = await db.query(
      `SELECT t.id, t.reference, t.product_type, t.status, t.user_id, t.selling_price_kobo
       FROM transactions t 
       WHERE t.status = 'pending' OR t.status = 'processing'
       ORDER BY t.created_at ASC`
    );

    const pendingList = pendingTxRes.rows;
    console.log(`[TransactionEngine] Admin #${adminId || 0} retrying all pending transactions: ${pendingList.length} items`);

    const results = [];
    let successfulCount = 0;
    let refundedCount = 0;

    for (const tx of pendingList) {
      try {
        const res = await this.retryPendingTransaction(tx.id, adminId);
        if (res.success || res.status === 'SUCCESS' || res.status === 'successful') {
          successfulCount++;
        } else {
          refundedCount++;
        }
        results.push({ id: tx.id, reference: tx.reference, status: res.status, message: res.message });
      } catch (err: any) {
        // If error during retry, auto-refund to clear stuck queue safely
        try {
          const refundRef = `REFUND-ALL-${tx.reference}`;
          const amountKobo = Number(tx.selling_price_kobo);
          await walletService.credit(
            tx.user_id,
            amountKobo,
            refundRef,
            `Auto-Refund: Failed pending retry (${tx.reference})`
          );
          await db.query(`
            UPDATE transactions 
            SET status = 'FAILED_REFUNDED', refund_reference = $1, updated_at = CURRENT_TIMESTAMP 
            WHERE id = $2
          `, [refundRef, tx.id]);
          refundedCount++;
        } catch (rfErr) {}
        results.push({ id: tx.id, reference: tx.reference, status: 'FAILED_REFUNDED', message: err.message });
      }
    }

    return {
      totalProcessed: pendingList.length,
      successfulCount,
      refundedCount,
      results,
      message: `Processed ${pendingList.length} pending transaction(s): ${successfulCount} succeeded, ${refundedCount} refunded to user wallets.`
    };
  }

  /**
   * Requery a transaction with ClubKonnect
   */
  public async requeryTransaction(transactionId: number, adminId?: number) {
    const db = await getDb();
    const txRes = await db.query(
      'SELECT * FROM transactions WHERE id = $1',
      [transactionId]
    );

    if (txRes.rows.length === 0) {
      throw new Error('Transaction not found.');
    }

    const tx = txRes.rows[0];
    if (tx.status !== 'pending' && tx.status !== 'processing') {
      return {
        status: tx.status,
        message: `Transaction is already finalized as '${tx.status}'.`
      };
    }

    const result = await clubkonnect.requeryTransaction({
      orderId: tx.provider_reference,
      requestId: tx.reference
    });

    if (result.status === 'successful') {
      await db.query(`
        UPDATE transactions
        SET status = 'successful',
            provider_reference = COALESCE(NULLIF($1, ''), provider_reference),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [result.providerReference, transactionId]);

      await db.query(`
        INSERT INTO transaction_events (transaction_id, event_type, details)
        VALUES ($1, 'requeried_success', $2)
      `, [transactionId, `Requery verified order completed by provider. ${result.statusMessage}`]);

      return {
        status: 'successful',
        message: 'Requery confirmed order completed successfully by network provider.'
      };
    } else if (result.status === 'failed') {
      // Refund if provider confirmed failure
      const refundRef = `REFUND-REQ-${tx.reference}`;
      await walletService.credit(
        tx.user_id,
        Number(tx.selling_price_kobo),
        refundRef,
        `Requery Refund: Provider reported transaction failure (${tx.reference})`
      );

      await db.query(`
        UPDATE transactions
        SET status = 'refunded',
            refund_reference = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [refundRef, transactionId]);

      return {
        status: 'refunded',
        message: 'Requery reported order failed. User wallet has been refunded.'
      };
    }

    return {
      status: 'pending',
      message: 'Transaction is still awaiting provider final settlement.'
    };
  }
}

export const transactionEngine = new TransactionEngine();
