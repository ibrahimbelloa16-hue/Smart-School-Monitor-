import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../lib/api.ts';
import { useToast } from '../components/Toast.tsx';
import { StandardLogo } from '../components/StandardLogo.tsx';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Gift, 
  ArrowRight, 
  ShieldCheck, 
  KeyRound, 
  RefreshCw, 
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Download
} from 'lucide-react';

interface RegisterPageProps {
  setCurrentTab: (tab: string) => void;
  onRegistrationComplete?: () => void;
  onOpenInstallModal?: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ 
  setCurrentTab,
  onRegistrationComplete,
  onOpenInstallModal
}) => {
  const { login } = useAuth();
  const { showToast } = useToast();

  // Registration step: 'form' or 'otp'
  const [step, setStep] = useState<'form' | 'otp'>('form');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');

  // OTP Fields
  const [otp, setOtp] = useState('');
  const [serverOtp, setServerOtp] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Countdown timer for Resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Full name is required.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    const cleanPhone = phone.replace(/[\s\-\+]/g, '');
    if (!/^0[789][01]\d{8}$/.test(cleanPhone) && !/^234[789][01]\d{8}$/.test(cleanPhone)) {
      setError('Please enter a valid 11-digit Nigerian phone number (e.g. 08012345678).');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiRequest<{
        success: boolean;
        message: string;
        phone: string;
        otp?: string;
      }>('/auth/register-request', {
        method: 'POST',
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: cleanPhone,
          password,
          confirmPassword,
          referralCode: referralCode.trim() || undefined
        })
      });

      if (data.otp) {
        setServerOtp(data.otp);
        // Pre-fill OTP for immediate fast verification
        setOtp(data.otp);
      }
      setCountdown(30);
      setStep('otp');
      showToast('Verification code generated! Please enter your 4-digit OTP.', 'info');
    } catch (err: any) {
      setError(err.message || 'Registration initiation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanOtp = otp.trim();
    if (!/^\d{4}$/.test(cleanOtp)) {
      setError('Please enter the exact 4-digit verification code.');
      return;
    }

    const cleanPhone = phone.replace(/[\s\-\+]/g, '');
    setIsLoading(true);
    try {
      const data = await apiRequest<{
        message: string;
        token: string;
        user: any;
      }>('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({
          phone: cleanPhone,
          otp: cleanOtp
        })
      });

      login(data.token, data.user);
      showToast('Registration complete & account activated! Welcome to Standard DataHub.', 'success');
      if (onRegistrationComplete) {
        onRegistrationComplete();
      }
      setCurrentTab('home');
    } catch (err: any) {
      setError(err.message || 'OTP verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0 || isResending) return;
    setError('');
    setIsResending(true);
    try {
      const cleanPhone = phone.replace(/[\s\-\+]/g, '');
      const data = await apiRequest<{
        success: boolean;
        message: string;
        phone: string;
        otp: string;
      }>('/auth/resend-otp', {
        method: 'POST',
        body: JSON.stringify({ phone: cleanPhone })
      });

      if (data.otp) {
        setServerOtp(data.otp);
        setOtp(data.otp);
      }
      setCountdown(30);
      showToast('New 4-digit OTP generated and dispatched!', 'success');
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 sm:py-10 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* STEP 1: Registration Form */}
        {step === 'form' && (
          <div>
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <StandardLogo className="w-14 h-14" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">Create Account</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Join Standard DataHub for wholesale instant VTU recharge
              </p>

              {onOpenInstallModal && (
                <button
                  type="button"
                  onClick={onOpenInstallModal}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30 text-[11px] font-bold transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-teal-500" />
                  <span>Prefer App? Download / Install to Home Screen</span>
                </button>
              )}
            </div>

            {error && (
              <div className="p-3 mb-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleInitialSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ibrahim Bello"
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ibrahim@domain.com"
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Nigerian Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Nigerian Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08161720895"
                    maxLength={11}
                    className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Password (min 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Referral Code (optional) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Referral Code (Optional)
                </label>
                <div className="relative">
                  <Gift className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="e.g. DH12345"
                    className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 mt-4 hover:scale-[1.01]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Continue to OTP Verification</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentTab('login')}
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Log In
                </button>
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: 4-Digit OTP Verification Screen */}
        {step === 'otp' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Back button */}
            <button
              type="button"
              onClick={() => {
                setError('');
                setStep('form');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Edit Details</span>
            </button>

            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/10">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Verify Your Account
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                We generated a 4-digit verification code for{' '}
                <span className="font-mono font-bold text-slate-900 dark:text-white">{phone}</span>
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium text-center">
                {error}
              </div>
            )}

            {/* Instant verification hint banner */}
            {serverOtp && (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div className="text-xs text-emerald-700 dark:text-emerald-300">
                    Your 4-Digit OTP Code is: <span className="font-mono font-black text-base ml-1 tracking-wider text-emerald-600 dark:text-emerald-400">{serverOtp}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOtp(serverOtp)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-500 transition-colors shrink-0"
                >
                  Auto-Fill
                </button>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Enter 4-Digit OTP
                </label>
                <div className="relative max-w-[200px] mx-auto">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setOtp(val);
                      setError('');
                    }}
                    placeholder="••••"
                    autoFocus
                    className="w-full text-center text-3xl font-mono font-black tracking-[0.5em] bg-slate-50 dark:bg-slate-800 border-2 border-blue-500/40 focus:border-blue-500 rounded-2xl py-3 text-slate-900 dark:text-white focus:outline-none transition-all shadow-inner"
                    required
                  />
                </div>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Please enter the 4 digits to activate your account
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length !== 4}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify & Activate Account</span>
                  </>
                )}
              </button>
            </form>

            {/* Resend OTP Section */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center space-y-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Didn't get the code?
              </div>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={countdown > 0 || isResending}
                className={`text-xs font-bold transition-colors inline-flex items-center gap-1.5 ${
                  countdown > 0
                    ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                    : 'text-blue-600 dark:text-blue-400 hover:underline'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                <span>
                  {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend 4-Digit OTP'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
