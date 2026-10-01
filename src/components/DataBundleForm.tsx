import React, { useState, useEffect } from 'react';
import { NETWORKS, DATA_PLANS } from '../constants';
import { NetworkCode, DataPlan, Transaction } from '../types';
import { Wifi, ShieldCheck, AlertCircle, Loader2, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DataBundleFormProps {
  walletBalance: number;
  onSuccess: (tx: Transaction, newBalance: number) => void;
  onOpenFundWallet: () => void;
}

export const DataBundleForm: React.FC<DataBundleFormProps> = ({
  walletBalance,
  onSuccess,
  onOpenFundWallet
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkCode>('01');
  const [planTypeFilter, setPlanTypeFilter] = useState<'All' | 'SME' | 'Corporate'>('All');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refundAlert, setRefundAlert] = useState<string | null>(null);

  // Filter plans by selected network and type
  const availablePlans = DATA_PLANS.filter(p => {
    if (p.networkCode !== selectedNetwork) return false;
    if (planTypeFilter === 'All') return true;
    return p.type === planTypeFilter;
  });

  // Select first available plan when network or type filter changes
  useEffect(() => {
    if (availablePlans.length > 0) {
      setSelectedPlanId(availablePlans[0].id);
    } else {
      setSelectedPlanId('');
    }
  }, [selectedNetwork, planTypeFilter]);

  // Auto-detect network prefix
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

  const currentPlan = availablePlans.find(p => p.id === selectedPlanId);
  const isInsufficient = currentPlan ? walletBalance < currentPlan.price : false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRefundAlert(null);

    if (!currentPlan) {
      setError('Please select a data bundle plan.');
      return;
    }

    const cleanNumber = mobileNumber.replace(/\D/g, '');
    if (cleanNumber.length !== 11) {
      setError('Phone number must be exactly 11 digits (e.g. 08012345678).');
      return;
    }

    if (!currentPlan || currentPlan.price <= 0) {
      setError('Selected data plan price must be greater than ₦0.');
      return;
    }

    if (isInsufficient) {
      setError(`Insufficient wallet balance. You need ₦${currentPlan.price.toLocaleString()}, but have ₦${walletBalance.toLocaleString()}.`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          networkCode: selectedNetwork,
          dataPlanCode: currentPlan.code,
          planName: `${currentPlan.name} ${currentPlan.size}`,
          price: currentPlan.price,
          mobileNumber: cleanNumber,
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
          setError(data.message || 'Could not process data purchase.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Network communication error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-8 backdrop-blur-xl max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
      
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-600" />

      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
            Instant 4G / 5G Bundles
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 mt-1">
            Buy Mobile Data Bundle
          </h2>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-600/20 border border-white/10 flex items-center justify-center">
          <Wifi className="w-6 h-6 text-blue-400" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">

        {/* 1. NETWORK SELECTION */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
            1. Select Network
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {NETWORKS.map((network) => {
              const isSelected = selectedNetwork === network.code;
              return (
                <button
                  type="button"
                  key={network.code}
                  onClick={() => setSelectedNetwork(network.code)}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/15 shadow-md shadow-emerald-500/20'
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
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. PLAN TYPE FILTER */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              2. Data Type
            </label>
            <div className="flex items-center gap-1 p-0.5 bg-slate-950/60 rounded-lg border border-white/10">
              {(['All', 'SME', 'Corporate'] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setPlanTypeFilter(type)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                    planTypeFilter === type
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* PLAN TILES GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
            {availablePlans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              return (
                <button
                  type="button"
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/20 shadow-md shadow-blue-500/20'
                      : 'border-white/10 bg-slate-950/40 hover:bg-white/5'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                  <span className="text-base sm:text-lg font-bold font-mono text-white block tabular-nums">
                    {plan.size}
                  </span>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {plan.type} · {plan.validity}
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono mt-2 tabular-nums">
                    ₦{plan.price.toLocaleString()}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. RECIPIENT PHONE */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            3. Recipient Phone Number
          </label>
          <input
            type="tel"
            placeholder="e.g. 0803 123 4567"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl bg-slate-950/70 border border-white/15 text-white placeholder-slate-500 font-mono text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            required
          />
        </div>

        {/* SUMMARY CARD */}
        {currentPlan && (
          <div className="p-4 rounded-xl bg-slate-950/50 border border-white/10 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block">Selected Package:</span>
              <span className="font-bold text-white text-sm">
                {currentPlan.name} ({currentPlan.size})
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block">Total Deduction:</span>
              <span className="font-mono font-black text-emerald-400 text-base tabular-nums">
                ₦{currentPlan.price.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* INSUFFICIENT BALANCE WARNING */}
        {isInsufficient && currentPlan && (
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
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
            <strong>Refund Processed:</strong> {refundAlert}
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
          disabled={loading || isInsufficient || !currentPlan}
          className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-emerald-600/25 active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Provisioning Bundle with ClubKonnect...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Send Data Bundle ({currentPlan ? `₦${currentPlan.price.toLocaleString()}` : ''})</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
};
