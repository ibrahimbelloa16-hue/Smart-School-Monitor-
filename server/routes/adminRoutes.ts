import { Router, type Response } from 'express';
import { getDb } from '../db/database.ts';
import { requireAuth, requireAdmin, type AuthRequest } from '../middleware/auth.ts';
import { fundingService } from '../services/fundingService.ts';
import { transactionEngine } from '../services/transactionEngine.ts';
import { walletService } from '../services/walletService.ts';

const router = Router();

// Protect all admin routes with requireAuth AND requireAdmin
router.use(requireAuth, requireAdmin);

/**
 * GET /api/admin/dashboard
 * Aggregated statistics and platform financial metrics
 */
router.get('/dashboard', async (_req, res) => {
  try {
    const db = await getDb();

    // User metrics
    const userStats = await db.query(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
        COUNT(CASE WHEN status = 'suspended' THEN 1 END) as suspended_users
      FROM users
    `);

    // Total Wallet Liability
    const walletStats = await db.query(`
      SELECT COALESCE(SUM(balance_kobo), 0) as total_wallet_balance_kobo FROM wallets
    `);

    // Funding Requests metrics
    const fundingStats = await db.query(`
      SELECT 
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_funding,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_funding,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_funding,
        COALESCE(SUM(CASE WHEN status = 'approved' THEN amount_kobo ELSE 0 END), 0) as total_approved_funding_kobo
      FROM funding_requests
    `);

    // Transaction & Sales metrics
    const txStats = await db.query(`
      SELECT 
        COUNT(CASE WHEN status = 'successful' THEN 1 END) as successful_tx,
        COUNT(CASE WHEN status = 'pending' OR status = 'processing' THEN 1 END) as pending_tx,
        COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_tx,
        COUNT(CASE WHEN status = 'refunded' THEN 1 END) as refunded_tx,
        COALESCE(SUM(CASE WHEN status = 'successful' AND product_type = 'data' THEN selling_price_kobo ELSE 0 END), 0) as total_data_sales_kobo,
        COALESCE(SUM(CASE WHEN status = 'successful' AND product_type = 'airtime' THEN selling_price_kobo ELSE 0 END), 0) as total_airtime_sales_kobo,
        COALESCE(SUM(CASE WHEN status = 'successful' THEN provider_cost_kobo ELSE 0 END), 0) as total_provider_cost_kobo,
        COALESCE(SUM(CASE WHEN status = 'successful' THEN profit_kobo ELSE 0 END), 0) as total_profit_kobo
      FROM transactions
    `);

    const dataSalesKobo = Number(txStats.rows[0]?.total_data_sales_kobo || 0);
    const airtimeSalesKobo = Number(txStats.rows[0]?.total_airtime_sales_kobo || 0);
    const providerCostKobo = Number(txStats.rows[0]?.total_provider_cost_kobo || 0);
    const profitKobo = Number(txStats.rows[0]?.total_profit_kobo || 0);
    const walletBalanceKobo = Number(walletStats.rows[0]?.total_wallet_balance_kobo || 0);

    return res.json({
      metrics: {
        totalUsers: Number(userStats.rows[0]?.total_users || 0),
        activeUsers: Number(userStats.rows[0]?.active_users || 0),
        suspendedUsers: Number(userStats.rows[0]?.suspended_users || 0),
        totalWalletBalanceNaira: walletBalanceKobo / 100,
        pendingFundingCount: Number(fundingStats.rows[0]?.pending_funding || 0),
        approvedFundingCount: Number(fundingStats.rows[0]?.approved_funding || 0),
        rejectedFundingCount: Number(fundingStats.rows[0]?.rejected_funding || 0),
        totalApprovedFundingNaira: Number(fundingStats.rows[0]?.total_approved_funding_kobo || 0) / 100,
        successfulTxCount: Number(txStats.rows[0]?.successful_tx || 0),
        pendingTxCount: Number(txStats.rows[0]?.pending_tx || 0),
        failedTxCount: Number(txStats.rows[0]?.failed_tx || 0),
        refundedTxCount: Number(txStats.rows[0]?.refunded_tx || 0),
        totalDataSalesNaira: dataSalesKobo / 100,
        totalAirtimeSalesNaira: airtimeSalesKobo / 100,
        totalProviderCostNaira: providerCostKobo / 100,
        totalProfitNaira: profitKobo / 100
      }
    });
  } catch (err: any) {
    console.error('Admin dashboard error:', err);
    return res.status(500).json({ error: 'Failed to retrieve admin dashboard metrics.' });
  }
});

/**
 * GET /api/admin/users
 * Search and list users
 */
router.get('/users', async (req, res) => {
  try {
    const db = await getDb();
    const search = req.query.search ? String(req.query.search).trim() : '';
    const status = req.query.status ? String(req.query.status) : '';
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const offset = Number(req.query.offset) || 0;

    let query = `
      SELECT 
        u.id, u.full_name, u.email, u.phone, u.role, u.status, u.referral_code, u.created_at,
        COALESCE(w.balance_kobo, 0) as balance_kobo
      FROM users u
      LEFT JOIN wallets w ON u.id = w.user_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      query += ` AND (LOWER(u.full_name) LIKE $${params.length} OR LOWER(u.email) LIKE $${params.length} OR u.phone LIKE $${params.length})`;
    }

    if (status) {
      params.push(status);
      query += ` AND u.status = $${params.length}`;
    }

    query += ` ORDER BY u.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await db.query(query, params);

    const users = result.rows.map(u => ({
      id: u.id,
      fullName: u.full_name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      status: u.status,
      referralCode: u.referral_code,
      createdAt: u.created_at,
      balanceNaira: Number(u.balance_kobo) / 100
    }));

    return res.json({ users });
  } catch (err: any) {
    console.error('Admin users fetch error:', err);
    return res.status(500).json({ error: 'Failed to list users.' });
  }
});

/**
 * POST /api/admin/users/:id/status
 * Suspend or activate a user
 */
router.post('/users/:id/status', async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    if (status !== 'active' && status !== 'suspended') {
      return res.status(400).json({ error: "Status must be 'active' or 'suspended'." });
    }

    const userId = Number(req.params.id);
    if (userId === req.user!.id) {
      return res.status(400).json({ error: 'You cannot suspend your own admin account.' });
    }

    const db = await getDb();
    await db.query('UPDATE users SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [status, userId]);

    // Audit log
    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, $2, $3, 'user', $4)
    `, [req.user!.id, status === 'active' ? 'user_activation' : 'user_suspension', String(userId), `Set user #${userId} status to ${status}`]);

    return res.json({ message: `User status changed to ${status}.` });
  } catch (err: any) {
    console.error('Update user status error:', err);
    return res.status(500).json({ error: 'Failed to update user status.' });
  }
});

/**
 * POST /api/admin/users/:id/role
 * Change user role
 */
router.post('/users/:id/role', async (req: AuthRequest, res: Response) => {
  try {
    const { role } = req.body;
    if (role !== 'user' && role !== 'admin') {
      return res.status(400).json({ error: "Role must be 'user' or 'admin'." });
    }

    const userId = Number(req.params.id);
    if (userId === req.user!.id) {
      return res.status(400).json({ error: 'You cannot alter your own admin role.' });
    }

    const db = await getDb();
    await db.query('UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [role, userId]);

    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'role_change', $2, 'user', $3)
    `, [req.user!.id, String(userId), `Changed role of user #${userId} to ${role}`]);

    return res.json({ message: `User role updated to ${role}.` });
  } catch (err: any) {
    console.error('Update user role error:', err);
    return res.status(500).json({ error: 'Failed to update user role.' });
  }
});

/**
 * GET /api/admin/funding-requests/pending-count
 * Returns pending funding requests count for bell badge
 */
router.get('/funding-requests/pending-count', async (_req, res) => {
  try {
    const db = await getDb();
    const result = await db.query(
      "SELECT COUNT(*) as count FROM funding_requests WHERE status = 'pending'"
    );
    const count = Number(result.rows[0]?.count || 0);
    return res.json({ count });
  } catch (err: any) {
    console.error('Pending funding count error:', err);
    return res.status(500).json({ error: 'Failed to retrieve pending count.' });
  }
});

/**
 * GET /api/admin/funding-requests
 * View all manual bank funding requests
 */
router.get('/funding-requests', async (req, res) => {
  try {
    const db = await getDb();
    const status = req.query.status ? String(req.query.status) : '';
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const offset = Number(req.query.offset) || 0;

    let query = `
      SELECT 
        fr.*,
        u.full_name as user_name, u.email as user_email, u.phone as user_phone,
        a.full_name as admin_name
      FROM funding_requests fr
      JOIN users u ON fr.user_id = u.id
      LEFT JOIN users a ON fr.admin_id = a.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status) {
      params.push(status);
      query += ` AND fr.status = $${params.length}`;
    }

    query += ` ORDER BY fr.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await db.query(query, params);

    const requests = result.rows.map(r => ({
      id: r.id,
      reference: r.reference,
      internalReference: r.internal_reference || r.reference,
      userId: r.user_id,
      userName: r.user_name,
      userEmail: r.user_email,
      userPhone: r.user_phone,
      amountNaira: Number(r.amount_kobo) / 100,
      bankName: r.bank_name,
      accountName: r.account_name,
      accountNumber: r.account_number,
      senderName: r.sender_name,
      senderBank: r.sender_bank,
      transferReference: r.transfer_reference,
      proofImageUrl: r.proof_image_url,
      status: r.status,
      adminId: r.admin_id,
      adminName: r.admin_name,
      rejectionReason: r.rejection_reason,
      approvedAt: r.approved_at,
      rejectedAt: r.rejected_at,
      createdAt: r.created_at
    }));

    return res.json({ requests });
  } catch (err: any) {
    console.error('Admin funding requests error:', err);
    return res.status(500).json({ error: 'Failed to retrieve funding requests.' });
  }
});

/**
 * POST /api/admin/funding-requests/:id/approve
 * Admin approves funding request -> credits wallet exactly once
 */
router.post('/funding-requests/:id/approve', async (req: AuthRequest, res: Response) => {
  try {
    const requestId = Number(req.params.id);
    const result = await fundingService.approveRequest(requestId, req.user!.id);
    return res.json({
      message: `Funding request #${requestId} successfully approved! User wallet credited with ₦${result.amountNaira.toFixed(2)}.`,
      ...result
    });
  } catch (err: any) {
    console.error('Funding approval error:', err);
    return res.status(400).json({ error: err.message || 'Failed to approve funding request.' });
  }
});

/**
 * POST /api/admin/funding-requests/:id/reject
 * Admin rejects funding request with reason
 */
router.post('/funding-requests/:id/reject', async (req: AuthRequest, res: Response) => {
  try {
    const requestId = Number(req.params.id);
    const { reason } = req.body;

    if (!reason || !reason.trim()) {
      return res.status(400).json({ error: 'Please provide a clear reason for rejection.' });
    }

    const result = await fundingService.rejectRequest(requestId, req.user!.id, reason);
    return res.json({
      message: `Funding request #${requestId} rejected.`,
      ...result
    });
  } catch (err: any) {
    console.error('Funding rejection error:', err);
    return res.status(400).json({ error: err.message || 'Failed to reject funding request.' });
  }
});

/**
 * GET /api/admin/data-plans
 * Full management view of data plans
 */
router.get('/data-plans', async (_req, res) => {
  try {
    const db = await getDb();
    const result = await db.query(`
      SELECT * FROM data_plans
      ORDER BY network ASC, selling_price_kobo ASC
    `);

    const plans = result.rows.map(p => {
      const cost = Number(p.provider_cost_kobo);
      const selling = Number(p.selling_price_kobo);
      return {
        id: p.id,
        network: p.network,
        planName: p.plan_name,
        planType: p.plan_type,
        dataAmount: p.data_amount,
        duration: p.duration,
        providerCode: p.provider_code,
        providerCostNaira: cost / 100,
        markupNaira: Number(p.markup_kobo) / 100,
        sellingPriceNaira: selling / 100,
        profitNaira: (selling - cost) / 100,
        isActive: p.is_active,
        lastSyncAt: p.last_sync_at
      };
    });

    return res.json({ plans });
  } catch (err: any) {
    console.error('Admin data plans error:', err);
    return res.status(500).json({ error: 'Failed to retrieve data plans.' });
  }
});

/**
 * POST /api/admin/data-plans
 * Create new data plan
 */
router.post('/data-plans', async (req: AuthRequest, res: Response) => {
  try {
    const {
      id, network, planName, planType, dataAmount, duration,
      providerCode, providerCostNaira, markupNaira, sellingPriceNaira, isActive
    } = req.body;

    if (!id || !network || !planName || !providerCode || providerCostNaira === undefined) {
      return res.status(400).json({ error: 'All plan identification and pricing fields are required.' });
    }

    const db = await getDb();
    const costKobo = Math.round(Number(providerCostNaira) * 100);
    let markupKobo: number;
    let sellingPriceKobo: number;

    if (sellingPriceNaira !== undefined && sellingPriceNaira !== null) {
      sellingPriceKobo = Math.round(Number(sellingPriceNaira) * 100);
      markupKobo = sellingPriceKobo - costKobo;
    } else {
      markupKobo = Math.round(Number(markupNaira || 30) * 100);
      sellingPriceKobo = costKobo + markupKobo;
    }

    if (sellingPriceKobo <= 0) {
      return res.status(400).json({ error: 'Selling price must be greater than zero.' });
    }

    await db.query(`
      INSERT INTO data_plans (
        id, network, plan_name, plan_type, data_amount, duration,
        provider_code, provider_cost_kobo, markup_kobo, selling_price_kobo, is_active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `, [
      id.trim(),
      network.toUpperCase(),
      planName.trim(),
      planType || 'SME',
      dataAmount || '1.0 GB',
      duration || '30 Days',
      providerCode.trim(),
      costKobo,
      markupKobo,
      sellingPriceKobo,
      isActive !== false
    ]);

    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'product_creation', $2, 'data_plan', $3)
    `, [req.user!.id, id.trim(), `Created new data plan ${planName} (${network})`]);

    return res.status(201).json({ message: 'Data plan created successfully.' });
  } catch (err: any) {
    console.error('Create plan error:', err);
    return res.status(400).json({ error: err.message || 'Failed to create plan.' });
  }
});

/**
 * PUT /api/admin/data-plans/:id
 * Edit existing data plan
 */
router.put('/data-plans/:id', async (req: AuthRequest, res: Response) => {
  try {
    const planId = req.params.id;
    const {
      planName, planType, dataAmount, duration,
      providerCode, providerCostNaira, markupNaira, sellingPriceNaira, isActive
    } = req.body;

    const db = await getDb();
    
    // Fetch existing plan if some fields are omitted
    const existingRes = await db.query('SELECT * FROM data_plans WHERE id = $1', [planId]);
    if (existingRes.rows.length === 0) {
      return res.status(404).json({ error: 'Data plan not found.' });
    }
    const existing = existingRes.rows[0];

    const currentCostKobo = providerCostNaira !== undefined
      ? Math.round(Number(providerCostNaira) * 100)
      : Number(existing.provider_cost_kobo);

    let sellingPriceKobo: number;
    let markupKobo: number;

    if (sellingPriceNaira !== undefined && sellingPriceNaira !== null) {
      sellingPriceKobo = Math.round(Number(sellingPriceNaira) * 100);
      markupKobo = sellingPriceKobo - currentCostKobo;
    } else {
      markupKobo = markupNaira !== undefined
        ? Math.round(Number(markupNaira) * 100)
        : Number(existing.markup_kobo);
      sellingPriceKobo = currentCostKobo + markupKobo;
    }

    if (sellingPriceKobo <= 0) {
      return res.status(400).json({ error: 'Selling price must be greater than zero.' });
    }

    await db.query(`
      UPDATE data_plans SET
        plan_name = $1,
        plan_type = $2,
        data_amount = $3,
        duration = $4,
        provider_code = $5,
        provider_cost_kobo = $6,
        markup_kobo = $7,
        selling_price_kobo = $8,
        is_active = $9,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $10
    `, [
      planName || existing.plan_name,
      planType || existing.plan_type,
      dataAmount || existing.data_amount,
      duration || existing.duration,
      providerCode || existing.provider_code,
      currentCostKobo,
      markupKobo,
      sellingPriceKobo,
      isActive !== undefined ? Boolean(isActive) : existing.is_active,
      planId
    ]);

    const updatedSellingNaira = (sellingPriceKobo / 100).toFixed(2);
    const updatedCostNaira = (currentCostKobo / 100).toFixed(2);
    const updatedMarkupNaira = (markupKobo / 100).toFixed(2);

    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'product_update', $2, 'data_plan', $3)
    `, [
      req.user!.id,
      planId,
      `Updated plan ${planName || existing.plan_name}: Cost ₦${updatedCostNaira}, Markup ₦${updatedMarkupNaira}, Selling ₦${updatedSellingNaira}`
    ]);

    return res.json({
      message: 'Data plan updated successfully.',
      plan: {
        id: planId,
        providerCostNaira: Number(updatedCostNaira),
        markupNaira: Number(updatedMarkupNaira),
        sellingPriceNaira: Number(updatedSellingNaira),
        profitNaira: Number(updatedMarkupNaira),
        isActive: isActive !== undefined ? Boolean(isActive) : existing.is_active
      }
    });
  } catch (err: any) {
    console.error('Update plan error:', err);
    return res.status(400).json({ error: err.message || 'Failed to update plan.' });
  }
});

/**
 * PATCH /api/admin/data-plans/:id/price
 * Fast dynamic price update for any plan without full modal form
 */
router.patch('/data-plans/:id/price', async (req: AuthRequest, res: Response) => {
  try {
    const planId = req.params.id;
    const { sellingPriceNaira, markupNaira, providerCostNaira, isActive } = req.body;

    const db = await getDb();
    const existingRes = await db.query('SELECT * FROM data_plans WHERE id = $1', [planId]);
    if (existingRes.rows.length === 0) {
      return res.status(404).json({ error: 'Data plan not found.' });
    }
    const existing = existingRes.rows[0];

    const currentCostKobo = providerCostNaira !== undefined
      ? Math.round(Number(providerCostNaira) * 100)
      : Number(existing.provider_cost_kobo);

    let sellingPriceKobo: number;
    let markupKobo: number;

    if (sellingPriceNaira !== undefined && sellingPriceNaira !== null) {
      sellingPriceKobo = Math.round(Number(sellingPriceNaira) * 100);
      markupKobo = sellingPriceKobo - currentCostKobo;
    } else if (markupNaira !== undefined && markupNaira !== null) {
      markupKobo = Math.round(Number(markupNaira) * 100);
      sellingPriceKobo = currentCostKobo + markupKobo;
    } else {
      sellingPriceKobo = Number(existing.selling_price_kobo);
      markupKobo = Number(existing.markup_kobo);
    }

    if (sellingPriceKobo <= 0) {
      return res.status(400).json({ error: 'Selling price must be greater than zero.' });
    }

    const nextIsActive = isActive !== undefined ? Boolean(isActive) : existing.is_active;

    await db.query(`
      UPDATE data_plans SET
        provider_cost_kobo = $1,
        markup_kobo = $2,
        selling_price_kobo = $3,
        is_active = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
    `, [currentCostKobo, markupKobo, sellingPriceKobo, nextIsActive, planId]);

    const finalSellingNaira = sellingPriceKobo / 100;
    const finalCostNaira = currentCostKobo / 100;
    const finalProfitNaira = markupKobo / 100;

    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'price_adjustment', $2, 'data_plan', $3)
    `, [
      req.user!.id,
      planId,
      `Adjusted selling price for ${existing.plan_name}: ₦${finalSellingNaira.toFixed(2)} (Wholesale: ₦${finalCostNaira.toFixed(2)}, Profit: ₦${finalProfitNaira.toFixed(2)})`
    ]);

    return res.json({
      message: 'Price updated successfully.',
      plan: {
        id: planId,
        providerCostNaira: finalCostNaira,
        markupNaira: finalProfitNaira,
        sellingPriceNaira: finalSellingNaira,
        profitNaira: finalProfitNaira,
        isActive: nextIsActive
      }
    });
  } catch (err: any) {
    console.error('Quick price update error:', err);
    return res.status(400).json({ error: err.message || 'Failed to update plan price.' });
  }
});

/**
 * GET /api/admin/transactions
 * Monitor all system transactions
 */
router.get('/transactions', async (req, res) => {
  try {
    const db = await getDb();
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const offset = Number(req.query.offset) || 0;
    const search = req.query.search ? String(req.query.search).trim() : '';
    const status = req.query.status ? String(req.query.status) : '';
    const productType = req.query.productType ? String(req.query.productType) : '';

    let query = `
      SELECT 
        t.*,
        u.full_name as user_name, u.email as user_email, u.phone as user_phone,
        p.plan_name
      FROM transactions t
      JOIN users u ON t.user_id = u.id
      LEFT JOIN data_plans p ON t.plan_id = p.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      query += ` AND (LOWER(t.reference) LIKE $${params.length} OR LOWER(t.recipient_phone) LIKE $${params.length} OR LOWER(u.email) LIKE $${params.length})`;
    }

    if (status) {
      params.push(status);
      query += ` AND t.status = $${params.length}`;
    }

    if (productType) {
      params.push(productType);
      query += ` AND t.product_type = $${params.length}`;
    }

    query += ` ORDER BY t.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await db.query(query, params);

    const transactions = result.rows.map(tx => ({
      id: tx.id,
      reference: tx.reference,
      userId: tx.user_id,
      userName: tx.user_name,
      userEmail: tx.user_email,
      productType: tx.product_type,
      network: tx.network,
      recipientPhone: tx.recipient_phone,
      planName: tx.plan_name,
      provider: tx.provider,
      providerReference: tx.provider_reference,
      providerCostNaira: Number(tx.provider_cost_kobo) / 100,
      sellingPriceNaira: Number(tx.selling_price_kobo) / 100,
      profitNaira: Number(tx.profit_kobo) / 100,
      status: tx.status,
      isDemo: tx.is_demo,
      refundReference: tx.refund_reference,
      createdAt: tx.created_at
    }));

    return res.json({ transactions });
  } catch (err: any) {
    console.error('Admin transactions error:', err);
    return res.status(500).json({ error: 'Failed to retrieve transactions.' });
  }
});

/**
 * POST /api/admin/transactions/:id/requery
 * Admin requery transaction with provider
 */
router.post('/transactions/:id/requery', async (req: AuthRequest, res: Response) => {
  try {
    const txId = Number(req.params.id);
    const result = await transactionEngine.requeryTransaction(txId, req.user!.id);

    const db = await getDb();
    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'transaction_requery', $2, 'transaction', $3)
    `, [req.user!.id, String(txId), `Requeried transaction #${txId}: Result is '${result.status}'`]);

    return res.json(result);
  } catch (err: any) {
    console.error('Requery transaction error:', err);
    return res.status(400).json({ error: err.message || 'Failed to requery transaction.' });
  }
});

/**
 * POST /api/admin/transactions/retry-all-pending
 * Admin manually retries all pending transactions at once
 */
router.post('/transactions/retry-all-pending', async (req: AuthRequest, res: Response) => {
  try {
    const result = await transactionEngine.retryAllPendingTransactions(req.user!.id);

    const db = await getDb();
    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'retry_all_pending', '0', 'transactions', $2)
    `, [req.user!.id, result.message]);

    return res.json(result);
  } catch (err: any) {
    console.error('Retry all pending transactions error:', err);
    return res.status(500).json({ error: err.message || 'Failed to retry all pending transactions.' });
  }
});

/**
 * POST /api/admin/transactions/:id/retry and /api/admin/transactions/:id/retry-pending
 * Admin manually retries a pending transaction with provider
 */
router.post(['/transactions/:id/retry', '/transactions/:id/retry-pending'], async (req: AuthRequest, res: Response) => {
  try {
    const txId = Number(req.params.id);
    const result = await transactionEngine.retryPendingTransaction(txId, req.user!.id);

    const db = await getDb();
    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'transaction_retry', $2, 'transaction', $3)
    `, [req.user!.id, String(txId), `Manually retried transaction #${txId}: status is '${result.status}'`]);

    return res.json(result);
  } catch (err: any) {
    console.error('Retry transaction error:', err);
    return res.status(400).json({ error: err.message || 'Failed to retry transaction.' });
  }
});

/**
 * POST /api/admin/transactions/:id/manual-refund
 * Manual refund for stuck/disputed transaction with double-refund protection
 */
router.post('/transactions/:id/manual-refund', async (req: AuthRequest, res: Response) => {
  try {
    const txId = Number(req.params.id);
    const db = await getDb();

    const txRes = await db.query('SELECT * FROM transactions WHERE id = $1', [txId]);
    if (txRes.rows.length === 0) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }

    const tx = txRes.rows[0];
    if (tx.status === 'refunded') {
      return res.status(400).json({ error: 'This transaction has already been refunded.' });
    }

    const refundRef = `MANUAL-REFUND-${tx.reference}`;
    await walletService.credit(
      tx.user_id,
      Number(tx.selling_price_kobo),
      refundRef,
      `Manual Admin Refund for Transaction (${tx.reference})`
    );

    await db.query(`
      UPDATE transactions
      SET status = 'refunded',
          refund_reference = $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `, [refundRef, txId]);

    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'refund', $2, 'transaction', $3)
    `, [req.user!.id, String(txId), `Manually refunded ₦${(Number(tx.selling_price_kobo) / 100).toFixed(2)} to user #${tx.user_id}`]);

    return res.json({ message: 'Transaction refunded successfully to user wallet.', status: 'refunded' });
  } catch (err: any) {
    console.error('Manual refund error:', err);
    return res.status(400).json({ error: err.message || 'Failed to process refund.' });
  }
});

/**
 * GET /api/admin/settings
 */
router.get('/settings', async (_req, res) => {
  try {
    const db = await getDb();
    const result = await db.query('SELECT * FROM app_settings WHERE id = 1');
    return res.json({ settings: result.rows[0] });
  } catch (err: any) {
    console.error('Settings fetch error:', err);
    return res.status(500).json({ error: 'Failed to retrieve settings.' });
  }
});

/**
 * PUT /api/admin/settings
 * Update platform settings and manual bank details
 */
router.put('/settings', async (req: AuthRequest, res: Response) => {
  try {
    const {
      platformName, logoUrl, supportPhone, supportEmail,
      bankName, accountNumber, accountName, manualFundingInstructions,
      defaultMarkupKobo, maintenanceMode, demoMode, apkDownloadUrl
    } = req.body;

    const db = await getDb();
    await db.query(`
      UPDATE app_settings SET
        platform_name = COALESCE($1, platform_name),
        logo_url = COALESCE($2, logo_url),
        support_phone = COALESCE($3, support_phone),
        support_email = COALESCE($4, support_email),
        bank_name = COALESCE($5, bank_name),
        account_number = COALESCE($6, account_number),
        account_name = COALESCE($7, account_name),
        manual_funding_instructions = COALESCE($8, manual_funding_instructions),
        default_markup_kobo = COALESCE($9, default_markup_kobo),
        maintenance_mode = COALESCE($10, maintenance_mode),
        demo_mode = COALESCE($11, demo_mode),
        apk_download_url = $12,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `, [
      platformName, logoUrl, supportPhone, supportEmail,
      bankName, accountNumber, accountName, manualFundingInstructions,
      defaultMarkupKobo, maintenanceMode, demoMode,
      apkDownloadUrl !== undefined ? apkDownloadUrl : null
    ]);

    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'settings_update', '1', 'app_settings', 'Updated platform configuration')
    `, [req.user!.id]);

    return res.json({ message: 'Settings updated successfully.' });
  } catch (err: any) {
    console.error('Settings update error:', err);
    return res.status(500).json({ error: 'Failed to update settings.' });
  }
});

/**
 * GET /api/admin/funding-requests/pending-count
 * Fast endpoint for Realtime Bell notification badge
 */
router.get('/funding-requests/pending-count', async (_req, res) => {
  try {
    const db = await getDb();
    const countRes = await db.query(
      "SELECT COUNT(*) as count FROM funding_requests WHERE status = 'pending'"
    );
    const count = Number(countRes.rows[0]?.count || 0);
    return res.json({ count });
  } catch (err: any) {
    console.error('Pending funding count error:', err);
    return res.status(500).json({ error: 'Failed to retrieve pending funding count.' });
  }
});

/**
 * POST /api/admin/transactions/:id/retry-pending
 * Admin manual retry for pending transaction
 */
router.post('/transactions/:id/retry-pending', async (req: AuthRequest, res: Response) => {
  try {
    const txId = Number(req.params.id);
    const result = await transactionEngine.retryPendingTransaction(txId, req.user!.id);
    return res.json(result);
  } catch (err: any) {
    console.error('Retry pending transaction error:', err);
    return res.status(400).json({ error: err.message || 'Failed to retry pending transaction.' });
  }
});

/**
 * GET /api/admin/security/settings
 * Retrieves sensitive API keys and provider configuration from admin_settings table
 */
router.get('/security/settings', async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDb();
    const row = await db.query('SELECT * FROM admin_settings WHERE id = 1');
    const defaultUserId = (process.env.CLUBKONNECT_USER_ID || process.env.CLUBKONNECT_U || '').trim();
    const defaultBaseUrl = (process.env.CLUBKONNECT_BASE_URL || 'https://www.nellobytesystems.com').trim();
    const settings = row.rows[0] || {
      clubkonnect_user_id: defaultUserId,
      clubkonnect_api_key: '',
      clubkonnect_base_url: defaultBaseUrl
    };

    const currentUserId = (settings.clubkonnect_user_id || defaultUserId).trim();
    const rawKey = (settings.clubkonnect_api_key || process.env.CLUBKONNECT_API_KEY || process.env.CLUBKONNECT_A || '').trim();
    // Mask key with dots for security
    const maskedKey = rawKey.length > 6
      ? `${rawKey.slice(0, 3)}${'•'.repeat(Math.max(8, rawKey.length - 6))}${rawKey.slice(-3)}`
      : '••••••••••••••••';

    return res.json({
      settings: {
        userId: currentUserId,
        baseUrl: settings.clubkonnect_base_url || defaultBaseUrl,
        maskedApiKey: maskedKey,
        hasApiKey: Boolean(rawKey),
        rawApiKey: req.user?.role === 'super_admin' ? rawKey : undefined,
        updatedAt: settings.updated_at
      }
    });
  } catch (err: any) {
    console.error('Security settings fetch error:', err);
    return res.status(500).json({ error: 'Failed to retrieve security settings.' });
  }
});

/**
 * PUT /api/admin/security/settings
 * Row-Level Security: Only users with role='super_admin' can UPDATE admin_settings
 * Records every single change into settings_logs
 */
router.put('/security/settings', async (req: AuthRequest, res: Response) => {
  try {
    // Strict RLS: verify role is super_admin in users / profiles table
    const db = await getDb();
    const userCheck = await db.query(
      'SELECT id, role FROM users WHERE id = $1',
      [req.user!.id]
    );

    const userRole = userCheck.rows[0]?.role;
    if (userRole !== 'super_admin') {
      return res.status(403).json({
        error: "Access Denied: Only users with role='super_admin' in profiles/users table can edit sensitive API settings."
      });
    }

    const { userId, apiKey, baseUrl } = req.body;

    // Fetch existing settings to compare old and new values for audit logging
    const existingRes = await db.query('SELECT * FROM admin_settings WHERE id = 1');
    const defaultUserId = (process.env.CLUBKONNECT_USER_ID || process.env.CLUBKONNECT_U || '').trim();
    const defaultBaseUrl = (process.env.CLUBKONNECT_BASE_URL || 'https://www.nellobytesystems.com').trim();
    const existing = existingRes.rows[0] || {
      clubkonnect_user_id: defaultUserId,
      clubkonnect_api_key: '',
      clubkonnect_base_url: defaultBaseUrl
    };

    const newUserId = (userId !== undefined ? String(userId) : existing.clubkonnect_user_id).trim();
    const newApiKey = (apiKey !== undefined ? String(apiKey) : existing.clubkonnect_api_key).trim();
    const newBaseUrl = (baseUrl !== undefined ? String(baseUrl) : existing.clubkonnect_base_url).trim();

    // Log changes in settings_logs
    if (newUserId !== existing.clubkonnect_user_id) {
      await db.query(`
        INSERT INTO settings_logs (admin_id, field_changed, old_value, new_value)
        VALUES ($1, 'clubkonnect_user_id', $2, $3)
      `, [req.user!.id, existing.clubkonnect_user_id, newUserId]);
    }

    if (newApiKey !== existing.clubkonnect_api_key) {
      const oldMasked = existing.clubkonnect_api_key
        ? `${existing.clubkonnect_api_key.slice(0, 3)}••••••${existing.clubkonnect_api_key.slice(-3)}`
        : 'EMPTY';
      const newMasked = newApiKey
        ? `${newApiKey.slice(0, 3)}••••••${newApiKey.slice(-3)}`
        : 'EMPTY';

      await db.query(`
        INSERT INTO settings_logs (admin_id, field_changed, old_value, new_value)
        VALUES ($1, 'clubkonnect_api_key', $2, $3)
      `, [req.user!.id, oldMasked, newMasked]);
    }

    if (newBaseUrl !== existing.clubkonnect_base_url) {
      await db.query(`
        INSERT INTO settings_logs (admin_id, field_changed, old_value, new_value)
        VALUES ($1, 'clubkonnect_base_url', $2, $3)
      `, [req.user!.id, existing.clubkonnect_base_url, newBaseUrl]);
    }

    // Update admin_settings
    await db.query(`
      INSERT INTO admin_settings (id, clubkonnect_user_id, clubkonnect_api_key, clubkonnect_base_url, updated_at)
      VALUES (1, $1, $2, $3, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE SET
        clubkonnect_user_id = EXCLUDED.clubkonnect_user_id,
        clubkonnect_api_key = EXCLUDED.clubkonnect_api_key,
        clubkonnect_base_url = EXCLUDED.clubkonnect_base_url,
        updated_at = CURRENT_TIMESTAMP
    `, [newUserId, newApiKey, newBaseUrl]);

    // Also update process.env runtime cache
    if (newUserId) {
      process.env.CLUBKONNECT_USER_ID = newUserId;
      process.env.CLUBKONNECT_U = newUserId;
    }
    if (newApiKey) {
      process.env.CLUBKONNECT_API_KEY = newApiKey;
      process.env.CLUBKONNECT_A = newApiKey;
    }
    if (newBaseUrl) process.env.CLUBKONNECT_BASE_URL = newBaseUrl;

    return res.json({
      message: 'Sensitive API settings updated successfully and logged in settings_logs.'
    });
  } catch (err: any) {
    console.error('Update security settings error:', err);
    return res.status(500).json({ error: 'Failed to update security settings.' });
  }
});

/**
 * GET /api/admin/security/logs
 * Settings Change Log table: settings_logs
 */
router.get('/security/logs', async (_req, res) => {
  try {
    const db = await getDb();
    const result = await db.query(`
      SELECT 
        l.*,
        u.email as admin_email, u.full_name as admin_name
      FROM settings_logs l
      LEFT JOIN users u ON l.admin_id = u.id
      ORDER BY l.timestamp DESC
      LIMIT 100
    `);

    return res.json({ logs: result.rows });
  } catch (err: any) {
    console.error('Settings logs error:', err);
    return res.status(500).json({ error: 'Failed to retrieve settings change logs.' });
  }
});

/**
 * GET /api/admin/audit-logs
 */
router.get('/audit-logs', async (req, res) => {
  try {
    const db = await getDb();
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const offset = Number(req.query.offset) || 0;

    const result = await db.query(`
      SELECT 
        l.*,
        u.email as admin_email, u.full_name as admin_name
      FROM admin_audit_logs l
      LEFT JOIN users u ON l.admin_id = u.id
      ORDER BY l.created_at DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    return res.json({ logs: result.rows });
  } catch (err: any) {
    console.error('Audit logs error:', err);
    return res.status(500).json({ error: 'Failed to retrieve audit logs.' });
  }
});

export default router;
