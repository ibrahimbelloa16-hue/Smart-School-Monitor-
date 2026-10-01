import os

files_to_export = [
    '.env.example',
    '.gitignore',
    'README.md',
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'metadata.json',
    'index.html',
    'supabase-schema.sql',
    'server.js',
    'server.ts',
    'server/db/database.ts',
    'server/db/init.ts',
    'server/db/persistenceBackup.ts',
    'server/db/schema.sql',
    'server/middleware/auth.ts',
    'server/routes/adminRoutes.ts',
    'server/routes/authRoutes.ts',
    'server/routes/vtuRoutes.ts',
    'server/routes/walletRoutes.ts',
    'server/services/clubkonnectService.ts',
    'server/services/fundingService.ts',
    'server/services/transactionEngine.ts',
    'server/services/walletService.ts',
    'server/tests/runTests.ts',
    'public/manifest.json',
    'public/favicon.svg',
    'public/logo.svg',
    'public/sw.js',
    'src/main.tsx',
    'src/vite-env.d.ts',
    'src/App.tsx',
    'src/index.css',
    'src/constants.ts',
    'src/types.ts',
    'src/types/index.ts',
    'src/lib/supabase.ts',
    'src/lib/api.ts',
    'src/lib/carrierDetector.ts',
    'src/lib/soundAlert.ts',
    'src/lib/utils.ts',
    'src/hooks/usePWAInstall.ts',
    'src/hooks/useWalletVisibility.ts',
    'src/context/AuthContext.tsx',
    'src/components/AirtimeForm.tsx',
    'src/components/BottomNav.tsx',
    'src/components/DataBundleForm.tsx',
    'src/components/ErrorBoundary.tsx',
    'src/components/InstallAppModal.tsx',
    'src/components/Navbar.tsx',
    'src/components/PinModal.tsx',
    'src/components/ReceiptModal.tsx',
    'src/components/ServiceCards.tsx',
    'src/components/SetPinModal.tsx',
    'src/components/StandardLogo.tsx',
    'src/components/Toast.tsx',
    'src/components/TransactionHistory.tsx',
    'src/components/TransactionReceiptModal.tsx',
    'src/components/UtilitiesForm.tsx',
    'src/components/WalletFundingModal.tsx',
    'src/components/WalletView.tsx',
    'src/pages/HomePage.tsx',
    'src/pages/BuyDataPage.tsx',
    'src/pages/BuyAirtimePage.tsx',
    'src/pages/FundWalletPage.tsx',
    'src/pages/TransactionsPage.tsx',
    'src/pages/ProfilePage.tsx',
    'src/pages/LoginPage.tsx',
    'src/pages/RegisterPage.tsx',
    'src/pages/ContactPage.tsx',
    'src/pages/AdminPage.tsx',
    'data_store.json',
    'data/persistence_snapshot.json'
]

ext_map = {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.js': 'javascript',
    '.json': 'json',
    '.sql': 'sql',
    '.html': 'html',
    '.css': 'css',
    '.md': 'markdown',
    '.svg': 'xml'
}

with open('EXPORT_FOR_GITHUB.md', 'w', encoding='utf-8') as out:
    out.write('# Standard DataHub VTU - Full Project Export for GitHub\n\n')
    out.write('> Repository: `ibrahimbelloa16-hue/Standard-DataHub-VTU`\n')
    out.write('> Exported for full project synchronization with Supabase Cloud and Zero localStorage.\n\n')
    out.write('## Project File Index\n\n')
    for f in files_to_export:
        out.write(f'- `{f}`\n')
    out.write('\n---\n\n')

    for filepath in files_to_export:
        if not os.path.exists(filepath):
            print(f'Warning: file not found {filepath}')
            continue
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        _, ext = os.path.splitext(filepath)
        lang = ext_map.get(ext, 'text')
        if filepath == '.gitignore':
            lang = 'text'
        elif filepath == '.env.example':
            lang = 'bash'
        
        out.write(f'### FILE: {filepath}\n')
        out.write(f'```{lang}\n')
        out.write(content)
        if not content.endswith('\n'):
            out.write('\n')
        out.write('```\n\n')

print('Export complete. File size: ', os.path.getsize('EXPORT_FOR_GITHUB.md'), 'bytes')
