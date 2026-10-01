import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../lib/api.ts';
import { Transaction } from '../types/index.ts';
import { formatNaira, formatDate, NETWORK_INFO } from '../lib/utils.ts';
import { ReceiptModal } from '../components/ReceiptModal.tsx';
import { 
  Clock, 
  Search, 
  Filter, 
  Wifi, 
  PhoneCall, 
  Wallet, 
  ArrowUpRight, 
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      let url = '/vtu/transactions?limit=100';
      if (typeFilter !== 'ALL') url += `&type=${typeFilter}`;
      if (statusFilter !== 'ALL') url += `&status=${statusFilter}`;
      const data = await apiRequest<{ transactions: Transaction[] }>(url);
      setTransactions(data.transactions || []);
    } catch (err) {
      console.warn('Transactions load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchTransactions();
  }, [user, typeFilter, statusFilter]);

  const filteredList = transactions.filter((tx) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return (
      tx.reference.toLowerCase().includes(query) ||
      (tx.recipientPhone && tx.recipientPhone.includes(query)) ||
      (tx.planName && tx.planName.toLowerCase().includes(query))
    );
  });

  const openReceipt = (tx: Transaction) => {
    setSelectedTx(tx);
    setIsReceiptOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-500" />
            <span>Transaction History</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Complete record of your purchases, top-ups, and auto-refunds
          </p>
        </div>

        <button
          onClick={fetchTransactions}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Refresh
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reference or recipient phone number..."
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Product Type Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Type:</span>
          {['ALL', 'data', 'airtime', 'wallet_funding'].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                typeFilter === type
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {type === 'ALL' ? 'All Products' : type === 'wallet_funding' ? 'Funding' : type.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Status Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Status:</span>
          {['ALL', 'successful', 'pending', 'refunded', 'failed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === st
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {st === 'ALL' ? 'All Status' : st.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-2.5">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading transactions...
          </div>
        ) : filteredList.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
            No transactions found matching your filter criteria.
          </div>
        ) : (
          filteredList.map((tx) => {
            const statusUpper = (tx.status || '').toUpperCase();
            const isSuccess = statusUpper === 'SUCCESS' || statusUpper === 'SUCCESSFUL';
            const isPending = statusUpper === 'PENDING' || statusUpper === 'PROCESSING';
            const isRefunded = statusUpper === 'REFUNDED';
            const networkInfo = tx.network ? NETWORK_INFO[tx.network] : null;

            return (
              <div
                key={tx.id}
                onClick={() => openReceipt(tx)}
                className="cursor-pointer p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all shadow-sm hover:shadow-md flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {/* Product Icon */}
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 ${
                      tx.productType === 'data'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : tx.productType === 'airtime'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {tx.productType === 'data' && <Wifi className="w-5 h-5" />}
                    {tx.productType === 'airtime' && <PhoneCall className="w-5 h-5" />}
                    {tx.productType === 'wallet_funding' && <Wallet className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {tx.planName || (tx.productType === 'wallet_funding' ? 'Wallet Funding' : `${tx.network} Airtime`)}
                      </span>
                      {networkInfo && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${networkInfo.badge}`}>
                          {networkInfo.name}
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                      {tx.recipientPhone ? `To: ${tx.recipientPhone}` : `Ref: ${tx.reference.slice(0, 16)}...`}
                    </div>

                    <div className="text-[10px] text-slate-400 mt-1">
                      {formatDate(tx.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-slate-900 dark:text-white">
                    {formatNaira(tx.amountNaira)}
                  </div>

                  <span
                    className={`inline-block mt-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                      isSuccess
                        ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                        : isPending
                        ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                        : isRefunded
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                        : 'bg-rose-500/20 text-rose-500 border-rose-500/30'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Transaction Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        data={selectedTx}
      />
    </div>
  );
};
