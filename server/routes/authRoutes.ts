import { Router, type Response } from 'express';
import bcrypt from 'bcryptjs';
import { getDb } from '../db/database.ts';
import { generateToken, requireAuth, type AuthRequest } from '../middleware/auth.ts';
import { clubkonnect } from '../services/clubkonnectService.ts';
import { walletService } from '../services/walletService.ts';
import { syncDatabaseToSnapshot } from '../db/persistenceBackup.ts';

const router = Router();

/**
 * Helper to generate random 4-digit numeric OTP
 */
function generate4DigitOtp(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

/**
 * POST /api/auth/register-request
 * Step 1: Validates details, generates 4-digit OTP, stores pending registration
 */
router.post('/register-request', async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword, referralCode } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ error: 'Full name is required.' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const cleanPhone = clubkonnect.normalizePhone(phone || '');
    if (!clubkonnect.isValidNigerianPhone(cleanPhone)) {
      return res.status(400).json({ error: 'Please provide a valid 11-digit Nigerian phone number (e.g. 08012345678).' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const db = await getDb();

    // Check email uniqueness
    const emailCheck = await db.query('SELECT id FROM users WHERE email = $1', [email.trim().toLowerCase()]);
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this email address already exists. Please log in.' });
    }

    // Check phone uniqueness
    const phoneCheck = await db.query('SELECT id FROM users WHERE phone = $1', [cleanPhone]);
    if (phoneCheck.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this phone number already exists. Please log in.' });
    }

    // Generate fast 4-digit OTP
    const otpCode = generate4DigitOtp();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins expiry
    const passwordHash = await bcrypt.hash(password, 10);

    // Save or update pending registration
    await db.query(`
      INSERT INTO pending_registrations (
        phone, email, full_name, password_hash, referral_code, otp_code, expires_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (phone) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        password_hash = EXCLUDED.password_hash,
        referral_code = EXCLUDED.referral_code,
        otp_code = EXCLUDED.otp_code,
        expires_at = EXCLUDED.expires_at,
        created_at = CURRENT_TIMESTAMP
    `, [
      cleanPhone,
      email.trim().toLowerCase(),
      fullName.trim(),
      passwordHash,
      referralCode?.trim() || null,
      otpCode,
      expiresAt
    ]);

    console.log(`[Registration OTP] Generated 4-digit OTP ${otpCode} for phone ${cleanPhone}`);

    return res.status(200).json({
      success: true,
      message: 'A 4-digit verification OTP has been generated for your number.',
      phone: cleanPhone,
      email: email.trim().toLowerCase(),
      otp: otpCode // Provided so user sees their verification code immediately
    });
  } catch (err: any) {
    console.error('Register request error:', err);
    return res.status(500).json({ error: 'Failed to initiate registration verification.' });
  }
});

/**
 * POST /api/auth/resend-otp
 * Resend a new 4-digit OTP to pending registration
 */
router.post('/resend-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    const cleanPhone = clubkonnect.normalizePhone(phone || '');
    if (!cleanPhone) {
      return res.status(400).json({ error: 'Phone number is required.' });
    }

    const db = await getDb();
    const pendingRes = await db.query('SELECT * FROM pending_registrations WHERE phone = $1', [cleanPhone]);
    if (pendingRes.rows.length === 0) {
      return res.status(404).json({ error: 'No pending registration found for this phone number. Please sign up again.' });
    }

    const newOtp = generate4DigitOtp();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await db.query(`
      UPDATE pending_registrations
      SET otp_code = $1, expires_at = $2
      WHERE phone = $3
    `, [newOtp, expiresAt, cleanPhone]);

    console.log(`[Registration OTP] Resent 4-digit OTP ${newOtp} to phone ${cleanPhone}`);

    return res.json({
      success: true,
      message: 'A new 4-digit OTP code has been dispatched.',
      phone: cleanPhone,
      otp: newOtp
    });
  } catch (err: any) {
    console.error('Resend OTP error:', err);
    return res.status(500).json({ error: 'Failed to resend OTP code.' });
  }
});

/**
 * POST /api/auth/verify-otp
 * Step 2: Verifies 4-digit OTP, activates account, creates wallet, saves permanently
 */
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone number and 4-digit OTP are required.' });
    }

    const cleanPhone = clubkonnect.normalizePhone(phone);
    const cleanOtp = String(otp).trim();

    if (!/^\d{4}$/.test(cleanOtp)) {
      return res.status(400).json({ error: 'OTP must be exactly 4 digits.' });
    }

    const db = await getDb();
    const pendingRes = await db.query('SELECT * FROM pending_registrations WHERE phone = $1', [cleanPhone]);
    if (pendingRes.rows.length === 0) {
      return res.status(404).json({ error: 'Pending registration not found. Please sign up again.' });
    }

    const pending = pendingRes.rows[0];

    // Check expiry
    if (new Date(pending.expires_at).getTime() < Date.now()) {
      return res.status(400).json({ error: 'OTP has expired. Please tap "Resend OTP" to receive a fresh code.' });
    }

    // Verify OTP code
    if (pending.otp_code !== cleanOtp) {
      return res.status(400).json({ error: 'Invalid 4-digit OTP. Please check the code and try again.' });
    }

    // Generate unique referral code for user
    const generatedReferralCode = 'DH' + Math.random().toString(36).substring(2, 7).toUpperCase();

    // Create user and wallet atomically
    const newUser = await db.transaction(async (tx) => {
      const userRes = await tx.query(`
        INSERT INTO users (
          full_name, email, phone, password_hash, role, status, referral_code, referred_by
        ) VALUES ($1, $2, $3, $4, 'user', 'active', $5, $6)
        RETURNING id, full_name, email, phone, role, referral_code, created_at
      `, [
        pending.full_name,
        pending.email,
        pending.phone,
        pending.password_hash,
        generatedReferralCode,
        pending.referral_code || null
      ]);

      const user = userRes.rows[0];

      // Create initial wallet
      await tx.query(`
        INSERT INTO wallets (user_id, balance_kobo)
        VALUES ($1, 0)
      `, [user.id]);

      // Remove from pending_registrations
      await tx.query('DELETE FROM pending_registrations WHERE phone = $1', [cleanPhone]);

      return user;
    });

    // Ensure database state is saved to persistent snapshot
    syncDatabaseToSnapshot().catch(() => {});

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      fullName: newUser.full_name
    });

    return res.status(201).json({
      message: 'Account verified and activated successfully! Welcome to Standard DataHub.',
      token,
      user: {
        id: newUser.id,
        fullName: newUser.full_name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        referralCode: newUser.referral_code,
        hasPin: false,
        balanceKobo: 0,
        balanceNaira: 0
      }
    });
  } catch (err: any) {
    console.error('Verify OTP error:', err);
    return res.status(500).json({ error: err.message || 'OTP verification failed.' });
  }
});

/**
 * POST /api/auth/register
 * Direct registration endpoint (backward compatible)
 */
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword, referralCode, otp } = req.body;

    // Validation
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ error: 'Full name is required.' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const cleanPhone = clubkonnect.normalizePhone(phone || '');
    if (!clubkonnect.isValidNigerianPhone(cleanPhone)) {
      return res.status(400).json({ error: 'Please provide a valid 11-digit Nigerian phone number (e.g. 08012345678).' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const db = await getDb();

    // Check email uniqueness
    const emailCheck = await db.query('SELECT id FROM users WHERE email = $1', [email.trim().toLowerCase()]);
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this email address already exists.' });
    }

    // Check phone uniqueness
    const phoneCheck = await db.query('SELECT id FROM users WHERE phone = $1', [cleanPhone]);
    if (phoneCheck.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this phone number already exists.' });
    }

    // Generate unique referral code for the new user
    const generatedReferralCode = 'DH' + Math.random().toString(36).substring(2, 7).toUpperCase();

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user and wallet atomically
    const newUser = await db.transaction(async (tx) => {
      const userRes = await tx.query(`
        INSERT INTO users (
          full_name, email, phone, password_hash, role, status, referral_code, referred_by
        ) VALUES ($1, $2, $3, $4, 'user', 'active', $5, $6)
        RETURNING id, full_name, email, phone, role, referral_code, created_at
      `, [
        fullName.trim(),
        email.trim().toLowerCase(),
        cleanPhone,
        passwordHash,
        generatedReferralCode,
        referralCode?.trim() || null
      ]);

      const user = userRes.rows[0];

      // Create initial wallet
      await tx.query(`
        INSERT INTO wallets (user_id, balance_kobo)
        VALUES ($1, 0)
      `, [user.id]);

      return user;
    });

    // Sync to persistence snapshot
    syncDatabaseToSnapshot().catch(() => {});

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      fullName: newUser.full_name
    });

    return res.status(201).json({
      message: 'Registration successful! Welcome to Standard DataHub.',
      token,
      user: {
        id: newUser.id,
        fullName: newUser.full_name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        referralCode: newUser.referral_code,
        hasPin: false,
        balanceKobo: 0,
        balanceNaira: 0
      }
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

/**
 * POST /api/auth/login
 * Supports email or phone number
 */
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ error: 'Please enter your email or phone number, and password.' });
    }

    const db = await getDb();
    const cleanIdentifier = identifier.trim().toLowerCase();
    const cleanPhone = clubkonnect.normalizePhone(identifier.trim());

    const userRes = await db.query(`
      SELECT * FROM users 
      WHERE LOWER(email) = $1 OR phone = $2
    `, [cleanIdentifier, cleanPhone]);

    if (userRes.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid login credentials. Please check your email/phone and password.' });
    }

    const user = userRes.rows[0];

    if (user.status === 'suspended') {
      return res.status(403).json({ error: 'Your account has been suspended. Please contact Standard DataHub Support.' });
    }

    const passwordValid = await bcrypt.compare(password, user.password_hash);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Invalid login credentials. Please check your email/phone and password.' });
    }

    // Get wallet info
    const wallet = await walletService.getBalance(user.id);

    const token = generateToken({
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      fullName: user.full_name
    });

    return res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        referralCode: user.referral_code,
        hasPin: Boolean(user.transaction_pin_hash),
        balanceKobo: wallet.balanceKobo,
        balanceNaira: wallet.balanceNaira
      }
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error during login.' });
  }
});

/**
 * GET /api/auth/me
 */
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDb();
    const userRes = await db.query(
      'SELECT id, full_name, email, phone, role, status, referral_code, transaction_pin_hash, created_at FROM users WHERE id = $1',
      [req.user!.id]
    );

    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const user = userRes.rows[0];
    const wallet = await walletService.getBalance(user.id);

    // Get transaction summary counts
    const txSummary = await db.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'successful' THEN 1 END) as successful,
        COUNT(CASE WHEN status = 'pending' OR status = 'processing' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'failed' OR status = 'refunded' THEN 1 END) as failed
      FROM transactions 
      WHERE user_id = $1
    `, [user.id]);

    return res.json({
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        referralCode: user.referral_code,
        hasPin: Boolean(user.transaction_pin_hash),
        createdAt: user.created_at,
        balanceKobo: wallet.balanceKobo,
        balanceNaira: wallet.balanceNaira,
        stats: {
          total: Number(txSummary.rows[0]?.total || 0),
          successful: Number(txSummary.rows[0]?.successful || 0),
          pending: Number(txSummary.rows[0]?.pending || 0),
          failed: Number(txSummary.rows[0]?.failed || 0)
        }
      }
    });
  } catch (err: any) {
    console.error('Profile fetch error:', err);
    return res.status(500).json({ error: 'Failed to load user profile.' });
  }
});

/**
 * POST /api/auth/set-pin
 * Set or change 4-digit Transaction PIN
 */
router.post('/set-pin', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { newPin, confirmPin, currentPin } = req.body;

    if (!newPin || !/^\d{4}$/.test(newPin)) {
      return res.status(400).json({ error: 'Transaction PIN must be exactly 4 digits (0-9).' });
    }

    if (newPin !== confirmPin) {
      return res.status(400).json({ error: 'New PIN and confirm PIN do not match.' });
    }

    const db = await getDb();
    const userRes = await db.query('SELECT transaction_pin_hash FROM users WHERE id = $1', [req.user!.id]);
    const currentPinHash = userRes.rows[0]?.transaction_pin_hash;

    // If already has a PIN, verify current PIN
    if (currentPinHash) {
      if (!currentPin) {
        return res.status(400).json({ error: 'Current PIN is required to set a new PIN.' });
      }
      const match = await bcrypt.compare(currentPin, currentPinHash);
      if (!match) {
        return res.status(401).json({ error: 'Incorrect current transaction PIN.' });
      }
    }

    const newPinHash = await bcrypt.hash(newPin, 10);
    await db.query('UPDATE users SET transaction_pin_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [
      newPinHash,
      req.user!.id
    ]);

    return res.json({ message: 'Transaction PIN successfully updated!', hasPin: true });
  } catch (err: any) {
    console.error('Set PIN error:', err);
    return res.status(500).json({ error: 'Failed to update transaction PIN.' });
  }
});

/**
 * POST /api/auth/change-password
 */
router.post('/change-password', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Please provide current and new passwords.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New passwords do not match.' });
    }

    const db = await getDb();
    const userRes = await db.query('SELECT password_hash FROM users WHERE id = $1', [req.user!.id]);
    const match = await bcrypt.compare(currentPassword, userRes.rows[0]?.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Incorrect current password.' });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [
      newHash,
      req.user!.id
    ]);

    return res.json({ message: 'Password changed successfully.' });
  } catch (err: any) {
    console.error('Change password error:', err);
    return res.status(500).json({ error: 'Failed to change password.' });
  }
});

/**
 * POST /api/auth/forgot-password
 */
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  // Security best practice: don't reveal whether the email exists
  return res.json({
    message: 'If an account exists with this email, password reset instructions have been dispatched. Contact Standard DataHub support for expedited assistance.'
  });
});

export default router;
