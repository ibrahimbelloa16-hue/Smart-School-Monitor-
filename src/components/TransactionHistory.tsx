import React, { useState } from 'react';
import { Transaction } from '../types';
import { 
  History, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronRight, 
  Smartphone, 
  PhoneCall, 
  Tv, 
  Zap, 
  Wallet,
  Receipt
} from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
  onNavigateToService: (tab: string) => void;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  onSelectTransaction,
  onNavigateToService
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = transactions.filter((tx) => {
    if (filterType !== 'ALL' && tx.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        tx.id.toLowerCase().includes(q) ||
        tx.recipient.toLowerCase().includes(q) ||
        tx.reference.toLowerCase().includes(q) ||
        (tx.network && tx.network.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'AIRTIME':
        return <PhoneCall className="w-4 h-4 text-blue-400" />;
      case 'DATA':
        return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'WALLET_FUNDING':
        return <Wallet className="w-4 h-4 text-indigo-400" />;
      case 'CABLE_TV':
        return <Tv className="w-4 h-4 text-amber-400" />;
      case 'ELECTRICITY':
        return <Zap className="w-4 h-4 text-teal-400" />;
      default:
        return <Receipt className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-7 backdrop-blur-xl max-w-4xl mx-auto shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
            Audit Ledger
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 mt-0.5">
            Transaction History
          </h2>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search phone, ref, id..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/70 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 py-4 overflow-x-auto no-scrollbar">
        {[
          { id: 'ALL', label: 'All Records' },
          { id: 'AIRTIME', label: 'Airtime' },
          { id: 'DATA', label: 'Mobile Data' },
          { id: 'WALLET_FUNDING', label: 'Funding' },
          { id: 'ELECTRICITY', label: 'Electricity' },
          { id: 'CABLE_TV', label: 'Cable TV' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterType === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table / List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
          <History className="w-10 h-10 mx-auto text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-slate-300">No transactions found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Try adjusting your search filters or make your first VTU transaction.
          </p>
          <button
            onClick={() => onNavigateToService('airtime')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
          >
            Buy Airtime Now
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((tx) => {
            const isSuccess = tx.status === 'SUCCESS';
            const isFailed = tx.status === 'FAILED';

            return (
              <button
                key={tx.id}
                onClick={() => onSelectTransaction(tx)}
                className="w-full p-3.5 sm:p-4 rounded-xl bg-slate-950/40 hover:bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all flex items-center justify-between text-left group"
              >
                {/* Left: Icon + Description */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0">
                    {getTypeIcon(tx.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white truncate">
                        {tx.type === 'WALLET_FUNDING' ? 'Wallet Credit' : (tx.planName || `${tx.network || ''} Airtime`)}
                      </span>
                      {tx.network && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-slate-300 font-mono font-medium">
                          {tx.network}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 font-mono">
                      <span>{tx.recipient}</span>
                      <span>·</span>
                      <span>{new Date(tx.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Amount + Status + Arrow */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0 pl-3">
                  <div className="text-right">
                    <div className={`text-xs sm:text-sm font-bold font-mono tabular-nums ${
                      tx.type === 'WALLET_FUNDING' ? 'text-emerald-400' : 'text-white'
                    }`}>
                      {tx.type === 'WALLET_FUNDING' ? '+' : '-'}₦{Math.abs(tx.faceValue).toLocaleString()}
                    </div>
                    <div className="flex items-center justify-end gap-1 mt-0.5">
                      {isSuccess && (
                        <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Success
                        </span>
                      )}
                      {isFailed && (
                        <span className="text-[10px] font-semibold text-red-400 flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Refunded
                        </span>
                      )}
                      {!isSuccess && !isFailed && (
                        <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
};
