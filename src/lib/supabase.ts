import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://knnynfgtewbnvvcgelef.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchSupabasePlans(network?: string) {
  let query = supabase.from('data_plans').select('*').eq('is_active', true);
  if (network) {
    query = query.eq('network', network);
  }
  return await query;
}

export async function fetchSupabaseTransactions(userId?: string) {
  let query = supabase.from('transactions').select('*').order('created_at', { ascending: false });
  if (userId) {
    query = query.eq('user_id', userId);
  }
  return await query;
}

export async function fetchSupabaseWallet(userId: string) {
  return await supabase.from('wallet').select('*').eq('user_id', userId).maybeSingle();
}

export async function updateSupabaseWallet(userId: string, balance: number) {
  return await supabase.from('wallet').upsert({ user_id: userId, balance }, { onConflict: 'user_id' });
}

export async function insertSupabaseTransaction(transaction: {
  user_id?: string;
  type: string;
  network?: string;
  plan_name?: string;
  phone_number: string;
  amount: number;
  status?: string;
  reference?: string;
}) {
  return await supabase.from('transactions').insert([transaction]);
}
