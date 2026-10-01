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
