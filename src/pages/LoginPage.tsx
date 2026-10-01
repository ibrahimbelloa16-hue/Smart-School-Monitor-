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
