import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../lib/api.ts';
import { 
  AdminMetrics, 
  FundingRequest, 
  DataPlan, 
  Transaction, 
  BankDetails 
} from '../types/index.ts';
import { formatNaira, formatDate, NETWORK_INFO } from '../lib/utils.ts';
import { useToast } from '../components/Toast.tsx';
import { 
  ShieldCheck, 
  Users, 
  Wallet, 
  FileText, 
  TrendingUp, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  Search, 
  Plus, 
  Edit3, 
  Building2, 
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  Tag,
  DollarSign,
  Percent,
  Check,
  Zap,
  Sparkles,
  Bell,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Loader2,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { playNotificationChime } from '../lib/soundAlert.ts';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'funding' | 'users' | 'plans' | 'transactions' | 'settings' | 'audit'>('overview');

  // Realtime Pending Funding Alert System
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [isBellModalOpen, setIsBellModalOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [processingFundingId, setProcessingFundingId] = useState<number | null>(null);
  const prevPendingCountRef = React.useRef<number>(0);

  // Sensitive API Key Security (Super Admin Only)
  const [securitySettings, setSecuritySettings] = useState<{
    userId: string;
    baseUrl: string;
    maskedApiKey: string;
    rawApiKey?: string;
    hasApiKey: boolean;
  } | null>(null);
  const [securityUserIdInput, setSecurityUserIdInput] = useState<string>('');
  const [securityApiKeyInput, setSecurityApiKeyInput] = useState<string>('');
  const [isApiKeyRevealed, setIsApiKeyRevealed] = useState<boolean>(false);
  const [savingSecurity, setSavingSecurity] = useState<boolean>(false);
  const [settingsLogs, setSettingsLogs] = useState<any[]>([]);

  // Pending Transaction Manual Retry
  const [retryingTxId, setRetryingTxId] = useState<number | null>(null);

  // Overview metrics
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  // Funding requests
  const [fundingRequests, setFundingRequests] = useState<FundingRequest[]>([]);
  const [fundingStatusFilter, setFundingStatusFilter] = useState('pending');
  const [loadingFunding, setLoadingFunding] = useState(false);

  // Users
  const [userList, setUserList] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Plans & Pricing Management
  const [dataPlans, setDataPlans] = useState<DataPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any | null>(null);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [planNetworkFilter, setPlanNetworkFilter] = useState<'ALL' | 'MTN' | 'AIRTEL' | 'GLO' | '9MOBILE'>('ALL');
  const [planTypeFilter, setPlanTypeFilter] = useState<string>('ALL');
  const [planSearch, setPlanSearch] = useState('');
  const [inlineSellingPrices, setInlineSellingPrices] = useState<Record<string, number>>({});
  const [savingInlineId, setSavingInlineId] = useState<string | null>(null);
  const [newPlan, setNewPlan] = useState({
    id: '',
    network: 'MTN',
    planName: '',
    planType: 'SME',
    dataAmount: '1.0 GB',
    duration: '30 Days',
    providerCode: '',
    providerCostNaira: 410,
    sellingPriceNaira: 450,
    isActive: true
  });

  // Transactions
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [txSearch, setTxSearch] = useState('');
  const [loadingTx, setLoadingTx] = useState(false);

  // Settings
  const [settings, setSettings] = useState<any>(null);
  const [savingSettings, setSavingSettings] = useState(false);

  // Audit logs
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Rejection modal
  const [rejectingRequestId, setRejectingRequestId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Initial Load & 10s Auto-Refresh Interval
  useEffect(() => {
    fetchDashboardMetrics();
    fetchPendingAlerts();

    // Check if URL or hash specifies funding tab
    if (typeof window !== 'undefined') {
      if (window.location.pathname.includes('/admin/funding') || window.location.hash.includes('funding')) {
        setActiveTab('funding');
      }
    }

    const interval = setInterval(() => {
      fetchPendingAlerts();
      if (activeTab === 'funding') {
        fetchFundingRequests();
      }
    }, 10000); // 10 seconds auto-refresh as requested

    return () => clearInterval(interval);
  }, [activeTab, soundEnabled]);

  const fetchPendingAlerts = async () => {
    try {
      const data = await apiRequest<{ count: number }>('/admin/funding-requests/pending-count');
      const newCount = Number(data.count || 0);

      // Play chime if new requests arrived while online
      if (newCount > prevPendingCountRef.current && prevPendingCountRef.current >= 0 && soundEnabled) {
        playNotificationChime();
        showToast(`🔔 ${newCount - prevPendingCountRef.current} new manual bank funding request(s) waiting for approval!`, 'info');
      }
      prevPendingCountRef.current = newCount;
      setPendingCount(newCount);
    } catch (e) {}
  };

  useEffect(() => {
    if (activeTab === 'funding') fetchFundingRequests();
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'plans') fetchDataPlans();
    if (activeTab === 'transactions') fetchTransactions();
    if (activeTab === 'settings') {
      fetchSettings();
      fetchSecuritySettings();
      fetchSettingsLogs();
    }
    if (activeTab === 'audit') fetchAuditLogs();
  }, [activeTab, fundingStatusFilter]);

  const fetchDashboardMetrics = async () => {
    setLoadingMetrics(true);
    try {
      const data = await apiRequest<{ metrics: AdminMetrics }>('/admin/dashboard');
      setMetrics(data.metrics);
    } catch (err) {
      console.warn('Dashboard fetch error:', err);
    } finally {
      setLoadingMetrics(false);
    }
  };

  const fetchFundingRequests = async () => {
    setLoadingFunding(true);
    try {
      let url = '/admin/funding-requests?limit=100';
      if (fundingStatusFilter !== 'ALL') url += `&status=${fundingStatusFilter}`;
      const data = await apiRequest<{ requests: FundingRequest[] }>(url);
      setFundingRequests(data.requests || []);
    } catch (err) {
      console.warn('Admin funding load error:', err);
    } finally {
      setLoadingFunding(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      let url = '/admin/users?limit=100';
      if (userSearch) url += `&search=${encodeURIComponent(userSearch)}`;
      const data = await apiRequest<{ users: any[] }>(url);
      setUserList(data.users || []);
    } catch (err) {
      console.warn('Admin users load error:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchDataPlans = async () => {
    setLoadingPlans(true);
    try {
      const data = await apiRequest<{ plans: DataPlan[] }>('/admin/data-plans');
      const plans = data.plans || [];
      setDataPlans(plans);
      const prices: Record<string, number> = {};
      plans.forEach((p) => {
        prices[p.id] = p.sellingPriceNaira;
      });
      setInlineSellingPrices(prices);
    } catch (err) {
      console.warn('Admin plans load error:', err);
    } finally {
      setLoadingPlans(false);
    }
  };

  const fetchTransactions = async () => {
    setLoadingTx(true);
    try {
      let url = '/admin/transactions?limit=100';
      if (txSearch) url += `&search=${encodeURIComponent(txSearch)}`;
      const data = await apiRequest<{ transactions: Transaction[] }>(url);
      setAllTransactions(data.transactions || []);
    } catch (err) {
      console.warn('Admin transactions load error:', err);
    } finally {
      setLoadingTx(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const data = await apiRequest<{ settings: any }>('/admin/settings');
      setSettings(data.settings);
    } catch (err) {
      console.warn('Settings load error:', err);
    }
  };

  const fetchSecuritySettings = async () => {
    try {
      const data = await apiRequest<{ settings: any }>('/admin/security/settings');
      setSecuritySettings(data.settings);
      setSecurityUserIdInput(data.settings.userId || '');
      if (data.settings.rawApiKey) {
        setSecurityApiKeyInput(data.settings.rawApiKey);
      }
    } catch (err) {
      console.warn('Security settings load error:', err);
    }
  };

  const fetchSettingsLogs = async () => {
    try {
      const data = await apiRequest<{ logs: any[] }>('/admin/security/logs');
      setSettingsLogs(data.logs || []);
    } catch (err) {
      console.warn('Settings logs error:', err);
    }
  };

  const handleSaveSecuritySettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSecurity(true);
    try {
      const res = await apiRequest('/admin/security/settings', {
        method: 'PUT',
        body: JSON.stringify({
          userId: securityUserIdInput.trim(),
          apiKey: securityApiKeyInput.trim(),
          baseUrl: securitySettings?.baseUrl || 'https://www.nellobytesystems.com'
        })
      });
      showToast(res.message || 'ClubKonnect API credentials saved securely!', 'success');
      fetchSecuritySettings();
      fetchSettingsLogs();
    } catch (err: any) {
      showToast(err.message || 'Failed to update security settings.', 'error');
    } finally {
      setSavingSecurity(false);
    }
  };

  const handleRetryPendingTransaction = async (txId: number) => {
    setRetryingTxId(txId);
    try {
      const res = await apiRequest(`/admin/transactions/${txId}/retry-pending`, {
        method: 'POST'
      });
      if (res.success || res.status === 'SUCCESS' || res.status === 'successful') {
        showToast(res.message || 'Pending transaction processed successfully!', 'success');
      } else {
        showToast(res.message || 'Transaction status updated.', 'info');
      }
      fetchTransactions();
      fetchDashboardMetrics();
    } catch (err: any) {
      showToast(err.message || 'Failed to retry transaction.', 'error');
    } finally {
      setRetryingTxId(null);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const data = await apiRequest<{ logs: any[] }>('/admin/audit-logs');
      setAuditLogs(data.logs || []);
    } catch (err) {
      console.warn('Audit logs error:', err);
    }
  };

  // Funding actions with double-click protection & loading state
  const handleApproveFunding = async (requestId: number) => {
    setProcessingFundingId(requestId);
    try {
      const res = await apiRequest(`/admin/funding-requests/${requestId}/approve`, {
        method: 'POST'
      });
      showToast(res.message || 'Funding request approved! User wallet credited.', 'success');
      fetchFundingRequests();
      fetchPendingAlerts();
      fetchDashboardMetrics();
    } catch (err: any) {
      showToast(err.message || 'Approval failed.', 'error');
    } finally {
      setProcessingFundingId(null);
    }
  };

  const handleRejectFunding = async () => {
    if (!rejectingRequestId || !rejectionReason.trim()) {
      showToast('Please provide a rejection reason.', 'error');
      return;
    }

    try {
      const res = await apiRequest(`/admin/funding-requests/${rejectingRequestId}/reject`, {
        method: 'POST',
        body: JSON.stringify({ reason: rejectionReason.trim() })
      });
      showToast(res.message || 'Funding request rejected.', 'info');
      setRejectingRequestId(null);
      setRejectionReason('');
      fetchFundingRequests();
      fetchDashboardMetrics();
    } catch (err: any) {
      showToast(err.message || 'Rejection failed.', 'error');
    }
  };

  // User actions
  const handleToggleUserStatus = async (targetUserId: number, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
    try {
      await apiRequest(`/admin/users/${targetUserId}/status`, {
        method: 'POST',
        body: JSON.stringify({ status: nextStatus })
      });
      showToast(`User status set to ${nextStatus}.`, 'success');
      fetchUsers();
    } catch (err: any) {
      showToast(err.message || 'Failed to update user status.', 'error');
    }
  };

  // Transaction actions
  const handleRequery = async (txId: number) => {
    try {
      const res = await apiRequest(`/admin/transactions/${txId}/requery`, {
        method: 'POST'
      });
      showToast(res.message || `Requery completed: ${res.status}`, 'info');
      fetchTransactions();
      fetchDashboardMetrics();
    } catch (err: any) {
      showToast(err.message || 'Requery failed.', 'error');
    }
  };

  const handleManualRefund = async (txId: number) => {
    if (!confirm('Are you sure you want to refund this transaction back to the user wallet?')) return;
    try {
      const res = await apiRequest(`/admin/transactions/${txId}/manual-refund`, {
        method: 'POST'
      });
      showToast(res.message || 'Refund issued to user wallet.', 'success');
      fetchTransactions();
      fetchDashboardMetrics();
    } catch (err: any) {
      showToast(err.message || 'Refund failed.', 'error');
    }
  };

  // Fast inline price save
  const handleQuickPriceSave = async (plan: DataPlan) => {
    const newSellingPrice = inlineSellingPrices[plan.id];
    if (newSellingPrice === undefined || isNaN(newSellingPrice) || newSellingPrice <= 0) {
      showToast('Please enter a valid positive selling price in Naira.', 'error');
      return;
    }

    setSavingInlineId(plan.id);
    try {
      await apiRequest(`/admin/data-plans/${plan.id}/price`, {
        method: 'PATCH',
        body: JSON.stringify({
          sellingPriceNaira: Number(newSellingPrice),
          providerCostNaira: plan.providerCostNaira,
          isActive: plan.isActive
        })
      });
      showToast(`Updated price for ${plan.planName} to ${formatNaira(newSellingPrice)}!`, 'success');
      fetchDataPlans();
    } catch (err: any) {
      showToast(err.message || 'Failed to update plan price.', 'error');
    } finally {
      setSavingInlineId(null);
    }
  };

  // Toggle active/inactive for any plan
  const handleTogglePlanActive = async (plan: DataPlan) => {
    try {
      await apiRequest(`/admin/data-plans/${plan.id}/price`, {
        method: 'PATCH',
        body: JSON.stringify({
          isActive: !plan.isActive
        })
      });
      showToast(`${plan.planName} is now ${!plan.isActive ? 'ACTIVE' : 'DISABLED'}.`, 'info');
      fetchDataPlans();
    } catch (err: any) {
      showToast(err.message || 'Failed to update plan status.', 'error');
    }
  };

  // Plan Edit
  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    try {
      await apiRequest(`/admin/data-plans/${editingPlan.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          planName: editingPlan.planName,
          planType: editingPlan.planType,
          dataAmount: editingPlan.dataAmount,
          duration: editingPlan.duration,
          providerCode: editingPlan.providerCode,
          providerCostNaira: editingPlan.providerCostNaira,
          sellingPriceNaira: editingPlan.sellingPriceNaira,
          markupNaira: editingPlan.markupNaira,
          isActive: editingPlan.isActive
        })
      });
      showToast('Data plan updated successfully!', 'success');
      setEditingPlan(null);
      fetchDataPlans();
    } catch (err: any) {
      showToast(err.message || 'Failed to update plan.', 'error');
    }
  };

  // Create New Plan
  const handleCreateNewPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlan.id || !newPlan.planName || !newPlan.providerCode) {
      showToast('Please provide plan ID, display name, and ClubKonnect variation code.', 'error');
      return;
    }

    try {
      await apiRequest('/admin/data-plans', {
        method: 'POST',
        body: JSON.stringify(newPlan)
      });
      showToast(`Data plan ${newPlan.planName} created successfully!`, 'success');
      setIsNewPlanOpen(false);
      setNewPlan({
        id: '',
        network: 'MTN',
        planName: '',
        planType: 'SME',
        dataAmount: '1.0 GB',
        duration: '30 Days',
        providerCode: '',
        providerCostNaira: 410,
        sellingPriceNaira: 450,
        isActive: true
      });
      fetchDataPlans();
    } catch (err: any) {
      showToast(err.message || 'Failed to create plan.', 'error');
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          bankName: settings.bank_name,
          accountNumber: settings.account_number,
          accountName: settings.account_name,
          manualFundingInstructions: settings.manual_funding_instructions,
          supportPhone: settings.support_phone,
          supportEmail: settings.support_email,
          demoMode: settings.demo_mode,
          apkDownloadUrl: settings.apk_download_url || null
        })
      });
      showToast('Settings saved successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to save settings.', 'error');
    } finally {
      setSavingSettings(false);
    }
  };

  if (user?.role !== 'admin' && user?.role !== 'super_admin') {
    return (
      <div className="py-16 text-center text-rose-500">
        Access Denied: Administrator role required.
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Admin Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin Management Hub</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Operations, Manual Funding Approvals, Telecom Pricing, and Audit Trail
            </p>
          </div>
        </div>

        {/* Environment Status Badge & Alert Bell */}
        <div className="flex items-center gap-2.5">
          {/* Bell Icon with Red Badge */}
          <button
            type="button"
            onClick={() => {
              setIsBellModalOpen(true);
              fetchFundingRequests();
            }}
            className="relative p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-slate-700 dark:text-slate-200 transition-all shadow-sm flex items-center justify-center cursor-pointer group"
            title={`${pendingCount} Pending Manual Bank Funding Request(s)`}
          >
            <Bell className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            {pendingCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-black text-[11px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center animate-bounce shadow-md border-2 border-slate-900">
                {pendingCount}
              </span>
            )}
          </button>

          {/* Sound Alert Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              showToast(next ? 'Sound Alert enabled' : 'Sound Alert muted', 'info');
            }}
            className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
            }`}
            title={soundEnabled ? 'Alert Sound ON (Notification chime active)' : 'Alert Sound MUTED'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {settings?.demo_mode ? (
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              Test Environment
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Production</span>
            </span>
          )}
          <button
            onClick={() => {
              fetchDashboardMetrics();
              fetchPendingAlerts();
            }}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            Refresh All
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'overview', label: 'Overview Metrics', icon: TrendingUp },
          { id: 'funding', label: `Funding Requests (${metrics?.pendingFundingCount || 0})`, icon: Wallet },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'plans', label: `Manage Data Prices (${dataPlans.length})`, icon: Tag },
          { id: 'transactions', label: 'Transactions', icon: Clock },
          { id: 'settings', label: 'Platform & Bank Settings', icon: Settings },
          { id: 'audit', label: 'Audit Trail', icon: ShieldAlert }
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && metrics && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Total Users */}
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-slate-400 text-xs font-semibold">Total Registered Users</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {metrics.totalUsers}
              </div>
              <div className="text-[11px] text-emerald-500 font-medium mt-1">
                {metrics.activeUsers} Active • {metrics.suspendedUsers} Suspended
              </div>
            </div>

            {/* Wallet Liability */}
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-slate-400 text-xs font-semibold">Total User Wallet Balance</div>
              <div className="text-2xl font-black text-emerald-500 mt-1">
                {formatNaira(metrics.totalWalletBalanceNaira)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Platform user balance liability</div>
            </div>

            {/* Pending Funding */}
            <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30">
              <div className="text-amber-600 dark:text-amber-400 text-xs font-bold">
                Pending Bank Funding
              </div>
              <div className="text-2xl font-black text-amber-500 mt-1">
                {metrics.pendingFundingCount} Requests
              </div>
              <button
                onClick={() => setActiveTab('funding')}
                className="text-[11px] text-amber-500 underline font-semibold mt-1 block"
              >
                Review & Approve Now
              </button>
            </div>

            {/* Net Profit */}
            <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                Platform Net Profit
              </div>
              <div className="text-2xl font-black text-emerald-500 mt-1">
                {formatNaira(metrics.totalProfitNaira)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                From {formatNaira(metrics.totalDataSalesNaira + metrics.totalAirtimeSalesNaira)} Sales
              </div>
            </div>
          </div>

          {/* Sales Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Total Data Sales</div>
              <div className="text-xl font-black text-blue-500 mt-1">
                {formatNaira(metrics.totalDataSalesNaira)}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Total Airtime Sales</div>
              <div className="text-xl font-black text-emerald-500 mt-1">
                {formatNaira(metrics.totalAirtimeSalesNaira)}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Provider Wholesale Cost</div>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {formatNaira(metrics.totalProviderCostNaira)}
              </div>
            </div>
          </div>

          {/* Transaction Health */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Transaction Health & Delivery Summary
            </h3>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-emerald-500/10">
                <div className="text-xl font-black text-emerald-500">{metrics.successfulTxCount}</div>
                <div className="text-[11px] text-slate-400">Successful</div>
              </div>
              <div className="p-3 rounded-2xl bg-amber-500/10">
                <div className="text-xl font-black text-amber-500">{metrics.pendingTxCount}</div>
                <div className="text-[11px] text-slate-400">Pending</div>
              </div>
              <div className="p-3 rounded-2xl bg-rose-500/10">
                <div className="text-xl font-black text-rose-500">{metrics.failedTxCount}</div>
                <div className="text-[11px] text-slate-400">Failed</div>
              </div>
              <div className="p-3 rounded-2xl bg-purple-500/10">
                <div className="text-xl font-black text-purple-500">{metrics.refundedTxCount}</div>
                <div className="text-[11px] text-slate-400">Auto-Refunded</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANUAL FUNDING REQUESTS */}
      {activeTab === 'funding' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {['pending', 'approved', 'rejected', 'ALL'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFundingStatusFilter(st)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    fundingStatusFilter === st
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {st.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={fetchFundingRequests}
              className="text-xs text-blue-500 hover:underline font-semibold"
            >
              Refresh Submissions
            </button>
          </div>

          {loadingFunding ? (
            <div className="py-12 text-center text-slate-400 text-xs">Loading funding requests...</div>
          ) : fundingRequests.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              No {fundingStatusFilter} funding requests found.
            </div>
          ) : (
            <div className="space-y-3">
              {fundingRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-slate-900 dark:text-white">
                          {formatNaira(req.amountNaira)}
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                            req.status === 'approved'
                              ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                              : req.status === 'rejected'
                              ? 'bg-rose-500/20 text-rose-500 border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        User: <span className="font-semibold text-slate-800 dark:text-slate-200">{req.userName}</span> ({req.userPhone || req.userEmail})
                      </div>
                    </div>

                    <div className="text-xs text-slate-400">
                      Submitted: {formatDate(req.createdAt)}
                    </div>
                  </div>

                  {/* Transfer details */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3 text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Funding Ref:</span>
                      <span className="font-mono font-bold text-amber-500">{req.internalReference || req.reference}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Transfer Ref:</span>
                      <span className="font-mono font-bold text-blue-500">
                        {req.transferReference || <span className="text-slate-400 font-normal italic">None provided</span>}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Sender / Bank:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {req.senderName || req.userName} {req.senderBank ? `(${req.senderBank})` : ''}
                      </span>
                    </div>
                  </div>

                  {req.proofImageUrl && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center gap-3">
                      <img
                        src={req.proofImageUrl}
                        alt="Transfer Receipt"
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-slate-900 dark:text-white">Uploaded Customer Receipt</div>
                        <a
                          href={req.proofImageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 hover:underline flex items-center gap-1 text-[11px] font-semibold mt-0.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open Full Size Image</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {req.status === 'pending' && (
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => handleApproveFunding(req.id)}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Bank Credit & Approve (₦{req.amountNaira})</span>
                      </button>

                      <button
                        onClick={() => {
                          setRejectingRequestId(req.id);
                          setRejectionReason('');
                        }}
                        className="px-4 py-2.5 bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white font-bold text-xs rounded-xl transition-all border border-rose-500/30"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {req.rejectionReason && (
                    <div className="text-xs text-rose-500 font-medium">
                      Rejection Reason: {req.rejectionReason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Rejection Prompt Modal */}
          {rejectingRequestId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-white space-y-4">
                <h3 className="text-base font-bold">Reject Funding Request #{rejectingRequestId}</h3>
                <p className="text-xs text-slate-400">
                  Please specify why this funding request is being rejected (e.g., Transfer reference not found on bank statement, fake receipt, incorrect amount).
                </p>

                <textarea
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter rejection reason..."
                  className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-rose-500"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => setRejectingRequestId(null)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectFunding}
                    className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                  >
                    Confirm Rejection
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={userSearch}
              onChange={(e) => {
                setUserSearch(e.target.value);
                // quick search debounce
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') fetchUsers();
              }}
              placeholder="Search user by name, email, or phone and press Enter..."
              className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {loadingUsers ? (
            <div className="py-12 text-center text-slate-400 text-xs">Loading users...</div>
          ) : (
            <div className="space-y-2.5">
              {userList.map((u) => (
                <div
                  key={u.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{u.fullName}</span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          u.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-500'
                            : 'bg-rose-500/20 text-rose-500'
                        }`}
                      >
                        {u.status}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">
                        {u.role}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                      {u.phone} • {u.email}
                    </div>

                    <div className="text-[10px] text-slate-400 mt-1">
                      Joined: {formatDate(u.createdAt)}
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-2">
                    <div>
                      <div className="text-[10px] text-slate-400">Wallet Balance</div>
                      <div className="text-sm font-black text-emerald-500">{formatNaira(u.balanceNaira)}</div>
                    </div>

                    {u.role !== 'admin' && (
                      <button
                        onClick={() => handleToggleUserStatus(u.id, u.status)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                          u.status === 'active'
                            ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white'
                            : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                        }`}
                      >
                        {u.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: DYNAMIC DATA PRICING & PROFIT MANAGEMENT */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          {/* Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                  <Tag className="w-4 h-4" />
                </div>
                <h2 className="text-base font-black text-slate-900 dark:text-white">
                  Manage Telecom Data Prices & Profit Margins
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Edit selling prices for any network plan dynamically. Changes take effect instantly on live purchases with zero code restart.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsNewPlanOpen(true)}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Plan</span>
              </button>
              <button
                onClick={fetchDataPlans}
                className="p-2 text-slate-400 hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl"
                title="Refresh Prices"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Profit Assurance Info Banner */}
          <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  Guaranteed Telecom Profit Margins
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Configured with ClubKonnect lowest SME tier codes (~₦410/GB wholesale cost). You make profit on every transaction.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300 font-medium shrink-0">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Plans:</span>
                <span className="font-black text-slate-900 dark:text-white text-sm">{dataPlans.length}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Active for Sale:</span>
                <span className="font-black text-emerald-500 text-sm">
                  {dataPlans.filter(p => p.isActive).length}
                </span>
              </div>
            </div>
          </div>

          {/* Network & Search Filters */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Network Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
                {(['ALL', 'MTN', 'AIRTEL', 'GLO', '9MOBILE'] as const).map((net) => {
                  const isSelected = planNetworkFilter === net;
                  const count = net === 'ALL' 
                    ? dataPlans.length 
                    : dataPlans.filter(p => p.network === net).length;

                  return (
                    <button
                      key={net}
                      onClick={() => setPlanNetworkFilter(net)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        isSelected
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <span>{net === 'ALL' ? 'All Networks' : net}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={planSearch}
                  onChange={(e) => setPlanSearch(e.target.value)}
                  placeholder="Filter plan by name or code..."
                  className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Plan Type Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Type:</span>
              {['ALL', 'SME', 'Direct', 'Corporate Gifting', 'Gifting'].map((type) => (
                <button
                  key={type}
                  onClick={() => setPlanTypeFilter(type)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    planTypeFilter === type
                      ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Plans Grid */}
          {loadingPlans ? (
            <div className="py-12 text-center text-slate-400 text-xs">Loading data plans...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dataPlans
                .filter((p) => {
                  if (planNetworkFilter !== 'ALL' && p.network !== planNetworkFilter) return false;
                  if (planTypeFilter !== 'ALL' && p.planType !== planTypeFilter) return false;
                  if (planSearch) {
                    const q = planSearch.toLowerCase();
                    const matchName = p.planName.toLowerCase().includes(q);
                    const matchCode = (p.providerCode || '').toLowerCase().includes(q);
                    const matchAmount = (p.dataAmount || '').toLowerCase().includes(q);
                    if (!matchName && !matchCode && !matchAmount) return false;
                  }
                  return true;
                })
                .map((plan) => {
                  const editedPrice = inlineSellingPrices[plan.id] !== undefined 
                    ? inlineSellingPrices[plan.id] 
                    : plan.sellingPriceNaira;
                  const currentCost = plan.providerCostNaira || 0;
                  const liveProfit = Number(editedPrice) - currentCost;
                  const liveMarginPercent = currentCost > 0 ? ((liveProfit / currentCost) * 100).toFixed(1) : '0';
                  const isDirty = editedPrice !== plan.sellingPriceNaira;
                  const isSaving = savingInlineId === plan.id;

                  return (
                    <div
                      key={plan.id}
                      className={`p-4 rounded-3xl bg-white dark:bg-slate-900 border transition-all space-y-3.5 ${
                        plan.isActive
                          ? 'border-slate-200 dark:border-slate-800 shadow-sm'
                          : 'border-rose-500/20 opacity-75 bg-slate-50/50 dark:bg-slate-950/40'
                      }`}
                    >
                      {/* Top Bar: Network & Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                              plan.network === 'MTN'
                                ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                                : plan.network === 'AIRTEL'
                                ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                                : plan.network === 'GLO'
                                ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                                : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            }`}
                          >
                            {plan.network}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                            {plan.planType}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTogglePlanActive(plan)}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                              plan.isActive
                                ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30 hover:bg-rose-500/20 hover:text-rose-500 hover:border-rose-500/30'
                                : 'bg-slate-500/20 text-slate-400 border-slate-500/30 hover:bg-emerald-500/20 hover:text-emerald-500'
                            }`}
                            title="Click to toggle availability"
                          >
                            {plan.isActive ? 'Active' : 'Disabled'}
                          </button>
                          <button
                            onClick={() => setEditingPlan(plan)}
                            className="p-1.5 text-slate-400 hover:text-amber-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Full Edit Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Plan Name & Duration */}
                      <div>
                        <h3 className="font-black text-sm text-slate-900 dark:text-white">
                          {plan.planName}
                        </h3>
                        <div className="text-[11px] text-slate-400 mt-0.5 flex items-center justify-between font-mono">
                          <span>Data: {plan.dataAmount || 'N/A'}</span>
                          <span>Duration: {plan.duration}</span>
                        </div>
                      </div>

                      {/* Pricing Breakdown Card */}
                      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3 grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px] font-semibold uppercase">Cost</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">
                            {formatNaira(currentCost)}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] font-semibold uppercase">Selling</span>
                          <span className="font-extrabold text-blue-500 font-mono">
                            {formatNaira(plan.sellingPriceNaira)}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] font-semibold uppercase">Profit</span>
                          <span className="font-extrabold text-emerald-500 font-mono">
                            +{formatNaira(plan.profitNaira || 0)}
                          </span>
                        </div>
                      </div>

                      {/* Dynamic In-Place Selling Price Editor */}
                      <div className="pt-1 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            Quick Selling Price (₦):
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              liveProfit > 0
                                ? 'bg-emerald-500/20 text-emerald-500'
                                : 'bg-rose-500/20 text-rose-500'
                            }`}
                          >
                            Profit: {formatNaira(liveProfit)} ({liveMarginPercent}%)
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">₦</span>
                            <input
                              type="number"
                              step="5"
                              value={editedPrice}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                setInlineSellingPrices({
                                  ...inlineSellingPrices,
                                  [plan.id]: isNaN(val) ? 0 : val
                                });
                              }}
                              className="w-full text-xs font-black bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-7 pr-3 py-1.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          <button
                            onClick={() => handleQuickPriceSave(plan)}
                            disabled={isSaving}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                              isDirty
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 animate-pulse'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-500 hover:text-slate-950'
                            }`}
                          >
                            {isSaving ? (
                              <span>Saving...</span>
                            ) : (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>{isDirty ? 'Save Price' : 'Update'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Footer: Variation Code & Source */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 font-mono">
                        <span>Code: <span className="font-bold text-slate-600 dark:text-slate-300">{plan.providerCode || 'N/A'}</span></span>
                        <span>ID: {plan.id}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Edit Plan Modal */}
          {editingPlan && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <form
                onSubmit={handleSavePlan}
                className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-white space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold">Edit Plan: {editingPlan.id}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                    {editingPlan.network}
                  </span>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400">Plan Display Name</label>
                  <input
                    type="text"
                    value={editingPlan.planName}
                    onChange={(e) => setEditingPlan({ ...editingPlan, planName: e.target.value })}
                    className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">Plan Type</label>
                    <select
                      value={editingPlan.planType}
                      onChange={(e) => setEditingPlan({ ...editingPlan, planType: e.target.value })}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white"
                    >
                      <option value="SME">SME</option>
                      <option value="Direct">Direct</option>
                      <option value="Corporate Gifting">Corporate Gifting</option>
                      <option value="Gifting">Gifting</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Duration</label>
                    <input
                      type="text"
                      value={editingPlan.duration}
                      onChange={(e) => setEditingPlan({ ...editingPlan, duration: e.target.value })}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">ClubKonnect Cost (₦)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingPlan.providerCostNaira}
                      onChange={(e) => setEditingPlan({ ...editingPlan, providerCostNaira: parseFloat(e.target.value) })}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Customer Selling Price (₦)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingPlan.sellingPriceNaira}
                      onChange={(e) => setEditingPlan({ ...editingPlan, sellingPriceNaira: parseFloat(e.target.value) })}
                      className="w-full text-xs font-bold bg-slate-800 border border-emerald-500/50 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400">ClubKonnect Variation Code (e.g. 1000, Airtel1GB)</label>
                  <input
                    type="text"
                    value={editingPlan.providerCode}
                    onChange={(e) => setEditingPlan({ ...editingPlan, providerCode: e.target.value })}
                    className="w-full text-xs font-mono bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>

                <div className="bg-slate-800/60 p-2.5 rounded-xl text-xs flex justify-between items-center text-slate-300">
                  <span>Calculated Net Profit:</span>
                  <span className="font-black text-emerald-400">
                    +{formatNaira((editingPlan.sellingPriceNaira || 0) - (editingPlan.providerCostNaira || 0))}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isActivePlan"
                    checked={editingPlan.isActive}
                    onChange={(e) => setEditingPlan({ ...editingPlan, isActive: e.target.checked })}
                    className="rounded text-amber-500"
                  />
                  <label htmlFor="isActivePlan" className="text-xs">Active and available for customer purchases</label>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingPlan(null)}
                    className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-amber-500/20"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Add New Plan Modal */}
          {isNewPlanOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <form
                onSubmit={handleCreateNewPlan}
                className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-white space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold">Add New Data Plan</h3>
                  <button
                    type="button"
                    onClick={() => setIsNewPlanOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">Network</label>
                    <select
                      value={newPlan.network}
                      onChange={(e) => setNewPlan({ ...newPlan, network: e.target.value })}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white"
                    >
                      <option value="MTN">MTN</option>
                      <option value="AIRTEL">AIRTEL</option>
                      <option value="GLO">GLO</option>
                      <option value="9MOBILE">9MOBILE</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Plan Type</label>
                    <select
                      value={newPlan.planType}
                      onChange={(e) => setNewPlan({ ...newPlan, planType: e.target.value })}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white"
                    >
                      <option value="SME">SME</option>
                      <option value="Direct">Direct</option>
                      <option value="Corporate Gifting">Corporate Gifting</option>
                      <option value="Gifting">Gifting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400">Internal Plan ID (e.g. mtn-sme-15gb)</label>
                  <input
                    type="text"
                    value={newPlan.id}
                    onChange={(e) => setNewPlan({ ...newPlan, id: e.target.value })}
                    placeholder="e.g. mtn-sme-15gb"
                    className="w-full text-xs font-mono bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400">Display Name</label>
                  <input
                    type="text"
                    value={newPlan.planName}
                    onChange={(e) => setNewPlan({ ...newPlan, planName: e.target.value })}
                    placeholder="e.g. MTN SME 15.0GB"
                    className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">Data Amount</label>
                    <input
                      type="text"
                      value={newPlan.dataAmount}
                      onChange={(e) => setNewPlan({ ...newPlan, dataAmount: e.target.value })}
                      placeholder="e.g. 15.0 GB"
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Duration</label>
                    <input
                      type="text"
                      value={newPlan.duration}
                      onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400">ClubKonnect Variation Code</label>
                  <input
                    type="text"
                    value={newPlan.providerCode}
                    onChange={(e) => setNewPlan({ ...newPlan, providerCode: e.target.value })}
                    placeholder="e.g. 15000 or Airtel15GB"
                    className="w-full text-xs font-mono bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">Wholesale Cost (₦)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newPlan.providerCostNaira}
                      onChange={(e) => setNewPlan({ ...newPlan, providerCostNaira: parseFloat(e.target.value) })}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Selling Price (₦)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newPlan.sellingPriceNaira}
                      onChange={(e) => setNewPlan({ ...newPlan, sellingPriceNaira: parseFloat(e.target.value) })}
                      className="w-full text-xs font-bold bg-slate-800 border border-emerald-500/50 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsNewPlanOpen(false)}
                    className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-amber-500/20"
                  >
                    Create Plan
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: TRANSACTIONS & REQUERY */}
      {activeTab === 'transactions' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={txSearch}
              onChange={(e) => setTxSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') fetchTransactions();
              }}
              placeholder="Search reference, phone, or email and press Enter..."
              className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {loadingTx ? (
            <div className="py-12 text-center text-slate-400 text-xs">Loading transactions...</div>
          ) : (
            <div className="space-y-2.5">
              {allTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{tx.userName}</span>
                        <span className="text-[10px] font-mono font-bold text-blue-500">{tx.reference}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {tx.network} • {tx.recipientPhone || 'N/A'} • {tx.planName || tx.productType}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-black text-slate-900 dark:text-white">
                        {formatNaira(tx.amountNaira)}
                      </div>
                      <span
                        className={`inline-block mt-0.5 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                          tx.status === 'successful'
                            ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                            : tx.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-500 border-rose-500/30'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                    <div>Date: {formatDate(tx.createdAt)}</div>
                    <div className="flex items-center gap-2">
                      {(tx.status === 'pending' || tx.status === 'processing') && (
                        <button
                          onClick={() => handleRetryPendingTransaction(tx.id)}
                          disabled={retryingTxId === tx.id}
                          className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer disabled:opacity-50"
                          title="Manually retry this pending transaction with ClubKonnect"
                        >
                          {retryingTxId === tx.id ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Retrying...</span>
                            </>
                          ) : (
                            <>
                              <RefreshCw className="w-3 h-3" />
                              <span>Retry Pending</span>
                            </>
                          )}
                        </button>
                      )}

                      <button
                        onClick={() => handleRequery(tx.id)}
                        className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold transition-colors"
                      >
                        Requery Provider
                      </button>

                      {tx.status !== 'refunded' && (
                        <button
                          onClick={() => handleManualRefund(tx.id)}
                          className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white font-semibold transition-colors"
                        >
                          Manual Refund
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: SETTINGS */}
      {activeTab === 'settings' && settings && (
        <div className="space-y-6">
          <form onSubmit={handleSaveSettings} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Manual Bank Transfer Account Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                value={settings.bank_name}
                onChange={(e) => setSettings({ ...settings, bank_name: e.target.value })}
                className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                Account Number
              </label>
              <input
                type="text"
                value={settings.account_number}
                onChange={(e) => setSettings({ ...settings, account_number: e.target.value })}
                className="w-full text-xs font-mono font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              Account Holder Name
            </label>
            <input
              type="text"
              value={settings.account_name}
              onChange={(e) => setSettings({ ...settings, account_name: e.target.value })}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              Transfer Instructions Displayed to Users
            </label>
            <textarea
              rows={3}
              value={settings.manual_funding_instructions}
              onChange={(e) => setSettings({ ...settings, manual_funding_instructions: e.target.value })}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white"
            />
          </div>

          {/* Android Direct APK Link Configuration */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
              <span>Android APK Download URL (Direct .apk)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-semibold">
                Mobile App
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 mb-2">
              Provide a direct link to your hosted Android APK file (e.g. Google Drive direct link, Cloud storage, or CDN). When set, users will see this download button alongside PWA installation.
            </p>
            <input
              type="url"
              value={settings.apk_download_url || ''}
              onChange={(e) => setSettings({ ...settings, apk_download_url: e.target.value })}
              placeholder="https://example.com/downloads/standard-datahub.apk"
              className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              Changes reflect immediately across all client applications
            </span>
            <button
              type="submit"
              disabled={savingSettings}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-500/20"
            >
              {savingSettings ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </form>

        {/* SENSITIVE API KEY SECURITY (Super Admin Only) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-500 border border-rose-500/30 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 flex-wrap">
                  <span>ClubKonnect Gateway Credentials & Security</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500 border border-rose-500/30">
                    Super Admin Only
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Stored securely in dedicated <code className="text-amber-500">admin_settings</code> table with Row Level Security (RLS) enforcement.
                </p>
              </div>
            </div>

            {user?.role !== 'super_admin' && (
              <span className="text-[11px] font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-xl self-start sm:self-auto">
                🔒 Locked (super_admin required to edit)
              </span>
            )}
          </div>

          <form onSubmit={handleSaveSecuritySettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* User ID */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  ClubKonnect UserID (Phone / Account)
                </label>
                <input
                  type="text"
                  value={securityUserIdInput}
                  disabled={user?.role !== 'super_admin'}
                  onChange={(e) => setSecurityUserIdInput(e.target.value)}
                  placeholder="e.g. ClubKonnect UserID"
                  className="w-full text-xs font-mono font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">Configured UserID: {securitySettings?.userId || 'Not configured'}</p>
              </div>

              {/* Base URL */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  ClubKonnect Base URL
                </label>
                <input
                  type="text"
                  value={securitySettings?.baseUrl || 'https://www.nellobytesystems.com'}
                  disabled
                  className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                />
                <p className="text-[11px] text-slate-400 mt-1">Direct endpoint: https://www.nellobytesystems.com</p>
              </div>
            </div>

            {/* API Key with Dots ••••• and Eye Icon */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                ClubKonnect API Key (Protected with dots)
              </label>
              <div className="relative">
                <input
                  type={isApiKeyRevealed ? 'text' : 'password'}
                  value={securityApiKeyInput || (securitySettings?.maskedApiKey ? (isApiKeyRevealed ? securitySettings.rawApiKey || '' : '••••••••••••••••••••') : '')}
                  disabled={user?.role !== 'super_admin'}
                  onChange={(e) => setSecurityApiKeyInput(e.target.value)}
                  placeholder="Enter new ClubKonnect API Key to update"
                  className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-3 pr-10 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setIsApiKeyRevealed(!isApiKeyRevealed)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 p-0.5 rounded cursor-pointer"
                  title={isApiKeyRevealed ? 'Hide API key' : 'Show API key'}
                >
                  {isApiKeyRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
                <span>API Key field is masked with dots to prevent shoulder surfing or recording.</span>
                {securitySettings?.hasApiKey && (
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> API Key Configured
                  </span>
                )}
              </div>
            </div>

            {user?.role === 'super_admin' && (
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={savingSecurity}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-rose-600/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {savingSecurity ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving API Key to DB...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Update API Key in admin_settings</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </form>

          {/* SETTINGS CHANGE LOG TABLE (settings_logs) */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>API Settings Change Log (settings_logs)</span>
              <span className="text-[10px] text-slate-400 font-normal">
                ({settingsLogs.length} audit entries)
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Every modification to the API Key or UserID is permanently logged in <code>settings_logs</code> with the admin ID and timestamp.
            </p>

            {settingsLogs.length === 0 ? (
              <div className="text-xs text-slate-400 py-3 text-center bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                No settings changes logged yet.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="py-2 px-3 font-semibold">ID</th>
                      <th className="py-2 px-3 font-semibold">Admin</th>
                      <th className="py-2 px-3 font-semibold">Field Changed</th>
                      <th className="py-2 px-3 font-semibold">Old Value</th>
                      <th className="py-2 px-3 font-semibold">New Value</th>
                      <th className="py-2 px-3 font-semibold">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                    {settingsLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <td className="py-2 px-3 text-slate-400">#{log.id}</td>
                        <td className="py-2 px-3 font-sans font-medium text-slate-800 dark:text-slate-200">
                          {log.admin_name || log.admin_email || `Admin #${log.admin_id}`}
                        </td>
                        <td className="py-2 px-3 font-bold text-amber-500">{log.field_changed}</td>
                        <td className="py-2 px-3 text-slate-400 max-w-[120px] truncate">{log.old_value || 'None'}</td>
                        <td className="py-2 px-3 text-emerald-500 max-w-[120px] truncate">{log.new_value}</td>
                        <td className="py-2 px-3 font-sans text-slate-400">{formatDate(log.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* TAB 7: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Administrative Audit Trail
          </h2>
          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {log.action.toUpperCase()}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {log.details}
                  </div>
                </div>
                <div className="text-right text-[10px] text-slate-400 font-mono">
                  <div>{log.admin_email}</div>
                  <div>{formatDate(log.created_at)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REALTIME PENDING FUNDING REQUESTS BELL MODAL */}
      {isBellModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B0F19] border border-white/10 rounded-3xl w-full max-w-2xl p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <Bell className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <span>Pending Bank Funding Requests</span>
                    <span className="text-[11px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full">
                      {pendingCount} Pending
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">Auto-refreshes every 10 seconds with audio chime alert</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const next = !soundEnabled;
                    setSoundEnabled(next);
                    showToast(next ? 'Sound Alert enabled' : 'Sound Alert muted', 'info');
                  }}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    soundEnabled
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                  title={soundEnabled ? 'Alert Chime Sound ON' : 'Alert Chime Sound MUTED'}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="hidden sm:inline">{soundEnabled ? 'Sound ON' : 'Muted'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsBellModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* List of Pending Requests */}
            <div className="overflow-y-auto py-4 space-y-3 flex-1">
              {fundingRequests.filter((r) => r.status === 'pending').length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-80" />
                  <p className="font-bold text-white text-sm">All Caught Up!</p>
                  <p className="text-slate-400 mt-1">There are no pending manual bank funding requests at the moment.</p>
                </div>
              ) : (
                fundingRequests
                  .filter((r) => r.status === 'pending')
                  .map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-lg font-black text-emerald-400">
                            {formatNaira(req.amountNaira)}
                          </div>
                          <div className="text-xs text-white font-bold mt-0.5">
                            {req.userName}{' '}
                            <span className="text-slate-400 font-normal">
                              ({req.userPhone || req.userEmail})
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Funding Ref: <span className="font-mono text-amber-400 font-bold">{req.internalReference || req.reference}</span>
                            {req.transferReference && (
                              <span> • Bank Tx: <span className="font-mono text-blue-400">{req.transferReference}</span></span>
                            )}
                          </div>
                        </div>

                        <div className="text-right text-[10px] text-slate-400">
                          {formatDate(req.createdAt)}
                        </div>
                      </div>

                      {/* Proof Receipt Image */}
                      {req.proofImageUrl && (
                        <div className="p-2.5 bg-slate-800/60 rounded-xl flex items-center gap-3">
                          <img
                            src={req.proofImageUrl}
                            alt="Bank Proof"
                            className="w-14 h-14 object-cover rounded-lg border border-white/10 shrink-0"
                          />
                          <div className="text-xs">
                            <span className="font-bold text-slate-200">Customer Proof Receipt Attached</span>
                            <a
                              href={req.proofImageUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-400 hover:underline flex items-center gap-1 text-[11px] font-semibold mt-0.5"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>View Receipt Fullscreen</span>
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons: APPROVE & REJECT */}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                        <button
                          type="button"
                          disabled={processingFundingId === req.id}
                          onClick={() => handleApproveFunding(req.id)}
                          className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
                        >
                          {processingFundingId === req.id ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Crediting Wallet...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>APPROVE (+₦{req.amountNaira})</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setRejectingRequestId(req.id);
                            setRejectionReason('');
                          }}
                          className="px-4 py-2.5 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white font-bold text-xs rounded-xl transition-all border border-rose-500/30 cursor-pointer"
                        >
                          REJECT
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 shrink-0">
              <span>Auto-refreshes every 10 seconds</span>
              <button
                type="button"
                onClick={() => {
                  fetchFundingRequests();
                  fetchPendingAlerts();
                }}
                className="text-amber-400 hover:underline font-semibold"
              >
                Refresh Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
