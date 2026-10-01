import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../lib/api.ts';
import { BankDetails, FundingRequest } from '../types/index.ts';
import { formatNaira, formatDate } from '../lib/utils.ts';
import { useWalletVisibility } from '../hooks/useWalletVisibility.ts';
import { useToast } from '../components/Toast.tsx';
import { 
  Wallet, 
  Building2, 
  Copy, 
  Check, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Camera, 
  Upload, 
  X, 
  ArrowRight,
  ShieldCheck, 
  Info,
  CreditCard,
  FileCheck,
  ChevronRight,
  MessageCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface FundWalletPageProps {
  setCurrentTab: (tab: string) => void;
}

export const FundWalletPage: React.FC<FundWalletPageProps> = ({ setCurrentTab }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { isHidden, toggleVisibility, formatBalance } = useWalletVisibility();

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bank_name: 'Opay',
    account_number: '6423809175',
    account_name: 'Ibrahim Bello',
    manual_funding_instructions: 'Make a direct bank transfer to our Opay account above (6423809175 - Ibrahim Bello). After transferring, submit your transfer reference below. Our admin team will verify and credit your wallet promptly.'
  });

  const [requests, setRequests] = useState<FundingRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  // Form states
  const [amountNaira, setAmountNaira] = useState('');
  const [transferReference, setTransferReference] = useState('');
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [receiptFileName, setReceiptFileName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Success Modal State
  const [submittedRequest, setSubmittedRequest] = useState<FundingRequest | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadData = async () => {
    try {
      const bankRes = await apiRequest<{ bankDetails: BankDetails }>('/wallet/bank-details');
      if (bankRes.bankDetails) setBankDetails(bankRes.bankDetails);
    } catch (err) {
      console.warn('Bank details error:', err);
    }

    if (user) {
      setLoadingRequests(true);
      try {
        const reqRes = await apiRequest<{ requests: FundingRequest[] }>('/wallet/fund-requests');
        setRequests(reqRes.requests || []);
      } catch (err) {
        console.warn('Funding requests load error:', err);
      } finally {
        setLoadingRequests(false);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(bankDetails.account_number);
    setCopiedAccount(true);
    showToast('Account number copied to clipboard!', 'info');
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const copyRefToClipboard = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    showToast('Funding reference copied!', 'info');
    setTimeout(() => setCopiedRef(false), 2000);
  };

  // Image file handler with instant browser resize for lightning-fast mobile uploads
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setFormError('Please select a JPG, JPEG, or PNG image.');
      return;
    }

    setReceiptFileName(file.name);
    setFormError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      if (!rawDataUrl) return;

      // Downscale image using canvas to ensure payload remains fast and responsive
      const img = new Image();
      img.onload = () => {
        const maxDimension = 1200;
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setReceiptImage(compressed);
        } else {
          setReceiptImage(rawDataUrl);
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const removeReceipt = () => {
    setReceiptImage(null);
    setReceiptFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const numericAmount = parseFloat(amountNaira);
  const isAmountValid = !isNaN(numericAmount) && numericAmount > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!user) {
      showToast('Please log in to submit a wallet funding request.', 'info');
      setCurrentTab('login');
      return;
    }

    if (!isAmountValid) {
      setFormError('Please enter a valid amount greater than ₦0.00');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiRequest<{ message: string; request: FundingRequest }>('/wallet/fund-request', {
        method: 'POST',
        body: JSON.stringify({
          amountNaira: numericAmount,
          transferReference: transferReference.trim() || undefined,
          proofImageUrl: receiptImage || undefined
        })
      });

      // Show success modal with the generated internal reference
      setSubmittedRequest(res.request);

      // Reset form
      setAmountNaira('');
      setTransferReference('');
      removeReceipt();

      showToast('Funding request submitted successfully!', 'success');
      loadData();
    } catch (err: any) {
      setFormError(err.message || 'Failed to submit funding request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const presetAmounts = [1000, 2000, 5000, 10000, 20000];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Wallet className="w-6 h-6 text-emerald-500" />
          <span>Fund Wallet</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Add money to your Standard DataHub wallet by making a bank transfer to the account below.
        </p>
      </div>

      {/* Current Wallet Balance Summary */}
      {user && (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-5 text-white border border-blue-800/40 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200/80">
              Current Available Balance
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="text-2xl font-black text-white font-mono">
                {formatBalance(user.balanceNaira)}
              </div>
              <button
                type="button"
                onClick={toggleVisibility}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                title={isHidden ? 'Click to show balance' : 'Click to hide balance'}
                aria-label="Toggle balance visibility"
              >
                {isHidden ? (
                  <EyeOff className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Eye className="w-4 h-4 text-white/80 hover:text-white" />
                )}
              </button>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active Wallet
            </span>
          </div>
        </div>
      )}

      {/* BANK ACCOUNT DETAILS CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Standard DataHub Receiving Bank Account
            </h2>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Instant Transfer
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">Bank Name</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {bankDetails.bank_name}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">Account Name</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white text-right">
              {bankDetails.account_name}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Account Number
              </span>
              <span className="text-xl font-mono font-black text-blue-600 dark:text-blue-400 tracking-wider">
                {bankDetails.account_number}
              </span>
            </div>

            <button
              type="button"
              onClick={copyAccountNumber}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                copiedAccount
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 active:scale-95'
              }`}
            >
              {copiedAccount ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Account</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* TRANSFER INSTRUCTION */}
      <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-3xl p-5 space-y-2">
        <h3 className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-blue-500" />
          <span>How to Fund Your Wallet</span>
        </h3>
        <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-decimal list-inside pl-1 leading-relaxed">
          <li>Enter the amount you want to fund.</li>
          <li>Transfer exactly that amount to the Standard DataHub Opay bank account above.</li>
          <li>After completing the transfer, return here and tap <span className="font-semibold text-blue-600 dark:text-blue-400">"I Have Made the Transfer"</span>.</li>
          <li>Standard DataHub will verify the transfer before crediting your wallet.</li>
        </ol>
      </div>

      {/* WHATSAPP SUPPORT SHORTCUT */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Need Help with Bank Transfer?</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Chat Ibrahim Bello directly on WhatsApp: <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">08161720895</span>
            </div>
          </div>
        </div>
        <a
          href="https://wa.me/2348161720895?text=Hello%20Standard%20DataHub%20Support,%20I%20need%20assistance%20funding%20my%20wallet"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* FUNDING SUBMISSION FORM */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
        {formError && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Amount to Fund */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
            Amount to Fund
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-base font-bold text-slate-400">
              ₦
            </span>
            <input
              type="number"
              min="1"
              step="any"
              value={amountNaira}
              onChange={(e) => {
                setAmountNaira(e.target.value);
                setFormError('');
              }}
              placeholder="Enter amount (e.g. 1000)"
              className="w-full text-base font-mono font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-9 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            {presetAmounts.map((amt) => (
              <button
                type="button"
                key={amt}
                onClick={() => {
                  setAmountNaira(String(amt));
                  setFormError('');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  amountNaira === String(amt)
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                ₦{amt.toLocaleString()}
              </button>
            ))}
          </div>

          {isAmountValid && (
            <div className="mt-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              You will transfer: {formatNaira(numericAmount)}
            </div>
          )}
        </div>

        {/* Optional Transfer Reference */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              Transfer Reference (Optional)
            </label>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Optional</span>
          </div>
          <input
            type="text"
            value={transferReference}
            onChange={(e) => setTransferReference(e.target.value)}
            placeholder="Enter transfer/session reference if available"
            className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Optional — you can find this on your bank transfer receipt or transaction history.
          </p>
        </div>

        {/* Optional Receipt Upload */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              Transfer Receipt (Optional)
            </label>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Optional</span>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
          />

          {!receiptImage ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl p-4 text-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex flex-col items-center justify-center gap-1.5 group bg-slate-50/50 dark:bg-slate-800/30"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                📷 Upload Receipt
              </span>
              <span className="text-[10px] text-slate-400">
                Select screenshot or photo from your device (JPG, JPEG, PNG)
              </span>
            </button>
          ) : (
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800 flex items-center gap-3">
              <img
                src={receiptImage}
                alt="Receipt Preview"
                className="w-16 h-16 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {receiptFileName || 'receipt_image.jpg'}
                </div>
                <div className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Receipt image attached</span>
                </div>
              </div>
              <button
                type="button"
                onClick={removeReceipt}
                className="p-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-colors"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !isAmountValid}
          className={`w-full py-4 rounded-2xl font-black text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg ${
            isAmountValid && !isSubmitting
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-blue-600/25 active:scale-[0.99]'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Submitting Transfer Request...</span>
            </div>
          ) : (
            <>
              <span>I Have Made the Transfer</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* SUCCESS CONFIRMATION MODAL */}
      {submittedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-white space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
                <Clock className="w-7 h-7 animate-pulse" />
              </div>
              <h3 className="text-xl font-black text-white">
                Funding Request Submitted
              </h3>
              <p className="text-xs text-slate-300">
                Your funding request has been submitted successfully.
              </p>
              <p className="text-xs text-amber-400 font-semibold">
                Your wallet will be credited after the transfer is verified.
              </p>
            </div>

            {/* Status & Reference Details Card */}
            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Status</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase">
                  Status: Pending
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Amount to Credit</span>
                <span className="text-base font-black text-emerald-400">
                  {formatNaira(submittedRequest.amountNaira)}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-700 flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Funding Reference
                </span>
                <div className="flex items-center justify-between gap-2 bg-slate-900/90 rounded-xl px-3 py-2 border border-slate-700">
                  <span className="font-mono font-bold text-blue-400 text-xs">
                    {submittedRequest.internalReference || submittedRequest.reference}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyRefToClipboard(submittedRequest.internalReference || submittedRequest.reference)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
                  >
                    {copiedRef ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedRef ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmittedRequest(null);
                loadData();
              }}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              Done & View Requests
            </button>
          </div>
        </div>
      )}

      {/* CUSTOMER WALLET / FUNDING HISTORY */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Funding History
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track your bank transfer funding submissions and verification status
            </p>
          </div>
          <button
            onClick={loadData}
            className="text-xs text-blue-500 hover:underline font-semibold"
          >
            Refresh
          </button>
        </div>

        {loadingRequests ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            Loading your funding submissions...
          </div>
        ) : requests.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No funding requests submitted yet. Make a bank transfer to fund your wallet.
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => {
              const displayRef = req.internalReference || req.reference;
              const isApproved = req.status === 'approved';
              const isRejected = req.status === 'rejected';
              const isPending = req.status === 'pending';

              return (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          Wallet Funding
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                            isApproved
                              ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                              : isRejected
                              ? 'bg-rose-500/20 text-rose-500 border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                          }`}
                        >
                          {isApproved ? 'Successful' : isRejected ? 'Failed/Rejected' : 'Pending'}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                        Reference: <span className="text-blue-500 font-bold">{displayRef}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-base font-black ${
                          isApproved
                            ? 'text-emerald-500'
                            : isRejected
                            ? 'text-rose-500 line-through'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {isApproved ? `+${formatNaira(req.amountNaira)}` : formatNaira(req.amountNaira)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {formatDate(req.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Additional details */}
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      {req.transferReference ? (
                        <span>Bank Ref: <span className="font-mono text-slate-700 dark:text-slate-300">{req.transferReference}</span></span>
                      ) : (
                        <span>Bank Ref: <span className="text-slate-400 italic">None provided</span></span>
                      )}
                    </div>

                    {req.proofImageUrl && (
                      <a
                        href={req.proofImageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline font-semibold flex items-center gap-1"
                      >
                        <span>View Attached Receipt</span>
                      </a>
                    )}

                    {req.rejectionReason && (
                      <span className="text-rose-500 font-medium">
                        Reason: {req.rejectionReason}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
