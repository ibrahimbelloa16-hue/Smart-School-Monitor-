export type NetworkCode = '01' | '02' | '03' | '04';

export interface NetworkOption {
  code: NetworkCode;
  name: string;
  color: string;
  badgeBg: string;
  prefixes: string[];
}

export interface DataPlan {
  id: string;
  code: string;
  networkCode: NetworkCode;
  type: 'SME' | 'Corporate' | 'Gifting';
  name: string;
  size: string;
  validity: string;
  price: number;
}

export interface Transaction {
  id: string;
  type: 'AIRTIME' | 'DATA' | 'WALLET_FUNDING' | 'CABLE_TV' | 'ELECTRICITY' | 'BETTING';
  network?: string;
  networkCode?: string;
  planName?: string;
  recipient: string;
  faceValue: number;
  amountDeducted: number;
  discount?: number;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  reference: string;
  providerResponse?: string;
  token?: string;
  units?: string;
  timestamp: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  walletBalance: number;
  referralCode: string;
  virtualAccounts: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  }[];
}
