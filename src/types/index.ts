export type UserRole = 'user' | 'admin' | 'super_admin';
export type UserStatus = 'active' | 'suspended';

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  referralCode?: string;
  hasPin: boolean;
  balanceNaira: number;
  balanceKobo: number;
  createdAt?: string;
  stats?: {
    total: number;
    successful: number;
    pending: number;
    failed: number;
  };
}

export type NetworkType = 'MTN' | 'AIRTEL' | 'GLO' | '9MOBILE';

export interface DataPlan {
  id: string; // Internal DataHub Plan ID
  network: NetworkType;
  planName: string;
  planType: string;
  dataAmount: string;
  duration: string;
  sellingPriceKobo: number;
  sellingPriceNaira: number;
  providerCostNaira?: number;
  markupNaira?: number;
  profitNaira?: number;
  providerCode?: string;
  isActive?: boolean;
}

export interface AirtimeProduct {
  id: string;
  network: NetworkType;
  discountPercent: number;
  minAmountNaira: number;
  maxAmountNaira: number;
}

export type TransactionStatus = 'pending' | 'processing' | 'successful' | 'failed' | 'refunded' | 'FAILED_REFUNDED';
export type ProductType = 'data' | 'airtime' | 'wallet_funding' | 'refund';

export interface Transaction {
  id: number;
  reference: string;
  userId?: number;
  userName?: string;
  userEmail?: string;
  productType: ProductType;
  network?: NetworkType;
  recipientPhone?: string;
  amountNaira: number;
  provider?: string;
  providerReference?: string;
  providerCostNaira?: number;
  sellingPriceNaira?: number;
  profitNaira?: number;
  status: TransactionStatus;
  isDemo: boolean;
  refundReference?: string;
  createdAt: string;
  planName?: string;
  dataAmount?: string;
  duration?: string;
  metadata?: any;
}

export type FundingStatus = 'pending' | 'approved' | 'rejected';

export interface FundingRequest {
  id: number;
  reference: string;
  internalReference?: string;
  userId: number;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  amountNaira: number;
  currency?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  senderName?: string;
  senderBank?: string;
  transferReference?: string;
  proofImageUrl?: string;
  status: FundingStatus;
  adminId?: number;
  adminName?: string;
  rejectionReason?: string;
  approvedAt?: string;
  rejectedAt?: string;
  createdAt: string;
}

export interface LedgerEntry {
  id: number;
  wallet_id: number;
  user_id: number;
  amount_kobo: string | number;
  balance_before_kobo: string | number;
  balance_after_kobo: string | number;
  entry_type: 'credit' | 'debit';
  reference: string;
  description: string;
  status: string;
  created_at: string;
}

export interface BankDetails {
  bank_name: string;
  account_number: string;
  account_name: string;
  manual_funding_instructions: string;
  support_phone?: string;
  support_email?: string;
}

export interface AdminMetrics {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  totalWalletBalanceNaira: number;
  pendingFundingCount: number;
  approvedFundingCount: number;
  rejectedFundingCount: number;
  totalApprovedFundingNaira: number;
  successfulTxCount: number;
  pendingTxCount: number;
  failedTxCount: number;
  refundedTxCount: number;
  totalDataSalesNaira: number;
  totalAirtimeSalesNaira: number;
  totalProviderCostNaira: number;
  totalProfitNaira: number;
}
