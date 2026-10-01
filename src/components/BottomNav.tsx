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
