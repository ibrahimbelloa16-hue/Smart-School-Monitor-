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
