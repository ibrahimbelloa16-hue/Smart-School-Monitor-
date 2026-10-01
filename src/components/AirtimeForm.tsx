import React, { useState, useEffect } from 'react';
import { NETWORKS } from '../constants';
import { NetworkCode, Transaction } from '../types';
import { PhoneCall, ShieldCheck, CheckCircle2, AlertCircle, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AirtimeFormProps {
  walletBalance: number;
  onSuccess: (tx: Transaction, newBalance: number) => void;
  onOpenFundWallet: () => void;
}

export const AirtimeForm: React.FC<AirtimeFormProps> = ({
  walletBalance,
  onSuccess,
  onOpenFundWallet
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkCode>('01'); // MTN default
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('1000');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refundAlert, setRefundAlert] = useState<string | null>(null);

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  // Auto-detect network based on prefixes
  useEffect(() => {
    const cleanNumber = mobileNumber.replace(/\D/g, '');
    if (cleanNumber.length >= 4) {
      const prefix = cleanNumber.slice(0, 4);
      for (const net of NETWORKS) {
        if (net.prefixes.includes(prefix)) {
          setSelectedNetwork(net.code);
          break;
        }
      }
    }
  }, [mobileNumber]);

  const numAmount = Number(amount) || 0;
  // 1% Promotional Discount
  const payableAmount = Math.round(numAmount * 0.99);
  const discountAmount = numAmount - payableAmount;
  const isInsufficient = walletBalance < payableAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRefundAlert(null);

    const cleanNumber = mobileNumber.replace(/\D/g, '');
    if (cleanNumber.length !== 11) {
      setError('Phone number must be exactly 11 digits (e.g. 08012345678).');
      return;
    }

    if (numAmount <= 0) {
      setError('Amount must be greater than ₦0.');
      return;
    }

    if (numAmount < 50) {
      setError('Minimum airtime top-up is ₦50.');
      return;
    }

    if (isInsufficient) {
      setError(`Insufficient balance. You need ₦${payableAmount.toLocaleString()}, but your balance is ₦${walletBalance.toLocaleString()}.`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/airtime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          networkCode: selectedNetwork,
          mobileNumber: cleanNumber,
          amount: numAmount
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        onSuccess(data.transaction, data.newBalance);
        setMobileNumber('');
      } else {
        if (data.refunded || data.status === 'FAILED_REFUNDED') {
          setRefundAlert(data.message || 'Network busy, funds refunded to wallet.');
        } else {
          setError(data.message || 'Airtime purchase could not be completed.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Network connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedNetObj = NETWORKS.find(n => n.code === selectedNetwork);

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-8 backdrop-blur-xl max-w-xl mx-auto shadow-2xl relative overflow-hidden">
      
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-400" />

      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
            VTU Instant Top-Up
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 mt-1">
            Buy Mobile Airtime
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              1% Discount
            </span>
          </h2>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-emerald-500/20 border border-white/10 flex items-center justify-center">
          <PhoneCall className="w-6 h-6 text-emerald-400" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">

        {/* 1. SELECT NETWORK */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
            Select Mobile Network
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {NETWORKS.map((network) => {
              const isSelected = selectedNetwork === network.code;
              return (
                <button
                  type="button"
                  key={network.code}
                  onClick={() => setSelectedNetwork(network.code)}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/15 shadow-md shadow-blue-500/20'
                      : 'border-white/10 bg-slate-800/40 hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full mb-1.5 shadow-sm"
                    style={{ backgroundColor: network.color }}
                  />
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    {network.name}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                    {network.code}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. PHONE NUMBER */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Recipient Phone Number
            </label>
            {selectedNetObj && (
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                Detected: <strong className="text-white">{selectedNetObj.name}</strong>
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="tel"
              placeholder="e.g. 0803 123 4567"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950/70 border border-white/15 text-white placeholder-slate-500 font-mono text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>
        </div>

        {/* 3. RECHARGE AMOUNT */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Airtime Amount (₦)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-slate-400 font-mono text-lg font-bold">
              ₦
            </span>
            <input
              type="number"
              min="50"
              max="50000"
              step="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-9 pr-4 py-3.5 rounded-xl bg-slate-950/70 border border-white/15 text-white placeholder-slate-500 font-mono text-lg font-bold tabular-nums focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Quick amount chips */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-2.5">
            {quickAmounts.map((q) => (
              <button
                type="button"
                key={q}
                onClick={() => setAmount(String(q))}
                className={`py-1.5 px-2 rounded-lg text-xs font-mono font-medium border transition-colors tabular-nums ${
                  numAmount === q
                    ? 'bg-blue-600/30 border-blue-500/50 text-white'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                ₦{q.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* BREAKDOWN CARD */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-white/10 space-y-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Face-value Airtime Amount</span>
            <span className="font-mono text-slate-200 tabular-nums">₦{numAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-emerald-400 font-medium">
            <span>DataHub 1% Discount Margin</span>
            <span className="font-mono tabular-nums">-₦{discountAmount.toLocaleString()}</span>
          </div>
          <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
            <span>Total Deducted From Wallet</span>
            <span className="font-mono text-emerald-400 text-base tabular-nums">
              ₦{payableAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* INSUFFICIENT BALANCE WARNING */}
        {isInsufficient && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Insufficient balance (₦{walletBalance.toLocaleString()})</span>
            </div>
            <button
              type="button"
              onClick={onOpenFundWallet}
              className="text-xs font-bold underline hover:text-white"
            >
              Fund Wallet
            </button>
          </div>
        )}

        {/* REFUND NOTICE */}
        {refundAlert && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 space-y-1">
            <div className="flex items-center gap-2 font-bold text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Transaction Failed & Refunded</span>
            </div>
            <p className="text-[11px] text-slate-300">{refundAlert}</p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading || isInsufficient || numAmount <= 0}
          className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-600/25 active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Contacting ClubKonnect VTU Gateway...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Instant Recharge ₦{numAmount.toLocaleString()} (Pay ₦{payableAmount.toLocaleString()})</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Direct Nellobyte API
          </span>
          <span>·</span>
          <span>Instant Wallet Deduction</span>
          <span>·</span>
          <span>Automated Refund Policy</span>
        </div>

      </form>
    </div>
  );
};
