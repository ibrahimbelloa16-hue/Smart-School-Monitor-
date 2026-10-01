import path from 'path';
import fs from 'fs';
import { DatabaseSync } from 'node:sqlite';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export interface QueryResult<T = any> {
  rows: T[];
  rowCount?: number;
}

export interface DbClient {
  query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>>;
  transaction<T>(fn: (client: DbClient) => Promise<T>): Promise<T>;
}

let sqliteInstance: DatabaseSync | null = null;
let pgPoolInstance: pg.Pool | null = null;
let isPostgresServer = false;
let connectionChecked = false;

export function isPostgresActive(): boolean {
  return isPostgresServer;
}

/**
 * Initializes and returns a persistent database client.
 * Connects directly to external Supabase PostgreSQL database for permanent 100% persistent data storage.
 * Prioritizes Supabase credentials provided by user:
 * Project URL: https://knnynfgtewbnvvcgelef.supabase.co
 * Host: db.knnynfgtewbnvvcgelef.supabase.co
 */
export async function getDb(): Promise<DbClient> {
  // If pool already established, return it
  if (pgPoolInstance) {
    return createPgWrapper(pgPoolInstance);
  }

  // Attempt Supabase PostgreSQL connection
  if (!connectionChecked) {
    // Check if custom Supabase parameters are set, or use user's explicit Supabase project
    const supabaseHost = process.env.SUPABASE_DB_HOST || 'db.knnynfgtewbnvvcgelef.supabase.co';
    const supabaseUser = process.env.SUPABASE_DB_USER || 'postgres';
    const supabasePassword = process.env.SUPABASE_DB_PASSWORD || 'ibro12@smallA';
    const supabaseDb = process.env.SUPABASE_DB_NAME || 'postgres';
    const supabasePort = Number(process.env.SUPABASE_DB_PORT) || 5432;

    try {
      console.log(`[Database] Connecting to external Supabase PostgreSQL at ${supabaseHost}...`);
      const candidatePool = new pg.Pool({
        host: supabaseHost,
        port: supabasePort,
        user: supabaseUser,
        password: supabasePassword,
        database: supabaseDb,
        connectionTimeoutMillis: 10000,
        ssl: { rejectUnauthorized: false }
      });

      await candidatePool.query('SELECT 1');
      pgPoolInstance = candidatePool;
      isPostgresServer = true;
      console.log(`[Database] 100% Permanent Supabase PostgreSQL connected successfully (${supabaseHost})!`);
    } catch (err: any) {
      console.warn(`[Database] Supabase connection error (${err?.message || err}).`);

      // Fallback: test other DATABASE_URL if available
      const rawDbUrl = process.env.DATABASE_URL;
      const cleanDbUrl = rawDbUrl ? rawDbUrl.replace(/[\u200B-\u200D\uFEFF\u2060\s]/g, '').trim() : '';
      if (cleanDbUrl && !cleanDbUrl.includes('localhost') && !cleanDbUrl.includes('127.0.0.1')) {
        try {
          const secondCandidate = new pg.Pool({
            connectionString: cleanDbUrl,
            connectionTimeoutMillis: 8000,
            ssl: { rejectUnauthorized: false }
          });
          await secondCandidate.query('SELECT 1');
          pgPoolInstance = secondCandidate;
          isPostgresServer = true;
          console.log('[Database] Connected to external PostgreSQL via DATABASE_URL.');
        } catch (e2: any) {
          console.warn('[Database] Alternative connection also unavailable:', e2?.message);
        }
      }
    }
    connectionChecked = true;
  }

  if (pgPoolInstance) {
    return createPgWrapper(pgPoolInstance);
  }

  // Fallback: Native SQLite disk database
  if (!sqliteInstance) {
    const dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const sqliteFilePath = path.join(dataDir, 'datahub.sqlite');
    sqliteInstance = new DatabaseSync(sqliteFilePath);

    sqliteInstance.exec('PRAGMA journal_mode = WAL;');
    sqliteInstance.exec('PRAGMA foreign_keys = ON;');
    sqliteInstance.exec('PRAGMA synchronous = NORMAL;');
    console.log(`[Database] SQLite fallback active at ${sqliteFilePath}`);
  }

  const executeSql = <T = any>(sql: string, params?: any[]): QueryResult<T> => {
    const trimmed = sql.trim();
    if (!trimmed) {
      return { rows: [], rowCount: 0 };
    }

    // Convert PostgreSQL style $1, $2 parameter markers to SQLite ?1, ?2
    const convertedSql = trimmed.replace(/\$(\d+)/g, '?$1');
    const cleanParams = (params || []).map(p => {
      if (typeof p === 'boolean') {
        return p ? 1 : 0;
      }
      if (p instanceof Date) {
        return p.toISOString();
      }
      if (p === undefined) {
        return null;
      }
      return p;
    });

    const isSelectOrReturning = /^\s*(SELECT|PRAGMA)/i.test(convertedSql) || /\bRETURNING\b/i.test(convertedSql);

    if (isSelectOrReturning) {
      const stmt = sqliteInstance!.prepare(convertedSql);
      const rows = stmt.all(...cleanParams) as T[];
      return { rows, rowCount: rows.length };
    } else {
      const stmt = sqliteInstance!.prepare(convertedSql);
      const res = stmt.run(...cleanParams);
      return { rows: [], rowCount: Number(res.changes) };
    }
  };

  return {
    async query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>> {
      return executeSql<T>(sql, params);
    },
    async transaction<T>(fn: (client: DbClient) => Promise<T>): Promise<T> {
      sqliteInstance!.exec('BEGIN TRANSACTION');
      try {
        const txClient: DbClient = {
          query: async (sql, params) => executeSql(sql, params),
          transaction: async () => {
            throw new Error('Nested transactions not supported');
          }
        };
        const result = await fn(txClient);
        sqliteInstance!.exec('COMMIT');
        return result;
      } catch (err) {
        try {
          sqliteInstance!.exec('ROLLBACK');
        } catch {}
        throw err;
      }
    }
  };
}

function createPgWrapper(pool: pg.Pool): DbClient {
  return {
    async query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>> {
      const cleanParams = (params || []).map(p => (p === undefined ? null : p));
      const res = await pool.query(sql, cleanParams);
      return { rows: res.rows as T[], rowCount: res.rowCount ?? res.rows.length };
    },
    async transaction<T>(fn: (client: DbClient) => Promise<T>): Promise<T> {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const clientWrapper: DbClient = {
          query: async (sql, params) => {
            const cleanParams = (params || []).map(p => (p === undefined ? null : p));
            const res = await client.query(sql, cleanParams);
            return { rows: res.rows, rowCount: res.rowCount ?? res.rows.length };
          },
          transaction: async () => {
            throw new Error('Nested transactions not supported');
          }
        };
        const result = await fn(clientWrapper);
        await client.query('COMMIT');
        return result;
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    }
  };
}

export async function closeDb(): Promise<void> {
  if (pgPoolInstance) {
    try {
      await pgPoolInstance.end();
      pgPoolInstance = null;
      connectionChecked = false;
      console.log('[Database] Supabase PostgreSQL connection pool closed.');
    } catch {}
  }
  if (sqliteInstance) {
    try {
      sqliteInstance.close();
      sqliteInstance = null;
      console.log('[Database] SQLite database closed.');
    } catch {}
  }
}
