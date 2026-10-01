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
