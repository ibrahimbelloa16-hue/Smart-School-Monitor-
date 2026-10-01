import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../lib/api.ts';
import { NetworkType, AirtimeProduct } from '../types/index.ts';
import { formatNaira, NETWORK_INFO } from '../lib/utils.ts';
import { detectCarrier, NetworkCarrier } from '../lib/carrierDetector.ts';
import { useToast } from '../components/Toast.tsx';
import { PinModal } from '../components/PinModal.tsx';
import { ReceiptModal } from '../components/ReceiptModal.tsx';
import { SetPinModal } from '../components/SetPinModal.tsx';
import { 
  PhoneCall, 
  Check, 
  Smartphone, 
  AlertCircle, 
  ArrowRight, 
  Tag 
} from 'lucide-react';

interface BuyAirtimePageProps {
  setCurrentTab: (tab: string) => void;
}

export const BuyAirtimePage: React.FC<BuyAirtimePageProps> = ({ setCurrentTab }) => {
  const { user, updateBalance, refreshUser } = useAuth();
  const { showToast } = useToast();

  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>('MTN');
  const [detectedCarrier, setDetectedCarrier] = useState<NetworkCarrier | null>(null);
  const [products, setProducts] = useState<AirtimeProduct[]>([]);
  const [amountInput, setAmountInput] = useState<string>('500');
  const [recipientPhone, setRecipientPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  // Modals
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isSetPinOpen, setIsSetPinOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const presetAmounts = [100, 200, 500, 1000, 2000, 5000];

  useEffect(() => {
    apiRequest<{ products: AirtimeProduct[] }>('/vtu/airtime-products')
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.warn('Airtime products load error:', err));
  }, []);

  const currentProduct = products.find((p) => p.network === selectedNetwork);
  const discountPercent = currentProduct ? currentProduct.discountPercent : 2.0;

  const numericAmount = parseFloat(amountInput) || 0;
  const payableAmount = numericAmount > 0 ? numericAmount * (1 - discountPercent / 100) : 0;
  const savings = numericAmount - payableAmount;

  const validatePhone = (num: string) => {
    const cleaned = num.replace(/[\s\-\+]/g, '');
    if (!cleaned) {
      setPhoneError('Phone number is required.');
      return false;
    }
    if (!/^0[789][01]\d{8}$/.test(cleaned)) {
      setPhoneError('Please enter a valid 11-digit Nigerian phone number.');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handlePhoneChange = (val: string) => {
    setRecipientPhone(val);
    const carrier = detectCarrier(val);
    setDetectedCarrier(carrier);

    if (carrier && carrier !== selectedNetwork) {
      setSelectedNetwork(carrier);
    }

    if (val.length >= 11) {
      validatePhone(val);
    } else {
      setPhoneError('');
    }
  };

  const handleInitiateRecharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('Please log in or register to buy airtime.', 'info');
      setCurrentTab('login');
      return;
    }

    if (numericAmount < 50 || numericAmount > 50000) {
      showToast('Airtime recharge amount must be between ₦50 and ₦50,000.', 'error');
      return;
    }

    if (!validatePhone(recipientPhone)) {
      return;
    }

    if (user.balanceNaira < payableAmount) {
      showToast(`Insufficient balance. You need ${formatNaira(payableAmount)} but your balance is ${formatNaira(user.balanceNaira)}.`, 'error');
      return;
    }

    if (!user.hasPin) {
      setIsSetPinOpen(true);
      return;
    }

    setIsPinModalOpen(true);
  };

  const handleConfirmPurchase = async (pin: string) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest('/vtu/buy-airtime', {
        method: 'POST',
        body: JSON.stringify({
          network: selectedNetwork,
          amountNaira: numericAmount,
          recipientPhone,
          transactionPin: pin
        })
      });

      setIsPinModalOpen(false);

      if (response.newBalanceNaira !== undefined) {
        updateBalance(response.newBalanceNaira);
      } else {
        refreshUser();
      }

      setReceiptData({
        ...response,
        amountNaira: response.amountNaira ?? response.airtimeAmount ?? numericAmount,
        network: response.network || selectedNetwork,
        recipientPhone: response.recipientPhone || recipientPhone,
        planName: response.planName || `${selectedNetwork} ₦${numericAmount.toLocaleString()} Airtime`,
        productType: 'Airtime'
      });
      setIsReceiptModalOpen(true);

      const statusUpper = (response.status || '').toUpperCase();
      if (statusUpper === 'SUCCESS' || statusUpper === 'SUCCESSFUL') {
        showToast(response.message || 'Airtime recharge successful!', 'success');
      } else if (statusUpper === 'FAILED' || response.refunded) {
        const friendlyNotice = response.refunded
          ? 'Service temporarily unavailable. Funds refunded to wallet.'
          : (response.userMessage || response.message || 'Service temporarily unavailable. Please try again shortly.');
        showToast(friendlyNotice, 'error');
      } else {
        showToast(response.message || 'Airtime order is processing with the network.', 'info');
      }
    } catch (err: any) {
      const isTechnical = err.message && (
        err.message.includes('ClubKonnect') ||
        err.message.includes('CLUBKONNECT_') ||
        err.message.includes('aborted') ||
        err.message.includes('credentials')
      );
      const friendlyNotice = isTechnical
        ? 'Service temporarily unavailable. Please try again shortly.'
        : (err.message || 'Airtime purchase failed.');
      showToast(friendlyNotice, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <PhoneCall className="w-6 h-6 text-emerald-500" />
            <span>Buy Airtime</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Recharge with instant discount on all Nigerian networks
          </p>
        </div>

        {user && (
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Your Balance</span>
            <span className="text-sm font-bold text-emerald-500">{formatNaira(user.balanceNaira)}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleInitiateRecharge} className="space-y-6">
        {/* Network Selection */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            1. Select Network
          </label>

          <div className="grid grid-cols-4 gap-2.5">
            {(['MTN', 'AIRTEL', 'GLO', '9MOBILE'] as NetworkType[]).map((net) => {
              const info = NETWORK_INFO[net];
              const isSelected = selectedNetwork === net;
              const isDetected = detectedCarrier === net;
              return (
                <button
                  key={net}
                  type="button"
                  onClick={() => setSelectedNetwork(net)}
                  className={`relative p-3 rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 scale-102 shadow-md'
                      : isDetected
                        ? 'border-emerald-500/80 bg-emerald-50/30 dark:bg-emerald-950/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  {isDetected && (
                    <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[9px] shadow-sm tracking-tight flex items-center gap-0.5 animate-pulse">
                      <span>Detected</span>
                    </span>
                  )}
                  <div
                    className={`w-9 h-9 rounded-xl ${info.bg} ${info.text} font-black text-xs flex items-center justify-center mb-1.5 shadow-sm`}
                  >
                    {net === '9MOBILE' ? '9M' : net}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{info.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Amount Input & Presets */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              2. Enter Recharge Amount
            </label>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <Tag className="w-3 h-3" /> {discountPercent}% Discount
            </span>
          </div>

          <div className="relative">
            <span className="absolute left-4 top-3.5 text-lg font-bold text-slate-400">₦</span>
            <input
              type="number"
              min="50"
              max="50000"
              step="50"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="500"
              className="w-full text-xl font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          {/* Preset Chips */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmountInput(String(amt))}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  amountInput === String(amt)
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                ₦{amt}
              </button>
            ))}
          </div>

          {numericAmount > 0 && (
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300">
                Discount Price (You Pay):
              </span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                {formatNaira(payableAmount)}{' '}
                <span className="text-[11px] text-slate-400 font-normal">
                  (Save {formatNaira(savings)})
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Recipient Phone */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              3. Beneficiary Phone Number
            </label>
            {user && (
              <button
                type="button"
                onClick={() => {
                  setRecipientPhone(user.phone);
                  validatePhone(user.phone);
                }}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Use My Number ({user.phone})</span>
              </button>
            )}
          </div>

          <div className="relative">
            <input
              type="tel"
              value={recipientPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="08012345678"
              maxLength={11}
              className={`w-full text-base font-mono font-bold bg-slate-50 dark:bg-slate-800 border ${
                detectedCarrier ? 'border-emerald-500/60 dark:border-emerald-500/50' : 'border-slate-200 dark:border-slate-700'
              } rounded-2xl pl-4 pr-32 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors`}
              required
            />
            {detectedCarrier && (
              <div className="absolute right-3 top-2.5 flex items-center gap-1.5 pointer-events-none">
                <span className={`px-2 py-0.5 rounded-lg text-[11px] font-black tracking-wide flex items-center gap-1 border ${NETWORK_INFO[detectedCarrier].badge}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  <span>{NETWORK_INFO[detectedCarrier].name}</span>
                </span>
                {recipientPhone.length === 11 && !phoneError && (
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                )}
              </div>
            )}
            {!detectedCarrier && recipientPhone.length === 11 && !phoneError && (
              <div className="absolute right-3 top-3.5 text-emerald-500">
                <Check className="w-5 h-5" />
              </div>
            )}
          </div>

          {phoneError && (
            <p className="text-xs text-rose-500 font-medium mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{phoneError}</span>
            </p>
          )}
        </div>

        {/* Final Payment Card */}
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 border border-emerald-800/40 rounded-3xl p-5 text-white shadow-xl space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>Airtime Value</span>
            <span className="font-bold text-white">₦{numericAmount} {selectedNetwork}</span>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>Recipient Line</span>
            <span className="font-mono font-bold text-white">{recipientPhone || 'Not entered'}</span>
          </div>

          <div className="pt-3 border-t border-emerald-800/60 flex justify-between items-center">
            <div>
              <span className="text-xs text-slate-300 block">Total Payable</span>
              <span className="text-2xl font-black text-emerald-400">
                {formatNaira(payableAmount)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || numericAmount < 50 || !recipientPhone}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>Pay & Recharge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* PIN Modal */}
      <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onConfirm={handleConfirmPurchase}
        title="Authorize Airtime Purchase"
        summary={{
          product: `₦${numericAmount} ${selectedNetwork} Airtime`,
          recipient: recipientPhone,
          amountNaira: payableAmount,
          network: selectedNetwork
        }}
        hasPin={Boolean(user?.hasPin)}
        onOpenSetPin={() => setIsSetPinOpen(true)}
        isLoading={isSubmitting}
      />

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        data={receiptData}
      />

      {/* Set/Change PIN Modal */}
      <SetPinModal
        isOpen={isSetPinOpen}
        onClose={() => setIsSetPinOpen(false)}
        hasExistingPin={Boolean(user?.hasPin)}
        onSuccess={() => {
          refreshUser();
          setIsPinModalOpen(true);
        }}
      />
    </div>
  );
};
