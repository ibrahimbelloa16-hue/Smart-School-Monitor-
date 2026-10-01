import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../lib/api.ts';
import { DataPlan, NetworkType } from '../types/index.ts';
import { formatNaira, NETWORK_INFO } from '../lib/utils.ts';
import { detectCarrier, NetworkCarrier } from '../lib/carrierDetector.ts';
import { useToast } from '../components/Toast.tsx';
import { PinModal } from '../components/PinModal.tsx';
import { ReceiptModal } from '../components/ReceiptModal.tsx';
import { SetPinModal } from '../components/SetPinModal.tsx';
import { 
  Wifi, 
  Check, 
  Smartphone, 
  AlertCircle, 
  Wallet, 
  ArrowRight, 
  Sparkles,
  Zap
} from 'lucide-react';

interface BuyDataPageProps {
  setCurrentTab: (tab: string) => void;
}

export const BuyDataPage: React.FC<BuyDataPageProps> = ({ setCurrentTab }) => {
  const { user, updateBalance, refreshUser } = useAuth();
  const { showToast } = useToast();

  const [plans, setPlans] = useState<DataPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>('MTN');
  const [detectedCarrier, setDetectedCarrier] = useState<NetworkCarrier | null>(null);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [recipientPhone, setRecipientPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  // Modals state
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isSetPinOpen, setIsSetPinOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  // Fetch plans from backend
  const fetchPlans = async () => {
    setLoadingPlans(true);
    try {
      const data = await apiRequest<{ plans: DataPlan[] }>('/vtu/plans');
      setPlans(data.plans || []);
      // Auto-select first plan for selected network
      const mtnFirst = data.plans.find((p) => p.network === 'MTN');
      if (mtnFirst) setSelectedPlanId(mtnFirst.id);
    } catch (err: any) {
      showToast('Failed to load data plans: ' + err.message, 'error');
    } finally {
      setLoadingPlans(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Validate Nigerian phone number
  const validatePhone = (num: string) => {
    const cleaned = num.replace(/[\s\-\+]/g, '');
    if (!cleaned) {
      setPhoneError('Phone number is required.');
      return false;
    }
    // Must be 11 digits starting with 07, 08, 09
    if (!/^0[789][01]\d{8}$/.test(cleaned)) {
      setPhoneError('Please enter a valid 11-digit Nigerian phone number (e.g., 08012345678).');
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
      setSelectedType('ALL');
      const first = plans.find((p) => p.network === carrier);
      if (first) setSelectedPlanId(first.id);
    }

    if (val.length >= 11) {
      validatePhone(val);
    } else {
      setPhoneError('');
    }
  };

  // Filter plans based on selected network & category
  const filteredPlans = plans.filter((p) => {
    if (p.network !== selectedNetwork) return false;
    if (selectedType !== 'ALL' && p.planType !== selectedType) return false;
    return true;
  });

  // Extract unique plan types for current network
  const availableTypes = ['ALL', ...Array.from(new Set(plans.filter((p) => p.network === selectedNetwork).map((p) => p.planType)))];

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);

  const handleInitiatePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('Please log in or register to purchase data.', 'info');
      setCurrentTab('login');
      return;
    }

    if (!selectedPlan) {
      showToast('Please select a data plan bundle.', 'error');
      return;
    }

    if (!validatePhone(recipientPhone)) {
      return;
    }

    // Check balance
    if (user.balanceNaira < selectedPlan.sellingPriceNaira) {
      showToast(`Insufficient balance. You need ${formatNaira(selectedPlan.sellingPriceNaira)} but your balance is ${formatNaira(user.balanceNaira)}.`, 'error');
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
      const response = await apiRequest('/vtu/buy-data', {
        method: 'POST',
        body: JSON.stringify({
          planId: selectedPlanId,
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

      setReceiptData(response);
      setIsReceiptModalOpen(true);

      const statusUpper = (response.status || '').toUpperCase();
      if (statusUpper === 'SUCCESS' || statusUpper === 'SUCCESSFUL') {
        showToast(response.message || 'Data purchase completed successfully!', 'success');
      } else if (statusUpper === 'FAILED' || response.refunded) {
        const friendlyNotice = response.refunded
          ? 'Service temporarily unavailable. Funds refunded to wallet.'
          : (response.userMessage || response.message || 'Service temporarily unavailable. Please try again shortly.');
        showToast(friendlyNotice, 'error');
      } else {
        showToast(response.message || 'Order processing.', 'info');
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
        : (err.message || 'Transaction could not be completed.');
      showToast(friendlyNotice, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Wifi className="w-6 h-6 text-blue-500" />
            <span>Buy Mobile Data</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Instant delivery across all Nigerian telecom networks
          </p>
        </div>

        {user && (
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Your Balance</span>
            <span className="text-sm font-bold text-emerald-500">{formatNaira(user.balanceNaira)}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleInitiatePurchase} className="space-y-6">
        {/* Step 1: Select Network */}
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
                  onClick={() => {
                    setSelectedNetwork(net);
                    setSelectedType('ALL');
                    // select first plan of network
                    const first = plans.find((p) => p.network === net);
                    if (first) setSelectedPlanId(first.id);
                  }}
                  className={`relative p-3 rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 scale-102 shadow-md'
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

        {/* Step 2: Select Plan Type Filter */}
        {availableTypes.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {availableTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedType === type
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {type === 'ALL' ? 'All Plans' : type}
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Choose Plan */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              2. Choose Data Bundle ({selectedNetwork})
            </label>
            <span className="text-[11px] text-slate-400">
              {filteredPlans.length} plans available
            </span>
          </div>

          {loadingPlans ? (
            <div className="py-12 text-center text-slate-400">
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs">Loading available data plans...</p>
            </div>
          ) : filteredPlans.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No plans found for the selected category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredPlans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`cursor-pointer p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/10 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {plan.dataAmount}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                          {plan.planType}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {plan.duration}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-blue-600 dark:text-blue-400">
                        {formatNaira(plan.sellingPriceNaira)}
                      </div>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          <Check className="w-3 h-3" /> Selected
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Step 4: Recipient Phone */}
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
                  handlePhoneChange(user.phone);
                }}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
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
              } rounded-2xl pl-4 pr-32 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors`}
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

          <p className="text-[11px] text-slate-400 mt-2">
            Tip: Double check the recipient phone number. Data transfers to valid active lines cannot be recalled by telecom networks.
          </p>
        </div>

        {/* Summary Card and Submit */}
        {selectedPlan && (
          <div className="bg-gradient-to-br from-blue-900/90 to-slate-900 border border-blue-800/40 rounded-3xl p-5 text-white shadow-xl space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-300">
              <span>Selected Bundle</span>
              <span className="font-bold text-white">
                {selectedPlan.network} • {selectedPlan.dataAmount} ({selectedPlan.duration})
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-300">
              <span>Recipient Line</span>
              <span className="font-mono font-bold text-white">
                {recipientPhone || 'Not entered yet'}
              </span>
            </div>

            <div className="pt-3 border-t border-blue-800/60 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-300 block">Total Payable</span>
                <span className="text-2xl font-black text-emerald-400">
                  {formatNaira(selectedPlan.sellingPriceNaira)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !selectedPlanId || !recipientPhone}
                className="px-6 py-3.5 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-400 hover:to-emerald-400 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>Continue to Pay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </form>

      {/* PIN Verification Modal */}
      {selectedPlan && (
        <PinModal
          isOpen={isPinModalOpen}
          onClose={() => setIsPinModalOpen(false)}
          onConfirm={handleConfirmPurchase}
          title="Authorize Data Purchase"
          summary={{
            product: `${selectedPlan.planName} (${selectedPlan.duration})`,
            recipient: recipientPhone,
            amountNaira: selectedPlan.sellingPriceNaira,
            network: selectedPlan.network
          }}
          hasPin={Boolean(user?.hasPin)}
          onOpenSetPin={() => setIsSetPinOpen(true)}
          isLoading={isSubmitting}
        />
      )}

      {/* Transaction Receipt Modal */}
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
