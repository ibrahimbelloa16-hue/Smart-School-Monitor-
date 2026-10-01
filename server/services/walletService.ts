import { getDb, type DbClient } from '../db/database.ts';
import { syncDatabaseToSnapshot } from '../db/persistenceBackup.ts';

export interface WalletBalanceInfo {
  userId: number;
  walletId: number;
  balanceKobo: number;
  balanceNaira: number;
}

export class WalletService {
  /**
   * Retrieves wallet balance for a user
   */
  public async getBalance(userId: number): Promise<WalletBalanceInfo> {
    const db = await getDb();
    const res = await db.query(
      'SELECT id, balance_kobo FROM wallets WHERE user_id = $1',
      [userId]
    );

    if (res.rows.length === 0) {
      // Auto-create wallet if not yet created
      const createRes = await db.query(
        'INSERT INTO wallets (user_id, balance_kobo) VALUES ($1, 0) RETURNING id, balance_kobo',
        [userId]
      );
      const balanceKobo = Number(createRes.rows[0].balance_kobo);
      return {
        userId,
        walletId: createRes.rows[0].id,
        balanceKobo,
        balanceNaira: balanceKobo / 100
      };
    }

    const balanceKobo = Number(res.rows[0].balance_kobo);
    return {
      userId,
      walletId: res.rows[0].id,
      balanceKobo,
      balanceNaira: balanceKobo / 100
    };
  }

  /**
   * Debits a wallet atomically with row locking.
   * Protects against negative balances and duplicate debit references.
   */
  public async debit(
    userId: number,
    amountKobo: number,
    reference: string,
    description: string,
    existingClient?: DbClient
  ): Promise<{ success: boolean; newBalanceKobo: number; error?: string }> {
    if (amountKobo <= 0) {
      throw new Error('Debit amount must be positive integer kobo.');
    }

    const runner = async (client: DbClient) => {
      // Check if this reference was already processed in wallet ledger to prevent duplicate debit
      const dupCheck = await client.query(
        'SELECT id FROM wallet_ledger WHERE reference = $1',
        [reference]
      );
      if (dupCheck.rows.length > 0) {
        throw new Error(`Duplicate transaction reference: ${reference}`);
      }

      // Lock the wallet row to prevent concurrent race condition debits
      const walletRes = await client.query(
        'SELECT id, balance_kobo FROM wallets WHERE user_id = $1 FOR UPDATE',
        [userId]
      );

      if (walletRes.rows.length === 0) {
        throw new Error('User wallet not found.');
      }

      const currentBalance = Number(walletRes.rows[0].balance_kobo);
      const walletId = walletRes.rows[0].id;

      if (currentBalance < amountKobo) {
        return {
          success: false,
          newBalanceKobo: currentBalance,
          error: `Insufficient wallet balance. Available: ₦${(currentBalance / 100).toFixed(2)}, Required: ₦${(amountKobo / 100).toFixed(2)}`
        };
      }

      const newBalance = currentBalance - amountKobo;

      // Update wallet balance
      await client.query(
        'UPDATE wallets SET balance_kobo = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [newBalance, walletId]
      );

      // Create ledger entry
      await client.query(
        `INSERT INTO wallet_ledger (
          wallet_id, user_id, amount_kobo, balance_before_kobo, balance_after_kobo,
          entry_type, reference, description, status
        ) VALUES ($1, $2, $3, $4, $5, 'debit', $6, $7, 'successful')`,
        [walletId, userId, amountKobo, currentBalance, newBalance, reference, description]
      );

      return {
        success: true,
        newBalanceKobo: newBalance
      };
    };

    let res: { success: boolean; newBalanceKobo: number; error?: string };
    if (existingClient) {
      res = await runner(existingClient);
    } else {
      const db = await getDb();
      res = await db.transaction(runner);
    }
    syncDatabaseToSnapshot().catch(() => {});
    return res;
  }

  /**
   * Credits a wallet atomically with row locking.
   * Protects against double crediting via duplicate reference check.
   */
  public async credit(
    userId: number,
    amountKobo: number,
    reference: string,
    description: string,
    existingClient?: DbClient
  ): Promise<{ success: boolean; newBalanceKobo: number }> {
    if (amountKobo <= 0) {
      throw new Error('Credit amount must be positive integer kobo.');
    }

    const runner = async (client: DbClient) => {
      // Check duplicate reference
      const dupCheck = await client.query(
        'SELECT id FROM wallet_ledger WHERE reference = $1',
        [reference]
      );
      if (dupCheck.rows.length > 0) {
        throw new Error(`Duplicate transaction reference: ${reference}`);
      }

      const walletRes = await client.query(
        'SELECT id, balance_kobo FROM wallets WHERE user_id = $1 FOR UPDATE',
        [userId]
      );

      let walletId: number;
      let currentBalance: number;

      if (walletRes.rows.length === 0) {
        const createRes = await client.query(
          'INSERT INTO wallets (user_id, balance_kobo) VALUES ($1, 0) RETURNING id, balance_kobo',
          [userId]
        );
        walletId = createRes.rows[0].id;
        currentBalance = 0;
      } else {
        walletId = walletRes.rows[0].id;
        currentBalance = Number(walletRes.rows[0].balance_kobo);
      }

      const newBalance = currentBalance + amountKobo;

      await client.query(
        'UPDATE wallets SET balance_kobo = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [newBalance, walletId]
      );

      await client.query(
        `INSERT INTO wallet_ledger (
          wallet_id, user_id, amount_kobo, balance_before_kobo, balance_after_kobo,
          entry_type, reference, description, status
        ) VALUES ($1, $2, $3, $4, $5, 'credit', $6, $7, 'successful')`,
        [walletId, userId, amountKobo, currentBalance, newBalance, reference, description]
      );

      return {
        success: true,
        newBalanceKobo: newBalance
      };
    };

    let res: { success: boolean; newBalanceKobo: number };
    if (existingClient) {
      res = await runner(existingClient);
    } else {
      const db = await getDb();
      res = await db.transaction(runner);
    }
    syncDatabaseToSnapshot().catch(() => {});
    return res;
  }

  /**
   * Retrieves ledger history for a user
   */
  public async getLedger(userId: number, limit = 50, offset = 0) {
    const db = await getDb();
    const res = await db.query(
      `SELECT * FROM wallet_ledger 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );
    return res.rows;
  }
}

export const walletService = new WalletService();
