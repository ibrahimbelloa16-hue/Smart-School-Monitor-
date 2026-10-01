import fs from 'fs';
import path from 'path';
import { getDb } from './database.ts';

const SNAPSHOT_PATH = path.resolve(process.cwd(), 'data', 'persistence_snapshot.json');

export interface PersistenceSnapshot {
  users: Array<{
    id?: number;
    full_name: string;
    email: string;
    phone: string;
    password_hash: string;
    transaction_pin_hash?: string | null;
    role: string;
    status: string;
    referral_code?: string | null;
    referred_by?: string | null;
    balance_kobo: number;
    created_at?: string;
  }>;
  transactions: Array<any>;
  ledger: Array<any>;
  settings?: any;
  updated_at: string;
}

/**
 * Loads snapshot from persistent disk file
 */
export function loadSnapshot(): PersistenceSnapshot {
  try {
    if (fs.existsSync(SNAPSHOT_PATH)) {
      const raw = fs.readFileSync(SNAPSHOT_PATH, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('[Persistence] Could not read snapshot:', err);
  }
  return {
    users: [],
    transactions: [],
    ledger: [],
    updated_at: new Date().toISOString()
  };
}

/**
 * Writes updated snapshot to disk atomically
 */
export function writeSnapshot(data: PersistenceSnapshot): void {
  try {
    const dir = path.dirname(SNAPSHOT_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const tempPath = `${SNAPSHOT_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempPath, SNAPSHOT_PATH);
  } catch (err) {
    console.warn('[Persistence] Could not write snapshot:', err);
  }
}

/**
 * Sync current database state to the persistence snapshot
 */
export async function syncDatabaseToSnapshot(): Promise<void> {
  try {
    const db = await getDb();
    const usersRes = await db.query(`
      SELECT 
        u.id, u.full_name, u.email, u.phone, u.password_hash, u.transaction_pin_hash,
        u.role, u.status, u.referral_code, u.referred_by, u.created_at,
        COALESCE(w.balance_kobo, 0) as balance_kobo
      FROM users u
      LEFT JOIN wallets w ON u.id = w.user_id
    `);

    const txRes = await db.query('SELECT * FROM transactions ORDER BY id DESC LIMIT 500');
    const ledgerRes = await db.query('SELECT * FROM wallet_ledger ORDER BY id DESC LIMIT 500');
    const settingsRes = await db.query('SELECT * FROM app_settings WHERE id = 1');

    const snapshot: PersistenceSnapshot = {
      users: usersRes.rows.map(r => ({
        ...r,
        balance_kobo: Number(r.balance_kobo || 0)
      })),
      transactions: txRes.rows,
      ledger: ledgerRes.rows,
      settings: settingsRes.rows[0],
      updated_at: new Date().toISOString()
    };

    writeSnapshot(snapshot);
  } catch (err) {
    console.warn('[Persistence] Snapshot synchronization error:', err);
  }
}

/**
 * Restores any missing users, wallets, and transactions from snapshot on startup
 */
export async function restoreMissingFromSnapshot(): Promise<void> {
  const snapshot = loadSnapshot();
  if (!snapshot.users || snapshot.users.length === 0) {
    return;
  }

  try {
    const db = await getDb();

    for (const u of snapshot.users) {
      const existing = await db.query('SELECT id FROM users WHERE email = $1 OR phone = $2', [u.email, u.phone]);
      let userId: number;

      if (existing.rows.length === 0) {
        const insertUser = await db.query(`
          INSERT INTO users (
            full_name, email, phone, password_hash, transaction_pin_hash,
            role, status, referral_code, referred_by
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING id
        `, [
          u.full_name, u.email, u.phone, u.password_hash, u.transaction_pin_hash || null,
          u.role || 'user', u.status || 'active', u.referral_code || null, u.referred_by || null
        ]);
        userId = insertUser.rows[0].id;
        console.log(`[Persistence] Restored persistent account: ${u.email} (${u.phone})`);
      } else {
        userId = existing.rows[0].id;
      }

      // Ensure wallet exists and retains saved balance
      const walletRes = await db.query('SELECT id, balance_kobo FROM wallets WHERE user_id = $1', [userId]);
      if (walletRes.rows.length === 0) {
        await db.query(`
          INSERT INTO wallets (user_id, balance_kobo)
          VALUES ($1, $2)
        `, [userId, u.balance_kobo || 0]);
      } else if (Number(walletRes.rows[0].balance_kobo) < Number(u.balance_kobo || 0)) {
        // Recover balance if it was higher in snapshot
        await db.query('UPDATE wallets SET balance_kobo = $1 WHERE user_id = $2', [u.balance_kobo, userId]);
      }
    }
  } catch (err) {
    console.warn('[Persistence] Error restoring snapshot records:', err);
  }
}
