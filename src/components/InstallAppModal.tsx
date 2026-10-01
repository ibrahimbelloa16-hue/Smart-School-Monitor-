import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';
import { StandardLogo } from './StandardLogo.tsx';
import { 
  Download, 
  Smartphone, 
  Share, 
  PlusSquare, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ExternalLink
} from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  apkUrl?: string | null;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  title = 'Install Standard DataHub App',
  subtitle = 'Get faster 1-tap recharges, instant offline access, and a sleek native mobile experience directly on your device.',
  apkUrl
}) => {
  const { isInstalled, isIOS, canPrompt, triggerInstall } = usePWAInstall();
  const [installState, setInstallState] = useState<'idle' | 'installing' | 'success'>('idle');

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    // If admin provided an APK URL, direct user to download it or trigger native prompt
    if (canPrompt) {
      setInstallState('installing');
      const result = await triggerInstall();
      if (result === 'accepted') {
        setInstallState('success');
        setTimeout(() => {
          onClose();
        }, 1800);
      } else {
        setInstallState('idle');
      }
    } else if (apkUrl) {
      window.location.href = apkUrl;
      onClose();
    }
  };

  const handleDirectApkDownload = () => {
    if (apkUrl) {
      window.location.href = apkUrl;
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-7 shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* App Branding & Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <StandardLogo className="w-16 h-16 shadow-xl rounded-2xl" />
            <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 text-slate-950 rounded-full shadow">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {title}
          </h2>
          <p className="text-xs text-slate-300 mt-1.5 max-w-xs leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* PWA Benefits */}
        <div className="space-y-2.5 mb-6 bg-slate-800/50 border border-slate-700/60 rounded-2xl p-3.5 text-xs text-slate-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant 1-tap launch directly from your home screen</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Fast, lightweight (zero storage bloat, &lt; 2MB)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Secure biometric & 4-digit PIN top-up</span>
          </div>
        </div>

        {/* Installation Instructions / Buttons */}
        {isInstalled ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mb-1">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-emerald-300">App Already Installed!</h3>
            <p className="text-xs text-slate-300">
              You can launch Standard DataHub anytime from your device home screen or app drawer.
            </p>
            <button
              onClick={onClose}
              className="mt-3 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Continue to Dashboard
            </button>
          </div>
        ) : isIOS ? (
          /* iOS Safari Specific Step-by-Step Visual Modal */
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-xs text-slate-200 space-y-3">
              <div className="font-bold text-blue-400 flex items-center gap-1.5 text-sm">
                <Smartphone className="w-4 h-4" />
                <span>How to Install on iPhone / iPad:</span>
              </div>
              
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 bg-slate-850 p-2.5 rounded-xl border border-slate-750">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <span>Tap the <strong className="text-blue-400">Share</strong> icon</span>
                    <span className="inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold text-[11px]">
                      <Share className="w-3 h-3 inline" /> Share
                    </span>
                    <span>at the bottom of your Safari browser bar.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-slate-850 p-2.5 rounded-xl border border-slate-750">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <span>Scroll down the menu and tap</span>
                    <span className="inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold text-[11px]">
                      <PlusSquare className="w-3 h-3 inline" /> Add to Home Screen
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-slate-850 p-2.5 rounded-xl border border-slate-750">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <span>Tap <strong className="text-emerald-400">"Add"</strong> in the top-right corner to complete installation.</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Got It, Done!
            </button>
          </div>
        ) : (
          /* Android Chrome / Standard Prompt */
          <div className="space-y-3">
            {/* If Direct APK link is configured and prioritized */}
            {apkUrl && (
              <button
                onClick={handleDirectApkDownload}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-98"
              >
                <Download className="w-4 h-4 animate-bounce" />
                <span>Download Android APK (.apk)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>
            )}

            {/* Native PWA Prompt Button */}
            {canPrompt ? (
              <button
                onClick={handleInstallClick}
                disabled={installState === 'installing'}
                className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-98 ${
                  apkUrl
                    ? 'bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-100'
                    : 'bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-blue-600/30'
                }`}
              >
                <Download className="w-4 h-4 animate-bounce" />
                <span>
                  {installState === 'installing' ? 'Installing...' : 'Add to Home Screen (Instant App)'}
                </span>
              </button>
            ) : !apkUrl ? (
              <div className="space-y-2">
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center text-xs text-slate-300">
                  <Smartphone className="w-5 h-5 mx-auto mb-1.5 text-teal-400" />
                  <span>
                    Tap your browser menu (<strong>⋮</strong> three dots in Chrome) and select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                  </span>
                </div>
              </div>
            ) : null}

            <button
              onClick={onClose}
              className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Maybe Later
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
