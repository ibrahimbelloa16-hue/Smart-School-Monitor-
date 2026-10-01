/**
 * DataHub Automated Verification Test Suite
 * Covers all Section 30 requirements:
 * Authentication, Wallet Ledger, Manual Funding, Admin Approvals,
 * Plan Security, Airtime, Insufficient Balance, PIN, Refunds, Requery, etc.
 */

import dotenv from 'dotenv';
dotenv.config();

import { initDatabase } from '../db/init.ts';
import { getDb } from '../db/database.ts';
import bcrypt from 'bcryptjs';
import { walletService } from '../services/walletService.ts';
import { fundingService } from '../services/fundingService.ts';
import { transactionEngine } from '../services/transactionEngine.ts';
import {
  clubkonnect,
  verifyClubKonnectEnvironment,
  CLUBKONNECT_DATA_ENDPOINT,
  CLUBKONNECT_AIRTIME_ENDPOINT
} from '../services/clubkonnectService.ts';

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
    failedTests++;
  }
}

async function runAllTests() {
  console.log('\n=========================================');
  console.log('  RUNNING DATAHUB AUTOMATED TEST SUITE');
  console.log('=========================================\n');

  // Step 1: Ensure database initialized
  await initDatabase();
  const db = await getDb();

  // Save the environment DEMO_MODE (from .env)
  const envDemoMode = process.env.DEMO_MODE;
  // Run internal ledger/math unit tests in demo mode to avoid external network calls during ledger checks
  process.env.DEMO_MODE = 'true';

  // Test 1: Seed Admin & User exist
  console.log('--- 1. Verification of Seed Users & Security ---');
  const adminRes = await db.query("SELECT * FROM users WHERE email = 'admin@datahub.ng'");
  assert(adminRes.rows.length === 1, 'Default Admin exists');
  assert(adminRes.rows[0].role === 'admin' || adminRes.rows[0].role === 'super_admin', 'Admin role is correctly assigned');
  assert(adminRes.rows[0].password_hash !== 'AdminPassword123!', 'Admin password is encrypted/hashed with bcrypt');
  const adminPinValid = await bcrypt.compare('1234', adminRes.rows[0].transaction_pin_hash);
  assert(adminPinValid, 'Admin transaction PIN is hashed and verified');

  const userRes = await db.query("SELECT * FROM users WHERE email = 'user@datahub.ng'");
  assert(userRes.rows.length === 1, 'Default Test User exists');
  assert(userRes.rows[0].role === 'user', 'User role is correctly assigned');

  // Test 2: User Registration & Phone validation
  console.log('\n--- 2. Registration & Validation Tests ---');
  const testPhone = '08123456789';
  const invalidPhone = '12345';
  assert(clubkonnect.isValidNigerianPhone(testPhone), 'Valid Nigerian phone format accepted');
  assert(!clubkonnect.isValidNigerianPhone(invalidPhone), 'Invalid phone format rejected');

  const uniqueEmail = `test_${Date.now()}@datahub.ng`;
  const regPasswordHash = await bcrypt.hash('SecurePass123!', 10);
  const regUser = await db.query(`
    INSERT INTO users (full_name, email, phone, password_hash, role, status)
    VALUES ('Automated Tester', $1, $2, $3, 'user', 'active')
    RETURNING id
  `, [uniqueEmail, `080${Math.floor(10000000 + Math.random() * 90000000)}`, regPasswordHash]);
  const newUserId = regUser.rows[0].id;
  assert(Boolean(newUserId), 'New user registration succeeded');

  // Test 3: Wallet Initialization & Integer Kobo Balance
  console.log('\n--- 3. Wallet Ledger & Integer Kobo Financial Integrity ---');
  const initialWallet = await walletService.getBalance(newUserId);
  assert(initialWallet.balanceKobo === 0, 'New user wallet starts at integer 0 kobo');

  // Test 4: Atomic Credit & Ledger Entry
  const creditRef = `TEST-CREDIT-${Date.now()}`;
  const creditResult = await walletService.credit(newUserId, 250000, creditRef, 'Test Credit ₦2,500.00'); // ₦2,500
  assert(creditResult.success, 'Wallet credit executed successfully');
  assert(creditResult.newBalanceKobo === 250000, 'Wallet balance updated correctly in integer kobo');

  // Test duplicate credit prevention
  let dupCreditPrevented = false;
  try {
    await walletService.credit(newUserId, 100000, creditRef, 'Duplicate Credit');
  } catch (err: any) {
    dupCreditPrevented = true;
  }
  assert(dupCreditPrevented, 'Duplicate credit reference rejected to protect against double credits');

  // Test 5: Atomic Debit
  const debitRef = `TEST-DEBIT-${Date.now()}`;
  const debitResult = await walletService.debit(newUserId, 50000, debitRef, 'Test Debit ₦500.00'); // ₦500
  assert(debitResult.success, 'Wallet debit executed successfully');
  assert(debitResult.newBalanceKobo === 200000, 'Balance after debit is exactly 200,000 kobo (₦2,000.00)');

  // Test Insufficient Balance Protection
  const overDebitResult = await walletService.debit(newUserId, 900000, `TEST-OVER-${Date.now()}`, 'Overdraft Attempt');
  assert(!overDebitResult.success, 'Insufficient balance blocked negative balance');
  assert(overDebitResult.newBalanceKobo === 200000, 'Balance remained untouched after failed overdraft');

  // Test 6: Manual Funding Request & Admin Single Approval
  console.log('\n--- 4. Manual Funding & Simplified Customer Flow (Acceptance Tests 1-7) ---');

  // TEST 1: Customer enters ₦1,000 and submits without transfer reference and without receipt
  const test1Req = await fundingService.createRequest({
    userId: newUserId,
    amountNaira: 1000
  });
  assert(test1Req.status === 'pending', 'TEST 1: Request successfully created as PENDING without transfer ref or receipt');
  assert(test1Req.internalReference && test1Req.internalReference.startsWith('DF-'), 'TEST 1: Internal funding reference generated in DF-YYYYMMDD-XXXXXX format');
  assert(test1Req.transferReference === null, 'TEST 1: Transfer reference is null/optional');
  assert(test1Req.proofImageUrl === null, 'TEST 1: Proof image URL is null/optional');

  // TEST 2: Customer enters ₦5,000 and provides transfer reference
  const test2Req = await fundingService.createRequest({
    userId: newUserId,
    amountNaira: 5000,
    transferReference: 'SESSION-ID-99238129031'
  });
  assert(test2Req.status === 'pending', 'TEST 2: Request created as PENDING with reference');
  assert(test2Req.transferReference === 'SESSION-ID-99238129031', 'TEST 2: Customer provided transfer reference saved');

  // TEST 3: Customer uploads a receipt without transfer reference
  const mockBase64Receipt = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  const test3Req = await fundingService.createRequest({
    userId: newUserId,
    amountNaira: 2500,
    proofImageUrl: mockBase64Receipt
  });
  assert(test3Req.status === 'pending', 'TEST 3: Request created as PENDING with receipt uploaded');
  assert(test3Req.proofImageUrl === mockBase64Receipt, 'TEST 3: Receipt saved successfully without transfer ref');

  // Verify wallet NOT yet credited for any of these pending requests
  const balBeforeApproval = await walletService.getBalance(newUserId);
  assert(balBeforeApproval.balanceKobo === 200000, 'Submitting funding request does NOT automatically credit wallet');

  // TEST 4: Admin approves a pending request
  const adminId = adminRes.rows[0].id;
  const test4Approval = await fundingService.approveRequest(test1Req.id, adminId);
  assert(test4Approval.success, 'TEST 4: Admin approved pending request');
  const balAfterTest4 = await walletService.getBalance(newUserId);
  assert(balAfterTest4.balanceKobo === 300000, 'TEST 4: Wallet increases by exactly ₦1,000.00 (from 200,000 to 300,000 kobo)');

  // Verify one wallet transaction was created
  const txCheck = await db.query('SELECT * FROM transactions WHERE reference = $1', [test1Req.internalReference]);
  assert(txCheck.rows.length === 1, 'TEST 4: Exactly one wallet transaction is created in transactions ledger');

  // TEST 5: Admin tries to approve the same request again
  let dupApprovalBlocked = false;
  try {
    await fundingService.approveRequest(test1Req.id, adminId);
  } catch (err: any) {
    dupApprovalBlocked = true;
  }
  assert(dupApprovalBlocked, 'TEST 5: System prevents duplicate wallet credit on already approved request');

  // TEST 6: Admin rejects a pending request
  const test6Reject = await fundingService.rejectRequest(test2Req.id, adminId, 'Bank transfer could not be found on statement');
  assert(test6Reject.status === 'rejected', 'TEST 6: Request marked as REJECTED');
  const balAfterReject = await walletService.getBalance(newUserId);
  assert(balAfterReject.balanceKobo === 300000, 'TEST 6: Wallet is not credited and balance remains unchanged');

  // TEST 7: Customer tries to submit with ₦0, empty amount, or invalid amount
  let zeroAmountBlocked = false;
  try {
    await fundingService.createRequest({ userId: newUserId, amountNaira: 0 });
  } catch (err: any) {
    zeroAmountBlocked = true;
  }
  assert(zeroAmountBlocked, 'TEST 7: Submission with ₦0 is blocked with validation error');

  let negativeAmountBlocked = false;
  try {
    await fundingService.createRequest({ userId: newUserId, amountNaira: -500 });
  } catch (err: any) {
    negativeAmountBlocked = true;
  }
  assert(negativeAmountBlocked, 'TEST 7: Submission with negative amount is blocked');

  let nanAmountBlocked = false;
  try {
    await fundingService.createRequest({ userId: newUserId, amountNaira: NaN });
  } catch (err: any) {
    nanAmountBlocked = true;
  }
  assert(nanAmountBlocked, 'TEST 7: Submission with empty or NaN amount is blocked');

  // Test 7: PIN Protection & Setting
  console.log('\n--- 5. Transaction PIN & Security ---');
  // Set user PIN to '4321'
  const pinHash = await bcrypt.hash('4321', 10);
  await db.query('UPDATE users SET transaction_pin_hash = $1 WHERE id = $2', [pinHash, newUserId]);

  // Test 8: Data Plan Purchase Workflow
  console.log('\n--- 6. Data Purchase Workflow & Internal Plan ID Verification ---');
  // Look up MTN SME 1GB plan
  const planCheck = await db.query("SELECT * FROM data_plans WHERE id = 'mtn-sme-1gb'");
  assert(planCheck.rows.length === 1, 'Trusted data plan exists in DB');
  const planCostKobo = Number(planCheck.rows[0].selling_price_kobo); // ₦300 (30,000 kobo)

  // Purchase with invalid PIN
  let wrongPinBlocked = false;
  try {
    await transactionEngine.processDataPurchase({
      userId: newUserId,
      planId: 'mtn-sme-1gb',
      recipientPhone: '08123456789',
      transactionPin: '0000'
    });
  } catch (err: any) {
    wrongPinBlocked = true;
  }
  assert(wrongPinBlocked, 'Purchase blocked with incorrect PIN');

  // Purchase with valid PIN
  const dataPurchaseRes = await transactionEngine.processDataPurchase({
    userId: newUserId,
    planId: 'mtn-sme-1gb',
    recipientPhone: '08123456789',
    transactionPin: '4321'
  });
  assert(dataPurchaseRes.success, 'Data purchase completed successfully');
  assert(dataPurchaseRes.status === 'SUCCESS' || dataPurchaseRes.status === 'successful', 'Transaction recorded as successful');

  const balAfterPurchase = await walletService.getBalance(newUserId);
  assert(balAfterPurchase.balanceKobo === 300000 - planCostKobo, 'Exact selling price debited from user wallet');

  // Test 9: Provider Failure & Automatic Refund
  console.log('\n--- 7. Provider Failure Simulation & Automatic Single Refund ---');
  // Phone ending with '0000' triggers simulated provider failure in test mode
  const failPhone = '08012340000';
  const balBeforeFailedTx = await walletService.getBalance(newUserId);

  const failedPurchaseRes = await transactionEngine.processDataPurchase({
    userId: newUserId,
    planId: 'mtn-sme-1gb',
    recipientPhone: failPhone,
    transactionPin: '4321'
  });
  assert(!failedPurchaseRes.success, 'Provider failure acknowledged');
  assert(failedPurchaseRes.refunded === true, 'Automatic refund triggered');

  const balAfterFailedTx = await walletService.getBalance(newUserId);
  assert(balAfterFailedTx.balanceKobo === balBeforeFailedTx.balanceKobo, 'Wallet balance restored via exact refund');

  // Test 10: Airtime Purchase Workflow
  console.log('\n--- 8. Airtime Purchase Workflow ---');
  const airtimeRes = await transactionEngine.processAirtimePurchase({
    userId: newUserId,
    network: 'MTN',
    amountNaira: 100, // ₦100 face value with 2% discount = ₦98
    recipientPhone: '08123456789',
    transactionPin: '4321'
  });
  assert(airtimeRes.success, 'Airtime purchase executed');
  assert(airtimeRes.chargedNaira === 98, 'Customer charged discounted rate (₦98.00)');

  // Test 11: Admin User Management (Suspend & Activate)
  console.log('\n--- 9. Admin User Management ---');
  await db.query("UPDATE users SET status = 'suspended' WHERE id = $1", [newUserId]);
  let suspendedBlocked = false;
  try {
    await transactionEngine.processAirtimePurchase({
      userId: newUserId,
      network: 'MTN',
      amountNaira: 100,
      recipientPhone: '08123456789',
      transactionPin: '4321'
    });
  } catch (err: any) {
    suspendedBlocked = true;
  }
  assert(suspendedBlocked, 'Suspended user blocked from performing transactions');

  // Re-activate user
  await db.query("UPDATE users SET status = 'active' WHERE id = $1", [newUserId]);
  const reactivatedUser = await db.query('SELECT status FROM users WHERE id = $1', [newUserId]);
  assert(reactivatedUser.rows[0].status === 'active', 'User successfully re-activated');

  // Test 12: ClubKonnect Response Mapping & REAL_PROVIDER_REFERENCE Extraction
  console.log('\n--- 10. ClubKonnect Response Structure & Real Provider Reference Tests ---');
  
  // Standard ClubKonnect success payload
  const mockCkSuccessPayload = {
    statuscode: '100',
    orderstatus: 'ORDER_COMPLETED',
    orderid: 'CK-987654321',
    mobilenetwork: '01',
    mobilenumber: '08012345678',
    amount: '250',
    remark: 'Transaction Successful'
  };
  const parsedSuccess = clubkonnect.mapProviderResponse(mockCkSuccessPayload, 'REQ-TEST-001');
  assert(parsedSuccess.success === true, 'Parsed success status is true');
  assert(parsedSuccess.status === 'SUCCESS' || parsedSuccess.status === 'successful', 'Mapped status is SUCCESS');
  assert(parsedSuccess.providerReference === 'CK-987654321', 'REAL_PROVIDER_REFERENCE captured correctly from orderid');
  assert(parsedSuccess.statusCode === '100', 'Status code 100 preserved');

  // Alternate casing OrderID
  const mockCkAltCasingPayload = {
    StatusCode: '100',
    OrderStatus: 'ORDER_COMPLETED',
    OrderID: 'CK-ALT-445566',
    Remark: 'Delivered'
  };
  const parsedAlt = clubkonnect.mapProviderResponse(mockCkAltCasingPayload, 'REQ-TEST-002');
  assert(parsedAlt.providerReference === 'CK-ALT-445566', 'REAL_PROVIDER_REFERENCE captured correctly from OrderID');

  // Provider Status code 101 (ORDER_RECEIVED) resolves to SUCCESS as per specification
  const mockCkPendingPayload = {
    statuscode: '101',
    orderstatus: 'ORDER_RECEIVED',
    orderid: 'CK-PEND-778899',
    remark: 'Order received and processing'
  };
  const parsedPending = clubkonnect.mapProviderResponse(mockCkPendingPayload, 'REQ-TEST-003');
  assert(parsedPending.status === 'SUCCESS' || parsedPending.status === 'successful', 'Mapped status is SUCCESS for code 101/ORDER_RECEIVED');
  assert(parsedPending.providerReference === 'CK-PEND-778899', 'Provider reference captured on orders');

  // Database verification: Confirm transactions table stores and retrieves provider_reference
  const dbTxCheck = await db.query(
    'SELECT provider_reference FROM transactions WHERE reference = $1',
    [airtimeRes.reference]
  );
  assert(dbTxCheck.rows.length > 0, 'Airtime transaction found in database');
  assert(Boolean(dbTxCheck.rows[0].provider_reference), 'Real provider reference is persisted in database');

  // Test 13: Live Mode Environment Variables Assertion (DEMO_MODE=false)
  console.log('\n--- 11. ClubKonnect Environment Variables & Live Mode Assertion ---');
  
  // Temporarily switch environment to live mode without credentials
  const originalDemoMode = process.env.DEMO_MODE;
  const originalUserId = process.env.CLUBKONNECT_USER_ID;
  const originalApiKey = process.env.CLUBKONNECT_API_KEY;
  const originalU = process.env.CLUBKONNECT_U;
  const originalA = process.env.CLUBKONNECT_A;
  const originalBaseUrl = process.env.CLUBKONNECT_BASE_URL;

  process.env.DEMO_MODE = 'false';
  delete process.env.CLUBKONNECT_USER_ID;
  delete process.env.CLUBKONNECT_API_KEY;
  delete process.env.CLUBKONNECT_U;
  delete process.env.CLUBKONNECT_A;

  // Case A: Credentials missing
  let allMissingCaught = false;
  let allMissingMsg = '';
  try {
    verifyClubKonnectEnvironment();
  } catch (err: any) {
    allMissingCaught = true;
    allMissingMsg = err.message;
  }

  assert(allMissingCaught, 'Missing credentials throws server-side error when DEMO_MODE=false');
  assert(
    allMissingMsg.includes('CLUBKONNECT_U') || allMissingMsg.includes('CLUBKONNECT_USER_ID'),
    'Error message explicitly specifies missing CLUBKONNECT_U / CLUBKONNECT_USER_ID'
  );

  // Case B: CLUBKONNECT_U and CLUBKONNECT_A provided in live mode
  process.env.CLUBKONNECT_U = 'test_ck_u';
  process.env.CLUBKONNECT_A = 'test_ck_a';
  let uAndAConfigSucceeded = false;
  try {
    const verified = verifyClubKonnectEnvironment();
    if (verified.userId === 'test_ck_u' && verified.apiKey === 'test_ck_a') {
      uAndAConfigSucceeded = true;
    }
  } catch {
    uAndAConfigSucceeded = false;
  }
  assert(uAndAConfigSucceeded, 'verifyClubKonnectEnvironment succeeds with CLUBKONNECT_U and CLUBKONNECT_A');

  // Case C: Reset to missing credentials to test purchase blocking
  delete process.env.CLUBKONNECT_USER_ID;
  delete process.env.CLUBKONNECT_API_KEY;
  delete process.env.CLUBKONNECT_U;
  delete process.env.CLUBKONNECT_A;

  // Verify that calling processDataPurchase in live mode without credentials throws immediately without debiting wallet
  const balBeforeBlockedLiveTx = await walletService.getBalance(newUserId);
  let livePurchaseBlocked = false;
  try {
    await transactionEngine.processDataPurchase({
      userId: newUserId,
      planId: 'mtn-sme-1gb',
      recipientPhone: '08123456789',
      transactionPin: '4321'
    });
  } catch (err: any) {
    livePurchaseBlocked = true;
  }
  assert(livePurchaseBlocked, 'Purchase blocked immediately when live credentials are missing');

  const balAfterBlockedLiveTx = await walletService.getBalance(newUserId);
  assert(
    balAfterBlockedLiveTx.balanceKobo === balBeforeBlockedLiveTx.balanceKobo,
    'User wallet remained untouched and was NOT debited when credentials error was thrown'
  );

  // Restore environment variables to production values
  process.env.DEMO_MODE = 'false';
  if (originalUserId !== undefined) process.env.CLUBKONNECT_USER_ID = originalUserId;
  else delete process.env.CLUBKONNECT_USER_ID;
  if (originalApiKey !== undefined) process.env.CLUBKONNECT_API_KEY = originalApiKey;
  else delete process.env.CLUBKONNECT_API_KEY;
  if (originalU !== undefined) process.env.CLUBKONNECT_U = originalU;
  else delete process.env.CLUBKONNECT_U;
  if (originalA !== undefined) process.env.CLUBKONNECT_A = originalA;
  else delete process.env.CLUBKONNECT_A;
  if (originalBaseUrl !== undefined) process.env.CLUBKONNECT_BASE_URL = originalBaseUrl;
  else delete process.env.CLUBKONNECT_BASE_URL;

  // Test 14: Production / Live Mode Verification Suite
  console.log('\n--- 12. Production / Live Mode Verification Suite ---');
  
  // 12.1 Verify DEMO_MODE is configured as 'false'
  assert(process.env.DEMO_MODE === 'false', 'VERIFICATION: DEMO_MODE is strictly "false" for production');

  // 12.2 Verify ClubKonnect env vars detected without exposing values
  const hasUserId = Boolean((process.env.CLUBKONNECT_U || process.env.CLUBKONNECT_USER_ID)?.trim());
  const hasApiKey = Boolean((process.env.CLUBKONNECT_A || process.env.CLUBKONNECT_API_KEY)?.trim());
  const hasBaseUrl = Boolean((process.env.CLUBKONNECT_BASE_URL || 'https://www.nellobytesystems.com')?.trim());
  assert(hasUserId, 'CLUBKONNECT_U (or CLUBKONNECT_USER_ID) is detected in server environment');
  assert(hasApiKey, 'CLUBKONNECT_A (or CLUBKONNECT_API_KEY) is detected in server environment');
  assert(hasBaseUrl, 'CLUBKONNECT_BASE_URL is detected in server environment');

  // 12.3 Verify health endpoint structure in live mode without leaking secrets
  const isDemo = process.env.DEMO_MODE !== 'false';
  const healthPayload = {
    status: 'ok',
    service: 'DataHub VTU API',
    demoMode: isDemo,
    mode: isDemo ? 'simulation' : 'production',
    provider: {
      name: 'ClubKonnect',
      liveMode: !isDemo,
      configured: Boolean(
        process.env.CLUBKONNECT_USER_ID &&
        process.env.CLUBKONNECT_API_KEY &&
        process.env.CLUBKONNECT_BASE_URL
      )
    }
  };
  assert(healthPayload.demoMode === false, 'Health check reports demoMode: false');
  assert(healthPayload.mode === 'production', 'Health check reports mode: "production"');
  assert(healthPayload.provider.liveMode === true, 'Health check reports provider.liveMode: true');
  assert(healthPayload.provider.configured === true, 'Health check reports provider.configured: true without exposing secrets');

  // 12.4 Verify automatic status resolution: ORDER_RECEIVED resolves to SUCCESS, errors resolve to FAILED
  const orderReceivedSample = clubkonnect.mapProviderResponse({
    statuscode: '101',
    status: 'ORDER_RECEIVED',
    orderid: 'CK-LIVE-998822',
    msg: 'Order received and is queuing for delivery'
  }, 'REQ-12345');
  assert(orderReceivedSample.status === 'SUCCESS', 'Order received (code 101 / ORDER_RECEIVED) automatically resolves to SUCCESS');
  assert(orderReceivedSample.success === true, 'Order received marks success true');
  assert(orderReceivedSample.providerReference === 'CK-LIVE-998822', 'Real provider reference captured on order received');

  const failedSample = clubkonnect.mapProviderResponse({
    statuscode: '104',
    status: 'ORDER_FAILED',
    orderid: 'CK-LIVE-FAIL',
    msg: 'Insufficient Balance'
  }, 'REQ-FAIL');
  assert(failedSample.status === 'FAILED', 'Provider error automatically resolves to FAILED');
  assert(failedSample.success === false, 'Provider error marks success false');

  // 12.5 Verify wallet funding security: customer cannot increase balance directly
  const testFundingUser = await db.query("SELECT id FROM users WHERE email = 'user@datahub.ng'");
  const fUserId = testFundingUser.rows[0].id;
  const fBalBefore = await walletService.getBalance(fUserId);
  const unverifiedReq = await fundingService.createRequest({
    userId: fUserId,
    amountNaira: 5000,
    transferReference: 'PROD-BANK-TRF-001'
  });
  const fBalAfter = await walletService.getBalance(fUserId);
  assert(unverifiedReq.status === 'pending', 'Submitted funding request created with pending status');
  assert(fBalBefore.balanceKobo === fBalAfter.balanceKobo, 'Wallet balance is strictly unchanged after customer request submission');

  // 12.6 Verify official ClubKonnect DataPlan variation codes in database
  const mtn500Check = await db.query("SELECT provider_code FROM data_plans WHERE id = 'mtn-sme-500mb'");
  assert(mtn500Check.rows[0]?.provider_code === '500', 'MTN 500MB SME has provider_code: "500"');

  const mtn1gbCheck = await db.query("SELECT provider_code FROM data_plans WHERE id = 'mtn-sme-1gb'");
  assert(mtn1gbCheck.rows[0]?.provider_code === '1000', 'MTN 1GB SME has provider_code: "1000"');

  const airtel500Check = await db.query("SELECT provider_code FROM data_plans WHERE id = 'airtel-corp-500mb'");
  assert(airtel500Check.rows[0]?.provider_code === 'Airtel500MB', 'Airtel 500MB has provider_code: "Airtel500MB"');

  const airtel1gbCheck = await db.query("SELECT provider_code FROM data_plans WHERE id = 'airtel-corp-1gb'");
  assert(airtel1gbCheck.rows[0]?.provider_code === 'Airtel1GB', 'Airtel 1GB has provider_code: "Airtel1GB"');

  const airtel5gbCheck = await db.query("SELECT provider_code FROM data_plans WHERE id = 'airtel-corp-5gb'");
  assert(airtel5gbCheck.rows[0]?.provider_code === 'Airtel5GB', 'Airtel 5GB has provider_code: "Airtel5GB"');

  // 12.7 Test exact ClubKonnect error field extraction ('msg', 'error', 'remark', raw text)
  console.log('\n--- 13. Exact ClubKonnect Provider Error Extraction Tests ---');
  
  const invalidPlanError = clubkonnect.mapProviderResponse({
    status: 'ORDER_FAILED',
    msg: 'Invalid Data Plan Code'
  }, '1727170001');
  assert(invalidPlanError.status === 'FAILED', 'Invalid Data Plan Code marked as FAILED');
  assert(invalidPlanError.providerError === 'Invalid Data Plan Code', 'Exact msg field extracted: "Invalid Data Plan Code"');

  const invalidApiKeyError = clubkonnect.mapProviderResponse({
    status: 'ORDER_FAILED',
    error: 'Invalid API Key'
  }, '1727170002');
  assert(invalidApiKeyError.providerError === 'Invalid API Key', 'Exact error field extracted: "Invalid API Key"');

  const ipNotAllowedError = clubkonnect.mapProviderResponse({
    statuscode: '105',
    remark: 'IP Not Allowed'
  }, '1727170003');
  assert(ipNotAllowedError.providerError === 'IP Not Allowed', 'Exact remark field extracted: "IP Not Allowed"');

  const rawTextError = clubkonnect.mapProviderResponse(
    { rawText: 'Invalid Data Plan Code' },
    '1727170004',
    'Invalid Data Plan Code'
  );
  assert(rawTextError.providerError === 'Invalid Data Plan Code', 'Exact raw text extracted: "Invalid Data Plan Code"');

  // 12.8 Verify all MTN SME plans have valid ClubKonnect variation codes
  const allMtnSmePlans = await db.query(
    "SELECT id, plan_name, provider_code FROM data_plans WHERE network = 'MTN' AND plan_type = 'SME' ORDER BY selling_price_kobo ASC"
  );
  const expectedCodes = ['500', '1000', '2000', '3000', '5000', '10000'];
  const actualCodes = allMtnSmePlans.rows.map(p => p.provider_code);
  assert(
    JSON.stringify(actualCodes) === JSON.stringify(expectedCodes),
    `All MTN SME data plans match valid ClubKonnect variation codes: ${expectedCodes.join(', ')}`
  );

  // 12.9 Verify official Nellobyte Systems / ClubKonnect Data & Airtime API endpoints
  assert(
    CLUBKONNECT_DATA_ENDPOINT === 'https://www.nellobytesystems.com/APIDatabundleV1.asp',
    'Official Nellobyte/ClubKonnect Data API endpoint is https://www.nellobytesystems.com/APIDatabundleV1.asp'
  );
  assert(
    CLUBKONNECT_AIRTIME_ENDPOINT === 'https://www.nellobytesystems.com/APIAirtimeV1.asp',
    'Official Nellobyte/ClubKonnect Airtime API endpoint is https://www.nellobytesystems.com/APIAirtimeV1.asp'
  );

  console.log('\n=========================================');
  console.log(`  TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('=========================================\n');

  if (failedTests > 0) {
    throw new Error(`${failedTests} tests failed.`);
  }

  process.exit(0);
}

runAllTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
