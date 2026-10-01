import React, { useRef } from 'react';
import { DATAHUB_SVG_LOGO } from '../constants';
import { Transaction } from '../types';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Printer, 
  Share2, 
  Copy, 
  ShieldCheck,
  Zap,
  ArrowDown
} from 'lucide-react';

interface TransactionReceiptModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const TransactionReceiptModal: React.FC<TransactionReceiptModalProps> = ({
  transaction,
  onClose,
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!transaction) return null;

  const isSuccess = transaction.status === 'SUCCESS';
  const isFailed = transaction.status === 'FAILED';

  const handlePrint = () => {
    window.print();
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(transaction.reference);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        ref={receiptRef}
        className="bg-[#0B0F19] border border-white/10 rounded-3xl w-full max-w-md p-6 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col"
      >
        {/* Receipt top decorative zigzag or border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-emerald-500 to-indigo-600" />

        {/* Action controls */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 print:hidden">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            E-Receipt · {transaction.id}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrint}
              title="Print Receipt"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 border border-white/10"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Brand Lockup with Custom SVG Logo */}
        <div className="text-center pt-4 pb-3">
          <img 
            src={DATAHUB_SVG_LOGO} 
            alt="DataHub Brand Logo" 
            className="w-12 h-12 max-h-[38px] mx-auto object-contain mb-2"
          />
          <h2 className="text-xl font-black text-white tracking-tight">DataHub VTU</h2>
          <p className="text-[11px] text-slate-400">Instant Telecoms & Bills Payment Service</p>
        </div>

        {/* Status Indicator */}
        <div className="my-3 py-3 rounded-2xl bg-slate-900/60 border border-white/5 text-center flex flex-col items-center justify-center">
          {isSuccess && (
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>TRANSACTION SUCCESSFUL</span>
            </div>
          )}
          {isFailed && (
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-sm">
              <XCircle className="w-5 h-5 text-red-400" />
              <span>TRANSACTION FAILED & REFUNDED</span>
            </div>
          )}
          {!isSuccess && !isFailed && (
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>PROCESSING</span>
            </div>
          )}
          
          <div className="mt-2 text-2xl font-black font-mono text-white tabular-nums">
            ₦{transaction.faceValue.toLocaleString()}
          </div>
          {transaction.discount ? (
            <div className="text-[11px] text-emerald-400 font-mono">
              (1% Discount: Paid ₦{transaction.amountDeducted.toLocaleString()})
            </div>
          ) : null}
        </div>

        {/* Electricity Token Callout */}
        {transaction.token && (
          <div className="mb-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1">
              Electricity Recharge Token
            </span>
            <div className="font-mono text-lg font-black text-white tracking-widest select-all tabular-nums">
              {transaction.token}
            </div>
            {transaction.units && (
              <span className="text-xs text-slate-300 mt-1 block">
                Units: {transaction.units}
              </span>
            )}
          </div>
        )}

        {/* Key-Value Details Table */}
        <div className="space-y-2 py-3 border-y border-white/10 text-xs font-mono">
          <div className="flex justify-between text-slate-400">
            <span>Transaction Type:</span>
            <span className="text-white font-sans font-semibold">{transaction.type}</span>
          </div>

          {transaction.network && (
            <div className="flex justify-between text-slate-400">
              <span>Network Provider:</span>
              <span className="text-white font-bold">{transaction.network}</span>
            </div>
          )}

          {transaction.planName && (
            <div className="flex justify-between text-slate-400">
              <span>Package:</span>
              <span className="text-white font-sans">{transaction.planName}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-400">
            <span>Recipient:</span>
            <span className="text-white font-bold">{transaction.recipient}</span>
          </div>

          <div className="flex justify-between text-slate-400">
            <span>Amount Deducted:</span>
            <span className="text-emerald-400 font-bold tabular-nums">
              ₦{transaction.amountDeducted.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-slate-400">
            <span>Date & Time:</span>
            <span className="text-slate-200">
              {new Date(transaction.timestamp).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center text-slate-400 pt-1">
            <span>Reference ID:</span>
            <button
              onClick={handleCopyRef}
              className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono"
            >
              <span>{transaction.reference.substring(0, 18)}...</span>
              <Copy className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Provider response log */}
        {transaction.providerResponse && (
          <div className="mt-3 p-2 rounded-lg bg-black/40 border border-white/5 text-[10px] font-mono text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap">
            Provider: {transaction.providerResponse}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verified Transaction via DataHub ClubKonnect Gateway</span>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors print:hidden"
        >
          Close Receipt
        </button>

      </div>
    </div>
  );
};
