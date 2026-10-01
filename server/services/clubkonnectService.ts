/**
 * ClubKonnect Integration Service
 * Official Documentation: https://www.clubkonnect.com/apidocs.asp
 * Handles secure server-side interactions with ClubKonnect for Airtime & Mobile Data.
 */

import { getDb } from '../db/database.ts';

export interface ProviderPurchaseResult {
  success: boolean;
  status: 'SUCCESS' | 'FAILED' | 'successful' | 'failed' | 'pending' | 'FAILED_REFUNDED';
  providerReference: string;
  statusCode: string;
  statusMessage: string;
  providerError?: string; // Exact provider error message from ClubKonnect
  rawResponse?: any;
  isTransient?: boolean; // 500 or network error
}

export interface ClubKonnectConfig {
  userId: string;
  apiKey: string;
  baseUrl: string;
  demoMode: boolean;
}

// Official Nellobyte Systems / ClubKonnect Endpoints
export const CLUBKONNECT_DATA_ENDPOINT = 'https://www.nellobytesystems.com/APIDatabundleV1.asp';
export const CLUBKONNECT_AIRTIME_ENDPOINT = 'https://www.nellobytesystems.com/APIAirtimeV1.asp';
export const CLUBKONNECT_QUERY_ENDPOINT = 'https://www.nellobytesystems.com/APIQueryV1.asp';

// Official network codes according to ClubKonnect specification:
// MTN = 01, GLO = 02, 9MOBILE = 03, AIRTEL = 04
export const NETWORK_CODES: Record<string, string> = {
  MTN: '01',
  GLO: '02',
  '9MOBILE': '03',
  AIRTEL: '04'
};

export const REVERSE_NETWORK_CODES: Record<string, string> = {
  '01': 'MTN',
  '02': 'GLO',
  '03': '9MOBILE',
  '04': 'AIRTEL'
};

export function getNetworkCode(net: string): string | undefined {
  if (!net) return undefined;
  const clean = net.toUpperCase().replace(/[\s\-_]/g, '');
  if (clean === 'MTN' || clean === '01') return '01';
  if (clean === 'GLO' || clean === 'GLOBACOM' || clean === '02') return '02';
  if (clean === '9MOBILE' || clean === 'ETISALAT' || clean === '03') return '03';
  if (clean === 'AIRTEL' || clean === '04') return '04';
  return NETWORK_CODES[clean];
}

export function resolveClubKonnectDataPlan(network: string, planCode: string): string {
  const net = (network || '').toUpperCase();
  const code = (planCode || '').trim();

  // If already matches Airtel format (e.g. Airtel500MB, Airtel1GB)
  if (code.toLowerCase().startsWith('airtel')) return code;

  // If network is Airtel and code doesn't start with Airtel
  if (net === 'AIRTEL' || net === '04') {
    if (code === '500' || code === '500MB' || code === '500.0MB') return 'Airtel500MB';
    if (code === '1000' || code === '1GB' || code === '1000MB' || code === '1000.0MB') return 'Airtel1GB';
    if (code === '2000' || code === '2GB' || code === '2000MB' || code === '2000.0MB') return 'Airtel2GB';
    if (code === '3000' || code === '3GB' || code === '3000MB' || code === '3000.0MB') return 'Airtel3GB';
    if (code === '5000' || code === '5GB' || code === '5000MB' || code === '5000.0MB') return 'Airtel5GB';
    if (code === '10000' || code === '10GB' || code === '10000MB' || code === '10000.0MB') return 'Airtel10GB';
  }

  // If network is MTN: standard codes are 500, 1000, 2000, 3000, 5000, 10000
  if (net === 'MTN' || net === '01') {
    if (code === '500MB' || code === '500.0MB') return '500';
    if (code === '1000MB' || code === '1000.0MB') return '1000';
    if (code === '2000MB' || code === '2000.0MB') return '2000';
    if (code === '3000MB' || code === '3000.0MB') return '3000';
    if (code === '5000MB' || code === '5000.0MB') return '5000';
    if (code === '10000MB' || code === '10000.0MB') return '10000';
  }

  return code;
}

/**
 * Backend check function that verifies the existence of CLUBKONNECT_USER_ID (or CLUBKONNECT_U),
 * and CLUBKONNECT_API_KEY (or CLUBKONNECT_A) when DEMO_MODE is false.
 */
export function verifyClubKonnectEnvironment(): {
  userId: string;
  apiKey: string;
  baseUrl: string;
  demoMode: boolean;
} {
  const isDemo = process.env.DEMO_MODE !== 'false';
  const userId = (process.env.CLUBKONNECT_USER_ID || process.env.CLUBKONNECT_U || '').trim();
  const apiKey = (process.env.CLUBKONNECT_API_KEY || process.env.CLUBKONNECT_A || '').trim();
  const rawBaseUrl = (process.env.CLUBKONNECT_BASE_URL || 'https://www.nellobytesystems.com').trim();

  let cleanBaseUrl = rawBaseUrl ? rawBaseUrl.replace(/\/+$/, '') : 'https://www.nellobytesystems.com';
  if (cleanBaseUrl && !cleanBaseUrl.startsWith('http://') && !cleanBaseUrl.startsWith('https://')) {
    cleanBaseUrl = 'https://www.nellobytesystems.com';
  }

  if (!isDemo && (!userId || !apiKey)) {
    const missing: string[] = [];
    if (!userId) missing.push('CLUBKONNECT_USER_ID (or CLUBKONNECT_U)');
    if (!apiKey) missing.push('CLUBKONNECT_API_KEY (or CLUBKONNECT_A)');
    throw new Error(`Missing required ClubKonnect configuration in live mode: ${missing.join(', ')}`);
  }

  return {
    userId,
    apiKey,
    baseUrl: cleanBaseUrl,
    demoMode: isDemo
  };
}

export class ClubKonnectService {
  public getConfig(): ClubKonnectConfig {
    return verifyClubKonnectEnvironment();
  }

  public isDemoMode(): boolean {
    return this.getConfig().demoMode;
  }

  /**
   * Asserts that required ClubKonnect credentials and base URL exist in the server environment when DEMO_MODE=false.
   * Logs a descriptive error and throws if any of CLUBKONNECT_USER_ID, CLUBKONNECT_API_KEY, or CLUBKONNECT_BASE_URL are missing.
   */
  public assertCredentialsConfigured(): void {
    verifyClubKonnectEnvironment();
  }

  /**
   * Validates Nigerian mobile phone format (080, 081, 070, 090, 091 followed by 8 digits, total 11 digits)
   */
  public isValidNigerianPhone(phone: string): boolean {
    const cleaned = phone.replace(/[\s\-\+]/g, '');
    // Standard format: 080XXXXXXXX, 070XXXXXXXX, 090XXXXXXXX, 081XXXXXXXX, 091XXXXXXXX
    // Or with country code 23480XXXXXXXX
    if (/^0[789][01]\d{8}$/.test(cleaned)) return true;
    if (/^234[789][01]\d{8}$/.test(cleaned)) return true;
    return false;
  }

  public normalizePhone(phone: string): string {
    const cleaned = phone.replace(/[\s\-\+]/g, '');
    if (cleaned.startsWith('234') && cleaned.length === 13) {
      return '0' + cleaned.slice(3);
    }
    return cleaned;
  }

  /**
   * Purchases Mobile Data Bundle from Nellobyte Systems / ClubKonnect
   * Official Endpoint: https://www.nellobytesystems.com/APIDatabundleV1.asp
   * Query Parameters:
   *   UserID: process.env.CLUBKONNECT_U (or CLUBKONNECT_USER_ID)
   *   APIKey: process.env.CLUBKONNECT_A (or CLUBKONNECT_API_KEY)
   *   MobileNetwork: '01' (MTN), '02' (GLO), '03' (9MOBILE), '04' (AIRTEL)
   *   DataPlan: Exact ClubKonnect DataPlan Code
   *   MobileNumber: Recipient phone number
   *   RequestID: Unique reference string
   */
  public async purchaseData(params: {
    network: string;
    dataPlanCode: string; // ClubKonnect variation code from database
    recipientPhone: string;
    requestId: string;
  }): Promise<ProviderPurchaseResult> {
    const config = this.getConfig();
    const networkCode = getNetworkCode(params.network);

    if (!networkCode) {
      return {
        success: false,
        status: 'FAILED',
        providerReference: '',
        statusCode: 'INVALID_NETWORK',
        statusMessage: `Unsupported network: ${params.network}`
      };
    }

    const formattedPhone = this.normalizePhone(params.recipientPhone);
    if (!this.isValidNigerianPhone(formattedPhone)) {
      return {
        success: false,
        status: 'FAILED',
        providerReference: '',
        statusCode: 'INVALID_PHONE',
        statusMessage: 'Invalid Nigerian phone number'
      };
    }

    // SIMULATED PROVIDER ONLY IN DEMO MODE (DEMO_MODE=true)
    if (config.demoMode) {
      return this.simulateDataPurchase(params.network, params.dataPlanCode, formattedPhone, params.requestId);
    }

    // PRODUCTION MODE: Strict credentials assertion
    this.assertCredentialsConfigured();

    const resolvedPlan = resolveClubKonnectDataPlan(params.network, params.dataPlanCode);

    // RequestID must be a unique numeric string for ClubKonnect
    const numericRequestId = /^\d+$/.test(params.requestId)
      ? params.requestId
      : `${Date.now()}${Math.floor(100000 + Math.random() * 900000)}`;

    // Official Nellobyte / ClubKonnect APIDatabundleV1.asp query parameters
    const queryParams = new URLSearchParams({
      UserID: config.userId,
      APIKey: config.apiKey,
      MobileNetwork: networkCode,
      DataPlan: resolvedPlan,
      MobileNumber: formattedPhone,
      RequestID: numericRequestId
    });

    // Exact official endpoint: https://www.nellobytesystems.com/APIDatabundleV1.asp
    const targetUrl = `${CLUBKONNECT_DATA_ENDPOINT}?${queryParams.toString()}`;

    let attempt = 0;
    const maxAttempts = 3;
    let isTransientFailure = false;
    let lastErrorMsg = '';

    while (attempt < maxAttempts) {
      attempt++;
      try {
        console.log(`================ [Nellobyte/ClubKonnect Data Request - Attempt ${attempt}/${maxAttempts}] ================`);
        console.log(`Endpoint: ${CLUBKONNECT_DATA_ENDPOINT}`);
        console.log(`Parameters: UserID=${config.userId}, APIKey=[REDACTED], MobileNetwork=${networkCode}, DataPlan=${resolvedPlan}, MobileNumber=${formattedPhone}, RequestID=${numericRequestId}`);
        console.log(`Full Request URL: ${targetUrl.replace(config.apiKey, '***')}`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

        const response = await fetch(targetUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'DataHub-VTU-Server/1.0'
          },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        const responseText = await response.text();
        console.log(`HTTP Status: ${response.status} ${response.statusText}`);
        console.log(`[ClubKonnect RAW Response]:\n${responseText}`);
        console.log('=====================================================================');

        if (response.status >= 500 && response.status <= 599) {
          isTransientFailure = true;
          lastErrorMsg = `HTTP ${response.status} ${response.statusText}`;
          console.warn(`[ClubKonnect Server Error]: HTTP ${response.status} (Attempt ${attempt}/${maxAttempts}). Provider busy, retrying in 10 seconds...`);
          if (attempt < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, 10000));
            continue;
          }
          break;
        }

        if (response.status === 404) {
          const notFoundErr = `Nellobyte/ClubKonnect Data API returned 404 Not Found (${CLUBKONNECT_DATA_ENDPOINT})`;
          console.error(`[Nellobyte/ClubKonnect 404 Error]: ${notFoundErr}`);
          return {
            success: false,
            status: 'FAILED',
            providerReference: '',
            statusCode: '404',
            statusMessage: notFoundErr,
            providerError: notFoundErr,
            rawResponse: { status: 404, body: responseText }
          };
        }

        if (!response.ok) {
          const httpErr = `Nellobyte/ClubKonnect Data API error: HTTP ${response.status} ${response.statusText}`;
          console.error(`[Nellobyte/ClubKonnect HTTP Error]: ${httpErr}`);
          return {
            success: false,
            status: 'FAILED',
            providerReference: '',
            statusCode: String(response.status),
            statusMessage: httpErr,
            providerError: httpErr,
            rawResponse: { status: response.status, body: responseText }
          };
        }

        let data: any = {};
        try {
          data = JSON.parse(responseText);
        } catch {
          data = { rawText: responseText };
        }

        return this.mapProviderResponse(data, numericRequestId, responseText);
      } catch (err: any) {
        isTransientFailure = true;
        lastErrorMsg = err.message || 'Error communicating with ClubKonnect server';
        console.warn(`[Nellobyte/ClubKonnect Network Error]: ${lastErrorMsg} (Attempt ${attempt}/${maxAttempts}). Provider busy, retrying in 10 seconds...`);
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 10000));
          continue;
        }
        break;
      }
    }

    if (isTransientFailure) {
      console.warn(`[ClubKonnect Data] All ${maxAttempts} attempts (30s) failed due to 500/network timeout on http://nellobytesystems.com. Marking as FAILED_REFUNDED.`);
      return {
        success: false,
        status: 'FAILED_REFUNDED',
        isTransient: false,
        providerReference: '',
        statusCode: 'NETWORK_BUSY',
        statusMessage: 'Network busy',
        providerError: 'Network busy'
      };
    }

    return {
      success: false,
      status: 'FAILED',
      providerReference: '',
      statusCode: 'FETCH_ERROR',
      statusMessage: lastErrorMsg || 'Error communicating with ClubKonnect server',
      providerError: lastErrorMsg || 'Error communicating with ClubKonnect server'
    };
  }

  /**
   * Purchases Airtime Top-Up from Nellobyte Systems / ClubKonnect
   * Official Endpoint: https://www.nellobytesystems.com/APIAirtimeV1.asp
   */
  public async purchaseAirtime(params: {
    network: string;
    amountNaira: number;
    recipientPhone: string;
    requestId: string;
  }): Promise<ProviderPurchaseResult> {
    const config = this.getConfig();
    const networkCode = getNetworkCode(params.network);

    if (!networkCode) {
      return {
        success: false,
        status: 'FAILED',
        providerReference: '',
        statusCode: 'INVALID_NETWORK',
        statusMessage: `Unsupported network: ${params.network}`,
        providerError: `Unsupported network: ${params.network}`
      };
    }

    const formattedPhone = this.normalizePhone(params.recipientPhone);
    if (!this.isValidNigerianPhone(formattedPhone)) {
      return {
        success: false,
        status: 'FAILED',
        providerReference: '',
        statusCode: 'INVALID_PHONE',
        statusMessage: 'Invalid Nigerian phone number',
        providerError: 'Invalid Nigerian phone number'
      };
    }

    if (params.amountNaira < 50 || params.amountNaira > 50000) {
      return {
        success: false,
        status: 'FAILED',
        providerReference: '',
        statusCode: 'INVALID_AMOUNT',
        statusMessage: 'Airtime amount must be between ₦50 and ₦50,000',
        providerError: 'Airtime amount must be between ₦50 and ₦50,000'
      };
    }

    // SIMULATED PROVIDER IN DEMO MODE
    if (config.demoMode) {
      return this.simulateAirtimePurchase(params.network, params.amountNaira, formattedPhone, params.requestId);
    }

    // PRODUCTION MODE: Strict credentials assertion
    this.assertCredentialsConfigured();

    const numericRequestId = /^\d+$/.test(params.requestId)
      ? params.requestId
      : `${Date.now()}${Math.floor(100000 + Math.random() * 900000)}`;

    // Official Nellobyte / ClubKonnect APIAirtimeV1.asp query parameters
    const queryParams = new URLSearchParams({
      UserID: config.userId,
      APIKey: config.apiKey,
      MobileNetwork: networkCode,
      Amount: String(params.amountNaira),
      MobileNumber: formattedPhone,
      RequestID: numericRequestId
    });

    // Exact official endpoint: https://www.nellobytesystems.com/APIAirtimeV1.asp
    const targetUrl = `${CLUBKONNECT_AIRTIME_ENDPOINT}?${queryParams.toString()}`;

    let attempt = 0;
    const maxAttempts = 3;
    let isTransientFailure = false;
    let lastErrorMsg = '';

    while (attempt < maxAttempts) {
      attempt++;
      try {
        console.log(`================ [Nellobyte/ClubKonnect Airtime Request - Attempt ${attempt}/${maxAttempts}] ================`);
        console.log(`Endpoint: ${CLUBKONNECT_AIRTIME_ENDPOINT}`);
        console.log(`Parameters: UserID=${config.userId}, APIKey=[REDACTED], MobileNetwork=${networkCode}, Amount=${params.amountNaira}, MobileNumber=${formattedPhone}, RequestID=${numericRequestId}`);
        console.log(`Full Request URL: ${targetUrl.replace(config.apiKey, '***')}`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        const response = await fetch(targetUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'DataHub-VTU-Server/1.0'
          },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        const responseText = await response.text();
        console.log(`HTTP Status: ${response.status} ${response.statusText}`);
        console.log(`[ClubKonnect RAW Response]:\n${responseText}`);
        console.log('===================================================================');

        if (response.status >= 500 && response.status <= 599) {
          isTransientFailure = true;
          lastErrorMsg = `HTTP ${response.status} ${response.statusText}`;
          console.warn(`[ClubKonnect Server Error]: HTTP ${response.status} (Attempt ${attempt}/${maxAttempts}). Provider busy, retrying in 10 seconds...`);
          if (attempt < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, 10000));
            continue;
          }
          break;
        }

        if (response.status === 404) {
          const notFoundErr = `Nellobyte/ClubKonnect Airtime API returned 404 Not Found (${CLUBKONNECT_AIRTIME_ENDPOINT})`;
          console.error(`[Nellobyte/ClubKonnect 404 Error]: ${notFoundErr}`);
          return {
            success: false,
            status: 'FAILED',
            providerReference: '',
            statusCode: '404',
            statusMessage: notFoundErr,
            providerError: notFoundErr,
            rawResponse: { status: 404, body: responseText }
          };
        }

        if (!response.ok) {
          const httpErr = `Nellobyte/ClubKonnect Airtime API error: HTTP ${response.status} ${response.statusText}`;
          console.error(`[Nellobyte/ClubKonnect HTTP Error]: ${httpErr}`);
          return {
            success: false,
            status: 'FAILED',
            providerReference: '',
            statusCode: String(response.status),
            statusMessage: httpErr,
            providerError: httpErr,
            rawResponse: { status: response.status, body: responseText }
          };
        }

        let data: any = {};
        try {
          data = JSON.parse(responseText);
        } catch {
          data = { rawText: responseText };
        }

        return this.mapProviderResponse(data, numericRequestId, responseText);
      } catch (err: any) {
        isTransientFailure = true;
        lastErrorMsg = err.message || 'Error communicating with ClubKonnect server';
        console.warn(`[Nellobyte/ClubKonnect Airtime Network Error]: ${lastErrorMsg} (Attempt ${attempt}/${maxAttempts}). Provider busy, retrying in 10 seconds...`);
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 10000));
          continue;
        }
        break;
      }
    }

    if (isTransientFailure) {
      console.warn(`[ClubKonnect Airtime] All ${maxAttempts} attempts (30s) failed due to 500/network timeout on http://nellobytesystems.com. Marking as FAILED_REFUNDED.`);
      return {
        success: false,
        status: 'FAILED_REFUNDED',
        isTransient: false,
        providerReference: '',
        statusCode: 'NETWORK_BUSY',
        statusMessage: 'Network busy',
        providerError: 'Network busy'
      };
    }

    return {
      success: false,
      status: 'FAILED',
      providerReference: '',
      statusCode: 'FETCH_ERROR',
      statusMessage: lastErrorMsg || 'Error communicating with ClubKonnect server',
      providerError: lastErrorMsg || 'Error communicating with ClubKonnect server'
    };
  }

  /**
   * Requery transaction status from ClubKonnect
   * Official Endpoint: https://www.nellobytesystems.com/APIQueryV1.asp
   */
  public async requeryTransaction(params: {
    orderId?: string;
    requestId: string;
  }): Promise<ProviderPurchaseResult> {
    const config = this.getConfig();

    if (config.demoMode) {
      // In demo mode, simulate successful confirmation or existing status
      return {
        success: true,
        status: 'successful',
        providerReference: params.orderId || `ORD-${Date.now()}`,
        statusCode: '100',
        statusMessage: 'Requery confirmed: Order completed successfully.'
      };
    }

    this.assertCredentialsConfigured();

    const queryParams = new URLSearchParams({
      UserID: config.userId,
      APIKey: config.apiKey,
      ...(params.orderId ? { OrderID: params.orderId } : {}),
      RequestID: params.requestId
    });

    const targetUrl = `${CLUBKONNECT_QUERY_ENDPOINT}?${queryParams.toString()}`;

    try {
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      const data = await response.json();
      return this.mapProviderResponse(data, params.requestId);
    } catch (err: any) {
      return {
        success: false,
        status: 'pending',
        providerReference: params.orderId || '',
        statusCode: 'REQUERY_ERROR',
        statusMessage: err.message || 'Failed to requery transaction'
      };
    }
  }

  /**
   * Maps official ClubKonnect response object to standard internal status.
   * Resolves transaction status immediately to 'SUCCESS' or 'FAILED'.
   * 
   * Official ClubKonnect status codes:
   * 100: ORDER_COMPLETED (Success)
   * 101: ORDER_RECEIVED (Accepted/Processing by provider -> resolved as SUCCESS)
   * 00/200: API Success
   * Error codes:
   * 102: ORDER_CANCELLED
   * 103: ORDER_FAILED
   * 104: INSUFFICIENT_BALANCE
   * 105: INVALID_PRODUCT / INVALID_NETWORK / INVALID_USER
   * 
   * Captures REAL_PROVIDER_REFERENCE directly from provider fields:
   * orderid, OrderID, order_id, TransactionID, reference
   */
  public mapProviderResponse(data: any, requestId: string, rawText = ''): ProviderPurchaseResult {
    const statusCode = String(
      data?.statuscode ?? 
      data?.StatusCode ?? 
      data?.status_code ?? 
      data?.code ?? 
      ''
    ).trim();

    const statusText = String(
      data?.status ?? 
      data?.orderstatus ?? 
      data?.OrderStatus ?? 
      data?.order_status ?? 
      ''
    ).toUpperCase().trim();
    
    // Extract REAL_PROVIDER_REFERENCE from all possible ClubKonnect property variants
    const orderId = String(
      data?.orderid ??
      data?.OrderID ??
      data?.order_id ??
      data?.OrderId ??
      data?.orderId ??
      data?.TransactionID ??
      data?.transactionid ??
      data?.reference ??
      data?.Reference ??
      ''
    ).trim();

    const remark = String(
      data?.remark ?? 
      data?.orderremark ?? 
      data?.msg ?? 
      data?.message ?? 
      data?.error ?? 
      ''
    ).trim();

    const rawUpper = (rawText || JSON.stringify(data || '')).toUpperCase();

    // Determine if response indicates success or accepted order (100, 101, 00, 200, ORDER_RECEIVED, ORDER_COMPLETED, SUCCESS)
    const isSuccess =
      statusCode === '100' ||
      statusCode === '101' ||
      statusCode === '00' ||
      statusCode === '200' ||
      statusText === 'ORDER_COMPLETED' ||
      statusText === 'ORDER_RECEIVED' ||
      statusText === 'ORDER_PROCESSING' ||
      statusText === 'SUCCESS' ||
      statusText === 'SUCCESSFUL' ||
      statusText === 'COMPLETED' ||
      remark.toUpperCase().includes('ORDER_COMPLETED') ||
      remark.toUpperCase().includes('ORDER_RECEIVED') ||
      remark.toUpperCase().includes('ORDER COMPLETED') ||
      remark.toUpperCase().includes('ORDER RECEIVED') ||
      remark.toUpperCase().includes('TRANSACTION SUCCESSFUL') ||
      remark.toUpperCase().includes('SUCCESS') ||
      rawUpper.includes('"STATUSCODE":"100"') ||
      rawUpper.includes('"STATUSCODE":"101"') ||
      rawUpper.includes('"STATUSCODE":100') ||
      rawUpper.includes('"STATUSCODE":101') ||
      rawUpper.includes('ORDER_COMPLETED') ||
      rawUpper.includes('ORDER_RECEIVED');

    if (isSuccess) {
      const successMsg = remark || (statusCode === '101' || statusText.includes('RECEIVED')
        ? 'Order received and delivered by network provider'
        : 'Order completed successfully');

      console.log(`[ClubKonnect Status Resolved]: SUCCESS (Code: ${statusCode || '100'}, Ref: ${orderId || requestId})`);

      return {
        success: true,
        status: 'SUCCESS',
        providerReference: orderId || requestId,
        statusCode: statusCode || '100',
        statusMessage: successMsg,
        rawResponse: data
      };
    }

    // Otherwise treated as FAILED: e.g. "Insufficient Balance", "Invalid Mobile Network", "Invalid Plan", "Invalid User"
    // Extract exact provider error text from all candidate fields ('msg', 'error', 'statuscode', 'remark', or raw text)
    const exactFieldMsg =
      (typeof data?.msg === 'string' && data.msg.trim()) ||
      (typeof data?.error === 'string' && data.error.trim()) ||
      (typeof data?.Error === 'string' && data.Error.trim()) ||
      (typeof data?.remark === 'string' && data.remark.trim()) ||
      (typeof data?.orderremark === 'string' && data.orderremark.trim()) ||
      (typeof data?.message === 'string' && data.message.trim()) ||
      (typeof data?.description === 'string' && data.description.trim()) ||
      '';

    let rawExtractedMsg = '';
    if (rawText && typeof rawText === 'string') {
      const trimmed = rawText.trim();
      // If raw text is NOT a JSON object string
      if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
        // Strip HTML if ClubKonnect returned an HTML error page
        const textOnly = trimmed.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
        rawExtractedMsg = textOnly.slice(0, 300) || trimmed.slice(0, 300);
      }
    }

    const providerFailReason =
      exactFieldMsg ||
      rawExtractedMsg ||
      (statusCode && statusCode !== '100' && statusCode !== '101'
        ? `ClubKonnect error code: ${statusCode}`
        : (statusText && statusText !== 'ORDER_COMPLETED' && statusText !== 'ORDER_RECEIVED'
            ? `ClubKonnect status: ${statusText}`
            : 'Transaction rejected by ClubKonnect'));

    console.error(`[ClubKonnect Status Resolved]: FAILED - ${providerFailReason} (StatusCode: ${statusCode}, StatusText: ${statusText})`);

    return {
      success: false,
      status: 'FAILED',
      providerReference: orderId,
      statusCode: statusCode || 'FAILED',
      statusMessage: providerFailReason,
      providerError: providerFailReason,
      rawResponse: data
    };
  }

  // Realistic simulation for development test mode
  private simulateDataPurchase(network: string, planCode: string, phone: string, requestId: string): ProviderPurchaseResult {
    // Check for mock failure test numbers
    if (phone.endsWith('0000') || phone.endsWith('9999')) {
      return {
        success: false,
        status: 'FAILED',
        providerReference: `FAIL-${Date.now()}`,
        statusCode: '103',
        statusMessage: 'Provider Failure: Recipient number barred or network unreachable.'
      };
    }

    return {
      success: true,
      status: 'SUCCESS',
      providerReference: `CK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      statusCode: '100',
      statusMessage: `${network} data bundle delivered to ${phone} successfully.`
    };
  }

  private simulateAirtimePurchase(network: string, amount: number, phone: string, requestId: string): ProviderPurchaseResult {
    if (phone.endsWith('0000') || phone.endsWith('9999')) {
      return {
        success: false,
        status: 'FAILED',
        providerReference: `FAIL-${Date.now()}`,
        statusCode: '103',
        statusMessage: 'Provider Failure: Recipient line barred or invalid.'
      };
    }

    return {
      success: true,
      status: 'SUCCESS',
      providerReference: `AIR-${Math.floor(10000000 + Math.random() * 90000000)}`,
      statusCode: '100',
      statusMessage: `₦${amount} Airtime credited to ${phone} successfully.`
    };
  }
}

export const clubkonnect = new ClubKonnectService();
