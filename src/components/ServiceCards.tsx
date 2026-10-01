import React from 'react';
import { 
  Wifi, 
  PhoneCall, 
  Tv, 
  Zap, 
  Wallet, 
  Trophy, 
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';

interface ServiceCardsProps {
  onSelectService: (service: 'data' | 'airtime' | 'cable' | 'electricity' | 'wallet' | 'betting') => void;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({ onSelectService }) => {
  const services = [
    {
      id: 'data' as const,
      title: 'Mobile Data',
      kicker: 'SME & Corporate Gifting',
      tagline: 'Instant 4G/5G bundles',
      discount: 'From ₦230/GB',
      icon: Wifi,
    },
    {
      id: 'airtime' as const,
      title: 'Airtime Top-Up',
      kicker: 'Instant VTU Recharge',
      tagline: 'MTN, Glo, Airtel, 9mobile',
      discount: '1% Cashback Margin',
      icon: PhoneCall,
    },
    {
      id: 'cable' as const,
      title: 'Cable TV',
      kicker: 'Instant Smartcard Renewal',
      tagline: 'DSTV, GOtv & Startimes',
      discount: 'Zero service fee',
      icon: Tv,
    },
    {
      id: 'electricity' as const,
      title: 'Electricity Token',
      kicker: 'Prepaid & Postpaid Units',
      tagline: 'AEDC, EKEDC, IKEDC, IBEDC',
      discount: 'Instant token SMS',
      icon: Zap,
    },
    {
      id: 'wallet' as const,
      title: 'Wallet Funding',
      kicker: 'Automatic Dedicated Banks',
      tagline: 'Wema, Moniepoint & PalmPay',
      discount: '0% deposit fees',
      icon: Wallet,
    },
    {
      id: 'betting' as const,
      title: 'Betting Top-Up',
      kicker: 'Fast Sportsbook Credits',
      tagline: 'SportyBet, Bet9ja, 1xBet',
      discount: 'Direct User ID credit',
      icon: Trophy,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <button
            key={service.id}
            onClick={() => onSelectService(service.id)}
            className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.99] focus:outline-none overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(16, 185, 129, 0.12))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            {/* Subtle hovering radial glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Top row: Fintech glass icon + Arrow */}
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-900/80 border border-white/10 shadow-lg group-hover:border-blue-500/40 transition-colors">
                {/* SVG linear gradient applied to icon stroke/fill */}
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#electricGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <defs>
                    <linearGradient id="electricGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                  {service.id === 'data' && (
                    <>
                      <path d="M12 20h.01" />
                      <path d="M2 8.82a15 15 0 0 1 20 0" />
                      <path d="M5 12.859a10 10 0 0 1 14 0" />
                      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
                    </>
                  )}
                  {service.id === 'airtime' && (
                    <>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </>
                  )}
                  {service.id === 'cable' && (
                    <>
                      <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
                      <polyline points="17 2 12 7 7 2" />
                    </>
                  )}
                  {service.id === 'electricity' && (
                    <>
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </>
                  )}
                  {service.id === 'wallet' && (
                    <>
                      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                    </>
                  )}
                  {service.id === 'betting' && (
                    <>
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                      <path d="M4 22h16" />
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </>
                  )}
                </svg>
              </div>

              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                {service.tagline}
              </p>
              
              <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-semibold font-mono tracking-tight">
                  {service.discount}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
