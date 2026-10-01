import React from 'react';

interface StandardLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textSize?: 'sm' | 'md' | 'lg';
}

export const StandardLogo: React.FC<StandardLogoProps> = ({
  className = 'w-9 h-9',
  size,
  showText = false,
  textSize = 'md'
}) => {
  const icon = (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none"
      >
        <defs>
          {/* Subtle Outer Border Gradient */}
          <linearGradient id="stdBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
          </linearGradient>

          {/* Dark Glass Container Background */}
          <linearGradient id="stdBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#090d16" />
            <stop offset="100%" stopColor="#06121e" />
          </linearGradient>

          {/* Electric Blue-to-Teal Lightning Bolt Gradient */}
          <linearGradient id="stdBoltGrad" x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#06b6d4" />
            <stop offset="80%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>

          {/* Core Inner Highlight */}
          <linearGradient id="stdHighlightGrad" x1="30%" y1="10%" x2="70%" y2="90%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#67e8f9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>

          {/* Ambient Glow behind the lightning */}
          <radialGradient id="stdAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#090d16" stopOpacity="0" />
          </radialGradient>

          {/* Lightning Filter Glow */}
          <filter id="stdGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Dark Rounded Square Container */}
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="22"
          fill="url(#stdBgGrad)"
          stroke="url(#stdBorderGrad)"
          strokeWidth="2.5"
        />

        {/* Ambient Center Glow */}
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          rx="19"
          fill="url(#stdAura)"
        />

        {/* Glowing Lightning Bolt Shadow/Halo */}
        <path
          d="M56 16L32 50H50L42 84L70 46H52L56 16Z"
          fill="url(#stdBoltGrad)"
          filter="url(#stdGlow)"
          opacity="0.8"
        />

        {/* Crisp Main Lightning Bolt */}
        <path
          d="M56 16L32 50H50L42 84L70 46H52L56 16Z"
          fill="url(#stdBoltGrad)"
          stroke="#ffffff"
          strokeWidth="0.75"
          strokeOpacity="0.6"
          strokeLinejoin="round"
        />

        {/* Internal High-Gloss Reflection */}
        <path
          d="M54 20L36 50H50L45 72L64 48H52L54 20Z"
          fill="url(#stdHighlightGrad)"
          opacity="0.5"
        />
      </svg>
    </div>
  );

  if (!showText) {
    return icon;
  }

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs'
  };

  return (
    <div className="flex items-center gap-2.5 select-none">
      {icon}
      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent ${titleSizes[textSize]}`}>
            Standard DataHub
          </span>
          <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            VTU
          </span>
        </div>
        <p className={`text-slate-400 font-medium ${subtitleSizes[textSize]} mt-0.5`}>
          Instant Data & Airtime
        </p>
      </div>
    </div>
  );
};

export default StandardLogo;
