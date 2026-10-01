import React, { useState } from 'react';
import { UserProfile, Transaction } from '../types';
import { useWalletVisibility } from '../hooks/useWalletVisibility.ts';
import { 
  Building2, 
  Copy, 
  Check, 
  Wallet, 
  Plus, 
  ShieldCheck, 
  Share2, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';

interface WalletViewProps {
  user: UserProfile | null;
  onOpenFundModal: () => void;
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  user,
  onOpenFundModal,
  transactions,
  onSelectTransaction,
}) => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const { isHidden, toggleVisibility, formatBalance } = useWalletVisibility();

  const handleCopy = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const virtualAccounts = user?.virtualAccounts || [
    { bankName: 'Moniepoint MFB', accountNumber: '8123456789', accountName: 'DataHub / Ibrahim Mal' },
    { bankName: 'Wema Bank', accountNumber: '7829104432', accountName: 'DataHub / Ibrahim Mal' },
    { bankName: 'Palmpay', accountNumber: '9012345678', accountName: 'DataHub / Ibrahim Mal' }
  ];

  const fundingTransactions = transactions.filter(t => t.type === 'WALLET_FUNDING');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Wallet Balance Hero Card */}
      <div 
        className="p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(16, 185, 129, 0.18))',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Main Naira Wallet
          </span>
          <div className="flex items-center gap-2.5 mt-1">
            <div className="text-3xl sm:text-4xl font-black font-mono text-white tabular-nums">
              {user ? formatBalance(user.walletBalance) : '₦0.00'}
            </div>
            <button
              type="button"
              onClick={toggleVisibility}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              title={isHidden ? 'Click to show balance' : 'Click to hide balance'}
              aria-label="Toggle balance visibility"
            >
              {isHidden ? (
                <EyeOff className="w-5 h-5 text-emerald-400" />
              ) : (
                <Eye className="w-5 h-5 text-white/80" />
              )}
            </button>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Account Holder: <strong className="text-white">{user?.name}</strong> · {user?.email}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenFundModal}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 transition-all shadow-lg shadow-blue-600/20 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Fund Wallet</span>
          </button>
        </div>
      </div>

      {/* Virtual Dedicated Bank Accounts Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              Dedicated Virtual Bank Accounts (Auto-Credit)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Zero transfer charges</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {virtualAccounts.map((acc) => {
            const isCopied = copiedBank === acc.bankName;
            return (
              <div
                key={acc.bankName}
                className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-white">{acc.bankName}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Instant
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Account Number
                  </span>
                  <div className="font-mono text-lg font-black text-blue-400 tracking-wider my-0.5 tabular-nums">
                    {acc.accountNumber}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {acc.accountName}
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
                  className={`mt-4 w-full py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                    isCopied
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied Account</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Account Number</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Funding History */}
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-6">
        <h3 className="text-sm font-bold text-white tracking-tight mb-4">
          Wallet Deposit Log
        </h3>

        {fundingTransactions.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No wallet top-up records yet.
          </div>
        ) : (
          <div className="space-y-2">
            {fundingTransactions.map((tx) => (
              <button
                key={tx.id}
                onClick={() => onSelectTransaction(tx)}
                className="w-full p-3 rounded-xl bg-slate-950/40 hover:bg-white/5 border border-white/5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ArrowDownLeft className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {tx.recipient}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(tx.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-emerald-400 tabular-nums">
                    +₦{Math.abs(tx.faceValue).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {tx.id}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
