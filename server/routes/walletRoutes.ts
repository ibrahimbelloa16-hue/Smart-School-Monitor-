import { Router, type Response } from 'express';
import { getDb } from '../db/database.ts';
import { requireAuth, type AuthRequest } from '../middleware/auth.ts';
import { walletService } from '../services/walletService.ts';
import { fundingService } from '../services/fundingService.ts';

const router = Router();

/**
 * GET /api/wallet/balance
 */
router.get('/balance', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const wallet = await walletService.getBalance(req.user!.id);
    return res.json(wallet);
  } catch (err: any) {
    console.error('Wallet balance fetch error:', err);
    return res.status(500).json({ error: 'Failed to retrieve wallet balance.' });
  }
});

/**
 * GET /api/wallet/ledger
 */
router.get('/ledger', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const offset = Number(req.query.offset) || 0;
    const ledger = await walletService.getLedger(req.user!.id, limit, offset);
    return res.json({ ledger });
  } catch (err: any) {
    console.error('Ledger fetch error:', err);
    return res.status(500).json({ error: 'Failed to retrieve wallet ledger.' });
  }
});

/**
 * GET /api/wallet/bank-details
 * Returns platform bank details for manual funding
 */
router.get('/bank-details', async (_req, res) => {
  try {
    const db = await getDb();
    const settingsRes = await db.query(`
      SELECT 
        bank_name, account_number, account_name, manual_funding_instructions,
        support_phone, support_email, apk_download_url
      FROM app_settings WHERE id = 1
    `);

    const settings = settingsRes.rows[0] || {
      bank_name: 'Opay',
      account_number: '6423809175',
      account_name: 'Ibrahim Bello',
      manual_funding_instructions: 'Make a direct bank transfer to our Opay account (6423809175 - Ibrahim Bello). After transferring, submit your transfer reference below.',
      support_phone: '08161720895',
      support_email: 'ibrahimmal916@gmail.com',
      apk_download_url: null
    };

    return res.json({ bankDetails: settings });
  } catch (err: any) {
    console.error('Bank details fetch error:', err);
    return res.status(500).json({ error: 'Failed to retrieve platform bank details.' });
  }
});

/**
 * POST /api/wallet/fund-request
 * Submit manual bank funding request (Requires admin approval before crediting)
 */
router.post('/fund-request', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { amountNaira, transferReference, proofImageUrl, senderName, senderBank } = req.body;

    const request = await fundingService.createRequest({
      userId: req.user!.id,
      amountNaira: Number(amountNaira),
      transferReference,
      proofImageUrl,
      senderName,
      senderBank
    });

    return res.status(201).json({
      message: 'Your funding request has been submitted successfully. Your wallet will be credited after the transfer is verified.',
      request
    });
  } catch (err: any) {
    console.error('Funding request error:', err);
    return res.status(400).json({ error: err.message || 'Failed to submit funding request.' });
  }
});

/**
 * GET /api/wallet/fund-requests
 * View user's submitted funding requests
 */
router.get('/fund-requests', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const requests = await fundingService.getUserRequests(req.user!.id);
    return res.json({ requests });
  } catch (err: any) {
    console.error('User funding requests fetch error:', err);
    return res.status(500).json({ error: 'Failed to retrieve funding requests.' });
  }
});

/**
 * GET /api/wallet/notifications
 * Retrieve notification alerts for the logged-in user
 */
router.get('/notifications', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDb();
    const result = await db.query(
      'SELECT * FROM user_notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20',
      [req.user!.id]
    );
    return res.json({ notifications: result.rows });
  } catch (err: any) {
    console.error('Notifications fetch error:', err);
    return res.status(500).json({ error: 'Failed to retrieve notifications.' });
  }
});

/**
 * POST /api/wallet/notifications/read
 */
router.post('/notifications/read', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDb();
    await db.query(
      'UPDATE user_notifications SET is_read = true WHERE user_id = $1',
      [req.user!.id]
    );
    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to mark notifications as read.' });
  }
});

export default router;
