CREATE TABLE IF NOT EXISTS data_plans (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), network TEXT, plan_name TEXT, price NUMERIC, is_active BOOLEAN DEFAULT true);
CREATE TABLE IF NOT EXISTS transactions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), phone_number TEXT, amount NUMERIC, status TEXT DEFAULT 'success', reference TEXT, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS wallet (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id TEXT UNIQUE, balance NUMERIC DEFAULT 0);
ALTER TABLE data_plans ENABLE ROW LEVEL SECURITY; ALTER TABLE transactions ENABLE ROW LEVEL SECURITY; ALTER TABLE wallet ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_all" ON data_plans FOR ALL USING (true) WITH CHECK (true); CREATE POLICY "allow_all" ON transactions FOR ALL USING (true) WITH CHECK (true); CREATE POLICY "allow_all" ON wallet FOR ALL USING (true) WITH CHECK (true);
