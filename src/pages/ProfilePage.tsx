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
