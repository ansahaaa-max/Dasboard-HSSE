import React from 'react';

interface LogoProps {
  className?: string;
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Official PT PLN (Persero) Modern Vector Logo
 * Features the signature bright yellow square box containing the 3 cyan water waves 
 * and the iconic red lightning bolt, alongside the bold cyan-blue 'PLN' wordmark.
 */
export const PlnLogo: React.FC<LogoProps> = ({ className = 'h-9', theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Official PLN Yellow Square Emblem */}
      <svg 
        viewBox="0 0 100 100" 
        className="h-full w-auto aspect-square shrink-0 drop-shadow-sm select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bright Yellow Square Box */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="10"
          fill="#FFE000"
        />

        {/* 3 Cyan / Blue Water Waves (Gelombang Air Biru) */}
        <g stroke="#009BDB" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Top Wave */}
          <path d="M 20 46 Q 33 40, 46 46 T 72 46 T 82 46" />
          {/* Middle Wave */}
          <path d="M 20 57 Q 33 51, 46 57 T 72 57 T 82 57" />
          {/* Bottom Wave */}
          <path d="M 20 68 Q 33 62, 46 68 T 72 68 T 82 68" />
        </g>

        {/* Red Lightning Bolt (Petir Merah) striking through the waves */}
        <polygon
          points="46,16 32,50 47,50 38,84 64,44 48,44"
          fill="#ED1C24"
          stroke="#ED1C24"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>

      {/* Official PLN Cyan-Blue Bold Wordmark */}
      <div className="flex flex-col justify-center leading-none select-none">
        <span 
          className="font-black text-xl sm:text-2xl tracking-tight font-sans text-[#009BDB] dark:text-[#00B4D8]"
          style={{ letterSpacing: '-0.03em' }}
        >
          PLN
        </span>
        <span className={`text-[8.5px] font-bold tracking-wider uppercase mt-0.5 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          UPT MADIUN
        </span>
      </div>
    </div>
  );
};

/**
 * Official BPI Danantara Indonesia Vector Logo (New 2026 Brand Identity)
 * Features the signature bold black 'D' emblem containing the Indonesian Merah-Putih
 * eagle head / wing silhouette, accompanied by the bold 'Danantara Indonesia' typography.
 */
export const DanantaraLogo: React.FC<LogoProps> = ({ className = 'h-9', theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Danantara 'D' Emblem with Red-White Eagle Silhouette */}
      <svg
        viewBox="0 0 100 100"
        className="h-full w-auto aspect-square shrink-0 drop-shadow-sm select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer stylized 'D' shape */}
        <path
          d="M 12 12 C 12 9 15 6 18 6 L 50 6 C 75 6 94 25 94 50 C 94 75 75 94 50 94 L 18 94 C 15 94 12 91 12 88 Z"
          fill={isDark ? '#0F172A' : '#000000'}
          stroke={isDark ? '#FFFFFF' : '#000000'}
          strokeWidth={isDark ? '3' : '0'}
        />

        {/* Red Ribbon / Upper Eagle Wing (Merah) */}
        <path
          d="M 18 50 C 26 40 44 38 72 45 C 55 48 38 51 22 56 Z"
          fill="#E31837"
        />

        {/* White Ribbon / Lower Eagle Head & Beak (Putih) */}
        {/* Forms the eagle head profile and curved beak pointing to the right */}
        <path
          d="M 22 56 C 38 51 55 48 72 45 C 76 46 80 49 80 52 C 80 54 77 55 74 55.5 C 64 64 52 72 38 76 C 30 70 25 63 22 56 Z"
          fill="#FFFFFF"
        />
      </svg>

      {/* Official Danantara Indonesia Typography matching uploaded brand guidelines */}
      <div className="flex flex-col justify-center leading-[1.05] select-none">
        <span 
          className={`font-black text-[13px] sm:text-[14px] tracking-tight font-sans ${
            isDark ? 'text-white' : 'text-black'
          }`}
          style={{ letterSpacing: '-0.025em' }}
        >
          Danantara
        </span>
        <span 
          className={`font-black text-[13px] sm:text-[14px] tracking-tight font-sans ${
            isDark ? 'text-white' : 'text-black'
          }`}
          style={{ letterSpacing: '-0.025em' }}
        >
          Indonesia
        </span>
      </div>
    </div>
  );
};

/**
 * Unified Header Brand Lockup containing Danantara & PLN logos
 */
export const CorporateBrandLockup: React.FC<{ theme?: 'dark' | 'light' }> = ({ theme = 'dark' }) => {
  return (
    <div className="flex items-center gap-3 shrink-0">
      {/* New Danantara Indonesia Logo */}
      <DanantaraLogo className="h-8 sm:h-9" theme={theme} />

      {/* Subtle Vertical Divider */}
      <div 
        className={`h-7 w-px ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}`} 
        aria-hidden="true" 
      />

      {/* Official Modern PLN Logo */}
      <PlnLogo className="h-8 sm:h-9" theme={theme} />
    </div>
  );
};
