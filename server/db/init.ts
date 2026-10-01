import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { getDb, isPostgresActive } from './database.ts';
import { restoreMissingFromSnapshot, syncDatabaseToSnapshot } from './persistenceBackup.ts';

export async function initDatabase() {
  const db = await getDb();

  // Read and execute schema
  const schemaPath = path.resolve(process.cwd(), 'server', 'db', 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  // Split and run statements (handling both full text or individual statements)
  const statements = schemaSql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const usingPg = isPostgresActive();

  for (const statement of statements) {
    try {
      let finalStatement = statement;
      if (usingPg) {
        // Map SQLite-specific types to PostgreSQL types
        finalStatement = finalStatement
          .replace(/INTEGER\s+PRIMARY\s+KEY\s+AUTOINCREMENT/gi, 'SERIAL PRIMARY KEY')
          .replace(/BOOLEAN\s+NOT\s+NULL\s+DEFAULT\s+1/gi, 'BOOLEAN NOT NULL DEFAULT true')
          .replace(/BOOLEAN\s+NOT\s+NULL\s+DEFAULT\s+0/gi, 'BOOLEAN NOT NULL DEFAULT false');
      }
      await db.query(finalStatement);
    } catch (err: any) {
      console.warn('Schema execution warning:', err.message);
    }
  }

  // Ensure pending_registrations table exists
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS pending_registrations (
        id SERIAL PRIMARY KEY,
        phone VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        referral_code VARCHAR(50),
        otp_code VARCHAR(10) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (e: any) {
    // ignore
  }

  // Restore any persistent user accounts and balances from secondary snapshot if needed
  await restoreMissingFromSnapshot();

  // Ensure funding_requests columns and nullability are up to date
  const fundingColumns = [
    'ALTER TABLE funding_requests ADD COLUMN IF NOT EXISTS internal_reference VARCHAR(100)',
    "ALTER TABLE funding_requests ADD COLUMN IF NOT EXISTS currency VARCHAR(10) DEFAULT 'NGN'",
    'ALTER TABLE funding_requests ADD COLUMN IF NOT EXISTS bank_name VARCHAR(100)',
    'ALTER TABLE funding_requests ADD COLUMN IF NOT EXISTS account_name VARCHAR(150)',
    'ALTER TABLE funding_requests ADD COLUMN IF NOT EXISTS account_number VARCHAR(50)',
    'ALTER TABLE funding_requests ADD COLUMN IF NOT EXISTS proof_image TEXT',
    'ALTER TABLE funding_requests ADD COLUMN IF NOT EXISTS amount NUMERIC(15, 2)'
  ];

  for (const query of fundingColumns) {
    try {
      await db.query(query);
    } catch (e: any) {
      // Column may already exist
    }
  }

  // Ensure admin_settings table exists
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS admin_settings (
        id INTEGER PRIMARY KEY DEFAULT 1,
        clubkonnect_user_id VARCHAR(255) NOT NULL DEFAULT '',
        clubkonnect_api_key VARCHAR(255) NOT NULL DEFAULT '',
        clubkonnect_base_url VARCHAR(255) NOT NULL DEFAULT 'https://www.nellobytesystems.com',
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (e: any) {}

  // Ensure settings_logs table exists
  try {
    const usingPg = isPostgresActive();
    await db.query(`
      CREATE TABLE IF NOT EXISTS settings_logs (
        id ${usingPg ? 'SERIAL PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT'},
        admin_id INTEGER,
        field_changed VARCHAR(100) NOT NULL,
        old_value TEXT,
        new_value TEXT,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (e: any) {}

  // Ensure user_notifications table exists
  try {
    const usingPg = isPostgresActive();
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_notifications (
        id ${usingPg ? 'SERIAL PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT'},
        user_id INTEGER NOT NULL,
        title VARCHAR(150) NOT NULL,
        message TEXT NOT NULL,
        type VARCHAR(50) NOT NULL DEFAULT 'funding_approved',
        is_read BOOLEAN NOT NULL DEFAULT ${usingPg ? 'false' : '0'},
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (e: any) {}

  // Ensure profiles table exists
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        role VARCHAR(50) DEFAULT 'user',
        full_name VARCHAR(100),
        email VARCHAR(150),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (e: any) {}

  // Seed or sync default admin_settings with environment variables
  try {
    const adminSettingsCheck = await db.query('SELECT * FROM admin_settings WHERE id = 1');
    const defaultUserId = (process.env.CLUBKONNECT_USER_ID || process.env.CLUBKONNECT_U || '').trim();
    const defaultApiKey = (process.env.CLUBKONNECT_API_KEY || process.env.CLUBKONNECT_A || '').trim();
    const defaultBaseUrl = (process.env.CLUBKONNECT_BASE_URL || 'https://www.nellobytesystems.com').trim();
    if (adminSettingsCheck.rows.length === 0) {
      await db.query(`
        INSERT INTO admin_settings (id, clubkonnect_user_id, clubkonnect_api_key, clubkonnect_base_url)
        VALUES (1, $1, $2, $3)
      `, [defaultUserId, defaultApiKey, defaultBaseUrl]);
    } else {
      if (defaultUserId && (!adminSettingsCheck.rows[0].clubkonnect_user_id || adminSettingsCheck.rows[0].clubkonnect_user_id === '08161720895')) {
        await db.query(`
          UPDATE admin_settings SET clubkonnect_user_id = $1 WHERE id = 1
        `, [defaultUserId]);
      }
      if (defaultApiKey && !adminSettingsCheck.rows[0].clubkonnect_api_key) {
        await db.query(`
          UPDATE admin_settings SET clubkonnect_api_key = $1 WHERE id = 1
        `, [defaultApiKey]);
      }
    }
  } catch (e: any) {
    console.warn('Admin settings initialization warning:', e.message);
  }

  const dropNotNulls = [
    'ALTER TABLE funding_requests ALTER COLUMN sender_name DROP NOT NULL',
    'ALTER TABLE funding_requests ALTER COLUMN sender_bank DROP NOT NULL',
    'ALTER TABLE funding_requests ALTER COLUMN transfer_reference DROP NOT NULL',
    'ALTER TABLE app_settings ADD COLUMN IF NOT EXISTS apk_download_url TEXT'
  ];

  for (const query of dropNotNulls) {
    try {
      await db.query(query);
    } catch (e: any) {
      // Ignore if not supported or already nullable
    }
  }

  // Seed or Update App Settings with permanent Opay bank & Ibrahim Bello support details
  const settingsCheck = await db.query('SELECT * FROM app_settings WHERE id = 1');
  if (settingsCheck.rows.length === 0) {
    await db.query(`
      INSERT INTO app_settings (
        id, platform_name, logo_url, support_phone, support_email,
        bank_name, account_number, account_name,
        manual_funding_instructions, default_markup_kobo, maintenance_mode, demo_mode
      ) VALUES (
        1,
        'Standard DataHub VTU',
        '/logo.svg',
        '08161720895',
        'ibrahimmal916@gmail.com',
        'Opay',
        '6423809175',
        'Ibrahim Bello',
        'Make a direct bank transfer to our Opay account above (6423809175 - Ibrahim Bello). After transferring, submit your transfer reference below. Our admin team will verify and credit your wallet promptly.',
        3000, -- ₦30 markup
        false,
        true  -- DEMO_MODE by default
      )
    `);
  } else {
    // Ensure existing settings have the correct permanent default bank & support info
    await db.query(`
      UPDATE app_settings SET
        platform_name = 'Standard DataHub VTU',
        logo_url = '/logo.svg',
        bank_name = 'Opay',
        account_number = '6423809175',
        account_name = 'Ibrahim Bello',
        support_phone = '08161720895',
        support_email = 'ibrahimmal916@gmail.com'
      WHERE id = 1
    `);
  }

  // Seed Airtime Products
  const airtimeCheck = await db.query('SELECT COUNT(*) as count FROM airtime_products');
  if (Number(airtimeCheck.rows[0]?.count || 0) === 0) {
    const airtimeNetworks = [
      { id: 'mtn-airtime', network: 'MTN', discount: 2.0 },
      { id: 'airtel-airtime', network: 'AIRTEL', discount: 2.0 },
      { id: 'glo-airtime', network: 'GLO', discount: 2.5 },
      { id: '9mobile-airtime', network: '9MOBILE', discount: 2.5 }
    ];
    for (const item of airtimeNetworks) {
      await db.query(`
        INSERT INTO airtime_products (id, network, discount_percent, min_amount_kobo, max_amount_kobo, is_active)
        VALUES ($1, $2, $3, 5000, 5000000, true)
        ON CONFLICT (id) DO NOTHING
      `, [item.id, item.network, item.discount]);
    }
  }

  // Seed and Update Data Plans with authentic ClubKonnect variation codes
  // MTN: 500, 1000, 2000, 3000, 5000, 10000
  // Airtel: Airtel500MB, Airtel1GB, Airtel2GB, Airtel3GB, Airtel5GB, Airtel10GB
  // Glo: 500, 1000, 2000, 3000, 5000, 10000
  // 9mobile: 9M500, 9M1000, 9M2000, 9M3000, 9M4500, 9M11000
  const defaultPlans = [
    // MTN SME & Direct Plans
    { id: 'mtn-sme-500mb', network: 'MTN', name: 'MTN SME 500MB', type: 'SME', amount: '500 MB', duration: '30 Days', code: '500', cost: 20500, markup: 4500 }, // Cost: ₦205, Markup: ₦45 -> Selling: ₦250
    { id: 'mtn-sme-1gb', network: 'MTN', name: 'MTN SME 1.0GB', type: 'SME', amount: '1.0 GB', duration: '30 Days', code: '1000', cost: 41000, markup: 4000 }, // Cost: ₦410, Markup: ₦40 -> Selling: ₦450 (Profit: ₦40)
    { id: 'mtn-sme-2gb', network: 'MTN', name: 'MTN SME 2.0GB', type: 'SME', amount: '2.0 GB', duration: '30 Days', code: '2000', cost: 82000, markup: 8000 }, // Cost: ₦820, Markup: ₦80 -> Selling: ₦900
    { id: 'mtn-sme-3gb', network: 'MTN', name: 'MTN SME 3.0GB', type: 'SME', amount: '3.0 GB', duration: '30 Days', code: '3000', cost: 123000, markup: 12000 }, // Cost: ₦1,230, Markup: ₦120 -> Selling: ₦1,350
    { id: 'mtn-sme-5gb', network: 'MTN', name: 'MTN SME 5.0GB', type: 'SME', amount: '5.0 GB', duration: '30 Days', code: '5000', cost: 205000, markup: 20000 }, // Cost: ₦2,050, Markup: ₦200 -> Selling: ₦2,250
    { id: 'mtn-sme-10gb', network: 'MTN', name: 'MTN SME 10.0GB', type: 'SME', amount: '10.0 GB', duration: '30 Days', code: '10000', cost: 410000, markup: 40000 }, // Cost: ₦4,100, Markup: ₦400 -> Selling: ₦4,500
    
    // MTN Direct Plans
    { id: 'mtn-direct-1gb', network: 'MTN', name: 'MTN Direct 1.0GB', type: 'Direct', amount: '1.0 GB', duration: '30 Days', code: '1000', cost: 43000, markup: 5000 }, // Cost: ₦430, Selling: ₦480
    { id: 'mtn-direct-2gb', network: 'MTN', name: 'MTN Direct 2.0GB', type: 'Direct', amount: '2.0 GB', duration: '30 Days', code: '2000', cost: 86000, markup: 9000 }, // Cost: ₦860, Selling: ₦950
    { id: 'mtn-direct-5gb', network: 'MTN', name: 'MTN Direct 5.0GB', type: 'Direct', amount: '5.0 GB', duration: '30 Days', code: '5000', cost: 215000, markup: 20000 }, // Cost: ₦2,150, Selling: ₦2,350

    // Airtel Corporate & Direct Plans
    { id: 'airtel-corp-500mb', network: 'AIRTEL', name: 'Airtel Corporate 500MB', type: 'Corporate Gifting', amount: '500 MB', duration: '30 Days', code: 'Airtel500MB', cost: 20500, markup: 4500 }, // Cost: ₦205, Selling: ₦250
    { id: 'airtel-corp-1gb', network: 'AIRTEL', name: 'Airtel Corporate 1.0GB', type: 'Corporate Gifting', amount: '1.0 GB', duration: '30 Days', code: 'Airtel1GB', cost: 41000, markup: 4000 }, // Cost: ₦410, Selling: ₦450
    { id: 'airtel-corp-2gb', network: 'AIRTEL', name: 'Airtel Corporate 2.0GB', type: 'Corporate Gifting', amount: '2.0 GB', duration: '30 Days', code: 'Airtel2GB', cost: 82000, markup: 8000 }, // Cost: ₦820, Selling: ₦900
    { id: 'airtel-corp-3gb', network: 'AIRTEL', name: 'Airtel Corporate 3.0GB', type: 'Corporate Gifting', amount: '3.0 GB', duration: '30 Days', code: 'Airtel3GB', cost: 123000, markup: 12000 }, // Cost: ₦1,230, Selling: ₦1,350
    { id: 'airtel-corp-5gb', network: 'AIRTEL', name: 'Airtel Corporate 5.0GB', type: 'Corporate Gifting', amount: '5.0 GB', duration: '30 Days', code: 'Airtel5GB', cost: 205000, markup: 20000 }, // Cost: ₦2,050, Selling: ₦2,250
    { id: 'airtel-corp-10gb', network: 'AIRTEL', name: 'Airtel Corporate 10.0GB', type: 'Corporate Gifting', amount: '10.0 GB', duration: '30 Days', code: 'Airtel10GB', cost: 410000, markup: 40000 }, // Cost: ₦4,100, Selling: ₦4,500

    // Glo Gifting & Direct Plans
    { id: 'glo-gift-500mb', network: 'GLO', name: 'Glo Gifting 500MB', type: 'Gifting', amount: '500 MB', duration: '30 Days', code: '500', cost: 20000, markup: 5000 }, // Cost: ₦200, Selling: ₦250
    { id: 'glo-gift-1gb', network: 'GLO', name: 'Glo Gifting 1.0GB', type: 'Gifting', amount: '1.0 GB', duration: '30 Days', code: '1000', cost: 39000, markup: 6000 }, // Cost: ₦390, Selling: ₦450
    { id: 'glo-gift-2gb', network: 'GLO', name: 'Glo Gifting 2.0GB', type: 'Gifting', amount: '2.0 GB', duration: '30 Days', code: '2000', cost: 78000, markup: 12000 }, // Cost: ₦780, Selling: ₦900
    { id: 'glo-gift-3gb', network: 'GLO', name: 'Glo Gifting 3.0GB', type: 'Gifting', amount: '3.0 GB', duration: '30 Days', code: '3000', cost: 117000, markup: 18000 }, // Cost: ₦1,170, Selling: ₦1,350
    { id: 'glo-gift-5gb', network: 'GLO', name: 'Glo Gifting 5.0GB', type: 'Gifting', amount: '5.0 GB', duration: '30 Days', code: '5000', cost: 195000, markup: 30000 }, // Cost: ₦1,950, Selling: ₦2,250
    { id: 'glo-gift-10gb', network: 'GLO', name: 'Glo Gifting 10.0GB', type: 'Gifting', amount: '10.0 GB', duration: '30 Days', code: '10000', cost: 390000, markup: 60000 }, // Cost: ₦3,900, Selling: ₦4,500

    // 9mobile SME & Gifting Plans
    { id: '9mobile-sme-500mb', network: '9MOBILE', name: '9mobile SME 500MB', type: 'SME', amount: '500 MB', duration: '30 Days', code: '9M500', cost: 17000, markup: 4000 }, // Cost: ₦170, Selling: ₦210
    { id: '9mobile-sme-1gb', network: '9MOBILE', name: '9mobile SME 1.0GB', type: 'SME', amount: '1.0 GB', duration: '30 Days', code: '9M1000', cost: 34000, markup: 5000 }, // Cost: ₦340, Selling: ₦390
    { id: '9mobile-sme-2gb', network: '9MOBILE', name: '9mobile SME 2.0GB', type: 'SME', amount: '2.0 GB', duration: '30 Days', code: '9M2000', cost: 68000, markup: 10000 }, // Cost: ₦680, Selling: ₦780
    { id: '9mobile-sme-3gb', network: '9MOBILE', name: '9mobile SME 3.0GB', type: 'SME', amount: '3.0 GB', duration: '30 Days', code: '9M3000', cost: 102000, markup: 15000 }, // Cost: ₦1,020, Selling: ₦1,170
    { id: '9mobile-sme-4-5gb', network: '9MOBILE', name: '9mobile SME 4.5GB', type: 'SME', amount: '4.5 GB', duration: '30 Days', code: '9M4500', cost: 150000, markup: 20000 }, // Cost: ₦1,500, Selling: ₦1,700
    { id: '9mobile-sme-11gb', network: '9MOBILE', name: '9mobile SME 11.0GB', type: 'SME', amount: '11.0 GB', duration: '30 Days', code: '9M11000', cost: 370000, markup: 40000 } // Cost: ₦3,700, Selling: ₦4,100
  ];

  for (const plan of defaultPlans) {
    const sellingPrice = plan.cost + plan.markup;
    await db.query(`
      INSERT INTO data_plans (
        id, network, plan_name, plan_type, data_amount, duration,
        provider_code, provider_cost_kobo, markup_kobo, selling_price_kobo,
        is_active, last_sync_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE SET
        provider_code = EXCLUDED.provider_code,
        network = EXCLUDED.network,
        plan_name = EXCLUDED.plan_name,
        plan_type = EXCLUDED.plan_type,
        data_amount = EXCLUDED.data_amount,
        duration = EXCLUDED.duration,
        provider_cost_kobo = EXCLUDED.provider_cost_kobo,
        markup_kobo = EXCLUDED.markup_kobo,
        selling_price_kobo = EXCLUDED.selling_price_kobo,
        is_active = true,
        last_sync_at = CURRENT_TIMESTAMP
    `, [
      plan.id, plan.network, plan.name, plan.type, plan.amount, plan.duration,
      plan.code, plan.cost, plan.markup, sellingPrice
    ]);
  }

  // Seed Default Admin Account if missing
  const adminCheck = await db.query("SELECT * FROM users WHERE email = 'admin@datahub.ng'");
  if (adminCheck.rows.length === 0) {
    const adminPasswordHash = await bcrypt.hash('AdminPassword123!', 10);
    const adminPinHash = await bcrypt.hash('1234', 10);

    const adminResult = await db.query(`
      INSERT INTO users (
        full_name, email, phone, password_hash, transaction_pin_hash,
        role, status, referral_code
      ) VALUES (
        'DataHub Super Admin', 'admin@datahub.ng', '08012345678',
        $1, $2, 'super_admin', 'active', 'ADMIN01'
      ) RETURNING id
    `, [adminPasswordHash, adminPinHash]);

    const adminId = adminResult.rows[0].id;

    // Create Admin Wallet
    await db.query(`
      INSERT INTO wallets (user_id, balance_kobo)
      VALUES ($1, 100000000) -- ₦1,000,000.00 master wallet
      ON CONFLICT (user_id) DO NOTHING
    `, [adminId]);
  } else {
    // Ensure admin user role is super_admin
    await db.query(`
      UPDATE users SET role = 'super_admin' WHERE email = 'admin@datahub.ng'
    `);
  }

  // Sync users to profiles table
  try {
    await db.query(`
      INSERT INTO profiles (id, user_id, role, full_name, email)
      SELECT id, id, role, full_name, email FROM users
      ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, full_name = EXCLUDED.full_name, email = EXCLUDED.email
    `);
  } catch (e: any) {}

  // Seed Default Test User Account if missing
  const userCheck = await db.query("SELECT * FROM users WHERE email = 'user@datahub.ng'");
  if (userCheck.rows.length === 0) {
    const userPasswordHash = await bcrypt.hash('UserPassword123!', 10);
    const userPinHash = await bcrypt.hash('1234', 10);

    const userResult = await db.query(`
      INSERT INTO users (
        full_name, email, phone, password_hash, transaction_pin_hash,
        role, status, referral_code
      ) VALUES (
        'Demo VTU Tester', 'user@datahub.ng', '08098765432',
        $1, $2, 'user', 'active', 'TESTUSER'
      ) RETURNING id
    `, [userPasswordHash, userPinHash]);

    const userId = userResult.rows[0].id;

    // Create Test User Wallet with ₦5,000.00 demo funds so immediate purchase tests work
    const initialBalanceKobo = 500000; // ₦5,000.00
    const walletRes = await db.query(`
      INSERT INTO wallets (user_id, balance_kobo)
      VALUES ($1, $2)
      RETURNING id
    `, [userId, initialBalanceKobo]);

    // Add initial credit ledger entry
    await db.query(`
      INSERT INTO wallet_ledger (
        wallet_id, user_id, amount_kobo, balance_before_kobo, balance_after_kobo,
        entry_type, reference, description, status
      ) VALUES (
        $1, $2, $3, 0, $3, 'credit', 'LEDGER-INIT-WELCOME-5000', 'Welcome Wallet Credit', 'successful'
      )
    `, [walletRes.rows[0].id, userId, initialBalanceKobo]);
  }

  // Ensure persistent snapshot is synced with latest state
  await syncDatabaseToSnapshot();

  console.log('Database initialized, migrations verified, and default seed records ready.');
}
