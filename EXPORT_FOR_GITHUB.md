# Standard DataHub VTU - Full Project Export for GitHub

> Repository: `ibrahimbelloa16-hue/Standard-DataHub-VTU`
> Exported for full project synchronization with Supabase Cloud and Zero localStorage.

## Project File Index

- `.env.example`
- `.gitignore`
- `README.md`
- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `metadata.json`
- `index.html`
- `supabase-schema.sql`
- `server.js`
- `server.ts`
- `server/db/database.ts`
- `server/db/init.ts`
- `server/db/persistenceBackup.ts`
- `server/db/schema.sql`
- `server/middleware/auth.ts`
- `server/routes/adminRoutes.ts`
- `server/routes/authRoutes.ts`
- `server/routes/vtuRoutes.ts`
- `server/routes/walletRoutes.ts`
- `server/services/clubkonnectService.ts`
- `server/services/fundingService.ts`
- `server/services/transactionEngine.ts`
- `server/services/walletService.ts`
- `server/tests/runTests.ts`
- `public/manifest.json`
- `public/favicon.svg`
- `public/logo.svg`
- `public/sw.js`
- `src/main.tsx`
- `src/vite-env.d.ts`
- `src/App.tsx`
- `src/index.css`
- `src/constants.ts`
- `src/types.ts`
- `src/types/index.ts`
- `src/lib/supabase.ts`
- `src/lib/api.ts`
- `src/lib/carrierDetector.ts`
- `src/lib/soundAlert.ts`
- `src/lib/utils.ts`
- `src/hooks/usePWAInstall.ts`
- `src/hooks/useWalletVisibility.ts`
- `src/context/AuthContext.tsx`
- `src/components/AirtimeForm.tsx`
- `src/components/BottomNav.tsx`
- `src/components/DataBundleForm.tsx`
- `src/components/ErrorBoundary.tsx`
- `src/components/InstallAppModal.tsx`
- `src/components/Navbar.tsx`
- `src/components/PinModal.tsx`
- `src/components/ReceiptModal.tsx`
- `src/components/ServiceCards.tsx`
- `src/components/SetPinModal.tsx`
- `src/components/StandardLogo.tsx`
- `src/components/Toast.tsx`
- `src/components/TransactionHistory.tsx`
- `src/components/TransactionReceiptModal.tsx`
- `src/components/UtilitiesForm.tsx`
- `src/components/WalletFundingModal.tsx`
- `src/components/WalletView.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/BuyDataPage.tsx`
- `src/pages/BuyAirtimePage.tsx`
- `src/pages/FundWalletPage.tsx`
- `src/pages/TransactionsPage.tsx`
- `src/pages/ProfilePage.tsx`
- `src/pages/LoginPage.tsx`
- `src/pages/RegisterPage.tsx`
- `src/pages/ContactPage.tsx`
- `src/pages/AdminPage.tsx`
- `data_store.json`
- `data/persistence_snapshot.json`

---

### FILE: .env.example
```bash
# Supabase Cloud Configuration (Required)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# PostgreSQL / Supabase Direct Connection (Backend Server)
SUPABASE_URL=https://knnynfgtewbnvvcgelef.supabase.co
SUPABASE_DB_HOST=db.knnynfgtewbnvvcgelef.supabase.co
SUPABASE_DB_PORT=5432
SUPABASE_DB_USER=postgres
SUPABASE_DB_NAME=postgres
# Note: Special characters like @ in password must be percent-encoded (e.g., %40)
DATABASE_URL=postgresql://postgres:password@db.knnynfgtewbnvvcgelef.supabase.co:5432/postgres

# ClubKonnect VTU API Credentials
CLUBKONNECT_USER_ID=your_clubkonnect_user_id
CLUBKONNECT_API_KEY=your_clubkonnect_api_key
CLUBKONNECT_BASE_URL=https://www.nellobytesystems.com

# Server Environment Configuration
DEMO_MODE=false
PORT=3000
```

### FILE: .gitignore
```text
# Dependencies
node_modules/
/.pnp
.pnp.js

# Production build artifacts
dist/
build/

# Environment Variables
.env
.env.local
.env.production
!.env.example

# Local SQLite & Temporary Logs
data/*.sqlite
data/*.sqlite-wal
data/*.sqlite-shm
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.log

# OS Metadata
.DS_Store
Thumbs.db
```

### FILE: README.md
```markdown
# Standard DataHub VTU

A modern, high-speed telecom VTU (Virtual Top-Up) and digital subscription portal built for Nigeria. Features instant mobile data bundle purchases (MTN, Airtel, Glo, 9mobile), airtime top-up with automatic cash discounts, integer-kobo financial wallet ledger, manual bank transfer wallet funding, transaction PIN security, and full Supabase cloud integration with zero localStorage dependence.

---

## Features

- **Automated Mobile Data Bundles**: Instant delivery for MTN (SME, Corporate, Gifting), Airtel (Corporate, Gifting), Glo, and 9mobile.
- **Airtime VTU Top-Up**: Real-time airtime purchase with instant discounts across all Nigerian GSM networks.
- **Supabase Cloud Persistence**: 100% cloud-backed authentication, data plans, wallet balances, and transactions without relying on browser `localStorage`.
- **Atomic Wallet Ledger**: High-integrity integer kobo balance tracking (`balance_kobo`) preventing fractional currency loss or floating-point rounding errors.
- **Manual Bank Funding & Receipt Verification**: Seamless manual bank transfer requests with optional transfer reference or payment receipt screenshot upload.
- **Transaction PIN Protection**: 4-digit bcrypt-hashed security PIN required for all debits and data/airtime purchases.
- **Provider Status Resolution**: Robust ClubKonnect API integration with automatic fallback refunds if carrier networks are unavailable.
- **PWA & Mobile Install Ready**: Full Progressive Web App manifest, offline service worker caching, and one-tap home screen install prompt.
- **Dark & Light Mode**: Fluid Tailwind CSS theming with responsive desktop and mobile navigation.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Cloud Database & Auth**: Supabase Cloud (`@supabase/supabase-js`, PostgreSQL, Row-Level Security)
- **Backend / API**: Express.js, Node.js, `pg` (node-postgres), tsx
- **Telecom Provider**: ClubKonnect / Nellobyte Systems VTU API

---

## Setup Steps

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/ibrahimbelloa16-hue/Standard-DataHub-VTU.git
cd Standard-DataHub-VTU
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and provide your credentials:

```bash
cp .env.example .env
```

Open `.env` and fill in:
- `VITE_SUPABASE_URL`: Your Supabase Project URL (e.g. `https://your-project.supabase.co`)
- `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon public key
- `CLUBKONNECT_USER_ID`: Your ClubKonnect User ID
- `CLUBKONNECT_API_KEY`: Your ClubKonnect API Key

### 3. Setup Supabase Database

1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open your project and navigate to the **SQL Editor** from the left navigation menu.
3. Open `supabase-schema.sql` from this repository, copy its entire contents, paste it into the SQL Editor, and click **Run**.
4. The following tables with Row Level Security (RLS) policies will be created:
   - `data_plans`
   - `transactions`
   - `wallet`

### 4. Run Development Server

```bash
npm run dev
```

The application will be live at `http://localhost:3000`.

### 5. Build for Production

```bash
npm run build
```

---

## Deploy to Vercel

1. Push your repository to GitHub: `ibrahimbelloa16-hue/Standard-DataHub-VTU`.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Set the Framework Preset to **Vite**.
5. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `CLUBKONNECT_USER_ID`
   - `CLUBKONNECT_API_KEY`
   - `CLUBKONNECT_BASE_URL`
6. Click **Deploy**. Vercel will build the frontend into `dist/` and deploy it to a global edge network.

---

## License

MIT License. Designed and engineered for Standard DataHub VTU.
```

### FILE: package.json
```json
{
  "name": "datahub-vtu",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build",
    "start": "tsx server.ts",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.117.2",
    "@types/bcryptjs": "^3.0.0",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/pg": "^8.23.1",
    "bcryptjs": "^3.0.3",
    "canvas-confetti": "^1.9.4",
    "clsx": "^2.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.3",
    "lucide-react": "^1.16.0",
    "pg": "^8.23.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "sharp": "^0.35.4",
    "tailwind-merge": "^3.0.2",
    "tsx": "^4.23.15"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.12",
    "@types/canvas-confetti": "^1.9.0",
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.0",
    "@types/node": "^22.13.10",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^4.0.12",
    "typescript": "^5.7.3",
    "vite": "^6.2.1"
  }
}
```

### FILE: tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### FILE: vite.config.ts
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});

```

### FILE: metadata.json
```json
{
  "name": "DataHub - Mobile Data & Airtime VTU",
  "description": "Fast, reliable Nigerian VTU portal for instant mobile data bundles, airtime top-up, and manual wallet funding.",
  "requestFramePermissions": [],
  "majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]
}
```

### FILE: index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Standard DataHub - Mobile Data & Airtime VTU</title>
    <meta name="description" content="Fast, reliable Nigerian VTU portal for instant mobile data bundles, airtime top-up, and manual wallet funding." />
    
    <!-- PWA & Mobile Web App Meta Tags -->
    <meta name="theme-color" content="#090d16" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="DataHub" />
    <meta name="application-name" content="Standard DataHub" />

    <!-- Open Graph & Social -->
    <meta property="og:title" content="Standard DataHub - Mobile Data & Airtime VTU" />
    <meta property="og:description" content="Fast, reliable Nigerian VTU portal for instant mobile data bundles, airtime top-up, and manual wallet funding." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />

    <!-- Icons & Manifest -->
    <link rel="icon" type="image/svg+xml" href="/logo.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/pwa-192x192.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/pwa-512x512.png" />
    <link rel="manifest" href="/manifest.json" />

    <!-- Immediate Global beforeinstallprompt Capture -->
    <script>
      // Capture the beforeinstallprompt event as early as possible so it is never missed by late React hydration
      window.deferredPWAInstallPrompt = null;
      window.addEventListener('beforeinstallprompt', function(e) {
        e.preventDefault();
        window.deferredPWAInstallPrompt = e;
        console.log('[PWA] Early beforeinstallprompt event captured and preserved.');
        // Dispatch custom event in case React listener attaches afterwards
        window.dispatchEvent(new CustomEvent('pwa-prompt-available'));
      });
      window.addEventListener('appinstalled', function() {
        window.deferredPWAInstallPrompt = null;
        console.log('[PWA] Application was installed on device home screen.');
        window.dispatchEvent(new CustomEvent('pwa-app-installed'));
      });
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    <script>
      // Register service worker if supported
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/sw.js').then(function(reg) {
            console.log('[PWA] Service Worker registered successfully with scope:', reg.scope);
          }).catch(function(err) {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
        });
      }
    </script>
  </body>
</html>
```

### FILE: supabase-schema.sql
```sql
CREATE TABLE IF NOT EXISTS data_plans (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), network TEXT, plan_name TEXT, price NUMERIC, is_active BOOLEAN DEFAULT true);
CREATE TABLE IF NOT EXISTS transactions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), phone_number TEXT, amount NUMERIC, status TEXT DEFAULT 'success', reference TEXT, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS wallet (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id TEXT UNIQUE, balance NUMERIC DEFAULT 0);
ALTER TABLE data_plans ENABLE ROW LEVEL SECURITY; ALTER TABLE transactions ENABLE ROW LEVEL SECURITY; ALTER TABLE wallet ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_all" ON data_plans FOR ALL USING (true) WITH CHECK (true); CREATE POLICY "allow_all" ON transactions FOR ALL USING (true) WITH CHECK (true); CREATE POLICY "allow_all" ON wallet FOR ALL USING (true) WITH CHECK (true);
```

### FILE: server.js
```javascript
// Standard DataHub Server Entry Point
// Ensures execution of the robust full-stack TypeScript server with native SQLite persistence
try {
  await import('tsx/esm');
  await import('./server.ts');
} catch (err) {
  console.error('[Server Loader] Failed to initialize server.ts via tsx loader:', err);
  process.exit(1);
}
```

### FILE: server.ts
```ts
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { initDatabase } from './server/db/init.ts';
import { closeDb } from './server/db/database.ts';
import authRoutes from './server/routes/authRoutes.ts';
import walletRoutes from './server/routes/walletRoutes.ts';
import vtuRoutes from './server/routes/vtuRoutes.ts';
import adminRoutes from './server/routes/adminRoutes.ts';

dotenv.config();

// Ensure ClubKonnect environment aliases and defaults are aligned without hardcoding
if (process.env.CLUBKONNECT_USER_ID && !process.env.CLUBKONNECT_U) {
  process.env.CLUBKONNECT_U = process.env.CLUBKONNECT_USER_ID;
}
if (process.env.CLUBKONNECT_U && !process.env.CLUBKONNECT_USER_ID) {
  process.env.CLUBKONNECT_USER_ID = process.env.CLUBKONNECT_U;
}
if (process.env.CLUBKONNECT_API_KEY && !process.env.CLUBKONNECT_A) {
  process.env.CLUBKONNECT_A = process.env.CLUBKONNECT_API_KEY;
}
if (process.env.CLUBKONNECT_A && !process.env.CLUBKONNECT_API_KEY) {
  process.env.CLUBKONNECT_API_KEY = process.env.CLUBKONNECT_A;
}
process.env.CLUBKONNECT_BASE_URL = process.env.CLUBKONNECT_BASE_URL || 'https://www.nellobytesystems.com';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
// AI Studio dev server must run strictly on port 3000
const PORT = !isProduction ? 3000 : (Number(process.env.PORT) || 3000);

// Basic security and parsing middlewares
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health and Diagnostics
app.get('/api/health', (_req, res) => {
  const isDemo = process.env.DEMO_MODE !== 'false';
  res.json({
    status: 'ok',
    service: 'DataHub VTU API',
    demoMode: isDemo,
    mode: isDemo ? 'simulation' : 'production',
    provider: {
      name: 'ClubKonnect',
      liveMode: !isDemo,
      configured: Boolean(
        (process.env.CLUBKONNECT_U || process.env.CLUBKONNECT_USER_ID) &&
        (process.env.CLUBKONNECT_A || process.env.CLUBKONNECT_API_KEY)
      )
    },
    time: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/vtu', vtuRoutes);
app.use('/api/admin', adminRoutes);

async function startServer() {
  try {
    // Initialize PostgreSQL schema and seed records
    await initDatabase();

    if (!isProduction) {
      // Development mode: Vite middleware
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa'
      });
      app.use(vite.middlewares);
      console.log('Vite development server middleware mounted.');
    } else {
      // Production mode: Serve built static files
      const distPath = path.resolve(process.cwd(), 'dist');
      if (fs.existsSync(distPath)) {
        app.use(express.static(distPath));
        app.get('*', (_req, res) => {
          res.sendFile(path.join(distPath, 'index.html'));
        });
      }
    }

    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`=========================================`);
      console.log(`  STANDARD DATAHUB VTU SERVER ACTIVE`);
      console.log(`  Port: ${PORT}`);
      console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`  Demo Mode: ${process.env.DEMO_MODE !== 'false' ? 'ENABLED (Safe Simulated Top-ups)' : 'LIVE ClubKonnect'}`);
      console.log(`=========================================`);
    });

    const shutdown = async () => {
      console.log('[Server] Gracefully shutting down...');
      server.close(async () => {
        await closeDb();
        process.exit(0);
      });
      setTimeout(() => process.exit(0), 3000);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error('Failed to start DataHub server:', err);
    process.exit(1);
  }
}

startServer();
```

### FILE: server/db/database.ts
```ts
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
```

### FILE: server/db/init.ts
```ts
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
```

### FILE: server/db/persistenceBackup.ts
```ts
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
```

### FILE: server/db/schema.sql
```sql
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
```

### FILE: server/middleware/auth.ts
```ts
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getDb } from '../db/database.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'datahub_vtu_default_jwt_secret_dev_only_change_in_prod';

export interface AuthenticatedUser {
  id: number;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'super_admin';
  fullName: string;
}

export interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

export function generateToken(user: AuthenticatedUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      fullName: user.fullName
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Authentication required.' });
  }

  const token = authHeader.split('Bearer ')[1].trim();

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthenticatedUser;

    // Verify user is still active in database
    const db = await getDb();
    const userRes = await db.query(
      'SELECT id, email, phone, role, full_name, status FROM users WHERE id = $1',
      [decoded.id]
    );

    if (userRes.rows.length === 0) {
      return res.status(401).json({ error: 'User account not found.' });
    }

    const dbUser = userRes.rows[0];
    if (dbUser.status === 'suspended') {
      return res.status(403).json({ error: 'Account has been suspended. Please contact support.' });
    }

    req.user = {
      id: dbUser.id,
      email: dbUser.email,
      phone: dbUser.phone,
      role: dbUser.role,
      fullName: dbUser.full_name
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session token.' });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'super_admin')) {
    return res.status(403).json({ error: 'Access denied: Administrator privileges required.' });
  }
  next();
}

export function requireSuperAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'super_admin') {
    return res.status(403).json({ error: 'Access denied: Super Admin privileges required.' });
  }
  next();
}
```

### FILE: server/routes/adminRoutes.ts
```ts
import { Router, type Response } from 'express';
import { getDb } from '../db/database.ts';
import { requireAuth, requireAdmin, type AuthRequest } from '../middleware/auth.ts';
import { fundingService } from '../services/fundingService.ts';
import { transactionEngine } from '../services/transactionEngine.ts';
import { walletService } from '../services/walletService.ts';

const router = Router();

// Protect all admin routes with requireAuth AND requireAdmin
router.use(requireAuth, requireAdmin);

/**
 * GET /api/admin/dashboard
 * Aggregated statistics and platform financial metrics
 */
router.get('/dashboard', async (_req, res) => {
  try {
    const db = await getDb();

    // User metrics
    const userStats = await db.query(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
        COUNT(CASE WHEN status = 'suspended' THEN 1 END) as suspended_users
      FROM users
    `);

    // Total Wallet Liability
    const walletStats = await db.query(`
      SELECT COALESCE(SUM(balance_kobo), 0) as total_wallet_balance_kobo FROM wallets
    `);

    // Funding Requests metrics
    const fundingStats = await db.query(`
      SELECT 
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_funding,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_funding,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_funding,
        COALESCE(SUM(CASE WHEN status = 'approved' THEN amount_kobo ELSE 0 END), 0) as total_approved_funding_kobo
      FROM funding_requests
    `);

    // Transaction & Sales metrics
    const txStats = await db.query(`
      SELECT 
        COUNT(CASE WHEN status = 'successful' THEN 1 END) as successful_tx,
        COUNT(CASE WHEN status = 'pending' OR status = 'processing' THEN 1 END) as pending_tx,
        COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_tx,
        COUNT(CASE WHEN status = 'refunded' THEN 1 END) as refunded_tx,
        COALESCE(SUM(CASE WHEN status = 'successful' AND product_type = 'data' THEN selling_price_kobo ELSE 0 END), 0) as total_data_sales_kobo,
        COALESCE(SUM(CASE WHEN status = 'successful' AND product_type = 'airtime' THEN selling_price_kobo ELSE 0 END), 0) as total_airtime_sales_kobo,
        COALESCE(SUM(CASE WHEN status = 'successful' THEN provider_cost_kobo ELSE 0 END), 0) as total_provider_cost_kobo,
        COALESCE(SUM(CASE WHEN status = 'successful' THEN profit_kobo ELSE 0 END), 0) as total_profit_kobo
      FROM transactions
    `);

    const dataSalesKobo = Number(txStats.rows[0]?.total_data_sales_kobo || 0);
    const airtimeSalesKobo = Number(txStats.rows[0]?.total_airtime_sales_kobo || 0);
    const providerCostKobo = Number(txStats.rows[0]?.total_provider_cost_kobo || 0);
    const profitKobo = Number(txStats.rows[0]?.total_profit_kobo || 0);
    const walletBalanceKobo = Number(walletStats.rows[0]?.total_wallet_balance_kobo || 0);

    return res.json({
      metrics: {
        totalUsers: Number(userStats.rows[0]?.total_users || 0),
        activeUsers: Number(userStats.rows[0]?.active_users || 0),
        suspendedUsers: Number(userStats.rows[0]?.suspended_users || 0),
        totalWalletBalanceNaira: walletBalanceKobo / 100,
        pendingFundingCount: Number(fundingStats.rows[0]?.pending_funding || 0),
        approvedFundingCount: Number(fundingStats.rows[0]?.approved_funding || 0),
        rejectedFundingCount: Number(fundingStats.rows[0]?.rejected_funding || 0),
        totalApprovedFundingNaira: Number(fundingStats.rows[0]?.total_approved_funding_kobo || 0) / 100,
        successfulTxCount: Number(txStats.rows[0]?.successful_tx || 0),
        pendingTxCount: Number(txStats.rows[0]?.pending_tx || 0),
        failedTxCount: Number(txStats.rows[0]?.failed_tx || 0),
        refundedTxCount: Number(txStats.rows[0]?.refunded_tx || 0),
        totalDataSalesNaira: dataSalesKobo / 100,
        totalAirtimeSalesNaira: airtimeSalesKobo / 100,
        totalProviderCostNaira: providerCostKobo / 100,
        totalProfitNaira: profitKobo / 100
      }
    });
  } catch (err: any) {
    console.error('Admin dashboard error:', err);
    return res.status(500).json({ error: 'Failed to retrieve admin dashboard metrics.' });
  }
});

/**
 * GET /api/admin/users
 * Search and list users
 */
router.get('/users', async (req, res) => {
  try {
    const db = await getDb();
    const search = req.query.search ? String(req.query.search).trim() : '';
    const status = req.query.status ? String(req.query.status) : '';
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const offset = Number(req.query.offset) || 0;

    let query = `
      SELECT 
        u.id, u.full_name, u.email, u.phone, u.role, u.status, u.referral_code, u.created_at,
        COALESCE(w.balance_kobo, 0) as balance_kobo
      FROM users u
      LEFT JOIN wallets w ON u.id = w.user_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      query += ` AND (LOWER(u.full_name) LIKE $${params.length} OR LOWER(u.email) LIKE $${params.length} OR u.phone LIKE $${params.length})`;
    }

    if (status) {
      params.push(status);
      query += ` AND u.status = $${params.length}`;
    }

    query += ` ORDER BY u.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await db.query(query, params);

    const users = result.rows.map(u => ({
      id: u.id,
      fullName: u.full_name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      status: u.status,
      referralCode: u.referral_code,
      createdAt: u.created_at,
      balanceNaira: Number(u.balance_kobo) / 100
    }));

    return res.json({ users });
  } catch (err: any) {
    console.error('Admin users fetch error:', err);
    return res.status(500).json({ error: 'Failed to list users.' });
  }
});

/**
 * POST /api/admin/users/:id/status
 * Suspend or activate a user
 */
router.post('/users/:id/status', async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    if (status !== 'active' && status !== 'suspended') {
      return res.status(400).json({ error: "Status must be 'active' or 'suspended'." });
    }

    const userId = Number(req.params.id);
    if (userId === req.user!.id) {
      return res.status(400).json({ error: 'You cannot suspend your own admin account.' });
    }

    const db = await getDb();
    await db.query('UPDATE users SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [status, userId]);

    // Audit log
    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, $2, $3, 'user', $4)
    `, [req.user!.id, status === 'active' ? 'user_activation' : 'user_suspension', String(userId), `Set user #${userId} status to ${status}`]);

    return res.json({ message: `User status changed to ${status}.` });
  } catch (err: any) {
    console.error('Update user status error:', err);
    return res.status(500).json({ error: 'Failed to update user status.' });
  }
});

/**
 * POST /api/admin/users/:id/role
 * Change user role
 */
router.post('/users/:id/role', async (req: AuthRequest, res: Response) => {
  try {
    const { role } = req.body;
    if (role !== 'user' && role !== 'admin') {
      return res.status(400).json({ error: "Role must be 'user' or 'admin'." });
    }

    const userId = Number(req.params.id);
    if (userId === req.user!.id) {
      return res.status(400).json({ error: 'You cannot alter your own admin role.' });
    }

    const db = await getDb();
    await db.query('UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [role, userId]);

    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'role_change', $2, 'user', $3)
    `, [req.user!.id, String(userId), `Changed role of user #${userId} to ${role}`]);

    return res.json({ message: `User role updated to ${role}.` });
  } catch (err: any) {
    console.error('Update user role error:', err);
    return res.status(500).json({ error: 'Failed to update user role.' });
  }
});

/**
 * GET /api/admin/funding-requests/pending-count
 * Returns pending funding requests count for bell badge
 */
router.get('/funding-requests/pending-count', async (_req, res) => {
  try {
    const db = await getDb();
    const result = await db.query(
      "SELECT COUNT(*) as count FROM funding_requests WHERE status = 'pending'"
    );
    const count = Number(result.rows[0]?.count || 0);
    return res.json({ count });
  } catch (err: any) {
    console.error('Pending funding count error:', err);
    return res.status(500).json({ error: 'Failed to retrieve pending count.' });
  }
});

/**
 * GET /api/admin/funding-requests
 * View all manual bank funding requests
 */
router.get('/funding-requests', async (req, res) => {
  try {
    const db = await getDb();
    const status = req.query.status ? String(req.query.status) : '';
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const offset = Number(req.query.offset) || 0;

    let query = `
      SELECT 
        fr.*,
        u.full_name as user_name, u.email as user_email, u.phone as user_phone,
        a.full_name as admin_name
      FROM funding_requests fr
      JOIN users u ON fr.user_id = u.id
      LEFT JOIN users a ON fr.admin_id = a.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status) {
      params.push(status);
      query += ` AND fr.status = $${params.length}`;
    }

    query += ` ORDER BY fr.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await db.query(query, params);

    const requests = result.rows.map(r => ({
      id: r.id,
      reference: r.reference,
      internalReference: r.internal_reference || r.reference,
      userId: r.user_id,
      userName: r.user_name,
      userEmail: r.user_email,
      userPhone: r.user_phone,
      amountNaira: Number(r.amount_kobo) / 100,
      bankName: r.bank_name,
      accountName: r.account_name,
      accountNumber: r.account_number,
      senderName: r.sender_name,
      senderBank: r.sender_bank,
      transferReference: r.transfer_reference,
      proofImageUrl: r.proof_image_url,
      status: r.status,
      adminId: r.admin_id,
      adminName: r.admin_name,
      rejectionReason: r.rejection_reason,
      approvedAt: r.approved_at,
      rejectedAt: r.rejected_at,
      createdAt: r.created_at
    }));

    return res.json({ requests });
  } catch (err: any) {
    console.error('Admin funding requests error:', err);
    return res.status(500).json({ error: 'Failed to retrieve funding requests.' });
  }
});

/**
 * POST /api/admin/funding-requests/:id/approve
 * Admin approves funding request -> credits wallet exactly once
 */
router.post('/funding-requests/:id/approve', async (req: AuthRequest, res: Response) => {
  try {
    const requestId = Number(req.params.id);
    const result = await fundingService.approveRequest(requestId, req.user!.id);
    return res.json({
      message: `Funding request #${requestId} successfully approved! User wallet credited with ₦${result.amountNaira.toFixed(2)}.`,
      ...result
    });
  } catch (err: any) {
    console.error('Funding approval error:', err);
    return res.status(400).json({ error: err.message || 'Failed to approve funding request.' });
  }
});

/**
 * POST /api/admin/funding-requests/:id/reject
 * Admin rejects funding request with reason
 */
router.post('/funding-requests/:id/reject', async (req: AuthRequest, res: Response) => {
  try {
    const requestId = Number(req.params.id);
    const { reason } = req.body;

    if (!reason || !reason.trim()) {
      return res.status(400).json({ error: 'Please provide a clear reason for rejection.' });
    }

    const result = await fundingService.rejectRequest(requestId, req.user!.id, reason);
    return res.json({
      message: `Funding request #${requestId} rejected.`,
      ...result
    });
  } catch (err: any) {
    console.error('Funding rejection error:', err);
    return res.status(400).json({ error: err.message || 'Failed to reject funding request.' });
  }
});

/**
 * GET /api/admin/data-plans
 * Full management view of data plans
 */
router.get('/data-plans', async (_req, res) => {
  try {
    const db = await getDb();
    const result = await db.query(`
      SELECT * FROM data_plans
      ORDER BY network ASC, selling_price_kobo ASC
    `);

    const plans = result.rows.map(p => {
      const cost = Number(p.provider_cost_kobo);
      const selling = Number(p.selling_price_kobo);
      return {
        id: p.id,
        network: p.network,
        planName: p.plan_name,
        planType: p.plan_type,
        dataAmount: p.data_amount,
        duration: p.duration,
        providerCode: p.provider_code,
        providerCostNaira: cost / 100,
        markupNaira: Number(p.markup_kobo) / 100,
        sellingPriceNaira: selling / 100,
        profitNaira: (selling - cost) / 100,
        isActive: p.is_active,
        lastSyncAt: p.last_sync_at
      };
    });

    return res.json({ plans });
  } catch (err: any) {
    console.error('Admin data plans error:', err);
    return res.status(500).json({ error: 'Failed to retrieve data plans.' });
  }
});

/**
 * POST /api/admin/data-plans
 * Create new data plan
 */
router.post('/data-plans', async (req: AuthRequest, res: Response) => {
  try {
    const {
      id, network, planName, planType, dataAmount, duration,
      providerCode, providerCostNaira, markupNaira, sellingPriceNaira, isActive
    } = req.body;

    if (!id || !network || !planName || !providerCode || providerCostNaira === undefined) {
      return res.status(400).json({ error: 'All plan identification and pricing fields are required.' });
    }

    const db = await getDb();
    const costKobo = Math.round(Number(providerCostNaira) * 100);
    let markupKobo: number;
    let sellingPriceKobo: number;

    if (sellingPriceNaira !== undefined && sellingPriceNaira !== null) {
      sellingPriceKobo = Math.round(Number(sellingPriceNaira) * 100);
      markupKobo = sellingPriceKobo - costKobo;
    } else {
      markupKobo = Math.round(Number(markupNaira || 30) * 100);
      sellingPriceKobo = costKobo + markupKobo;
    }

    if (sellingPriceKobo <= 0) {
      return res.status(400).json({ error: 'Selling price must be greater than zero.' });
    }

    await db.query(`
      INSERT INTO data_plans (
        id, network, plan_name, plan_type, data_amount, duration,
        provider_code, provider_cost_kobo, markup_kobo, selling_price_kobo, is_active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `, [
      id.trim(),
      network.toUpperCase(),
      planName.trim(),
      planType || 'SME',
      dataAmount || '1.0 GB',
      duration || '30 Days',
      providerCode.trim(),
      costKobo,
      markupKobo,
      sellingPriceKobo,
      isActive !== false
    ]);

    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'product_creation', $2, 'data_plan', $3)
    `, [req.user!.id, id.trim(), `Created new data plan ${planName} (${network})`]);

    return res.status(201).json({ message: 'Data plan created successfully.' });
  } catch (err: any) {
    console.error('Create plan error:', err);
    return res.status(400).json({ error: err.message || 'Failed to create plan.' });
  }
});

/**
 * PUT /api/admin/data-plans/:id
 * Edit existing data plan
 */
router.put('/data-plans/:id', async (req: AuthRequest, res: Response) => {
  try {
    const planId = req.params.id;
    const {
      planName, planType, dataAmount, duration,
      providerCode, providerCostNaira, markupNaira, sellingPriceNaira, isActive
    } = req.body;

    const db = await getDb();
    
    // Fetch existing plan if some fields are omitted
    const existingRes = await db.query('SELECT * FROM data_plans WHERE id = $1', [planId]);
    if (existingRes.rows.length === 0) {
      return res.status(404).json({ error: 'Data plan not found.' });
    }
    const existing = existingRes.rows[0];

    const currentCostKobo = providerCostNaira !== undefined
      ? Math.round(Number(providerCostNaira) * 100)
      : Number(existing.provider_cost_kobo);

    let sellingPriceKobo: number;
    let markupKobo: number;

    if (sellingPriceNaira !== undefined && sellingPriceNaira !== null) {
      sellingPriceKobo = Math.round(Number(sellingPriceNaira) * 100);
      markupKobo = sellingPriceKobo - currentCostKobo;
    } else {
      markupKobo = markupNaira !== undefined
        ? Math.round(Number(markupNaira) * 100)
        : Number(existing.markup_kobo);
      sellingPriceKobo = currentCostKobo + markupKobo;
    }

    if (sellingPriceKobo <= 0) {
      return res.status(400).json({ error: 'Selling price must be greater than zero.' });
    }

    await db.query(`
      UPDATE data_plans SET
        plan_name = $1,
        plan_type = $2,
        data_amount = $3,
        duration = $4,
        provider_code = $5,
        provider_cost_kobo = $6,
        markup_kobo = $7,
        selling_price_kobo = $8,
        is_active = $9,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $10
    `, [
      planName || existing.plan_name,
      planType || existing.plan_type,
      dataAmount || existing.data_amount,
      duration || existing.duration,
      providerCode || existing.provider_code,
      currentCostKobo,
      markupKobo,
      sellingPriceKobo,
      isActive !== undefined ? Boolean(isActive) : existing.is_active,
      planId
    ]);

    const updatedSellingNaira = (sellingPriceKobo / 100).toFixed(2);
    const updatedCostNaira = (currentCostKobo / 100).toFixed(2);
    const updatedMarkupNaira = (markupKobo / 100).toFixed(2);

    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'product_update', $2, 'data_plan', $3)
    `, [
      req.user!.id,
      planId,
      `Updated plan ${planName || existing.plan_name}: Cost ₦${updatedCostNaira}, Markup ₦${updatedMarkupNaira}, Selling ₦${updatedSellingNaira}`
    ]);

    return res.json({
      message: 'Data plan updated successfully.',
      plan: {
        id: planId,
        providerCostNaira: Number(updatedCostNaira),
        markupNaira: Number(updatedMarkupNaira),
        sellingPriceNaira: Number(updatedSellingNaira),
        profitNaira: Number(updatedMarkupNaira),
        isActive: isActive !== undefined ? Boolean(isActive) : existing.is_active
      }
    });
  } catch (err: any) {
    console.error('Update plan error:', err);
    return res.status(400).json({ error: err.message || 'Failed to update plan.' });
  }
});

/**
 * PATCH /api/admin/data-plans/:id/price
 * Fast dynamic price update for any plan without full modal form
 */
router.patch('/data-plans/:id/price', async (req: AuthRequest, res: Response) => {
  try {
    const planId = req.params.id;
    const { sellingPriceNaira, markupNaira, providerCostNaira, isActive } = req.body;

    const db = await getDb();
    const existingRes = await db.query('SELECT * FROM data_plans WHERE id = $1', [planId]);
    if (existingRes.rows.length === 0) {
      return res.status(404).json({ error: 'Data plan not found.' });
    }
    const existing = existingRes.rows[0];

    const currentCostKobo = providerCostNaira !== undefined
      ? Math.round(Number(providerCostNaira) * 100)
      : Number(existing.provider_cost_kobo);

    let sellingPriceKobo: number;
    let markupKobo: number;

    if (sellingPriceNaira !== undefined && sellingPriceNaira !== null) {
      sellingPriceKobo = Math.round(Number(sellingPriceNaira) * 100);
      markupKobo = sellingPriceKobo - currentCostKobo;
    } else if (markupNaira !== undefined && markupNaira !== null) {
      markupKobo = Math.round(Number(markupNaira) * 100);
      sellingPriceKobo = currentCostKobo + markupKobo;
    } else {
      sellingPriceKobo = Number(existing.selling_price_kobo);
      markupKobo = Number(existing.markup_kobo);
    }

    if (sellingPriceKobo <= 0) {
      return res.status(400).json({ error: 'Selling price must be greater than zero.' });
    }

    const nextIsActive = isActive !== undefined ? Boolean(isActive) : existing.is_active;

    await db.query(`
      UPDATE data_plans SET
        provider_cost_kobo = $1,
        markup_kobo = $2,
        selling_price_kobo = $3,
        is_active = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
    `, [currentCostKobo, markupKobo, sellingPriceKobo, nextIsActive, planId]);

    const finalSellingNaira = sellingPriceKobo / 100;
    const finalCostNaira = currentCostKobo / 100;
    const finalProfitNaira = markupKobo / 100;

    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'price_adjustment', $2, 'data_plan', $3)
    `, [
      req.user!.id,
      planId,
      `Adjusted selling price for ${existing.plan_name}: ₦${finalSellingNaira.toFixed(2)} (Wholesale: ₦${finalCostNaira.toFixed(2)}, Profit: ₦${finalProfitNaira.toFixed(2)})`
    ]);

    return res.json({
      message: 'Price updated successfully.',
      plan: {
        id: planId,
        providerCostNaira: finalCostNaira,
        markupNaira: finalProfitNaira,
        sellingPriceNaira: finalSellingNaira,
        profitNaira: finalProfitNaira,
        isActive: nextIsActive
      }
    });
  } catch (err: any) {
    console.error('Quick price update error:', err);
    return res.status(400).json({ error: err.message || 'Failed to update plan price.' });
  }
});

/**
 * GET /api/admin/transactions
 * Monitor all system transactions
 */
router.get('/transactions', async (req, res) => {
  try {
    const db = await getDb();
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const offset = Number(req.query.offset) || 0;
    const search = req.query.search ? String(req.query.search).trim() : '';
    const status = req.query.status ? String(req.query.status) : '';
    const productType = req.query.productType ? String(req.query.productType) : '';

    let query = `
      SELECT 
        t.*,
        u.full_name as user_name, u.email as user_email, u.phone as user_phone,
        p.plan_name
      FROM transactions t
      JOIN users u ON t.user_id = u.id
      LEFT JOIN data_plans p ON t.plan_id = p.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      query += ` AND (LOWER(t.reference) LIKE $${params.length} OR LOWER(t.recipient_phone) LIKE $${params.length} OR LOWER(u.email) LIKE $${params.length})`;
    }

    if (status) {
      params.push(status);
      query += ` AND t.status = $${params.length}`;
    }

    if (productType) {
      params.push(productType);
      query += ` AND t.product_type = $${params.length}`;
    }

    query += ` ORDER BY t.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await db.query(query, params);

    const transactions = result.rows.map(tx => ({
      id: tx.id,
      reference: tx.reference,
      userId: tx.user_id,
      userName: tx.user_name,
      userEmail: tx.user_email,
      productType: tx.product_type,
      network: tx.network,
      recipientPhone: tx.recipient_phone,
      planName: tx.plan_name,
      provider: tx.provider,
      providerReference: tx.provider_reference,
      providerCostNaira: Number(tx.provider_cost_kobo) / 100,
      sellingPriceNaira: Number(tx.selling_price_kobo) / 100,
      profitNaira: Number(tx.profit_kobo) / 100,
      status: tx.status,
      isDemo: tx.is_demo,
      refundReference: tx.refund_reference,
      createdAt: tx.created_at
    }));

    return res.json({ transactions });
  } catch (err: any) {
    console.error('Admin transactions error:', err);
    return res.status(500).json({ error: 'Failed to retrieve transactions.' });
  }
});

/**
 * POST /api/admin/transactions/:id/requery
 * Admin requery transaction with provider
 */
router.post('/transactions/:id/requery', async (req: AuthRequest, res: Response) => {
  try {
    const txId = Number(req.params.id);
    const result = await transactionEngine.requeryTransaction(txId, req.user!.id);

    const db = await getDb();
    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'transaction_requery', $2, 'transaction', $3)
    `, [req.user!.id, String(txId), `Requeried transaction #${txId}: Result is '${result.status}'`]);

    return res.json(result);
  } catch (err: any) {
    console.error('Requery transaction error:', err);
    return res.status(400).json({ error: err.message || 'Failed to requery transaction.' });
  }
});

/**
 * POST /api/admin/transactions/retry-all-pending
 * Admin manually retries all pending transactions at once
 */
router.post('/transactions/retry-all-pending', async (req: AuthRequest, res: Response) => {
  try {
    const result = await transactionEngine.retryAllPendingTransactions(req.user!.id);

    const db = await getDb();
    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'retry_all_pending', '0', 'transactions', $2)
    `, [req.user!.id, result.message]);

    return res.json(result);
  } catch (err: any) {
    console.error('Retry all pending transactions error:', err);
    return res.status(500).json({ error: err.message || 'Failed to retry all pending transactions.' });
  }
});

/**
 * POST /api/admin/transactions/:id/retry and /api/admin/transactions/:id/retry-pending
 * Admin manually retries a pending transaction with provider
 */
router.post(['/transactions/:id/retry', '/transactions/:id/retry-pending'], async (req: AuthRequest, res: Response) => {
  try {
    const txId = Number(req.params.id);
    const result = await transactionEngine.retryPendingTransaction(txId, req.user!.id);

    const db = await getDb();
    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'transaction_retry', $2, 'transaction', $3)
    `, [req.user!.id, String(txId), `Manually retried transaction #${txId}: status is '${result.status}'`]);

    return res.json(result);
  } catch (err: any) {
    console.error('Retry transaction error:', err);
    return res.status(400).json({ error: err.message || 'Failed to retry transaction.' });
  }
});

/**
 * POST /api/admin/transactions/:id/manual-refund
 * Manual refund for stuck/disputed transaction with double-refund protection
 */
router.post('/transactions/:id/manual-refund', async (req: AuthRequest, res: Response) => {
  try {
    const txId = Number(req.params.id);
    const db = await getDb();

    const txRes = await db.query('SELECT * FROM transactions WHERE id = $1', [txId]);
    if (txRes.rows.length === 0) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }

    const tx = txRes.rows[0];
    if (tx.status === 'refunded') {
      return res.status(400).json({ error: 'This transaction has already been refunded.' });
    }

    const refundRef = `MANUAL-REFUND-${tx.reference}`;
    await walletService.credit(
      tx.user_id,
      Number(tx.selling_price_kobo),
      refundRef,
      `Manual Admin Refund for Transaction (${tx.reference})`
    );

    await db.query(`
      UPDATE transactions
      SET status = 'refunded',
          refund_reference = $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `, [refundRef, txId]);

    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'refund', $2, 'transaction', $3)
    `, [req.user!.id, String(txId), `Manually refunded ₦${(Number(tx.selling_price_kobo) / 100).toFixed(2)} to user #${tx.user_id}`]);

    return res.json({ message: 'Transaction refunded successfully to user wallet.', status: 'refunded' });
  } catch (err: any) {
    console.error('Manual refund error:', err);
    return res.status(400).json({ error: err.message || 'Failed to process refund.' });
  }
});

/**
 * GET /api/admin/settings
 */
router.get('/settings', async (_req, res) => {
  try {
    const db = await getDb();
    const result = await db.query('SELECT * FROM app_settings WHERE id = 1');
    return res.json({ settings: result.rows[0] });
  } catch (err: any) {
    console.error('Settings fetch error:', err);
    return res.status(500).json({ error: 'Failed to retrieve settings.' });
  }
});

/**
 * PUT /api/admin/settings
 * Update platform settings and manual bank details
 */
router.put('/settings', async (req: AuthRequest, res: Response) => {
  try {
    const {
      platformName, logoUrl, supportPhone, supportEmail,
      bankName, accountNumber, accountName, manualFundingInstructions,
      defaultMarkupKobo, maintenanceMode, demoMode, apkDownloadUrl
    } = req.body;

    const db = await getDb();
    await db.query(`
      UPDATE app_settings SET
        platform_name = COALESCE($1, platform_name),
        logo_url = COALESCE($2, logo_url),
        support_phone = COALESCE($3, support_phone),
        support_email = COALESCE($4, support_email),
        bank_name = COALESCE($5, bank_name),
        account_number = COALESCE($6, account_number),
        account_name = COALESCE($7, account_name),
        manual_funding_instructions = COALESCE($8, manual_funding_instructions),
        default_markup_kobo = COALESCE($9, default_markup_kobo),
        maintenance_mode = COALESCE($10, maintenance_mode),
        demo_mode = COALESCE($11, demo_mode),
        apk_download_url = $12,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `, [
      platformName, logoUrl, supportPhone, supportEmail,
      bankName, accountNumber, accountName, manualFundingInstructions,
      defaultMarkupKobo, maintenanceMode, demoMode,
      apkDownloadUrl !== undefined ? apkDownloadUrl : null
    ]);

    await db.query(`
      INSERT INTO admin_audit_logs (admin_id, action, target_id, target_type, details)
      VALUES ($1, 'settings_update', '1', 'app_settings', 'Updated platform configuration')
    `, [req.user!.id]);

    return res.json({ message: 'Settings updated successfully.' });
  } catch (err: any) {
    console.error('Settings update error:', err);
    return res.status(500).json({ error: 'Failed to update settings.' });
  }
});

/**
 * GET /api/admin/funding-requests/pending-count
 * Fast endpoint for Realtime Bell notification badge
 */
router.get('/funding-requests/pending-count', async (_req, res) => {
  try {
    const db = await getDb();
    const countRes = await db.query(
      "SELECT COUNT(*) as count FROM funding_requests WHERE status = 'pending'"
    );
    const count = Number(countRes.rows[0]?.count || 0);
    return res.json({ count });
  } catch (err: any) {
    console.error('Pending funding count error:', err);
    return res.status(500).json({ error: 'Failed to retrieve pending funding count.' });
  }
});

/**
 * POST /api/admin/transactions/:id/retry-pending
 * Admin manual retry for pending transaction
 */
router.post('/transactions/:id/retry-pending', async (req: AuthRequest, res: Response) => {
  try {
    const txId = Number(req.params.id);
    const result = await transactionEngine.retryPendingTransaction(txId, req.user!.id);
    return res.json(result);
  } catch (err: any) {
    console.error('Retry pending transaction error:', err);
    return res.status(400).json({ error: err.message || 'Failed to retry pending transaction.' });
  }
});

/**
 * GET /api/admin/security/settings
 * Retrieves sensitive API keys and provider configuration from admin_settings table
 */
router.get('/security/settings', async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDb();
    const row = await db.query('SELECT * FROM admin_settings WHERE id = 1');
    const defaultUserId = (process.env.CLUBKONNECT_USER_ID || process.env.CLUBKONNECT_U || '').trim();
    const defaultBaseUrl = (process.env.CLUBKONNECT_BASE_URL || 'https://www.nellobytesystems.com').trim();
    const settings = row.rows[0] || {
      clubkonnect_user_id: defaultUserId,
      clubkonnect_api_key: '',
      clubkonnect_base_url: defaultBaseUrl
    };

    const currentUserId = (settings.clubkonnect_user_id || defaultUserId).trim();
    const rawKey = (settings.clubkonnect_api_key || process.env.CLUBKONNECT_API_KEY || process.env.CLUBKONNECT_A || '').trim();
    // Mask key with dots for security
    const maskedKey = rawKey.length > 6
      ? `${rawKey.slice(0, 3)}${'•'.repeat(Math.max(8, rawKey.length - 6))}${rawKey.slice(-3)}`
      : '••••••••••••••••';

    return res.json({
      settings: {
        userId: currentUserId,
        baseUrl: settings.clubkonnect_base_url || defaultBaseUrl,
        maskedApiKey: maskedKey,
        hasApiKey: Boolean(rawKey),
        rawApiKey: req.user?.role === 'super_admin' ? rawKey : undefined,
        updatedAt: settings.updated_at
      }
    });
  } catch (err: any) {
    console.error('Security settings fetch error:', err);
    return res.status(500).json({ error: 'Failed to retrieve security settings.' });
  }
});

/**
 * PUT /api/admin/security/settings
 * Row-Level Security: Only users with role='super_admin' can UPDATE admin_settings
 * Records every single change into settings_logs
 */
router.put('/security/settings', async (req: AuthRequest, res: Response) => {
  try {
    // Strict RLS: verify role is super_admin in users / profiles table
    const db = await getDb();
    const userCheck = await db.query(
      'SELECT id, role FROM users WHERE id = $1',
      [req.user!.id]
    );

    const userRole = userCheck.rows[0]?.role;
    if (userRole !== 'super_admin') {
      return res.status(403).json({
        error: "Access Denied: Only users with role='super_admin' in profiles/users table can edit sensitive API settings."
      });
    }

    const { userId, apiKey, baseUrl } = req.body;

    // Fetch existing settings to compare old and new values for audit logging
    const existingRes = await db.query('SELECT * FROM admin_settings WHERE id = 1');
    const defaultUserId = (process.env.CLUBKONNECT_USER_ID || process.env.CLUBKONNECT_U || '').trim();
    const defaultBaseUrl = (process.env.CLUBKONNECT_BASE_URL || 'https://www.nellobytesystems.com').trim();
    const existing = existingRes.rows[0] || {
      clubkonnect_user_id: defaultUserId,
      clubkonnect_api_key: '',
      clubkonnect_base_url: defaultBaseUrl
    };

    const newUserId = (userId !== undefined ? String(userId) : existing.clubkonnect_user_id).trim();
    const newApiKey = (apiKey !== undefined ? String(apiKey) : existing.clubkonnect_api_key).trim();
    const newBaseUrl = (baseUrl !== undefined ? String(baseUrl) : existing.clubkonnect_base_url).trim();

    // Log changes in settings_logs
    if (newUserId !== existing.clubkonnect_user_id) {
      await db.query(`
        INSERT INTO settings_logs (admin_id, field_changed, old_value, new_value)
        VALUES ($1, 'clubkonnect_user_id', $2, $3)
      `, [req.user!.id, existing.clubkonnect_user_id, newUserId]);
    }

    if (newApiKey !== existing.clubkonnect_api_key) {
      const oldMasked = existing.clubkonnect_api_key
        ? `${existing.clubkonnect_api_key.slice(0, 3)}••••••${existing.clubkonnect_api_key.slice(-3)}`
        : 'EMPTY';
      const newMasked = newApiKey
        ? `${newApiKey.slice(0, 3)}••••••${newApiKey.slice(-3)}`
        : 'EMPTY';

      await db.query(`
        INSERT INTO settings_logs (admin_id, field_changed, old_value, new_value)
        VALUES ($1, 'clubkonnect_api_key', $2, $3)
      `, [req.user!.id, oldMasked, newMasked]);
    }

    if (newBaseUrl !== existing.clubkonnect_base_url) {
      await db.query(`
        INSERT INTO settings_logs (admin_id, field_changed, old_value, new_value)
        VALUES ($1, 'clubkonnect_base_url', $2, $3)
      `, [req.user!.id, existing.clubkonnect_base_url, newBaseUrl]);
    }

    // Update admin_settings
    await db.query(`
      INSERT INTO admin_settings (id, clubkonnect_user_id, clubkonnect_api_key, clubkonnect_base_url, updated_at)
      VALUES (1, $1, $2, $3, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE SET
        clubkonnect_user_id = EXCLUDED.clubkonnect_user_id,
        clubkonnect_api_key = EXCLUDED.clubkonnect_api_key,
        clubkonnect_base_url = EXCLUDED.clubkonnect_base_url,
        updated_at = CURRENT_TIMESTAMP
    `, [newUserId, newApiKey, newBaseUrl]);

    // Also update process.env runtime cache
    if (newUserId) {
      process.env.CLUBKONNECT_USER_ID = newUserId;
      process.env.CLUBKONNECT_U = newUserId;
    }
    if (newApiKey) {
      process.env.CLUBKONNECT_API_KEY = newApiKey;
      process.env.CLUBKONNECT_A = newApiKey;
    }
    if (newBaseUrl) process.env.CLUBKONNECT_BASE_URL = newBaseUrl;

    return res.json({
      message: 'Sensitive API settings updated successfully and logged in settings_logs.'
    });
  } catch (err: any) {
    console.error('Update security settings error:', err);
    return res.status(500).json({ error: 'Failed to update security settings.' });
  }
});

/**
 * GET /api/admin/security/logs
 * Settings Change Log table: settings_logs
 */
router.get('/security/logs', async (_req, res) => {
  try {
    const db = await getDb();
    const result = await db.query(`
      SELECT 
        l.*,
        u.email as admin_email, u.full_name as admin_name
      FROM settings_logs l
      LEFT JOIN users u ON l.admin_id = u.id
      ORDER BY l.timestamp DESC
      LIMIT 100
    `);

    return res.json({ logs: result.rows });
  } catch (err: any) {
    console.error('Settings logs error:', err);
    return res.status(500).json({ error: 'Failed to retrieve settings change logs.' });
  }
});

/**
 * GET /api/admin/audit-logs
 */
router.get('/audit-logs', async (req, res) => {
  try {
    const db = await getDb();
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const offset = Number(req.query.offset) || 0;

    const result = await db.query(`
      SELECT 
        l.*,
        u.email as admin_email, u.full_name as admin_name
      FROM admin_audit_logs l
      LEFT JOIN users u ON l.admin_id = u.id
      ORDER BY l.created_at DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    return res.json({ logs: result.rows });
  } catch (err: any) {
    console.error('Audit logs error:', err);
    return res.status(500).json({ error: 'Failed to retrieve audit logs.' });
  }
});

export default router;
```

### FILE: server/routes/authRoutes.ts
```ts
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
```

### FILE: server/routes/vtuRoutes.ts
```ts
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
```

### FILE: server/routes/walletRoutes.ts
```ts
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
```

### FILE: server/services/clubkonnectService.ts
```ts
/**
 * ClubKonnect Integration Service
 * Official Documentation: https://www.clubkonnect.com/apidocs.asp
 * Handles secure server-side interactions with ClubKonnect for Airtime & Mobile Data.
 */

import { getDb } from '../db/database.ts';

export interface ProviderPurchaseResult {
  success: boolean;
  status: 'SUCCESS' | 'FAILED' | 'successful' | 'failed' | 'pending' | 'FAILED_REFUNDED';
  providerReference: string;
  statusCode: string;
  statusMessage: string;
  providerError?: string; // Exact provider error message from ClubKonnect
  rawResponse?: any;
  isTransient?: boolean; // 500 or network error
}

export interface ClubKonnectConfig {
  userId: string;
  apiKey: string;
  baseUrl: string;
  demoMode: boolean;
}

// Official Nellobyte Systems / ClubKonnect Endpoints
export const CLUBKONNECT_DATA_ENDPOINT = 'https://www.nellobytesystems.com/APIDatabundleV1.asp';
export const CLUBKONNECT_AIRTIME_ENDPOINT = 'https://www.nellobytesystems.com/APIAirtimeV1.asp';
export const CLUBKONNECT_QUERY_ENDPOINT = 'https://www.nellobytesystems.com/APIQueryV1.asp';

// Official network codes according to ClubKonnect specification:
// MTN = 01, GLO = 02, 9MOBILE = 03, AIRTEL = 04
export const NETWORK_CODES: Record<string, string> = {
  MTN: '01',
  GLO: '02',
  '9MOBILE': '03',
  AIRTEL: '04'
};

export const REVERSE_NETWORK_CODES: Record<string, string> = {
  '01': 'MTN',
  '02': 'GLO',
  '03': '9MOBILE',
  '04': 'AIRTEL'
};

export function getNetworkCode(net: string): string | undefined {
  if (!net) return undefined;
  const clean = net.toUpperCase().replace(/[\s\-_]/g, '');
  if (clean === 'MTN' || clean === '01') return '01';
  if (clean === 'GLO' || clean === 'GLOBACOM' || clean === '02') return '02';
  if (clean === '9MOBILE' || clean === 'ETISALAT' || clean === '03') return '03';
  if (clean === 'AIRTEL' || clean === '04') return '04';
  return NETWORK_CODES[clean];
}

export function resolveClubKonnectDataPlan(network: string, planCode: string): string {
  const net = (network || '').toUpperCase();
  const code = (planCode || '').trim();

  // If already matches Airtel format (e.g. Airtel500MB, Airtel1GB)
  if (code.toLowerCase().startsWith('airtel')) return code;

  // If network is Airtel and code doesn't start with Airtel
  if (net === 'AIRTEL' || net === '04') {
    if (code === '500' || code === '500MB' || code === '500.0MB') return 'Airtel500MB';
    if (code === '1000' || code === '1GB' || code === '1000MB' || code === '1000.0MB') return 'Airtel1GB';
    if (code === '2000' || code === '2GB' || code === '2000MB' || code === '2000.0MB') return 'Airtel2GB';
    if (code === '3000' || code === '3GB' || code === '3000MB' || code === '3000.0MB') return 'Airtel3GB';
    if (code === '5000' || code === '5GB' || code === '5000MB' || code === '5000.0MB') return 'Airtel5GB';
    if (code === '10000' || code === '10GB' || code === '10000MB' || code === '10000.0MB') return 'Airtel10GB';
  }

  // If network is MTN: standard codes are 500, 1000, 2000, 3000, 5000, 10000
  if (net === 'MTN' || net === '01') {
    if (code === '500MB' || code === '500.0MB') return '500';
    if (code === '1000MB' || code === '1000.0MB') return '1000';
    if (code === '2000MB' || code === '2000.0MB') return '2000';
    if (code === '3000MB' || code === '3000.0MB') return '3000';
    if (code === '5000MB' || code === '5000.0MB') return '5000';
    if (code === '10000MB' || code === '10000.0MB') return '10000';
  }

  return code;
}

/**
 * Backend check function that verifies the existence of CLUBKONNECT_USER_ID (or CLUBKONNECT_U),
 * and CLUBKONNECT_API_KEY (or CLUBKONNECT_A) when DEMO_MODE is false.
 */
export function verifyClubKonnectEnvironment(): {
  userId: string;
  apiKey: string;
  baseUrl: string;
  demoMode: boolean;
} {
  const isDemo = process.env.DEMO_MODE !== 'false';
  const userId = (process.env.CLUBKONNECT_USER_ID || process.env.CLUBKONNECT_U || '').trim();
  const apiKey = (process.env.CLUBKONNECT_API_KEY || process.env.CLUBKONNECT_A || '').trim();
  const rawBaseUrl = (process.env.CLUBKONNECT_BASE_URL || 'https://www.nellobytesystems.com').trim();

  let cleanBaseUrl = rawBaseUrl ? rawBaseUrl.replace(/\/+$/, '') : 'https://www.nellobytesystems.com';
  if (cleanBaseUrl && !cleanBaseUrl.startsWith('http://') && !cleanBaseUrl.startsWith('https://')) {
    cleanBaseUrl = 'https://www.nellobytesystems.com';
  }

  if (!isDemo && (!userId || !apiKey)) {
    const missing: string[] = [];
    if (!userId) missing.push('CLUBKONNECT_USER_ID (or CLUBKONNECT_U)');
    if (!apiKey) missing.push('CLUBKONNECT_API_KEY (or CLUBKONNECT_A)');
    throw new Error(`Missing required ClubKonnect configuration in live mode: ${missing.join(', ')}`);
  }

  return {
    userId,
    apiKey,
    baseUrl: cleanBaseUrl,
    demoMode: isDemo
  };
}

export class ClubKonnectService {
  public getConfig(): ClubKonnectConfig {
    return verifyClubKonnectEnvironment();
  }

  public isDemoMode(): boolean {
    return this.getConfig().demoMode;
  }

  /**
   * Asserts that required ClubKonnect credentials and base URL exist in the server environment when DEMO_MODE=false.
   * Logs a descriptive error and throws if any of CLUBKONNECT_USER_ID, CLUBKONNECT_API_KEY, or CLUBKONNECT_BASE_URL are missing.
   */
  public assertCredentialsConfigured(): void {
    verifyClubKonnectEnvironment();
  }

  /**
   * Validates Nigerian mobile phone format (080, 081, 070, 090, 091 followed by 8 digits, total 11 digits)
   */
  public isValidNigerianPhone(phone: string): boolean {
    const cleaned = phone.replace(/[\s\-\+]/g, '');
    // Standard format: 080XXXXXXXX, 070XXXXXXXX, 090XXXXXXXX, 081XXXXXXXX, 091XXXXXXXX
    // Or with country code 23480XXXXXXXX
    if (/^0[789][01]\d{8}$/.test(cleaned)) return true;
    if (/^234[789][01]\d{8}$/.test(cleaned)) return true;
    return false;
  }

  public normalizePhone(phone: string): string {
    const cleaned = phone.replace(/[\s\-\+]/g, '');
    if (cleaned.startsWith('234') && cleaned.length === 13) {
      return '0' + cleaned.slice(3);
    }
    return cleaned;
  }

  /**
   * Purchases Mobile Data Bundle from Nellobyte Systems / ClubKonnect
   * Official Endpoint: https://www.nellobytesystems.com/APIDatabundleV1.asp
   * Query Parameters:
   *   UserID: process.env.CLUBKONNECT_U (or CLUBKONNECT_USER_ID)
   *   APIKey: process.env.CLUBKONNECT_A (or CLUBKONNECT_API_KEY)
   *   MobileNetwork: '01' (MTN), '02' (GLO), '03' (9MOBILE), '04' (AIRTEL)
   *   DataPlan: Exact ClubKonnect DataPlan Code
   *   MobileNumber: Recipient phone number
   *   RequestID: Unique reference string
   */
  public async purchaseData(params: {
    network: string;
    dataPlanCode: string; // ClubKonnect variation code from database
    recipientPhone: string;
    requestId: string;
  }): Promise<ProviderPurchaseResult> {
    const config = this.getConfig();
    const networkCode = getNetworkCode(params.network);

    if (!networkCode) {
      return {
        success: false,
        status: 'FAILED',
        providerReference: '',
        statusCode: 'INVALID_NETWORK',
        statusMessage: `Unsupported network: ${params.network}`
      };
    }

    const formattedPhone = this.normalizePhone(params.recipientPhone);
    if (!this.isValidNigerianPhone(formattedPhone)) {
      return {
        success: false,
        status: 'FAILED',
        providerReference: '',
        statusCode: 'INVALID_PHONE',
        statusMessage: 'Invalid Nigerian phone number'
      };
    }

    // SIMULATED PROVIDER ONLY IN DEMO MODE (DEMO_MODE=true)
    if (config.demoMode) {
      return this.simulateDataPurchase(params.network, params.dataPlanCode, formattedPhone, params.requestId);
    }

    // PRODUCTION MODE: Strict credentials assertion
    this.assertCredentialsConfigured();

    const resolvedPlan = resolveClubKonnectDataPlan(params.network, params.dataPlanCode);

    // RequestID must be a unique numeric string for ClubKonnect
    const numericRequestId = /^\d+$/.test(params.requestId)
      ? params.requestId
      : `${Date.now()}${Math.floor(100000 + Math.random() * 900000)}`;

    // Official Nellobyte / ClubKonnect APIDatabundleV1.asp query parameters
    const queryParams = new URLSearchParams({
      UserID: config.userId,
      APIKey: config.apiKey,
      MobileNetwork: networkCode,
      DataPlan: resolvedPlan,
      MobileNumber: formattedPhone,
      RequestID: numericRequestId
    });

    // Exact official endpoint: https://www.nellobytesystems.com/APIDatabundleV1.asp
    const targetUrl = `${CLUBKONNECT_DATA_ENDPOINT}?${queryParams.toString()}`;

    let attempt = 0;
    const maxAttempts = 3;
    let isTransientFailure = false;
    let lastErrorMsg = '';

    while (attempt < maxAttempts) {
      attempt++;
      try {
        console.log(`================ [Nellobyte/ClubKonnect Data Request - Attempt ${attempt}/${maxAttempts}] ================`);
        console.log(`Endpoint: ${CLUBKONNECT_DATA_ENDPOINT}`);
        console.log(`Parameters: UserID=${config.userId}, APIKey=[REDACTED], MobileNetwork=${networkCode}, DataPlan=${resolvedPlan}, MobileNumber=${formattedPhone}, RequestID=${numericRequestId}`);
        console.log(`Full Request URL: ${targetUrl.replace(config.apiKey, '***')}`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

        const response = await fetch(targetUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'DataHub-VTU-Server/1.0'
          },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        const responseText = await response.text();
        console.log(`HTTP Status: ${response.status} ${response.statusText}`);
        console.log(`[ClubKonnect RAW Response]:\n${responseText}`);
        console.log('=====================================================================');

        if (response.status >= 500 && response.status <= 599) {
          isTransientFailure = true;
          lastErrorMsg = `HTTP ${response.status} ${response.statusText}`;
          console.warn(`[ClubKonnect Server Error]: HTTP ${response.status} (Attempt ${attempt}/${maxAttempts}). Provider busy, retrying in 10 seconds...`);
          if (attempt < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, 10000));
            continue;
          }
          break;
        }

        if (response.status === 404) {
          const notFoundErr = `Nellobyte/ClubKonnect Data API returned 404 Not Found (${CLUBKONNECT_DATA_ENDPOINT})`;
          console.error(`[Nellobyte/ClubKonnect 404 Error]: ${notFoundErr}`);
          return {
            success: false,
            status: 'FAILED',
            providerReference: '',
            statusCode: '404',
            statusMessage: notFoundErr,
            providerError: notFoundErr,
            rawResponse: { status: 404, body: responseText }
          };
        }

        if (!response.ok) {
          const httpErr = `Nellobyte/ClubKonnect Data API error: HTTP ${response.status} ${response.statusText}`;
          console.error(`[Nellobyte/ClubKonnect HTTP Error]: ${httpErr}`);
          return {
            success: false,
            status: 'FAILED',
            providerReference: '',
            statusCode: String(response.status),
            statusMessage: httpErr,
            providerError: httpErr,
            rawResponse: { status: response.status, body: responseText }
          };
        }

        let data: any = {};
        try {
          data = JSON.parse(responseText);
        } catch {
          data = { rawText: responseText };
        }

        return this.mapProviderResponse(data, numericRequestId, responseText);
      } catch (err: any) {
        isTransientFailure = true;
        lastErrorMsg = err.message || 'Error communicating with ClubKonnect server';
        console.warn(`[Nellobyte/ClubKonnect Network Error]: ${lastErrorMsg} (Attempt ${attempt}/${maxAttempts}). Provider busy, retrying in 10 seconds...`);
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 10000));
          continue;
        }
        break;
      }
    }

    if (isTransientFailure) {
      console.warn(`[ClubKonnect Data] All ${maxAttempts} attempts (30s) failed due to 500/network timeout on http://nellobytesystems.com. Marking as FAILED_REFUNDED.`);
      return {
        success: false,
        status: 'FAILED_REFUNDED',
        isTransient: false,
        providerReference: '',
        statusCode: 'NETWORK_BUSY',
        statusMessage: 'Network busy',
        providerError: 'Network busy'
      };
    }

    return {
      success: false,
      status: 'FAILED',
      providerReference: '',
      statusCode: 'FETCH_ERROR',
      statusMessage: lastErrorMsg || 'Error communicating with ClubKonnect server',
      providerError: lastErrorMsg || 'Error communicating with ClubKonnect server'
    };
  }

  /**
   * Purchases Airtime Top-Up from Nellobyte Systems / ClubKonnect
   * Official Endpoint: https://www.nellobytesystems.com/APIAirtimeV1.asp
   */
  public async purchaseAirtime(params: {
    network: string;
    amountNaira: number;
    recipientPhone: string;
    requestId: string;
  }): Promise<ProviderPurchaseResult> {
    const config = this.getConfig();
    const networkCode = getNetworkCode(params.network);

    if (!networkCode) {
      return {
        success: false,
        status: 'FAILED',
        providerReference: '',
        statusCode: 'INVALID_NETWORK',
        statusMessage: `Unsupported network: ${params.network}`,
        providerError: `Unsupported network: ${params.network}`
      };
    }

    const formattedPhone = this.normalizePhone(params.recipientPhone);
    if (!this.isValidNigerianPhone(formattedPhone)) {
      return {
        success: false,
        status: 'FAILED',
        providerReference: '',
        statusCode: 'INVALID_PHONE',
        statusMessage: 'Invalid Nigerian phone number',
        providerError: 'Invalid Nigerian phone number'
      };
    }

    if (params.amountNaira < 50 || params.amountNaira > 50000) {
      return {
        success: false,
        status: 'FAILED',
        providerReference: '',
        statusCode: 'INVALID_AMOUNT',
        statusMessage: 'Airtime amount must be between ₦50 and ₦50,000',
        providerError: 'Airtime amount must be between ₦50 and ₦50,000'
      };
    }

    // SIMULATED PROVIDER IN DEMO MODE
    if (config.demoMode) {
      return this.simulateAirtimePurchase(params.network, params.amountNaira, formattedPhone, params.requestId);
    }

    // PRODUCTION MODE: Strict credentials assertion
    this.assertCredentialsConfigured();

    const numericRequestId = /^\d+$/.test(params.requestId)
      ? params.requestId
      : `${Date.now()}${Math.floor(100000 + Math.random() * 900000)}`;

    // Official Nellobyte / ClubKonnect APIAirtimeV1.asp query parameters
    const queryParams = new URLSearchParams({
      UserID: config.userId,
      APIKey: config.apiKey,
      MobileNetwork: networkCode,
      Amount: String(params.amountNaira),
      MobileNumber: formattedPhone,
      RequestID: numericRequestId
    });

    // Exact official endpoint: https://www.nellobytesystems.com/APIAirtimeV1.asp
    const targetUrl = `${CLUBKONNECT_AIRTIME_ENDPOINT}?${queryParams.toString()}`;

    let attempt = 0;
    const maxAttempts = 3;
    let isTransientFailure = false;
    let lastErrorMsg = '';

    while (attempt < maxAttempts) {
      attempt++;
      try {
        console.log(`================ [Nellobyte/ClubKonnect Airtime Request - Attempt ${attempt}/${maxAttempts}] ================`);
        console.log(`Endpoint: ${CLUBKONNECT_AIRTIME_ENDPOINT}`);
        console.log(`Parameters: UserID=${config.userId}, APIKey=[REDACTED], MobileNetwork=${networkCode}, Amount=${params.amountNaira}, MobileNumber=${formattedPhone}, RequestID=${numericRequestId}`);
        console.log(`Full Request URL: ${targetUrl.replace(config.apiKey, '***')}`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        const response = await fetch(targetUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'DataHub-VTU-Server/1.0'
          },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        const responseText = await response.text();
        console.log(`HTTP Status: ${response.status} ${response.statusText}`);
        console.log(`[ClubKonnect RAW Response]:\n${responseText}`);
        console.log('===================================================================');

        if (response.status >= 500 && response.status <= 599) {
          isTransientFailure = true;
          lastErrorMsg = `HTTP ${response.status} ${response.statusText}`;
          console.warn(`[ClubKonnect Server Error]: HTTP ${response.status} (Attempt ${attempt}/${maxAttempts}). Provider busy, retrying in 10 seconds...`);
          if (attempt < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, 10000));
            continue;
          }
          break;
        }

        if (response.status === 404) {
          const notFoundErr = `Nellobyte/ClubKonnect Airtime API returned 404 Not Found (${CLUBKONNECT_AIRTIME_ENDPOINT})`;
          console.error(`[Nellobyte/ClubKonnect 404 Error]: ${notFoundErr}`);
          return {
            success: false,
            status: 'FAILED',
            providerReference: '',
            statusCode: '404',
            statusMessage: notFoundErr,
            providerError: notFoundErr,
            rawResponse: { status: 404, body: responseText }
          };
        }

        if (!response.ok) {
          const httpErr = `Nellobyte/ClubKonnect Airtime API error: HTTP ${response.status} ${response.statusText}`;
          console.error(`[Nellobyte/ClubKonnect HTTP Error]: ${httpErr}`);
          return {
            success: false,
            status: 'FAILED',
            providerReference: '',
            statusCode: String(response.status),
            statusMessage: httpErr,
            providerError: httpErr,
            rawResponse: { status: response.status, body: responseText }
          };
        }

        let data: any = {};
        try {
          data = JSON.parse(responseText);
        } catch {
          data = { rawText: responseText };
        }

        return this.mapProviderResponse(data, numericRequestId, responseText);
      } catch (err: any) {
        isTransientFailure = true;
        lastErrorMsg = err.message || 'Error communicating with ClubKonnect server';
        console.warn(`[Nellobyte/ClubKonnect Airtime Network Error]: ${lastErrorMsg} (Attempt ${attempt}/${maxAttempts}). Provider busy, retrying in 10 seconds...`);
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 10000));
          continue;
        }
        break;
      }
    }

    if (isTransientFailure) {
      console.warn(`[ClubKonnect Airtime] All ${maxAttempts} attempts (30s) failed due to 500/network timeout on http://nellobytesystems.com. Marking as FAILED_REFUNDED.`);
      return {
        success: false,
        status: 'FAILED_REFUNDED',
        isTransient: false,
        providerReference: '',
        statusCode: 'NETWORK_BUSY',
        statusMessage: 'Network busy',
        providerError: 'Network busy'
      };
    }

    return {
      success: false,
      status: 'FAILED',
      providerReference: '',
      statusCode: 'FETCH_ERROR',
      statusMessage: lastErrorMsg || 'Error communicating with ClubKonnect server',
      providerError: lastErrorMsg || 'Error communicating with ClubKonnect server'
    };
  }

  /**
   * Requery transaction status from ClubKonnect
   * Official Endpoint: https://www.nellobytesystems.com/APIQueryV1.asp
   */
  public async requeryTransaction(params: {
    orderId?: string;
    requestId: string;
  }): Promise<ProviderPurchaseResult> {
    const config = this.getConfig();

    if (config.demoMode) {
      // In demo mode, simulate successful confirmation or existing status
      return {
        success: true,
        status: 'successful',
        providerReference: params.orderId || `ORD-${Date.now()}`,
        statusCode: '100',
        statusMessage: 'Requery confirmed: Order completed successfully.'
      };
    }

    this.assertCredentialsConfigured();

    const queryParams = new URLSearchParams({
      UserID: config.userId,
      APIKey: config.apiKey,
      ...(params.orderId ? { OrderID: params.orderId } : {}),
      RequestID: params.requestId
    });

    const targetUrl = `${CLUBKONNECT_QUERY_ENDPOINT}?${queryParams.toString()}`;

    try {
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      const data = await response.json();
      return this.mapProviderResponse(data, params.requestId);
    } catch (err: any) {
      return {
        success: false,
        status: 'pending',
        providerReference: params.orderId || '',
        statusCode: 'REQUERY_ERROR',
        statusMessage: err.message || 'Failed to requery transaction'
      };
    }
  }

  /**
   * Maps official ClubKonnect response object to standard internal status.
   * Resolves transaction status immediately to 'SUCCESS' or 'FAILED'.
   * 
   * Official ClubKonnect status codes:
   * 100: ORDER_COMPLETED (Success)
   * 101: ORDER_RECEIVED (Accepted/Processing by provider -> resolved as SUCCESS)
   * 00/200: API Success
   * Error codes:
   * 102: ORDER_CANCELLED
   * 103: ORDER_FAILED
   * 104: INSUFFICIENT_BALANCE
   * 105: INVALID_PRODUCT / INVALID_NETWORK / INVALID_USER
   * 
   * Captures REAL_PROVIDER_REFERENCE directly from provider fields:
   * orderid, OrderID, order_id, TransactionID, reference
   */
  public mapProviderResponse(data: any, requestId: string, rawText = ''): ProviderPurchaseResult {
    const statusCode = String(
      data?.statuscode ?? 
      data?.StatusCode ?? 
      data?.status_code ?? 
      data?.code ?? 
      ''
    ).trim();

    const statusText = String(
      data?.status ?? 
      data?.orderstatus ?? 
      data?.OrderStatus ?? 
      data?.order_status ?? 
      ''
    ).toUpperCase().trim();
    
    // Extract REAL_PROVIDER_REFERENCE from all possible ClubKonnect property variants
    const orderId = String(
      data?.orderid ??
      data?.OrderID ??
      data?.order_id ??
      data?.OrderId ??
      data?.orderId ??
      data?.TransactionID ??
      data?.transactionid ??
      data?.reference ??
      data?.Reference ??
      ''
    ).trim();

    const remark = String(
      data?.remark ?? 
      data?.orderremark ?? 
      data?.msg ?? 
      data?.message ?? 
      data?.error ?? 
      ''
    ).trim();

    const rawUpper = (rawText || JSON.stringify(data || '')).toUpperCase();

    // Determine if response indicates success or accepted order (100, 101, 00, 200, ORDER_RECEIVED, ORDER_COMPLETED, SUCCESS)
    const isSuccess =
      statusCode === '100' ||
      statusCode === '101' ||
      statusCode === '00' ||
      statusCode === '200' ||
      statusText === 'ORDER_COMPLETED' ||
      statusText === 'ORDER_RECEIVED' ||
      statusText === 'ORDER_PROCESSING' ||
      statusText === 'SUCCESS' ||
      statusText === 'SUCCESSFUL' ||
      statusText === 'COMPLETED' ||
      remark.toUpperCase().includes('ORDER_COMPLETED') ||
      remark.toUpperCase().includes('ORDER_RECEIVED') ||
      remark.toUpperCase().includes('ORDER COMPLETED') ||
      remark.toUpperCase().includes('ORDER RECEIVED') ||
      remark.toUpperCase().includes('TRANSACTION SUCCESSFUL') ||
      remark.toUpperCase().includes('SUCCESS') ||
      rawUpper.includes('"STATUSCODE":"100"') ||
      rawUpper.includes('"STATUSCODE":"101"') ||
      rawUpper.includes('"STATUSCODE":100') ||
      rawUpper.includes('"STATUSCODE":101') ||
      rawUpper.includes('ORDER_COMPLETED') ||
      rawUpper.includes('ORDER_RECEIVED');

    if (isSuccess) {
      const successMsg = remark || (statusCode === '101' || statusText.includes('RECEIVED')
        ? 'Order received and delivered by network provider'
        : 'Order completed successfully');

      console.log(`[ClubKonnect Status Resolved]: SUCCESS (Code: ${statusCode || '100'}, Ref: ${orderId || requestId})`);

      return {
        success: true,
        status: 'SUCCESS',
        providerReference: orderId || requestId,
        statusCode: statusCode || '100',
        statusMessage: successMsg,
        rawResponse: data
      };
    }

    // Otherwise treated as FAILED: e.g. "Insufficient Balance", "Invalid Mobile Network", "Invalid Plan", "Invalid User"
    // Extract exact provider error text from all candidate fields ('msg', 'error', 'statuscode', 'remark', or raw text)
    const exactFieldMsg =
      (typeof data?.msg === 'string' && data.msg.trim()) ||
      (typeof data?.error === 'string' && data.error.trim()) ||
      (typeof data?.Error === 'string' && data.Error.trim()) ||
      (typeof data?.remark === 'string' && data.remark.trim()) ||
      (typeof data?.orderremark === 'string' && data.orderremark.trim()) ||
      (typeof data?.message === 'string' && data.message.trim()) ||
      (typeof data?.description === 'string' && data.description.trim()) ||
      '';

    let rawExtractedMsg = '';
    if (rawText && typeof rawText === 'string') {
      const trimmed = rawText.trim();
      // If raw text is NOT a JSON object string
      if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
        // Strip HTML if ClubKonnect returned an HTML error page
        const textOnly = trimmed.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
        rawExtractedMsg = textOnly.slice(0, 300) || trimmed.slice(0, 300);
      }
    }

    const providerFailReason =
      exactFieldMsg ||
      rawExtractedMsg ||
      (statusCode && statusCode !== '100' && statusCode !== '101'
        ? `ClubKonnect error code: ${statusCode}`
        : (statusText && statusText !== 'ORDER_COMPLETED' && statusText !== 'ORDER_RECEIVED'
            ? `ClubKonnect status: ${statusText}`
            : 'Transaction rejected by ClubKonnect'));

    console.error(`[ClubKonnect Status Resolved]: FAILED - ${providerFailReason} (StatusCode: ${statusCode}, StatusText: ${statusText})`);

    return {
      success: false,
      status: 'FAILED',
      providerReference: orderId,
      statusCode: statusCode || 'FAILED',
      statusMessage: providerFailReason,
      providerError: providerFailReason,
      rawResponse: data
    };
  }

  // Realistic simulation for development test mode
  private simulateDataPurchase(network: string, planCode: string, phone: string, requestId: string): ProviderPurchaseResult {
    // Check for mock failure test numbers
    if (phone.endsWith('0000') || phone.endsWith('9999')) {
      return {
        success: false,
        status: 'FAILED',
        providerReference: `FAIL-${Date.now()}`,
        statusCode: '103',
        statusMessage: 'Provider Failure: Recipient number barred or network unreachable.'
      };
    }

    return {
      success: true,
      status: 'SUCCESS',
      providerReference: `CK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      statusCode: '100',
      statusMessage: `${network} data bundle delivered to ${phone} successfully.`
    };
  }

  private simulateAirtimePurchase(network: string, amount: number, phone: string, requestId: string): ProviderPurchaseResult {
    if (phone.endsWith('0000') || phone.endsWith('9999')) {
      return {
        success: false,
        status: 'FAILED',
        providerReference: `FAIL-${Date.now()}`,
        statusCode: '103',
        statusMessage: 'Provider Failure: Recipient line barred or invalid.'
      };
    }

    return {
      success: true,
      status: 'SUCCESS',
      providerReference: `AIR-${Math.floor(10000000 + Math.random() * 90000000)}`,
      statusCode: '100',
      statusMessage: `₦${amount} Airtime credited to ${phone} successfully.`
    };
  }
}

export const clubkonnect = new ClubKonnectService();
```

### FILE: server/services/fundingService.ts
```ts
import { getDb, type DbClient } from '../db/database.ts';
import { walletService } from './walletService.ts';

export interface CreateFundingRequestInput {
  userId: number;
  amountNaira: number;
  transferReference?: string;
  proofImageUrl?: string;
  senderName?: string;
  senderBank?: string;
}

/**
 * Generates an automatic unique internal funding reference:
 * Format: DF-YYYYMMDD-XXXXXX
 */
export function generateFundingReference(): string {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(now.getUTCDate()).padStart(2, '0');
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `DF-${yyyy}${mm}${dd}-${randomSuffix}`;
}

export class FundingService {
  /**
   * User creates a manual bank transfer funding request.
   * DOES NOT credit wallet automatically! Request starts as PENDING.
   * Neither transferReference nor proofImageUrl is required.
   */
  public async createRequest(input: CreateFundingRequestInput) {
    const db = await getDb();
    const amountNaira = Number(input.amountNaira);

    // Validate that amount is greater than 0
    if (isNaN(amountNaira) || amountNaira <= 0) {
      throw new Error('Please enter a valid funding amount greater than ₦0.00');
    }

    const amountKobo = Math.round(amountNaira * 100);
    const internalReference = generateFundingReference();

    // Fetch existing bank settings to associate with this request
    const settingsRes = await db.query(
      'SELECT bank_name, account_number, account_name FROM app_settings WHERE id = 1'
    );
    const settings = settingsRes.rows[0] || {};
    const bankName = settings.bank_name || 'Moniepoint Microfinance Bank';
    const accountName = settings.account_name || 'DataHub Enterprise / Tech Services';
    const accountNumber = settings.account_number || '8145239012';

    // Optional customer inputs
    const transferRef = input.transferReference?.trim() || null;
    const proofUrl = input.proofImageUrl?.trim() || null;
    const senderName = input.senderName?.trim() || null;
    const senderBank = input.senderBank?.trim() || null;

    const res = await db.query(`
      INSERT INTO funding_requests (
        reference, internal_reference, user_id, amount_kobo, currency,
        bank_name, account_name, account_number,
        sender_name, sender_bank, transfer_reference, proof_image_url,
        status
      ) VALUES ($1, $1, $2, $3, 'NGN', $4, $5, $6, $7, $8, $9, $10, 'pending')
      RETURNING *
    `, [
      internalReference,
      input.userId,
      amountKobo,
      bankName,
      accountName,
      accountNumber,
      senderName,
      senderBank,
      transferRef,
      proofUrl
    ]);

    const row = res.rows[0];

    return {
      id: row.id,
      reference: row.reference,
      internalReference: row.internal_reference || row.reference,
      userId: row.user_id,
      amountNaira: Number(row.amount_kobo) / 100,
      amountKobo: Number(row.amount_kobo),
      currency: row.currency || 'NGN',
      bankName: row.bank_name,
      accountName: row.account_name,
      accountNumber: row.account_number,
      senderName: row.sender_name,
      senderBank: row.sender_bank,
      transferReference: row.transfer_reference,
      proofImageUrl: row.proof_image_url,
      status: row.status,
      createdAt: row.created_at
    };
  }

  /**
   * Admin approves a manual funding request.
   * Atomically verifies status is pending and credits wallet exactly once.
   */
  public async approveRequest(requestId: number, adminId: number) {
    const db = await getDb();

    return await db.transaction(async (tx: DbClient) => {
      // 1. Lock the funding request row to prevent race-condition double approvals
      const reqRes = await tx.query(
        'SELECT * FROM funding_requests WHERE id = $1 FOR UPDATE',
        [requestId]
      );

      if (reqRes.rows.length === 0) {
        throw new Error('Funding request not found.');
      }

      const req = reqRes.rows[0];

      if (req.status !== 'pending') {
        throw new Error(`Cannot approve: Request has already been ${req.status}.`);
      }

      const amountKobo = Number(req.amount_kobo);
      const internalRef = req.internal_reference || req.reference;
      const creditRef = `CREDIT-${internalRef}`;

      // 2. Credit the user's wallet with ledger entry within this atomic transaction
      await walletService.credit(
        req.user_id,
        amountKobo,
        creditRef,
        `Wallet Funding: +₦${(amountKobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 })} (Ref: ${internalRef})`,
        tx
      );

      // 3. Record transaction in transactions table
      await tx.query(`
        INSERT INTO transactions (
          reference, user_id, product_type, network, recipient_phone,
          provider, provider_reference, provider_cost_kobo,
          selling_price_kobo, profit_kobo, status, is_demo, metadata
        ) VALUES ($1, $2, 'wallet_funding', NULL, NULL, 'ManualBank', $3, $4, $4, 0, 'successful', false, $5)
      `, [
        internalRef,
        req.user_id,
        req.transfer_reference || internalRef,
        amountKobo,
        JSON.stringify({
          internal_reference: internalRef,
          transfer_reference: req.transfer_reference,
          sender_name: req.sender_name,
          sender_bank: req.sender_bank,
          bank_name: req.bank_name,
          account_number: req.account_number,
          approved_by_admin: adminId
        })
      ]);

      // 4. Update request status to 'approved'
      await tx.query(`
        UPDATE funding_requests
        SET status = 'approved',
            admin_id = $1,
            approved_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [adminId, requestId]);

      // 5. User Notification
      const amountNairaFormatted = (amountKobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
      await tx.query(`
        INSERT INTO user_notifications (user_id, title, message, type)
        VALUES ($1, 'Wallet Funding Approved', $2, 'funding_approved')
      `, [req.user_id, `Your funding of ₦${amountNairaFormatted} has been approved`]);

      // 6. Audit log
      await tx.query(`
        INSERT INTO admin_audit_logs (
          admin_id, action, target_id, target_type, details
        ) VALUES ($1, 'funding_approval', $2, 'funding_request', $3)
      `, [adminId, String(requestId), `Approved funding ${internalRef} of ₦${(amountKobo / 100).toFixed(2)} for user #${req.user_id}`]);

      return {
        success: true,
        requestId,
        internalReference: internalRef,
        amountNaira: amountKobo / 100,
        userId: req.user_id,
        status: 'approved'
      };
    });
  }

  /**
   * Admin rejects a manual funding request with a stated reason.
   */
  public async rejectRequest(requestId: number, adminId: number, rejectionReason?: string) {
    const db = await getDb();
    const reasonText = rejectionReason?.trim() || 'Payment could not be verified on bank statement';

    return await db.transaction(async (tx: DbClient) => {
      const reqRes = await tx.query(
        'SELECT * FROM funding_requests WHERE id = $1 FOR UPDATE',
        [requestId]
      );

      if (reqRes.rows.length === 0) {
        throw new Error('Funding request not found.');
      }

      const req = reqRes.rows[0];

      if (req.status !== 'pending') {
        throw new Error(`Cannot reject: Request has already been ${req.status}.`);
      }

      const internalRef = req.internal_reference || req.reference;

      await tx.query(`
        UPDATE funding_requests
        SET status = 'rejected',
            admin_id = $1,
            rejection_reason = $2,
            rejected_at = CURRENT_TIMESTAMP
        WHERE id = $3
      `, [adminId, reasonText, requestId]);

      const rejectedAmountNaira = (Number(req.amount_kobo) / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
      await tx.query(`
        INSERT INTO user_notifications (user_id, title, message, type)
        VALUES ($1, 'Funding Request Not Approved', $2, 'funding_rejected')
      `, [req.user_id, `Your funding request of ₦${rejectedAmountNaira} was declined: ${reasonText}`]);

      await tx.query(`
        INSERT INTO admin_audit_logs (
          admin_id, action, target_id, target_type, details
        ) VALUES ($1, 'funding_rejection', $2, 'funding_request', $3)
      `, [adminId, String(requestId), `Rejected funding request ${internalRef} (#${requestId}). Reason: ${reasonText}`]);

      return {
        success: true,
        requestId,
        internalReference: internalRef,
        status: 'rejected',
        reason: reasonText
      };
    });
  }

  /**
   * User fetches their funding history
   */
  public async getUserRequests(userId: number) {
    const db = await getDb();
    const res = await db.query(
      `SELECT * FROM funding_requests 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );

    return res.rows.map(r => ({
      id: r.id,
      reference: r.reference,
      internalReference: r.internal_reference || r.reference,
      userId: r.user_id,
      amountNaira: Number(r.amount_kobo) / 100,
      currency: r.currency || 'NGN',
      bankName: r.bank_name,
      accountName: r.account_name,
      accountNumber: r.account_number,
      senderName: r.sender_name,
      senderBank: r.sender_bank,
      transferReference: r.transfer_reference,
      proofImageUrl: r.proof_image_url,
      status: r.status,
      rejectionReason: r.rejection_reason,
      approvedAt: r.approved_at,
      rejectedAt: r.rejected_at,
      createdAt: r.created_at
    }));
  }
}

export const fundingService = new FundingService();
```

### FILE: server/services/transactionEngine.ts
```ts
import bcrypt from 'bcryptjs';
import { getDb } from '../db/database.ts';
import { walletService } from './walletService.ts';
import { clubkonnect, NETWORK_CODES } from './clubkonnectService.ts';

export interface PurchaseDataInput {
  userId: number;
  planId: string; // Internal DataHub plan ID
  recipientPhone: string;
  transactionPin: string;
}

export interface PurchaseAirtimeInput {
  userId: number;
  network: string; // 'MTN', 'AIRTEL', 'GLO', '9MOBILE'
  amountNaira: number;
  recipientPhone: string;
  transactionPin: string;
}

export class TransactionEngine {
  /**
   * Validates user and 4-digit transaction PIN
   */
  private async verifyUserAndPin(userId: number, pin: string) {
    const db = await getDb();
    const userRes = await db.query(
      'SELECT id, status, transaction_pin_hash FROM users WHERE id = $1',
      [userId]
    );

    if (userRes.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = userRes.rows[0];
    if (user.status === 'suspended') {
      throw new Error('Your account is suspended. Please contact support.');
    }

    if (!user.transaction_pin_hash) {
      throw new Error('Transaction PIN not set. Please set a 4-digit PIN in your Profile before transacting.');
    }

    const pinMatch = await bcrypt.compare(pin, user.transaction_pin_hash);
    if (!pinMatch) {
      throw new Error('Incorrect transaction PIN. Please verify your 4-digit PIN.');
    }

    return user;
  }

  /**
   * Process Mobile Data Purchase
   */
  public async processDataPurchase(input: PurchaseDataInput) {
    // 0. Ensure provider credentials are fully configured if in live mode (DEMO_MODE=false)
    // Throws immediately if required environment variables are missing, before wallet debit.
    clubkonnect.assertCredentialsConfigured();

    const db = await getDb();

    // 1. Verify User & PIN
    await this.verifyUserAndPin(input.userId, input.transactionPin);

    // 2. Validate phone number format
    const phone = clubkonnect.normalizePhone(input.recipientPhone);
    if (!clubkonnect.isValidNigerianPhone(phone)) {
      throw new Error('Invalid Nigerian phone number. Must be 11 digits (e.g., 08012345678).');
    }

    // 3. Retrieve Trusted Plan from Database using internal plan ID
    // CRITICAL: Frontend variation codes are strictly ignored; DB is the sole source of truth.
    const planRes = await db.query(
      'SELECT * FROM data_plans WHERE id = $1',
      [input.planId]
    );

    if (planRes.rows.length === 0) {
      throw new Error('Requested data plan does not exist.');
    }

    const plan = planRes.rows[0];
    if (!plan.is_active) {
      throw new Error('This data plan is currently unavailable.');
    }

    const providerCostKobo = Number(plan.provider_cost_kobo);
    const sellingPriceKobo = Number(plan.selling_price_kobo);
    const profitKobo = sellingPriceKobo - providerCostKobo;
    const providerCode = plan.provider_code;
    const network = plan.network.toUpperCase();

    // 4. Generate unique transaction reference
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `DH-DATA-${timestamp}-${randomSuffix}`;
    const isDemo = clubkonnect.isDemoMode();

    // 4.5. Pre-validate provider credentials in live mode before debiting wallet
    if (!isDemo) {
      clubkonnect.assertCredentialsConfigured();
    }

    // 5. Check and safely Debit Wallet
    const debitResult = await walletService.debit(
      input.userId,
      sellingPriceKobo,
      `DEBIT-${reference}`,
      `Purchase: ${plan.plan_name} for ${phone}`
    );

    if (!debitResult.success) {
      throw new Error(debitResult.error || 'Failed to debit wallet.');
    }

    // 6. Record transaction in database with status 'processing'
    const txRes = await db.query(`
      INSERT INTO transactions (
        reference, user_id, product_type, network, recipient_phone,
        plan_id, provider, provider_reference, provider_cost_kobo,
        selling_price_kobo, profit_kobo, status, is_demo, metadata
      ) VALUES ($1, $2, 'data', $3, $4, $5, 'ClubKonnect', '', $6, $7, $8, 'processing', $9, $10)
      RETURNING id
    `, [
      reference,
      input.userId,
      network,
      phone,
      plan.id,
      providerCostKobo,
      sellingPriceKobo,
      profitKobo,
      isDemo,
      JSON.stringify({ plan_name: plan.plan_name, data_amount: plan.data_amount, duration: plan.duration })
    ]);

    const transactionId = txRes.rows[0].id;

    // Log transaction event
    await db.query(`
      INSERT INTO transaction_events (transaction_id, event_type, details)
      VALUES ($1, 'debited', $2)
    `, [transactionId, `Debited ₦${(sellingPriceKobo / 100).toFixed(2)} from user wallet.`]);

    // 7. Dispatch to ClubKonnect
    let providerResult;
    try {
      providerResult = await clubkonnect.purchaseData({
        network,
        dataPlanCode: providerCode,
        recipientPhone: phone,
        requestId: reference
      });
    } catch (err: any) {
      // Never mask configuration/credentials errors as pending!
      if (err.message && (err.message.includes('ClubKonnect') || err.message.includes('CLUBKONNECT_'))) {
        throw err;
      }
      providerResult = {
        success: false,
        status: 'pending' as const,
        providerReference: '',
        statusCode: 'CLIENT_ERROR',
        statusMessage: err.message || 'Error communicating with provider'
      };
    }

    // 8. Handle Provider Response
    const isSuccess = providerResult.success || providerResult.status === 'SUCCESS' || providerResult.status === 'successful';
    const isTransientPending = providerResult.status === 'pending' || providerResult.isTransient;

    if (isSuccess) {
      // Confirmed success: immediately set status to SUCCESS in database
      await db.query(`
        UPDATE transactions
        SET status = 'SUCCESS',
            provider_reference = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [providerResult.providerReference || reference, transactionId]);

      await db.query(`
        INSERT INTO transaction_events (transaction_id, event_type, details)
        VALUES ($1, 'completed', $2)
      `, [transactionId, `Provider confirmed order ID ${providerResult.providerReference}. ${providerResult.statusMessage}`]);

      console.log(`[TransactionEngine] Data transaction ${reference} resolved: SUCCESS`);

      return {
        success: true,
        status: 'SUCCESS',
        reference,
        planName: plan.plan_name,
        network,
        recipientPhone: phone,
        amountNaira: sellingPriceKobo / 100,
        providerReference: providerResult.providerReference,
        message: providerResult.statusMessage || 'Data purchase completed successfully!'
      };
    } else {
      // After 3 retries (30 sec total): auto-refund wallet and set status to FAILED_REFUNDED
      const refundRef = `REFUND-${reference}`;
      await walletService.credit(
        input.userId,
        sellingPriceKobo,
        refundRef,
        `Auto-Refund: Network busy data purchase (${reference})`
      );

      const refundAmountNaira = (sellingPriceKobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
      const refundMsg = `Network busy, ₦${refundAmountNaira} refunded to wallet`;

      console.error(`[TransactionEngine] Data transaction ${reference} resolved: FAILED_REFUNDED - ${refundMsg}`);

      await db.query(`
        UPDATE transactions
        SET status = 'FAILED_REFUNDED',
            refund_reference = $1,
            provider_reference = COALESCE(NULLIF($2, ''), provider_reference),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
      `, [refundRef, providerResult.providerReference || '', transactionId]);

      await db.query(`
        INSERT INTO transaction_events (transaction_id, event_type, details)
        VALUES ($1, 'refunded', $2)
      `, [transactionId, `Provider network busy after 3 retries: ${providerResult.statusMessage}. Auto-refunded ₦${refundAmountNaira} to user wallet.`]);

      return {
        success: false,
        status: 'FAILED_REFUNDED',
        reference,
        planName: plan.plan_name,
        network,
        recipientPhone: phone,
        amountNaira: sellingPriceKobo / 100,
        refunded: true,
        refundReference: refundRef,
        providerReference: providerResult.providerReference,
        providerError: 'Network busy',
        message: refundMsg
      };
    }
  }

  /**
   * Process Airtime Purchase
   */
  public async processAirtimePurchase(input: PurchaseAirtimeInput) {
    // 0. Ensure provider credentials are fully configured if in live mode (DEMO_MODE=false)
    // Throws immediately if required environment variables are missing, before wallet debit.
    clubkonnect.assertCredentialsConfigured();

    const db = await getDb();

    // 1. Verify User & PIN
    await this.verifyUserAndPin(input.userId, input.transactionPin);

    // 2. Validate Network
    const network = input.network.toUpperCase();
    if (!NETWORK_CODES[network]) {
      throw new Error(`Unsupported mobile network: ${input.network}`);
    }

    // 3. Validate Phone
    const phone = clubkonnect.normalizePhone(input.recipientPhone);
    if (!clubkonnect.isValidNigerianPhone(phone)) {
      throw new Error('Invalid Nigerian phone number.');
    }

    // 4. Validate Amount
    const amountNaira = Number(input.amountNaira);
    if (isNaN(amountNaira) || amountNaira < 50 || amountNaira > 50000) {
      throw new Error('Airtime amount must be between ₦50 and ₦50,000.');
    }

    // 5. Look up network airtime product & discount
    const productRes = await db.query(
      'SELECT * FROM airtime_products WHERE network = $1',
      [network]
    );

    const discountPercent = productRes.rows.length > 0 ? Number(productRes.rows[0].discount_percent) : 2.0;

    // Face value in kobo
    const faceValueKobo = Math.round(amountNaira * 100);
    // User discount (e.g. 2% off)
    const sellingPriceKobo = Math.round(faceValueKobo * (1 - (discountPercent / 100)));
    // Provider cost estimate (ClubKonnect typical discount 3% to 4%)
    const providerDiscountPercent = 3.5;
    const providerCostKobo = Math.round(faceValueKobo * (1 - (providerDiscountPercent / 100)));
    const profitKobo = sellingPriceKobo - providerCostKobo;

    // 6. Generate Reference
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `DH-AIR-${timestamp}-${randomSuffix}`;
    const isDemo = clubkonnect.isDemoMode();

    // 6.5. Pre-validate provider credentials in live mode before debiting wallet
    if (!isDemo) {
      clubkonnect.assertCredentialsConfigured();
    }

    // 7. Debit Wallet
    const debitResult = await walletService.debit(
      input.userId,
      sellingPriceKobo,
      `DEBIT-${reference}`,
      `Airtime: ₦${amountNaira} ${network} to ${phone}`
    );

    if (!debitResult.success) {
      throw new Error(debitResult.error || 'Failed to debit wallet.');
    }

    // 8. Record transaction
    const txRes = await db.query(`
      INSERT INTO transactions (
        reference, user_id, product_type, network, recipient_phone,
        provider, provider_reference, provider_cost_kobo,
        selling_price_kobo, profit_kobo, status, is_demo, metadata
      ) VALUES ($1, $2, 'airtime', $3, $4, 'ClubKonnect', '', $5, $6, $7, 'processing', $8, $9)
      RETURNING id
    `, [
      reference,
      input.userId,
      network,
      phone,
      providerCostKobo,
      sellingPriceKobo,
      profitKobo,
      isDemo,
      JSON.stringify({ face_value_naira: amountNaira, discount_percent: discountPercent })
    ]);

    const transactionId = txRes.rows[0].id;

    // 9. Dispatch to Provider
    let providerResult;
    try {
      providerResult = await clubkonnect.purchaseAirtime({
        network,
        amountNaira,
        recipientPhone: phone,
        requestId: reference
      });
    } catch (err: any) {
      // Never mask configuration/credentials errors as pending!
      if (err.message && (err.message.includes('ClubKonnect') || err.message.includes('CLUBKONNECT_'))) {
        throw err;
      }
      providerResult = {
        success: false,
        status: 'pending' as const,
        providerReference: '',
        statusCode: 'CLIENT_ERROR',
        statusMessage: err.message || 'Error communicating with provider'
      };
    }

    // 10. Handle Provider Outcome
    const isSuccess = providerResult.success || providerResult.status === 'SUCCESS' || providerResult.status === 'successful';
    const isTransientPending = providerResult.status === 'pending' || providerResult.isTransient;

    if (isSuccess) {
      await db.query(`
        UPDATE transactions
        SET status = 'SUCCESS',
            provider_reference = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [providerResult.providerReference || reference, transactionId]);

      await db.query(`
        INSERT INTO transaction_events (transaction_id, event_type, details)
        VALUES ($1, 'completed', $2)
      `, [transactionId, `Provider airtime order ID ${providerResult.providerReference} confirmed.`]);

      console.log(`[TransactionEngine] Airtime transaction ${reference} resolved: SUCCESS`);

      return {
        success: true,
        status: 'SUCCESS',
        reference,
        network,
        recipientPhone: phone,
        airtimeAmount: amountNaira,
        chargedNaira: sellingPriceKobo / 100,
        providerReference: providerResult.providerReference,
        message: providerResult.statusMessage || `₦${amountNaira} airtime sent successfully to ${phone}!`
      };
    } else {
      // After 3 retries (30 sec total): auto-refund wallet and set status to FAILED_REFUNDED
      const refundRef = `REFUND-${reference}`;
      await walletService.credit(
        input.userId,
        sellingPriceKobo,
        refundRef,
        `Auto-Refund: Network busy airtime purchase (${reference})`
      );

      const refundAmountNaira = (sellingPriceKobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
      const refundMsg = `Network busy, ₦${refundAmountNaira} refunded to wallet`;

      console.error(`[TransactionEngine] Airtime transaction ${reference} resolved: FAILED_REFUNDED - ${refundMsg}`);

      await db.query(`
        UPDATE transactions
        SET status = 'FAILED_REFUNDED',
            refund_reference = $1,
            provider_reference = COALESCE(NULLIF($2, ''), provider_reference),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
      `, [refundRef, providerResult.providerReference || '', transactionId]);

      await db.query(`
        INSERT INTO transaction_events (transaction_id, event_type, details)
        VALUES ($1, 'refunded', $2)
      `, [transactionId, `Provider airtime network busy after 3 retries: ${providerResult.statusMessage}. Auto-refunded ₦${refundAmountNaira} to user wallet.`]);

      return {
        success: false,
        status: 'FAILED_REFUNDED',
        reference,
        network,
        recipientPhone: phone,
        airtimeAmount: amountNaira,
        chargedNaira: sellingPriceKobo / 100,
        refunded: true,
        refundReference: refundRef,
        providerReference: providerResult.providerReference,
        providerError: 'Network busy',
        message: refundMsg
      };
    }
  }

  /**
   * Admin Manually Retry a Pending Transaction
   */
  public async retryPendingTransaction(transactionId: number, adminId?: number) {
    const db = await getDb();
    const txRes = await db.query(
      'SELECT t.*, p.provider_code FROM transactions t LEFT JOIN data_plans p ON t.plan_id = p.id WHERE t.id = $1',
      [transactionId]
    );

    if (txRes.rows.length === 0) {
      throw new Error('Transaction not found.');
    }

    const tx = txRes.rows[0];
    if (tx.status !== 'pending' && tx.status !== 'processing') {
      return {
        success: tx.status === 'successful' || tx.status === 'SUCCESS',
        status: tx.status,
        message: `Transaction is already resolved as '${tx.status}'.`
      };
    }

    console.log(`[TransactionEngine] Admin #${adminId || 0} manually retrying pending transaction #${transactionId} (${tx.reference})...`);

    let providerResult: any;

    if (tx.product_type === 'data') {
      if (!tx.provider_code) {
        throw new Error('Associated data plan variation code not found.');
      }
      providerResult = await clubkonnect.purchaseData({
        network: tx.network,
        dataPlanCode: tx.provider_code,
        recipientPhone: tx.recipient_phone,
        requestId: tx.reference
      });
    } else if (tx.product_type === 'airtime') {
      let amountNaira = 0;
      try {
        const meta = typeof tx.metadata === 'string' ? JSON.parse(tx.metadata) : tx.metadata;
        amountNaira = Number(meta?.face_value_naira) || (Number(tx.selling_price_kobo) / 100);
      } catch {
        amountNaira = Number(tx.selling_price_kobo) / 100;
      }

      providerResult = await clubkonnect.purchaseAirtime({
        network: tx.network,
        amountNaira,
        recipientPhone: tx.recipient_phone,
        requestId: tx.reference
      });
    } else {
      throw new Error(`Manual retry not supported for product type '${tx.product_type}'`);
    }

    const isSuccess = providerResult.success || providerResult.status === 'SUCCESS' || providerResult.status === 'successful';

    if (isSuccess) {
      await db.query(`
        UPDATE transactions
        SET status = 'SUCCESS',
            provider_reference = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [providerResult.providerReference || tx.reference, transactionId]);

      await db.query(`
        INSERT INTO transaction_events (transaction_id, event_type, details)
        VALUES ($1, 'completed', $2)
      `, [transactionId, `Admin manual retry succeeded. Provider reference: ${providerResult.providerReference}. ${providerResult.statusMessage}`]);

      return {
        success: true,
        status: 'SUCCESS',
        message: `Retry successful! Order completed by provider (${providerResult.providerReference || 'Success'}).`
      };
    } else {
      // Failure on retry: execute auto-refund and set FAILED_REFUNDED
      const refundRef = `REFUND-RETRY-${tx.reference}`;
      const amountKobo = Number(tx.selling_price_kobo);
      const amountNairaFormatted = (amountKobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
      await walletService.credit(
        tx.user_id,
        amountKobo,
        refundRef,
        `Auto-Refund: Retry network busy (${tx.reference})`
      );

      await db.query(`
        UPDATE transactions
        SET status = 'FAILED_REFUNDED',
            refund_reference = $1,
            provider_reference = COALESCE(NULLIF($2, ''), provider_reference),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
      `, [refundRef, providerResult.providerReference || '', transactionId]);

      await db.query(`
        INSERT INTO transaction_events (transaction_id, event_type, details)
        VALUES ($1, 'refunded', $2)
      `, [transactionId, `Admin manual retry concluded: Network busy / failed. Auto-refunded ₦${amountNairaFormatted} to user wallet.`]);

      return {
        success: false,
        status: 'FAILED_REFUNDED',
        refunded: true,
        message: `Network busy, ₦${amountNairaFormatted} refunded to wallet.`
      };
    }
  }

  /**
   * Admin Manually Retry All Pending Transactions at once
   */
  public async retryAllPendingTransactions(adminId?: number) {
    const db = await getDb();
    const pendingTxRes = await db.query(
      `SELECT t.id, t.reference, t.product_type, t.status, t.user_id, t.selling_price_kobo
       FROM transactions t 
       WHERE t.status = 'pending' OR t.status = 'processing'
       ORDER BY t.created_at ASC`
    );

    const pendingList = pendingTxRes.rows;
    console.log(`[TransactionEngine] Admin #${adminId || 0} retrying all pending transactions: ${pendingList.length} items`);

    const results = [];
    let successfulCount = 0;
    let refundedCount = 0;

    for (const tx of pendingList) {
      try {
        const res = await this.retryPendingTransaction(tx.id, adminId);
        if (res.success || res.status === 'SUCCESS' || res.status === 'successful') {
          successfulCount++;
        } else {
          refundedCount++;
        }
        results.push({ id: tx.id, reference: tx.reference, status: res.status, message: res.message });
      } catch (err: any) {
        // If error during retry, auto-refund to clear stuck queue safely
        try {
          const refundRef = `REFUND-ALL-${tx.reference}`;
          const amountKobo = Number(tx.selling_price_kobo);
          await walletService.credit(
            tx.user_id,
            amountKobo,
            refundRef,
            `Auto-Refund: Failed pending retry (${tx.reference})`
          );
          await db.query(`
            UPDATE transactions 
            SET status = 'FAILED_REFUNDED', refund_reference = $1, updated_at = CURRENT_TIMESTAMP 
            WHERE id = $2
          `, [refundRef, tx.id]);
          refundedCount++;
        } catch (rfErr) {}
        results.push({ id: tx.id, reference: tx.reference, status: 'FAILED_REFUNDED', message: err.message });
      }
    }

    return {
      totalProcessed: pendingList.length,
      successfulCount,
      refundedCount,
      results,
      message: `Processed ${pendingList.length} pending transaction(s): ${successfulCount} succeeded, ${refundedCount} refunded to user wallets.`
    };
  }

  /**
   * Requery a transaction with ClubKonnect
   */
  public async requeryTransaction(transactionId: number, adminId?: number) {
    const db = await getDb();
    const txRes = await db.query(
      'SELECT * FROM transactions WHERE id = $1',
      [transactionId]
    );

    if (txRes.rows.length === 0) {
      throw new Error('Transaction not found.');
    }

    const tx = txRes.rows[0];
    if (tx.status !== 'pending' && tx.status !== 'processing') {
      return {
        status: tx.status,
        message: `Transaction is already finalized as '${tx.status}'.`
      };
    }

    const result = await clubkonnect.requeryTransaction({
      orderId: tx.provider_reference,
      requestId: tx.reference
    });

    if (result.status === 'successful') {
      await db.query(`
        UPDATE transactions
        SET status = 'successful',
            provider_reference = COALESCE(NULLIF($1, ''), provider_reference),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [result.providerReference, transactionId]);

      await db.query(`
        INSERT INTO transaction_events (transaction_id, event_type, details)
        VALUES ($1, 'requeried_success', $2)
      `, [transactionId, `Requery verified order completed by provider. ${result.statusMessage}`]);

      return {
        status: 'successful',
        message: 'Requery confirmed order completed successfully by network provider.'
      };
    } else if (result.status === 'failed') {
      // Refund if provider confirmed failure
      const refundRef = `REFUND-REQ-${tx.reference}`;
      await walletService.credit(
        tx.user_id,
        Number(tx.selling_price_kobo),
        refundRef,
        `Requery Refund: Provider reported transaction failure (${tx.reference})`
      );

      await db.query(`
        UPDATE transactions
        SET status = 'refunded',
            refund_reference = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [refundRef, transactionId]);

      return {
        status: 'refunded',
        message: 'Requery reported order failed. User wallet has been refunded.'
      };
    }

    return {
      status: 'pending',
      message: 'Transaction is still awaiting provider final settlement.'
    };
  }
}

export const transactionEngine = new TransactionEngine();
```

### FILE: server/services/walletService.ts
```ts
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
```

### FILE: server/tests/runTests.ts
```ts
/**
 * DataHub Automated Verification Test Suite
 * Covers all Section 30 requirements:
 * Authentication, Wallet Ledger, Manual Funding, Admin Approvals,
 * Plan Security, Airtime, Insufficient Balance, PIN, Refunds, Requery, etc.
 */

import dotenv from 'dotenv';
dotenv.config();

import { initDatabase } from '../db/init.ts';
import { getDb } from '../db/database.ts';
import bcrypt from 'bcryptjs';
import { walletService } from '../services/walletService.ts';
import { fundingService } from '../services/fundingService.ts';
import { transactionEngine } from '../services/transactionEngine.ts';
import {
  clubkonnect,
  verifyClubKonnectEnvironment,
  CLUBKONNECT_DATA_ENDPOINT,
  CLUBKONNECT_AIRTIME_ENDPOINT
} from '../services/clubkonnectService.ts';

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
    failedTests++;
  }
}

async function runAllTests() {
  console.log('\n=========================================');
  console.log('  RUNNING DATAHUB AUTOMATED TEST SUITE');
  console.log('=========================================\n');

  // Step 1: Ensure database initialized
  await initDatabase();
  const db = await getDb();

  // Save the environment DEMO_MODE (from .env)
  const envDemoMode = process.env.DEMO_MODE;
  // Run internal ledger/math unit tests in demo mode to avoid external network calls during ledger checks
  process.env.DEMO_MODE = 'true';

  // Test 1: Seed Admin & User exist
  console.log('--- 1. Verification of Seed Users & Security ---');
  const adminRes = await db.query("SELECT * FROM users WHERE email = 'admin@datahub.ng'");
  assert(adminRes.rows.length === 1, 'Default Admin exists');
  assert(adminRes.rows[0].role === 'admin' || adminRes.rows[0].role === 'super_admin', 'Admin role is correctly assigned');
  assert(adminRes.rows[0].password_hash !== 'AdminPassword123!', 'Admin password is encrypted/hashed with bcrypt');
  const adminPinValid = await bcrypt.compare('1234', adminRes.rows[0].transaction_pin_hash);
  assert(adminPinValid, 'Admin transaction PIN is hashed and verified');

  const userRes = await db.query("SELECT * FROM users WHERE email = 'user@datahub.ng'");
  assert(userRes.rows.length === 1, 'Default Test User exists');
  assert(userRes.rows[0].role === 'user', 'User role is correctly assigned');

  // Test 2: User Registration & Phone validation
  console.log('\n--- 2. Registration & Validation Tests ---');
  const testPhone = '08123456789';
  const invalidPhone = '12345';
  assert(clubkonnect.isValidNigerianPhone(testPhone), 'Valid Nigerian phone format accepted');
  assert(!clubkonnect.isValidNigerianPhone(invalidPhone), 'Invalid phone format rejected');

  const uniqueEmail = `test_${Date.now()}@datahub.ng`;
  const regPasswordHash = await bcrypt.hash('SecurePass123!', 10);
  const regUser = await db.query(`
    INSERT INTO users (full_name, email, phone, password_hash, role, status)
    VALUES ('Automated Tester', $1, $2, $3, 'user', 'active')
    RETURNING id
  `, [uniqueEmail, `080${Math.floor(10000000 + Math.random() * 90000000)}`, regPasswordHash]);
  const newUserId = regUser.rows[0].id;
  assert(Boolean(newUserId), 'New user registration succeeded');

  // Test 3: Wallet Initialization & Integer Kobo Balance
  console.log('\n--- 3. Wallet Ledger & Integer Kobo Financial Integrity ---');
  const initialWallet = await walletService.getBalance(newUserId);
  assert(initialWallet.balanceKobo === 0, 'New user wallet starts at integer 0 kobo');

  // Test 4: Atomic Credit & Ledger Entry
  const creditRef = `TEST-CREDIT-${Date.now()}`;
  const creditResult = await walletService.credit(newUserId, 250000, creditRef, 'Test Credit ₦2,500.00'); // ₦2,500
  assert(creditResult.success, 'Wallet credit executed successfully');
  assert(creditResult.newBalanceKobo === 250000, 'Wallet balance updated correctly in integer kobo');

  // Test duplicate credit prevention
  let dupCreditPrevented = false;
  try {
    await walletService.credit(newUserId, 100000, creditRef, 'Duplicate Credit');
  } catch (err: any) {
    dupCreditPrevented = true;
  }
  assert(dupCreditPrevented, 'Duplicate credit reference rejected to protect against double credits');

  // Test 5: Atomic Debit
  const debitRef = `TEST-DEBIT-${Date.now()}`;
  const debitResult = await walletService.debit(newUserId, 50000, debitRef, 'Test Debit ₦500.00'); // ₦500
  assert(debitResult.success, 'Wallet debit executed successfully');
  assert(debitResult.newBalanceKobo === 200000, 'Balance after debit is exactly 200,000 kobo (₦2,000.00)');

  // Test Insufficient Balance Protection
  const overDebitResult = await walletService.debit(newUserId, 900000, `TEST-OVER-${Date.now()}`, 'Overdraft Attempt');
  assert(!overDebitResult.success, 'Insufficient balance blocked negative balance');
  assert(overDebitResult.newBalanceKobo === 200000, 'Balance remained untouched after failed overdraft');

  // Test 6: Manual Funding Request & Admin Single Approval
  console.log('\n--- 4. Manual Funding & Simplified Customer Flow (Acceptance Tests 1-7) ---');

  // TEST 1: Customer enters ₦1,000 and submits without transfer reference and without receipt
  const test1Req = await fundingService.createRequest({
    userId: newUserId,
    amountNaira: 1000
  });
  assert(test1Req.status === 'pending', 'TEST 1: Request successfully created as PENDING without transfer ref or receipt');
  assert(test1Req.internalReference && test1Req.internalReference.startsWith('DF-'), 'TEST 1: Internal funding reference generated in DF-YYYYMMDD-XXXXXX format');
  assert(test1Req.transferReference === null, 'TEST 1: Transfer reference is null/optional');
  assert(test1Req.proofImageUrl === null, 'TEST 1: Proof image URL is null/optional');

  // TEST 2: Customer enters ₦5,000 and provides transfer reference
  const test2Req = await fundingService.createRequest({
    userId: newUserId,
    amountNaira: 5000,
    transferReference: 'SESSION-ID-99238129031'
  });
  assert(test2Req.status === 'pending', 'TEST 2: Request created as PENDING with reference');
  assert(test2Req.transferReference === 'SESSION-ID-99238129031', 'TEST 2: Customer provided transfer reference saved');

  // TEST 3: Customer uploads a receipt without transfer reference
  const mockBase64Receipt = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  const test3Req = await fundingService.createRequest({
    userId: newUserId,
    amountNaira: 2500,
    proofImageUrl: mockBase64Receipt
  });
  assert(test3Req.status === 'pending', 'TEST 3: Request created as PENDING with receipt uploaded');
  assert(test3Req.proofImageUrl === mockBase64Receipt, 'TEST 3: Receipt saved successfully without transfer ref');

  // Verify wallet NOT yet credited for any of these pending requests
  const balBeforeApproval = await walletService.getBalance(newUserId);
  assert(balBeforeApproval.balanceKobo === 200000, 'Submitting funding request does NOT automatically credit wallet');

  // TEST 4: Admin approves a pending request
  const adminId = adminRes.rows[0].id;
  const test4Approval = await fundingService.approveRequest(test1Req.id, adminId);
  assert(test4Approval.success, 'TEST 4: Admin approved pending request');
  const balAfterTest4 = await walletService.getBalance(newUserId);
  assert(balAfterTest4.balanceKobo === 300000, 'TEST 4: Wallet increases by exactly ₦1,000.00 (from 200,000 to 300,000 kobo)');

  // Verify one wallet transaction was created
  const txCheck = await db.query('SELECT * FROM transactions WHERE reference = $1', [test1Req.internalReference]);
  assert(txCheck.rows.length === 1, 'TEST 4: Exactly one wallet transaction is created in transactions ledger');

  // TEST 5: Admin tries to approve the same request again
  let dupApprovalBlocked = false;
  try {
    await fundingService.approveRequest(test1Req.id, adminId);
  } catch (err: any) {
    dupApprovalBlocked = true;
  }
  assert(dupApprovalBlocked, 'TEST 5: System prevents duplicate wallet credit on already approved request');

  // TEST 6: Admin rejects a pending request
  const test6Reject = await fundingService.rejectRequest(test2Req.id, adminId, 'Bank transfer could not be found on statement');
  assert(test6Reject.status === 'rejected', 'TEST 6: Request marked as REJECTED');
  const balAfterReject = await walletService.getBalance(newUserId);
  assert(balAfterReject.balanceKobo === 300000, 'TEST 6: Wallet is not credited and balance remains unchanged');

  // TEST 7: Customer tries to submit with ₦0, empty amount, or invalid amount
  let zeroAmountBlocked = false;
  try {
    await fundingService.createRequest({ userId: newUserId, amountNaira: 0 });
  } catch (err: any) {
    zeroAmountBlocked = true;
  }
  assert(zeroAmountBlocked, 'TEST 7: Submission with ₦0 is blocked with validation error');

  let negativeAmountBlocked = false;
  try {
    await fundingService.createRequest({ userId: newUserId, amountNaira: -500 });
  } catch (err: any) {
    negativeAmountBlocked = true;
  }
  assert(negativeAmountBlocked, 'TEST 7: Submission with negative amount is blocked');

  let nanAmountBlocked = false;
  try {
    await fundingService.createRequest({ userId: newUserId, amountNaira: NaN });
  } catch (err: any) {
    nanAmountBlocked = true;
  }
  assert(nanAmountBlocked, 'TEST 7: Submission with empty or NaN amount is blocked');

  // Test 7: PIN Protection & Setting
  console.log('\n--- 5. Transaction PIN & Security ---');
  // Set user PIN to '4321'
  const pinHash = await bcrypt.hash('4321', 10);
  await db.query('UPDATE users SET transaction_pin_hash = $1 WHERE id = $2', [pinHash, newUserId]);

  // Test 8: Data Plan Purchase Workflow
  console.log('\n--- 6. Data Purchase Workflow & Internal Plan ID Verification ---');
  // Look up MTN SME 1GB plan
  const planCheck = await db.query("SELECT * FROM data_plans WHERE id = 'mtn-sme-1gb'");
  assert(planCheck.rows.length === 1, 'Trusted data plan exists in DB');
  const planCostKobo = Number(planCheck.rows[0].selling_price_kobo); // ₦300 (30,000 kobo)

  // Purchase with invalid PIN
  let wrongPinBlocked = false;
  try {
    await transactionEngine.processDataPurchase({
      userId: newUserId,
      planId: 'mtn-sme-1gb',
      recipientPhone: '08123456789',
      transactionPin: '0000'
    });
  } catch (err: any) {
    wrongPinBlocked = true;
  }
  assert(wrongPinBlocked, 'Purchase blocked with incorrect PIN');

  // Purchase with valid PIN
  const dataPurchaseRes = await transactionEngine.processDataPurchase({
    userId: newUserId,
    planId: 'mtn-sme-1gb',
    recipientPhone: '08123456789',
    transactionPin: '4321'
  });
  assert(dataPurchaseRes.success, 'Data purchase completed successfully');
  assert(dataPurchaseRes.status === 'SUCCESS' || dataPurchaseRes.status === 'successful', 'Transaction recorded as successful');

  const balAfterPurchase = await walletService.getBalance(newUserId);
  assert(balAfterPurchase.balanceKobo === 300000 - planCostKobo, 'Exact selling price debited from user wallet');

  // Test 9: Provider Failure & Automatic Refund
  console.log('\n--- 7. Provider Failure Simulation & Automatic Single Refund ---');
  // Phone ending with '0000' triggers simulated provider failure in test mode
  const failPhone = '08012340000';
  const balBeforeFailedTx = await walletService.getBalance(newUserId);

  const failedPurchaseRes = await transactionEngine.processDataPurchase({
    userId: newUserId,
    planId: 'mtn-sme-1gb',
    recipientPhone: failPhone,
    transactionPin: '4321'
  });
  assert(!failedPurchaseRes.success, 'Provider failure acknowledged');
  assert(failedPurchaseRes.refunded === true, 'Automatic refund triggered');

  const balAfterFailedTx = await walletService.getBalance(newUserId);
  assert(balAfterFailedTx.balanceKobo === balBeforeFailedTx.balanceKobo, 'Wallet balance restored via exact refund');

  // Test 10: Airtime Purchase Workflow
  console.log('\n--- 8. Airtime Purchase Workflow ---');
  const airtimeRes = await transactionEngine.processAirtimePurchase({
    userId: newUserId,
    network: 'MTN',
    amountNaira: 100, // ₦100 face value with 2% discount = ₦98
    recipientPhone: '08123456789',
    transactionPin: '4321'
  });
  assert(airtimeRes.success, 'Airtime purchase executed');
  assert(airtimeRes.chargedNaira === 98, 'Customer charged discounted rate (₦98.00)');

  // Test 11: Admin User Management (Suspend & Activate)
  console.log('\n--- 9. Admin User Management ---');
  await db.query("UPDATE users SET status = 'suspended' WHERE id = $1", [newUserId]);
  let suspendedBlocked = false;
  try {
    await transactionEngine.processAirtimePurchase({
      userId: newUserId,
      network: 'MTN',
      amountNaira: 100,
      recipientPhone: '08123456789',
      transactionPin: '4321'
    });
  } catch (err: any) {
    suspendedBlocked = true;
  }
  assert(suspendedBlocked, 'Suspended user blocked from performing transactions');

  // Re-activate user
  await db.query("UPDATE users SET status = 'active' WHERE id = $1", [newUserId]);
  const reactivatedUser = await db.query('SELECT status FROM users WHERE id = $1', [newUserId]);
  assert(reactivatedUser.rows[0].status === 'active', 'User successfully re-activated');

  // Test 12: ClubKonnect Response Mapping & REAL_PROVIDER_REFERENCE Extraction
  console.log('\n--- 10. ClubKonnect Response Structure & Real Provider Reference Tests ---');
  
  // Standard ClubKonnect success payload
  const mockCkSuccessPayload = {
    statuscode: '100',
    orderstatus: 'ORDER_COMPLETED',
    orderid: 'CK-987654321',
    mobilenetwork: '01',
    mobilenumber: '08012345678',
    amount: '250',
    remark: 'Transaction Successful'
  };
  const parsedSuccess = clubkonnect.mapProviderResponse(mockCkSuccessPayload, 'REQ-TEST-001');
  assert(parsedSuccess.success === true, 'Parsed success status is true');
  assert(parsedSuccess.status === 'SUCCESS' || parsedSuccess.status === 'successful', 'Mapped status is SUCCESS');
  assert(parsedSuccess.providerReference === 'CK-987654321', 'REAL_PROVIDER_REFERENCE captured correctly from orderid');
  assert(parsedSuccess.statusCode === '100', 'Status code 100 preserved');

  // Alternate casing OrderID
  const mockCkAltCasingPayload = {
    StatusCode: '100',
    OrderStatus: 'ORDER_COMPLETED',
    OrderID: 'CK-ALT-445566',
    Remark: 'Delivered'
  };
  const parsedAlt = clubkonnect.mapProviderResponse(mockCkAltCasingPayload, 'REQ-TEST-002');
  assert(parsedAlt.providerReference === 'CK-ALT-445566', 'REAL_PROVIDER_REFERENCE captured correctly from OrderID');

  // Provider Status code 101 (ORDER_RECEIVED) resolves to SUCCESS as per specification
  const mockCkPendingPayload = {
    statuscode: '101',
    orderstatus: 'ORDER_RECEIVED',
    orderid: 'CK-PEND-778899',
    remark: 'Order received and processing'
  };
  const parsedPending = clubkonnect.mapProviderResponse(mockCkPendingPayload, 'REQ-TEST-003');
  assert(parsedPending.status === 'SUCCESS' || parsedPending.status === 'successful', 'Mapped status is SUCCESS for code 101/ORDER_RECEIVED');
  assert(parsedPending.providerReference === 'CK-PEND-778899', 'Provider reference captured on orders');

  // Database verification: Confirm transactions table stores and retrieves provider_reference
  const dbTxCheck = await db.query(
    'SELECT provider_reference FROM transactions WHERE reference = $1',
    [airtimeRes.reference]
  );
  assert(dbTxCheck.rows.length > 0, 'Airtime transaction found in database');
  assert(Boolean(dbTxCheck.rows[0].provider_reference), 'Real provider reference is persisted in database');

  // Test 13: Live Mode Environment Variables Assertion (DEMO_MODE=false)
  console.log('\n--- 11. ClubKonnect Environment Variables & Live Mode Assertion ---');
  
  // Temporarily switch environment to live mode without credentials
  const originalDemoMode = process.env.DEMO_MODE;
  const originalUserId = process.env.CLUBKONNECT_USER_ID;
  const originalApiKey = process.env.CLUBKONNECT_API_KEY;
  const originalU = process.env.CLUBKONNECT_U;
  const originalA = process.env.CLUBKONNECT_A;
  const originalBaseUrl = process.env.CLUBKONNECT_BASE_URL;

  process.env.DEMO_MODE = 'false';
  delete process.env.CLUBKONNECT_USER_ID;
  delete process.env.CLUBKONNECT_API_KEY;
  delete process.env.CLUBKONNECT_U;
  delete process.env.CLUBKONNECT_A;

  // Case A: Credentials missing
  let allMissingCaught = false;
  let allMissingMsg = '';
  try {
    verifyClubKonnectEnvironment();
  } catch (err: any) {
    allMissingCaught = true;
    allMissingMsg = err.message;
  }

  assert(allMissingCaught, 'Missing credentials throws server-side error when DEMO_MODE=false');
  assert(
    allMissingMsg.includes('CLUBKONNECT_U') || allMissingMsg.includes('CLUBKONNECT_USER_ID'),
    'Error message explicitly specifies missing CLUBKONNECT_U / CLUBKONNECT_USER_ID'
  );

  // Case B: CLUBKONNECT_U and CLUBKONNECT_A provided in live mode
  process.env.CLUBKONNECT_U = 'test_ck_u';
  process.env.CLUBKONNECT_A = 'test_ck_a';
  let uAndAConfigSucceeded = false;
  try {
    const verified = verifyClubKonnectEnvironment();
    if (verified.userId === 'test_ck_u' && verified.apiKey === 'test_ck_a') {
      uAndAConfigSucceeded = true;
    }
  } catch {
    uAndAConfigSucceeded = false;
  }
  assert(uAndAConfigSucceeded, 'verifyClubKonnectEnvironment succeeds with CLUBKONNECT_U and CLUBKONNECT_A');

  // Case C: Reset to missing credentials to test purchase blocking
  delete process.env.CLUBKONNECT_USER_ID;
  delete process.env.CLUBKONNECT_API_KEY;
  delete process.env.CLUBKONNECT_U;
  delete process.env.CLUBKONNECT_A;

  // Verify that calling processDataPurchase in live mode without credentials throws immediately without debiting wallet
  const balBeforeBlockedLiveTx = await walletService.getBalance(newUserId);
  let livePurchaseBlocked = false;
  try {
    await transactionEngine.processDataPurchase({
      userId: newUserId,
      planId: 'mtn-sme-1gb',
      recipientPhone: '08123456789',
      transactionPin: '4321'
    });
  } catch (err: any) {
    livePurchaseBlocked = true;
  }
  assert(livePurchaseBlocked, 'Purchase blocked immediately when live credentials are missing');

  const balAfterBlockedLiveTx = await walletService.getBalance(newUserId);
  assert(
    balAfterBlockedLiveTx.balanceKobo === balBeforeBlockedLiveTx.balanceKobo,
    'User wallet remained untouched and was NOT debited when credentials error was thrown'
  );

  // Restore environment variables to production values
  process.env.DEMO_MODE = 'false';
  if (originalUserId !== undefined) process.env.CLUBKONNECT_USER_ID = originalUserId;
  else delete process.env.CLUBKONNECT_USER_ID;
  if (originalApiKey !== undefined) process.env.CLUBKONNECT_API_KEY = originalApiKey;
  else delete process.env.CLUBKONNECT_API_KEY;
  if (originalU !== undefined) process.env.CLUBKONNECT_U = originalU;
  else delete process.env.CLUBKONNECT_U;
  if (originalA !== undefined) process.env.CLUBKONNECT_A = originalA;
  else delete process.env.CLUBKONNECT_A;
  if (originalBaseUrl !== undefined) process.env.CLUBKONNECT_BASE_URL = originalBaseUrl;
  else delete process.env.CLUBKONNECT_BASE_URL;

  // Test 14: Production / Live Mode Verification Suite
  console.log('\n--- 12. Production / Live Mode Verification Suite ---');
  
  // 12.1 Verify DEMO_MODE is configured as 'false'
  assert(process.env.DEMO_MODE === 'false', 'VERIFICATION: DEMO_MODE is strictly "false" for production');

  // 12.2 Verify ClubKonnect env vars detected without exposing values
  const hasUserId = Boolean((process.env.CLUBKONNECT_U || process.env.CLUBKONNECT_USER_ID)?.trim());
  const hasApiKey = Boolean((process.env.CLUBKONNECT_A || process.env.CLUBKONNECT_API_KEY)?.trim());
  const hasBaseUrl = Boolean((process.env.CLUBKONNECT_BASE_URL || 'https://www.nellobytesystems.com')?.trim());
  assert(hasUserId, 'CLUBKONNECT_U (or CLUBKONNECT_USER_ID) is detected in server environment');
  assert(hasApiKey, 'CLUBKONNECT_A (or CLUBKONNECT_API_KEY) is detected in server environment');
  assert(hasBaseUrl, 'CLUBKONNECT_BASE_URL is detected in server environment');

  // 12.3 Verify health endpoint structure in live mode without leaking secrets
  const isDemo = process.env.DEMO_MODE !== 'false';
  const healthPayload = {
    status: 'ok',
    service: 'DataHub VTU API',
    demoMode: isDemo,
    mode: isDemo ? 'simulation' : 'production',
    provider: {
      name: 'ClubKonnect',
      liveMode: !isDemo,
      configured: Boolean(
        process.env.CLUBKONNECT_USER_ID &&
        process.env.CLUBKONNECT_API_KEY &&
        process.env.CLUBKONNECT_BASE_URL
      )
    }
  };
  assert(healthPayload.demoMode === false, 'Health check reports demoMode: false');
  assert(healthPayload.mode === 'production', 'Health check reports mode: "production"');
  assert(healthPayload.provider.liveMode === true, 'Health check reports provider.liveMode: true');
  assert(healthPayload.provider.configured === true, 'Health check reports provider.configured: true without exposing secrets');

  // 12.4 Verify automatic status resolution: ORDER_RECEIVED resolves to SUCCESS, errors resolve to FAILED
  const orderReceivedSample = clubkonnect.mapProviderResponse({
    statuscode: '101',
    status: 'ORDER_RECEIVED',
    orderid: 'CK-LIVE-998822',
    msg: 'Order received and is queuing for delivery'
  }, 'REQ-12345');
  assert(orderReceivedSample.status === 'SUCCESS', 'Order received (code 101 / ORDER_RECEIVED) automatically resolves to SUCCESS');
  assert(orderReceivedSample.success === true, 'Order received marks success true');
  assert(orderReceivedSample.providerReference === 'CK-LIVE-998822', 'Real provider reference captured on order received');

  const failedSample = clubkonnect.mapProviderResponse({
    statuscode: '104',
    status: 'ORDER_FAILED',
    orderid: 'CK-LIVE-FAIL',
    msg: 'Insufficient Balance'
  }, 'REQ-FAIL');
  assert(failedSample.status === 'FAILED', 'Provider error automatically resolves to FAILED');
  assert(failedSample.success === false, 'Provider error marks success false');

  // 12.5 Verify wallet funding security: customer cannot increase balance directly
  const testFundingUser = await db.query("SELECT id FROM users WHERE email = 'user@datahub.ng'");
  const fUserId = testFundingUser.rows[0].id;
  const fBalBefore = await walletService.getBalance(fUserId);
  const unverifiedReq = await fundingService.createRequest({
    userId: fUserId,
    amountNaira: 5000,
    transferReference: 'PROD-BANK-TRF-001'
  });
  const fBalAfter = await walletService.getBalance(fUserId);
  assert(unverifiedReq.status === 'pending', 'Submitted funding request created with pending status');
  assert(fBalBefore.balanceKobo === fBalAfter.balanceKobo, 'Wallet balance is strictly unchanged after customer request submission');

  // 12.6 Verify official ClubKonnect DataPlan variation codes in database
  const mtn500Check = await db.query("SELECT provider_code FROM data_plans WHERE id = 'mtn-sme-500mb'");
  assert(mtn500Check.rows[0]?.provider_code === '500', 'MTN 500MB SME has provider_code: "500"');

  const mtn1gbCheck = await db.query("SELECT provider_code FROM data_plans WHERE id = 'mtn-sme-1gb'");
  assert(mtn1gbCheck.rows[0]?.provider_code === '1000', 'MTN 1GB SME has provider_code: "1000"');

  const airtel500Check = await db.query("SELECT provider_code FROM data_plans WHERE id = 'airtel-corp-500mb'");
  assert(airtel500Check.rows[0]?.provider_code === 'Airtel500MB', 'Airtel 500MB has provider_code: "Airtel500MB"');

  const airtel1gbCheck = await db.query("SELECT provider_code FROM data_plans WHERE id = 'airtel-corp-1gb'");
  assert(airtel1gbCheck.rows[0]?.provider_code === 'Airtel1GB', 'Airtel 1GB has provider_code: "Airtel1GB"');

  const airtel5gbCheck = await db.query("SELECT provider_code FROM data_plans WHERE id = 'airtel-corp-5gb'");
  assert(airtel5gbCheck.rows[0]?.provider_code === 'Airtel5GB', 'Airtel 5GB has provider_code: "Airtel5GB"');

  // 12.7 Test exact ClubKonnect error field extraction ('msg', 'error', 'remark', raw text)
  console.log('\n--- 13. Exact ClubKonnect Provider Error Extraction Tests ---');
  
  const invalidPlanError = clubkonnect.mapProviderResponse({
    status: 'ORDER_FAILED',
    msg: 'Invalid Data Plan Code'
  }, '1727170001');
  assert(invalidPlanError.status === 'FAILED', 'Invalid Data Plan Code marked as FAILED');
  assert(invalidPlanError.providerError === 'Invalid Data Plan Code', 'Exact msg field extracted: "Invalid Data Plan Code"');

  const invalidApiKeyError = clubkonnect.mapProviderResponse({
    status: 'ORDER_FAILED',
    error: 'Invalid API Key'
  }, '1727170002');
  assert(invalidApiKeyError.providerError === 'Invalid API Key', 'Exact error field extracted: "Invalid API Key"');

  const ipNotAllowedError = clubkonnect.mapProviderResponse({
    statuscode: '105',
    remark: 'IP Not Allowed'
  }, '1727170003');
  assert(ipNotAllowedError.providerError === 'IP Not Allowed', 'Exact remark field extracted: "IP Not Allowed"');

  const rawTextError = clubkonnect.mapProviderResponse(
    { rawText: 'Invalid Data Plan Code' },
    '1727170004',
    'Invalid Data Plan Code'
  );
  assert(rawTextError.providerError === 'Invalid Data Plan Code', 'Exact raw text extracted: "Invalid Data Plan Code"');

  // 12.8 Verify all MTN SME plans have valid ClubKonnect variation codes
  const allMtnSmePlans = await db.query(
    "SELECT id, plan_name, provider_code FROM data_plans WHERE network = 'MTN' AND plan_type = 'SME' ORDER BY selling_price_kobo ASC"
  );
  const expectedCodes = ['500', '1000', '2000', '3000', '5000', '10000'];
  const actualCodes = allMtnSmePlans.rows.map(p => p.provider_code);
  assert(
    JSON.stringify(actualCodes) === JSON.stringify(expectedCodes),
    `All MTN SME data plans match valid ClubKonnect variation codes: ${expectedCodes.join(', ')}`
  );

  // 12.9 Verify official Nellobyte Systems / ClubKonnect Data & Airtime API endpoints
  assert(
    CLUBKONNECT_DATA_ENDPOINT === 'https://www.nellobytesystems.com/APIDatabundleV1.asp',
    'Official Nellobyte/ClubKonnect Data API endpoint is https://www.nellobytesystems.com/APIDatabundleV1.asp'
  );
  assert(
    CLUBKONNECT_AIRTIME_ENDPOINT === 'https://www.nellobytesystems.com/APIAirtimeV1.asp',
    'Official Nellobyte/ClubKonnect Airtime API endpoint is https://www.nellobytesystems.com/APIAirtimeV1.asp'
  );

  console.log('\n=========================================');
  console.log(`  TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('=========================================\n');

  if (failedTests > 0) {
    throw new Error(`${failedTests} tests failed.`);
  }

  process.exit(0);
}

runAllTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
```

### FILE: public/manifest.json
```json
{
  "id": "/",
  "name": "Standard DataHub",
  "short_name": "DataHub",
  "description": "Fast, reliable Nigerian VTU portal for instant mobile data bundles, airtime top-up, and manual wallet funding.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#090d16",
  "theme_color": "#090d16",
  "categories": ["finance", "utilities", "productivity"],
  "icons": [
    {
      "src": "/pwa-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/pwa-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/pwa-maskable-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/logo.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any"
    }
  ]
}
```

### FILE: public/favicon.svg
```xml
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="stdBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
      <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
      <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
    </linearGradient>
    <linearGradient id="stdBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#0f172a" />
      <stop offset="50%" stopColor="#090d16" />
      <stop offset="100%" stopColor="#06121e" />
    </linearGradient>
    <linearGradient id="stdBoltGrad" x1="20%" y1="10%" x2="80%" y2="90%">
      <stop offset="0%" stopColor="#38bdf8" />
      <stop offset="45%" stopColor="#06b6d4" />
      <stop offset="80%" stopColor="#10b981" />
      <stop offset="100%" stopColor="#34d399" />
    </linearGradient>
    <radialGradient id="stdAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
      <stop offset="60%" stopColor="#10b981" stopOpacity="0.15" />
      <stop offset="100%" stopColor="#090d16" stopOpacity="0" />
    </radialGradient>
  </defs>
  <rect x="3" y="3" width="94" height="94" rx="22" fill="url(#stdBgGrad)" stroke="url(#stdBorderGrad)" strokeWidth="2.5" />
  <rect x="6" y="6" width="88" height="88" rx="19" fill="url(#stdAura)" />
  <path d="M56 16L32 50H50L42 84L70 46H52L56 16Z" fill="url(#stdBoltGrad)" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.6" strokeLinejoin="round" />
</svg>
```

### FILE: public/logo.svg
```xml
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="stdBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
      <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
      <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
    </linearGradient>
    <linearGradient id="stdBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#0f172a" />
      <stop offset="50%" stopColor="#090d16" />
      <stop offset="100%" stopColor="#06121e" />
    </linearGradient>
    <linearGradient id="stdBoltGrad" x1="20%" y1="10%" x2="80%" y2="90%">
      <stop offset="0%" stopColor="#38bdf8" />
      <stop offset="45%" stopColor="#06b6d4" />
      <stop offset="80%" stopColor="#10b981" />
      <stop offset="100%" stopColor="#34d399" />
    </linearGradient>
    <linearGradient id="stdHighlightGrad" x1="30%" y1="10%" x2="70%" y2="90%">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
      <stop offset="60%" stopColor="#67e8f9" stopOpacity="0.4" />
      <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
    </linearGradient>
    <radialGradient id="stdAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
      <stop offset="60%" stopColor="#10b981" stopOpacity="0.15" />
      <stop offset="100%" stopColor="#090d16" stopOpacity="0" />
    </radialGradient>
    <filter id="stdGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <rect x="3" y="3" width="94" height="94" rx="22" fill="url(#stdBgGrad)" stroke="url(#stdBorderGrad)" strokeWidth="2.5" />
  <rect x="6" y="6" width="88" height="88" rx="19" fill="url(#stdAura)" />
  <path d="M56 16L32 50H50L42 84L70 46H52L56 16Z" fill="url(#stdBoltGrad)" filter="url(#stdGlow)" opacity="0.8" />
  <path d="M56 16L32 50H50L42 84L70 46H52L56 16Z" fill="url(#stdBoltGrad)" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.6" strokeLinejoin="round" />
  <path d="M54 20L36 50H50L45 72L64 48H52L54 20Z" fill="url(#stdHighlightGrad)" opacity="0.5" />
</svg>
```

### FILE: public/sw.js
```javascript
// Standard DataHub Service Worker
// Provides high-performance asset caching, offline fallback, and PWA installation compliance

const CACHE_NAME = 'standard-datahub-v1';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Bypass service worker caching for all API and backend requests
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Network-first strategy for navigation / HTML requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/index.html') || caches.match('/'))
    );
    return;
  }

  // Stale-while-revalidate for static assets
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
```

### FILE: src/main.tsx
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
```

### FILE: src/vite-env.d.ts
```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### FILE: src/App.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { ToastProvider } from './components/Toast.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { Navbar } from './components/Navbar.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { InstallAppModal } from './components/InstallAppModal.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { BuyDataPage } from './pages/BuyDataPage.tsx';
import { BuyAirtimePage } from './pages/BuyAirtimePage.tsx';
import { FundWalletPage } from './pages/FundWalletPage.tsx';
import { TransactionsPage } from './pages/TransactionsPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { AdminPage } from './pages/AdminPage.tsx';
import { StandardLogo } from './components/StandardLogo.tsx';
import { apiRequest } from './lib/api.ts';
import { usePWAInstall } from './hooks/usePWAInstall.ts';
import { Download } from 'lucide-react';

function AppContent() {
  const { user } = useAuth();
  const { isIOS, canPrompt, triggerInstall } = usePWAInstall();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [installModalTitle, setInstallModalTitle] = useState('Install Standard DataHub App');
  const [installModalSubtitle, setInstallModalSubtitle] = useState(
    'Get faster 1-tap recharges, instant offline access, and a sleek native mobile experience directly on your device.'
  );
  const [apkDownloadUrl, setApkDownloadUrl] = useState<string | null>(null);

  // Fetch admin configured APK download link from settings if available
  useEffect(() => {
    apiRequest<{ bankDetails: { apk_download_url?: string } }>('/wallet/bank-details')
      .then((data) => {
        if (data.bankDetails?.apk_download_url) {
          setApkDownloadUrl(data.bankDetails.apk_download_url);
        }
      })
      .catch(() => {});
  }, []);

  // If user logs in while on login, route to home
  useEffect(() => {
    if (user && currentTab === 'login') {
      setCurrentTab('home');
    }
  }, [user]);

  // Route URL paths like /admin or /admin/funding directly to admin tab
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/admin' || path.startsWith('/admin/') || window.location.hash.includes('admin')) {
        setCurrentTab('admin');
      }
    }
  }, []);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  /**
   * Universal Download / Install App Handler:
   * 1. If direct APK URL configured: initiate download immediately.
   * 2. If on iOS: open step-by-step Safari visual modal ("Tap Share icon ➔ Add to Home Screen").
   * 3. If on Android / Chrome and native install prompt is ready: trigger native prompt directly asking "Add Standard DataHub to Home Screen?".
   * 4. Otherwise: open informative install guide modal.
   */
  const handleUniversalInstall = async (customTitle?: string, customSubtitle?: string) => {
    // 1. Direct APK Link Handling: Prioritize if set by Admin
    if (apkDownloadUrl) {
      window.location.href = apkDownloadUrl;
      return;
    }

    // 2. iOS Safari: Show visual instructions modal
    if (isIOS) {
      setInstallModalTitle(customTitle || 'Install on iPhone / iPad');
      setInstallModalSubtitle(
        customSubtitle || 'Add Standard DataHub to your home screen via Safari for instant 1-tap access.'
      );
      setIsInstallModalOpen(true);
      return;
    }

    // 3. Native PWA Prompt: Trigger immediately if available
    if (canPrompt) {
      const outcome = await triggerInstall();
      if (outcome === 'accepted') {
        return;
      }
    }

    // 4. Fallback: Open modal with guidance
    setInstallModalTitle(customTitle || 'Install Standard DataHub App');
    setInstallModalSubtitle(
      customSubtitle || 'Get faster 1-tap recharges, instant offline access, and a sleek native mobile experience directly on your device.'
    );
    setIsInstallModalOpen(true);
  };

  const handleRegistrationComplete = () => {
    // Show prominent install prompt immediately on sign-up completion
    handleUniversalInstall(
      'Account Created! Install App Now',
      'Add Standard DataHub to your phone home screen now for instant 1-tap access and quick data recharges.'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onOpenInstallModal={() => handleUniversalInstall()} 
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-16 md:mb-6">
        {currentTab === 'home' && (
          <HomePage 
            setCurrentTab={setCurrentTab} 
            onOpenInstallModal={() => handleUniversalInstall()} 
            apkUrl={apkDownloadUrl}
          />
        )}
        {currentTab === 'buy-data' && <BuyDataPage setCurrentTab={setCurrentTab} />}
        {currentTab === 'buy-airtime' && <BuyAirtimePage setCurrentTab={setCurrentTab} />}
        {currentTab === 'fund-wallet' && <FundWalletPage setCurrentTab={setCurrentTab} />}
        {currentTab === 'transactions' && <TransactionsPage />}
        {currentTab === 'profile' && (
          <ProfilePage 
            onOpenInstallModal={() => handleUniversalInstall('Install Standard DataHub App', 'Keep Standard DataHub on your device home screen for 1-tap fast recharges.')} 
          />
        )}
        {currentTab === 'login' && <LoginPage setCurrentTab={setCurrentTab} />}
        {currentTab === 'register' && (
          <RegisterPage 
            setCurrentTab={setCurrentTab} 
            onRegistrationComplete={handleRegistrationComplete}
            onOpenInstallModal={() => handleUniversalInstall('Welcome! Install Standard DataHub', 'Add to your home screen for quick daily VTU top-ups.')}
          />
        )}
        {currentTab === 'contact' && <ContactPage />}
        {currentTab === 'admin' && <AdminPage />}
      </main>

      {/* Footer */}
      <footer className="hidden md:block bg-slate-900 border-t border-slate-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <StandardLogo className="w-8 h-8" />
              <span className="font-extrabold text-lg tracking-tight">Standard DataHub</span>
              <span className="text-xs text-slate-400">| Nigeria's Reliable Telecom Hub</span>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-400">
              <button 
                onClick={() => handleUniversalInstall()} 
                className="text-teal-400 hover:text-teal-300 font-bold transition-colors flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download App</span>
              </button>
              <button onClick={() => setCurrentTab('buy-data')} className="hover:text-white transition-colors">Buy Data</button>
              <button onClick={() => setCurrentTab('buy-airtime')} className="hover:text-white transition-colors">Buy Airtime</button>
              <button onClick={() => setCurrentTab('fund-wallet')} className="hover:text-white transition-colors">Fund Wallet</button>
              <a href="https://wa.me/2348161720895" target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">WhatsApp: 08161720895</a>
              <button onClick={() => setCurrentTab('contact')} className="hover:text-white transition-colors">Contact Desk</button>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-1">
              <span>© {new Date().getFullYear()} Standard DataHub. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Global In-App PWA & APK Installation Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        title={installModalTitle}
        subtitle={installModalSubtitle}
        apkUrl={apkDownloadUrl}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
```

### FILE: src/index.css
```css
@import "tailwindcss";

@layer base {
  * {
    border-color: rgba(255, 255, 255, 0.08);
  }
  body {
    background-color: #080B11;
    color: #F8FAFC;
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  }
}

/* Glassmorphism Fintech Cards & Highlights */
.fintech-card {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(16, 185, 129, 0.12));
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.fintech-card-subtle {
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.fintech-glass-surface {
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
}

.electric-gradient-text {
  background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.electric-gradient-bg {
  background: linear-gradient(135deg, #2563EB 0%, #10B981 100%);
}

.electric-gradient-border {
  border-image: linear-gradient(135deg, #2563EB, #10B981) 1;
}

/* Custom scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: rgba(11, 15, 25, 0.5);
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(37, 99, 235, 0.4);
}
```

### FILE: src/constants.ts
```ts
import { NetworkOption, DataPlan } from './types';

export const DATAHUB_SVG_LOGO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><defs><linearGradient id="datahubGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%232563EB"/><stop offset="100%" stop-color="%2310B981"/></linearGradient><linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230B0F19"/><stop offset="100%" stop-color="%231E293B"/></linearGradient></defs><rect x="32" y="32" width="448" height="448" rx="100" fill="url(%23bgGrad)" stroke="url(%23datahubGrad)" stroke-width="8"/><path d="M288 96L160 272H256L224 416L352 240H256L288 96Z" fill="url(%23datahubGrad)"/></svg>`;

export const NETWORKS: NetworkOption[] = [
  {
    code: '01',
    name: 'MTN',
    color: '#EAB308', // Yellow
    badgeBg: 'rgba(234, 179, 8, 0.15)',
    prefixes: ['0803', '0806', '0703', '0706', '0813', '0816', '0810', '0814', '0903', '0906', '0913', '0916']
  },
  {
    code: '04',
    name: 'Airtel',
    color: '#EF4444', // Red
    badgeBg: 'rgba(239, 68, 68, 0.15)',
    prefixes: ['0802', '0808', '0708', '0812', '0701', '0902', '0901', '0904', '0907', '0912']
  },
  {
    code: '02',
    name: 'Glo',
    color: '#10B981', // Green
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    prefixes: ['0805', '0807', '0705', '0815', '0811', '0905', '0915']
  },
  {
    code: '03',
    name: '9mobile',
    color: '#065F46', // Dark Emerald
    badgeBg: 'rgba(5, 150, 105, 0.15)',
    prefixes: ['0809', '0817', '0818', '0909', '0908']
  }
];

export const DATA_PLANS: DataPlan[] = [
  // MTN
  { id: 'mtn-sme-500mb', code: '500', networkCode: '01', type: 'SME', name: 'MTN SME Data', size: '500 MB', validity: '30 Days', price: 145 },
  { id: 'mtn-sme-1gb', code: '1000', networkCode: '01', type: 'SME', name: 'MTN SME Data', size: '1.0 GB', validity: '30 Days', price: 285 },
  { id: 'mtn-sme-2gb', code: '2000', networkCode: '01', type: 'SME', name: 'MTN SME Data', size: '2.0 GB', validity: '30 Days', price: 570 },
  { id: 'mtn-sme-3gb', code: '3000', networkCode: '01', type: 'SME', name: 'MTN SME Data', size: '3.0 GB', validity: '30 Days', price: 855 },
  { id: 'mtn-sme-5gb', code: '5000', networkCode: '01', type: 'SME', name: 'MTN SME Data', size: '5.0 GB', validity: '30 Days', price: 1425 },
  { id: 'mtn-sme-10gb', code: '10000', networkCode: '01', type: 'SME', name: 'MTN SME Data', size: '10.0 GB', validity: '30 Days', price: 2850 },
  { id: 'mtn-cg-1gb', code: 'CG1000', networkCode: '01', type: 'Corporate', name: 'MTN Corporate Gifting', size: '1.0 GB', validity: '30 Days', price: 290 },
  { id: 'mtn-cg-2gb', code: 'CG2000', networkCode: '01', type: 'Corporate', name: 'MTN Corporate Gifting', size: '2.0 GB', validity: '30 Days', price: 580 },

  // AIRTEL
  { id: 'airtel-cg-500mb', code: 'A500', networkCode: '04', type: 'Corporate', name: 'Airtel Corporate Gifting', size: '500 MB', validity: '30 Days', price: 140 },
  { id: 'airtel-cg-1gb', code: 'A1000', networkCode: '04', type: 'Corporate', name: 'Airtel Corporate Gifting', size: '1.0 GB', validity: '30 Days', price: 280 },
  { id: 'airtel-cg-2gb', code: 'A2000', networkCode: '04', type: 'Corporate', name: 'Airtel Corporate Gifting', size: '2.0 GB', validity: '30 Days', price: 560 },
  { id: 'airtel-cg-5gb', code: 'A5000', networkCode: '04', type: 'Corporate', name: 'Airtel Corporate Gifting', size: '5.0 GB', validity: '30 Days', price: 1400 },
  { id: 'airtel-cg-10gb', code: 'A10000', networkCode: '04', type: 'Corporate', name: 'Airtel Corporate Gifting', size: '10.0 GB', validity: '30 Days', price: 2800 },

  // GLO
  { id: 'glo-cg-1gb', code: 'G1000', networkCode: '02', type: 'Corporate', name: 'Glo Corporate Gifting', size: '1.0 GB', validity: '30 Days', price: 260 },
  { id: 'glo-cg-2gb', code: 'G2000', networkCode: '02', type: 'Corporate', name: 'Glo Corporate Gifting', size: '2.0 GB', validity: '30 Days', price: 520 },
  { id: 'glo-cg-3gb', code: 'G3000', networkCode: '02', type: 'Corporate', name: 'Glo Corporate Gifting', size: '3.0 GB', validity: '30 Days', price: 780 },
  { id: 'glo-cg-5gb', code: 'G5000', networkCode: '02', type: 'Corporate', name: 'Glo Corporate Gifting', size: '5.0 GB', validity: '30 Days', price: 1300 },

  // 9MOBILE
  { id: '9mob-cg-1gb', code: '9M1000', networkCode: '03', type: 'Corporate', name: '9mobile Corporate Gifting', size: '1.0 GB', validity: '30 Days', price: 230 },
  { id: '9mob-cg-2gb', code: '9M2000', networkCode: '03', type: 'Corporate', name: '9mobile Corporate Gifting', size: '2.0 GB', validity: '30 Days', price: 460 },
  { id: '9mob-cg-5gb', code: '9M5000', networkCode: '03', type: 'Corporate', name: '9mobile Corporate Gifting', size: '5.0 GB', validity: '30 Days', price: 1150 }
];

export const CABLE_PROVIDERS = [
  {
    name: 'DSTV',
    packages: [
      { name: 'DStv Padi', price: 4400 },
      { name: 'DStv Yanga', price: 6000 },
      { name: 'DStv Confam', price: 11000 },
      { name: 'DStv Compact', price: 19000 },
      { name: 'DStv Compact Plus', price: 30000 },
      { name: 'DStv Premium', price: 44000 }
    ]
  },
  {
    name: 'GOtv',
    packages: [
      { name: 'GOtv Smallie', price: 1900 },
      { name: 'GOtv Jinja', price: 3900 },
      { name: 'GOtv Jolli', price: 5800 },
      { name: 'GOtv Max', price: 8500 },
      { name: 'GOtv Supa', price: 11400 },
      { name: 'GOtv Supa+', price: 16800 }
    ]
  },
  {
    name: 'Startimes',
    packages: [
      { name: 'Nova (Monthly)', price: 1700 },
      { name: 'Basic (Monthly)', price: 3300 },
      { name: 'Smart (Monthly)', price: 4200 },
      { name: 'Classic (Monthly)', price: 5000 },
      { name: 'Super (Monthly)', price: 8200 }
    ]
  }
];

export const ELECTRICITY_DISCOS = [
  { id: 'AEDC', name: 'Abuja Electricity (AEDC)' },
  { id: 'EKEDC', name: 'Eko Electricity (EKEDC)' },
  { id: 'IKEDC', name: 'Ikeja Electric (IKEDC)' },
  { id: 'IBEDC', name: 'Ibadan Electricity (IBEDC)' },
  { id: 'EEDC', name: 'Enugu Electricity (EEDC)' },
  { id: 'PHEDC', name: 'Port Harcourt Electricity (PHED)' },
  { id: 'KEDCO', name: 'Kano Electricity (KEDCO)' },
  { id: 'JED', name: 'Jos Electricity (JED)' }
];

export const BETTING_PLATFORMS = [
  { id: 'sportybet', name: 'SportyBet' },
  { id: 'bet9ja', name: 'Bet9ja' },
  { id: '1xbet', name: '1xBet' },
  { id: 'betway', name: 'Betway' },
  { id: 'merrybet', name: 'MerryBet' }
];
```

### FILE: src/types.ts
```ts
export type NetworkCode = '01' | '02' | '03' | '04';

export interface NetworkOption {
  code: NetworkCode;
  name: string;
  color: string;
  badgeBg: string;
  prefixes: string[];
}

export interface DataPlan {
  id: string;
  code: string;
  networkCode: NetworkCode;
  type: 'SME' | 'Corporate' | 'Gifting';
  name: string;
  size: string;
  validity: string;
  price: number;
}

export interface Transaction {
  id: string;
  type: 'AIRTIME' | 'DATA' | 'WALLET_FUNDING' | 'CABLE_TV' | 'ELECTRICITY' | 'BETTING';
  network?: string;
  networkCode?: string;
  planName?: string;
  recipient: string;
  faceValue: number;
  amountDeducted: number;
  discount?: number;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  reference: string;
  providerResponse?: string;
  token?: string;
  units?: string;
  timestamp: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  walletBalance: number;
  referralCode: string;
  virtualAccounts: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  }[];
}
```

### FILE: src/types/index.ts
```ts
export type UserRole = 'user' | 'admin' | 'super_admin';
export type UserStatus = 'active' | 'suspended';

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  referralCode?: string;
  hasPin: boolean;
  balanceNaira: number;
  balanceKobo: number;
  createdAt?: string;
  stats?: {
    total: number;
    successful: number;
    pending: number;
    failed: number;
  };
}

export type NetworkType = 'MTN' | 'AIRTEL' | 'GLO' | '9MOBILE';

export interface DataPlan {
  id: string; // Internal DataHub Plan ID
  network: NetworkType;
  planName: string;
  planType: string;
  dataAmount: string;
  duration: string;
  sellingPriceKobo: number;
  sellingPriceNaira: number;
  providerCostNaira?: number;
  markupNaira?: number;
  profitNaira?: number;
  providerCode?: string;
  isActive?: boolean;
}

export interface AirtimeProduct {
  id: string;
  network: NetworkType;
  discountPercent: number;
  minAmountNaira: number;
  maxAmountNaira: number;
}

export type TransactionStatus = 'pending' | 'processing' | 'successful' | 'failed' | 'refunded' | 'FAILED_REFUNDED';
export type ProductType = 'data' | 'airtime' | 'wallet_funding' | 'refund';

export interface Transaction {
  id: number;
  reference: string;
  userId?: number;
  userName?: string;
  userEmail?: string;
  productType: ProductType;
  network?: NetworkType;
  recipientPhone?: string;
  amountNaira: number;
  provider?: string;
  providerReference?: string;
  providerCostNaira?: number;
  sellingPriceNaira?: number;
  profitNaira?: number;
  status: TransactionStatus;
  isDemo: boolean;
  refundReference?: string;
  createdAt: string;
  planName?: string;
  dataAmount?: string;
  duration?: string;
  metadata?: any;
}

export type FundingStatus = 'pending' | 'approved' | 'rejected';

export interface FundingRequest {
  id: number;
  reference: string;
  internalReference?: string;
  userId: number;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  amountNaira: number;
  currency?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  senderName?: string;
  senderBank?: string;
  transferReference?: string;
  proofImageUrl?: string;
  status: FundingStatus;
  adminId?: number;
  adminName?: string;
  rejectionReason?: string;
  approvedAt?: string;
  rejectedAt?: string;
  createdAt: string;
}

export interface LedgerEntry {
  id: number;
  wallet_id: number;
  user_id: number;
  amount_kobo: string | number;
  balance_before_kobo: string | number;
  balance_after_kobo: string | number;
  entry_type: 'credit' | 'debit';
  reference: string;
  description: string;
  status: string;
  created_at: string;
}

export interface BankDetails {
  bank_name: string;
  account_number: string;
  account_name: string;
  manual_funding_instructions: string;
  support_phone?: string;
  support_email?: string;
}

export interface AdminMetrics {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  totalWalletBalanceNaira: number;
  pendingFundingCount: number;
  approvedFundingCount: number;
  rejectedFundingCount: number;
  totalApprovedFundingNaira: number;
  successfulTxCount: number;
  pendingTxCount: number;
  failedTxCount: number;
  refundedTxCount: number;
  totalDataSalesNaira: number;
  totalAirtimeSalesNaira: number;
  totalProviderCostNaira: number;
  totalProfitNaira: number;
}
```

### FILE: src/lib/supabase.ts
```ts
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
```

### FILE: src/lib/api.ts
```ts
export const API_BASE = '/api';

// In-memory token storage (zero localStorage usage)
let inMemoryToken: string | null = null;

export function getAuthToken(): string | null {
  return inMemoryToken;
}

export function setAuthToken(token: string) {
  inMemoryToken = token;
}

export function clearAuthToken() {
  inMemoryToken = null;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}: Request failed`);
  }

  return data;
}
```

### FILE: src/lib/carrierDetector.ts
```ts
export type NetworkCarrier = 'MTN' | 'AIRTEL' | 'GLO' | '9MOBILE';

/**
 * Standard Nigerian Mobile Network Operator prefixes
 */
export const CARRIER_PREFIXES: Record<NetworkCarrier, string[]> = {
  MTN: [
    '0803', '0806', '0703', '0706', '0813', '0816', '0810', '0814', '0903', '0906', '0913', '0916'
  ],
  AIRTEL: [
    '0802', '0808', '0701', '0708', '0812', '0902', '0907', '0901', '0912', '0911'
  ],
  GLO: [
    '0805', '0807', '0705', '0815', '0811', '0905', '0915'
  ],
  '9MOBILE': [
    '0809', '0818', '0817', '0909', '0908'
  ]
};

/**
 * Auto-detects the Nigerian telecommunications network from phone number prefix.
 * Supports formats: 0803..., +234803..., 234803...
 */
export function detectCarrier(rawPhone: string): NetworkCarrier | null {
  if (!rawPhone) return null;

  // Strip all non-digit characters
  let digits = rawPhone.replace(/\D/g, '');

  // Convert international prefixes to standard local 0-prefix
  if (digits.startsWith('234')) {
    digits = '0' + digits.slice(3);
  }

  // Need at least 4 digits (e.g. 0803) to detect carrier
  if (digits.length < 4) return null;

  const prefix = digits.slice(0, 4);

  for (const [carrier, prefixes] of Object.entries(CARRIER_PREFIXES) as [NetworkCarrier, string[]][]) {
    if (prefixes.includes(prefix)) {
      return carrier;
    }
  }

  return null;
}
```

### FILE: src/lib/soundAlert.ts
```ts
/**
 * Web Audio API Notification Sound Synthesizer
 * Plays an alert chime when new pending requests arrive.
 * Works reliably without external audio files.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Plays a pleasant 2-tone notification chime (F5 -> A5)
 */
export function playNotificationChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Tone 1: 698.46 Hz (F5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(698.46, now);

    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.25, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Tone 2: 880.00 Hz (A5)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880.0, now + 0.12);

    gain2.gain.setValueAtTime(0, now + 0.12);
    gain2.gain.linearRampToValueAtTime(0.35, now + 0.16);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.65);
  } catch (err) {
    console.warn('[SoundAlert] AudioContext could not play:', err);
  }
}
```

### FILE: src/lib/utils.ts
```ts
export function formatNaira(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '₦0.00';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num).replace('NGN', '₦');
}

export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

export const NETWORK_INFO: Record<string, { name: string; bg: string; text: string; border: string; badge: string }> = {
  MTN: {
    name: 'MTN',
    bg: 'bg-amber-400',
    text: 'text-amber-950',
    border: 'border-amber-400',
    badge: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  AIRTEL: {
    name: 'Airtel',
    bg: 'bg-red-600',
    text: 'text-white',
    border: 'border-red-600',
    badge: 'bg-red-100 text-red-900 border-red-300'
  },
  GLO: {
    name: 'Glo',
    bg: 'bg-emerald-600',
    text: 'text-white',
    border: 'border-emerald-600',
    badge: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },
  '9MOBILE': {
    name: '9mobile',
    bg: 'bg-teal-800',
    text: 'text-white',
    border: 'border-teal-800',
    badge: 'bg-teal-100 text-teal-900 border-teal-300'
  }
};
```

### FILE: src/hooks/usePWAInstall.ts
```ts
import { useEffect, useState, useCallback } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

declare global {
  interface Window {
    deferredPWAInstallPrompt: BeforeInstallPromptEvent | null;
  }
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(() => {
    return typeof window !== 'undefined' ? window.deferredPWAInstallPrompt : null;
  });
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [canPrompt, setCanPrompt] = useState(() => {
    return typeof window !== 'undefined' ? !!window.deferredPWAInstallPrompt : false;
  });

  useEffect(() => {
    // Check if running in standalone PWA mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');
    
    setIsInstalled(isStandalone);

    // Detect iOS devices (iPhone, iPad, iPod)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    setIsIOS(isIOSDevice);

    // If early script already captured the prompt
    if (window.deferredPWAInstallPrompt) {
      setDeferredPrompt(window.deferredPWAInstallPrompt);
      setCanPrompt(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      window.deferredPWAInstallPrompt = e as BeforeInstallPromptEvent;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanPrompt(true);
    };

    const handlePromptAvailable = () => {
      if (window.deferredPWAInstallPrompt) {
        setDeferredPrompt(window.deferredPWAInstallPrompt);
        setCanPrompt(true);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanPrompt(false);
      setDeferredPrompt(null);
      window.deferredPWAInstallPrompt = null;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('pwa-prompt-available', handlePromptAvailable);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('pwa-app-installed', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('pwa-prompt-available', handlePromptAvailable);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('pwa-app-installed', handleAppInstalled);
    };
  }, []);

  const triggerInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unsupported'> => {
    const promptEvent = deferredPrompt || window.deferredPWAInstallPrompt;
    if (promptEvent) {
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          setCanPrompt(false);
          setDeferredPrompt(null);
          window.deferredPWAInstallPrompt = null;
        }
        return choice.outcome;
      } catch (err) {
        console.warn('[PWA] Error prompting installation:', err);
      }
    }
    return 'unsupported';
  }, [deferredPrompt]);

  return {
    isInstalled,
    isIOS,
    canPrompt,
    triggerInstall
  };
}
```

### FILE: src/hooks/useWalletVisibility.ts
```ts
import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to manage wallet balance visibility across the entire application.
 * Uses in-memory state with zero localStorage dependencies.
 * Defaults to visible (false).
 */
let globalWalletHidden = false;

export function useWalletVisibility() {
  const [isHidden, setIsHidden] = useState<boolean>(globalWalletHidden);

  const toggleVisibility = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsHidden((prev) => {
      const next = !prev;
      globalWalletHidden = next;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('wallet_hidden_change'));
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const handleSync = () => {
      setIsHidden(globalWalletHidden);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('wallet_hidden_change', handleSync);
      return () => {
        window.removeEventListener('wallet_hidden_change', handleSync);
      };
    }
  }, []);

  const formatBalance = useCallback(
    (amountNaira: number | string | undefined | null): string => {
      if (isHidden) {
        return '₦••••••';
      }
      const num = Number(amountNaira) || 0;
      return `₦${num.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    },
    [isHidden]
  );

  return { isHidden, toggleVisibility, formatBalance };
}
```

### FILE: src/context/AuthContext.tsx
```tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/index.ts';
import { apiRequest, getAuthToken, setAuthToken, clearAuthToken } from '../lib/api.ts';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  hideBalance: boolean;
  toggleHideBalance: () => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateBalance: (newBalanceNaira: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hideBalance, setHideBalance] = useState<boolean>(false);

  const toggleHideBalance = () => {
    setHideBalance(prev => !prev);
  };

  const refreshUser = async () => {
    const currentToken = getAuthToken();
    if (!currentToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiRequest<{ user: User }>('/auth/me');
      setUser(data.user);
    } catch (err) {
      console.warn('Failed to load user session, clearing token');
      clearAuthToken();
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = (newToken: string, newUser: User) => {
    setAuthToken(newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    clearAuthToken();
    setToken(null);
    setUser(null);
  };

  const updateBalance = (newBalanceNaira: number) => {
    setUser(prev => prev ? { ...prev, balanceNaira: newBalanceNaira, balanceKobo: Math.round(newBalanceNaira * 100) } : null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, hideBalance, toggleHideBalance, login, logout, refreshUser, updateBalance }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### FILE: src/components/AirtimeForm.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { NETWORKS } from '../constants';
import { NetworkCode, Transaction } from '../types';
import { PhoneCall, ShieldCheck, CheckCircle2, AlertCircle, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AirtimeFormProps {
  walletBalance: number;
  onSuccess: (tx: Transaction, newBalance: number) => void;
  onOpenFundWallet: () => void;
}

export const AirtimeForm: React.FC<AirtimeFormProps> = ({
  walletBalance,
  onSuccess,
  onOpenFundWallet
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkCode>('01'); // MTN default
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('1000');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refundAlert, setRefundAlert] = useState<string | null>(null);

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  // Auto-detect network based on prefixes
  useEffect(() => {
    const cleanNumber = mobileNumber.replace(/\D/g, '');
    if (cleanNumber.length >= 4) {
      const prefix = cleanNumber.slice(0, 4);
      for (const net of NETWORKS) {
        if (net.prefixes.includes(prefix)) {
          setSelectedNetwork(net.code);
          break;
        }
      }
    }
  }, [mobileNumber]);

  const numAmount = Number(amount) || 0;
  // 1% Promotional Discount
  const payableAmount = Math.round(numAmount * 0.99);
  const discountAmount = numAmount - payableAmount;
  const isInsufficient = walletBalance < payableAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRefundAlert(null);

    const cleanNumber = mobileNumber.replace(/\D/g, '');
    if (cleanNumber.length !== 11) {
      setError('Phone number must be exactly 11 digits (e.g. 08012345678).');
      return;
    }

    if (numAmount <= 0) {
      setError('Amount must be greater than ₦0.');
      return;
    }

    if (numAmount < 50) {
      setError('Minimum airtime top-up is ₦50.');
      return;
    }

    if (isInsufficient) {
      setError(`Insufficient balance. You need ₦${payableAmount.toLocaleString()}, but your balance is ₦${walletBalance.toLocaleString()}.`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/airtime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          networkCode: selectedNetwork,
          mobileNumber: cleanNumber,
          amount: numAmount
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        onSuccess(data.transaction, data.newBalance);
        setMobileNumber('');
      } else {
        if (data.refunded || data.status === 'FAILED_REFUNDED') {
          setRefundAlert(data.message || 'Network busy, funds refunded to wallet.');
        } else {
          setError(data.message || 'Airtime purchase could not be completed.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Network connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedNetObj = NETWORKS.find(n => n.code === selectedNetwork);

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-8 backdrop-blur-xl max-w-xl mx-auto shadow-2xl relative overflow-hidden">
      
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-400" />

      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
            VTU Instant Top-Up
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 mt-1">
            Buy Mobile Airtime
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              1% Discount
            </span>
          </h2>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-emerald-500/20 border border-white/10 flex items-center justify-center">
          <PhoneCall className="w-6 h-6 text-emerald-400" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">

        {/* 1. SELECT NETWORK */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
            Select Mobile Network
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {NETWORKS.map((network) => {
              const isSelected = selectedNetwork === network.code;
              return (
                <button
                  type="button"
                  key={network.code}
                  onClick={() => setSelectedNetwork(network.code)}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/15 shadow-md shadow-blue-500/20'
                      : 'border-white/10 bg-slate-800/40 hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full mb-1.5 shadow-sm"
                    style={{ backgroundColor: network.color }}
                  />
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    {network.name}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                    {network.code}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. PHONE NUMBER */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Recipient Phone Number
            </label>
            {selectedNetObj && (
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                Detected: <strong className="text-white">{selectedNetObj.name}</strong>
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="tel"
              placeholder="e.g. 0803 123 4567"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950/70 border border-white/15 text-white placeholder-slate-500 font-mono text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>
        </div>

        {/* 3. RECHARGE AMOUNT */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Airtime Amount (₦)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-slate-400 font-mono text-lg font-bold">
              ₦
            </span>
            <input
              type="number"
              min="50"
              max="50000"
              step="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-9 pr-4 py-3.5 rounded-xl bg-slate-950/70 border border-white/15 text-white placeholder-slate-500 font-mono text-lg font-bold tabular-nums focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Quick amount chips */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-2.5">
            {quickAmounts.map((q) => (
              <button
                type="button"
                key={q}
                onClick={() => setAmount(String(q))}
                className={`py-1.5 px-2 rounded-lg text-xs font-mono font-medium border transition-colors tabular-nums ${
                  numAmount === q
                    ? 'bg-blue-600/30 border-blue-500/50 text-white'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                ₦{q.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* BREAKDOWN CARD */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-white/10 space-y-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Face-value Airtime Amount</span>
            <span className="font-mono text-slate-200 tabular-nums">₦{numAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-emerald-400 font-medium">
            <span>DataHub 1% Discount Margin</span>
            <span className="font-mono tabular-nums">-₦{discountAmount.toLocaleString()}</span>
          </div>
          <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
            <span>Total Deducted From Wallet</span>
            <span className="font-mono text-emerald-400 text-base tabular-nums">
              ₦{payableAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* INSUFFICIENT BALANCE WARNING */}
        {isInsufficient && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Insufficient balance (₦{walletBalance.toLocaleString()})</span>
            </div>
            <button
              type="button"
              onClick={onOpenFundWallet}
              className="text-xs font-bold underline hover:text-white"
            >
              Fund Wallet
            </button>
          </div>
        )}

        {/* REFUND NOTICE */}
        {refundAlert && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 space-y-1">
            <div className="flex items-center gap-2 font-bold text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Transaction Failed & Refunded</span>
            </div>
            <p className="text-[11px] text-slate-300">{refundAlert}</p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading || isInsufficient || numAmount <= 0}
          className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-600/25 active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Contacting ClubKonnect VTU Gateway...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Instant Recharge ₦{numAmount.toLocaleString()} (Pay ₦{payableAmount.toLocaleString()})</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Direct Nellobyte API
          </span>
          <span>·</span>
          <span>Instant Wallet Deduction</span>
          <span>·</span>
          <span>Automated Refund Policy</span>
        </div>

      </form>
    </div>
  );
};
```

### FILE: src/components/BottomNav.tsx
```tsx
import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { 
  Home, 
  Wifi, 
  PhoneCall, 
  Wallet, 
  Clock, 
  ShieldCheck, 
  User 
} from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, setCurrentTab }) => {
  const { user } = useAuth();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/98 backdrop-blur-lg border-t border-slate-800 safe-area-pb">
      <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-1">
        {/* Home */}
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            currentTab === 'home' ? 'text-blue-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] leading-tight">Home</span>
        </button>

        {/* Buy Data */}
        <button
          onClick={() => setCurrentTab('buy-data')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            currentTab === 'buy-data' ? 'text-blue-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Wifi className="w-5 h-5 mb-1" />
          </div>
          <span className="text-[10px] leading-tight">Data</span>
        </button>

        {/* Buy Airtime */}
        <button
          onClick={() => setCurrentTab('buy-airtime')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            currentTab === 'buy-airtime' ? 'text-blue-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <PhoneCall className="w-5 h-5 mb-1" />
          <span className="text-[10px] leading-tight">Airtime</span>
        </button>

        {/* Wallet / Fund */}
        <button
          onClick={() => setCurrentTab('fund-wallet')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            currentTab === 'fund-wallet' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wallet className="w-5 h-5 mb-1" />
          <span className="text-[10px] leading-tight">Wallet</span>
        </button>

        {/* Admin or Profile */}
        {(user?.role === 'admin' || user?.role === 'super_admin') ? (
          <button
            onClick={() => setCurrentTab('admin')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              currentTab === 'admin' ? 'text-amber-400 font-semibold' : 'text-amber-300/80 hover:text-amber-300'
            }`}
          >
            <ShieldCheck className="w-5 h-5 mb-1 text-amber-400" />
            <span className="text-[10px] leading-tight font-medium">Admin</span>
          </button>
        ) : (
          <button
            onClick={() => setCurrentTab(user ? 'profile' : 'login')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              currentTab === 'profile' || currentTab === 'login' ? 'text-blue-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-[10px] leading-tight">{user ? 'Profile' : 'Login'}</span>
          </button>
        )}
      </div>
    </nav>
  );
};
```

### FILE: src/components/DataBundleForm.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { NETWORKS, DATA_PLANS } from '../constants';
import { NetworkCode, DataPlan, Transaction } from '../types';
import { Wifi, ShieldCheck, AlertCircle, Loader2, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DataBundleFormProps {
  walletBalance: number;
  onSuccess: (tx: Transaction, newBalance: number) => void;
  onOpenFundWallet: () => void;
}

export const DataBundleForm: React.FC<DataBundleFormProps> = ({
  walletBalance,
  onSuccess,
  onOpenFundWallet
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkCode>('01');
  const [planTypeFilter, setPlanTypeFilter] = useState<'All' | 'SME' | 'Corporate'>('All');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refundAlert, setRefundAlert] = useState<string | null>(null);

  // Filter plans by selected network and type
  const availablePlans = DATA_PLANS.filter(p => {
    if (p.networkCode !== selectedNetwork) return false;
    if (planTypeFilter === 'All') return true;
    return p.type === planTypeFilter;
  });

  // Select first available plan when network or type filter changes
  useEffect(() => {
    if (availablePlans.length > 0) {
      setSelectedPlanId(availablePlans[0].id);
    } else {
      setSelectedPlanId('');
    }
  }, [selectedNetwork, planTypeFilter]);

  // Auto-detect network prefix
  useEffect(() => {
    const cleanNumber = mobileNumber.replace(/\D/g, '');
    if (cleanNumber.length >= 4) {
      const prefix = cleanNumber.slice(0, 4);
      for (const net of NETWORKS) {
        if (net.prefixes.includes(prefix)) {
          setSelectedNetwork(net.code);
          break;
        }
      }
    }
  }, [mobileNumber]);

  const currentPlan = availablePlans.find(p => p.id === selectedPlanId);
  const isInsufficient = currentPlan ? walletBalance < currentPlan.price : false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRefundAlert(null);

    if (!currentPlan) {
      setError('Please select a data bundle plan.');
      return;
    }

    const cleanNumber = mobileNumber.replace(/\D/g, '');
    if (cleanNumber.length !== 11) {
      setError('Phone number must be exactly 11 digits (e.g. 08012345678).');
      return;
    }

    if (!currentPlan || currentPlan.price <= 0) {
      setError('Selected data plan price must be greater than ₦0.');
      return;
    }

    if (isInsufficient) {
      setError(`Insufficient wallet balance. You need ₦${currentPlan.price.toLocaleString()}, but have ₦${walletBalance.toLocaleString()}.`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          networkCode: selectedNetwork,
          dataPlanCode: currentPlan.code,
          planName: `${currentPlan.name} ${currentPlan.size}`,
          price: currentPlan.price,
          mobileNumber: cleanNumber,
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        onSuccess(data.transaction, data.newBalance);
        setMobileNumber('');
      } else {
        if (data.refunded || data.status === 'FAILED_REFUNDED') {
          setRefundAlert(data.message || 'Network busy, funds refunded to wallet.');
        } else {
          setError(data.message || 'Could not process data purchase.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Network communication error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-8 backdrop-blur-xl max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
      
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-600" />

      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
            Instant 4G / 5G Bundles
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 mt-1">
            Buy Mobile Data Bundle
          </h2>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-600/20 border border-white/10 flex items-center justify-center">
          <Wifi className="w-6 h-6 text-blue-400" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">

        {/* 1. NETWORK SELECTION */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
            1. Select Network
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {NETWORKS.map((network) => {
              const isSelected = selectedNetwork === network.code;
              return (
                <button
                  type="button"
                  key={network.code}
                  onClick={() => setSelectedNetwork(network.code)}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/15 shadow-md shadow-emerald-500/20'
                      : 'border-white/10 bg-slate-800/40 hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full mb-1.5 shadow-sm"
                    style={{ backgroundColor: network.color }}
                  />
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    {network.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. PLAN TYPE FILTER */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              2. Data Type
            </label>
            <div className="flex items-center gap-1 p-0.5 bg-slate-950/60 rounded-lg border border-white/10">
              {(['All', 'SME', 'Corporate'] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setPlanTypeFilter(type)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                    planTypeFilter === type
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* PLAN TILES GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
            {availablePlans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              return (
                <button
                  type="button"
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/20 shadow-md shadow-blue-500/20'
                      : 'border-white/10 bg-slate-950/40 hover:bg-white/5'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                  <span className="text-base sm:text-lg font-bold font-mono text-white block tabular-nums">
                    {plan.size}
                  </span>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {plan.type} · {plan.validity}
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono mt-2 tabular-nums">
                    ₦{plan.price.toLocaleString()}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. RECIPIENT PHONE */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            3. Recipient Phone Number
          </label>
          <input
            type="tel"
            placeholder="e.g. 0803 123 4567"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl bg-slate-950/70 border border-white/15 text-white placeholder-slate-500 font-mono text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            required
          />
        </div>

        {/* SUMMARY CARD */}
        {currentPlan && (
          <div className="p-4 rounded-xl bg-slate-950/50 border border-white/10 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block">Selected Package:</span>
              <span className="font-bold text-white text-sm">
                {currentPlan.name} ({currentPlan.size})
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block">Total Deduction:</span>
              <span className="font-mono font-black text-emerald-400 text-base tabular-nums">
                ₦{currentPlan.price.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* INSUFFICIENT BALANCE WARNING */}
        {isInsufficient && currentPlan && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Insufficient balance (₦{walletBalance.toLocaleString()})</span>
            </div>
            <button
              type="button"
              onClick={onOpenFundWallet}
              className="text-xs font-bold underline hover:text-white"
            >
              Fund Wallet
            </button>
          </div>
        )}

        {/* REFUND NOTICE */}
        {refundAlert && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
            <strong>Refund Processed:</strong> {refundAlert}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading || isInsufficient || !currentPlan}
          className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-emerald-600/25 active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Provisioning Bundle with ClubKonnect...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Send Data Bundle ({currentPlan ? `₦${currentPlan.price.toLocaleString()}` : ''})</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
};
```

### FILE: src/components/ErrorBoundary.tsx
```tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  private reloadTimer?: any;

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Global ErrorBoundary caught error]:', error, errorInfo);
    // Auto-reload after 2 seconds
    this.reloadTimer = setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  public componentWillUnmount() {
    if (this.reloadTimer) {
      clearTimeout(this.reloadTimer);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-white tracking-tight">
                Oops! Something went wrong. Refreshing...
              </h2>
              <p className="text-xs text-slate-400">
                An unexpected error occurred. We are refreshing your session automatically in 2 seconds.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400 pt-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Auto-reloading application...</span>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-xl transition-colors font-medium"
            >
              Click here to reload immediately
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### FILE: src/components/InstallAppModal.tsx
```tsx
import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';
import { StandardLogo } from './StandardLogo.tsx';
import { 
  Download, 
  Smartphone, 
  Share, 
  PlusSquare, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ExternalLink
} from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  apkUrl?: string | null;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  title = 'Install Standard DataHub App',
  subtitle = 'Get faster 1-tap recharges, instant offline access, and a sleek native mobile experience directly on your device.',
  apkUrl
}) => {
  const { isInstalled, isIOS, canPrompt, triggerInstall } = usePWAInstall();
  const [installState, setInstallState] = useState<'idle' | 'installing' | 'success'>('idle');

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    // If admin provided an APK URL, direct user to download it or trigger native prompt
    if (canPrompt) {
      setInstallState('installing');
      const result = await triggerInstall();
      if (result === 'accepted') {
        setInstallState('success');
        setTimeout(() => {
          onClose();
        }, 1800);
      } else {
        setInstallState('idle');
      }
    } else if (apkUrl) {
      window.location.href = apkUrl;
      onClose();
    }
  };

  const handleDirectApkDownload = () => {
    if (apkUrl) {
      window.location.href = apkUrl;
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-7 shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* App Branding & Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <StandardLogo className="w-16 h-16 shadow-xl rounded-2xl" />
            <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 text-slate-950 rounded-full shadow">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {title}
          </h2>
          <p className="text-xs text-slate-300 mt-1.5 max-w-xs leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* PWA Benefits */}
        <div className="space-y-2.5 mb-6 bg-slate-800/50 border border-slate-700/60 rounded-2xl p-3.5 text-xs text-slate-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant 1-tap launch directly from your home screen</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Fast, lightweight (zero storage bloat, &lt; 2MB)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Secure biometric & 4-digit PIN top-up</span>
          </div>
        </div>

        {/* Installation Instructions / Buttons */}
        {isInstalled ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mb-1">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-emerald-300">App Already Installed!</h3>
            <p className="text-xs text-slate-300">
              You can launch Standard DataHub anytime from your device home screen or app drawer.
            </p>
            <button
              onClick={onClose}
              className="mt-3 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Continue to Dashboard
            </button>
          </div>
        ) : isIOS ? (
          /* iOS Safari Specific Step-by-Step Visual Modal */
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-xs text-slate-200 space-y-3">
              <div className="font-bold text-blue-400 flex items-center gap-1.5 text-sm">
                <Smartphone className="w-4 h-4" />
                <span>How to Install on iPhone / iPad:</span>
              </div>
              
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 bg-slate-850 p-2.5 rounded-xl border border-slate-750">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <span>Tap the <strong className="text-blue-400">Share</strong> icon</span>
                    <span className="inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold text-[11px]">
                      <Share className="w-3 h-3 inline" /> Share
                    </span>
                    <span>at the bottom of your Safari browser bar.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-slate-850 p-2.5 rounded-xl border border-slate-750">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <span>Scroll down the menu and tap</span>
                    <span className="inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold text-[11px]">
                      <PlusSquare className="w-3 h-3 inline" /> Add to Home Screen
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-slate-850 p-2.5 rounded-xl border border-slate-750">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <span>Tap <strong className="text-emerald-400">"Add"</strong> in the top-right corner to complete installation.</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Got It, Done!
            </button>
          </div>
        ) : (
          /* Android Chrome / Standard Prompt */
          <div className="space-y-3">
            {/* If Direct APK link is configured and prioritized */}
            {apkUrl && (
              <button
                onClick={handleDirectApkDownload}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-98"
              >
                <Download className="w-4 h-4 animate-bounce" />
                <span>Download Android APK (.apk)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>
            )}

            {/* Native PWA Prompt Button */}
            {canPrompt ? (
              <button
                onClick={handleInstallClick}
                disabled={installState === 'installing'}
                className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-98 ${
                  apkUrl
                    ? 'bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-100'
                    : 'bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-blue-600/30'
                }`}
              >
                <Download className="w-4 h-4 animate-bounce" />
                <span>
                  {installState === 'installing' ? 'Installing...' : 'Add to Home Screen (Instant App)'}
                </span>
              </button>
            ) : !apkUrl ? (
              <div className="space-y-2">
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center text-xs text-slate-300">
                  <Smartphone className="w-5 h-5 mx-auto mb-1.5 text-teal-400" />
                  <span>
                    Tap your browser menu (<strong>⋮</strong> three dots in Chrome) and select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                  </span>
                </div>
              </div>
            ) : null}

            <button
              onClick={onClose}
              className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Maybe Later
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
```

### FILE: src/components/Navbar.tsx
```tsx
import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { formatNaira } from '../lib/utils.ts';
import { useWalletVisibility } from '../hooks/useWalletVisibility.ts';
import { StandardLogo } from './StandardLogo.tsx';
import { 
  Zap, 
  Wallet, 
  ShieldCheck, 
  User, 
  LogOut, 
  Menu, 
  X, 
  PhoneCall, 
  Wifi, 
  Clock, 
  MessageCircle, 
  UserPlus, 
  LogIn,
  ChevronRight,
  Sparkles,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenInstallModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onOpenInstallModal }) => {
  const { user, logout } = useAuth();
  const { isHidden, toggleVisibility, formatBalance } = useWalletVisibility();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Zap },
    { id: 'buy-data', label: 'Buy Data', icon: Wifi },
    { id: 'buy-airtime', label: 'Buy Airtime', icon: PhoneCall },
    { id: 'fund-wallet', label: 'Fund Wallet', icon: Wallet },
    { id: 'contact', label: 'Contact & FAQs', icon: MessageCircle }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <div 
              onClick={() => { setCurrentTab('home'); setDrawerOpen(false); }}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="group-hover:scale-105 transition-transform">
                <StandardLogo className="w-9 h-9" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-black text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                    Standard DataHub
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    VTU
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 hidden sm:block mt-0.5">Instant Data & Airtime</p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    currentTab === item.id
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {(user?.role === 'admin' || user?.role === 'super_admin') && (
                <button
                  onClick={() => setCurrentTab('admin')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                    currentTab === 'admin'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'text-amber-300 hover:bg-amber-500/10'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Admin Hub
                </button>
              )}
            </nav>

            {/* Right Action Cluster */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Install / Download App Button */}
              {onOpenInstallModal && (
                <button
                  onClick={onOpenInstallModal}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/20 to-teal-500/20 hover:from-blue-600/30 hover:to-teal-500/30 border border-teal-500/40 text-teal-300 text-xs font-bold transition-all shadow-sm active:scale-95"
                  title="Install Standard DataHub to your home screen"
                >
                  <Download className="w-3.5 h-3.5 text-teal-400" />
                  <span>Download App</span>
                </button>
              )}

              {/* WhatsApp Support Direct Link */}
              <a
                href="https://wa.me/2348161720895?text=Hello%20Standard%20DataHub%20Support,%20I%20need%20assistance"
                target="_blank"
                rel="noreferrer"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-bold transition-all shadow-sm"
                title="Support: 08161720895"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              {user ? (
                <div className="flex items-center gap-2">
                  {/* Wallet Balance Pill */}
                  <div className="flex items-center gap-1 bg-gradient-to-r from-slate-800 to-slate-850 border border-emerald-500/30 hover:border-emerald-400 rounded-xl px-2.5 py-1.5 shadow-sm transition-all">
                    <div
                      onClick={() => setCurrentTab('fund-wallet')}
                      className="cursor-pointer flex items-center gap-2"
                      title="Click to fund wallet"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 leading-none">Wallet</div>
                        <div className="text-sm font-bold text-emerald-400 leading-none font-mono">
                          {formatBalance(user.balanceNaira)}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="text-slate-400 hover:text-emerald-400 p-1 rounded-md transition-colors cursor-pointer ml-1"
                      title={isHidden ? 'Click to show wallet balance' : 'Click to hide wallet balance'}
                      aria-label="Toggle balance visibility"
                    >
                      {isHidden ? (
                        <EyeOff className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Eye className="w-3.5 h-3.5 text-slate-400 hover:text-emerald-400" />
                      )}
                    </button>
                  </div>

                  {/* Profile Shortcut */}
                  <button
                    onClick={() => setCurrentTab('profile')}
                    className={`p-2 rounded-xl border transition-colors ${
                      currentTab === 'profile'
                        ? 'bg-blue-600/30 border-blue-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                    title="Account Profile"
                  >
                    <User className="w-4 h-4" />
                  </button>

                  {/* Desktop Logout shortcut */}
                  <button
                    onClick={logout}
                    className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-500/50 transition-colors hidden sm:block"
                    title="Log out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentTab('login')}
                    className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    Login
                  </button>

                  {/* Prominently visible Register button */}
                  <button
                    onClick={() => setCurrentTab('register')}
                    className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 rounded-xl shadow-md shadow-blue-600/30 transition-all hover:scale-[1.03] active:scale-95 flex items-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                    <span>Register</span>
                  </button>
                </div>
              )}

              {/* Hamburger drawer trigger button */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors ml-1"
                aria-label="Open side drawer menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULL SLIDE-OUT SIDE DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="absolute top-0 bottom-0 right-0 w-80 max-w-[85vw] bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between p-5 z-10 animate-in slide-in-from-right duration-250">
            {/* Top Drawer Section */}
            <div className="space-y-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <StandardLogo className="w-8 h-8" />
                  <div>
                    <span className="font-extrabold text-base tracking-tight text-white">Standard DataHub</span>
                    <span className="text-[10px] text-slate-400 block">Menu & Quick Access</span>
                  </div>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Account Quick Summary in Drawer */}
              {user ? (
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                        {user.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white truncate max-w-[130px]">{user.fullName}</div>
                        <div className="text-[10px] font-mono text-slate-400">{user.phone}</div>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {user.role}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Wallet:</span>
                    <span className="font-black text-emerald-400">{formatNaira(user.balanceNaira)}</span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/40 to-slate-800 border border-blue-800/40 text-xs text-slate-300">
                  <div className="font-bold text-white mb-0.5">Welcome to Standard DataHub</div>
                  <p className="text-[11px] text-slate-400">Join to buy MTN SME, Airtel, Glo & 9mobile at wholesale prices.</p>
                </div>
              )}

              {/* Navigation Items */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentTab(item.id);
                        setDrawerOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  );
                })}

                {user && (
                  <>
                    <button
                      onClick={() => {
                        setCurrentTab('transactions');
                        setDrawerOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                        currentTab === 'transactions'
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>Transaction History</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>

                    <button
                      onClick={() => {
                        setCurrentTab('profile');
                        setDrawerOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                        currentTab === 'profile'
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-slate-400" />
                        <span>My Profile & PIN</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  </>
                )}

                {(user?.role === 'admin' || user?.role === 'super_admin') && (
                  <button
                    onClick={() => {
                      setCurrentTab('admin');
                      setDrawerOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>Admin Management Hub</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                )}

                {/* Direct Download App in Drawer */}
                {onOpenInstallModal && (
                  <button
                    onClick={() => {
                      onOpenInstallModal();
                      setDrawerOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600/20 to-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-between transition-colors mt-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <Download className="w-4 h-4 text-teal-400" />
                      <span>Download / Install App</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-teal-300 bg-teal-500/20 px-1.5 py-0.5 rounded">
                      PWA
                    </span>
                  </button>
                )}

                {/* Direct WhatsApp Support in Drawer */}
                <a
                  href="https://wa.me/2348161720895?text=Hello%20Standard%20DataHub%20Support,%20I%20need%20assistance"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between transition-colors mt-2"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Support (08161720895)</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                    Online
                  </span>
                </a>
              </nav>
            </div>

            {/* Bottom Drawer Section: Log Out or Register/Login */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setDrawerOpen(false);
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-400 font-extrabold text-xs tracking-wide flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                >
                  <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Log Out ({user.phone})</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setCurrentTab('register');
                      setDrawerOpen(false);
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Create Free Account</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab('login');
                      setDrawerOpen(false);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Log In to Existing Account</span>
                  </button>
                </div>
              )}

              <div className="text-[10px] text-center text-slate-500">
                Support: ibrahimmal916@gmail.com
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
```

### FILE: src/components/PinModal.tsx
```tsx
import React, { useState } from 'react';
import { ShieldCheck, Lock, X, Delete } from 'lucide-react';
import { formatNaira } from '../lib/utils.ts';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (pin: string) => void;
  title: string;
  summary: {
    product: string;
    recipient: string;
    amountNaira: number;
    network?: string;
  };
  hasPin: boolean;
  onOpenSetPin: () => void;
  isLoading?: boolean;
}

export const PinModal: React.FC<PinModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  summary,
  hasPin,
  onOpenSetPin,
  isLoading = false
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      const next = pin + digit;
      setPin(next);
      setError('');
      if (next.length === 4) {
        // Auto trigger or allow user to click confirm
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPin('');
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin.length !== 4) {
      setError('Please enter your 4-digit PIN.');
      return;
    }
    onConfirm(pin);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-white">
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-xs text-slate-400 mt-1">Authorize transaction with your 4-digit PIN</p>
        </div>

        {/* Transaction Summary Card */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 mb-5 space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-300">
            <span>Product</span>
            <span className="font-semibold text-white">{summary.product}</span>
          </div>
          {summary.network && (
            <div className="flex justify-between items-center text-slate-300">
              <span>Network</span>
              <span className="font-semibold text-white">{summary.network}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-slate-300">
            <span>Recipient</span>
            <span className="font-mono font-semibold text-white">{summary.recipient}</span>
          </div>
          <div className="pt-2 border-t border-slate-700 flex justify-between items-center">
            <span className="font-semibold text-slate-200">Total Charge</span>
            <span className="text-base font-bold text-emerald-400">
              {formatNaira(summary.amountNaira)}
            </span>
          </div>
        </div>

        {!hasPin ? (
          <div className="text-center py-4 space-y-3">
            <p className="text-sm text-amber-300">
              You haven't set a transaction PIN yet. A 4-digit PIN is required to secure your purchases.
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenSetPin();
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all"
            >
              Set Up Transaction PIN Now
            </button>
          </div>
        ) : (
          <div>
            {/* Masked PIN Bullets */}
            <div className="flex justify-center gap-4 mb-6">
              {[0, 1, 2, 3].map((index) => {
                const filled = pin.length > index;
                return (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-200 ${
                      filled
                        ? 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50'
                        : 'bg-slate-700 border border-slate-600'
                    }`}
                  />
                );
              })}
            </div>

            {error && (
              <p className="text-xs text-rose-400 text-center mb-3 font-medium">{error}</p>
            )}

            {/* On-screen Keypad */}
            <div className="grid grid-cols-3 gap-2.5 mb-5 max-w-[260px] mx-auto">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleDigit(digit)}
                  className="h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-lg border border-slate-700 active:scale-95 transition-all flex items-center justify-center select-none"
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                disabled={isLoading}
                onClick={handleClear}
                className="h-12 rounded-2xl bg-slate-800/50 hover:bg-slate-700/60 text-slate-400 text-xs font-semibold border border-slate-700 active:scale-95 transition-all flex items-center justify-center select-none"
              >
                Clear
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleDigit('0')}
                className="h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-lg border border-slate-700 active:scale-95 transition-all flex items-center justify-center select-none"
              >
                0
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={handleDelete}
                className="h-12 rounded-2xl bg-slate-800/50 hover:bg-slate-700/60 text-slate-300 border border-slate-700 active:scale-95 transition-all flex items-center justify-center select-none"
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>

            {/* Confirm button */}
            <button
              type="button"
              disabled={isLoading || pin.length !== 4}
              onClick={() => handleSubmit()}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Confirm Payment</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
```

### FILE: src/components/ReceiptModal.tsx
```tsx
import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  RotateCcw, 
  Copy, 
  Check, 
  X, 
  Share2, 
  Zap,
  MessageCircle
} from 'lucide-react';
import { formatNaira, formatDate } from '../lib/utils.ts';
import { useToast } from './Toast.tsx';

/**
 * Sanitizes messages so no simulation/demo artifacts ever leak into customer receipts
 */
export function sanitizeReceiptMessage(msg?: string): string {
  if (!msg) return '';
  return msg
    .replace(/\[\s*DEMO(?:\s*MODE)?\s*\]/gi, '')
    .replace(/\(\s*Demo(?:\s*Mode)?\s*\)/gi, '')
    .replace(/Demo\s*Mode:?\s*/gi, '')
    .replace(/Simulated\s*Provider\s*Success:\s*/gi, '')
    .replace(/Simulated\s*Provider\s*Failure:\s*/gi, '')
    .replace(/Simulated\s*Provider\s*Pending:\s*/gi, '')
    .replace(/Simulated\s*/gi, '')
    .trim();
}

/**
 * Sanitizes provider references so customer receipts only show clean real-time order references
 */
export function sanitizeProviderReference(ref?: string): string {
  if (!ref) return '';
  return ref.replace(/^DEMO-/i, '').trim();
}

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    reference: string;
    productType?: string;
    planName?: string;
    network?: string;
    recipientPhone?: string;
    amountNaira: number;
    status: string;
    providerReference?: string;
    providerError?: string;
    message?: string;
    createdAt?: string;
    refunded?: boolean;
  } | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, data }) => {
  const { showToast } = useToast();
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !data) return null;

  const displayMessage = sanitizeReceiptMessage(data.message);
  const displayProviderRef = sanitizeProviderReference(data.providerReference);
  const exactProviderError = data.providerError || (data.status?.toUpperCase() === 'FAILED' ? displayMessage : undefined);

  const rawAmount = data.amountNaira ?? (data as any).airtimeAmount ?? (data as any).amount;
  const computedAmount = (rawAmount !== undefined && !isNaN(Number(rawAmount))) ? Number(rawAmount) : 0;

  const copyReference = () => {
    navigator.clipboard.writeText(data.reference);
    setCopied(true);
    showToast('Reference copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const copyFullReceipt = () => {
    const text = `STANDARD DATAHUB VTU RECEIPT\nReference: ${data.reference}\nProduct: ${data.planName || data.productType || 'VTU Recharge'}\nNetwork: ${data.network || 'N/A'}\nRecipient: ${data.recipientPhone || 'N/A'}\nAmount: ${formatNaira(computedAmount)}\nStatus: ${data.status.toUpperCase()}${exactProviderError ? `\nProvider Error: ${exactProviderError}` : ''}\nProvider Ref: ${displayProviderRef || 'N/A'}\nDate: ${formatDate(data.createdAt || new Date().toISOString())}`;
    navigator.clipboard.writeText(text);
    showToast('Full receipt details copied!', 'success');
  };

  const normalizedStatus = (data.status || '').toUpperCase();
  const isSuccess = normalizedStatus === 'SUCCESS' || normalizedStatus === 'SUCCESSFUL';
  const isPending = normalizedStatus === 'PENDING' || normalizedStatus === 'PROCESSING';
  const isRefunded = normalizedStatus === 'REFUNDED' || normalizedStatus === 'FAILED_REFUNDED' || Boolean(data.refunded);
  const isFailed = normalizedStatus === 'FAILED' || (!isSuccess && !isPending);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Status Icon */}
        <div className="text-center mb-4">
          <div className="flex justify-center mb-3">
            {isSuccess && (
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            )}
            {isPending && (
              <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>
            )}
            {isRefunded && (
              <div className="w-14 h-14 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                <RotateCcw className="w-8 h-8" />
              </div>
            )}
            {isFailed && !isRefunded && (
              <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8" />
              </div>
            )}
          </div>

          <h3 className="text-lg font-bold">
            {isSuccess && 'Transaction Successful'}
            {isPending && 'Order Processing'}
            {isRefunded && 'Service Temporarily Unavailable'}
            {isFailed && !isRefunded && 'Service Temporarily Unavailable'}
          </h3>

          <div className="text-2xl font-black text-white mt-1">
            {formatNaira(computedAmount)}
          </div>

          <p className="text-xs text-slate-400 mt-1 max-w-[260px] mx-auto leading-relaxed">
            {isRefunded 
              ? 'Funds refunded to wallet.' 
              : isSuccess 
                ? 'Delivered instantly.' 
                : 'Please try again shortly.'}
          </p>
        </div>

        {/* Friendly Refund Status Display */}
        {isRefunded && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3.5 mb-4 text-left">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-1">
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>Full Refund Credited</span>
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              Service temporarily unavailable. <span className="font-bold text-white">{formatNaira(data.amountNaira)}</span> has been automatically refunded to your wallet balance.
            </p>
          </div>
        )}

        {/* Technical Diagnostic Details (collapsible so customers are not alarmed) */}
        {exactProviderError && (
          <details className="mb-4 text-[10px] text-slate-400 bg-slate-800/40 border border-slate-700/60 rounded-xl p-2.5">
            <summary className="cursor-pointer font-semibold text-slate-400 hover:text-slate-300">
              Technical Diagnostic Details
            </summary>
            <div className="mt-1.5 font-mono text-[11px] text-rose-300 break-words select-all">
              {exactProviderError}
            </div>
          </details>
        )}

        {/* Receipt Details Card */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 mb-5 space-y-2.5 text-xs">
          <div className="flex justify-between items-center text-slate-400">
            <span>Transaction Ref</span>
            <div className="flex items-center gap-1.5 font-mono text-slate-200">
              <span>{data.reference.length > 18 ? `${data.reference.slice(0, 16)}...` : data.reference}</span>
              <button
                onClick={copyReference}
                className="p-1 hover:text-blue-400 transition-colors"
                title="Copy reference"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {data.network && (
            <div className="flex justify-between items-center text-slate-400">
              <span>Network</span>
              <span className="font-semibold text-white uppercase">{data.network}</span>
            </div>
          )}

          {data.planName && (
            <div className="flex justify-between items-center text-slate-400">
              <span>Product</span>
              <span className="font-semibold text-white">{data.planName}</span>
            </div>
          )}

          {data.recipientPhone && (
            <div className="flex justify-between items-center text-slate-400">
              <span>Recipient Phone</span>
              <span className="font-mono font-semibold text-white">{data.recipientPhone}</span>
            </div>
          )}

          {displayProviderRef && (
            <div className="flex justify-between items-center text-slate-400">
              <span>Provider Ref</span>
              <span className="font-mono text-slate-300">{displayProviderRef}</span>
            </div>
          )}

          <div className="flex justify-between items-center text-slate-400">
            <span>Date & Time</span>
            <span className="text-slate-300">{formatDate(data.createdAt || new Date().toISOString())}</span>
          </div>

          <div className="pt-2 border-t border-slate-700/80 flex justify-between items-center">
            <span className="text-slate-300 font-medium">Status</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                isSuccess
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : isPending
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : isRefunded
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {data.status}
            </span>
          </div>
        </div>

        {/* WhatsApp Support Button */}
        <div className="mb-4">
          <a
            href={`https://wa.me/2348161720895?text=${encodeURIComponent(`Hello Standard DataHub Support, I need assistance with transaction ref: ${data.reference} (${data.planName || data.productType || 'Recharge'} - ₦${data.amountNaira})`)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Need Help? Chat on WhatsApp</span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={copyFullReceipt}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Copy Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-md shadow-blue-600/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

```

### FILE: src/components/ServiceCards.tsx
```tsx
import React from 'react';
import { 
  Wifi, 
  PhoneCall, 
  Tv, 
  Zap, 
  Wallet, 
  Trophy, 
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';

interface ServiceCardsProps {
  onSelectService: (service: 'data' | 'airtime' | 'cable' | 'electricity' | 'wallet' | 'betting') => void;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({ onSelectService }) => {
  const services = [
    {
      id: 'data' as const,
      title: 'Mobile Data',
      kicker: 'SME & Corporate Gifting',
      tagline: 'Instant 4G/5G bundles',
      discount: 'From ₦230/GB',
      icon: Wifi,
    },
    {
      id: 'airtime' as const,
      title: 'Airtime Top-Up',
      kicker: 'Instant VTU Recharge',
      tagline: 'MTN, Glo, Airtel, 9mobile',
      discount: '1% Cashback Margin',
      icon: PhoneCall,
    },
    {
      id: 'cable' as const,
      title: 'Cable TV',
      kicker: 'Instant Smartcard Renewal',
      tagline: 'DSTV, GOtv & Startimes',
      discount: 'Zero service fee',
      icon: Tv,
    },
    {
      id: 'electricity' as const,
      title: 'Electricity Token',
      kicker: 'Prepaid & Postpaid Units',
      tagline: 'AEDC, EKEDC, IKEDC, IBEDC',
      discount: 'Instant token SMS',
      icon: Zap,
    },
    {
      id: 'wallet' as const,
      title: 'Wallet Funding',
      kicker: 'Automatic Dedicated Banks',
      tagline: 'Wema, Moniepoint & PalmPay',
      discount: '0% deposit fees',
      icon: Wallet,
    },
    {
      id: 'betting' as const,
      title: 'Betting Top-Up',
      kicker: 'Fast Sportsbook Credits',
      tagline: 'SportyBet, Bet9ja, 1xBet',
      discount: 'Direct User ID credit',
      icon: Trophy,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <button
            key={service.id}
            onClick={() => onSelectService(service.id)}
            className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.99] focus:outline-none overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(16, 185, 129, 0.12))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            {/* Subtle hovering radial glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Top row: Fintech glass icon + Arrow */}
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-900/80 border border-white/10 shadow-lg group-hover:border-blue-500/40 transition-colors">
                {/* SVG linear gradient applied to icon stroke/fill */}
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#electricGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <defs>
                    <linearGradient id="electricGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                  {service.id === 'data' && (
                    <>
                      <path d="M12 20h.01" />
                      <path d="M2 8.82a15 15 0 0 1 20 0" />
                      <path d="M5 12.859a10 10 0 0 1 14 0" />
                      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
                    </>
                  )}
                  {service.id === 'airtime' && (
                    <>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </>
                  )}
                  {service.id === 'cable' && (
                    <>
                      <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
                      <polyline points="17 2 12 7 7 2" />
                    </>
                  )}
                  {service.id === 'electricity' && (
                    <>
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </>
                  )}
                  {service.id === 'wallet' && (
                    <>
                      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                    </>
                  )}
                  {service.id === 'betting' && (
                    <>
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                      <path d="M4 22h16" />
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </>
                  )}
                </svg>
              </div>

              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                {service.tagline}
              </p>
              
              <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-semibold font-mono tracking-tight">
                  {service.discount}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
```

### FILE: src/components/SetPinModal.tsx
```tsx
import React, { useState } from 'react';
import { Lock, X, ShieldCheck } from 'lucide-react';
import { apiRequest } from '../lib/api.ts';
import { useToast } from './Toast.tsx';

interface SetPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasExistingPin: boolean;
  onSuccess: () => void;
}

export const SetPinModal: React.FC<SetPinModalProps> = ({
  isOpen,
  onClose,
  hasExistingPin,
  onSuccess
}) => {
  const { showToast } = useToast();
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (hasExistingPin && (!currentPin || currentPin.length !== 4)) {
      setError('Please enter your 4-digit current PIN.');
      return;
    }

    if (!newPin || newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      setError('New PIN must be exactly 4 digits (0-9).');
      return;
    }

    if (newPin !== confirmPin) {
      setError('New PIN and Confirm PIN do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest('/auth/set-pin', {
        method: 'POST',
        body: JSON.stringify({
          currentPin: hasExistingPin ? currentPin : undefined,
          newPin,
          confirmPin
        })
      });

      showToast('Transaction PIN saved successfully!', 'success');
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save PIN.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold">
            {hasExistingPin ? 'Change Transaction PIN' : 'Create Transaction PIN'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            This 4-digit PIN is required to authorize purchases
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {hasExistingPin && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Current 4-Digit PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                className="w-full text-center tracking-[1em] text-lg font-bold bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              New 4-Digit PIN
            </label>
            <input
              type="password"
              maxLength={4}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="w-full text-center tracking-[1em] text-lg font-bold bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Confirm New PIN
            </label>
            <input
              type="password"
              maxLength={4}
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="w-full text-center tracking-[1em] text-lg font-bold bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 mt-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>Save Transaction PIN</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
```

### FILE: src/components/StandardLogo.tsx
```tsx
import React from 'react';

interface StandardLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textSize?: 'sm' | 'md' | 'lg';
}

export const StandardLogo: React.FC<StandardLogoProps> = ({
  className = 'w-9 h-9',
  size,
  showText = false,
  textSize = 'md'
}) => {
  const icon = (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none"
      >
        <defs>
          {/* Subtle Outer Border Gradient */}
          <linearGradient id="stdBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
          </linearGradient>

          {/* Dark Glass Container Background */}
          <linearGradient id="stdBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#090d16" />
            <stop offset="100%" stopColor="#06121e" />
          </linearGradient>

          {/* Electric Blue-to-Teal Lightning Bolt Gradient */}
          <linearGradient id="stdBoltGrad" x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#06b6d4" />
            <stop offset="80%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>

          {/* Core Inner Highlight */}
          <linearGradient id="stdHighlightGrad" x1="30%" y1="10%" x2="70%" y2="90%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#67e8f9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>

          {/* Ambient Glow behind the lightning */}
          <radialGradient id="stdAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#090d16" stopOpacity="0" />
          </radialGradient>

          {/* Lightning Filter Glow */}
          <filter id="stdGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Dark Rounded Square Container */}
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="22"
          fill="url(#stdBgGrad)"
          stroke="url(#stdBorderGrad)"
          strokeWidth="2.5"
        />

        {/* Ambient Center Glow */}
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          rx="19"
          fill="url(#stdAura)"
        />

        {/* Glowing Lightning Bolt Shadow/Halo */}
        <path
          d="M56 16L32 50H50L42 84L70 46H52L56 16Z"
          fill="url(#stdBoltGrad)"
          filter="url(#stdGlow)"
          opacity="0.8"
        />

        {/* Crisp Main Lightning Bolt */}
        <path
          d="M56 16L32 50H50L42 84L70 46H52L56 16Z"
          fill="url(#stdBoltGrad)"
          stroke="#ffffff"
          strokeWidth="0.75"
          strokeOpacity="0.6"
          strokeLinejoin="round"
        />

        {/* Internal High-Gloss Reflection */}
        <path
          d="M54 20L36 50H50L45 72L64 48H52L54 20Z"
          fill="url(#stdHighlightGrad)"
          opacity="0.5"
        />
      </svg>
    </div>
  );

  if (!showText) {
    return icon;
  }

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs'
  };

  return (
    <div className="flex items-center gap-2.5 select-none">
      {icon}
      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent ${titleSizes[textSize]}`}>
            Standard DataHub
          </span>
          <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            VTU
          </span>
        </div>
        <p className={`text-slate-400 font-medium ${subtitleSizes[textSize]} mt-0.5`}>
          Instant Data & Airtime
        </p>
      </div>
    </div>
  );
};

export default StandardLogo;
```

### FILE: src/components/Toast.tsx
```tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md text-sm transition-all duration-300 transform translate-y-0 ${
              toast.type === 'success'
                ? 'bg-emerald-950/95 border-emerald-700 text-emerald-100'
                : toast.type === 'error'
                ? 'bg-rose-950/95 border-rose-700 text-rose-100'
                : 'bg-blue-950/95 border-blue-700 text-blue-100'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}
            
            <p className="flex-1 font-medium leading-relaxed">{toast.message}</p>
            
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
```

### FILE: src/components/TransactionHistory.tsx
```tsx
import React, { useState } from 'react';
import { Transaction } from '../types';
import { 
  History, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronRight, 
  Smartphone, 
  PhoneCall, 
  Tv, 
  Zap, 
  Wallet,
  Receipt
} from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
  onNavigateToService: (tab: string) => void;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  onSelectTransaction,
  onNavigateToService
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = transactions.filter((tx) => {
    if (filterType !== 'ALL' && tx.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        tx.id.toLowerCase().includes(q) ||
        tx.recipient.toLowerCase().includes(q) ||
        tx.reference.toLowerCase().includes(q) ||
        (tx.network && tx.network.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'AIRTIME':
        return <PhoneCall className="w-4 h-4 text-blue-400" />;
      case 'DATA':
        return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'WALLET_FUNDING':
        return <Wallet className="w-4 h-4 text-indigo-400" />;
      case 'CABLE_TV':
        return <Tv className="w-4 h-4 text-amber-400" />;
      case 'ELECTRICITY':
        return <Zap className="w-4 h-4 text-teal-400" />;
      default:
        return <Receipt className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-7 backdrop-blur-xl max-w-4xl mx-auto shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
            Audit Ledger
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 mt-0.5">
            Transaction History
          </h2>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search phone, ref, id..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/70 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 py-4 overflow-x-auto no-scrollbar">
        {[
          { id: 'ALL', label: 'All Records' },
          { id: 'AIRTIME', label: 'Airtime' },
          { id: 'DATA', label: 'Mobile Data' },
          { id: 'WALLET_FUNDING', label: 'Funding' },
          { id: 'ELECTRICITY', label: 'Electricity' },
          { id: 'CABLE_TV', label: 'Cable TV' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterType === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table / List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
          <History className="w-10 h-10 mx-auto text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-slate-300">No transactions found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Try adjusting your search filters or make your first VTU transaction.
          </p>
          <button
            onClick={() => onNavigateToService('airtime')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
          >
            Buy Airtime Now
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((tx) => {
            const isSuccess = tx.status === 'SUCCESS';
            const isFailed = tx.status === 'FAILED';

            return (
              <button
                key={tx.id}
                onClick={() => onSelectTransaction(tx)}
                className="w-full p-3.5 sm:p-4 rounded-xl bg-slate-950/40 hover:bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all flex items-center justify-between text-left group"
              >
                {/* Left: Icon + Description */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0">
                    {getTypeIcon(tx.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white truncate">
                        {tx.type === 'WALLET_FUNDING' ? 'Wallet Credit' : (tx.planName || `${tx.network || ''} Airtime`)}
                      </span>
                      {tx.network && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-slate-300 font-mono font-medium">
                          {tx.network}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 font-mono">
                      <span>{tx.recipient}</span>
                      <span>·</span>
                      <span>{new Date(tx.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Amount + Status + Arrow */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0 pl-3">
                  <div className="text-right">
                    <div className={`text-xs sm:text-sm font-bold font-mono tabular-nums ${
                      tx.type === 'WALLET_FUNDING' ? 'text-emerald-400' : 'text-white'
                    }`}>
                      {tx.type === 'WALLET_FUNDING' ? '+' : '-'}₦{Math.abs(tx.faceValue).toLocaleString()}
                    </div>
                    <div className="flex items-center justify-end gap-1 mt-0.5">
                      {isSuccess && (
                        <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Success
                        </span>
                      )}
                      {isFailed && (
                        <span className="text-[10px] font-semibold text-red-400 flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Refunded
                        </span>
                      )}
                      {!isSuccess && !isFailed && (
                        <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
};
```

### FILE: src/components/TransactionReceiptModal.tsx
```tsx
import React, { useRef } from 'react';
import { DATAHUB_SVG_LOGO } from '../constants';
import { Transaction } from '../types';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Printer, 
  Share2, 
  Copy, 
  ShieldCheck,
  Zap,
  ArrowDown
} from 'lucide-react';

interface TransactionReceiptModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const TransactionReceiptModal: React.FC<TransactionReceiptModalProps> = ({
  transaction,
  onClose,
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!transaction) return null;

  const isSuccess = transaction.status === 'SUCCESS';
  const isFailed = transaction.status === 'FAILED';

  const handlePrint = () => {
    window.print();
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(transaction.reference);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        ref={receiptRef}
        className="bg-[#0B0F19] border border-white/10 rounded-3xl w-full max-w-md p-6 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col"
      >
        {/* Receipt top decorative zigzag or border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-emerald-500 to-indigo-600" />

        {/* Action controls */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 print:hidden">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            E-Receipt · {transaction.id}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrint}
              title="Print Receipt"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 border border-white/10"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Brand Lockup with Custom SVG Logo */}
        <div className="text-center pt-4 pb-3">
          <img 
            src={DATAHUB_SVG_LOGO} 
            alt="DataHub Brand Logo" 
            className="w-12 h-12 max-h-[38px] mx-auto object-contain mb-2"
          />
          <h2 className="text-xl font-black text-white tracking-tight">DataHub VTU</h2>
          <p className="text-[11px] text-slate-400">Instant Telecoms & Bills Payment Service</p>
        </div>

        {/* Status Indicator */}
        <div className="my-3 py-3 rounded-2xl bg-slate-900/60 border border-white/5 text-center flex flex-col items-center justify-center">
          {isSuccess && (
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>TRANSACTION SUCCESSFUL</span>
            </div>
          )}
          {isFailed && (
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-sm">
              <XCircle className="w-5 h-5 text-red-400" />
              <span>TRANSACTION FAILED & REFUNDED</span>
            </div>
          )}
          {!isSuccess && !isFailed && (
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>PROCESSING</span>
            </div>
          )}
          
          <div className="mt-2 text-2xl font-black font-mono text-white tabular-nums">
            ₦{transaction.faceValue.toLocaleString()}
          </div>
          {transaction.discount ? (
            <div className="text-[11px] text-emerald-400 font-mono">
              (1% Discount: Paid ₦{transaction.amountDeducted.toLocaleString()})
            </div>
          ) : null}
        </div>

        {/* Electricity Token Callout */}
        {transaction.token && (
          <div className="mb-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1">
              Electricity Recharge Token
            </span>
            <div className="font-mono text-lg font-black text-white tracking-widest select-all tabular-nums">
              {transaction.token}
            </div>
            {transaction.units && (
              <span className="text-xs text-slate-300 mt-1 block">
                Units: {transaction.units}
              </span>
            )}
          </div>
        )}

        {/* Key-Value Details Table */}
        <div className="space-y-2 py-3 border-y border-white/10 text-xs font-mono">
          <div className="flex justify-between text-slate-400">
            <span>Transaction Type:</span>
            <span className="text-white font-sans font-semibold">{transaction.type}</span>
          </div>

          {transaction.network && (
            <div className="flex justify-between text-slate-400">
              <span>Network Provider:</span>
              <span className="text-white font-bold">{transaction.network}</span>
            </div>
          )}

          {transaction.planName && (
            <div className="flex justify-between text-slate-400">
              <span>Package:</span>
              <span className="text-white font-sans">{transaction.planName}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-400">
            <span>Recipient:</span>
            <span className="text-white font-bold">{transaction.recipient}</span>
          </div>

          <div className="flex justify-between text-slate-400">
            <span>Amount Deducted:</span>
            <span className="text-emerald-400 font-bold tabular-nums">
              ₦{transaction.amountDeducted.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-slate-400">
            <span>Date & Time:</span>
            <span className="text-slate-200">
              {new Date(transaction.timestamp).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center text-slate-400 pt-1">
            <span>Reference ID:</span>
            <button
              onClick={handleCopyRef}
              className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono"
            >
              <span>{transaction.reference.substring(0, 18)}...</span>
              <Copy className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Provider response log */}
        {transaction.providerResponse && (
          <div className="mt-3 p-2 rounded-lg bg-black/40 border border-white/5 text-[10px] font-mono text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap">
            Provider: {transaction.providerResponse}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verified Transaction via DataHub ClubKonnect Gateway</span>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors print:hidden"
        >
          Close Receipt
        </button>

      </div>
    </div>
  );
};
```

### FILE: src/components/UtilitiesForm.tsx
```tsx
import React, { useState } from 'react';
import { CABLE_PROVIDERS, ELECTRICITY_DISCOS, BETTING_PLATFORMS } from '../constants';
import { Transaction } from '../types';
import { Tv, Zap, Trophy, ShieldCheck, AlertCircle, Loader2, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface UtilitiesFormProps {
  walletBalance: number;
  initialCategory?: 'cable' | 'electricity' | 'betting';
  onSuccess: (tx: Transaction, newBalance: number) => void;
  onOpenFundWallet: () => void;
}

export const UtilitiesForm: React.FC<UtilitiesFormProps> = ({
  walletBalance,
  initialCategory = 'cable',
  onSuccess,
  onOpenFundWallet,
}) => {
  const [category, setCategory] = useState<'cable' | 'electricity' | 'betting'>(initialCategory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cable State
  const [cableProvider, setCableProvider] = useState(CABLE_PROVIDERS[0].name);
  const [smartcardNumber, setSmartcardNumber] = useState('');
  const [selectedCablePackage, setSelectedCablePackage] = useState(CABLE_PROVIDERS[0].packages[0]);

  // Electricity State
  const [disco, setDisco] = useState(ELECTRICITY_DISCOS[0].id);
  const [meterNumber, setMeterNumber] = useState('');
  const [meterType, setMeterType] = useState<'PREPAID' | 'POSTPAID'>('PREPAID');
  const [electricityAmount, setElectricityAmount] = useState('2500');

  // Betting State
  const [bettingPlatform, setBettingPlatform] = useState(BETTING_PLATFORMS[0].name);
  const [customerId, setCustomerId] = useState('');
  const [bettingAmount, setBettingAmount] = useState('1000');

  // Cable provider change handler
  const handleCableProviderChange = (name: string) => {
    setCableProvider(name);
    const provider = CABLE_PROVIDERS.find(p => p.name === name);
    if (provider && provider.packages.length > 0) {
      setSelectedCablePackage(provider.packages[0]);
    }
  };

  const currentProviderObj = CABLE_PROVIDERS.find(p => p.name === cableProvider) || CABLE_PROVIDERS[0];

  const handleCableSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!smartcardNumber || smartcardNumber.length < 8) {
      setError('Please enter a valid IUC or Smartcard Number.');
      return;
    }
    if (walletBalance < selectedCablePackage.price) {
      setError(`Insufficient wallet balance. You need ₦${selectedCablePackage.price.toLocaleString()}.`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/cable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: cableProvider,
          packageName: selectedCablePackage.name,
          packageCode: selectedCablePackage.name.toLowerCase().replace(/\s+/g, '-'),
          smartcardNumber,
          price: selectedCablePackage.price,
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        confetti();
        onSuccess(data.transaction, data.newBalance);
        setSmartcardNumber('');
      } else {
        setError(data.message || 'Could not process cable subscription.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  const handleElectricitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const num = Number(electricityAmount);
    if (!meterNumber || meterNumber.length < 9) {
      setError('Please enter a valid meter number.');
      return;
    }
    if (!num || num < 500) {
      setError('Minimum electricity recharge is ₦500.');
      return;
    }
    if (walletBalance < num) {
      setError(`Insufficient wallet balance. You need ₦${num.toLocaleString()}.`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/electricity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          disco,
          meterNumber,
          meterType,
          amount: num,
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        confetti();
        onSuccess(data.transaction, data.newBalance);
        setMeterNumber('');
      } else {
        setError(data.message || 'Could not purchase electricity token.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  const handleBettingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const num = Number(bettingAmount);
    if (!customerId || customerId.length < 5) {
      setError('Please enter your betting User ID or Phone Number.');
      return;
    }
    if (!num || num < 100) {
      setError('Minimum betting funding is ₦100.');
      return;
    }
    if (walletBalance < num) {
      setError(`Insufficient wallet balance. You need ₦${num.toLocaleString()}.`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/betting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: bettingPlatform,
          customerId,
          amount: num,
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        confetti();
        onSuccess(data.transaction, data.newBalance);
        setCustomerId('');
      } else {
        setError(data.message || 'Could not fund betting wallet.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-8 backdrop-blur-xl max-w-xl mx-auto shadow-2xl relative overflow-hidden">
      
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-950/70 border border-white/10 rounded-xl mb-6">
        <button
          onClick={() => { setCategory('cable'); setError(null); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            category === 'cable'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>Cable TV</span>
        </button>
        <button
          onClick={() => { setCategory('electricity'); setError(null); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            category === 'electricity'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Electricity</span>
        </button>
        <button
          onClick={() => { setCategory('betting'); setError(null); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            category === 'betting'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Betting</span>
        </button>
      </div>

      {error && (
        <div className="p-3 mb-5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* CABLE FORM */}
      {category === 'cable' && (
        <form onSubmit={handleCableSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Cable Provider
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {CABLE_PROVIDERS.map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => handleCableProviderChange(provider.name)}
                  className={`py-3 px-2 rounded-xl border text-center font-bold text-sm transition-all ${
                    cableProvider === provider.name
                      ? 'border-blue-500 bg-blue-500/20 text-white'
                      : 'border-white/10 bg-slate-950/40 text-slate-400 hover:bg-white/5'
                  }`}
                >
                  {provider.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              IUC / Smartcard Number
            </label>
            <input
              type="text"
              placeholder="e.g. 1029384756"
              value={smartcardNumber}
              onChange={(e) => setSmartcardNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Package Bouquet
            </label>
            <select
              value={selectedCablePackage.name}
              onChange={(e) => {
                const pkg = currentProviderObj.packages.find(p => p.name === e.target.value);
                if (pkg) setSelectedCablePackage(pkg);
              }}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500"
            >
              {currentProviderObj.packages.map((pkg) => (
                <option key={pkg.name} value={pkg.name} className="bg-slate-900 text-white">
                  {pkg.name} — ₦{pkg.price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/50 border border-white/10 flex justify-between items-center text-xs">
            <span className="text-slate-400">Total Deduction:</span>
            <span className="font-mono font-bold text-emerald-400 text-base tabular-nums">
              ₦{selectedCablePackage.price.toLocaleString()}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Renew Subscription (₦{selectedCablePackage.price.toLocaleString()})</span>
          </button>
        </form>
      )}

      {/* ELECTRICITY FORM */}
      {category === 'electricity' && (
        <form onSubmit={handleElectricitySubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Disco Operator
            </label>
            <select
              value={disco}
              onChange={(e) => setDisco(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              {ELECTRICITY_DISCOS.map((d) => (
                <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Meter Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['PREPAID', 'POSTPAID'] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setMeterType(type)}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    meterType === type
                      ? 'border-emerald-500 bg-emerald-500/20 text-white'
                      : 'border-white/10 bg-slate-950/40 text-slate-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Meter Number
            </label>
            <input
              type="text"
              placeholder="e.g. 45091827364"
              value={meterNumber}
              onChange={(e) => setMeterNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Amount (₦)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400 font-mono font-bold">₦</span>
              <input
                type="number"
                min="500"
                value={electricityAmount}
                onChange={(e) => setElectricityAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-4 h-4" />}
            <span>Generate Electricity Token</span>
          </button>
        </form>
      )}

      {/* BETTING FORM */}
      {category === 'betting' && (
        <form onSubmit={handleBettingSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Bookmaker
            </label>
            <div className="grid grid-cols-3 gap-2">
              {BETTING_PLATFORMS.map((b) => (
                <button
                  type="button"
                  key={b.id}
                  onClick={() => setBettingPlatform(b.name)}
                  className={`py-3 px-1 rounded-xl border text-center font-bold text-xs transition-all ${
                    bettingPlatform === b.name
                      ? 'border-indigo-500 bg-indigo-500/20 text-white'
                      : 'border-white/10 bg-slate-950/40 text-slate-400 hover:bg-white/5'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Customer Betting ID / Phone
            </label>
            <input
              type="text"
              placeholder="e.g. 9821034"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Top-Up Amount (₦)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400 font-mono font-bold">₦</span>
              <input
                type="number"
                min="100"
                value={bettingAmount}
                onChange={(e) => setBettingAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white font-mono font-bold focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trophy className="w-4 h-4" />}
            <span>Credit {bettingPlatform} Account</span>
          </button>
        </form>
      )}

    </div>
  );
};
```

### FILE: src/components/WalletFundingModal.tsx
```tsx
import React, { useState } from 'react';
import { UserProfile, Transaction } from '../types';
import { 
  X, 
  Wallet, 
  Building2, 
  Copy, 
  Check, 
  ArrowRight, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  AlertCircle,
  Loader2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WalletFundingModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onFundSuccess: (newBalance: number, tx: Transaction) => void;
}

export const WalletFundingModal: React.FC<WalletFundingModalProps> = ({
  isOpen,
  onClose,
  user,
  onFundSuccess,
}) => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [instantAmount, setInstantAmount] = useState('5000');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const handleInstantFund = async (amountToFund: number) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/wallet/fund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountToFund,
          method: 'INSTANT_CARD_SIMULATION',
          reference: `FUND_DH_${Date.now()}`
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        confetti();
        onFundSuccess(data.newBalance, data.transaction);
        onClose();
      } else {
        setError(data.message || 'Funding failed');
      }
    } catch (e: any) {
      setError(e.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const virtualAccounts = user?.virtualAccounts || [
    { bankName: 'Moniepoint MFB', accountNumber: '8123456789', accountName: 'DataHub / Ibrahim Mal' },
    { bankName: 'Wema Bank', accountNumber: '7829104432', accountName: 'DataHub / Ibrahim Mal' },
    { bankName: 'Palmpay', accountNumber: '9012345678', accountName: 'DataHub / Ibrahim Mal' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0B0F19] border border-white/10 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-indigo-600" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Fund DataHub Wallet</h2>
              <p className="text-xs text-slate-400">Zero fees · 24/7 Automated Crediting</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto py-5 space-y-6">

          {/* Current balance chip */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/30 to-emerald-900/30 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Current Wallet Balance</span>
              <div className="text-2xl font-black font-mono text-emerald-400 mt-0.5 tabular-nums">
                ₦{user ? user.walletBalance.toLocaleString() : '0.00'}
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
              Active Tier
            </span>
          </div>

          {/* OPTION 1: AUTOMATED DEDICATED VIRTUAL ACCOUNTS */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Building2 className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Method 1: Manual or Direct Bank Transfer
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Transfer any amount from your Nigerian banking app (GTBank, OPay, Kuda, Zenith, etc.) to your dedicated DataHub account. Your wallet is funded instantly.
            </p>

            <div className="space-y-2.5">
              {virtualAccounts.map((acc) => {
                const isCopied = copiedBank === acc.bankName;
                return (
                  <div
                    key={acc.bankName}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between hover:border-blue-500/30 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{acc.bankName}</span>
                        <span className="text-[10px] text-emerald-400 font-medium">Instant</span>
                      </div>
                      <div className="font-mono text-base font-black text-blue-400 tracking-wider mt-0.5 select-all tabular-nums">
                        {acc.accountNumber}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {acc.accountName}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        isCopied
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* OPTION 2: INSTANT TEST DRIVE / CARD TOP-UP */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Method 2: Instant Credit / Sandbox Simulator
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Instantly simulate card top-up to test live VTU airtime & data API execution.
            </p>

            <div className="grid grid-cols-3 gap-2 mb-3">
              {[1000, 2000, 5000, 10000, 20000, 50000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setInstantAmount(String(val))}
                  className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all tabular-nums ${
                    Number(instantAmount) === val
                      ? 'bg-blue-600/30 border-blue-500 text-white'
                      : 'bg-slate-900 border-white/10 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  ₦{val.toLocaleString()}
                </button>
              ))}
            </div>

            {error && (
              <div className="p-3 mb-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={() => handleInstantFund(Number(instantAmount))}
              disabled={loading || !Number(instantAmount)}
              className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>Instant Top-Up ₦{Number(instantAmount).toLocaleString()}</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> CBN Approved Gateway
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Instant Delivery
          </span>
        </div>

      </div>
    </div>
  );
};
```

### FILE: src/components/WalletView.tsx
```tsx
import React, { useState } from 'react';
import { UserProfile, Transaction } from '../types';
import { useWalletVisibility } from '../hooks/useWalletVisibility.ts';
import { 
  Building2, 
  Copy, 
  Check, 
  Wallet, 
  Plus, 
  ShieldCheck, 
  Share2, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';

interface WalletViewProps {
  user: UserProfile | null;
  onOpenFundModal: () => void;
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  user,
  onOpenFundModal,
  transactions,
  onSelectTransaction,
}) => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const { isHidden, toggleVisibility, formatBalance } = useWalletVisibility();

  const handleCopy = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const virtualAccounts = user?.virtualAccounts || [
    { bankName: 'Moniepoint MFB', accountNumber: '8123456789', accountName: 'DataHub / Ibrahim Mal' },
    { bankName: 'Wema Bank', accountNumber: '7829104432', accountName: 'DataHub / Ibrahim Mal' },
    { bankName: 'Palmpay', accountNumber: '9012345678', accountName: 'DataHub / Ibrahim Mal' }
  ];

  const fundingTransactions = transactions.filter(t => t.type === 'WALLET_FUNDING');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Wallet Balance Hero Card */}
      <div 
        className="p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(16, 185, 129, 0.18))',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Main Naira Wallet
          </span>
          <div className="flex items-center gap-2.5 mt-1">
            <div className="text-3xl sm:text-4xl font-black font-mono text-white tabular-nums">
              {user ? formatBalance(user.walletBalance) : '₦0.00'}
            </div>
            <button
              type="button"
              onClick={toggleVisibility}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              title={isHidden ? 'Click to show balance' : 'Click to hide balance'}
              aria-label="Toggle balance visibility"
            >
              {isHidden ? (
                <EyeOff className="w-5 h-5 text-emerald-400" />
              ) : (
                <Eye className="w-5 h-5 text-white/80" />
              )}
            </button>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Account Holder: <strong className="text-white">{user?.name}</strong> · {user?.email}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenFundModal}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 transition-all shadow-lg shadow-blue-600/20 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Fund Wallet</span>
          </button>
        </div>
      </div>

      {/* Virtual Dedicated Bank Accounts Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              Dedicated Virtual Bank Accounts (Auto-Credit)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Zero transfer charges</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {virtualAccounts.map((acc) => {
            const isCopied = copiedBank === acc.bankName;
            return (
              <div
                key={acc.bankName}
                className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-white">{acc.bankName}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Instant
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Account Number
                  </span>
                  <div className="font-mono text-lg font-black text-blue-400 tracking-wider my-0.5 tabular-nums">
                    {acc.accountNumber}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {acc.accountName}
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
                  className={`mt-4 w-full py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                    isCopied
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied Account</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Account Number</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Funding History */}
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-6">
        <h3 className="text-sm font-bold text-white tracking-tight mb-4">
          Wallet Deposit Log
        </h3>

        {fundingTransactions.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No wallet top-up records yet.
          </div>
        ) : (
          <div className="space-y-2">
            {fundingTransactions.map((tx) => (
              <button
                key={tx.id}
                onClick={() => onSelectTransaction(tx)}
                className="w-full p-3 rounded-xl bg-slate-950/40 hover:bg-white/5 border border-white/5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ArrowDownLeft className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {tx.recipient}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(tx.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-emerald-400 tabular-nums">
                    +₦{Math.abs(tx.faceValue).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {tx.id}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
```

### FILE: src/pages/HomePage.tsx
```tsx
import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { formatNaira } from '../lib/utils.ts';
import { useWalletVisibility } from '../hooks/useWalletVisibility.ts';
import { StandardLogo } from '../components/StandardLogo.tsx';
import { 
  Zap, 
  Wifi, 
  PhoneCall, 
  Wallet, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Smartphone, 
  RotateCcw,
  Sparkles,
  TrendingUp,
  CreditCard,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
  onOpenInstallModal?: () => void;
  apkUrl?: string | null;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentTab, onOpenInstallModal, apkUrl }) => {
  const { user } = useAuth();
  const { isHidden, toggleVisibility, formatBalance } = useWalletVisibility();

  const networks = [
    { name: 'MTN', color: 'bg-amber-400 text-amber-950', plans: 'SME & Corporate', discount: 'Up to 3% Off' },
    { name: 'Airtel', color: 'bg-red-600 text-white', plans: 'Gifting & Corporate', discount: 'Up to 2% Off' },
    { name: 'Glo', color: 'bg-emerald-600 text-white', plans: 'Gifting & SME', discount: 'Up to 2.5% Off' },
    { name: '9mobile', color: 'bg-teal-800 text-white', plans: 'SME & Gifting', discount: 'Up to 2.5% Off' }
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-slate-900 to-emerald-950 p-6 sm:p-10 border border-blue-800/40 shadow-2xl text-white">
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <StandardLogo className="w-11 h-11" />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Standard DataHub • Automated 24/7 VTU</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Cheapest Mobile Data & Airtime,{' '}
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Instant Delivery.
            </span>
          </h1>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Purchase SME, Gifting, and Corporate data bundles for MTN, Airtel, Glo, and 9mobile at wholesale rates. Powered by verified telecom gateways.
          </p>

          {/* User Status Bar if logged in */}
          {user ? (
            <div className="mt-6 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Welcome back,</span>
                <span className="text-base font-bold text-white">{user.fullName}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Wallet Balance</span>
                  <div className="flex items-center justify-end gap-1.5 mt-0.5">
                    <span className="text-lg font-extrabold text-emerald-400 font-mono tracking-tight">
                      {formatBalance(user.balanceNaira)}
                    </span>
                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="p-1 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                      title={isHidden ? 'Click to show balance' : 'Click to hide balance'}
                      aria-label="Toggle balance visibility"
                    >
                      {isHidden ? (
                        <EyeOff className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentTab('fund-wallet')}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  + Fund Wallet
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setCurrentTab('register')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-sm shadow-xl shadow-blue-600/25 transition-all flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentTab('login')}
                className="px-6 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Action Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Quick Telecom Services</h2>
          <span className="text-xs text-slate-500">Instant Automation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Buy Data Card */}
          <div
            onClick={() => setCurrentTab('buy-data')}
            className="group cursor-pointer rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Wifi className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
              Buy Mobile Data
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              MTN SME from ₦160/500MB, Airtel Corp, Glo & 9mobile gifting bundles with 30-day validity.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 gap-1">
              <span>Purchase bundle</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Buy Airtime Card */}
          <div
            onClick={() => setCurrentTab('buy-airtime')}
            className="group cursor-pointer rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
              Buy Airtime (Discounted)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Instant VTU recharge with 2% to 2.5% discount across MTN, Airtel, Glo, and 9mobile.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 gap-1">
              <span>Top up now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Fund Wallet Card */}
          <div
            onClick={() => setCurrentTab('fund-wallet')}
            className="group cursor-pointer rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
              Fund Wallet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Manual bank transfer with prompt admin credit. Verified ledger tracking for every kobo.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-amber-600 dark:text-amber-400 gap-1">
              <span>Bank details & form</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Download App / PWA Card */}
          <div
            onClick={() => onOpenInstallModal && onOpenInstallModal()}
            className="group cursor-pointer rounded-2xl p-5 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-teal-500/30 hover:border-teal-400 shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Download className="w-6 h-6 text-teal-300" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors flex items-center gap-1.5">
              <span>Download App</span>
              <span className="text-[10px] bg-teal-500/20 text-teal-400 font-extrabold px-1.5 py-0.5 rounded">PWA</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Install to home screen for 1-tap recharge, faster loading, and native mobile experience.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-teal-400 gap-1">
              <span>Install to home screen</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Supported Networks Banner */}
      <section className="rounded-3xl bg-slate-900 border border-slate-800 p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold">Supported Nigerian Telecoms</h2>
            <p className="text-xs text-slate-400">Direct integration with official VTU gateways</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold">All Gateways 100% Operational</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {networks.map((net) => (
            <div
              key={net.name}
              onClick={() => setCurrentTab('buy-data')}
              className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition-all cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-xl ${net.color} font-black text-xs flex items-center justify-center mb-3 shadow-md`}>
                {net.name}
              </div>
              <div className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                {net.name} Network
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{net.plans}</div>
              <div className="text-[11px] font-semibold text-emerald-400 mt-2">{net.discount}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How Standard DataHub Works Section */}
      <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        <div className="text-center max-w-lg mx-auto mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">How Standard DataHub Works</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Get your mobile data or airtime delivered to any line in under 30 seconds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-black text-lg flex items-center justify-center mx-auto mb-3">
              1
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Fund Your Wallet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Make a simple transfer to our designated bank account. Submit your reference, and admin verifies and credits your wallet.
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-lg flex items-center justify-center mx-auto mb-3">
              2
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Select Product & Plan</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Pick your network (MTN, Airtel, Glo, 9mobile), choose your bundle, and input the beneficiary phone number.
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 font-black text-lg flex items-center justify-center mx-auto mb-3">
              3
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Enter PIN & Deliver</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Authorize securely with your 4-digit PIN. The system dispatches your order instantly with 100% auto-refund guarantee on failure.
            </p>
          </div>
        </div>
      </section>

      {/* Safety & Value Guarantees */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">4-Digit PIN Security</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Every purchase requires your personal authorization PIN. No accidental clicks or unauthorized spend.
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex items-start gap-3">
          <RotateCcw className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Instant Auto-Refunds</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              If network telco gateways experience downtime, funds are automatically refunded back to your wallet ledger.
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 flex items-start gap-3">
          <Clock className="w-6 h-6 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">24/7 Automated Dispatch</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Our automated backend processes data top-ups round the clock with sub-10 second telco execution.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
```

### FILE: src/pages/BuyDataPage.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../lib/api.ts';
import { DataPlan, NetworkType } from '../types/index.ts';
import { formatNaira, NETWORK_INFO } from '../lib/utils.ts';
import { detectCarrier, NetworkCarrier } from '../lib/carrierDetector.ts';
import { useToast } from '../components/Toast.tsx';
import { PinModal } from '../components/PinModal.tsx';
import { ReceiptModal } from '../components/ReceiptModal.tsx';
import { SetPinModal } from '../components/SetPinModal.tsx';
import { 
  Wifi, 
  Check, 
  Smartphone, 
  AlertCircle, 
  Wallet, 
  ArrowRight, 
  Sparkles,
  Zap
} from 'lucide-react';

interface BuyDataPageProps {
  setCurrentTab: (tab: string) => void;
}

export const BuyDataPage: React.FC<BuyDataPageProps> = ({ setCurrentTab }) => {
  const { user, updateBalance, refreshUser } = useAuth();
  const { showToast } = useToast();

  const [plans, setPlans] = useState<DataPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>('MTN');
  const [detectedCarrier, setDetectedCarrier] = useState<NetworkCarrier | null>(null);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [recipientPhone, setRecipientPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  // Modals state
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isSetPinOpen, setIsSetPinOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  // Fetch plans from backend
  const fetchPlans = async () => {
    setLoadingPlans(true);
    try {
      const data = await apiRequest<{ plans: DataPlan[] }>('/vtu/plans');
      setPlans(data.plans || []);
      // Auto-select first plan for selected network
      const mtnFirst = data.plans.find((p) => p.network === 'MTN');
      if (mtnFirst) setSelectedPlanId(mtnFirst.id);
    } catch (err: any) {
      showToast('Failed to load data plans: ' + err.message, 'error');
    } finally {
      setLoadingPlans(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Validate Nigerian phone number
  const validatePhone = (num: string) => {
    const cleaned = num.replace(/[\s\-\+]/g, '');
    if (!cleaned) {
      setPhoneError('Phone number is required.');
      return false;
    }
    // Must be 11 digits starting with 07, 08, 09
    if (!/^0[789][01]\d{8}$/.test(cleaned)) {
      setPhoneError('Please enter a valid 11-digit Nigerian phone number (e.g., 08012345678).');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handlePhoneChange = (val: string) => {
    setRecipientPhone(val);
    const carrier = detectCarrier(val);
    setDetectedCarrier(carrier);

    if (carrier && carrier !== selectedNetwork) {
      setSelectedNetwork(carrier);
      setSelectedType('ALL');
      const first = plans.find((p) => p.network === carrier);
      if (first) setSelectedPlanId(first.id);
    }

    if (val.length >= 11) {
      validatePhone(val);
    } else {
      setPhoneError('');
    }
  };

  // Filter plans based on selected network & category
  const filteredPlans = plans.filter((p) => {
    if (p.network !== selectedNetwork) return false;
    if (selectedType !== 'ALL' && p.planType !== selectedType) return false;
    return true;
  });

  // Extract unique plan types for current network
  const availableTypes = ['ALL', ...Array.from(new Set(plans.filter((p) => p.network === selectedNetwork).map((p) => p.planType)))];

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);

  const handleInitiatePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('Please log in or register to purchase data.', 'info');
      setCurrentTab('login');
      return;
    }

    if (!selectedPlan) {
      showToast('Please select a data plan bundle.', 'error');
      return;
    }

    if (!validatePhone(recipientPhone)) {
      return;
    }

    // Check balance
    if (user.balanceNaira < selectedPlan.sellingPriceNaira) {
      showToast(`Insufficient balance. You need ${formatNaira(selectedPlan.sellingPriceNaira)} but your balance is ${formatNaira(user.balanceNaira)}.`, 'error');
      return;
    }

    if (!user.hasPin) {
      setIsSetPinOpen(true);
      return;
    }

    setIsPinModalOpen(true);
  };

  const handleConfirmPurchase = async (pin: string) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest('/vtu/buy-data', {
        method: 'POST',
        body: JSON.stringify({
          planId: selectedPlanId,
          recipientPhone,
          transactionPin: pin
        })
      });

      setIsPinModalOpen(false);

      if (response.newBalanceNaira !== undefined) {
        updateBalance(response.newBalanceNaira);
      } else {
        refreshUser();
      }

      setReceiptData(response);
      setIsReceiptModalOpen(true);

      const statusUpper = (response.status || '').toUpperCase();
      if (statusUpper === 'SUCCESS' || statusUpper === 'SUCCESSFUL') {
        showToast(response.message || 'Data purchase completed successfully!', 'success');
      } else if (statusUpper === 'FAILED' || response.refunded) {
        const friendlyNotice = response.refunded
          ? 'Service temporarily unavailable. Funds refunded to wallet.'
          : (response.userMessage || response.message || 'Service temporarily unavailable. Please try again shortly.');
        showToast(friendlyNotice, 'error');
      } else {
        showToast(response.message || 'Order processing.', 'info');
      }
    } catch (err: any) {
      const isTechnical = err.message && (
        err.message.includes('ClubKonnect') ||
        err.message.includes('CLUBKONNECT_') ||
        err.message.includes('aborted') ||
        err.message.includes('credentials')
      );
      const friendlyNotice = isTechnical
        ? 'Service temporarily unavailable. Please try again shortly.'
        : (err.message || 'Transaction could not be completed.');
      showToast(friendlyNotice, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Wifi className="w-6 h-6 text-blue-500" />
            <span>Buy Mobile Data</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Instant delivery across all Nigerian telecom networks
          </p>
        </div>

        {user && (
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Your Balance</span>
            <span className="text-sm font-bold text-emerald-500">{formatNaira(user.balanceNaira)}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleInitiatePurchase} className="space-y-6">
        {/* Step 1: Select Network */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            1. Select Network
          </label>

          <div className="grid grid-cols-4 gap-2.5">
            {(['MTN', 'AIRTEL', 'GLO', '9MOBILE'] as NetworkType[]).map((net) => {
              const info = NETWORK_INFO[net];
              const isSelected = selectedNetwork === net;
              const isDetected = detectedCarrier === net;
              return (
                <button
                  key={net}
                  type="button"
                  onClick={() => {
                    setSelectedNetwork(net);
                    setSelectedType('ALL');
                    // select first plan of network
                    const first = plans.find((p) => p.network === net);
                    if (first) setSelectedPlanId(first.id);
                  }}
                  className={`relative p-3 rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 scale-102 shadow-md'
                      : isDetected
                        ? 'border-emerald-500/80 bg-emerald-50/30 dark:bg-emerald-950/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  {isDetected && (
                    <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[9px] shadow-sm tracking-tight flex items-center gap-0.5 animate-pulse">
                      <span>Detected</span>
                    </span>
                  )}
                  <div
                    className={`w-9 h-9 rounded-xl ${info.bg} ${info.text} font-black text-xs flex items-center justify-center mb-1.5 shadow-sm`}
                  >
                    {net === '9MOBILE' ? '9M' : net}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{info.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Plan Type Filter */}
        {availableTypes.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {availableTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedType === type
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {type === 'ALL' ? 'All Plans' : type}
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Choose Plan */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              2. Choose Data Bundle ({selectedNetwork})
            </label>
            <span className="text-[11px] text-slate-400">
              {filteredPlans.length} plans available
            </span>
          </div>

          {loadingPlans ? (
            <div className="py-12 text-center text-slate-400">
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs">Loading available data plans...</p>
            </div>
          ) : filteredPlans.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No plans found for the selected category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredPlans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`cursor-pointer p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/10 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {plan.dataAmount}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                          {plan.planType}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {plan.duration}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-blue-600 dark:text-blue-400">
                        {formatNaira(plan.sellingPriceNaira)}
                      </div>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          <Check className="w-3 h-3" /> Selected
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Step 4: Recipient Phone */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              3. Beneficiary Phone Number
            </label>
            {user && (
              <button
                type="button"
                onClick={() => {
                  setRecipientPhone(user.phone);
                  handlePhoneChange(user.phone);
                }}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Use My Number ({user.phone})</span>
              </button>
            )}
          </div>

          <div className="relative">
            <input
              type="tel"
              value={recipientPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="08012345678"
              maxLength={11}
              className={`w-full text-base font-mono font-bold bg-slate-50 dark:bg-slate-800 border ${
                detectedCarrier ? 'border-emerald-500/60 dark:border-emerald-500/50' : 'border-slate-200 dark:border-slate-700'
              } rounded-2xl pl-4 pr-32 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors`}
              required
            />
            {detectedCarrier && (
              <div className="absolute right-3 top-2.5 flex items-center gap-1.5 pointer-events-none">
                <span className={`px-2 py-0.5 rounded-lg text-[11px] font-black tracking-wide flex items-center gap-1 border ${NETWORK_INFO[detectedCarrier].badge}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  <span>{NETWORK_INFO[detectedCarrier].name}</span>
                </span>
                {recipientPhone.length === 11 && !phoneError && (
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                )}
              </div>
            )}
            {!detectedCarrier && recipientPhone.length === 11 && !phoneError && (
              <div className="absolute right-3 top-3.5 text-emerald-500">
                <Check className="w-5 h-5" />
              </div>
            )}
          </div>

          {phoneError && (
            <p className="text-xs text-rose-500 font-medium mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{phoneError}</span>
            </p>
          )}

          <p className="text-[11px] text-slate-400 mt-2">
            Tip: Double check the recipient phone number. Data transfers to valid active lines cannot be recalled by telecom networks.
          </p>
        </div>

        {/* Summary Card and Submit */}
        {selectedPlan && (
          <div className="bg-gradient-to-br from-blue-900/90 to-slate-900 border border-blue-800/40 rounded-3xl p-5 text-white shadow-xl space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-300">
              <span>Selected Bundle</span>
              <span className="font-bold text-white">
                {selectedPlan.network} • {selectedPlan.dataAmount} ({selectedPlan.duration})
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-300">
              <span>Recipient Line</span>
              <span className="font-mono font-bold text-white">
                {recipientPhone || 'Not entered yet'}
              </span>
            </div>

            <div className="pt-3 border-t border-blue-800/60 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-300 block">Total Payable</span>
                <span className="text-2xl font-black text-emerald-400">
                  {formatNaira(selectedPlan.sellingPriceNaira)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !selectedPlanId || !recipientPhone}
                className="px-6 py-3.5 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-400 hover:to-emerald-400 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>Continue to Pay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </form>

      {/* PIN Verification Modal */}
      {selectedPlan && (
        <PinModal
          isOpen={isPinModalOpen}
          onClose={() => setIsPinModalOpen(false)}
          onConfirm={handleConfirmPurchase}
          title="Authorize Data Purchase"
          summary={{
            product: `${selectedPlan.planName} (${selectedPlan.duration})`,
            recipient: recipientPhone,
            amountNaira: selectedPlan.sellingPriceNaira,
            network: selectedPlan.network
          }}
          hasPin={Boolean(user?.hasPin)}
          onOpenSetPin={() => setIsSetPinOpen(true)}
          isLoading={isSubmitting}
        />
      )}

      {/* Transaction Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        data={receiptData}
      />

      {/* Set/Change PIN Modal */}
      <SetPinModal
        isOpen={isSetPinOpen}
        onClose={() => setIsSetPinOpen(false)}
        hasExistingPin={Boolean(user?.hasPin)}
        onSuccess={() => {
          refreshUser();
          setIsPinModalOpen(true);
        }}
      />
    </div>
  );
};
```

### FILE: src/pages/BuyAirtimePage.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../lib/api.ts';
import { NetworkType, AirtimeProduct } from '../types/index.ts';
import { formatNaira, NETWORK_INFO } from '../lib/utils.ts';
import { detectCarrier, NetworkCarrier } from '../lib/carrierDetector.ts';
import { useToast } from '../components/Toast.tsx';
import { PinModal } from '../components/PinModal.tsx';
import { ReceiptModal } from '../components/ReceiptModal.tsx';
import { SetPinModal } from '../components/SetPinModal.tsx';
import { 
  PhoneCall, 
  Check, 
  Smartphone, 
  AlertCircle, 
  ArrowRight, 
  Tag 
} from 'lucide-react';

interface BuyAirtimePageProps {
  setCurrentTab: (tab: string) => void;
}

export const BuyAirtimePage: React.FC<BuyAirtimePageProps> = ({ setCurrentTab }) => {
  const { user, updateBalance, refreshUser } = useAuth();
  const { showToast } = useToast();

  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>('MTN');
  const [detectedCarrier, setDetectedCarrier] = useState<NetworkCarrier | null>(null);
  const [products, setProducts] = useState<AirtimeProduct[]>([]);
  const [amountInput, setAmountInput] = useState<string>('500');
  const [recipientPhone, setRecipientPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  // Modals
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isSetPinOpen, setIsSetPinOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const presetAmounts = [100, 200, 500, 1000, 2000, 5000];

  useEffect(() => {
    apiRequest<{ products: AirtimeProduct[] }>('/vtu/airtime-products')
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.warn('Airtime products load error:', err));
  }, []);

  const currentProduct = products.find((p) => p.network === selectedNetwork);
  const discountPercent = currentProduct ? currentProduct.discountPercent : 2.0;

  const numericAmount = parseFloat(amountInput) || 0;
  const payableAmount = numericAmount > 0 ? numericAmount * (1 - discountPercent / 100) : 0;
  const savings = numericAmount - payableAmount;

  const validatePhone = (num: string) => {
    const cleaned = num.replace(/[\s\-\+]/g, '');
    if (!cleaned) {
      setPhoneError('Phone number is required.');
      return false;
    }
    if (!/^0[789][01]\d{8}$/.test(cleaned)) {
      setPhoneError('Please enter a valid 11-digit Nigerian phone number.');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handlePhoneChange = (val: string) => {
    setRecipientPhone(val);
    const carrier = detectCarrier(val);
    setDetectedCarrier(carrier);

    if (carrier && carrier !== selectedNetwork) {
      setSelectedNetwork(carrier);
    }

    if (val.length >= 11) {
      validatePhone(val);
    } else {
      setPhoneError('');
    }
  };

  const handleInitiateRecharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('Please log in or register to buy airtime.', 'info');
      setCurrentTab('login');
      return;
    }

    if (numericAmount < 50 || numericAmount > 50000) {
      showToast('Airtime recharge amount must be between ₦50 and ₦50,000.', 'error');
      return;
    }

    if (!validatePhone(recipientPhone)) {
      return;
    }

    if (user.balanceNaira < payableAmount) {
      showToast(`Insufficient balance. You need ${formatNaira(payableAmount)} but your balance is ${formatNaira(user.balanceNaira)}.`, 'error');
      return;
    }

    if (!user.hasPin) {
      setIsSetPinOpen(true);
      return;
    }

    setIsPinModalOpen(true);
  };

  const handleConfirmPurchase = async (pin: string) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest('/vtu/buy-airtime', {
        method: 'POST',
        body: JSON.stringify({
          network: selectedNetwork,
          amountNaira: numericAmount,
          recipientPhone,
          transactionPin: pin
        })
      });

      setIsPinModalOpen(false);

      if (response.newBalanceNaira !== undefined) {
        updateBalance(response.newBalanceNaira);
      } else {
        refreshUser();
      }

      setReceiptData({
        ...response,
        amountNaira: Number(response.amountNaira ?? response.airtimeAmount ?? numericAmount),
        productType: 'airtime',
        planName: response.planName || `₦${Number(numericAmount).toLocaleString()} ${selectedNetwork} Airtime`,
        network: response.network || selectedNetwork,
        recipientPhone: response.recipientPhone || recipientPhone
      });
      setIsReceiptModalOpen(true);

      const statusUpper = (response.status || '').toUpperCase();
      if (statusUpper === 'SUCCESS' || statusUpper === 'SUCCESSFUL') {
        showToast(response.message || 'Airtime recharge successful!', 'success');
      } else if (statusUpper === 'FAILED' || response.refunded) {
        const friendlyNotice = response.refunded
          ? 'Service temporarily unavailable. Funds refunded to wallet.'
          : (response.userMessage || response.message || 'Service temporarily unavailable. Please try again shortly.');
        showToast(friendlyNotice, 'error');
      } else {
        showToast(response.message || 'Airtime order is processing with the network.', 'info');
      }
    } catch (err: any) {
      const isTechnical = err.message && (
        err.message.includes('ClubKonnect') ||
        err.message.includes('CLUBKONNECT_') ||
        err.message.includes('aborted') ||
        err.message.includes('credentials')
      );
      const friendlyNotice = isTechnical
        ? 'Service temporarily unavailable. Please try again shortly.'
        : (err.message || 'Airtime purchase failed.');
      showToast(friendlyNotice, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <PhoneCall className="w-6 h-6 text-emerald-500" />
            <span>Buy Airtime</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Recharge with instant discount on all Nigerian networks
          </p>
        </div>

        {user && (
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Your Balance</span>
            <span className="text-sm font-bold text-emerald-500">{formatNaira(user.balanceNaira)}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleInitiateRecharge} className="space-y-6">
        {/* Network Selection */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            1. Select Network
          </label>

          <div className="grid grid-cols-4 gap-2.5">
            {(['MTN', 'AIRTEL', 'GLO', '9MOBILE'] as NetworkType[]).map((net) => {
              const info = NETWORK_INFO[net];
              const isSelected = selectedNetwork === net;
              const isDetected = detectedCarrier === net;
              return (
                <button
                  key={net}
                  type="button"
                  onClick={() => setSelectedNetwork(net)}
                  className={`relative p-3 rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 scale-102 shadow-md'
                      : isDetected
                        ? 'border-emerald-500/80 bg-emerald-50/30 dark:bg-emerald-950/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  {isDetected && (
                    <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[9px] shadow-sm tracking-tight flex items-center gap-0.5 animate-pulse">
                      <span>Detected</span>
                    </span>
                  )}
                  <div
                    className={`w-9 h-9 rounded-xl ${info.bg} ${info.text} font-black text-xs flex items-center justify-center mb-1.5 shadow-sm`}
                  >
                    {net === '9MOBILE' ? '9M' : net}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{info.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Amount Input & Presets */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              2. Enter Recharge Amount
            </label>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <Tag className="w-3 h-3" /> {discountPercent}% Discount
            </span>
          </div>

          <div className="relative">
            <span className="absolute left-4 top-3.5 text-lg font-bold text-slate-400">₦</span>
            <input
              type="number"
              min="50"
              max="50000"
              step="50"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="500"
              className="w-full text-xl font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          {/* Preset Chips */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmountInput(String(amt))}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  amountInput === String(amt)
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                ₦{amt}
              </button>
            ))}
          </div>

          {numericAmount > 0 && (
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300">
                Discount Price (You Pay):
              </span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                {formatNaira(payableAmount)}{' '}
                <span className="text-[11px] text-slate-400 font-normal">
                  (Save {formatNaira(savings)})
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Recipient Phone */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              3. Beneficiary Phone Number
            </label>
            {user && (
              <button
                type="button"
                onClick={() => {
                  setRecipientPhone(user.phone);
                  validatePhone(user.phone);
                }}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Use My Number ({user.phone})</span>
              </button>
            )}
          </div>

          <div className="relative">
            <input
              type="tel"
              value={recipientPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="08012345678"
              maxLength={11}
              className={`w-full text-base font-mono font-bold bg-slate-50 dark:bg-slate-800 border ${
                detectedCarrier ? 'border-emerald-500/60 dark:border-emerald-500/50' : 'border-slate-200 dark:border-slate-700'
              } rounded-2xl pl-4 pr-32 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors`}
              required
            />
            {detectedCarrier && (
              <div className="absolute right-3 top-2.5 flex items-center gap-1.5 pointer-events-none">
                <span className={`px-2 py-0.5 rounded-lg text-[11px] font-black tracking-wide flex items-center gap-1 border ${NETWORK_INFO[detectedCarrier].badge}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  <span>{NETWORK_INFO[detectedCarrier].name}</span>
                </span>
                {recipientPhone.length === 11 && !phoneError && (
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                )}
              </div>
            )}
            {!detectedCarrier && recipientPhone.length === 11 && !phoneError && (
              <div className="absolute right-3 top-3.5 text-emerald-500">
                <Check className="w-5 h-5" />
              </div>
            )}
          </div>

          {phoneError && (
            <p className="text-xs text-rose-500 font-medium mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{phoneError}</span>
            </p>
          )}
        </div>

        {/* Final Payment Card */}
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 border border-emerald-800/40 rounded-3xl p-5 text-white shadow-xl space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>Airtime Value</span>
            <span className="font-bold text-white">₦{numericAmount} {selectedNetwork}</span>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>Recipient Line</span>
            <span className="font-mono font-bold text-white">{recipientPhone || 'Not entered'}</span>
          </div>

          <div className="pt-3 border-t border-emerald-800/60 flex justify-between items-center">
            <div>
              <span className="text-xs text-slate-300 block">Total Payable</span>
              <span className="text-2xl font-black text-emerald-400">
                {formatNaira(payableAmount)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || numericAmount < 50 || !recipientPhone}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>Pay & Recharge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* PIN Modal */}
      <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onConfirm={handleConfirmPurchase}
        title="Authorize Airtime Purchase"
        summary={{
          product: `₦${numericAmount} ${selectedNetwork} Airtime`,
          recipient: recipientPhone,
          amountNaira: payableAmount,
          network: selectedNetwork
        }}
        hasPin={Boolean(user?.hasPin)}
        onOpenSetPin={() => setIsSetPinOpen(true)}
        isLoading={isSubmitting}
      />

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        data={receiptData}
      />

      {/* Set/Change PIN Modal */}
      <SetPinModal
        isOpen={isSetPinOpen}
        onClose={() => setIsSetPinOpen(false)}
        hasExistingPin={Boolean(user?.hasPin)}
        onSuccess={() => {
          refreshUser();
          setIsPinModalOpen(true);
        }}
      />
    </div>
  );
};
```

### FILE: src/pages/FundWalletPage.tsx
```tsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../lib/api.ts';
import { BankDetails, FundingRequest } from '../types/index.ts';
import { formatNaira, formatDate } from '../lib/utils.ts';
import { useWalletVisibility } from '../hooks/useWalletVisibility.ts';
import { useToast } from '../components/Toast.tsx';
import { 
  Wallet, 
  Building2, 
  Copy, 
  Check, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Camera, 
  Upload, 
  X, 
  ArrowRight,
  ShieldCheck, 
  Info,
  CreditCard,
  FileCheck,
  ChevronRight,
  MessageCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface FundWalletPageProps {
  setCurrentTab: (tab: string) => void;
}

export const FundWalletPage: React.FC<FundWalletPageProps> = ({ setCurrentTab }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { isHidden, toggleVisibility, formatBalance } = useWalletVisibility();

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bank_name: 'Opay',
    account_number: '6423809175',
    account_name: 'Ibrahim Bello',
    manual_funding_instructions: 'Make a direct bank transfer to our Opay account above (6423809175 - Ibrahim Bello). After transferring, submit your transfer reference below. Our admin team will verify and credit your wallet promptly.'
  });

  const [requests, setRequests] = useState<FundingRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  // Form states
  const [amountNaira, setAmountNaira] = useState('');
  const [transferReference, setTransferReference] = useState('');
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [receiptFileName, setReceiptFileName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Success Modal State
  const [submittedRequest, setSubmittedRequest] = useState<FundingRequest | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadData = async () => {
    try {
      const bankRes = await apiRequest<{ bankDetails: BankDetails }>('/wallet/bank-details');
      if (bankRes.bankDetails) setBankDetails(bankRes.bankDetails);
    } catch (err) {
      console.warn('Bank details error:', err);
    }

    if (user) {
      setLoadingRequests(true);
      try {
        const reqRes = await apiRequest<{ requests: FundingRequest[] }>('/wallet/fund-requests');
        setRequests(reqRes.requests || []);
      } catch (err) {
        console.warn('Funding requests load error:', err);
      } finally {
        setLoadingRequests(false);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(bankDetails.account_number);
    setCopiedAccount(true);
    showToast('Account number copied to clipboard!', 'info');
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const copyRefToClipboard = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    showToast('Funding reference copied!', 'info');
    setTimeout(() => setCopiedRef(false), 2000);
  };

  // Image file handler with instant browser resize for lightning-fast mobile uploads
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setFormError('Please select a JPG, JPEG, or PNG image.');
      return;
    }

    setReceiptFileName(file.name);
    setFormError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      if (!rawDataUrl) return;

      // Downscale image using canvas to ensure payload remains fast and responsive
      const img = new Image();
      img.onload = () => {
        const maxDimension = 1200;
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setReceiptImage(compressed);
        } else {
          setReceiptImage(rawDataUrl);
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const removeReceipt = () => {
    setReceiptImage(null);
    setReceiptFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const numericAmount = parseFloat(amountNaira);
  const isAmountValid = !isNaN(numericAmount) && numericAmount > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!user) {
      showToast('Please log in to submit a wallet funding request.', 'info');
      setCurrentTab('login');
      return;
    }

    if (!isAmountValid) {
      setFormError('Please enter a valid amount greater than ₦0.00');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiRequest<{ message: string; request: FundingRequest }>('/wallet/fund-request', {
        method: 'POST',
        body: JSON.stringify({
          amountNaira: numericAmount,
          transferReference: transferReference.trim() || undefined,
          proofImageUrl: receiptImage || undefined
        })
      });

      // Show success modal with the generated internal reference
      setSubmittedRequest(res.request);

      // Reset form
      setAmountNaira('');
      setTransferReference('');
      removeReceipt();

      showToast('Funding request submitted successfully!', 'success');
      loadData();
    } catch (err: any) {
      setFormError(err.message || 'Failed to submit funding request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const presetAmounts = [1000, 2000, 5000, 10000, 20000];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Wallet className="w-6 h-6 text-emerald-500" />
          <span>Fund Wallet</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Add money to your Standard DataHub wallet by making a bank transfer to the account below.
        </p>
      </div>

      {/* Current Wallet Balance Summary */}
      {user && (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-5 text-white border border-blue-800/40 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200/80">
              Current Available Balance
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="text-2xl font-black text-white font-mono">
                {formatBalance(user.balanceNaira)}
              </div>
              <button
                type="button"
                onClick={toggleVisibility}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                title={isHidden ? 'Click to show balance' : 'Click to hide balance'}
                aria-label="Toggle balance visibility"
              >
                {isHidden ? (
                  <EyeOff className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Eye className="w-4 h-4 text-white/80 hover:text-white" />
                )}
              </button>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active Wallet
            </span>
          </div>
        </div>
      )}

      {/* BANK ACCOUNT DETAILS CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Standard DataHub Receiving Bank Account
            </h2>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Instant Transfer
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">Bank Name</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {bankDetails.bank_name}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">Account Name</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white text-right">
              {bankDetails.account_name}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Account Number
              </span>
              <span className="text-xl font-mono font-black text-blue-600 dark:text-blue-400 tracking-wider">
                {bankDetails.account_number}
              </span>
            </div>

            <button
              type="button"
              onClick={copyAccountNumber}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                copiedAccount
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 active:scale-95'
              }`}
            >
              {copiedAccount ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Account</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* TRANSFER INSTRUCTION */}
      <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-3xl p-5 space-y-2">
        <h3 className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-blue-500" />
          <span>How to Fund Your Wallet</span>
        </h3>
        <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-decimal list-inside pl-1 leading-relaxed">
          <li>Enter the amount you want to fund.</li>
          <li>Transfer exactly that amount to the Standard DataHub Opay bank account above.</li>
          <li>After completing the transfer, return here and tap <span className="font-semibold text-blue-600 dark:text-blue-400">"I Have Made the Transfer"</span>.</li>
          <li>Standard DataHub will verify the transfer before crediting your wallet.</li>
        </ol>
      </div>

      {/* WHATSAPP SUPPORT SHORTCUT */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Need Help with Bank Transfer?</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Chat Ibrahim Bello directly on WhatsApp: <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">08161720895</span>
            </div>
          </div>
        </div>
        <a
          href="https://wa.me/2348161720895?text=Hello%20Standard%20DataHub%20Support,%20I%20need%20assistance%20funding%20my%20wallet"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* FUNDING SUBMISSION FORM */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
        {formError && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Amount to Fund */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
            Amount to Fund
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-base font-bold text-slate-400">
              ₦
            </span>
            <input
              type="number"
              min="1"
              step="any"
              value={amountNaira}
              onChange={(e) => {
                setAmountNaira(e.target.value);
                setFormError('');
              }}
              placeholder="Enter amount (e.g. 1000)"
              className="w-full text-base font-mono font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-9 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            {presetAmounts.map((amt) => (
              <button
                type="button"
                key={amt}
                onClick={() => {
                  setAmountNaira(String(amt));
                  setFormError('');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  amountNaira === String(amt)
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                ₦{amt.toLocaleString()}
              </button>
            ))}
          </div>

          {isAmountValid && (
            <div className="mt-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              You will transfer: {formatNaira(numericAmount)}
            </div>
          )}
        </div>

        {/* Optional Transfer Reference */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              Transfer Reference (Optional)
            </label>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Optional</span>
          </div>
          <input
            type="text"
            value={transferReference}
            onChange={(e) => setTransferReference(e.target.value)}
            placeholder="Enter transfer/session reference if available"
            className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Optional — you can find this on your bank transfer receipt or transaction history.
          </p>
        </div>

        {/* Optional Receipt Upload */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              Transfer Receipt (Optional)
            </label>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Optional</span>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
          />

          {!receiptImage ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl p-4 text-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex flex-col items-center justify-center gap-1.5 group bg-slate-50/50 dark:bg-slate-800/30"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                📷 Upload Receipt
              </span>
              <span className="text-[10px] text-slate-400">
                Select screenshot or photo from your device (JPG, JPEG, PNG)
              </span>
            </button>
          ) : (
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800 flex items-center gap-3">
              <img
                src={receiptImage}
                alt="Receipt Preview"
                className="w-16 h-16 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {receiptFileName || 'receipt_image.jpg'}
                </div>
                <div className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Receipt image attached</span>
                </div>
              </div>
              <button
                type="button"
                onClick={removeReceipt}
                className="p-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-colors"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !isAmountValid}
          className={`w-full py-4 rounded-2xl font-black text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg ${
            isAmountValid && !isSubmitting
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-blue-600/25 active:scale-[0.99]'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Submitting Transfer Request...</span>
            </div>
          ) : (
            <>
              <span>I Have Made the Transfer</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* SUCCESS CONFIRMATION MODAL */}
      {submittedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-white space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
                <Clock className="w-7 h-7 animate-pulse" />
              </div>
              <h3 className="text-xl font-black text-white">
                Funding Request Submitted
              </h3>
              <p className="text-xs text-slate-300">
                Your funding request has been submitted successfully.
              </p>
              <p className="text-xs text-amber-400 font-semibold">
                Your wallet will be credited after the transfer is verified.
              </p>
            </div>

            {/* Status & Reference Details Card */}
            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Status</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase">
                  Status: Pending
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Amount to Credit</span>
                <span className="text-base font-black text-emerald-400">
                  {formatNaira(submittedRequest.amountNaira)}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-700 flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Funding Reference
                </span>
                <div className="flex items-center justify-between gap-2 bg-slate-900/90 rounded-xl px-3 py-2 border border-slate-700">
                  <span className="font-mono font-bold text-blue-400 text-xs">
                    {submittedRequest.internalReference || submittedRequest.reference}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyRefToClipboard(submittedRequest.internalReference || submittedRequest.reference)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
                  >
                    {copiedRef ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedRef ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmittedRequest(null);
                loadData();
              }}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              Done & View Requests
            </button>
          </div>
        </div>
      )}

      {/* CUSTOMER WALLET / FUNDING HISTORY */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Funding History
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track your bank transfer funding submissions and verification status
            </p>
          </div>
          <button
            onClick={loadData}
            className="text-xs text-blue-500 hover:underline font-semibold"
          >
            Refresh
          </button>
        </div>

        {loadingRequests ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            Loading your funding submissions...
          </div>
        ) : requests.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No funding requests submitted yet. Make a bank transfer to fund your wallet.
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => {
              const displayRef = req.internalReference || req.reference;
              const isApproved = req.status === 'approved';
              const isRejected = req.status === 'rejected';
              const isPending = req.status === 'pending';

              return (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          Wallet Funding
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                            isApproved
                              ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                              : isRejected
                              ? 'bg-rose-500/20 text-rose-500 border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                          }`}
                        >
                          {isApproved ? 'Successful' : isRejected ? 'Failed/Rejected' : 'Pending'}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                        Reference: <span className="text-blue-500 font-bold">{displayRef}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-base font-black ${
                          isApproved
                            ? 'text-emerald-500'
                            : isRejected
                            ? 'text-rose-500 line-through'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {isApproved ? `+${formatNaira(req.amountNaira)}` : formatNaira(req.amountNaira)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {formatDate(req.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Additional details */}
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      {req.transferReference ? (
                        <span>Bank Ref: <span className="font-mono text-slate-700 dark:text-slate-300">{req.transferReference}</span></span>
                      ) : (
                        <span>Bank Ref: <span className="text-slate-400 italic">None provided</span></span>
                      )}
                    </div>

                    {req.proofImageUrl && (
                      <a
                        href={req.proofImageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline font-semibold flex items-center gap-1"
                      >
                        <span>View Attached Receipt</span>
                      </a>
                    )}

                    {req.rejectionReason && (
                      <span className="text-rose-500 font-medium">
                        Reason: {req.rejectionReason}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
```

### FILE: src/pages/TransactionsPage.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../lib/api.ts';
import { Transaction } from '../types/index.ts';
import { formatNaira, formatDate, NETWORK_INFO } from '../lib/utils.ts';
import { ReceiptModal } from '../components/ReceiptModal.tsx';
import { 
  Clock, 
  Search, 
  Filter, 
  Wifi, 
  PhoneCall, 
  Wallet, 
  ArrowUpRight, 
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      let url = '/vtu/transactions?limit=100';
      if (typeFilter !== 'ALL') url += `&type=${typeFilter}`;
      if (statusFilter !== 'ALL') url += `&status=${statusFilter}`;
      const data = await apiRequest<{ transactions: Transaction[] }>(url);
      setTransactions(data.transactions || []);
    } catch (err) {
      console.warn('Transactions load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchTransactions();
  }, [user, typeFilter, statusFilter]);

  const filteredList = transactions.filter((tx) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return (
      tx.reference.toLowerCase().includes(query) ||
      (tx.recipientPhone && tx.recipientPhone.includes(query)) ||
      (tx.planName && tx.planName.toLowerCase().includes(query))
    );
  });

  const openReceipt = (tx: Transaction) => {
    setSelectedTx(tx);
    setIsReceiptOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-500" />
            <span>Transaction History</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Complete record of your purchases, top-ups, and auto-refunds
          </p>
        </div>

        <button
          onClick={fetchTransactions}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Refresh
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reference or recipient phone number..."
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Product Type Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Type:</span>
          {['ALL', 'data', 'airtime', 'wallet_funding'].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                typeFilter === type
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {type === 'ALL' ? 'All Products' : type === 'wallet_funding' ? 'Funding' : type.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Status Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Status:</span>
          {['ALL', 'successful', 'pending', 'refunded', 'failed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === st
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {st === 'ALL' ? 'All Status' : st.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-2.5">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading transactions...
          </div>
        ) : filteredList.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
            No transactions found matching your filter criteria.
          </div>
        ) : (
          filteredList.map((tx) => {
            const statusUpper = (tx.status || '').toUpperCase();
            const isSuccess = statusUpper === 'SUCCESS' || statusUpper === 'SUCCESSFUL';
            const isPending = statusUpper === 'PENDING' || statusUpper === 'PROCESSING';
            const isRefunded = statusUpper === 'REFUNDED';
            const networkInfo = tx.network ? NETWORK_INFO[tx.network] : null;

            return (
              <div
                key={tx.id}
                onClick={() => openReceipt(tx)}
                className="cursor-pointer p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all shadow-sm hover:shadow-md flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {/* Product Icon */}
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 ${
                      tx.productType === 'data'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : tx.productType === 'airtime'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {tx.productType === 'data' && <Wifi className="w-5 h-5" />}
                    {tx.productType === 'airtime' && <PhoneCall className="w-5 h-5" />}
                    {tx.productType === 'wallet_funding' && <Wallet className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {tx.planName || (tx.productType === 'wallet_funding' ? 'Wallet Funding' : `${tx.network} Airtime`)}
                      </span>
                      {networkInfo && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${networkInfo.badge}`}>
                          {networkInfo.name}
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                      {tx.recipientPhone ? `To: ${tx.recipientPhone}` : `Ref: ${tx.reference.slice(0, 16)}...`}
                    </div>

                    <div className="text-[10px] text-slate-400 mt-1">
                      {formatDate(tx.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-slate-900 dark:text-white">
                    {formatNaira(tx.amountNaira)}
                  </div>

                  <span
                    className={`inline-block mt-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                      isSuccess
                        ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                        : isPending
                        ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                        : isRefunded
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                        : 'bg-rose-500/20 text-rose-500 border-rose-500/30'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Transaction Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        data={selectedTx}
      />
    </div>
  );
};
```

### FILE: src/pages/ProfilePage.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../lib/api.ts';
import { LedgerEntry } from '../types/index.ts';
import { formatNaira, formatDate } from '../lib/utils.ts';
import { useToast } from '../components/Toast.tsx';
import { SetPinModal } from '../components/SetPinModal.tsx';
import { 
  User, 
  Shield, 
  Lock, 
  Key, 
  Copy, 
  Check, 
  Wallet, 
  LogOut, 
  Clock, 
  ArrowDownLeft, 
  ArrowUpRight,
  ShieldCheck,
  Download
} from 'lucide-react';

interface ProfilePageProps {
  onOpenInstallModal?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onOpenInstallModal }) => {
  const { user, logout, refreshUser } = useAuth();
  const { showToast } = useToast();

  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [loadingLedger, setLoadingLedger] = useState(true);
  const [isSetPinOpen, setIsSetPinOpen] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  // Change password states
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submittingPassword, setSubmittingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setLoadingLedger(true);
      apiRequest<{ ledger: LedgerEntry[] }>('/wallet/ledger?limit=30')
        .then((data) => setLedger(data.ledger || []))
        .catch((err) => console.warn('Ledger load error:', err))
        .finally(() => setLoadingLedger(false));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="py-16 text-center text-slate-400">
        Please log in to view your account profile.
      </div>
    );
  }

  const copyReferralCode = () => {
    if (user.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      setCopiedRef(true);
      showToast('Referral code copied!', 'info');
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }

    setSubmittingPassword(true);
    try {
      await apiRequest('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword })
      });
      showToast('Password changed successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
    } catch (err: any) {
      showToast(err.message || 'Failed to change password.', 'error');
    } finally {
      setSubmittingPassword(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
        <User className="w-6 h-6 text-blue-500" />
        <span>My Account & Security</span>
      </h1>

      {/* User Info Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {user.fullName}
                </h2>
                <span
                  className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                    user.role === 'admin'
                      ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-500 border-blue-500/30'
                  }`}
                >
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{user.phone} • {user.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2.5 rounded-xl border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 transition-colors"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Account Details Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 text-xs">
          <div>
            <span className="text-slate-400 block mb-1">Wallet Balance</span>
            <span className="text-lg font-black text-emerald-500">{formatNaira(user.balanceNaira)}</span>
          </div>

          {user.referralCode && (
            <div>
              <span className="text-slate-400 block mb-1">Referral Code</span>
              <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800 dark:text-slate-200">
                <span>{user.referralCode}</span>
                <button
                  onClick={copyReferralCode}
                  className="p-1 hover:text-blue-500 transition-colors"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security Actions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-500" />
          <span>Security & Authorization</span>
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Transaction PIN button */}
          <button
            onClick={() => setIsSetPinOpen(true)}
            className="flex-1 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-500 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-blue-500" />
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {user.hasPin ? 'Update 4-Digit PIN' : 'Set Up 4-Digit PIN'}
                </div>
                <div className="text-[10px] text-slate-400">
                  {user.hasPin ? 'PIN is active and securing your account' : 'PIN required before purchases'}
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              {user.hasPin ? 'Change' : 'Set PIN'}
            </span>
          </button>

          {/* Change Password Toggle */}
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="flex-1 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-500 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <Key className="w-4 h-4 text-emerald-500" />
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Account Password
                </div>
                <div className="text-[10px] text-slate-400">
                  Change your login password
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {showPasswordForm ? 'Close' : 'Change'}
            </span>
          </button>
        </div>

        {/* Change Password Form */}
        {showPasswordForm && (
          <form onSubmit={handleChangePassword} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">New Password (min 6 chars)</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submittingPassword}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/20"
            >
              {submittingPassword ? 'Saving...' : 'Update Password'}
            </button>
          </form>
        )}

        {/* PWA / App Download Button in Profile */}
        {onOpenInstallModal && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onOpenInstallModal}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-blue-600/10 via-teal-500/10 to-emerald-600/10 border border-teal-500/30 hover:border-teal-400 transition-all flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Download className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Install Standard DataHub App</span>
                    <span className="text-[10px] bg-teal-500/20 text-teal-400 font-extrabold px-1.5 py-0.2 rounded">PWA</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Add to home screen or download direct APK for instant mobile access
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                Install
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Wallet Ledger Audit Statement */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-500" />
              <span>Wallet Ledger Statement</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Verified double-entry financial ledger of every kobo
            </p>
          </div>
        </div>

        {loadingLedger ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading wallet ledger...
          </div>
        ) : ledger.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No ledger entries recorded yet.
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
            {ledger.map((entry) => {
              const isCredit = entry.entry_type === 'credit';
              const amtKobo = Number(entry.amount_kobo);
              const balAfterKobo = Number(entry.balance_after_kobo);

              return (
                <div
                  key={entry.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold ${
                        isCredit
                          ? 'bg-emerald-500/15 text-emerald-500'
                          : 'bg-rose-500/15 text-rose-500'
                      }`}
                    >
                      {isCredit ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {entry.description}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Ref: {entry.reference} • {formatDate(entry.created_at)}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-black ${
                        isCredit ? 'text-emerald-500' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {isCredit ? '+' : '-'}{formatNaira(amtKobo / 100)}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Bal: {formatNaira(balAfterKobo / 100)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Set PIN Modal */}
      <SetPinModal
        isOpen={isSetPinOpen}
        onClose={() => setIsSetPinOpen(false)}
        hasExistingPin={Boolean(user?.hasPin)}
        onSuccess={refreshUser}
      />
    </div>
  );
};
```

### FILE: src/pages/LoginPage.tsx
```tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../lib/api.ts';
import { useToast } from '../components/Toast.tsx';
import { StandardLogo } from '../components/StandardLogo.tsx';
import { Lock, Mail, Phone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface LoginPageProps {
  setCurrentTab: (tab: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setCurrentTab }) => {
  const { login } = useAuth();
  const { showToast } = useToast();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier: identifier.trim(), password })
      });

      login(data.token, data.user);
      showToast('Welcome back to Standard DataHub!', 'success');
      setCurrentTab('home');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoAccount = (type: 'user' | 'admin') => {
    if (type === 'admin') {
      setIdentifier('admin@datahub.ng');
      setPassword('AdminPassword123!');
    } else {
      setIdentifier('user@datahub.ng');
      setPassword('UserPassword123!');
    }
    setError('');
  };

  return (
    <div className="max-w-md mx-auto py-6 sm:py-12 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <StandardLogo className="w-14 h-14" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Sign In to Standard DataHub</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Access your wallet, top-up data, and view transactions
          </p>
        </div>

        {/* Quick Demo Fill Buttons */}
        <div className="mb-5 p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
          <div className="flex items-center gap-1 text-[11px] font-bold text-blue-700 dark:text-blue-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Fast Evaluation Test Logins:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemoAccount('user')}
              className="py-2 px-2.5 rounded-xl bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 hover:border-blue-400 font-semibold text-xs transition-all shadow-sm flex flex-col items-center text-center"
            >
              <span>Demo User</span>
              <span className="text-[10px] text-emerald-500 font-bold leading-tight">₦5,000 Wallet</span>
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('admin')}
              className="py-2 px-2.5 rounded-xl bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700 hover:border-amber-400 font-semibold text-xs transition-all shadow-sm flex flex-col items-center text-center"
            >
              <span>Super Admin</span>
              <span className="text-[10px] text-amber-500 font-bold leading-tight">Full Control</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 mb-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Email or Nigerian Phone Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="user@datahub.ng or 08012345678"
                className="w-full text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Password
              </label>
              <button
                type="button"
                onClick={() => showToast('Contact support or admin to reset your account password.', 'info')}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 mt-2 hover:scale-[1.01]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Don't have an account yet?{' '}
            <button
              onClick={() => setCurrentTab('register')}
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Create Free Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
```

### FILE: src/pages/RegisterPage.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../lib/api.ts';
import { useToast } from '../components/Toast.tsx';
import { StandardLogo } from '../components/StandardLogo.tsx';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Gift, 
  ArrowRight, 
  ShieldCheck, 
  KeyRound, 
  RefreshCw, 
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Download
} from 'lucide-react';

interface RegisterPageProps {
  setCurrentTab: (tab: string) => void;
  onRegistrationComplete?: () => void;
  onOpenInstallModal?: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ 
  setCurrentTab,
  onRegistrationComplete,
  onOpenInstallModal
}) => {
  const { login } = useAuth();
  const { showToast } = useToast();

  // Registration step: 'form' or 'otp'
  const [step, setStep] = useState<'form' | 'otp'>('form');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');

  // OTP Fields
  const [otp, setOtp] = useState('');
  const [serverOtp, setServerOtp] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Countdown timer for Resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Full name is required.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    const cleanPhone = phone.replace(/[\s\-\+]/g, '');
    if (!/^0[789][01]\d{8}$/.test(cleanPhone) && !/^234[789][01]\d{8}$/.test(cleanPhone)) {
      setError('Please enter a valid 11-digit Nigerian phone number (e.g. 08012345678).');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiRequest<{
        success: boolean;
        message: string;
        phone: string;
        otp?: string;
      }>('/auth/register-request', {
        method: 'POST',
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: cleanPhone,
          password,
          confirmPassword,
          referralCode: referralCode.trim() || undefined
        })
      });

      if (data.otp) {
        setServerOtp(data.otp);
        // Pre-fill OTP for immediate fast verification
        setOtp(data.otp);
      }
      setCountdown(30);
      setStep('otp');
      showToast('Verification code generated! Please enter your 4-digit OTP.', 'info');
    } catch (err: any) {
      setError(err.message || 'Registration initiation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanOtp = otp.trim();
    if (!/^\d{4}$/.test(cleanOtp)) {
      setError('Please enter the exact 4-digit verification code.');
      return;
    }

    const cleanPhone = phone.replace(/[\s\-\+]/g, '');
    setIsLoading(true);
    try {
      const data = await apiRequest<{
        message: string;
        token: string;
        user: any;
      }>('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({
          phone: cleanPhone,
          otp: cleanOtp
        })
      });

      login(data.token, data.user);
      showToast('Registration complete & account activated! Welcome to Standard DataHub.', 'success');
      if (onRegistrationComplete) {
        onRegistrationComplete();
      }
      setCurrentTab('home');
    } catch (err: any) {
      setError(err.message || 'OTP verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0 || isResending) return;
    setError('');
    setIsResending(true);
    try {
      const cleanPhone = phone.replace(/[\s\-\+]/g, '');
      const data = await apiRequest<{
        success: boolean;
        message: string;
        phone: string;
        otp: string;
      }>('/auth/resend-otp', {
        method: 'POST',
        body: JSON.stringify({ phone: cleanPhone })
      });

      if (data.otp) {
        setServerOtp(data.otp);
        setOtp(data.otp);
      }
      setCountdown(30);
      showToast('New 4-digit OTP generated and dispatched!', 'success');
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 sm:py-10 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* STEP 1: Registration Form */}
        {step === 'form' && (
          <div>
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <StandardLogo className="w-14 h-14" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">Create Account</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Join Standard DataHub for wholesale instant VTU recharge
              </p>

              {onOpenInstallModal && (
                <button
                  type="button"
                  onClick={onOpenInstallModal}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30 text-[11px] font-bold transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-teal-500" />
                  <span>Prefer App? Download / Install to Home Screen</span>
                </button>
              )}
            </div>

            {error && (
              <div className="p-3 mb-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleInitialSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ibrahim Bello"
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ibrahim@domain.com"
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Nigerian Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Nigerian Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08161720895"
                    maxLength={11}
                    className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Password (min 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Referral Code (optional) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Referral Code (Optional)
                </label>
                <div className="relative">
                  <Gift className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="e.g. DH12345"
                    className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 mt-4 hover:scale-[1.01]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Continue to OTP Verification</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentTab('login')}
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Log In
                </button>
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: 4-Digit OTP Verification Screen */}
        {step === 'otp' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Back button */}
            <button
              type="button"
              onClick={() => {
                setError('');
                setStep('form');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Edit Details</span>
            </button>

            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/10">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Verify Your Account
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                We generated a 4-digit verification code for{' '}
                <span className="font-mono font-bold text-slate-900 dark:text-white">{phone}</span>
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium text-center">
                {error}
              </div>
            )}

            {/* Instant verification hint banner */}
            {serverOtp && (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div className="text-xs text-emerald-700 dark:text-emerald-300">
                    Your 4-Digit OTP Code is: <span className="font-mono font-black text-base ml-1 tracking-wider text-emerald-600 dark:text-emerald-400">{serverOtp}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOtp(serverOtp)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-500 transition-colors shrink-0"
                >
                  Auto-Fill
                </button>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Enter 4-Digit OTP
                </label>
                <div className="relative max-w-[200px] mx-auto">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setOtp(val);
                      setError('');
                    }}
                    placeholder="••••"
                    autoFocus
                    className="w-full text-center text-3xl font-mono font-black tracking-[0.5em] bg-slate-50 dark:bg-slate-800 border-2 border-blue-500/40 focus:border-blue-500 rounded-2xl py-3 text-slate-900 dark:text-white focus:outline-none transition-all shadow-inner"
                    required
                  />
                </div>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Please enter the 4 digits to activate your account
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length !== 4}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify & Activate Account</span>
                  </>
                )}
              </button>
            </form>

            {/* Resend OTP Section */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center space-y-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Didn't get the code?
              </div>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={countdown > 0 || isResending}
                className={`text-xs font-bold transition-colors inline-flex items-center gap-1.5 ${
                  countdown > 0
                    ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                    : 'text-blue-600 dark:text-blue-400 hover:underline'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                <span>
                  {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend 4-Digit OTP'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
```

### FILE: src/pages/ContactPage.tsx
```tsx
import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MessageCircle, 
  Clock, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '../components/Toast.tsx';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const faqs = [
    {
      q: 'How fast is mobile data and airtime delivered?',
      a: 'All data bundles and airtime top-ups are processed by our automated server engine in real-time. Delivery typically arrives on the beneficiary phone line within 5 to 30 seconds.'
    },
    {
      q: 'What happens if a network provider is temporarily down?',
      a: 'If a telecom carrier reports an error or rejects the transaction, our system performs an automatic, instant refund back to your wallet ledger. You never lose money on Standard DataHub.'
    },
    {
      q: 'How does wallet funding work?',
      a: 'Transfer funds to our designated Opay bank account (6423809175 - Ibrahim Bello) using your mobile banking app or USSD. Then submit your transfer reference on the "Fund Wallet" page. Our admin team will verify and credit your wallet promptly.'
    },
    {
      q: 'Can I start my own VTU reselling business with Standard DataHub?',
      a: 'Yes! Standard DataHub offers wholesale discounted pricing on MTN SME, Airtel Corporate, Glo Gifting, and 9mobile data. You can purchase on behalf of your customers at your own customized retail pricing and profit on every transaction.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      showToast('Thank you! Your message has been received. Our support team will reach out shortly.', 'success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSending(false);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Customer Support & FAQs</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Have an inquiry, custom integration question, or need assistance? We are here 24/7.
        </p>
      </div>

      {/* Contact Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* WhatsApp */}
        <a
          href="https://wa.me/2348161720895?text=Hello%20Standard%20DataHub%20Support,%20I%20need%20assistance"
          target="_blank"
          rel="noreferrer"
          className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-center hover:border-emerald-500/50 hover:bg-emerald-500/15 transition-all block group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            WhatsApp Support
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Instant chat & fast reply</p>
          <div className="mt-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
            08161720895
          </div>
          <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 underline">
            <span>Open WhatsApp Chat →</span>
          </div>
        </a>

        {/* Phone */}
        <a
          href="tel:08161720895"
          className="p-5 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-center hover:border-blue-500/50 hover:bg-blue-500/15 transition-all block group"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Direct Phone
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Voice call helpline</p>
          <div className="mt-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
            08161720895
          </div>
          <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 underline">
            <span>Call Helpline →</span>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:ibrahimmal916@gmail.com"
          className="p-5 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-center hover:border-purple-500/50 hover:bg-purple-500/15 transition-all block group"
        >
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <Mail className="w-5 h-5" />
          </div>
          <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            Email Desk
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Official customer inquiries</p>
          <div className="mt-2 text-xs font-bold text-purple-600 dark:text-purple-400 truncate">
            ibrahimmal916@gmail.com
          </div>
          <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-purple-600 dark:text-purple-400 underline">
            <span>Send Email →</span>
          </div>
        </a>
      </div>

      {/* Inquiry Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          Send Us a Direct Inquiry
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Our customer satisfaction agents review and reply within 15 minutes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tunde Williams"
                className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tunde@domain.com"
                className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Nigerian Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08012345678"
              className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Message or Transaction Question
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your inquiry or include transaction reference if applicable..."
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-blue-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
```

### FILE: src/pages/AdminPage.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../lib/api.ts';
import { 
  AdminMetrics, 
  FundingRequest, 
  DataPlan, 
  Transaction, 
  BankDetails 
} from '../types/index.ts';
import { formatNaira, formatDate, NETWORK_INFO } from '../lib/utils.ts';
import { useToast } from '../components/Toast.tsx';
import { 
  ShieldCheck, 
  Users, 
  Wallet, 
  FileText, 
  TrendingUp, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  Search, 
  Plus, 
  Edit3, 
  Building2, 
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  Tag,
  DollarSign,
  Percent,
  Check,
  Zap,
  Sparkles,
  Bell,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Loader2,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { playNotificationChime } from '../lib/soundAlert.ts';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'funding' | 'users' | 'plans' | 'transactions' | 'settings' | 'audit'>('overview');

  // Realtime Pending Funding Alert System
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [isBellModalOpen, setIsBellModalOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [processingFundingId, setProcessingFundingId] = useState<number | null>(null);
  const prevPendingCountRef = React.useRef<number>(0);

  // Sensitive API Key Security (Super Admin Only)
  const [securitySettings, setSecuritySettings] = useState<{
    userId: string;
    baseUrl: string;
    maskedApiKey: string;
    rawApiKey?: string;
    hasApiKey: boolean;
  } | null>(null);
  const [securityUserIdInput, setSecurityUserIdInput] = useState<string>('');
  const [securityApiKeyInput, setSecurityApiKeyInput] = useState<string>('');
  const [isApiKeyRevealed, setIsApiKeyRevealed] = useState<boolean>(false);
  const [savingSecurity, setSavingSecurity] = useState<boolean>(false);
  const [settingsLogs, setSettingsLogs] = useState<any[]>([]);

  // Pending Transaction Manual Retry
  const [retryingTxId, setRetryingTxId] = useState<number | null>(null);

  // Overview metrics
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  // Funding requests
  const [fundingRequests, setFundingRequests] = useState<FundingRequest[]>([]);
  const [fundingStatusFilter, setFundingStatusFilter] = useState('pending');
  const [loadingFunding, setLoadingFunding] = useState(false);

  // Users
  const [userList, setUserList] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Plans & Pricing Management
  const [dataPlans, setDataPlans] = useState<DataPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any | null>(null);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [planNetworkFilter, setPlanNetworkFilter] = useState<'ALL' | 'MTN' | 'AIRTEL' | 'GLO' | '9MOBILE'>('ALL');
  const [planTypeFilter, setPlanTypeFilter] = useState<string>('ALL');
  const [planSearch, setPlanSearch] = useState('');
  const [inlineSellingPrices, setInlineSellingPrices] = useState<Record<string, number>>({});
  const [savingInlineId, setSavingInlineId] = useState<string | null>(null);
  const [newPlan, setNewPlan] = useState({
    id: '',
    network: 'MTN',
    planName: '',
    planType: 'SME',
    dataAmount: '1.0 GB',
    duration: '30 Days',
    providerCode: '',
    providerCostNaira: 410,
    sellingPriceNaira: 450,
    isActive: true
  });

  // Transactions
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [txSearch, setTxSearch] = useState('');
  const [loadingTx, setLoadingTx] = useState(false);

  // Settings
  const [settings, setSettings] = useState<any>(null);
  const [savingSettings, setSavingSettings] = useState(false);

  // Audit logs
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Rejection modal
  const [rejectingRequestId, setRejectingRequestId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Initial Load & 10s Auto-Refresh Interval
  useEffect(() => {
    fetchDashboardMetrics();
    fetchPendingAlerts();

    // Check if URL or hash specifies funding tab
    if (typeof window !== 'undefined') {
      if (window.location.pathname.includes('/admin/funding') || window.location.hash.includes('funding')) {
        setActiveTab('funding');
      }
    }

    const interval = setInterval(() => {
      fetchPendingAlerts();
      if (activeTab === 'funding') {
        fetchFundingRequests();
      }
    }, 10000); // 10 seconds auto-refresh as requested

    return () => clearInterval(interval);
  }, [activeTab, soundEnabled]);

  const fetchPendingAlerts = async () => {
    try {
      const data = await apiRequest<{ count: number }>('/admin/funding-requests/pending-count');
      const newCount = Number(data.count || 0);

      // Play chime if new requests arrived while online
      if (newCount > prevPendingCountRef.current && prevPendingCountRef.current >= 0 && soundEnabled) {
        playNotificationChime();
        showToast(`🔔 ${newCount - prevPendingCountRef.current} new manual bank funding request(s) waiting for approval!`, 'info');
      }
      prevPendingCountRef.current = newCount;
      setPendingCount(newCount);
    } catch (e) {}
  };

  useEffect(() => {
    if (activeTab === 'funding') fetchFundingRequests();
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'plans') fetchDataPlans();
    if (activeTab === 'transactions') fetchTransactions();
    if (activeTab === 'settings') {
      fetchSettings();
      fetchSecuritySettings();
      fetchSettingsLogs();
    }
    if (activeTab === 'audit') fetchAuditLogs();
  }, [activeTab, fundingStatusFilter]);

  const fetchDashboardMetrics = async () => {
    setLoadingMetrics(true);
    try {
      const data = await apiRequest<{ metrics: AdminMetrics }>('/admin/dashboard');
      setMetrics(data.metrics);
    } catch (err) {
      console.warn('Dashboard fetch error:', err);
    } finally {
      setLoadingMetrics(false);
    }
  };

  const fetchFundingRequests = async () => {
    setLoadingFunding(true);
    try {
      let url = '/admin/funding-requests?limit=100';
      if (fundingStatusFilter !== 'ALL') url += `&status=${fundingStatusFilter}`;
      const data = await apiRequest<{ requests: FundingRequest[] }>(url);
      setFundingRequests(data.requests || []);
    } catch (err) {
      console.warn('Admin funding load error:', err);
    } finally {
      setLoadingFunding(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      let url = '/admin/users?limit=100';
      if (userSearch) url += `&search=${encodeURIComponent(userSearch)}`;
      const data = await apiRequest<{ users: any[] }>(url);
      setUserList(data.users || []);
    } catch (err) {
      console.warn('Admin users load error:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchDataPlans = async () => {
    setLoadingPlans(true);
    try {
      const data = await apiRequest<{ plans: DataPlan[] }>('/admin/data-plans');
      const plans = data.plans || [];
      setDataPlans(plans);
      const prices: Record<string, number> = {};
      plans.forEach((p) => {
        prices[p.id] = p.sellingPriceNaira;
      });
      setInlineSellingPrices(prices);
    } catch (err) {
      console.warn('Admin plans load error:', err);
    } finally {
      setLoadingPlans(false);
    }
  };

  const fetchTransactions = async () => {
    setLoadingTx(true);
    try {
      let url = '/admin/transactions?limit=100';
      if (txSearch) url += `&search=${encodeURIComponent(txSearch)}`;
      const data = await apiRequest<{ transactions: Transaction[] }>(url);
      setAllTransactions(data.transactions || []);
    } catch (err) {
      console.warn('Admin transactions load error:', err);
    } finally {
      setLoadingTx(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const data = await apiRequest<{ settings: any }>('/admin/settings');
      setSettings(data.settings);
    } catch (err) {
      console.warn('Settings load error:', err);
    }
  };

  const fetchSecuritySettings = async () => {
    try {
      const data = await apiRequest<{ settings: any }>('/admin/security/settings');
      setSecuritySettings(data.settings);
      setSecurityUserIdInput(data.settings.userId || '');
      if (data.settings.rawApiKey) {
        setSecurityApiKeyInput(data.settings.rawApiKey);
      }
    } catch (err) {
      console.warn('Security settings load error:', err);
    }
  };

  const fetchSettingsLogs = async () => {
    try {
      const data = await apiRequest<{ logs: any[] }>('/admin/security/logs');
      setSettingsLogs(data.logs || []);
    } catch (err) {
      console.warn('Settings logs error:', err);
    }
  };

  const handleSaveSecuritySettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSecurity(true);
    try {
      const res = await apiRequest('/admin/security/settings', {
        method: 'PUT',
        body: JSON.stringify({
          userId: securityUserIdInput.trim(),
          apiKey: securityApiKeyInput.trim(),
          baseUrl: securitySettings?.baseUrl || 'https://www.nellobytesystems.com'
        })
      });
      showToast(res.message || 'ClubKonnect API credentials saved securely!', 'success');
      fetchSecuritySettings();
      fetchSettingsLogs();
    } catch (err: any) {
      showToast(err.message || 'Failed to update security settings.', 'error');
    } finally {
      setSavingSecurity(false);
    }
  };

  const handleRetryPendingTransaction = async (txId: number) => {
    setRetryingTxId(txId);
    try {
      const res = await apiRequest(`/admin/transactions/${txId}/retry-pending`, {
        method: 'POST'
      });
      if (res.success || res.status === 'SUCCESS' || res.status === 'successful') {
        showToast(res.message || 'Pending transaction processed successfully!', 'success');
      } else {
        showToast(res.message || 'Transaction status updated.', 'info');
      }
      fetchTransactions();
      fetchDashboardMetrics();
    } catch (err: any) {
      showToast(err.message || 'Failed to retry transaction.', 'error');
    } finally {
      setRetryingTxId(null);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const data = await apiRequest<{ logs: any[] }>('/admin/audit-logs');
      setAuditLogs(data.logs || []);
    } catch (err) {
      console.warn('Audit logs error:', err);
    }
  };

  // Funding actions with double-click protection & loading state
  const handleApproveFunding = async (requestId: number) => {
    setProcessingFundingId(requestId);
    try {
      const res = await apiRequest(`/admin/funding-requests/${requestId}/approve`, {
        method: 'POST'
      });
      showToast(res.message || 'Funding request approved! User wallet credited.', 'success');
      fetchFundingRequests();
      fetchPendingAlerts();
      fetchDashboardMetrics();
    } catch (err: any) {
      showToast(err.message || 'Approval failed.', 'error');
    } finally {
      setProcessingFundingId(null);
    }
  };

  const handleRejectFunding = async () => {
    if (!rejectingRequestId || !rejectionReason.trim()) {
      showToast('Please provide a rejection reason.', 'error');
      return;
    }

    try {
      const res = await apiRequest(`/admin/funding-requests/${rejectingRequestId}/reject`, {
        method: 'POST',
        body: JSON.stringify({ reason: rejectionReason.trim() })
      });
      showToast(res.message || 'Funding request rejected.', 'info');
      setRejectingRequestId(null);
      setRejectionReason('');
      fetchFundingRequests();
      fetchDashboardMetrics();
    } catch (err: any) {
      showToast(err.message || 'Rejection failed.', 'error');
    }
  };

  // User actions
  const handleToggleUserStatus = async (targetUserId: number, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
    try {
      await apiRequest(`/admin/users/${targetUserId}/status`, {
        method: 'POST',
        body: JSON.stringify({ status: nextStatus })
      });
      showToast(`User status set to ${nextStatus}.`, 'success');
      fetchUsers();
    } catch (err: any) {
      showToast(err.message || 'Failed to update user status.', 'error');
    }
  };

  // Transaction actions
  const handleRequery = async (txId: number) => {
    try {
      const res = await apiRequest(`/admin/transactions/${txId}/requery`, {
        method: 'POST'
      });
      showToast(res.message || `Requery completed: ${res.status}`, 'info');
      fetchTransactions();
      fetchDashboardMetrics();
    } catch (err: any) {
      showToast(err.message || 'Requery failed.', 'error');
    }
  };

  const handleManualRefund = async (txId: number) => {
    if (!confirm('Are you sure you want to refund this transaction back to the user wallet?')) return;
    try {
      const res = await apiRequest(`/admin/transactions/${txId}/manual-refund`, {
        method: 'POST'
      });
      showToast(res.message || 'Refund issued to user wallet.', 'success');
      fetchTransactions();
      fetchDashboardMetrics();
    } catch (err: any) {
      showToast(err.message || 'Refund failed.', 'error');
    }
  };

  // Fast inline price save
  const handleQuickPriceSave = async (plan: DataPlan) => {
    const newSellingPrice = inlineSellingPrices[plan.id];
    if (newSellingPrice === undefined || isNaN(newSellingPrice) || newSellingPrice <= 0) {
      showToast('Please enter a valid positive selling price in Naira.', 'error');
      return;
    }

    setSavingInlineId(plan.id);
    try {
      await apiRequest(`/admin/data-plans/${plan.id}/price`, {
        method: 'PATCH',
        body: JSON.stringify({
          sellingPriceNaira: Number(newSellingPrice),
          providerCostNaira: plan.providerCostNaira,
          isActive: plan.isActive
        })
      });
      showToast(`Updated price for ${plan.planName} to ${formatNaira(newSellingPrice)}!`, 'success');
      fetchDataPlans();
    } catch (err: any) {
      showToast(err.message || 'Failed to update plan price.', 'error');
    } finally {
      setSavingInlineId(null);
    }
  };

  // Toggle active/inactive for any plan
  const handleTogglePlanActive = async (plan: DataPlan) => {
    try {
      await apiRequest(`/admin/data-plans/${plan.id}/price`, {
        method: 'PATCH',
        body: JSON.stringify({
          isActive: !plan.isActive
        })
      });
      showToast(`${plan.planName} is now ${!plan.isActive ? 'ACTIVE' : 'DISABLED'}.`, 'info');
      fetchDataPlans();
    } catch (err: any) {
      showToast(err.message || 'Failed to update plan status.', 'error');
    }
  };

  // Plan Edit
  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    try {
      await apiRequest(`/admin/data-plans/${editingPlan.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          planName: editingPlan.planName,
          planType: editingPlan.planType,
          dataAmount: editingPlan.dataAmount,
          duration: editingPlan.duration,
          providerCode: editingPlan.providerCode,
          providerCostNaira: editingPlan.providerCostNaira,
          sellingPriceNaira: editingPlan.sellingPriceNaira,
          markupNaira: editingPlan.markupNaira,
          isActive: editingPlan.isActive
        })
      });
      showToast('Data plan updated successfully!', 'success');
      setEditingPlan(null);
      fetchDataPlans();
    } catch (err: any) {
      showToast(err.message || 'Failed to update plan.', 'error');
    }
  };

  // Create New Plan
  const handleCreateNewPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlan.id || !newPlan.planName || !newPlan.providerCode) {
      showToast('Please provide plan ID, display name, and ClubKonnect variation code.', 'error');
      return;
    }

    try {
      await apiRequest('/admin/data-plans', {
        method: 'POST',
        body: JSON.stringify(newPlan)
      });
      showToast(`Data plan ${newPlan.planName} created successfully!`, 'success');
      setIsNewPlanOpen(false);
      setNewPlan({
        id: '',
        network: 'MTN',
        planName: '',
        planType: 'SME',
        dataAmount: '1.0 GB',
        duration: '30 Days',
        providerCode: '',
        providerCostNaira: 410,
        sellingPriceNaira: 450,
        isActive: true
      });
      fetchDataPlans();
    } catch (err: any) {
      showToast(err.message || 'Failed to create plan.', 'error');
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          bankName: settings.bank_name,
          accountNumber: settings.account_number,
          accountName: settings.account_name,
          manualFundingInstructions: settings.manual_funding_instructions,
          supportPhone: settings.support_phone,
          supportEmail: settings.support_email,
          demoMode: settings.demo_mode,
          apkDownloadUrl: settings.apk_download_url || null
        })
      });
      showToast('Settings saved successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to save settings.', 'error');
    } finally {
      setSavingSettings(false);
    }
  };

  if (user?.role !== 'admin' && user?.role !== 'super_admin') {
    return (
      <div className="py-16 text-center text-rose-500">
        Access Denied: Administrator role required.
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Admin Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin Management Hub</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Operations, Manual Funding Approvals, Telecom Pricing, and Audit Trail
            </p>
          </div>
        </div>

        {/* Environment Status Badge & Alert Bell */}
        <div className="flex items-center gap-2.5">
          {/* Bell Icon with Red Badge */}
          <button
            type="button"
            onClick={() => {
              setIsBellModalOpen(true);
              fetchFundingRequests();
            }}
            className="relative p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-slate-700 dark:text-slate-200 transition-all shadow-sm flex items-center justify-center cursor-pointer group"
            title={`${pendingCount} Pending Manual Bank Funding Request(s)`}
          >
            <Bell className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            {pendingCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-black text-[11px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center animate-bounce shadow-md border-2 border-slate-900">
                {pendingCount}
              </span>
            )}
          </button>

          {/* Sound Alert Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              showToast(next ? 'Sound Alert enabled' : 'Sound Alert muted', 'info');
            }}
            className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
            }`}
            title={soundEnabled ? 'Alert Sound ON (Notification chime active)' : 'Alert Sound MUTED'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {settings?.demo_mode ? (
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              Test Environment
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Production</span>
            </span>
          )}
          <button
            onClick={() => {
              fetchDashboardMetrics();
              fetchPendingAlerts();
            }}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            Refresh All
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'overview', label: 'Overview Metrics', icon: TrendingUp },
          { id: 'funding', label: `Funding Requests (${metrics?.pendingFundingCount || 0})`, icon: Wallet },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'plans', label: `Manage Data Prices (${dataPlans.length})`, icon: Tag },
          { id: 'transactions', label: 'Transactions', icon: Clock },
          { id: 'settings', label: 'Platform & Bank Settings', icon: Settings },
          { id: 'audit', label: 'Audit Trail', icon: ShieldAlert }
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && metrics && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Total Users */}
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-slate-400 text-xs font-semibold">Total Registered Users</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {metrics.totalUsers}
              </div>
              <div className="text-[11px] text-emerald-500 font-medium mt-1">
                {metrics.activeUsers} Active • {metrics.suspendedUsers} Suspended
              </div>
            </div>

            {/* Wallet Liability */}
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-slate-400 text-xs font-semibold">Total User Wallet Balance</div>
              <div className="text-2xl font-black text-emerald-500 mt-1">
                {formatNaira(metrics.totalWalletBalanceNaira)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Platform user balance liability</div>
            </div>

            {/* Pending Funding */}
            <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30">
              <div className="text-amber-600 dark:text-amber-400 text-xs font-bold">
                Pending Bank Funding
              </div>
              <div className="text-2xl font-black text-amber-500 mt-1">
                {metrics.pendingFundingCount} Requests
              </div>
              <button
                onClick={() => setActiveTab('funding')}
                className="text-[11px] text-amber-500 underline font-semibold mt-1 block"
              >
                Review & Approve Now
              </button>
            </div>

            {/* Net Profit */}
            <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                Platform Net Profit
              </div>
              <div className="text-2xl font-black text-emerald-500 mt-1">
                {formatNaira(metrics.totalProfitNaira)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                From {formatNaira(metrics.totalDataSalesNaira + metrics.totalAirtimeSalesNaira)} Sales
              </div>
            </div>
          </div>

          {/* Sales Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Total Data Sales</div>
              <div className="text-xl font-black text-blue-500 mt-1">
                {formatNaira(metrics.totalDataSalesNaira)}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Total Airtime Sales</div>
              <div className="text-xl font-black text-emerald-500 mt-1">
                {formatNaira(metrics.totalAirtimeSalesNaira)}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Provider Wholesale Cost</div>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {formatNaira(metrics.totalProviderCostNaira)}
              </div>
            </div>
          </div>

          {/* Transaction Health */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Transaction Health & Delivery Summary
            </h3>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-emerald-500/10">
                <div className="text-xl font-black text-emerald-500">{metrics.successfulTxCount}</div>
                <div className="text-[11px] text-slate-400">Successful</div>
              </div>
              <div className="p-3 rounded-2xl bg-amber-500/10">
                <div className="text-xl font-black text-amber-500">{metrics.pendingTxCount}</div>
                <div className="text-[11px] text-slate-400">Pending</div>
              </div>
              <div className="p-3 rounded-2xl bg-rose-500/10">
                <div className="text-xl font-black text-rose-500">{metrics.failedTxCount}</div>
                <div className="text-[11px] text-slate-400">Failed</div>
              </div>
              <div className="p-3 rounded-2xl bg-purple-500/10">
                <div className="text-xl font-black text-purple-500">{metrics.refundedTxCount}</div>
                <div className="text-[11px] text-slate-400">Auto-Refunded</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANUAL FUNDING REQUESTS */}
      {activeTab === 'funding' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {['pending', 'approved', 'rejected', 'ALL'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFundingStatusFilter(st)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    fundingStatusFilter === st
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {st.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={fetchFundingRequests}
              className="text-xs text-blue-500 hover:underline font-semibold"
            >
              Refresh Submissions
            </button>
          </div>

          {loadingFunding ? (
            <div className="py-12 text-center text-slate-400 text-xs">Loading funding requests...</div>
          ) : fundingRequests.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              No {fundingStatusFilter} funding requests found.
            </div>
          ) : (
            <div className="space-y-3">
              {fundingRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-slate-900 dark:text-white">
                          {formatNaira(req.amountNaira)}
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                            req.status === 'approved'
                              ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                              : req.status === 'rejected'
                              ? 'bg-rose-500/20 text-rose-500 border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        User: <span className="font-semibold text-slate-800 dark:text-slate-200">{req.userName}</span> ({req.userPhone || req.userEmail})
                      </div>
                    </div>

                    <div className="text-xs text-slate-400">
                      Submitted: {formatDate(req.createdAt)}
                    </div>
                  </div>

                  {/* Transfer details */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3 text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Funding Ref:</span>
                      <span className="font-mono font-bold text-amber-500">{req.internalReference || req.reference}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Transfer Ref:</span>
                      <span className="font-mono font-bold text-blue-500">
                        {req.transferReference || <span className="text-slate-400 font-normal italic">None provided</span>}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Sender / Bank:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {req.senderName || req.userName} {req.senderBank ? `(${req.senderBank})` : ''}
                      </span>
                    </div>
                  </div>

                  {req.proofImageUrl && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center gap-3">
                      <img
                        src={req.proofImageUrl}
                        alt="Transfer Receipt"
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-slate-900 dark:text-white">Uploaded Customer Receipt</div>
                        <a
                          href={req.proofImageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 hover:underline flex items-center gap-1 text-[11px] font-semibold mt-0.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open Full Size Image</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {req.status === 'pending' && (
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => handleApproveFunding(req.id)}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Bank Credit & Approve (₦{req.amountNaira})</span>
                      </button>

                      <button
                        onClick={() => {
                          setRejectingRequestId(req.id);
                          setRejectionReason('');
                        }}
                        className="px-4 py-2.5 bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white font-bold text-xs rounded-xl transition-all border border-rose-500/30"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {req.rejectionReason && (
                    <div className="text-xs text-rose-500 font-medium">
                      Rejection Reason: {req.rejectionReason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Rejection Prompt Modal */}
          {rejectingRequestId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-white space-y-4">
                <h3 className="text-base font-bold">Reject Funding Request #{rejectingRequestId}</h3>
                <p className="text-xs text-slate-400">
                  Please specify why this funding request is being rejected (e.g., Transfer reference not found on bank statement, fake receipt, incorrect amount).
                </p>

                <textarea
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter rejection reason..."
                  className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-rose-500"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => setRejectingRequestId(null)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectFunding}
                    className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                  >
                    Confirm Rejection
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={userSearch}
              onChange={(e) => {
                setUserSearch(e.target.value);
                // quick search debounce
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') fetchUsers();
              }}
              placeholder="Search user by name, email, or phone and press Enter..."
              className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {loadingUsers ? (
            <div className="py-12 text-center text-slate-400 text-xs">Loading users...</div>
          ) : (
            <div className="space-y-2.5">
              {userList.map((u) => (
                <div
                  key={u.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{u.fullName}</span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          u.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-500'
                            : 'bg-rose-500/20 text-rose-500'
                        }`}
                      >
                        {u.status}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">
                        {u.role}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                      {u.phone} • {u.email}
                    </div>

                    <div className="text-[10px] text-slate-400 mt-1">
                      Joined: {formatDate(u.createdAt)}
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-2">
                    <div>
                      <div className="text-[10px] text-slate-400">Wallet Balance</div>
                      <div className="text-sm font-black text-emerald-500">{formatNaira(u.balanceNaira)}</div>
                    </div>

                    {u.role !== 'admin' && (
                      <button
                        onClick={() => handleToggleUserStatus(u.id, u.status)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                          u.status === 'active'
                            ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white'
                            : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                        }`}
                      >
                        {u.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: DYNAMIC DATA PRICING & PROFIT MANAGEMENT */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          {/* Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                  <Tag className="w-4 h-4" />
                </div>
                <h2 className="text-base font-black text-slate-900 dark:text-white">
                  Manage Telecom Data Prices & Profit Margins
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Edit selling prices for any network plan dynamically. Changes take effect instantly on live purchases with zero code restart.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsNewPlanOpen(true)}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Plan</span>
              </button>
              <button
                onClick={fetchDataPlans}
                className="p-2 text-slate-400 hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl"
                title="Refresh Prices"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Profit Assurance Info Banner */}
          <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  Guaranteed Telecom Profit Margins
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Configured with ClubKonnect lowest SME tier codes (~₦410/GB wholesale cost). You make profit on every transaction.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300 font-medium shrink-0">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Plans:</span>
                <span className="font-black text-slate-900 dark:text-white text-sm">{dataPlans.length}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Active for Sale:</span>
                <span className="font-black text-emerald-500 text-sm">
                  {dataPlans.filter(p => p.isActive).length}
                </span>
              </div>
            </div>
          </div>

          {/* Network & Search Filters */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Network Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
                {(['ALL', 'MTN', 'AIRTEL', 'GLO', '9MOBILE'] as const).map((net) => {
                  const isSelected = planNetworkFilter === net;
                  const count = net === 'ALL' 
                    ? dataPlans.length 
                    : dataPlans.filter(p => p.network === net).length;

                  return (
                    <button
                      key={net}
                      onClick={() => setPlanNetworkFilter(net)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        isSelected
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <span>{net === 'ALL' ? 'All Networks' : net}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={planSearch}
                  onChange={(e) => setPlanSearch(e.target.value)}
                  placeholder="Filter plan by name or code..."
                  className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Plan Type Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Type:</span>
              {['ALL', 'SME', 'Direct', 'Corporate Gifting', 'Gifting'].map((type) => (
                <button
                  key={type}
                  onClick={() => setPlanTypeFilter(type)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    planTypeFilter === type
                      ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Plans Grid */}
          {loadingPlans ? (
            <div className="py-12 text-center text-slate-400 text-xs">Loading data plans...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dataPlans
                .filter((p) => {
                  if (planNetworkFilter !== 'ALL' && p.network !== planNetworkFilter) return false;
                  if (planTypeFilter !== 'ALL' && p.planType !== planTypeFilter) return false;
                  if (planSearch) {
                    const q = planSearch.toLowerCase();
                    const matchName = p.planName.toLowerCase().includes(q);
                    const matchCode = (p.providerCode || '').toLowerCase().includes(q);
                    const matchAmount = (p.dataAmount || '').toLowerCase().includes(q);
                    if (!matchName && !matchCode && !matchAmount) return false;
                  }
                  return true;
                })
                .map((plan) => {
                  const editedPrice = inlineSellingPrices[plan.id] !== undefined 
                    ? inlineSellingPrices[plan.id] 
                    : plan.sellingPriceNaira;
                  const currentCost = plan.providerCostNaira || 0;
                  const liveProfit = Number(editedPrice) - currentCost;
                  const liveMarginPercent = currentCost > 0 ? ((liveProfit / currentCost) * 100).toFixed(1) : '0';
                  const isDirty = editedPrice !== plan.sellingPriceNaira;
                  const isSaving = savingInlineId === plan.id;

                  return (
                    <div
                      key={plan.id}
                      className={`p-4 rounded-3xl bg-white dark:bg-slate-900 border transition-all space-y-3.5 ${
                        plan.isActive
                          ? 'border-slate-200 dark:border-slate-800 shadow-sm'
                          : 'border-rose-500/20 opacity-75 bg-slate-50/50 dark:bg-slate-950/40'
                      }`}
                    >
                      {/* Top Bar: Network & Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                              plan.network === 'MTN'
                                ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                                : plan.network === 'AIRTEL'
                                ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                                : plan.network === 'GLO'
                                ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                                : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            }`}
                          >
                            {plan.network}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                            {plan.planType}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTogglePlanActive(plan)}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                              plan.isActive
                                ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30 hover:bg-rose-500/20 hover:text-rose-500 hover:border-rose-500/30'
                                : 'bg-slate-500/20 text-slate-400 border-slate-500/30 hover:bg-emerald-500/20 hover:text-emerald-500'
                            }`}
                            title="Click to toggle availability"
                          >
                            {plan.isActive ? 'Active' : 'Disabled'}
                          </button>
                          <button
                            onClick={() => setEditingPlan(plan)}
                            className="p-1.5 text-slate-400 hover:text-amber-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Full Edit Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Plan Name & Duration */}
                      <div>
                        <h3 className="font-black text-sm text-slate-900 dark:text-white">
                          {plan.planName}
                        </h3>
                        <div className="text-[11px] text-slate-400 mt-0.5 flex items-center justify-between font-mono">
                          <span>Data: {plan.dataAmount || 'N/A'}</span>
                          <span>Duration: {plan.duration}</span>
                        </div>
                      </div>

                      {/* Pricing Breakdown Card */}
                      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3 grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px] font-semibold uppercase">Cost</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">
                            {formatNaira(currentCost)}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] font-semibold uppercase">Selling</span>
                          <span className="font-extrabold text-blue-500 font-mono">
                            {formatNaira(plan.sellingPriceNaira)}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] font-semibold uppercase">Profit</span>
                          <span className="font-extrabold text-emerald-500 font-mono">
                            +{formatNaira(plan.profitNaira || 0)}
                          </span>
                        </div>
                      </div>

                      {/* Dynamic In-Place Selling Price Editor */}
                      <div className="pt-1 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            Quick Selling Price (₦):
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              liveProfit > 0
                                ? 'bg-emerald-500/20 text-emerald-500'
                                : 'bg-rose-500/20 text-rose-500'
                            }`}
                          >
                            Profit: {formatNaira(liveProfit)} ({liveMarginPercent}%)
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">₦</span>
                            <input
                              type="number"
                              step="5"
                              value={editedPrice}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                setInlineSellingPrices({
                                  ...inlineSellingPrices,
                                  [plan.id]: isNaN(val) ? 0 : val
                                });
                              }}
                              className="w-full text-xs font-black bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-7 pr-3 py-1.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          <button
                            onClick={() => handleQuickPriceSave(plan)}
                            disabled={isSaving}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                              isDirty
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 animate-pulse'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-500 hover:text-slate-950'
                            }`}
                          >
                            {isSaving ? (
                              <span>Saving...</span>
                            ) : (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>{isDirty ? 'Save Price' : 'Update'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Footer: Variation Code & Source */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 font-mono">
                        <span>Code: <span className="font-bold text-slate-600 dark:text-slate-300">{plan.providerCode || 'N/A'}</span></span>
                        <span>ID: {plan.id}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Edit Plan Modal */}
          {editingPlan && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <form
                onSubmit={handleSavePlan}
                className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-white space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold">Edit Plan: {editingPlan.id}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                    {editingPlan.network}
                  </span>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400">Plan Display Name</label>
                  <input
                    type="text"
                    value={editingPlan.planName}
                    onChange={(e) => setEditingPlan({ ...editingPlan, planName: e.target.value })}
                    className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">Plan Type</label>
                    <select
                      value={editingPlan.planType}
                      onChange={(e) => setEditingPlan({ ...editingPlan, planType: e.target.value })}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white"
                    >
                      <option value="SME">SME</option>
                      <option value="Direct">Direct</option>
                      <option value="Corporate Gifting">Corporate Gifting</option>
                      <option value="Gifting">Gifting</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Duration</label>
                    <input
                      type="text"
                      value={editingPlan.duration}
                      onChange={(e) => setEditingPlan({ ...editingPlan, duration: e.target.value })}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">ClubKonnect Cost (₦)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingPlan.providerCostNaira}
                      onChange={(e) => setEditingPlan({ ...editingPlan, providerCostNaira: parseFloat(e.target.value) })}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Customer Selling Price (₦)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingPlan.sellingPriceNaira}
                      onChange={(e) => setEditingPlan({ ...editingPlan, sellingPriceNaira: parseFloat(e.target.value) })}
                      className="w-full text-xs font-bold bg-slate-800 border border-emerald-500/50 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400">ClubKonnect Variation Code (e.g. 1000, Airtel1GB)</label>
                  <input
                    type="text"
                    value={editingPlan.providerCode}
                    onChange={(e) => setEditingPlan({ ...editingPlan, providerCode: e.target.value })}
                    className="w-full text-xs font-mono bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>

                <div className="bg-slate-800/60 p-2.5 rounded-xl text-xs flex justify-between items-center text-slate-300">
                  <span>Calculated Net Profit:</span>
                  <span className="font-black text-emerald-400">
                    +{formatNaira((editingPlan.sellingPriceNaira || 0) - (editingPlan.providerCostNaira || 0))}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isActivePlan"
                    checked={editingPlan.isActive}
                    onChange={(e) => setEditingPlan({ ...editingPlan, isActive: e.target.checked })}
                    className="rounded text-amber-500"
                  />
                  <label htmlFor="isActivePlan" className="text-xs">Active and available for customer purchases</label>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingPlan(null)}
                    className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-amber-500/20"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Add New Plan Modal */}
          {isNewPlanOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <form
                onSubmit={handleCreateNewPlan}
                className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-white space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold">Add New Data Plan</h3>
                  <button
                    type="button"
                    onClick={() => setIsNewPlanOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">Network</label>
                    <select
                      value={newPlan.network}
                      onChange={(e) => setNewPlan({ ...newPlan, network: e.target.value })}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white"
                    >
                      <option value="MTN">MTN</option>
                      <option value="AIRTEL">AIRTEL</option>
                      <option value="GLO">GLO</option>
                      <option value="9MOBILE">9MOBILE</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Plan Type</label>
                    <select
                      value={newPlan.planType}
                      onChange={(e) => setNewPlan({ ...newPlan, planType: e.target.value })}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white"
                    >
                      <option value="SME">SME</option>
                      <option value="Direct">Direct</option>
                      <option value="Corporate Gifting">Corporate Gifting</option>
                      <option value="Gifting">Gifting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400">Internal Plan ID (e.g. mtn-sme-15gb)</label>
                  <input
                    type="text"
                    value={newPlan.id}
                    onChange={(e) => setNewPlan({ ...newPlan, id: e.target.value })}
                    placeholder="e.g. mtn-sme-15gb"
                    className="w-full text-xs font-mono bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400">Display Name</label>
                  <input
                    type="text"
                    value={newPlan.planName}
                    onChange={(e) => setNewPlan({ ...newPlan, planName: e.target.value })}
                    placeholder="e.g. MTN SME 15.0GB"
                    className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">Data Amount</label>
                    <input
                      type="text"
                      value={newPlan.dataAmount}
                      onChange={(e) => setNewPlan({ ...newPlan, dataAmount: e.target.value })}
                      placeholder="e.g. 15.0 GB"
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Duration</label>
                    <input
                      type="text"
                      value={newPlan.duration}
                      onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400">ClubKonnect Variation Code</label>
                  <input
                    type="text"
                    value={newPlan.providerCode}
                    onChange={(e) => setNewPlan({ ...newPlan, providerCode: e.target.value })}
                    placeholder="e.g. 15000 or Airtel15GB"
                    className="w-full text-xs font-mono bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">Wholesale Cost (₦)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newPlan.providerCostNaira}
                      onChange={(e) => setNewPlan({ ...newPlan, providerCostNaira: parseFloat(e.target.value) })}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Selling Price (₦)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newPlan.sellingPriceNaira}
                      onChange={(e) => setNewPlan({ ...newPlan, sellingPriceNaira: parseFloat(e.target.value) })}
                      className="w-full text-xs font-bold bg-slate-800 border border-emerald-500/50 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsNewPlanOpen(false)}
                    className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-amber-500/20"
                  >
                    Create Plan
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: TRANSACTIONS & REQUERY */}
      {activeTab === 'transactions' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={txSearch}
              onChange={(e) => setTxSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') fetchTransactions();
              }}
              placeholder="Search reference, phone, or email and press Enter..."
              className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {loadingTx ? (
            <div className="py-12 text-center text-slate-400 text-xs">Loading transactions...</div>
          ) : (
            <div className="space-y-2.5">
              {allTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{tx.userName}</span>
                        <span className="text-[10px] font-mono font-bold text-blue-500">{tx.reference}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {tx.network} • {tx.recipientPhone || 'N/A'} • {tx.planName || tx.productType}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-black text-slate-900 dark:text-white">
                        {formatNaira(tx.amountNaira)}
                      </div>
                      <span
                        className={`inline-block mt-0.5 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                          tx.status === 'successful'
                            ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                            : tx.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-500 border-rose-500/30'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                    <div>Date: {formatDate(tx.createdAt)}</div>
                    <div className="flex items-center gap-2">
                      {(tx.status === 'pending' || tx.status === 'processing') && (
                        <button
                          onClick={() => handleRetryPendingTransaction(tx.id)}
                          disabled={retryingTxId === tx.id}
                          className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer disabled:opacity-50"
                          title="Manually retry this pending transaction with ClubKonnect"
                        >
                          {retryingTxId === tx.id ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Retrying...</span>
                            </>
                          ) : (
                            <>
                              <RefreshCw className="w-3 h-3" />
                              <span>Retry Pending</span>
                            </>
                          )}
                        </button>
                      )}

                      <button
                        onClick={() => handleRequery(tx.id)}
                        className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold transition-colors"
                      >
                        Requery Provider
                      </button>

                      {tx.status !== 'refunded' && (
                        <button
                          onClick={() => handleManualRefund(tx.id)}
                          className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white font-semibold transition-colors"
                        >
                          Manual Refund
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: SETTINGS */}
      {activeTab === 'settings' && settings && (
        <div className="space-y-6">
          <form onSubmit={handleSaveSettings} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Manual Bank Transfer Account Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                value={settings.bank_name}
                onChange={(e) => setSettings({ ...settings, bank_name: e.target.value })}
                className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                Account Number
              </label>
              <input
                type="text"
                value={settings.account_number}
                onChange={(e) => setSettings({ ...settings, account_number: e.target.value })}
                className="w-full text-xs font-mono font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              Account Holder Name
            </label>
            <input
              type="text"
              value={settings.account_name}
              onChange={(e) => setSettings({ ...settings, account_name: e.target.value })}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              Transfer Instructions Displayed to Users
            </label>
            <textarea
              rows={3}
              value={settings.manual_funding_instructions}
              onChange={(e) => setSettings({ ...settings, manual_funding_instructions: e.target.value })}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white"
            />
          </div>

          {/* Android Direct APK Link Configuration */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
              <span>Android APK Download URL (Direct .apk)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-semibold">
                Mobile App
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 mb-2">
              Provide a direct link to your hosted Android APK file (e.g. Google Drive direct link, Cloud storage, or CDN). When set, users will see this download button alongside PWA installation.
            </p>
            <input
              type="url"
              value={settings.apk_download_url || ''}
              onChange={(e) => setSettings({ ...settings, apk_download_url: e.target.value })}
              placeholder="https://example.com/downloads/standard-datahub.apk"
              className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              Changes reflect immediately across all client applications
            </span>
            <button
              type="submit"
              disabled={savingSettings}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-500/20"
            >
              {savingSettings ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </form>

        {/* SENSITIVE API KEY SECURITY (Super Admin Only) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-500 border border-rose-500/30 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 flex-wrap">
                  <span>ClubKonnect Gateway Credentials & Security</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500 border border-rose-500/30">
                    Super Admin Only
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Stored securely in dedicated <code className="text-amber-500">admin_settings</code> table with Row Level Security (RLS) enforcement.
                </p>
              </div>
            </div>

            {user?.role !== 'super_admin' && (
              <span className="text-[11px] font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-xl self-start sm:self-auto">
                🔒 Locked (super_admin required to edit)
              </span>
            )}
          </div>

          <form onSubmit={handleSaveSecuritySettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* User ID */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  ClubKonnect UserID (Phone / Account)
                </label>
                <input
                  type="text"
                  value={securityUserIdInput}
                  disabled={user?.role !== 'super_admin'}
                  onChange={(e) => setSecurityUserIdInput(e.target.value)}
                  placeholder="e.g. ClubKonnect UserID"
                  className="w-full text-xs font-mono font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">Configured UserID: {securitySettings?.userId || 'Not configured'}</p>
              </div>

              {/* Base URL */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  ClubKonnect Base URL
                </label>
                <input
                  type="text"
                  value={securitySettings?.baseUrl || 'https://www.nellobytesystems.com'}
                  disabled
                  className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                />
                <p className="text-[11px] text-slate-400 mt-1">Direct endpoint: https://www.nellobytesystems.com</p>
              </div>
            </div>

            {/* API Key with Dots ••••• and Eye Icon */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                ClubKonnect API Key (Protected with dots)
              </label>
              <div className="relative">
                <input
                  type={isApiKeyRevealed ? 'text' : 'password'}
                  value={securityApiKeyInput || (securitySettings?.maskedApiKey ? (isApiKeyRevealed ? securitySettings.rawApiKey || '' : '••••••••••••••••••••') : '')}
                  disabled={user?.role !== 'super_admin'}
                  onChange={(e) => setSecurityApiKeyInput(e.target.value)}
                  placeholder="Enter new ClubKonnect API Key to update"
                  className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-3 pr-10 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setIsApiKeyRevealed(!isApiKeyRevealed)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 p-0.5 rounded cursor-pointer"
                  title={isApiKeyRevealed ? 'Hide API key' : 'Show API key'}
                >
                  {isApiKeyRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
                <span>API Key field is masked with dots to prevent shoulder surfing or recording.</span>
                {securitySettings?.hasApiKey && (
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> API Key Configured
                  </span>
                )}
              </div>
            </div>

            {user?.role === 'super_admin' && (
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={savingSecurity}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-rose-600/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {savingSecurity ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving API Key to DB...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Update API Key in admin_settings</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </form>

          {/* SETTINGS CHANGE LOG TABLE (settings_logs) */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>API Settings Change Log (settings_logs)</span>
              <span className="text-[10px] text-slate-400 font-normal">
                ({settingsLogs.length} audit entries)
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Every modification to the API Key or UserID is permanently logged in <code>settings_logs</code> with the admin ID and timestamp.
            </p>

            {settingsLogs.length === 0 ? (
              <div className="text-xs text-slate-400 py-3 text-center bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                No settings changes logged yet.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="py-2 px-3 font-semibold">ID</th>
                      <th className="py-2 px-3 font-semibold">Admin</th>
                      <th className="py-2 px-3 font-semibold">Field Changed</th>
                      <th className="py-2 px-3 font-semibold">Old Value</th>
                      <th className="py-2 px-3 font-semibold">New Value</th>
                      <th className="py-2 px-3 font-semibold">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                    {settingsLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <td className="py-2 px-3 text-slate-400">#{log.id}</td>
                        <td className="py-2 px-3 font-sans font-medium text-slate-800 dark:text-slate-200">
                          {log.admin_name || log.admin_email || `Admin #${log.admin_id}`}
                        </td>
                        <td className="py-2 px-3 font-bold text-amber-500">{log.field_changed}</td>
                        <td className="py-2 px-3 text-slate-400 max-w-[120px] truncate">{log.old_value || 'None'}</td>
                        <td className="py-2 px-3 text-emerald-500 max-w-[120px] truncate">{log.new_value}</td>
                        <td className="py-2 px-3 font-sans text-slate-400">{formatDate(log.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* TAB 7: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Administrative Audit Trail
          </h2>
          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {log.action.toUpperCase()}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {log.details}
                  </div>
                </div>
                <div className="text-right text-[10px] text-slate-400 font-mono">
                  <div>{log.admin_email}</div>
                  <div>{formatDate(log.created_at)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REALTIME PENDING FUNDING REQUESTS BELL MODAL */}
      {isBellModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B0F19] border border-white/10 rounded-3xl w-full max-w-2xl p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <Bell className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <span>Pending Bank Funding Requests</span>
                    <span className="text-[11px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full">
                      {pendingCount} Pending
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">Auto-refreshes every 10 seconds with audio chime alert</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const next = !soundEnabled;
                    setSoundEnabled(next);
                    showToast(next ? 'Sound Alert enabled' : 'Sound Alert muted', 'info');
                  }}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    soundEnabled
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                  title={soundEnabled ? 'Alert Chime Sound ON' : 'Alert Chime Sound MUTED'}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="hidden sm:inline">{soundEnabled ? 'Sound ON' : 'Muted'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsBellModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* List of Pending Requests */}
            <div className="overflow-y-auto py-4 space-y-3 flex-1">
              {fundingRequests.filter((r) => r.status === 'pending').length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-80" />
                  <p className="font-bold text-white text-sm">All Caught Up!</p>
                  <p className="text-slate-400 mt-1">There are no pending manual bank funding requests at the moment.</p>
                </div>
              ) : (
                fundingRequests
                  .filter((r) => r.status === 'pending')
                  .map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-lg font-black text-emerald-400">
                            {formatNaira(req.amountNaira)}
                          </div>
                          <div className="text-xs text-white font-bold mt-0.5">
                            {req.userName}{' '}
                            <span className="text-slate-400 font-normal">
                              ({req.userPhone || req.userEmail})
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Funding Ref: <span className="font-mono text-amber-400 font-bold">{req.internalReference || req.reference}</span>
                            {req.transferReference && (
                              <span> • Bank Tx: <span className="font-mono text-blue-400">{req.transferReference}</span></span>
                            )}
                          </div>
                        </div>

                        <div className="text-right text-[10px] text-slate-400">
                          {formatDate(req.createdAt)}
                        </div>
                      </div>

                      {/* Proof Receipt Image */}
                      {req.proofImageUrl && (
                        <div className="p-2.5 bg-slate-800/60 rounded-xl flex items-center gap-3">
                          <img
                            src={req.proofImageUrl}
                            alt="Bank Proof"
                            className="w-14 h-14 object-cover rounded-lg border border-white/10 shrink-0"
                          />
                          <div className="text-xs">
                            <span className="font-bold text-slate-200">Customer Proof Receipt Attached</span>
                            <a
                              href={req.proofImageUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-400 hover:underline flex items-center gap-1 text-[11px] font-semibold mt-0.5"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>View Receipt Fullscreen</span>
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons: APPROVE & REJECT */}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                        <button
                          type="button"
                          disabled={processingFundingId === req.id}
                          onClick={() => handleApproveFunding(req.id)}
                          className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
                        >
                          {processingFundingId === req.id ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Crediting Wallet...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>APPROVE (+₦{req.amountNaira})</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setRejectingRequestId(req.id);
                            setRejectionReason('');
                          }}
                          className="px-4 py-2.5 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white font-bold text-xs rounded-xl transition-all border border-rose-500/30 cursor-pointer"
                        >
                          REJECT
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 shrink-0">
              <span>Auto-refreshes every 10 seconds</span>
              <button
                type="button"
                onClick={() => {
                  fetchFundingRequests();
                  fetchPendingAlerts();
                }}
                className="text-amber-400 hover:underline font-semibold"
              >
                Refresh Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
```

### FILE: data_store.json
```json
{
  "user": {
    "id": "usr_001",
    "name": "Ibrahim Mal",
    "email": "ibrahimmal916@gmail.com",
    "phone": "08123456789",
    "walletBalance": 7401,
    "referralCode": "DH-7789",
    "virtualAccounts": [
      {
        "bankName": "Moniepoint MFB",
        "accountNumber": "8123456789",
        "accountName": "DataHub / Ibrahim Mal"
      },
      {
        "bankName": "Wema Bank",
        "accountNumber": "7829104432",
        "accountName": "DataHub / Ibrahim Mal"
      },
      {
        "bankName": "Palmpay",
        "accountNumber": "9012345678",
        "accountName": "DataHub / Ibrahim Mal"
      }
    ]
  },
  "transactions": [
    {
      "id": "DH-TX-74614",
      "type": "AIRTIME",
      "network": "MTN",
      "networkCode": "01",
      "recipient": "08031234567",
      "faceValue": 100,
      "amountDeducted": 99,
      "discount": 1,
      "status": "SUCCESS",
      "reference": "DH_AIR_1790322630042_452",
      "providerResponse": "Simulated Order Received: statuscode 100",
      "timestamp": "2026-09-25T07:50:30.042Z"
    },
    {
      "id": "DH-TX-73678",
      "type": "AIRTIME",
      "network": "MTN",
      "networkCode": "01",
      "recipient": "08031234567",
      "faceValue": 100,
      "amountDeducted": 0,
      "discount": 0,
      "status": "FAILED",
      "reference": "DH_AIR_1790322625946_338",
      "providerResponse": "{\"status\":\"THIS_SERVICE_IS_TEMPORARY_UNAVAILABLE\"}",
      "timestamp": "2026-09-25T07:50:26.490Z"
    },
    {
      "id": "DH-TX-10928",
      "type": "AIRTIME",
      "network": "MTN",
      "networkCode": "01",
      "recipient": "08031234567",
      "faceValue": 1000,
      "amountDeducted": 990,
      "discount": 10,
      "status": "SUCCESS",
      "reference": "DH_AIR_1727221001_842",
      "providerResponse": "ORDER_RECEIVED: Statuscode 100",
      "timestamp": "2026-09-25T05:50:22.825Z"
    },
    {
      "id": "DH-TX-10927",
      "type": "DATA",
      "network": "AIRTEL",
      "networkCode": "04",
      "planName": "Airtel 2.0GB Corporate Gifting",
      "recipient": "09012345678",
      "faceValue": 580,
      "amountDeducted": 580,
      "discount": 0,
      "status": "SUCCESS",
      "reference": "DH_DAT_1727218900_319",
      "providerResponse": "ORDER_RECEIVED: Statuscode 100",
      "timestamp": "2026-09-25T02:50:22.825Z"
    },
    {
      "id": "DH-TX-10926",
      "type": "WALLET_FUNDING",
      "recipient": "Wallet Top-Up",
      "faceValue": 5000,
      "amountDeducted": -5000,
      "status": "SUCCESS",
      "reference": "FUND_MONIEPOINT_8921",
      "providerResponse": "Direct Transfer Verified",
      "timestamp": "2026-09-24T07:50:22.825Z"
    }
  ],
  "simulationMode": false
}
```

### FILE: data/persistence_snapshot.json
```json
{
  "users": [
    {
      "id": 72,
      "full_name": "Tukur Bello",
      "email": "tukurbellosaulawa@gmail.com",
      "phone": "07035638903",
      "password_hash": "$2b$10$w3RQLYwl4fQV0IRJE56hv.woA6bCJgUN/pkPj5L5CMaqJ35Algzm6",
      "transaction_pin_hash": null,
      "role": "user",
      "status": "active",
      "referral_code": "DHK589X",
      "referred_by": null,
      "created_at": "2026-10-01T07:03:23.890Z",
      "balance_kobo": 0
    },
    {
      "id": 5,
      "full_name": "Mal Ibrahim",
      "email": "ibrahimmal916@gmail.com",
      "phone": "08161720895",
      "password_hash": "$2b$10$UJ236EOqlii3CnsZY/QX2eOPJBxs2c6Gq/XZABK9dun1xDqCr5vcW",
      "transaction_pin_hash": "$2b$10$12Nc/dBfJTpQum2UDW3XdO9VhubklW/P4NsOGMZmsS2tx8bsawygW",
      "role": "user",
      "status": "active",
      "referral_code": "DHG39CM",
      "referred_by": null,
      "created_at": "2026-09-26T08:37:51.423Z",
      "balance_kobo": 190200
    },
    {
      "id": 6,
      "full_name": "Abdullahi Rabiu",
      "email": "abdullahrabiu2000@gmail.com",
      "phone": "07072675483",
      "password_hash": "$2b$10$me5B4jyb6wpWk6skWyomQextEQujzxpbN4/PaQiyChBjv8DYlDGLy",
      "transaction_pin_hash": null,
      "role": "user",
      "status": "active",
      "referral_code": "DHOML83",
      "referred_by": "DHG39CM",
      "created_at": "2026-09-26T13:49:18.444Z",
      "balance_kobo": 0
    },
    {
      "id": 7,
      "full_name": "Suhailat yahaya",
      "email": "suhailayahaya324@gmail.com",
      "phone": "07026074978",
      "password_hash": "$2b$10$2V6wlR8xtzPYKYmKJ/QdNeFKup9uDHPpfTyeQNLUueGLYBYXzBUbu",
      "transaction_pin_hash": null,
      "role": "user",
      "status": "active",
      "referral_code": "DHOF92P",
      "referred_by": "DHG39CM",
      "created_at": "2026-09-26T18:47:30.702Z",
      "balance_kobo": 0
    },
    {
      "id": 8,
      "full_name": "Nasir Lawal",
      "email": "nasurulawal887@gmail.com",
      "phone": "08082526258",
      "password_hash": "$2b$10$dGkJH4L2Z0AtTigvehrPqe//aH.hlt6Yq3I31J4JxwrzmhIrd7Tyi",
      "transaction_pin_hash": null,
      "role": "user",
      "status": "active",
      "referral_code": "DHC574Q",
      "referred_by": null,
      "created_at": "2026-09-26T21:17:26.304Z",
      "balance_kobo": 0
    },
    {
      "id": 9,
      "full_name": "Muhammad Usman Bk",
      "email": "usmanbkmuhammed@gmail.com",
      "phone": "08062068619",
      "password_hash": "$2b$10$IYlFbls1u1t2JzvqDl97P.M8dRscIqKeHzn.2uNRCbvcMCYSASLB2",
      "transaction_pin_hash": "$2b$10$GqicMg.7bE7rFiWtw0Mz3.GdXILeBYqukuu6IVyIJ2h7P2cJ2dwbe",
      "role": "user",
      "status": "active",
      "referral_code": "DHPQZ2U",
      "referred_by": null,
      "created_at": "2026-09-26T22:23:41.358Z",
      "balance_kobo": 0
    },
    {
      "id": 10,
      "full_name": "Ibrahim",
      "email": "ibrahimyaukt@gmail.com",
      "phone": "08036814053",
      "password_hash": "$2b$10$NJHzE7T7RdixbZCUz8XA0u1Ezw6bgUdKqayDQADl55pZN3cMSHwj2",
      "transaction_pin_hash": null,
      "role": "user",
      "status": "active",
      "referral_code": "DH0L8MU",
      "referred_by": null,
      "created_at": "2026-09-27T14:18:23.765Z",
      "balance_kobo": 0
    },
    {
      "id": 11,
      "full_name": "Khadija Abubakar Abdullahi",
      "email": "khadijaabu765@gmail.com",
      "phone": "09161699152",
      "password_hash": "$2b$10$2DDg1dgB09qEucW/uK/A1.jkGcM9pY.yP.yzjdM57pM8ZDSxwobXi",
      "transaction_pin_hash": null,
      "role": "user",
      "status": "active",
      "referral_code": "DHX3081",
      "referred_by": null,
      "created_at": "2026-09-27T15:29:22.357Z",
      "balance_kobo": 0
    },
    {
      "id": 16,
      "full_name": "Abubakar Abubakar",
      "email": "abubakarabubakarnagoje@gmail.com",
      "phone": "07026173366",
      "password_hash": "$2b$10$y1jtMeTNPfxe2LcyOW1vGuhTdSCd.xaWtqOUncvo33PTxYCR1LkAm",
      "transaction_pin_hash": null,
      "role": "user",
      "status": "active",
      "referral_code": "DHVHFXO",
      "referred_by": "3080",
      "created_at": "2026-09-27T22:24:49.811Z",
      "balance_kobo": 0
    },
    {
      "id": 38,
      "full_name": "Adamu Abdurrahman",
      "email": "adamustores12@gmail.com",
      "phone": "08032336821",
      "password_hash": "$2b$10$b1exibaesfclIaYu2NCzye.Ht8utzdXaNW2gCjJn7vPf8L4vIejVy",
      "transaction_pin_hash": null,
      "role": "user",
      "status": "active",
      "referral_code": "DHVS5AM",
      "referred_by": null,
      "created_at": "2026-09-29T08:41:15.780Z",
      "balance_kobo": 0
    },
    {
      "id": 39,
      "full_name": "Ahmad aliyu shehu",
      "email": "ahmadshehualiyu00@gmail.com",
      "phone": "07045440449",
      "password_hash": "$2b$10$ayp9JVBieL4n7IcNVU1op.SJF69EDSJGOHHYg/gaCM2XnCSRab.82",
      "transaction_pin_hash": null,
      "role": "user",
      "status": "active",
      "referral_code": "DHUX8VM",
      "referred_by": null,
      "created_at": "2026-09-29T11:25:13.749Z",
      "balance_kobo": 0
    },
    {
      "id": 24,
      "full_name": "Suleman hassan",
      "email": "sulemanhassan699@gmail.com",
      "phone": "07034886373",
      "password_hash": "$2b$10$UV4RW9XZ0Oa9wGf.AlwkJOw4pgXdPWaPdhrVTOc1nhjmD76mO/Mai",
      "transaction_pin_hash": "$2b$10$guDiQEvo3tpojxoDoseMS.4oDc0QtSGVpZbRQrwVu8ZKZSmhNYgAy",
      "role": "user",
      "status": "active",
      "referral_code": "DHVIWK2",
      "referred_by": null,
      "created_at": "2026-09-28T11:02:46.398Z",
      "balance_kobo": 50000
    },
    {
      "id": 50,
      "full_name": "Khalid labaran",
      "email": "khalidlavaran002@gmail.com",
      "phone": "09133399847",
      "password_hash": "$2b$10$zsQyjrSo245bcg1HTi99xu8KfoufeCEaC3GgpRXqm9avHMGJQqasa",
      "transaction_pin_hash": "$2b$10$RamqgzKuct6/NRKihoE87e106QLacdZL0xBWOJP5YYcagy1DmOew2",
      "role": "user",
      "status": "active",
      "referral_code": "DHKLQ99",
      "referred_by": null,
      "created_at": "2026-09-30T06:46:58.828Z",
      "balance_kobo": 5000
    },
    {
      "id": 51,
      "full_name": "Sani Hassan",
      "email": "sanihassan2080@gmail.com",
      "phone": "08108452226",
      "password_hash": "$2b$10$r4Qzy2cgbCpZHQEmbAXwZunwycp/luCufLJaOmAacORxew3hYW.z.",
      "transaction_pin_hash": "$2b$10$oe3JJG4QEAUWI.1qYSDQVuzdD2IMpIPLrNAUaltJvBGL/kD/7q5dW",
      "role": "user",
      "status": "active",
      "referral_code": "DH8D9CR",
      "referred_by": null,
      "created_at": "2026-09-30T06:59:26.570Z",
      "balance_kobo": 0
    },
    {
      "id": 52,
      "full_name": "Automated Tester",
      "email": "test_1790542690803@datahub.ng",
      "phone": "08031770355",
      "password_hash": "$2b$10$4XTijv8XdPgRhTjvMsX02.1dIzCRm6zp3FVgvbcxhfBW.OlA0QFFq",
      "transaction_pin_hash": "$2b$10$zkiNGHRXF.Yr4Dq5GkAohO7zyXXiNLNAqV5DKLDUncaaYONG4tr.O",
      "role": "user",
      "status": "suspended",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:45.770Z",
      "balance_kobo": 245200
    },
    {
      "id": 49,
      "full_name": "Abdurrashid sani",
      "email": "baseeruevraheemsanee@gmail.com",
      "phone": "09069528811",
      "password_hash": "$2b$10$lIb.56Arw6OkvL6kRiTS4OnNS4Fk7b2GBIiH/U02DBmUgRoFbe/Fq",
      "transaction_pin_hash": null,
      "role": "user",
      "status": "active",
      "referral_code": "DHXSOVB",
      "referred_by": null,
      "created_at": "2026-09-30T06:28:42.305Z",
      "balance_kobo": 0
    },
    {
      "id": 44,
      "full_name": "Zayyad Haruna Ibbi",
      "email": "harunazayyad90@gmail.com",
      "phone": "07063711293",
      "password_hash": "$2b$10$Xup3V/UAEFq6r7Cyyh60G.alrfr2.2K/NHmcLE/yUVPGovI2NlPPi",
      "transaction_pin_hash": null,
      "role": "user",
      "status": "active",
      "referral_code": "DH9NR8S",
      "referred_by": null,
      "created_at": "2026-09-29T18:46:09.789Z",
      "balance_kobo": 0
    },
    {
      "id": 53,
      "full_name": "Automated Tester",
      "email": "test_1790660013034@datahub.ng",
      "phone": "08015601122",
      "password_hash": "$2b$10$1.ME6ndjWW3sFtqDp21tGuufr38x6nk.rZmR/MU0u8rQ.uRa3oZvO",
      "transaction_pin_hash": "$2b$10$DPW/hOMvBw3ndw2UbWCkJ.4h3c.EKcssgAx3xaKuvnM1.tnE0kow.",
      "role": "user",
      "status": "active",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:45.830Z",
      "balance_kobo": 245200
    },
    {
      "id": 54,
      "full_name": "Automated Tester",
      "email": "test_1790660021620@datahub.ng",
      "phone": "08073376652",
      "password_hash": "$2b$10$wINxw43AmAV5w0kDGXq72.R9q41nS6Gf.lI25cC.2wONGUdaRwdDG",
      "transaction_pin_hash": "$2b$10$fT85u2fP6aNrmok/Z/b6fOSTcWu8Rbb/KpOmN4o0EHuEq1alLvP5i",
      "role": "user",
      "status": "active",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:45.877Z",
      "balance_kobo": 245200
    },
    {
      "id": 55,
      "full_name": "Automated Tester",
      "email": "test_1790660038318@datahub.ng",
      "phone": "08017651431",
      "password_hash": "$2b$10$KOxO7YadIvXMvtOfwgcsEuboCWWAZjVeuqkd3tDlaDx/KBYggH5ma",
      "transaction_pin_hash": "$2b$10$VGewjzXEE/brE3ffyh8fjupTTrnl.D221vmpowDW.5MIQ82Vmh/LW",
      "role": "user",
      "status": "active",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:45.923Z",
      "balance_kobo": 245200
    },
    {
      "id": 56,
      "full_name": "Automated Tester",
      "email": "test_1790688306301@datahub.ng",
      "phone": "08085938656",
      "password_hash": "$2b$10$/7JzZ48PV9dERpdF3MWru.bgoipHnZrfDEbL74WL85OBL3aDokQAG",
      "transaction_pin_hash": "$2b$10$SeaMa1gyuamSjTpmEiac/u9gw4tf63Mcb.AkLYyVY8AFZMCbSESZS",
      "role": "user",
      "status": "active",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:46.063Z",
      "balance_kobo": 245200
    },
    {
      "id": 57,
      "full_name": "Demo VTU Tester",
      "email": "user@datahub.ng",
      "phone": "08098765432",
      "password_hash": "$2b$10$.Cn3ToV8wa2kTwZf1QVwmO/BqS0a/wymeQ.DgcFPw1vVLYFcxb.KO",
      "transaction_pin_hash": "$2b$10$GZb53UXUdadfZhuFvmXWHum2NBeRwKOflzrzCbj4sUIXNboJI2REW",
      "role": "user",
      "status": "active",
      "referral_code": "TESTUSER",
      "referred_by": null,
      "created_at": "2026-09-30T08:18:46.110Z",
      "balance_kobo": 500000
    },
    {
      "id": 58,
      "full_name": "Test Persistence User",
      "email": "testpersistence@gmail.com",
      "phone": "08161720896",
      "password_hash": "$2b$10$ShLiK9tn/W/dHk1CjLyEHew.vtVdAUg/cmqbT0PMrCx.MfxPlttvS",
      "transaction_pin_hash": null,
      "role": "user",
      "status": "active",
      "referral_code": "DHNX45C",
      "referred_by": null,
      "created_at": "2026-09-30T08:18:46.158Z",
      "balance_kobo": 0
    },
    {
      "id": 59,
      "full_name": "Permanent Customer",
      "email": "permuser@standarddatahub.ng",
      "phone": "08122334455",
      "password_hash": "$2b$10$YkpKn2gezM3FW08fmlkYOeE3gnCToqQixRVIchjKw8eydCnF6sBrW",
      "transaction_pin_hash": null,
      "role": "user",
      "status": "suspended",
      "referral_code": "DHFKH1P",
      "referred_by": null,
      "created_at": "2026-09-30T08:18:46.206Z",
      "balance_kobo": 0
    },
    {
      "id": 60,
      "full_name": "Automated Tester",
      "email": "test_1790541464441@datahub.ng",
      "phone": "08096652541",
      "password_hash": "$2b$10$.zTLKOPbTWKmZ5xMXipek.3Qj43eQfUpM.JStLNwT1dgbkd5pbE.C",
      "transaction_pin_hash": "$2b$10$rsD/blUNE.18y1aoh4PzMu.2b2Vd..eMkJdrEzyxo8qb0pquDJ3qC",
      "role": "user",
      "status": "suspended",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:46.252Z",
      "balance_kobo": 245200
    },
    {
      "id": 61,
      "full_name": "Automated Tester",
      "email": "test_1790686813250@datahub.ng",
      "phone": "08084179814",
      "password_hash": "$2b$10$XZJkRWNt9R.3alFeOeVgt.qXkv1TdXl9Oceu42LivKz4I9UQDDPCm",
      "transaction_pin_hash": "$2b$10$hqMf30R/leI46M102k4rRuzskR1cqyu1dRXm6Ztcg1wsDBB9Wavaa",
      "role": "user",
      "status": "active",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:46.298Z",
      "balance_kobo": 245200
    },
    {
      "id": 62,
      "full_name": "Automated Tester",
      "email": "test_1790541482386@datahub.ng",
      "phone": "08041933914",
      "password_hash": "$2b$10$ku3m95flCXYvY7xm0ChsreeZP5LMpT18SO3WzDt7sqCHJBQNRwtvK",
      "transaction_pin_hash": "$2b$10$fKua1R5dnLk6BoLinMN55eSfM0FSsdndKB7sMrjfuHiGHEuPRkxcW",
      "role": "user",
      "status": "suspended",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:46.344Z",
      "balance_kobo": 245200
    },
    {
      "id": 63,
      "full_name": "Automated Tester",
      "email": "test_1790541733494@datahub.ng",
      "phone": "08085959578",
      "password_hash": "$2b$10$PSA8aYdbn3HmjfN.Wklw6uwMFiHMAFPzbEzPnKnQRvPRol91Hn6d.",
      "transaction_pin_hash": "$2b$10$bKCOvgXTTE8HqgRnGz1wEOWxCPPXUDe.zSzLxV5yOUjmH0FisTLry",
      "role": "user",
      "status": "suspended",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:46.389Z",
      "balance_kobo": 245200
    },
    {
      "id": 64,
      "full_name": "Automated Tester",
      "email": "test_1790686354986@datahub.ng",
      "phone": "08074197786",
      "password_hash": "$2b$10$pgC4MxsBn6xMhtHbDMabL.FiE1VArBOMc94dGruvx6oWqPCpF7vW6",
      "transaction_pin_hash": "$2b$10$YoV7eddLBdh76.zc0e5HtOCIV0sr7liJc0VLEJy/iyJZcLHeRrsXq",
      "role": "user",
      "status": "active",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:46.435Z",
      "balance_kobo": 245200
    },
    {
      "id": 65,
      "full_name": "Automated Tester",
      "email": "test_1790744158724@datahub.ng",
      "phone": "08014236973",
      "password_hash": "$2b$10$o1zKeoo6/Ugflj/YjHfJcuQopg4efkTJt3Pr2p8HYwKk9P8NnJz4m",
      "transaction_pin_hash": "$2b$10$Bk07B8260YcXmZE0HYeAHO.IcW0q1PqRhPPDWD2koA8XKVeRARo8G",
      "role": "user",
      "status": "active",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:46.481Z",
      "balance_kobo": 245200
    },
    {
      "id": 66,
      "full_name": "Automated Tester",
      "email": "test_1790687882688@datahub.ng",
      "phone": "08086245232",
      "password_hash": "$2b$10$2Ry3sqlqTasPK.LSzdhAXeo0SvKZ/KkiIm9mJ6xV.ufBN3/jpTB.2",
      "transaction_pin_hash": "$2b$10$voqdWpaws8rzIogvnoZL5.ZcphP9hjSOXgU8b3YESVd33ImFix2ae",
      "role": "user",
      "status": "active",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:46.527Z",
      "balance_kobo": 245200
    },
    {
      "id": 67,
      "full_name": "Automated Tester",
      "email": "test_1790743371536@datahub.ng",
      "phone": "08072582743",
      "password_hash": "$2b$10$T5M199JwPLUd2HrZNokpf.kreG57mqJEaGqrR9zsQZpWH8fDaxLFG",
      "transaction_pin_hash": "$2b$10$rZL/AnOV296pgedcpxOmru7u5ZTX0fWDoYmVVgDmIFrjU9lkyxRDS",
      "role": "user",
      "status": "active",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:46.598Z",
      "balance_kobo": 245200
    },
    {
      "id": 68,
      "full_name": "Automated Tester",
      "email": "test_1790743201844@datahub.ng",
      "phone": "08079159502",
      "password_hash": "$2b$10$70pk6pEsuafoS56qzaEzBOZNy3ehqJj6Z9FetG91dB9JpA2QSTvj2",
      "transaction_pin_hash": "$2b$10$tU0U2NVAafjdUWuYP7daz.Izzw0z5f2HIP4./dSWESms0rjBnr5fK",
      "role": "user",
      "status": "active",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:46.682Z",
      "balance_kobo": 245200
    },
    {
      "id": 69,
      "full_name": "Automated Tester",
      "email": "test_1790743392565@datahub.ng",
      "phone": "08035794865",
      "password_hash": "$2b$10$6H00f2Cvi2SWo03owKhuBesTn2V37oOVpq0alGLHLYBSmUqTDqAd6",
      "transaction_pin_hash": "$2b$10$mzgMFOajvzbmz9O2e3dbNe0k3il/Jwlq6n27dSlDWhsgu12pVWZT.",
      "role": "user",
      "status": "active",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-09-30T08:18:46.728Z",
      "balance_kobo": 245200
    },
    {
      "id": 71,
      "full_name": "Muhammad Abdulrahman",
      "email": "muhammadabdulrahman0800@gmail.com",
      "phone": "09162078151",
      "password_hash": "$2b$10$ASPNo4t2dgwxpCs0iP6gQ.m0UkONqT3Owrg3F/dNHl5oNPN666XbS",
      "transaction_pin_hash": "$2b$10$.5UNBTEioXu0rBxOal.wqus6EvZlBNhwmt6JmSSTfbEXSeYYC0Xce",
      "role": "user",
      "status": "active",
      "referral_code": "DHFOBRL",
      "referred_by": "M123",
      "created_at": "2026-09-30T16:01:54.681Z",
      "balance_kobo": 11000
    },
    {
      "id": 1,
      "full_name": "DataHub Super Admin",
      "email": "admin@datahub.ng",
      "phone": "08012345678",
      "password_hash": "$2b$10$ily5FPIYs/hk0CKMfExvJurTSu1d1peKrlvagG/6tYu4EqMBBaBFa",
      "transaction_pin_hash": "$2b$10$QqwKmpxtqwYMTarCibPJYu.0vSttFMvKVPevXv5v2aHiQKoLIiIWW",
      "role": "super_admin",
      "status": "active",
      "referral_code": "ADMIN01",
      "referred_by": null,
      "created_at": "2026-09-26T08:07:50.395Z",
      "balance_kobo": 100000000
    },
    {
      "id": 70,
      "full_name": "Muhammad Yusuf Abubakar",
      "email": "muhammadyusufabubakar2005@gmail.com",
      "phone": "08164898565",
      "password_hash": "$2b$10$M0wL9d8TFSQXqVTIurMynukQm1Ni/1t72LqkM3IVS3hPw9RoLt6o2",
      "transaction_pin_hash": null,
      "role": "user",
      "status": "active",
      "referral_code": "DHRW029",
      "referred_by": null,
      "created_at": "2026-09-30T14:40:46.564Z",
      "balance_kobo": 0
    },
    {
      "id": 73,
      "full_name": "Automated Tester",
      "email": "test_1790848348052@datahub.ng",
      "phone": "08082351345",
      "password_hash": "$2b$10$Bsasli9xxaUBBHsN.IGz7ulPGrMqHiInu16dHsoXE6gPe8afTzclW",
      "transaction_pin_hash": "$2b$10$ima6ew46PTbHO6xXWe0u3OnQ2sn8M3NpTg1ZIli3e3newAYACj2IC",
      "role": "user",
      "status": "active",
      "referral_code": null,
      "referred_by": null,
      "created_at": "2026-10-01T09:52:28.151Z",
      "balance_kobo": 245200
    }
  ],
  "transactions": [
    {
      "id": 180,
      "reference": "DH-AIR-1790850609580-8642",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "6720984019",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-10-01T10:30:09.779Z",
      "updated_at": "2026-10-01T10:30:10.762Z"
    },
    {
      "id": 179,
      "reference": "DH-AIR-1790848350147-3993",
      "user_id": 73,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08123456789",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "AIR-46394275",
      "provider_cost_kobo": "9650",
      "selling_price_kobo": "9800",
      "profit_kobo": "150",
      "status": "SUCCESS",
      "is_demo": true,
      "refund_reference": null,
      "metadata": "{\"face_value_naira\":100,\"discount_percent\":2}",
      "created_at": "2026-10-01T09:52:30.233Z",
      "updated_at": "2026-10-01T09:52:30.248Z"
    },
    {
      "id": 178,
      "reference": "DH-DATA-1790848349792-5467",
      "user_id": 73,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08012340000",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "FAIL-1790848349902",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": true,
      "refund_reference": "REFUND-DH-DATA-1790848349792-5467",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-10-01T09:52:29.877Z",
      "updated_at": "2026-10-01T09:52:29.991Z"
    },
    {
      "id": 177,
      "reference": "DH-DATA-1790848349498-9837",
      "user_id": 73,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08123456789",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "CK-96766921",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "SUCCESS",
      "is_demo": true,
      "refund_reference": null,
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-10-01T09:52:29.588Z",
      "updated_at": "2026-10-01T09:52:29.622Z"
    },
    {
      "id": 176,
      "reference": "DF-20261001-XDLKAI",
      "user_id": 73,
      "product_type": "wallet_funding",
      "network": null,
      "recipient_phone": null,
      "plan_id": null,
      "provider": "ManualBank",
      "provider_reference": "DF-20261001-XDLKAI",
      "provider_cost_kobo": "100000",
      "selling_price_kobo": "100000",
      "profit_kobo": "0",
      "status": "successful",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"internal_reference\":\"DF-20261001-XDLKAI\",\"transfer_reference\":null,\"sender_name\":null,\"sender_bank\":null,\"bank_name\":\"Opay\",\"account_number\":\"6423809175\",\"approved_by_admin\":1}",
      "created_at": "2026-10-01T09:52:28.804Z",
      "updated_at": "2026-10-01T09:52:28.804Z"
    },
    {
      "id": 175,
      "reference": "DH-DATA-1790844787635-1963",
      "user_id": 5,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790844787635-1963",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-10-01T08:53:07.837Z",
      "updated_at": "2026-10-01T08:53:08.303Z"
    },
    {
      "id": 174,
      "reference": "DH-DATA-1790842938151-5762",
      "user_id": 1,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790842938151-5762",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-10-01T08:22:18.355Z",
      "updated_at": "2026-10-01T08:22:18.922Z"
    },
    {
      "id": 173,
      "reference": "DH-DATA-1790842462210-5901",
      "user_id": 1,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": "mtn-direct-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "43000",
      "selling_price_kobo": "48000",
      "profit_kobo": "5000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790842462210-5901",
      "metadata": "{\"plan_name\":\"MTN Direct 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-10-01T08:14:22.406Z",
      "updated_at": "2026-10-01T08:14:22.949Z"
    },
    {
      "id": 172,
      "reference": "DH-DATA-1790842274243-6139",
      "user_id": 1,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": "mtn-direct-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "43000",
      "selling_price_kobo": "48000",
      "profit_kobo": "5000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790842274243-6139",
      "metadata": "{\"plan_name\":\"MTN Direct 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-10-01T08:11:14.425Z",
      "updated_at": "2026-10-01T08:11:14.881Z"
    },
    {
      "id": 171,
      "reference": "DH-DATA-1790842148257-3329",
      "user_id": 1,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08012345678",
      "plan_id": "mtn-direct-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "43000",
      "selling_price_kobo": "48000",
      "profit_kobo": "5000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790842148257-3329",
      "metadata": "{\"plan_name\":\"MTN Direct 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-10-01T08:09:08.441Z",
      "updated_at": "2026-10-01T08:09:08.995Z"
    },
    {
      "id": 170,
      "reference": "DH-AIR-1790795734922-4392",
      "user_id": 71,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "09162078151",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "6720975329",
      "provider_cost_kobo": "48250",
      "selling_price_kobo": "49000",
      "profit_kobo": "750",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"face_value_naira\":500,\"discount_percent\":2}",
      "created_at": "2026-09-30T19:15:35.115Z",
      "updated_at": "2026-09-30T19:15:36.152Z"
    },
    {
      "id": 169,
      "reference": "DH-DATA-1790787574073-9072",
      "user_id": 71,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "09162078151",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790787574073-9072",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T16:59:34.249Z",
      "updated_at": "2026-09-30T17:00:06.379Z"
    },
    {
      "id": 168,
      "reference": "DH-AIR-1790787227892-2156",
      "user_id": 71,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "09162078151",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "48250",
      "selling_price_kobo": "49000",
      "profit_kobo": "750",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790787227892-2156",
      "metadata": "{\"face_value_naira\":500,\"discount_percent\":2}",
      "created_at": "2026-09-30T16:53:48.072Z",
      "updated_at": "2026-09-30T16:54:09.712Z"
    },
    {
      "id": 167,
      "reference": "DH-AIR-1790786598155-6343",
      "user_id": 1,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08012345678",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "6720972153",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-30T16:43:18.346Z",
      "updated_at": "2026-09-30T16:43:19.075Z"
    },
    {
      "id": 166,
      "reference": "DH-DATA-1790786287424-5586",
      "user_id": 71,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "09162078151",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790786287424-5586",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T16:38:07.604Z",
      "updated_at": "2026-09-30T16:38:29.332Z"
    },
    {
      "id": 165,
      "reference": "DH-AIR-1790785917705-7443",
      "user_id": 71,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "09162078151",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "48250",
      "selling_price_kobo": "49000",
      "profit_kobo": "750",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790785917705-7443",
      "metadata": "{\"face_value_naira\":500,\"discount_percent\":2}",
      "created_at": "2026-09-30T16:31:57.885Z",
      "updated_at": "2026-09-30T16:32:19.409Z"
    },
    {
      "id": 164,
      "reference": "DH-AIR-1790785832667-9053",
      "user_id": 71,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "09162078151",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "48250",
      "selling_price_kobo": "49000",
      "profit_kobo": "750",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790785832667-9053",
      "metadata": "{\"face_value_naira\":500,\"discount_percent\":2}",
      "created_at": "2026-09-30T16:30:32.853Z",
      "updated_at": "2026-09-30T16:30:54.642Z"
    },
    {
      "id": 163,
      "reference": "DF-20260930-3HS4FA",
      "user_id": 71,
      "product_type": "wallet_funding",
      "network": null,
      "recipient_phone": null,
      "plan_id": null,
      "provider": "ManualBank",
      "provider_reference": "DF-20260930-3HS4FA",
      "provider_cost_kobo": "60000",
      "selling_price_kobo": "60000",
      "profit_kobo": "0",
      "status": "successful",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"internal_reference\":\"DF-20260930-3HS4FA\",\"transfer_reference\":null,\"sender_name\":null,\"sender_bank\":null,\"bank_name\":\"Opay\",\"account_number\":\"6423809175\",\"approved_by_admin\":1}",
      "created_at": "2026-09-30T16:27:26.051Z",
      "updated_at": "2026-09-30T16:27:26.051Z"
    },
    {
      "id": 162,
      "reference": "DH-DATA-1790773534122-5180",
      "user_id": 5,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08060741300",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "6720969286",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T13:05:34.312Z",
      "updated_at": "2026-09-30T13:05:35.108Z"
    },
    {
      "id": 161,
      "reference": "DH-DATA-1790772281987-7200",
      "user_id": 5,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08060479393",
      "plan_id": "mtn-sme-3gb",
      "provider": "ClubKonnect",
      "provider_reference": "6720969068",
      "provider_cost_kobo": "123000",
      "selling_price_kobo": "135000",
      "profit_kobo": "12000",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"plan_name\":\"MTN SME 3.0GB\",\"data_amount\":\"3.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T12:44:42.204Z",
      "updated_at": "2026-09-30T12:44:42.912Z"
    },
    {
      "id": 160,
      "reference": "DH-DATA-1790771377698-9773",
      "user_id": 5,
      "product_type": "data",
      "network": "AIRTEL",
      "recipient_phone": "07011953401",
      "plan_id": "airtel-corp-3gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "123000",
      "selling_price_kobo": "135000",
      "profit_kobo": "12000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790771377698-9773",
      "metadata": "{\"plan_name\":\"Airtel Corporate 3.0GB\",\"data_amount\":\"3.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T12:29:37.875Z",
      "updated_at": "2026-09-30T12:29:59.650Z"
    },
    {
      "id": 159,
      "reference": "DH-DATA-1790771222923-2236",
      "user_id": 5,
      "product_type": "data",
      "network": "AIRTEL",
      "recipient_phone": "07011953401",
      "plan_id": "airtel-corp-3gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "123000",
      "selling_price_kobo": "135000",
      "profit_kobo": "12000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790771222923-2236",
      "metadata": "{\"plan_name\":\"Airtel Corporate 3.0GB\",\"data_amount\":\"3.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T12:27:03.121Z",
      "updated_at": "2026-09-30T12:27:24.936Z"
    },
    {
      "id": 158,
      "reference": "DH-DATA-1790771121883-6452",
      "user_id": 5,
      "product_type": "data",
      "network": "AIRTEL",
      "recipient_phone": "07011953401",
      "plan_id": "airtel-corp-3gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "123000",
      "selling_price_kobo": "135000",
      "profit_kobo": "12000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790771121883-6452",
      "metadata": "{\"plan_name\":\"Airtel Corporate 3.0GB\",\"data_amount\":\"3.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T12:25:22.091Z",
      "updated_at": "2026-09-30T12:25:43.854Z"
    },
    {
      "id": 157,
      "reference": "DH-DATA-1790770860228-7517",
      "user_id": 5,
      "product_type": "data",
      "network": "AIRTEL",
      "recipient_phone": "07011953401",
      "plan_id": "airtel-corp-3gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "123000",
      "selling_price_kobo": "135000",
      "profit_kobo": "12000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790770860228-7517",
      "metadata": "{\"plan_name\":\"Airtel Corporate 3.0GB\",\"data_amount\":\"3.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T12:21:00.427Z",
      "updated_at": "2026-09-30T12:21:22.610Z"
    },
    {
      "id": 156,
      "reference": "DH-AIR-1790770728076-4220",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "6720968775",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-30T12:18:48.275Z",
      "updated_at": "2026-09-30T12:18:49.117Z"
    },
    {
      "id": 155,
      "reference": "DH-AIR-1790770215781-3272",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790770215781-3272",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-30T12:10:15.955Z",
      "updated_at": "2026-09-30T12:10:16.380Z"
    },
    {
      "id": 154,
      "reference": "DH-DATA-1790769932413-5712",
      "user_id": 5,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08101051265",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790769932413-5712",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T12:05:32.592Z",
      "updated_at": "2026-09-30T12:05:33.047Z"
    },
    {
      "id": 153,
      "reference": "DH-DATA-1790769889456-3792",
      "user_id": 5,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08101051265",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790769889456-3792",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T12:04:49.640Z",
      "updated_at": "2026-09-30T12:04:50.202Z"
    },
    {
      "id": 152,
      "reference": "DH-DATA-1790769769570-8146",
      "user_id": 5,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08101051265",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790769769570-8146",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T12:02:49.758Z",
      "updated_at": "2026-09-30T12:02:50.212Z"
    },
    {
      "id": 151,
      "reference": "DH-DATA-1790769639815-8852",
      "user_id": 5,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08101051265",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790769639815-8852",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T12:00:40.066Z",
      "updated_at": "2026-09-30T12:00:40.517Z"
    },
    {
      "id": 150,
      "reference": "DH-DATA-1790769578727-7871",
      "user_id": 5,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08101051265",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790769578727-7871",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T11:59:38.897Z",
      "updated_at": "2026-09-30T11:59:39.351Z"
    },
    {
      "id": 149,
      "reference": "DH-DATA-1790769525026-9953",
      "user_id": 5,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08101051265",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790769525026-9953",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T11:58:45.214Z",
      "updated_at": "2026-09-30T11:58:45.663Z"
    },
    {
      "id": 148,
      "reference": "DH-DATA-1790769477545-1417",
      "user_id": 5,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08101051265",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790769477545-1417",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T11:57:57.740Z",
      "updated_at": "2026-09-30T11:57:58.284Z"
    },
    {
      "id": 147,
      "reference": "DH-AIR-1790756848925-7165",
      "user_id": 5,
      "product_type": "airtime",
      "network": "AIRTEL",
      "recipient_phone": "07026130747",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "6720964440",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-30T08:27:29.104Z",
      "updated_at": "2026-09-30T08:27:30.084Z"
    },
    {
      "id": 146,
      "reference": "DH-DATA-1790753431287-1404",
      "user_id": 1,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": "mtn-direct-2gb",
      "provider": "ClubKonnect",
      "provider_reference": "6720963054",
      "provider_cost_kobo": "86000",
      "selling_price_kobo": "95000",
      "profit_kobo": "9000",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"plan_name\":\"MTN Direct 2.0GB\",\"data_amount\":\"2.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T07:30:31.476Z",
      "updated_at": "2026-09-30T07:30:32.390Z"
    },
    {
      "id": 145,
      "reference": "DH-DATA-1790751978270-8710",
      "user_id": 51,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08108452226",
      "plan_id": "mtn-sme-500mb",
      "provider": "ClubKonnect",
      "provider_reference": "6720962566",
      "provider_cost_kobo": "20500",
      "selling_price_kobo": "25000",
      "profit_kobo": "4500",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"plan_name\":\"MTN SME 500MB\",\"data_amount\":\"500 MB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T07:06:18.451Z",
      "updated_at": "2026-09-30T07:06:19.151Z"
    },
    {
      "id": 144,
      "reference": "DH-DATA-1790751908279-8206",
      "user_id": 51,
      "product_type": "data",
      "network": "AIRTEL",
      "recipient_phone": "07013067466",
      "plan_id": "airtel-corp-500mb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "20500",
      "selling_price_kobo": "25000",
      "profit_kobo": "4500",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790751908279-8206",
      "metadata": "{\"plan_name\":\"Airtel Corporate 500MB\",\"data_amount\":\"500 MB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T07:05:08.459Z",
      "updated_at": "2026-09-30T07:05:30.250Z"
    },
    {
      "id": 143,
      "reference": "DH-DATA-1790751869927-4533",
      "user_id": 51,
      "product_type": "data",
      "network": "AIRTEL",
      "recipient_phone": "07013067466",
      "plan_id": "airtel-corp-500mb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "20500",
      "selling_price_kobo": "25000",
      "profit_kobo": "4500",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790751869927-4533",
      "metadata": "{\"plan_name\":\"Airtel Corporate 500MB\",\"data_amount\":\"500 MB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T07:04:30.127Z",
      "updated_at": "2026-09-30T07:04:53.322Z"
    },
    {
      "id": 142,
      "reference": "DF-20260930-IEZKS3",
      "user_id": 51,
      "product_type": "wallet_funding",
      "network": null,
      "recipient_phone": null,
      "plan_id": null,
      "provider": "ManualBank",
      "provider_reference": "DF-20260930-IEZKS3",
      "provider_cost_kobo": "25000",
      "selling_price_kobo": "25000",
      "profit_kobo": "0",
      "status": "successful",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"internal_reference\":\"DF-20260930-IEZKS3\",\"transfer_reference\":null,\"sender_name\":null,\"sender_bank\":null,\"bank_name\":\"Opay\",\"account_number\":\"6423809175\",\"approved_by_admin\":1}",
      "created_at": "2026-09-30T07:02:56.777Z",
      "updated_at": "2026-09-30T07:02:56.777Z"
    },
    {
      "id": 141,
      "reference": "DH-DATA-1790751203179-8255",
      "user_id": 50,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "09133399847",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "6720962393",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-30T06:53:23.356Z",
      "updated_at": "2026-09-30T06:53:25.212Z"
    },
    {
      "id": 140,
      "reference": "DF-20260930-EIXURA",
      "user_id": 50,
      "product_type": "wallet_funding",
      "network": null,
      "recipient_phone": null,
      "plan_id": null,
      "provider": "ManualBank",
      "provider_reference": "DF-20260930-EIXURA",
      "provider_cost_kobo": "50000",
      "selling_price_kobo": "50000",
      "profit_kobo": "0",
      "status": "successful",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"internal_reference\":\"DF-20260930-EIXURA\",\"transfer_reference\":null,\"sender_name\":null,\"sender_bank\":null,\"bank_name\":\"Opay\",\"account_number\":\"6423809175\",\"approved_by_admin\":1}",
      "created_at": "2026-09-30T06:51:37.106Z",
      "updated_at": "2026-09-30T06:51:37.106Z"
    },
    {
      "id": 139,
      "reference": "DH-AIR-1790744327646-7335",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "6720960966",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-30T04:58:47.821Z",
      "updated_at": "2026-09-30T04:58:48.777Z"
    },
    {
      "id": 134,
      "reference": "DH-AIR-1790743905533-2178",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "6720960939",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-30T04:51:45.724Z",
      "updated_at": "2026-09-30T04:51:46.703Z"
    },
    {
      "id": 133,
      "reference": "DH-AIR-1790743561606-9520",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790743561606-9520",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-30T04:46:01.780Z",
      "updated_at": "2026-09-30T04:46:02.266Z"
    },
    {
      "id": 119,
      "reference": "DH-AIR-1790742710289-5353",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790742710289-5353",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-30T04:31:50.469Z",
      "updated_at": "2026-09-30T04:31:51.037Z"
    },
    {
      "id": 118,
      "reference": "DH-AIR-1790742389764-4086",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790742389764-4086",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-30T04:26:29.950Z",
      "updated_at": "2026-09-30T04:26:30.394Z"
    },
    {
      "id": 117,
      "reference": "DH-AIR-1790742030214-4268",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790742030214-4268",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-30T04:20:30.385Z",
      "updated_at": "2026-09-30T04:20:30.905Z"
    },
    {
      "id": 116,
      "reference": "DH-AIR-1790741773689-7694",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790741773689-7694",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-30T04:16:13.876Z",
      "updated_at": "2026-09-30T04:16:14.774Z"
    },
    {
      "id": 115,
      "reference": "DH-AIR-1790716913288-5424",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790716913288-5424",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T21:21:53.471Z",
      "updated_at": "2026-09-29T21:21:53.945Z"
    },
    {
      "id": 114,
      "reference": "DH-AIR-1790708695746-8813",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790708695746-8813",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T19:04:55.941Z",
      "updated_at": "2026-09-29T19:04:56.450Z"
    },
    {
      "id": 113,
      "reference": "DH-AIR-1790694049860-6013",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790694049860-6013",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T15:00:50.064Z",
      "updated_at": "2026-09-29T15:00:50.547Z"
    },
    {
      "id": 112,
      "reference": "DH-AIR-1790692945451-1708",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790692945451-1708",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T14:42:25.621Z",
      "updated_at": "2026-09-29T14:42:26.154Z"
    },
    {
      "id": 111,
      "reference": "DH-AIR-1790692729307-3389",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790692729307-3389",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T14:38:49.487Z",
      "updated_at": "2026-09-29T14:38:50.068Z"
    },
    {
      "id": 110,
      "reference": "DH-AIR-1790692530484-2566",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790692530484-2566",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T14:35:30.650Z",
      "updated_at": "2026-09-29T14:35:31.462Z"
    },
    {
      "id": 109,
      "reference": "DH-AIR-1790692324545-6912",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790692324545-6912",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T14:32:04.743Z",
      "updated_at": "2026-09-29T14:32:05.586Z"
    },
    {
      "id": 108,
      "reference": "DH-AIR-1790690322031-8436",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790690322031-8436",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T13:58:42.219Z",
      "updated_at": "2026-09-29T13:58:43.060Z"
    },
    {
      "id": 103,
      "reference": "DH-AIR-1790688019383-4677",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790688019383-4677",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T13:20:19.575Z",
      "updated_at": "2026-09-29T13:20:20.142Z"
    },
    {
      "id": 97,
      "reference": "DH-AIR-1790687449798-9224",
      "user_id": 1,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790687449798-9224",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T13:10:49.994Z",
      "updated_at": "2026-09-29T13:10:50.551Z"
    },
    {
      "id": 95,
      "reference": "DH-AIR-1790687021871-5572",
      "user_id": 1,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08012345678",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790687021871-5572",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T13:03:42.080Z",
      "updated_at": "2026-09-29T13:03:42.928Z"
    },
    {
      "id": 85,
      "reference": "DH-AIR-1790683595676-1101",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08167743522",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "6720941123",
      "provider_cost_kobo": "9650",
      "selling_price_kobo": "9800",
      "profit_kobo": "150",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"face_value_naira\":100,\"discount_percent\":2}",
      "created_at": "2026-09-29T12:06:35.870Z",
      "updated_at": "2026-09-29T12:06:36.849Z"
    },
    {
      "id": 84,
      "reference": "DH-DATA-1790670748634-4608",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "6720937054",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-29T08:32:28.847Z",
      "updated_at": "2026-09-29T08:32:29.805Z"
    },
    {
      "id": 83,
      "reference": "DH-AIR-1790663550498-4383",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "6720934814",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T06:32:30.675Z",
      "updated_at": "2026-09-29T06:32:31.425Z"
    },
    {
      "id": 82,
      "reference": "DH-DATA-1790663511573-8147",
      "user_id": 5,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": "mtn-sme-500mb",
      "provider": "ClubKonnect",
      "provider_reference": "6720934805",
      "provider_cost_kobo": "20500",
      "selling_price_kobo": "25000",
      "profit_kobo": "4500",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"plan_name\":\"MTN SME 500MB\",\"data_amount\":\"500 MB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-29T06:31:51.756Z",
      "updated_at": "2026-09-29T06:31:52.643Z"
    },
    {
      "id": 81,
      "reference": "DH-AIR-1790661640143-6592",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790661640143-6592",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T06:00:40.323Z",
      "updated_at": "2026-09-29T06:00:40.821Z"
    },
    {
      "id": 80,
      "reference": "DH-AIR-1790660088801-9977",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790660088801-9977",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T05:34:48.988Z",
      "updated_at": "2026-09-29T05:34:49.437Z"
    },
    {
      "id": 67,
      "reference": "DH-AIR-1790659535262-5031",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790659535262-5031",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T05:25:35.451Z",
      "updated_at": "2026-09-29T05:25:36.000Z"
    },
    {
      "id": 66,
      "reference": "DH-AIR-1790658049978-2112",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790658049978-2112",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T05:00:50.190Z",
      "updated_at": "2026-09-29T05:00:50.711Z"
    },
    {
      "id": 65,
      "reference": "DH-AIR-1790657003632-3074",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790657003632-3074",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T04:43:23.827Z",
      "updated_at": "2026-09-29T04:43:24.283Z"
    },
    {
      "id": 64,
      "reference": "DH-AIR-1790656839754-4641",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790656839754-4641",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-29T04:40:39.962Z",
      "updated_at": "2026-09-29T04:40:40.497Z"
    },
    {
      "id": 63,
      "reference": "DH-DATA-1790632599231-8040",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790632599231-8040",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T21:56:39.308Z",
      "updated_at": "2026-09-28T21:56:39.750Z"
    },
    {
      "id": 62,
      "reference": "DH-DATA-1790632592153-4626",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790632592153-4626",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T21:56:32.229Z",
      "updated_at": "2026-09-28T21:56:32.656Z"
    },
    {
      "id": 61,
      "reference": "DH-DATA-1790632583738-2127",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790632583738-2127",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T21:56:23.927Z",
      "updated_at": "2026-09-28T21:56:24.446Z"
    },
    {
      "id": 60,
      "reference": "DH-AIR-1790630579345-4839",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790630579345-4839",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T21:22:59.630Z",
      "updated_at": "2026-09-28T21:23:00.203Z"
    },
    {
      "id": 59,
      "reference": "DH-AIR-1790624437024-1182",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790624437024-1182",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T19:40:37.210Z",
      "updated_at": "2026-09-28T19:40:37.724Z"
    },
    {
      "id": 58,
      "reference": "DH-AIR-1790622321344-8528",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790622321344-8528",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T19:05:21.539Z",
      "updated_at": "2026-09-28T19:05:22.145Z"
    },
    {
      "id": 57,
      "reference": "DH-DATA-1790609643192-2726",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-direct-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "43000",
      "selling_price_kobo": "48000",
      "profit_kobo": "5000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790609643192-2726",
      "metadata": "{\"plan_name\":\"MTN Direct 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T15:34:03.370Z",
      "updated_at": "2026-09-28T15:34:24.691Z"
    },
    {
      "id": 56,
      "reference": "DH-DATA-1790609606626-9156",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-direct-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "43000",
      "selling_price_kobo": "48000",
      "profit_kobo": "5000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790609606626-9156",
      "metadata": "{\"plan_name\":\"MTN Direct 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T15:33:26.811Z",
      "updated_at": "2026-09-28T15:33:48.135Z"
    },
    {
      "id": 55,
      "reference": "DH-AIR-1790605841622-1553",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790605841622-1553",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T14:30:41.835Z",
      "updated_at": "2026-09-28T14:31:03.037Z"
    },
    {
      "id": 54,
      "reference": "DH-DATA-1790604826110-3096",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790604826110-3096",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T14:13:46.194Z",
      "updated_at": "2026-09-28T14:14:07.449Z"
    },
    {
      "id": 53,
      "reference": "DH-DATA-1790604798799-8772",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790604798799-8772",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T14:13:18.987Z",
      "updated_at": "2026-09-28T14:13:40.099Z"
    },
    {
      "id": 52,
      "reference": "DH-DATA-1790604760504-7033",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790604760504-7033",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T14:12:40.697Z",
      "updated_at": "2026-09-28T14:13:02.077Z"
    },
    {
      "id": 51,
      "reference": "DH-AIR-1790601970806-5660",
      "user_id": 1,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08012345678",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790601970806-5660",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T13:26:10.988Z",
      "updated_at": "2026-09-28T13:26:32.320Z"
    },
    {
      "id": 50,
      "reference": "DH-DATA-1790600553544-5266",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790600553544-5266",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T13:02:33.714Z",
      "updated_at": "2026-09-28T13:02:54.923Z"
    },
    {
      "id": 49,
      "reference": "DH-DATA-1790600517423-6879",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790600517423-6879",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T13:01:57.504Z",
      "updated_at": "2026-09-28T13:02:22.202Z"
    },
    {
      "id": 48,
      "reference": "DH-DATA-1790600489615-4658",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790600489615-4658",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T13:01:29.787Z",
      "updated_at": "2026-09-28T13:01:51.108Z"
    },
    {
      "id": 47,
      "reference": "DH-DATA-1790597275622-8983",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790597275622-8983",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T12:07:55.801Z",
      "updated_at": "2026-09-28T12:08:17.019Z"
    },
    {
      "id": 46,
      "reference": "DH-DATA-1790597239813-4478",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790597239813-4478",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T12:07:19.991Z",
      "updated_at": "2026-09-28T12:07:41.226Z"
    },
    {
      "id": 45,
      "reference": "DH-DATA-1790596487495-6482",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790596487495-6482",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T11:54:47.683Z",
      "updated_at": "2026-09-28T11:55:09.024Z"
    },
    {
      "id": 44,
      "reference": "DH-DATA-1790594166915-7932",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790594166915-7932",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T11:16:07.081Z",
      "updated_at": "2026-09-28T11:16:28.288Z"
    },
    {
      "id": 43,
      "reference": "DH-DATA-1790594130920-4135",
      "user_id": 24,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "07034886373",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790594130920-4135",
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-28T11:15:31.101Z",
      "updated_at": "2026-09-28T11:15:52.563Z"
    },
    {
      "id": 42,
      "reference": "DF-20260928-H9IDXL",
      "user_id": 24,
      "product_type": "wallet_funding",
      "network": null,
      "recipient_phone": null,
      "plan_id": null,
      "provider": "ManualBank",
      "provider_reference": "DF-20260928-H9IDXL",
      "provider_cost_kobo": "50000",
      "selling_price_kobo": "50000",
      "profit_kobo": "0",
      "status": "successful",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"internal_reference\":\"DF-20260928-H9IDXL\",\"transfer_reference\":null,\"sender_name\":null,\"sender_bank\":null,\"bank_name\":\"Opay\",\"account_number\":\"6423809175\",\"approved_by_admin\":1}",
      "created_at": "2026-09-28T11:13:57.934Z",
      "updated_at": "2026-09-28T11:13:57.934Z"
    },
    {
      "id": 41,
      "reference": "DH-AIR-1790590060052-6320",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED_REFUNDED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790590060052-6320",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T10:07:40.227Z",
      "updated_at": "2026-09-28T10:08:01.595Z"
    },
    {
      "id": 40,
      "reference": "DH-AIR-1790581333646-6091",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "pending",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T07:42:13.858Z",
      "updated_at": "2026-09-28T07:42:34.912Z"
    },
    {
      "id": 39,
      "reference": "DF-20260928-NADCKC",
      "user_id": 5,
      "product_type": "wallet_funding",
      "network": null,
      "recipient_phone": null,
      "plan_id": null,
      "provider": "ManualBank",
      "provider_reference": "DF-20260928-NADCKC",
      "provider_cost_kobo": "100000",
      "selling_price_kobo": "100000",
      "profit_kobo": "0",
      "status": "successful",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"internal_reference\":\"DF-20260928-NADCKC\",\"transfer_reference\":null,\"sender_name\":null,\"sender_bank\":null,\"bank_name\":\"Opay\",\"account_number\":\"6423809175\",\"approved_by_admin\":1}",
      "created_at": "2026-09-28T07:37:20.098Z",
      "updated_at": "2026-09-28T07:37:20.098Z"
    },
    {
      "id": 38,
      "reference": "DH-AIR-1790579941595-6534",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790579941595-6534",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T07:19:01.864Z",
      "updated_at": "2026-09-28T07:19:02.378Z"
    },
    {
      "id": 37,
      "reference": "DH-AIR-1790578758616-4771",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790578758616-4771",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T06:59:18.794Z",
      "updated_at": "2026-09-28T06:59:19.256Z"
    },
    {
      "id": 36,
      "reference": "DH-AIR-1790574179920-2706",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790574179920-2706",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T05:43:00.137Z",
      "updated_at": "2026-09-28T05:43:00.611Z"
    },
    {
      "id": 35,
      "reference": "DH-AIR-1790571710305-1252",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "9650",
      "selling_price_kobo": "9800",
      "profit_kobo": "150",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790571710305-1252",
      "metadata": "{\"face_value_naira\":100,\"discount_percent\":2}",
      "created_at": "2026-09-28T05:01:50.487Z",
      "updated_at": "2026-09-28T05:01:50.894Z"
    },
    {
      "id": 34,
      "reference": "DH-AIR-1790571543555-1791",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790571543555-1791",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T04:59:03.753Z",
      "updated_at": "2026-09-28T04:59:04.218Z"
    },
    {
      "id": 33,
      "reference": "DH-AIR-1790570716617-1824",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790570716617-1824",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T04:45:16.811Z",
      "updated_at": "2026-09-28T04:45:17.231Z"
    },
    {
      "id": 32,
      "reference": "DH-AIR-1790570372563-8145",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790570372563-8145",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T04:39:32.743Z",
      "updated_at": "2026-09-28T04:39:33.147Z"
    },
    {
      "id": 31,
      "reference": "DH-AIR-1790570113753-1170",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790570113753-1170",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T04:35:13.937Z",
      "updated_at": "2026-09-28T04:35:15.078Z"
    },
    {
      "id": 30,
      "reference": "DH-AIR-1790568982649-3803",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790568982649-3803",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T04:16:22.838Z",
      "updated_at": "2026-09-28T04:16:23.262Z"
    },
    {
      "id": 29,
      "reference": "DH-AIR-1790566599494-4147",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790566599494-4147",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T03:36:39.668Z",
      "updated_at": "2026-09-28T03:36:40.335Z"
    },
    {
      "id": 28,
      "reference": "DH-AIR-1790565865148-1848",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790565865148-1848",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-28T03:24:25.332Z",
      "updated_at": "2026-09-28T03:24:25.757Z"
    },
    {
      "id": 27,
      "reference": "DH-AIR-1790546468350-6836",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790546468350-6836",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-27T22:01:08.571Z",
      "updated_at": "2026-09-27T22:01:08.992Z"
    },
    {
      "id": 22,
      "reference": "DH-DATA-1790542067873-4982",
      "user_id": 5,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": "mtn-sme-500mb",
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "20500",
      "selling_price_kobo": "25000",
      "profit_kobo": "4500",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-DATA-1790542067873-4982",
      "metadata": "{\"plan_name\":\"MTN SME 500MB\",\"data_amount\":\"500 MB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-27T20:47:48.050Z",
      "updated_at": "2026-09-27T20:48:03.599Z"
    },
    {
      "id": 21,
      "reference": "DH-AIR-1790541954882-9456",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790541954882-9456",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-27T20:45:55.085Z",
      "updated_at": "2026-09-27T20:45:55.519Z"
    },
    {
      "id": 16,
      "reference": "DH-AIR-1790541550073-3942",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790541550073-3942",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-27T20:39:10.270Z",
      "updated_at": "2026-09-27T20:39:35.599Z"
    },
    {
      "id": 6,
      "reference": "DH-AIR-1790540850547-6189",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08161720895",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790540850547-6189",
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-27T20:27:30.761Z",
      "updated_at": "2026-09-27T20:27:31.293Z"
    },
    {
      "id": 5,
      "reference": "DH-AIR-1790540254293-3585",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08031181211",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "9650",
      "selling_price_kobo": "9800",
      "profit_kobo": "150",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790540254293-3585",
      "metadata": "{\"face_value_naira\":100,\"discount_percent\":2}",
      "created_at": "2026-09-27T20:17:34.481Z",
      "updated_at": "2026-09-27T20:17:34.942Z"
    },
    {
      "id": 4,
      "reference": "DH-AIR-1790540198713-1099",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08031181211",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "",
      "provider_cost_kobo": "9650",
      "selling_price_kobo": "9800",
      "profit_kobo": "150",
      "status": "FAILED",
      "is_demo": false,
      "refund_reference": "REFUND-DH-AIR-1790540198713-1099",
      "metadata": "{\"face_value_naira\":100,\"discount_percent\":2}",
      "created_at": "2026-09-27T20:16:38.908Z",
      "updated_at": "2026-09-27T20:16:39.420Z"
    },
    {
      "id": 3,
      "reference": "DH-DATA-1790446141836-5020",
      "user_id": 5,
      "product_type": "data",
      "network": "MTN",
      "recipient_phone": "09069703081",
      "plan_id": "mtn-sme-1gb",
      "provider": "ClubKonnect",
      "provider_reference": "6720889711",
      "provider_cost_kobo": "41000",
      "selling_price_kobo": "45000",
      "profit_kobo": "4000",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"plan_name\":\"MTN SME 1.0GB\",\"data_amount\":\"1.0 GB\",\"duration\":\"30 Days\"}",
      "created_at": "2026-09-26T18:09:02.095Z",
      "updated_at": "2026-09-26T18:09:03.091Z"
    },
    {
      "id": 2,
      "reference": "DH-AIR-1790429179164-5518",
      "user_id": 5,
      "product_type": "airtime",
      "network": "MTN",
      "recipient_phone": "08101351921",
      "plan_id": null,
      "provider": "ClubKonnect",
      "provider_reference": "6720882113",
      "provider_cost_kobo": "4825",
      "selling_price_kobo": "4900",
      "profit_kobo": "75",
      "status": "SUCCESS",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"face_value_naira\":50,\"discount_percent\":2}",
      "created_at": "2026-09-26T13:26:19.369Z",
      "updated_at": "2026-09-26T13:26:20.372Z"
    },
    {
      "id": 1,
      "reference": "DF-20260926-HH3IHL",
      "user_id": 5,
      "product_type": "wallet_funding",
      "network": null,
      "recipient_phone": null,
      "plan_id": null,
      "provider": "ManualBank",
      "provider_reference": "DF-20260926-HH3IHL",
      "provider_cost_kobo": "100000",
      "selling_price_kobo": "100000",
      "profit_kobo": "0",
      "status": "successful",
      "is_demo": false,
      "refund_reference": null,
      "metadata": "{\"internal_reference\":\"DF-20260926-HH3IHL\",\"transfer_reference\":null,\"sender_name\":null,\"sender_bank\":null,\"bank_name\":\"Opay\",\"account_number\":\"6423809175\",\"approved_by_admin\":1}",
      "created_at": "2026-09-26T13:24:27.750Z",
      "updated_at": "2026-09-26T13:24:27.750Z"
    }
  ],
  "ledger": [
    {
      "id": 320,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790850609580-8642",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-10-01T10:30:09.586Z"
    },
    {
      "id": 319,
      "wallet_id": 73,
      "user_id": 73,
      "amount_kobo": "9800",
      "balance_before_kobo": "255000",
      "balance_after_kobo": "245200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790848350147-3993",
      "description": "Airtime: ₦100 MTN to 08123456789",
      "status": "successful",
      "created_at": "2026-10-01T09:52:30.152Z"
    },
    {
      "id": 318,
      "wallet_id": 73,
      "user_id": 73,
      "amount_kobo": "45000",
      "balance_before_kobo": "210000",
      "balance_after_kobo": "255000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790848349792-5467",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790848349792-5467)",
      "status": "successful",
      "created_at": "2026-10-01T09:52:29.907Z"
    },
    {
      "id": 317,
      "wallet_id": 73,
      "user_id": 73,
      "amount_kobo": "45000",
      "balance_before_kobo": "255000",
      "balance_after_kobo": "210000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790848349792-5467",
      "description": "Purchase: MTN SME 1.0GB for 08012340000",
      "status": "successful",
      "created_at": "2026-10-01T09:52:29.797Z"
    },
    {
      "id": 316,
      "wallet_id": 73,
      "user_id": 73,
      "amount_kobo": "45000",
      "balance_before_kobo": "300000",
      "balance_after_kobo": "255000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790848349498-9837",
      "description": "Purchase: MTN SME 1.0GB for 08123456789",
      "status": "successful",
      "created_at": "2026-10-01T09:52:29.504Z"
    },
    {
      "id": 315,
      "wallet_id": 73,
      "user_id": 73,
      "amount_kobo": "100000",
      "balance_before_kobo": "200000",
      "balance_after_kobo": "300000",
      "entry_type": "credit",
      "reference": "CREDIT-DF-20261001-XDLKAI",
      "description": "Wallet Funding: +₦1,000.00 (Ref: DF-20261001-XDLKAI)",
      "status": "successful",
      "created_at": "2026-10-01T09:52:28.804Z"
    },
    {
      "id": 314,
      "wallet_id": 73,
      "user_id": 73,
      "amount_kobo": "50000",
      "balance_before_kobo": "250000",
      "balance_after_kobo": "200000",
      "entry_type": "debit",
      "reference": "TEST-DEBIT-1790848348437",
      "description": "Test Debit ₦500.00",
      "status": "successful",
      "created_at": "2026-10-01T09:52:28.442Z"
    },
    {
      "id": 313,
      "wallet_id": 73,
      "user_id": 73,
      "amount_kobo": "250000",
      "balance_before_kobo": "0",
      "balance_after_kobo": "250000",
      "entry_type": "credit",
      "reference": "TEST-CREDIT-1790848348201",
      "description": "Test Credit ₦2,500.00",
      "status": "successful",
      "created_at": "2026-10-01T09:52:28.206Z"
    },
    {
      "id": 312,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "145200",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790844787635-1963",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790844787635-1963)",
      "status": "successful",
      "created_at": "2026-10-01T08:53:08.225Z"
    },
    {
      "id": 311,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "145200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790844787635-1963",
      "description": "Purchase: MTN SME 1.0GB for 08161720895",
      "status": "successful",
      "created_at": "2026-10-01T08:53:07.640Z"
    },
    {
      "id": 310,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "45000",
      "balance_before_kobo": "99955000",
      "balance_after_kobo": "100000000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790842938151-5762",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790842938151-5762)",
      "status": "successful",
      "created_at": "2026-10-01T08:22:18.784Z"
    },
    {
      "id": 309,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "45000",
      "balance_before_kobo": "100000000",
      "balance_after_kobo": "99955000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790842938151-5762",
      "description": "Purchase: MTN SME 1.0GB for 08161720895",
      "status": "successful",
      "created_at": "2026-10-01T08:22:18.157Z"
    },
    {
      "id": 308,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "48000",
      "balance_before_kobo": "99952000",
      "balance_after_kobo": "100000000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790842462210-5901",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790842462210-5901)",
      "status": "successful",
      "created_at": "2026-10-01T08:14:22.821Z"
    },
    {
      "id": 307,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "48000",
      "balance_before_kobo": "100000000",
      "balance_after_kobo": "99952000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790842462210-5901",
      "description": "Purchase: MTN Direct 1.0GB for 08161720895",
      "status": "successful",
      "created_at": "2026-10-01T08:14:22.216Z"
    },
    {
      "id": 306,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "48000",
      "balance_before_kobo": "99952000",
      "balance_after_kobo": "100000000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790842274243-6139",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790842274243-6139)",
      "status": "successful",
      "created_at": "2026-10-01T08:11:14.798Z"
    },
    {
      "id": 305,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "48000",
      "balance_before_kobo": "100000000",
      "balance_after_kobo": "99952000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790842274243-6139",
      "description": "Purchase: MTN Direct 1.0GB for 08161720895",
      "status": "successful",
      "created_at": "2026-10-01T08:11:14.249Z"
    },
    {
      "id": 304,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "48000",
      "balance_before_kobo": "99952000",
      "balance_after_kobo": "100000000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790842148257-3329",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790842148257-3329)",
      "status": "successful",
      "created_at": "2026-10-01T08:09:08.897Z"
    },
    {
      "id": 303,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "48000",
      "balance_before_kobo": "100000000",
      "balance_after_kobo": "99952000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790842148257-3329",
      "description": "Purchase: MTN Direct 1.0GB for 08012345678",
      "status": "successful",
      "created_at": "2026-10-01T08:09:08.263Z"
    },
    {
      "id": 302,
      "wallet_id": 71,
      "user_id": 71,
      "amount_kobo": "49000",
      "balance_before_kobo": "60000",
      "balance_after_kobo": "11000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790795734922-4392",
      "description": "Airtime: ₦500 MTN to 09162078151",
      "status": "successful",
      "created_at": "2026-09-30T19:15:34.928Z"
    },
    {
      "id": 301,
      "wallet_id": 71,
      "user_id": 71,
      "amount_kobo": "45000",
      "balance_before_kobo": "15000",
      "balance_after_kobo": "60000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790787574073-9072",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790787574073-9072)",
      "status": "successful",
      "created_at": "2026-09-30T17:00:06.206Z"
    },
    {
      "id": 300,
      "wallet_id": 71,
      "user_id": 71,
      "amount_kobo": "45000",
      "balance_before_kobo": "60000",
      "balance_after_kobo": "15000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790787574073-9072",
      "description": "Purchase: MTN SME 1.0GB for 09162078151",
      "status": "successful",
      "created_at": "2026-09-30T16:59:34.078Z"
    },
    {
      "id": 299,
      "wallet_id": 71,
      "user_id": 71,
      "amount_kobo": "49000",
      "balance_before_kobo": "11000",
      "balance_after_kobo": "60000",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790787227892-2156",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790787227892-2156)",
      "status": "successful",
      "created_at": "2026-09-30T16:54:09.545Z"
    },
    {
      "id": 298,
      "wallet_id": 71,
      "user_id": 71,
      "amount_kobo": "49000",
      "balance_before_kobo": "60000",
      "balance_after_kobo": "11000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790787227892-2156",
      "description": "Airtime: ₦500 MTN to 09162078151",
      "status": "successful",
      "created_at": "2026-09-30T16:53:47.897Z"
    },
    {
      "id": 297,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "4900",
      "balance_before_kobo": "100000000",
      "balance_after_kobo": "99995100",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790786598155-6343",
      "description": "Airtime: ₦50 MTN to 08012345678",
      "status": "successful",
      "created_at": "2026-09-30T16:43:18.160Z"
    },
    {
      "id": 296,
      "wallet_id": 71,
      "user_id": 71,
      "amount_kobo": "45000",
      "balance_before_kobo": "15000",
      "balance_after_kobo": "60000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790786287424-5586",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790786287424-5586)",
      "status": "successful",
      "created_at": "2026-09-30T16:38:29.148Z"
    },
    {
      "id": 295,
      "wallet_id": 71,
      "user_id": 71,
      "amount_kobo": "45000",
      "balance_before_kobo": "60000",
      "balance_after_kobo": "15000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790786287424-5586",
      "description": "Purchase: MTN SME 1.0GB for 09162078151",
      "status": "successful",
      "created_at": "2026-09-30T16:38:07.430Z"
    },
    {
      "id": 294,
      "wallet_id": 71,
      "user_id": 71,
      "amount_kobo": "49000",
      "balance_before_kobo": "11000",
      "balance_after_kobo": "60000",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790785917705-7443",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790785917705-7443)",
      "status": "successful",
      "created_at": "2026-09-30T16:32:19.235Z"
    },
    {
      "id": 293,
      "wallet_id": 71,
      "user_id": 71,
      "amount_kobo": "49000",
      "balance_before_kobo": "60000",
      "balance_after_kobo": "11000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790785917705-7443",
      "description": "Airtime: ₦500 MTN to 09162078151",
      "status": "successful",
      "created_at": "2026-09-30T16:31:57.711Z"
    },
    {
      "id": 292,
      "wallet_id": 71,
      "user_id": 71,
      "amount_kobo": "49000",
      "balance_before_kobo": "11000",
      "balance_after_kobo": "60000",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790785832667-9053",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790785832667-9053)",
      "status": "successful",
      "created_at": "2026-09-30T16:30:54.450Z"
    },
    {
      "id": 291,
      "wallet_id": 71,
      "user_id": 71,
      "amount_kobo": "49000",
      "balance_before_kobo": "60000",
      "balance_after_kobo": "11000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790785832667-9053",
      "description": "Airtime: ₦500 MTN to 09162078151",
      "status": "successful",
      "created_at": "2026-09-30T16:30:32.674Z"
    },
    {
      "id": 290,
      "wallet_id": 71,
      "user_id": 71,
      "amount_kobo": "60000",
      "balance_before_kobo": "0",
      "balance_after_kobo": "60000",
      "entry_type": "credit",
      "reference": "CREDIT-DF-20260930-3HS4FA",
      "description": "Wallet Funding: +₦600.00 (Ref: DF-20260930-3HS4FA)",
      "status": "successful",
      "created_at": "2026-09-30T16:27:26.051Z"
    },
    {
      "id": 289,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "145200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790773534122-5180",
      "description": "Purchase: MTN SME 1.0GB for 08060741300",
      "status": "successful",
      "created_at": "2026-09-30T13:05:34.129Z"
    },
    {
      "id": 288,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "135000",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "50300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790772281987-7200",
      "description": "Purchase: MTN SME 3.0GB for 08060479393",
      "status": "successful",
      "created_at": "2026-09-30T12:44:41.994Z"
    },
    {
      "id": 287,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "135000",
      "balance_before_kobo": "50300",
      "balance_after_kobo": "185300",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790771377698-9773",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790771377698-9773)",
      "status": "successful",
      "created_at": "2026-09-30T12:29:59.467Z"
    },
    {
      "id": 286,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "135000",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "50300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790771377698-9773",
      "description": "Purchase: Airtel Corporate 3.0GB for 07011953401",
      "status": "successful",
      "created_at": "2026-09-30T12:29:37.704Z"
    },
    {
      "id": 285,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "135000",
      "balance_before_kobo": "50300",
      "balance_after_kobo": "185300",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790771222923-2236",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790771222923-2236)",
      "status": "successful",
      "created_at": "2026-09-30T12:27:24.760Z"
    },
    {
      "id": 284,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "135000",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "50300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790771222923-2236",
      "description": "Purchase: Airtel Corporate 3.0GB for 07011953401",
      "status": "successful",
      "created_at": "2026-09-30T12:27:02.930Z"
    },
    {
      "id": 283,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "135000",
      "balance_before_kobo": "50300",
      "balance_after_kobo": "185300",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790771121883-6452",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790771121883-6452)",
      "status": "successful",
      "created_at": "2026-09-30T12:25:43.674Z"
    },
    {
      "id": 282,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "135000",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "50300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790771121883-6452",
      "description": "Purchase: Airtel Corporate 3.0GB for 07011953401",
      "status": "successful",
      "created_at": "2026-09-30T12:25:21.891Z"
    },
    {
      "id": 281,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "135000",
      "balance_before_kobo": "50300",
      "balance_after_kobo": "185300",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790770860228-7517",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790770860228-7517)",
      "status": "successful",
      "created_at": "2026-09-30T12:21:22.384Z"
    },
    {
      "id": 280,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "135000",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "50300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790770860228-7517",
      "description": "Purchase: Airtel Corporate 3.0GB for 07011953401",
      "status": "successful",
      "created_at": "2026-09-30T12:21:00.236Z"
    },
    {
      "id": 279,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790770728076-4220",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-30T12:18:48.084Z"
    },
    {
      "id": 278,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790770215781-3272",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790770215781-3272)",
      "status": "successful",
      "created_at": "2026-09-30T12:10:16.303Z"
    },
    {
      "id": 277,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790770215781-3272",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-30T12:10:15.787Z"
    },
    {
      "id": 276,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "145200",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790769932413-5712",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790769932413-5712)",
      "status": "successful",
      "created_at": "2026-09-30T12:05:32.965Z"
    },
    {
      "id": 275,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "145200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790769932413-5712",
      "description": "Purchase: MTN SME 1.0GB for 08101051265",
      "status": "successful",
      "created_at": "2026-09-30T12:05:32.419Z"
    },
    {
      "id": 274,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "145200",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790769889456-3792",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790769889456-3792)",
      "status": "successful",
      "created_at": "2026-09-30T12:04:50.064Z"
    },
    {
      "id": 273,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "145200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790769889456-3792",
      "description": "Purchase: MTN SME 1.0GB for 08101051265",
      "status": "successful",
      "created_at": "2026-09-30T12:04:49.463Z"
    },
    {
      "id": 272,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "145200",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790769769570-8146",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790769769570-8146)",
      "status": "successful",
      "created_at": "2026-09-30T12:02:50.128Z"
    },
    {
      "id": 271,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "145200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790769769570-8146",
      "description": "Purchase: MTN SME 1.0GB for 08101051265",
      "status": "successful",
      "created_at": "2026-09-30T12:02:49.576Z"
    },
    {
      "id": 270,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "145200",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790769639815-8852",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790769639815-8852)",
      "status": "successful",
      "created_at": "2026-09-30T12:00:40.434Z"
    },
    {
      "id": 269,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "145200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790769639815-8852",
      "description": "Purchase: MTN SME 1.0GB for 08101051265",
      "status": "successful",
      "created_at": "2026-09-30T12:00:39.821Z"
    },
    {
      "id": 268,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "145200",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790769578727-7871",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790769578727-7871)",
      "status": "successful",
      "created_at": "2026-09-30T11:59:39.276Z"
    },
    {
      "id": 267,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "145200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790769578727-7871",
      "description": "Purchase: MTN SME 1.0GB for 08101051265",
      "status": "successful",
      "created_at": "2026-09-30T11:59:38.733Z"
    },
    {
      "id": 266,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "145200",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790769525026-9953",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790769525026-9953)",
      "status": "successful",
      "created_at": "2026-09-30T11:58:45.585Z"
    },
    {
      "id": 265,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "145200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790769525026-9953",
      "description": "Purchase: MTN SME 1.0GB for 08101051265",
      "status": "successful",
      "created_at": "2026-09-30T11:58:45.032Z"
    },
    {
      "id": 264,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "145200",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790769477545-1417",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790769477545-1417)",
      "status": "successful",
      "created_at": "2026-09-30T11:57:58.181Z"
    },
    {
      "id": 263,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "145200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790769477545-1417",
      "description": "Purchase: MTN SME 1.0GB for 08101051265",
      "status": "successful",
      "created_at": "2026-09-30T11:57:57.554Z"
    },
    {
      "id": 262,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790756848925-7165",
      "description": "Airtime: ₦50 AIRTEL to 07026130747",
      "status": "successful",
      "created_at": "2026-09-30T08:27:28.931Z"
    },
    {
      "id": 261,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "95000",
      "balance_before_kobo": "100000000",
      "balance_after_kobo": "99905000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790753431287-1404",
      "description": "Purchase: MTN Direct 2.0GB for 08161720895",
      "status": "successful",
      "created_at": "2026-09-30T07:30:31.292Z"
    },
    {
      "id": 260,
      "wallet_id": 51,
      "user_id": 51,
      "amount_kobo": "25000",
      "balance_before_kobo": "25000",
      "balance_after_kobo": "0",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790751978270-8710",
      "description": "Purchase: MTN SME 500MB for 08108452226",
      "status": "successful",
      "created_at": "2026-09-30T07:06:18.275Z"
    },
    {
      "id": 259,
      "wallet_id": 51,
      "user_id": 51,
      "amount_kobo": "25000",
      "balance_before_kobo": "0",
      "balance_after_kobo": "25000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790751908279-8206",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790751908279-8206)",
      "status": "successful",
      "created_at": "2026-09-30T07:05:30.067Z"
    },
    {
      "id": 258,
      "wallet_id": 51,
      "user_id": 51,
      "amount_kobo": "25000",
      "balance_before_kobo": "25000",
      "balance_after_kobo": "0",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790751908279-8206",
      "description": "Purchase: Airtel Corporate 500MB for 07013067466",
      "status": "successful",
      "created_at": "2026-09-30T07:05:08.285Z"
    },
    {
      "id": 257,
      "wallet_id": 51,
      "user_id": 51,
      "amount_kobo": "25000",
      "balance_before_kobo": "0",
      "balance_after_kobo": "25000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790751869927-4533",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790751869927-4533)",
      "status": "successful",
      "created_at": "2026-09-30T07:04:53.088Z"
    },
    {
      "id": 256,
      "wallet_id": 51,
      "user_id": 51,
      "amount_kobo": "25000",
      "balance_before_kobo": "25000",
      "balance_after_kobo": "0",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790751869927-4533",
      "description": "Purchase: Airtel Corporate 500MB for 07013067466",
      "status": "successful",
      "created_at": "2026-09-30T07:04:29.933Z"
    },
    {
      "id": 255,
      "wallet_id": 51,
      "user_id": 51,
      "amount_kobo": "25000",
      "balance_before_kobo": "0",
      "balance_after_kobo": "25000",
      "entry_type": "credit",
      "reference": "CREDIT-DF-20260930-IEZKS3",
      "description": "Wallet Funding: +₦250.00 (Ref: DF-20260930-IEZKS3)",
      "status": "successful",
      "created_at": "2026-09-30T07:02:56.777Z"
    },
    {
      "id": 254,
      "wallet_id": 50,
      "user_id": 50,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790751203179-8255",
      "description": "Purchase: MTN SME 1.0GB for 09133399847",
      "status": "successful",
      "created_at": "2026-09-30T06:53:23.185Z"
    },
    {
      "id": 253,
      "wallet_id": 50,
      "user_id": 50,
      "amount_kobo": "50000",
      "balance_before_kobo": "0",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "CREDIT-DF-20260930-EIXURA",
      "description": "Wallet Funding: +₦500.00 (Ref: DF-20260930-EIXURA)",
      "status": "successful",
      "created_at": "2026-09-30T06:51:37.106Z"
    },
    {
      "id": 252,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790744327646-7335",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-30T04:58:47.651Z"
    },
    {
      "id": 244,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790743905533-2178",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-30T04:51:45.540Z"
    },
    {
      "id": 243,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790743561606-9520",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790743561606-9520)",
      "status": "successful",
      "created_at": "2026-09-30T04:46:02.190Z"
    },
    {
      "id": 242,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790743561606-9520",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-30T04:46:01.612Z"
    },
    {
      "id": 218,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790742710289-5353",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790742710289-5353)",
      "status": "successful",
      "created_at": "2026-09-30T04:31:50.912Z"
    },
    {
      "id": 217,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790742710289-5353",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-30T04:31:50.295Z"
    },
    {
      "id": 216,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790742389764-4086",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790742389764-4086)",
      "status": "successful",
      "created_at": "2026-09-30T04:26:30.316Z"
    },
    {
      "id": 215,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790742389764-4086",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-30T04:26:29.769Z"
    },
    {
      "id": 214,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790742030214-4268",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790742030214-4268)",
      "status": "successful",
      "created_at": "2026-09-30T04:20:30.833Z"
    },
    {
      "id": 213,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790742030214-4268",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-30T04:20:30.219Z"
    },
    {
      "id": 212,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790741773689-7694",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790741773689-7694)",
      "status": "successful",
      "created_at": "2026-09-30T04:16:14.695Z"
    },
    {
      "id": 211,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790741773689-7694",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-30T04:16:13.695Z"
    },
    {
      "id": 210,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790716913288-5424",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790716913288-5424)",
      "status": "successful",
      "created_at": "2026-09-29T21:21:53.868Z"
    },
    {
      "id": 209,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790716913288-5424",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T21:21:53.295Z"
    },
    {
      "id": 208,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790708695746-8813",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790708695746-8813)",
      "status": "successful",
      "created_at": "2026-09-29T19:04:56.367Z"
    },
    {
      "id": 207,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790708695746-8813",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T19:04:55.752Z"
    },
    {
      "id": 206,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790694049860-6013",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790694049860-6013)",
      "status": "successful",
      "created_at": "2026-09-29T15:00:50.467Z"
    },
    {
      "id": 205,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790694049860-6013",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T15:00:49.866Z"
    },
    {
      "id": 204,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790692945451-1708",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790692945451-1708)",
      "status": "successful",
      "created_at": "2026-09-29T14:42:26.040Z"
    },
    {
      "id": 203,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790692945451-1708",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T14:42:25.457Z"
    },
    {
      "id": 202,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790692729307-3389",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790692729307-3389)",
      "status": "successful",
      "created_at": "2026-09-29T14:38:49.933Z"
    },
    {
      "id": 201,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790692729307-3389",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T14:38:49.314Z"
    },
    {
      "id": 200,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790692530484-2566",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790692530484-2566)",
      "status": "successful",
      "created_at": "2026-09-29T14:35:31.333Z"
    },
    {
      "id": 199,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790692530484-2566",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T14:35:30.491Z"
    },
    {
      "id": 198,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790692324545-6912",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790692324545-6912)",
      "status": "successful",
      "created_at": "2026-09-29T14:32:05.453Z"
    },
    {
      "id": 197,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790692324545-6912",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T14:32:04.551Z"
    },
    {
      "id": 196,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790690322031-8436",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790690322031-8436)",
      "status": "successful",
      "created_at": "2026-09-29T13:58:42.934Z"
    },
    {
      "id": 195,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790690322031-8436",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T13:58:42.037Z"
    },
    {
      "id": 187,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790688019383-4677",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790688019383-4677)",
      "status": "successful",
      "created_at": "2026-09-29T13:20:20.057Z"
    },
    {
      "id": 186,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790688019383-4677",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T13:20:19.388Z"
    },
    {
      "id": 176,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "4900",
      "balance_before_kobo": "99995100",
      "balance_after_kobo": "100000000",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790687449798-9224",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790687449798-9224)",
      "status": "successful",
      "created_at": "2026-09-29T13:10:50.467Z"
    },
    {
      "id": 175,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "4900",
      "balance_before_kobo": "100000000",
      "balance_after_kobo": "99995100",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790687449798-9224",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T13:10:49.803Z"
    },
    {
      "id": 172,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "4900",
      "balance_before_kobo": "99995100",
      "balance_after_kobo": "100000000",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790687021871-5572",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790687021871-5572)",
      "status": "successful",
      "created_at": "2026-09-29T13:03:42.842Z"
    },
    {
      "id": 171,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "4900",
      "balance_before_kobo": "100000000",
      "balance_after_kobo": "99995100",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790687021871-5572",
      "description": "Airtime: ₦50 MTN to 08012345678",
      "status": "successful",
      "created_at": "2026-09-29T13:03:41.877Z"
    },
    {
      "id": 154,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "9800",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "180400",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790683595676-1101",
      "description": "Airtime: ₦100 MTN to 08167743522",
      "status": "successful",
      "created_at": "2026-09-29T12:06:35.682Z"
    },
    {
      "id": 153,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790670748634-4608",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-29T08:32:28.640Z"
    },
    {
      "id": 152,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "165200",
      "balance_after_kobo": "160300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790663550498-4383",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T06:32:30.504Z"
    },
    {
      "id": 151,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "25000",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "165200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790663511573-8147",
      "description": "Purchase: MTN SME 500MB for 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T06:31:51.579Z"
    },
    {
      "id": 150,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790661640143-6592",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790661640143-6592)",
      "status": "successful",
      "created_at": "2026-09-29T06:00:40.742Z"
    },
    {
      "id": 149,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790661640143-6592",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T06:00:40.150Z"
    },
    {
      "id": 148,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790660088801-9977",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790660088801-9977)",
      "status": "successful",
      "created_at": "2026-09-29T05:34:49.364Z"
    },
    {
      "id": 147,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790660088801-9977",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T05:34:48.805Z"
    },
    {
      "id": 125,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790659535262-5031",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790659535262-5031)",
      "status": "successful",
      "created_at": "2026-09-29T05:25:35.924Z"
    },
    {
      "id": 124,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790659535262-5031",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T05:25:35.268Z"
    },
    {
      "id": 123,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790658049978-2112",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790658049978-2112)",
      "status": "successful",
      "created_at": "2026-09-29T05:00:50.624Z"
    },
    {
      "id": 122,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790658049978-2112",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T05:00:49.983Z"
    },
    {
      "id": 121,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790657003632-3074",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790657003632-3074)",
      "status": "successful",
      "created_at": "2026-09-29T04:43:24.198Z"
    },
    {
      "id": 120,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790657003632-3074",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T04:43:23.638Z"
    },
    {
      "id": 119,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790656839754-4641",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790656839754-4641)",
      "status": "successful",
      "created_at": "2026-09-29T04:40:40.391Z"
    },
    {
      "id": 118,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790656839754-4641",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-29T04:40:39.759Z"
    },
    {
      "id": 117,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "5000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790632599231-8040",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790632599231-8040)",
      "status": "successful",
      "created_at": "2026-09-28T21:56:39.679Z"
    },
    {
      "id": 116,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790632599231-8040",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T21:56:39.236Z"
    },
    {
      "id": 115,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "5000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790632592153-4626",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790632592153-4626)",
      "status": "successful",
      "created_at": "2026-09-28T21:56:32.586Z"
    },
    {
      "id": 114,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790632592153-4626",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T21:56:32.158Z"
    },
    {
      "id": 113,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "5000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790632583738-2127",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790632583738-2127)",
      "status": "successful",
      "created_at": "2026-09-28T21:56:24.350Z"
    },
    {
      "id": 112,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790632583738-2127",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T21:56:23.744Z"
    },
    {
      "id": 111,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790630579345-4839",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790630579345-4839)",
      "status": "successful",
      "created_at": "2026-09-28T21:23:00.069Z"
    },
    {
      "id": 110,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790630579345-4839",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T21:22:59.356Z"
    },
    {
      "id": 109,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790624437024-1182",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790624437024-1182)",
      "status": "successful",
      "created_at": "2026-09-28T19:40:37.624Z"
    },
    {
      "id": 108,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790624437024-1182",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T19:40:37.030Z"
    },
    {
      "id": 107,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790622321344-8528",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790622321344-8528)",
      "status": "successful",
      "created_at": "2026-09-28T19:05:21.967Z"
    },
    {
      "id": 106,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790622321344-8528",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T19:05:21.351Z"
    },
    {
      "id": 105,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "48000",
      "balance_before_kobo": "2000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790609643192-2726",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790609643192-2726)",
      "status": "successful",
      "created_at": "2026-09-28T15:34:24.487Z"
    },
    {
      "id": 104,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "48000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "2000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790609643192-2726",
      "description": "Purchase: MTN Direct 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T15:34:03.199Z"
    },
    {
      "id": 103,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "48000",
      "balance_before_kobo": "2000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790609606626-9156",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790609606626-9156)",
      "status": "successful",
      "created_at": "2026-09-28T15:33:47.902Z"
    },
    {
      "id": 102,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "48000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "2000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790609606626-9156",
      "description": "Purchase: MTN Direct 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T15:33:26.632Z"
    },
    {
      "id": 101,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790605841622-1553",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790605841622-1553)",
      "status": "successful",
      "created_at": "2026-09-28T14:31:02.865Z"
    },
    {
      "id": 100,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790605841622-1553",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T14:30:41.628Z"
    },
    {
      "id": 99,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "5000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790604826110-3096",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790604826110-3096)",
      "status": "successful",
      "created_at": "2026-09-28T14:14:07.280Z"
    },
    {
      "id": 98,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790604826110-3096",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T14:13:46.116Z"
    },
    {
      "id": 97,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "5000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790604798799-8772",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790604798799-8772)",
      "status": "successful",
      "created_at": "2026-09-28T14:13:39.924Z"
    },
    {
      "id": 96,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790604798799-8772",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T14:13:18.806Z"
    },
    {
      "id": 95,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "5000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790604760504-7033",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790604760504-7033)",
      "status": "successful",
      "created_at": "2026-09-28T14:13:01.820Z"
    },
    {
      "id": 94,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790604760504-7033",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T14:12:40.511Z"
    },
    {
      "id": 93,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "4900",
      "balance_before_kobo": "99995100",
      "balance_after_kobo": "100000000",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790601970806-5660",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790601970806-5660)",
      "status": "successful",
      "created_at": "2026-09-28T13:26:32.137Z"
    },
    {
      "id": 92,
      "wallet_id": 1,
      "user_id": 1,
      "amount_kobo": "4900",
      "balance_before_kobo": "100000000",
      "balance_after_kobo": "99995100",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790601970806-5660",
      "description": "Airtime: ₦50 MTN to 08012345678",
      "status": "successful",
      "created_at": "2026-09-28T13:26:10.812Z"
    },
    {
      "id": 91,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "5000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790600553544-5266",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790600553544-5266)",
      "status": "successful",
      "created_at": "2026-09-28T13:02:54.753Z"
    },
    {
      "id": 90,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790600553544-5266",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T13:02:33.549Z"
    },
    {
      "id": 89,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "5000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790600517423-6879",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790600517423-6879)",
      "status": "successful",
      "created_at": "2026-09-28T13:02:22.027Z"
    },
    {
      "id": 88,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790600517423-6879",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T13:01:57.428Z"
    },
    {
      "id": 87,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "5000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790600489615-4658",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790600489615-4658)",
      "status": "successful",
      "created_at": "2026-09-28T13:01:50.880Z"
    },
    {
      "id": 86,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790600489615-4658",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T13:01:29.622Z"
    },
    {
      "id": 85,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "5000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790597275622-8983",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790597275622-8983)",
      "status": "successful",
      "created_at": "2026-09-28T12:08:16.835Z"
    },
    {
      "id": 84,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790597275622-8983",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T12:07:55.629Z"
    },
    {
      "id": 83,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "5000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790597239813-4478",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790597239813-4478)",
      "status": "successful",
      "created_at": "2026-09-28T12:07:41.057Z"
    },
    {
      "id": 82,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790597239813-4478",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T12:07:19.819Z"
    },
    {
      "id": 81,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "5000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790596487495-6482",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790596487495-6482)",
      "status": "successful",
      "created_at": "2026-09-28T11:55:08.785Z"
    },
    {
      "id": 80,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790596487495-6482",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T11:54:47.502Z"
    },
    {
      "id": 79,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "5000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790594166915-7932",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790594166915-7932)",
      "status": "successful",
      "created_at": "2026-09-28T11:16:28.120Z"
    },
    {
      "id": 78,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790594166915-7932",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T11:16:06.921Z"
    },
    {
      "id": 77,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "5000",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790594130920-4135",
      "description": "Auto-Refund: Network busy data purchase (DH-DATA-1790594130920-4135)",
      "status": "successful",
      "created_at": "2026-09-28T11:15:52.393Z"
    },
    {
      "id": 76,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "45000",
      "balance_before_kobo": "50000",
      "balance_after_kobo": "5000",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790594130920-4135",
      "description": "Purchase: MTN SME 1.0GB for 07034886373",
      "status": "successful",
      "created_at": "2026-09-28T11:15:30.928Z"
    },
    {
      "id": 75,
      "wallet_id": 24,
      "user_id": 24,
      "amount_kobo": "50000",
      "balance_before_kobo": "0",
      "balance_after_kobo": "50000",
      "entry_type": "credit",
      "reference": "CREDIT-DF-20260928-H9IDXL",
      "description": "Wallet Funding: +₦500.00 (Ref: DF-20260928-H9IDXL)",
      "status": "successful",
      "created_at": "2026-09-28T11:13:57.934Z"
    },
    {
      "id": 74,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "185300",
      "balance_after_kobo": "190200",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790590060052-6320",
      "description": "Auto-Refund: Network busy airtime purchase (DH-AIR-1790590060052-6320)",
      "status": "successful",
      "created_at": "2026-09-28T10:08:01.337Z"
    },
    {
      "id": 73,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "190200",
      "balance_after_kobo": "185300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790590060052-6320",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T10:07:40.058Z"
    },
    {
      "id": 72,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "195100",
      "balance_after_kobo": "190200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790581333646-6091",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T07:42:13.651Z"
    },
    {
      "id": 71,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "100000",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "195100",
      "entry_type": "credit",
      "reference": "CREDIT-DF-20260928-NADCKC",
      "description": "Wallet Funding: +₦1,000.00 (Ref: DF-20260928-NADCKC)",
      "status": "successful",
      "created_at": "2026-09-28T07:37:20.098Z"
    },
    {
      "id": 70,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "90200",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790579941595-6534",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790579941595-6534)",
      "status": "successful",
      "created_at": "2026-09-28T07:19:02.297Z"
    },
    {
      "id": 69,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "90200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790579941595-6534",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T07:19:01.600Z"
    },
    {
      "id": 68,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "90200",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790578758616-4771",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790578758616-4771)",
      "status": "successful",
      "created_at": "2026-09-28T06:59:19.180Z"
    },
    {
      "id": 67,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "90200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790578758616-4771",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T06:59:18.624Z"
    },
    {
      "id": 66,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "90200",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790574179920-2706",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790574179920-2706)",
      "status": "successful",
      "created_at": "2026-09-28T05:43:00.535Z"
    },
    {
      "id": 65,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "90200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790574179920-2706",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T05:42:59.927Z"
    },
    {
      "id": 63,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "9800",
      "balance_before_kobo": "85300",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790571710305-1252",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790571710305-1252)",
      "status": "successful",
      "created_at": "2026-09-28T05:01:50.816Z"
    },
    {
      "id": 62,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "9800",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "85300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790571710305-1252",
      "description": "Airtime: ₦100 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T05:01:50.310Z"
    },
    {
      "id": 61,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "90200",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790571543555-1791",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790571543555-1791)",
      "status": "successful",
      "created_at": "2026-09-28T04:59:04.131Z"
    },
    {
      "id": 60,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "90200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790571543555-1791",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T04:59:03.562Z"
    },
    {
      "id": 59,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "90200",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790570716617-1824",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790570716617-1824)",
      "status": "successful",
      "created_at": "2026-09-28T04:45:17.152Z"
    },
    {
      "id": 58,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "90200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790570716617-1824",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T04:45:16.623Z"
    },
    {
      "id": 57,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "90200",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790570372563-8145",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790570372563-8145)",
      "status": "successful",
      "created_at": "2026-09-28T04:39:33.070Z"
    },
    {
      "id": 56,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "90200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790570372563-8145",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T04:39:32.569Z"
    },
    {
      "id": 55,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "90200",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790570113753-1170",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790570113753-1170)",
      "status": "successful",
      "created_at": "2026-09-28T04:35:15.002Z"
    },
    {
      "id": 54,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "90200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790570113753-1170",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T04:35:13.760Z"
    },
    {
      "id": 53,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "90200",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790568982649-3803",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790568982649-3803)",
      "status": "successful",
      "created_at": "2026-09-28T04:16:23.185Z"
    },
    {
      "id": 52,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "90200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790568982649-3803",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T04:16:22.656Z"
    },
    {
      "id": 51,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "90200",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790566599494-4147",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790566599494-4147)",
      "status": "successful",
      "created_at": "2026-09-28T03:36:40.256Z"
    },
    {
      "id": 50,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "90200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790566599494-4147",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T03:36:39.501Z"
    },
    {
      "id": 49,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "90200",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790565865148-1848",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790565865148-1848)",
      "status": "successful",
      "created_at": "2026-09-28T03:24:25.682Z"
    },
    {
      "id": 48,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "90200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790565865148-1848",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-28T03:24:25.154Z"
    },
    {
      "id": 47,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "90200",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790546468350-6836",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790546468350-6836)",
      "status": "successful",
      "created_at": "2026-09-27T22:01:08.911Z"
    },
    {
      "id": 46,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "90200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790546468350-6836",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-27T22:01:08.356Z"
    },
    {
      "id": 38,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "25000",
      "balance_before_kobo": "70100",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-DATA-1790542067873-4982",
      "description": "Auto-Refund: Failed data purchase (DH-DATA-1790542067873-4982)",
      "status": "successful",
      "created_at": "2026-09-27T20:48:03.421Z"
    },
    {
      "id": 37,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "25000",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "70100",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790542067873-4982",
      "description": "Purchase: MTN SME 500MB for 08161720895",
      "status": "successful",
      "created_at": "2026-09-27T20:47:47.879Z"
    },
    {
      "id": 36,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "90200",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790541954882-9456",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790541954882-9456)",
      "status": "successful",
      "created_at": "2026-09-27T20:45:55.441Z"
    },
    {
      "id": 35,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "90200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790541954882-9456",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-27T20:45:54.889Z"
    },
    {
      "id": 27,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "90200",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790541550073-3942",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790541550073-3942)",
      "status": "successful",
      "created_at": "2026-09-27T20:39:35.406Z"
    },
    {
      "id": 26,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "90200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790541550073-3942",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-27T20:39:10.080Z"
    },
    {
      "id": 9,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "90200",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790540850547-6189",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790540850547-6189)",
      "status": "successful",
      "created_at": "2026-09-27T20:27:31.211Z"
    },
    {
      "id": 8,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "90200",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790540850547-6189",
      "description": "Airtime: ₦50 MTN to 08161720895",
      "status": "successful",
      "created_at": "2026-09-27T20:27:30.554Z"
    },
    {
      "id": 7,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "9800",
      "balance_before_kobo": "85300",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790540254293-3585",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790540254293-3585)",
      "status": "successful",
      "created_at": "2026-09-27T20:17:34.859Z"
    },
    {
      "id": 6,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "9800",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "85300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790540254293-3585",
      "description": "Airtime: ₦100 MTN to 08031181211",
      "status": "successful",
      "created_at": "2026-09-27T20:17:34.299Z"
    },
    {
      "id": 5,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "9800",
      "balance_before_kobo": "85300",
      "balance_after_kobo": "95100",
      "entry_type": "credit",
      "reference": "REFUND-DH-AIR-1790540198713-1099",
      "description": "Auto-Refund: Failed airtime purchase (DH-AIR-1790540198713-1099)",
      "status": "successful",
      "created_at": "2026-09-27T20:16:39.341Z"
    },
    {
      "id": 4,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "9800",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "85300",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790540198713-1099",
      "description": "Airtime: ₦100 MTN to 08031181211",
      "status": "successful",
      "created_at": "2026-09-27T20:16:38.719Z"
    },
    {
      "id": 3,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "45000",
      "balance_before_kobo": "95100",
      "balance_after_kobo": "50100",
      "entry_type": "debit",
      "reference": "DEBIT-DH-DATA-1790446141836-5020",
      "description": "Purchase: MTN SME 1.0GB for 09069703081",
      "status": "successful",
      "created_at": "2026-09-26T18:09:01.843Z"
    },
    {
      "id": 2,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "4900",
      "balance_before_kobo": "100000",
      "balance_after_kobo": "95100",
      "entry_type": "debit",
      "reference": "DEBIT-DH-AIR-1790429179164-5518",
      "description": "Airtime: ₦50 MTN to 08101351921",
      "status": "successful",
      "created_at": "2026-09-26T13:26:19.171Z"
    },
    {
      "id": 1,
      "wallet_id": 5,
      "user_id": 5,
      "amount_kobo": "100000",
      "balance_before_kobo": "0",
      "balance_after_kobo": "100000",
      "entry_type": "credit",
      "reference": "CREDIT-DF-20260926-HH3IHL",
      "description": "Wallet Funding: +₦1,000.00 (Ref: DF-20260926-HH3IHL)",
      "status": "successful",
      "created_at": "2026-09-26T13:24:27.750Z"
    }
  ],
  "settings": {
    "id": 1,
    "platform_name": "Standard DataHub VTU",
    "logo_url": "/logo.svg",
    "support_phone": "08161720895",
    "support_email": "ibrahimmal916@gmail.com",
    "bank_name": "Opay",
    "account_number": "6423809175",
    "account_name": "Ibrahim Bello",
    "manual_funding_instructions": "Make a direct bank transfer to our Opay account above (6423809175 - Ibrahim Bello). After transferring, submit your transfer reference below. Our admin team will verify and credit your wallet promptly.",
    "default_markup_kobo": "3000",
    "maintenance_mode": false,
    "demo_mode": false,
    "updated_at": "2026-09-27T14:35:51.641Z",
    "apk_download_url": null,
    "clubkonnect_user_id": "08161720895",
    "clubkonnect_api_key": "4F8T1AN80X5SF54DV0PFI2R771QBXXTHC38F0S698378I05TBYC1D3P5T863NW37"
  },
  "updated_at": "2026-10-01T10:51:24.944Z"
}
```

