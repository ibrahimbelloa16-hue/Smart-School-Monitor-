import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  RotateCcw, 
  Copy, 
  Check, 
  X, 
  Share2, 
  Zap,
  MessageCircle
} from 'lucide-react';
import { formatNaira, formatDate } from '../lib/utils.ts';
import { useToast } from './Toast.tsx';

/**
 * Sanitizes messages so no simulation/demo artifacts ever leak into customer receipts
 */
export function sanitizeReceiptMessage(msg?: string): string {
  if (!msg) return '';
  return msg
    .replace(/\[\s*DEMO(?:\s*MODE)?\s*\]/gi, '')
    .replace(/\(\s*Demo(?:\s*Mode)?\s*\)/gi, '')
    .replace(/Demo\s*Mode:?\s*/gi, '')
    .replace(/Simulated\s*Provider\s*Success:\s*/gi, '')
    .replace(/Simulated\s*Provider\s*Failure:\s*/gi, '')
    .replace(/Simulated\s*Provider\s*Pending:\s*/gi, '')
    .replace(/Simulated\s*/gi, '')
    .trim();
}

/**
 * Sanitizes provider references so customer receipts only show clean real-time order references
 */
export function sanitizeProviderReference(ref?: string): string {
  if (!ref) return '';
  return ref.replace(/^DEMO-/i, '').trim();
}

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    reference: string;
    productType?: string;
    planName?: string;
    network?: string;
    recipientPhone?: string;
    amountNaira: number;
    status: string;
    providerReference?: string;
    providerError?: string;
    message?: string;
    createdAt?: string;
    refunded?: boolean;
  } | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, data }) => {
  const { showToast } = useToast();
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !data) return null;

  const displayMessage = sanitizeReceiptMessage(data.message);
  const displayProviderRef = sanitizeProviderReference(data.providerReference);
  const exactProviderError = data.providerError || (data.status?.toUpperCase() === 'FAILED' ? displayMessage : undefined);

  const rawAmount = data.amountNaira ?? (data as any).airtimeAmount ?? (data as any).amount;
  const computedAmount = (rawAmount !== undefined && !isNaN(Number(rawAmount))) ? Number(rawAmount) : 0;

  const copyReference = () => {
    navigator.clipboard.writeText(data.reference);
    setCopied(true);
    showToast('Reference copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const copyFullReceipt = () => {
    const text = `STANDARD DATAHUB VTU RECEIPT\nReference: ${data.reference}\nProduct: ${data.planName || data.productType || 'VTU Recharge'}\nNetwork: ${data.network || 'N/A'}\nRecipient: ${data.recipientPhone || 'N/A'}\nAmount: ${formatNaira(computedAmount)}\nStatus: ${data.status.toUpperCase()}${exactProviderError ? `\nProvider Error: ${exactProviderError}` : ''}\nProvider Ref: ${displayProviderRef || 'N/A'}\nDate: ${formatDate(data.createdAt || new Date().toISOString())}`;
    navigator.clipboard.writeText(text);
    showToast('Full receipt details copied!', 'success');
  };

  const normalizedStatus = (data.status || '').toUpperCase();
  const isSuccess = normalizedStatus === 'SUCCESS' || normalizedStatus === 'SUCCESSFUL';
  const isPending = normalizedStatus === 'PENDING' || normalizedStatus === 'PROCESSING';
  const isRefunded = normalizedStatus === 'REFUNDED' || normalizedStatus === 'FAILED_REFUNDED' || Boolean(data.refunded);
  const isFailed = normalizedStatus === 'FAILED' || (!isSuccess && !isPending);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Status Icon */}
        <div className="text-center mb-4">
          <div className="flex justify-center mb-3">
            {isSuccess && (
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            )}
            {isPending && (
              <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>
            )}
            {isRefunded && (
              <div className="w-14 h-14 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                <RotateCcw className="w-8 h-8" />
              </div>
            )}
            {isFailed && !isRefunded && (
              <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8" />
              </div>
            )}
          </div>

          <h3 className="text-lg font-bold">
            {isSuccess && 'Transaction Successful'}
            {isPending && 'Order Processing'}
            {isRefunded && 'Service Temporarily Unavailable'}
            {isFailed && !isRefunded && 'Service Temporarily Unavailable'}
          </h3>

          <div className="text-2xl font-black text-white mt-1">
            {formatNaira(computedAmount)}
          </div>

          <p className="text-xs text-slate-400 mt-1 max-w-[260px] mx-auto leading-relaxed">
            {isRefunded 
              ? 'Funds refunded to wallet.' 
              : isSuccess 
                ? 'Delivered instantly.' 
                : 'Please try again shortly.'}
          </p>
        </div>

        {/* Friendly Refund Status Display */}
        {isRefunded && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3.5 mb-4 text-left">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-1">
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>Full Refund Credited</span>
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              Service temporarily unavailable. <span className="font-bold text-white">{formatNaira(data.amountNaira)}</span> has been automatically refunded to your wallet balance.
            </p>
          </div>
        )}

        {/* Technical Diagnostic Details (collapsible so customers are not alarmed) */}
        {exactProviderError && (
          <details className="mb-4 text-[10px] text-slate-400 bg-slate-800/40 border border-slate-700/60 rounded-xl p-2.5">
            <summary className="cursor-pointer font-semibold text-slate-400 hover:text-slate-300">
              Technical Diagnostic Details
            </summary>
            <div className="mt-1.5 font-mono text-[11px] text-rose-300 break-words select-all">
              {exactProviderError}
            </div>
          </details>
        )}

        {/* Receipt Details Card */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 mb-5 space-y-2.5 text-xs">
          <div className="flex justify-between items-center text-slate-400">
            <span>Transaction Ref</span>
            <div className="flex items-center gap-1.5 font-mono text-slate-200">
              <span>{data.reference.length > 18 ? `${data.reference.slice(0, 16)}...` : data.reference}</span>
              <button
                onClick={copyReference}
                className="p-1 hover:text-blue-400 transition-colors"
                title="Copy reference"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {data.network && (
            <div className="flex justify-between items-center text-slate-400">
              <span>Network</span>
              <span className="font-semibold text-white uppercase">{data.network}</span>
            </div>
          )}

          {data.planName && (
            <div className="flex justify-between items-center text-slate-400">
              <span>Product</span>
              <span className="font-semibold text-white">{data.planName}</span>
            </div>
          )}

          {data.recipientPhone && (
            <div className="flex justify-between items-center text-slate-400">
              <span>Recipient Phone</span>
              <span className="font-mono font-semibold text-white">{data.recipientPhone}</span>
            </div>
          )}

          {displayProviderRef && (
            <div className="flex justify-between items-center text-slate-400">
              <span>Provider Ref</span>
              <span className="font-mono text-slate-300">{displayProviderRef}</span>
            </div>
          )}

          <div className="flex justify-between items-center text-slate-400">
            <span>Date & Time</span>
            <span className="text-slate-300">{formatDate(data.createdAt || new Date().toISOString())}</span>
          </div>

          <div className="pt-2 border-t border-slate-700/80 flex justify-between items-center">
            <span className="text-slate-300 font-medium">Status</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                isSuccess
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : isPending
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : isRefunded
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {data.status}
            </span>
          </div>
        </div>

        {/* WhatsApp Support Button */}
        <div className="mb-4">
          <a
            href={`https://wa.me/2348161720895?text=${encodeURIComponent(`Hello Standard DataHub Support, I need assistance with transaction ref: ${data.reference} (${data.planName || data.productType || 'Recharge'} - ₦${data.amountNaira})`)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Need Help? Chat on WhatsApp</span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={copyFullReceipt}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Copy Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-md shadow-blue-600/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

