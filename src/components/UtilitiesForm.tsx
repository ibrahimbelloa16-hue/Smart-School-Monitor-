import React, { useState } from 'react';
import { CABLE_PROVIDERS, ELECTRICITY_DISCOS, BETTING_PLATFORMS } from '../constants';
import { Transaction } from '../types';
import { Tv, Zap, Trophy, ShieldCheck, AlertCircle, Loader2, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface UtilitiesFormProps {
  walletBalance: number;
  initialCategory?: 'cable' | 'electricity' | 'betting';
  onSuccess: (tx: Transaction, newBalance: number) => void;
  onOpenFundWallet: () => void;
}

export const UtilitiesForm: React.FC<UtilitiesFormProps> = ({
  walletBalance,
  initialCategory = 'cable',
  onSuccess,
  onOpenFundWallet,
}) => {
  const [category, setCategory] = useState<'cable' | 'electricity' | 'betting'>(initialCategory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cable State
  const [cableProvider, setCableProvider] = useState(CABLE_PROVIDERS[0].name);
  const [smartcardNumber, setSmartcardNumber] = useState('');
  const [selectedCablePackage, setSelectedCablePackage] = useState(CABLE_PROVIDERS[0].packages[0]);

  // Electricity State
  const [disco, setDisco] = useState(ELECTRICITY_DISCOS[0].id);
  const [meterNumber, setMeterNumber] = useState('');
  const [meterType, setMeterType] = useState<'PREPAID' | 'POSTPAID'>('PREPAID');
  const [electricityAmount, setElectricityAmount] = useState('2500');

  // Betting State
  const [bettingPlatform, setBettingPlatform] = useState(BETTING_PLATFORMS[0].name);
  const [customerId, setCustomerId] = useState('');
  const [bettingAmount, setBettingAmount] = useState('1000');

  // Cable provider change handler
  const handleCableProviderChange = (name: string) => {
    setCableProvider(name);
    const provider = CABLE_PROVIDERS.find(p => p.name === name);
    if (provider && provider.packages.length > 0) {
      setSelectedCablePackage(provider.packages[0]);
    }
  };

  const currentProviderObj = CABLE_PROVIDERS.find(p => p.name === cableProvider) || CABLE_PROVIDERS[0];

  const handleCableSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!smartcardNumber || smartcardNumber.length < 8) {
      setError('Please enter a valid IUC or Smartcard Number.');
      return;
    }
    if (walletBalance < selectedCablePackage.price) {
      setError(`Insufficient wallet balance. You need ₦${selectedCablePackage.price.toLocaleString()}.`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/cable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: cableProvider,
          packageName: selectedCablePackage.name,
          packageCode: selectedCablePackage.name.toLowerCase().replace(/\s+/g, '-'),
          smartcardNumber,
          price: selectedCablePackage.price,
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        confetti();
        onSuccess(data.transaction, data.newBalance);
        setSmartcardNumber('');
      } else {
        setError(data.message || 'Could not process cable subscription.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  const handleElectricitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const num = Number(electricityAmount);
    if (!meterNumber || meterNumber.length < 9) {
      setError('Please enter a valid meter number.');
      return;
    }
    if (!num || num < 500) {
      setError('Minimum electricity recharge is ₦500.');
      return;
    }
    if (walletBalance < num) {
      setError(`Insufficient wallet balance. You need ₦${num.toLocaleString()}.`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/electricity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          disco,
          meterNumber,
          meterType,
          amount: num,
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        confetti();
        onSuccess(data.transaction, data.newBalance);
        setMeterNumber('');
      } else {
        setError(data.message || 'Could not purchase electricity token.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  const handleBettingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const num = Number(bettingAmount);
    if (!customerId || customerId.length < 5) {
      setError('Please enter your betting User ID or Phone Number.');
      return;
    }
    if (!num || num < 100) {
      setError('Minimum betting funding is ₦100.');
      return;
    }
    if (walletBalance < num) {
      setError(`Insufficient wallet balance. You need ₦${num.toLocaleString()}.`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/betting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: bettingPlatform,
          customerId,
          amount: num,
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        confetti();
        onSuccess(data.transaction, data.newBalance);
        setCustomerId('');
      } else {
        setError(data.message || 'Could not fund betting wallet.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-8 backdrop-blur-xl max-w-xl mx-auto shadow-2xl relative overflow-hidden">
      
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-950/70 border border-white/10 rounded-xl mb-6">
        <button
          onClick={() => { setCategory('cable'); setError(null); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            category === 'cable'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>Cable TV</span>
        </button>
        <button
          onClick={() => { setCategory('electricity'); setError(null); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            category === 'electricity'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Electricity</span>
        </button>
        <button
          onClick={() => { setCategory('betting'); setError(null); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            category === 'betting'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Betting</span>
        </button>
      </div>

      {error && (
        <div className="p-3 mb-5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* CABLE FORM */}
      {category === 'cable' && (
        <form onSubmit={handleCableSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Cable Provider
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {CABLE_PROVIDERS.map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => handleCableProviderChange(provider.name)}
                  className={`py-3 px-2 rounded-xl border text-center font-bold text-sm transition-all ${
                    cableProvider === provider.name
                      ? 'border-blue-500 bg-blue-500/20 text-white'
                      : 'border-white/10 bg-slate-950/40 text-slate-400 hover:bg-white/5'
                  }`}
                >
                  {provider.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              IUC / Smartcard Number
            </label>
            <input
              type="text"
              placeholder="e.g. 1029384756"
              value={smartcardNumber}
              onChange={(e) => setSmartcardNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Package Bouquet
            </label>
            <select
              value={selectedCablePackage.name}
              onChange={(e) => {
                const pkg = currentProviderObj.packages.find(p => p.name === e.target.value);
                if (pkg) setSelectedCablePackage(pkg);
              }}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500"
            >
              {currentProviderObj.packages.map((pkg) => (
                <option key={pkg.name} value={pkg.name} className="bg-slate-900 text-white">
                  {pkg.name} — ₦{pkg.price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/50 border border-white/10 flex justify-between items-center text-xs">
            <span className="text-slate-400">Total Deduction:</span>
            <span className="font-mono font-bold text-emerald-400 text-base tabular-nums">
              ₦{selectedCablePackage.price.toLocaleString()}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Renew Subscription (₦{selectedCablePackage.price.toLocaleString()})</span>
          </button>
        </form>
      )}

      {/* ELECTRICITY FORM */}
      {category === 'electricity' && (
        <form onSubmit={handleElectricitySubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Disco Operator
            </label>
            <select
              value={disco}
              onChange={(e) => setDisco(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              {ELECTRICITY_DISCOS.map((d) => (
                <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Meter Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['PREPAID', 'POSTPAID'] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setMeterType(type)}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    meterType === type
                      ? 'border-emerald-500 bg-emerald-500/20 text-white'
                      : 'border-white/10 bg-slate-950/40 text-slate-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Meter Number
            </label>
            <input
              type="text"
              placeholder="e.g. 45091827364"
              value={meterNumber}
              onChange={(e) => setMeterNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Amount (₦)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400 font-mono font-bold">₦</span>
              <input
                type="number"
                min="500"
                value={electricityAmount}
                onChange={(e) => setElectricityAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-4 h-4" />}
            <span>Generate Electricity Token</span>
          </button>
        </form>
      )}

      {/* BETTING FORM */}
      {category === 'betting' && (
        <form onSubmit={handleBettingSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Bookmaker
            </label>
            <div className="grid grid-cols-3 gap-2">
              {BETTING_PLATFORMS.map((b) => (
                <button
                  type="button"
                  key={b.id}
                  onClick={() => setBettingPlatform(b.name)}
                  className={`py-3 px-1 rounded-xl border text-center font-bold text-xs transition-all ${
                    bettingPlatform === b.name
                      ? 'border-indigo-500 bg-indigo-500/20 text-white'
                      : 'border-white/10 bg-slate-950/40 text-slate-400 hover:bg-white/5'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Customer Betting ID / Phone
            </label>
            <input
              type="text"
              placeholder="e.g. 9821034"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Top-Up Amount (₦)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400 font-mono font-bold">₦</span>
              <input
                type="number"
                min="100"
                value={bettingAmount}
                onChange={(e) => setBettingAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-950/70 border border-white/15 text-white font-mono font-bold focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trophy className="w-4 h-4" />}
            <span>Credit {bettingPlatform} Account</span>
          </button>
        </form>
      )}

    </div>
  );
};
