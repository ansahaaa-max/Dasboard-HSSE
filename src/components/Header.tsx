import React from 'react';
import { ShieldCheck, AlertOctagon, FileSpreadsheet, RefreshCw, PhoneCall, Moon, Sun } from 'lucide-react';
import { CorporateBrandLockup } from './Logos';

interface HeaderProps {
  activeTab: 'monitoring' | 'hydrant' | 'compliance' | 'incidents' | 'rules';
  setActiveTab: (tab: 'monitoring' | 'hydrant' | 'compliance' | 'incidents' | 'rules') => void;
  onOpenNewJob: () => void;
  onOpenNewIncident: () => void;
  onOpenExport: () => void;
  isSimulating: boolean;
  setIsSimulating: (val: boolean | ((prev: boolean) => boolean)) => void;
  lastSyncTime: string;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewJob,
  onOpenNewIncident,
  onOpenExport,
  isSimulating,
  setIsSimulating,
  lastSyncTime,
  theme,
  setTheme,
}) => {
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
      isDark ? 'bg-slate-900/95 border-slate-800 text-white' : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">
        
        {/* Zone 1: Danantara & PLN Official Corporate Brand Lockup */}
        <CorporateBrandLockup theme={theme} />

        {/* Zone 2: Navigation Links with Theme Toggle placed right next to 'Monitoring Pekerjaan' */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 text-sm font-medium">
          
          {/* Menu 1: Monitoring Pekerjaan */}
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 text-xs sm:text-sm font-semibold ${
              activeTab === 'monitoring'
                ? isDark 
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-sm' 
                  : 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-sm'
                : isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Monitoring Pekerjaan
          </button>

          {/* MENU GELAP DAN TERANG DI SEBELAH MONITORING PEKERJAAN */}
          <div 
            className={`flex items-center p-0.5 rounded-md border whitespace-nowrap shrink-0 text-xs transition-colors ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
            title="Pilih Tampilan Mode Gelap atau Terang"
          >
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${
                isDark
                  ? 'bg-slate-800 text-cyan-300 font-semibold shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Aktifkan Mode Gelap"
            >
              <Moon className="w-3 h-3 text-cyan-400" />
              <span className="hidden sm:inline">Gelap</span>
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${
                !isDark
                  ? 'bg-white text-amber-600 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Aktifkan Mode Terang"
            >
              <Sun className="w-3 h-3 text-amber-500" />
              <span className="hidden sm:inline">Terang</span>
            </button>
          </div>

          {/* Menu 2: Dashboard Hydrant (NEW) */}
          <button
            onClick={() => setActiveTab('hydrant')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 text-xs sm:text-sm font-semibold flex items-center gap-1.5 ${
              activeTab === 'hydrant'
                ? isDark 
                  ? 'bg-rose-950 text-rose-300 border border-rose-800/80 shadow-sm' 
                  : 'bg-rose-50 text-rose-800 border border-rose-200 shadow-sm font-semibold'
                : isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>Dashboard Hydrant (AO/AI)</span>
          </button>

          {/* Menu 3: Grafik Kepatuhan K3 */}
          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 text-xs sm:text-sm ${
              activeTab === 'compliance'
                ? isDark 
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-sm' 
                  : 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-sm font-semibold'
                : isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Grafik Kepatuhan K3
          </button>

          {/* Menu 3: Laporan Insiden */}
          <button
            onClick={() => setActiveTab('incidents')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 text-xs sm:text-sm ${
              activeTab === 'incidents'
                ? isDark 
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-sm' 
                  : 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-sm font-semibold'
                : isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Laporan Insiden
          </button>

          {/* Menu 4: Safety Golden Rules */}
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 text-xs sm:text-sm ${
              activeTab === 'rules'
                ? isDark 
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-sm' 
                  : 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-sm font-semibold'
                : isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Safety Golden Rules
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Mobile Theme Toggle (visible when nav is hidden on small screens) */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`md:hidden p-1.5 rounded-md border text-xs transition-colors ${
              isDark ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
            title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-cyan-600" />}
          </button>

          {/* Live sync / simulation toggle */}
          <button
            onClick={() => setIsSimulating((prev) => !prev)}
            title={isSimulating ? 'Simulasi Real-time Aktif (Klik untuk jeda)' : 'Simulasi Dijeda (Klik untuk mulai)'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono transition-colors border ${
              isSimulating
                ? isDark 
                  ? 'bg-emerald-950/70 border-emerald-800 text-emerald-300' 
                  : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : isDark 
                  ? 'bg-slate-800 border-slate-700 text-slate-400' 
                  : 'bg-slate-100 border-slate-300 text-slate-600'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            <span className="hidden xl:inline">{isSimulating ? 'Live' : 'Paused'}</span>
            <span className="text-[10px] opacity-75 hidden sm:inline">{lastSyncTime}</span>
          </button>

          {/* Quick incident report button */}
          <button
            onClick={onOpenNewIncident}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 border ${
              isDark 
                ? 'text-rose-200 bg-rose-950/80 border-rose-800 hover:bg-rose-900' 
                : 'text-rose-700 bg-rose-50 border-rose-200 hover:bg-rose-100'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">Lapor</span> Insiden
          </button>

          {/* New Permit / Job button */}
          <button
            onClick={onOpenNewJob}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-cyan-600/30"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>+ Izin Kerja</span>
          </button>

          {/* Export Report */}
          <button
            onClick={onOpenExport}
            title="Cetak & Ekspor Rekap HSSE"
            className={`p-1.5 rounded-md transition-colors border ${
              isDark 
                ? 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border-slate-700' 
                : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-300'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-Header Context Bar */}
      <div className={`border-t px-4 sm:px-6 lg:px-8 py-2 transition-colors ${
        isDark ? 'bg-slate-950/80 border-slate-800/80' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2">
            <span className={`font-semibold uppercase tracking-wider text-[11px] ${
              isDark ? 'text-amber-400' : 'text-amber-600'
            }`}>
              BPI Danantara &middot; PT PLN (Persero) UIT JBM
            </span>
            <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-300'}>·</span>
            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              UPT Madiun (Wilayah Kerja: Madiun, Ponorogo, Pacitan, Ngawi)
            </span>
            <span aria-hidden="true" className={`hidden sm:inline ${isDark ? 'text-slate-600' : 'text-slate-300'}`}>·</span>
            <span className={`hidden sm:inline font-medium italic ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
              "Tidak Ada yang Lebih Berharga dari Jiwa Manusia"
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-1.5 font-mono text-[11px] font-semibold ${
              isDark ? 'text-emerald-400' : 'text-emerald-700'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span>ZERO ACCIDENT 2026</span>
            </div>
            <a 
              href="tel:0351462991" 
              className={`flex items-center gap-1 transition-colors ${
                isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PhoneCall className={`w-3 h-3 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <span className="hidden sm:inline">Posko K3 UPT Madiun: (0351) 462-991</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
