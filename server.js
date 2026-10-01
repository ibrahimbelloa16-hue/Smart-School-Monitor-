// Standard DataHub Server Entry Point
// Ensures execution of the robust full-stack TypeScript server with native SQLite persistence
try {
  await import('tsx/esm');
  await import('./server.ts');
} catch (err) {
  console.error('[Server Loader] Failed to initialize server.ts via tsx loader:', err);
  process.exit(1);
}
