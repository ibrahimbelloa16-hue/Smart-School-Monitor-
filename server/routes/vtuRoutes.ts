import { Router, type Response } from 'express';
import { getDb } from '../db/database.ts';
import { requireAuth, type AuthRequest } from '../middleware/auth.ts';
import { transactionEngine } from '../services/transactionEngine.ts';
import { walletService } from '../services/walletService.ts';

const router = Router();

/**
 * GET /api/vtu/plans
 * Public/User: returns active data plans.
 * Crucial security rule: Frontend is given internal plan IDs only.
 */
router.get('/plans', async (req, res) => {
  try {
    const db = await getDb();
    const network = req.query.network ? String(req.query.network).toUpperCase() : null;

    let query = `
      SELECT 
        id, network, plan_name, plan_type, data_amount, duration,
        selling_price_kobo, is_active
      FROM data_plans
      WHERE is_active = true
    `;
    const params: any[] = [];

    if (network) {
      query += ' AND network = $1';
      params.push(network);
    }

    query += ' ORDER BY network ASC, selling_price_kobo ASC';

    const result = await db.query(query, params);

    const plans = result.rows.map(p => ({
      id: p.id, // Internal DataHub Plan ID
      network: p.network,
      planName: p.plan_name,
      planType: p.plan_type,
      dataAmount: p.data_amount,
      duration: p.duration,
      sellingPriceKobo: Number(p.selling_price_kobo),
      sellingPriceNaira: Number(p.selling_price_kobo) / 100
    }));

    return res.json({ plans });
  } catch (err: any) {
    console.error('Data plans fetch error:', err);
    return res.status(500).json({ error: 'Failed to load data plans.' });
  }
});

/**
 * GET /api/vtu/airtime-products
 */
router.get('/airtime-products', async (_req, res) => {
  try {
    const db = await getDb();
    const result = await db.query(`
      SELECT 
        id, network, discount_percent, min_amount_kobo, max_amount_kobo, is_active
      FROM airtime_products
      WHERE is_active = true
      ORDER BY network ASC
    `);

    const products = result.rows.map(p => ({
      id: p.id,
      network: p.network,
      discountPercent: Number(p.discount_percent),
      minAmountNaira: Number(p.min_amount_kobo) / 100,
      maxAmountNaira: Number(p.max_amount_kobo) / 100
    }));

    return res.json({ products });
  } catch (err: any) {
    console.error('Airtime products fetch error:', err);
    return res.status(500).json({ error: 'Failed to load airtime products.' });
  }
});

/**
 * POST /api/vtu/buy-data
 * Secure data purchase via transaction engine
 */
router.post('/buy-data', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { planId, recipientPhone, transactionPin } = req.body;

    if (!planId) {
      return res.status(400).json({ error: 'Please select a data plan.' });
    }

    if (!recipientPhone) {
      return res.status(400).json({ error: 'Recipient phone number is required.' });
    }

    if (!transactionPin) {
      return res.status(400).json({ error: 'Please enter your 4-digit transaction PIN.' });
    }

    const result = await transactionEngine.processDataPurchase({
      userId: req.user!.id,
      planId,
      recipientPhone,
      transactionPin
    });

    // Fetch updated wallet balance
    const wallet = await walletService.getBalance(req.user!.id);

    return res.json({
      ...result,
      newBalanceNaira: wallet.balanceNaira
    });
  } catch (err: any) {
    console.warn('Data purchase handled:', err.message || err);
    const isConfigError = err.message && (err.message.includes('ClubKonnect') || err.message.includes('CLUBKONNECT_') || err.message.includes('aborted'));
    const friendlyError = isConfigError ? 'Service temporarily unavailable. Please try again shortly.' : (err.message || 'Data purchase failed.');
    return res.status(isConfigError ? 503 : 400).json({
      error: friendlyError,
      providerError: err.message || 'Service temporarily unavailable.',
      message: friendlyError
    });
  }
});

/**
 * POST /api/vtu/buy-airtime
 * Secure airtime top-up via transaction engine
 */
router.post('/buy-airtime', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { network, amountNaira, recipientPhone, transactionPin } = req.body;

    if (!network) {
      return res.status(400).json({ error: 'Please select a mobile network.' });
    }

    if (!amountNaira) {
      return res.status(400).json({ error: 'Please enter airtime recharge amount.' });
    }

    if (!recipientPhone) {
      return res.status(400).json({ error: 'Recipient phone number is required.' });
    }

    if (!transactionPin) {
      return res.status(400).json({ error: 'Please enter your 4-digit transaction PIN.' });
    }

    const result = await transactionEngine.processAirtimePurchase({
      userId: req.user!.id,
      network,
      amountNaira: Number(amountNaira),
      recipientPhone,
      transactionPin
    });

    const wallet = await walletService.getBalance(req.user!.id);

    return res.json({
      ...result,
      newBalanceNaira: wallet.balanceNaira
    });
  } catch (err: any) {
    console.warn('Airtime purchase handled:', err.message || err);
    const isConfigError = err.message && (err.message.includes('ClubKonnect') || err.message.includes('CLUBKONNECT_') || err.message.includes('aborted'));
    const friendlyError = isConfigError ? 'Service temporarily unavailable. Please try again shortly.' : (err.message || 'Airtime purchase failed.');
    return res.status(isConfigError ? 503 : 400).json({
      error: friendlyError,
      providerError: err.message || 'Service temporarily unavailable.',
      message: friendlyError
    });
  }
});

/**
 * GET /api/vtu/transactions
 * Retrieve transaction history for logged-in user
 */
router.get('/transactions', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDb();
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const offset = Number(req.query.offset) || 0;
    const type = req.query.type ? String(req.query.type) : null;
    const status = req.query.status ? String(req.query.status) : null;

    let query = `
      SELECT 
        t.id, t.reference, t.product_type, t.network, t.recipient_phone,
        t.selling_price_kobo, t.status, t.is_demo, t.created_at,
        p.plan_name, p.data_amount, p.duration
      FROM transactions t
      LEFT JOIN data_plans p ON t.plan_id = p.id
      WHERE t.user_id = $1
    `;
    const params: any[] = [req.user!.id];

    if (type) {
      params.push(type);
      query += ` AND t.product_type = $${params.length}`;
    }

    if (status) {
      if (status.toLowerCase() === 'successful' || status.toLowerCase() === 'success') {
        query += ` AND (LOWER(t.status) = 'success' OR LOWER(t.status) = 'successful')`;
      } else if (status.toLowerCase() === 'failed') {
        query += ` AND (LOWER(t.status) = 'failed' OR LOWER(t.status) = 'refunded')`;
      } else {
        params.push(status.toLowerCase());
        query += ` AND LOWER(t.status) = $${params.length}`;
      }
    }

    query += ` ORDER BY t.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await db.query(query, params);

    const transactions = result.rows.map(tx => ({
      id: tx.id,
      reference: tx.reference,
      productType: tx.product_type,
      network: tx.network,
      recipientPhone: tx.recipient_phone,
      amountNaira: Number(tx.selling_price_kobo) / 100,
      status: tx.status,
      isDemo: tx.is_demo,
      createdAt: tx.created_at,
      planName: tx.plan_name,
      dataAmount: tx.data_amount,
      duration: tx.duration
    }));

    return res.json({ transactions });
  } catch (err: any) {
    console.error('Transactions fetch error:', err);
    return res.status(500).json({ error: 'Failed to retrieve transactions.' });
  }
});

/**
 * GET /api/vtu/transactions/:id
 */
router.get('/transactions/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDb();
    const result = await db.query(`
      SELECT 
        t.*,
        p.plan_name, p.data_amount, p.duration
      FROM transactions t
      LEFT JOIN data_plans p ON t.plan_id = p.id
      WHERE t.id = $1 AND t.user_id = $2
    `, [req.params.id, req.user!.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }

    const tx = result.rows[0];
    return res.json({
      transaction: {
        id: tx.id,
        reference: tx.reference,
        productType: tx.product_type,
        network: tx.network,
        recipientPhone: tx.recipient_phone,
        amountNaira: Number(tx.selling_price_kobo) / 100,
        providerReference: tx.provider_reference,
        status: tx.status,
        isDemo: tx.is_demo,
        refundReference: tx.refund_reference,
        metadata: tx.metadata ? JSON.parse(tx.metadata) : null,
        createdAt: tx.created_at,
        planName: tx.plan_name,
        dataAmount: tx.data_amount,
        duration: tx.duration
      }
    });
  } catch (err: any) {
    console.error('Transaction details fetch error:', err);
    return res.status(500).json({ error: 'Failed to retrieve transaction details.' });
  }
});

/**
 * POST /api/vtu/clubkonnect-callback
 * Handles webhook notifications from ClubKonnect
 */
router.all('/clubkonnect-callback', async (req, res) => {
  try {
    const db = await getDb();
    const payload = { ...req.query, ...req.body };
    const orderId = payload.orderid || payload.OrderID || payload.order_id;
    const statusCode = payload.statuscode || payload.StatusCode;
    const orderStatus = (payload.orderstatus || payload.OrderStatus || '').toUpperCase();

    if (orderId) {
      const txRes = await db.query(
        'SELECT * FROM transactions WHERE provider_reference = $1 OR reference = $2',
        [orderId, orderId]
      );

      if (txRes.rows.length > 0) {
        const tx = txRes.rows[0];
        if (tx.status === 'pending' || tx.status === 'processing') {
          if (statusCode === '100' || orderStatus === 'ORDER_COMPLETED') {
            await db.query(`
              UPDATE transactions 
              SET status = 'successful', updated_at = CURRENT_TIMESTAMP 
              WHERE id = $1
            `, [tx.id]);
          } else if (statusCode === '103' || orderStatus === 'ORDER_CANCELLED' || orderStatus === 'ORDER_FAILED') {
            // Auto refund
            const refundRef = `CALLBACK-REFUND-${tx.reference}`;
            await walletService.credit(
              tx.user_id,
              Number(tx.selling_price_kobo),
              refundRef,
              `Callback Refund: Provider reported transaction failure (${tx.reference})`
            );
            await db.query(`
              UPDATE transactions 
              SET status = 'refunded', refund_reference = $1, updated_at = CURRENT_TIMESTAMP 
              WHERE id = $2
            `, [refundRef, tx.id]);
          }
        }
      }
    }

    return res.status(200).send('OK');
  } catch (err: any) {
    console.error('ClubKonnect callback error:', err);
    return res.status(200).send('OK');
  }
});

export default router;
