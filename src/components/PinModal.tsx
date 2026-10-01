import React, { useState } from 'react';
import { ShieldCheck, Lock, X, Delete } from 'lucide-react';
import { formatNaira } from '../lib/utils.ts';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (pin: string) => void;
  title: string;
  summary: {
    product: string;
    recipient: string;
    amountNaira: number;
    network?: string;
  };
  hasPin: boolean;
  onOpenSetPin: () => void;
  isLoading?: boolean;
}

export const PinModal: React.FC<PinModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  summary,
  hasPin,
  onOpenSetPin,
  isLoading = false
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      const next = pin + digit;
      setPin(next);
      setError('');
      if (next.length === 4) {
        // Auto trigger or allow user to click confirm
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPin('');
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin.length !== 4) {
      setError('Please enter your 4-digit PIN.');
      return;
    }
    onConfirm(pin);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-white">
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-xs text-slate-400 mt-1">Authorize transaction with your 4-digit PIN</p>
        </div>

        {/* Transaction Summary Card */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 mb-5 space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-300">
            <span>Product</span>
            <span className="font-semibold text-white">{summary.product}</span>
          </div>
          {summary.network && (
            <div className="flex justify-between items-center text-slate-300">
              <span>Network</span>
              <span className="font-semibold text-white">{summary.network}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-slate-300">
            <span>Recipient</span>
            <span className="font-mono font-semibold text-white">{summary.recipient}</span>
          </div>
          <div className="pt-2 border-t border-slate-700 flex justify-between items-center">
            <span className="font-semibold text-slate-200">Total Charge</span>
            <span className="text-base font-bold text-emerald-400">
              {formatNaira(summary.amountNaira)}
            </span>
          </div>
        </div>

        {!hasPin ? (
          <div className="text-center py-4 space-y-3">
            <p className="text-sm text-amber-300">
              You haven't set a transaction PIN yet. A 4-digit PIN is required to secure your purchases.
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenSetPin();
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all"
            >
              Set Up Transaction PIN Now
            </button>
          </div>
        ) : (
          <div>
            {/* Masked PIN Bullets */}
            <div className="flex justify-center gap-4 mb-6">
              {[0, 1, 2, 3].map((index) => {
                const filled = pin.length > index;
                return (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-200 ${
                      filled
                        ? 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50'
                        : 'bg-slate-700 border border-slate-600'
                    }`}
                  />
                );
              })}
            </div>

            {error && (
              <p className="text-xs text-rose-400 text-center mb-3 font-medium">{error}</p>
            )}

            {/* On-screen Keypad */}
            <div className="grid grid-cols-3 gap-2.5 mb-5 max-w-[260px] mx-auto">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleDigit(digit)}
                  className="h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-lg border border-slate-700 active:scale-95 transition-all flex items-center justify-center select-none"
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                disabled={isLoading}
                onClick={handleClear}
                className="h-12 rounded-2xl bg-slate-800/50 hover:bg-slate-700/60 text-slate-400 text-xs font-semibold border border-slate-700 active:scale-95 transition-all flex items-center justify-center select-none"
              >
                Clear
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleDigit('0')}
                className="h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-lg border border-slate-700 active:scale-95 transition-all flex items-center justify-center select-none"
              >
                0
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={handleDelete}
                className="h-12 rounded-2xl bg-slate-800/50 hover:bg-slate-700/60 text-slate-300 border border-slate-700 active:scale-95 transition-all flex items-center justify-center select-none"
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>

            {/* Confirm button */}
            <button
              type="button"
              disabled={isLoading || pin.length !== 4}
              onClick={() => handleSubmit()}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Confirm Payment</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
