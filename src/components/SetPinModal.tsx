import React, { useState } from 'react';
import { Lock, X, ShieldCheck } from 'lucide-react';
import { apiRequest } from '../lib/api.ts';
import { useToast } from './Toast.tsx';

interface SetPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasExistingPin: boolean;
  onSuccess: () => void;
}

export const SetPinModal: React.FC<SetPinModalProps> = ({
  isOpen,
  onClose,
  hasExistingPin,
  onSuccess
}) => {
  const { showToast } = useToast();
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (hasExistingPin && (!currentPin || currentPin.length !== 4)) {
      setError('Please enter your 4-digit current PIN.');
      return;
    }

    if (!newPin || newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      setError('New PIN must be exactly 4 digits (0-9).');
      return;
    }

    if (newPin !== confirmPin) {
      setError('New PIN and Confirm PIN do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest('/auth/set-pin', {
        method: 'POST',
        body: JSON.stringify({
          currentPin: hasExistingPin ? currentPin : undefined,
          newPin,
          confirmPin
        })
      });

      showToast('Transaction PIN saved successfully!', 'success');
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save PIN.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold">
            {hasExistingPin ? 'Change Transaction PIN' : 'Create Transaction PIN'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            This 4-digit PIN is required to authorize purchases
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {hasExistingPin && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Current 4-Digit PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                className="w-full text-center tracking-[1em] text-lg font-bold bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              New 4-Digit PIN
            </label>
            <input
              type="password"
              maxLength={4}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="w-full text-center tracking-[1em] text-lg font-bold bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Confirm New PIN
            </label>
            <input
              type="password"
              maxLength={4}
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="w-full text-center tracking-[1em] text-lg font-bold bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 mt-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>Save Transaction PIN</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
