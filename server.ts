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
