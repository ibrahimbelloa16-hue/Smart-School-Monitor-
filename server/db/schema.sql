-- Standard DataHub SQLite Schema
-- Permanent persistence schema: Never drops tables or wipes user data
-- All financial amounts are stored as integer KOBO (1 Naira = 100 Kobo)

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  transaction_pin_hash VARCHAR(255),
  role VARCHAR(20) NOT NULL DEFAULT 'user', -- 'user', 'admin'
  status VARCHAR(20) NOT NULL DEFAULT 'active', -- 'active', 'suspended'
  referral_code VARCHAR(50) UNIQUE,
  referred_by VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wallets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  balance_kobo BIGINT NOT NULL DEFAULT 0 CHECK (balance_kobo >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wallet_ledger (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wallet_id INTEGER NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount_kobo BIGINT NOT NULL,
  balance_before_kobo BIGINT NOT NULL,
  balance_after_kobo BIGINT NOT NULL,
  entry_type VARCHAR(20) NOT NULL, -- 'credit', 'debit'
  reference VARCHAR(100) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'successful',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS funding_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference VARCHAR(100) UNIQUE NOT NULL,
  internal_reference VARCHAR(100) UNIQUE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount_kobo BIGINT NOT NULL CHECK (amount_kobo > 0),
  currency VARCHAR(10) NOT NULL DEFAULT 'NGN',
  bank_name VARCHAR(100),
  account_name VARCHAR(150),
  account_number VARCHAR(50),
  sender_name VARCHAR(150),
  sender_bank VARCHAR(100),
  transfer_reference VARCHAR(100),
  proof_image_url TEXT,
  proof_image TEXT,
  amount NUMERIC(15, 2),
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  admin_id INTEGER REFERENCES users(id),
  rejection_reason TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  clubkonnect_user_id VARCHAR(255) NOT NULL DEFAULT '',
  clubkonnect_api_key VARCHAR(255) NOT NULL DEFAULT '',
  clubkonnect_base_url VARCHAR(255) NOT NULL DEFAULT 'https://www.nellobytesystems.com',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_id INTEGER REFERENCES users(id),
  field_changed VARCHAR(100) NOT NULL,
  old_value TEXT,
  new_value TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'funding_approved',
  is_read BOOLEAN NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  role VARCHAR(50) DEFAULT 'user',
  full_name VARCHAR(100),
  email VARCHAR(150),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS data_plans (
  id VARCHAR(100) PRIMARY KEY, -- Internal plan ID (e.g. 'mtn-sme-1gb')
  network VARCHAR(20) NOT NULL, -- 'MTN', 'AIRTEL', 'GLO', '9MOBILE'
  plan_name VARCHAR(100) NOT NULL,
  plan_type VARCHAR(50) NOT NULL DEFAULT 'SME', -- 'SME', 'Gifting', 'Corporate Gifting', 'Direct'
  data_amount VARCHAR(50) NOT NULL, -- e.g. '1.0 GB'
  duration VARCHAR(50) NOT NULL, -- e.g. '30 Days'
  provider_code VARCHAR(50) NOT NULL, -- ClubKonnect DataPlan variation code
  provider_cost_kobo BIGINT NOT NULL,
  markup_kobo BIGINT NOT NULL DEFAULT 3000,
  selling_price_kobo BIGINT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT 1,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS airtime_products (
  id VARCHAR(50) PRIMARY KEY,
  network VARCHAR(20) NOT NULL,
  discount_percent NUMERIC(5, 2) NOT NULL DEFAULT 2.00,
  min_amount_kobo BIGINT NOT NULL DEFAULT 5000, -- ₦50
  max_amount_kobo BIGINT NOT NULL DEFAULT 5000000, -- ₦50,000
  is_active BOOLEAN NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference VARCHAR(100) UNIQUE NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_type VARCHAR(50) NOT NULL, -- 'data', 'airtime', 'wallet_funding', 'refund'
  network VARCHAR(20),
  recipient_phone VARCHAR(20),
  plan_id VARCHAR(100) REFERENCES data_plans(id),
  provider VARCHAR(50) NOT NULL DEFAULT 'ClubKonnect',
  provider_reference VARCHAR(100),
  provider_cost_kobo BIGINT NOT NULL DEFAULT 0,
  selling_price_kobo BIGINT NOT NULL DEFAULT 0,
  profit_kobo BIGINT NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'successful', 'failed', 'refunded'
  is_demo BOOLEAN NOT NULL DEFAULT 1,
  refund_reference VARCHAR(100) UNIQUE,
  metadata TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transaction_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transaction_id INTEGER NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_id INTEGER REFERENCES users(id),
  admin_email VARCHAR(150),
  action VARCHAR(100) NOT NULL,
  target_id VARCHAR(100),
  target_type VARCHAR(50),
  details TEXT,
  ip_address VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pending_registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  referral_code VARCHAR(50),
  otp_code VARCHAR(10) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS app_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  platform_name VARCHAR(100) NOT NULL DEFAULT 'Standard DataHub VTU',
  logo_url TEXT,
  support_phone VARCHAR(50) NOT NULL DEFAULT '08161720895',
  support_email VARCHAR(100) NOT NULL DEFAULT 'ibrahimmal916@gmail.com',
  bank_name VARCHAR(100) NOT NULL DEFAULT 'Opay',
  account_number VARCHAR(50) NOT NULL DEFAULT '6423809175',
  account_name VARCHAR(150) NOT NULL DEFAULT 'Ibrahim Bello',
  manual_funding_instructions TEXT,
  default_markup_kobo BIGINT NOT NULL DEFAULT 3000,
  maintenance_mode BOOLEAN NOT NULL DEFAULT 0,
  demo_mode BOOLEAN NOT NULL DEFAULT 1,
  apk_download_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Permanent Indexes for high performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_reference ON transactions(reference);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
