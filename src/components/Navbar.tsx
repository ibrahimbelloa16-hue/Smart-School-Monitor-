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
