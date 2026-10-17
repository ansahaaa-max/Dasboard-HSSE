import React from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  ShieldAlert, 
  Coins, 
  ChevronDown, 
  ChevronRight, 
  Award, 
  HardHat, 
  Flame, 
  Briefcase, 
  Video, 
  Wrench, 
  DoorClosed, 
  Users, 
  PieChart, 
  TrendingUp, 
  CheckCircle2, 
  Moon, 
  Sun, 
  X,
  FileSpreadsheet,
  Droplets,
  MoreHorizontal
} from 'lucide-react';
import { CorporateBrandLockup } from './Logos';
import { MainNavSection, K3Submenu, KeamananSubmenu, AnggaranSubmenu } from '../types/dashboard';

interface SidebarProps {
  currentSection: MainNavSection;
  setCurrentSection: (section: MainNavSection) => void;
  k3Submenu: K3Submenu;
  setK3Submenu: (sub: K3Submenu) => void;
  keamananSubmenu: KeamananSubmenu;
  setKeamananSubmenu: (sub: KeamananSubmenu) => void;
  anggaranSubmenu: AnggaranSubmenu;
  setAnggaranSubmenu: (sub: AnggaranSubmenu) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  onOpenExport: () => void;
  badgeCounts: {
    k3Issues: number;
    keamananIssues: number;
    satpamTotal: number;
    cctvTotal: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  setCurrentSection,
  k3Submenu,
  setK3Submenu,
  keamananSubmenu,
  setKeamananSubmenu,
  anggaranSubmenu,
  setAnggaranSubmenu,
  isOpenMobile,
  setIsOpenMobile,
  theme,
  setTheme,
  onOpenExport,
  badgeCounts,
}) => {
  const isDark = theme === 'dark';

  // Toggle expand state for menus
  const [isK3Expanded, setIsK3Expanded] = React.useState(true);
  const [isKeamananExpanded, setIsKeamananExpanded] = React.useState(true);
  const [isAnggaranExpanded, setIsAnggaranExpanded] = React.useState(true);

  const handleNavClick = (section: MainNavSection) => {
    setCurrentSection(section);
    if (window.innerWidth < 1024) {
      setIsOpenMobile(false);
    }
  };

  const handleSubmenuClick = (section: MainNavSection, action: () => void) => {
    setCurrentSection(section);
    action();
    if (window.innerWidth < 1024) {
      setIsOpenMobile(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 flex flex-col transition-transform duration-300 ease-in-out border-r ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          isDark 
            ? 'bg-slate-900 border-slate-800 text-slate-200' 
            : 'bg-white border-slate-200 text-slate-800 shadow-lg lg:shadow-none'
        }`}
      >
        {/* Brand Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
        }`}>
          <CorporateBrandLockup theme={theme} />
          
          <button
            onClick={() => setIsOpenMobile(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            title="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-header Title Tag */}
        <div className={`px-4 py-2 text-[11px] font-semibold tracking-wider uppercase border-b flex items-center justify-between ${
          isDark ? 'bg-slate-950/40 border-slate-800 text-cyan-400' : 'bg-blue-50/70 border-slate-200 text-blue-800'
        }`}>
          <span>Sistem HSSE UPT Madiun</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
            v2.6
          </span>
        </div>

        {/* Navigation Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 text-sm scrollbar-thin">
          
          {/* 1. DASHBOARD UTAMA */}
          <div>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all ${
                currentSection === 'dashboard'
                  ? isDark 
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/30' 
                    : 'bg-blue-700 text-white shadow-md shadow-blue-200'
                  : isDark 
                    ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white' 
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 shrink-0" />
              <span className="flex-1 text-left">Dashboard Utama</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                currentSection === 'dashboard'
                  ? 'bg-white/20 text-white'
                  : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
              }`}>
                Ringkasan
              </span>
            </button>
          </div>

          {/* 2. MENU K3 */}
          <div className="pt-2">
            <div className="flex items-center justify-between px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Menu A: K3</span>
              </span>
              <button 
                onClick={() => setIsK3Expanded(!isK3Expanded)}
                className="p-1 rounded hover:bg-slate-800/40 text-slate-400"
                title="Buka/Tutup Submenu K3"
              >
                {isK3Expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            </div>

            {isK3Expanded && (
              <div className="space-y-1 mt-1 pl-2">
                {/* Maturity Level K3 */}
                <button
                  onClick={() => handleSubmenuClick('k3', () => setK3Submenu('maturity'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'k3' && k3Submenu === 'maturity'
                      ? isDark ? 'bg-emerald-500/20 text-emerald-400 font-semibold border-l-2 border-emerald-400' : 'bg-emerald-50 text-emerald-800 font-semibold border-l-2 border-emerald-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Award className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span className="flex-1 text-left">1. Maturity Level K3</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400">
                    4.18
                  </span>
                </button>

                {/* APD */}
                <button
                  onClick={() => handleSubmenuClick('k3', () => setK3Submenu('apd'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'k3' && k3Submenu === 'apd'
                      ? isDark ? 'bg-emerald-500/20 text-emerald-400 font-semibold border-l-2 border-emerald-400' : 'bg-emerald-50 text-emerald-800 font-semibold border-l-2 border-emerald-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <HardHat className="w-4 h-4 shrink-0 text-yellow-500" />
                  <span className="flex-1 text-left">2. APD (Alat Pelindung)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    Database
                  </span>
                </button>

                {/* Fire Prevention (APAR) */}
                <button
                  onClick={() => handleSubmenuClick('k3', () => setK3Submenu('fire'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'k3' && k3Submenu === 'fire'
                      ? isDark ? 'bg-rose-500/20 text-rose-400 font-semibold border-l-2 border-rose-400' : 'bg-rose-50 text-rose-800 font-semibold border-l-2 border-rose-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Flame className="w-4 h-4 shrink-0 text-rose-500" />
                  <span className="flex-1 text-left">3. Fire Prevention (APAR)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    APAR
                  </span>
                </button>

                {/* Hydrant (AO & AI) */}
                <button
                  onClick={() => handleSubmenuClick('k3', () => setK3Submenu('hydrant'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'k3' && k3Submenu === 'hydrant'
                      ? isDark ? 'bg-cyan-500/20 text-cyan-400 font-semibold border-l-2 border-cyan-400' : 'bg-cyan-50 text-cyan-800 font-semibold border-l-2 border-cyan-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Droplets className="w-4 h-4 shrink-0 text-cyan-400" />
                  <span className="flex-1 text-left">4. Hydrant (AO & AI)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 font-mono">
                    AO/AI
                  </span>
                </button>

                {/* Program K3 Lainnya */}
                <button
                  onClick={() => handleSubmenuClick('k3', () => setK3Submenu('program'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'k3' && k3Submenu === 'program'
                      ? isDark ? 'bg-emerald-500/20 text-emerald-400 font-semibold border-l-2 border-emerald-400' : 'bg-emerald-50 text-emerald-800 font-semibold border-l-2 border-emerald-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Briefcase className="w-4 h-4 shrink-0 text-blue-400" />
                  <span className="flex-1 text-left">5. Program K3 Lainnya</span>
                  {badgeCounts.k3Issues > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 font-bold">
                      {badgeCounts.k3Issues} kendala
                    </span>
                  )}
                </button>

                {/* Lain-lain */}
                <button
                  onClick={() => handleSubmenuClick('k3', () => setK3Submenu('other'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'k3' && k3Submenu === 'other'
                      ? isDark ? 'bg-violet-500/20 text-violet-400 font-semibold border-l-2 border-violet-400' : 'bg-violet-50 text-violet-800 font-semibold border-l-2 border-violet-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <MoreHorizontal className="w-4 h-4 shrink-0 text-violet-400" />
                  <span className="flex-1 text-left">6. Lain-lain</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. MENU KEAMANAN */}
          <div className="pt-2">
            <div className="flex items-center justify-between px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <span>Menu B: Keamanan</span>
              </span>
              <button 
                onClick={() => setIsKeamananExpanded(!isKeamananExpanded)}
                className="p-1 rounded hover:bg-slate-800/40 text-slate-400"
                title="Buka/Tutup Submenu Keamanan"
              >
                {isKeamananExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            </div>

            {isKeamananExpanded && (
              <div className="space-y-1 mt-1 pl-2">
                {/* Maturity Level Keamanan */}
                <button
                  onClick={() => handleSubmenuClick('keamanan', () => setKeamananSubmenu('maturity'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'keamanan' && keamananSubmenu === 'maturity'
                      ? isDark ? 'bg-cyan-500/20 text-cyan-400 font-semibold border-l-2 border-cyan-400' : 'bg-cyan-50 text-cyan-800 font-semibold border-l-2 border-cyan-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Award className="w-4 h-4 shrink-0 text-cyan-400" />
                  <span className="flex-1 text-left">1. Maturity Level Kam</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400">
                    4.10
                  </span>
                </button>

                {/* Data CCTV */}
                <button
                  onClick={() => handleSubmenuClick('keamanan', () => setKeamananSubmenu('cctv'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'keamanan' && keamananSubmenu === 'cctv'
                      ? isDark ? 'bg-cyan-500/20 text-cyan-400 font-semibold border-l-2 border-cyan-400' : 'bg-cyan-50 text-cyan-800 font-semibold border-l-2 border-cyan-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Video className="w-4 h-4 shrink-0 text-indigo-400" />
                  <span className="flex-1 text-left">2. Data CCTV</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                    {badgeCounts.cctvTotal} Titik
                  </span>
                </button>

                {/* Data Sarpras Keamanan */}
                <button
                  onClick={() => handleSubmenuClick('keamanan', () => setKeamananSubmenu('sarpras'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'keamanan' && keamananSubmenu === 'sarpras'
                      ? isDark ? 'bg-cyan-500/20 text-cyan-400 font-semibold border-l-2 border-cyan-400' : 'bg-cyan-50 text-cyan-800 font-semibold border-l-2 border-cyan-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Wrench className="w-4 h-4 shrink-0 text-amber-400" />
                  <span className="flex-1 text-left">3. Data Sarpras Keamanan</span>
                </button>

                {/* Data Portal */}
                <button
                  onClick={() => handleSubmenuClick('keamanan', () => setKeamananSubmenu('portal'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'keamanan' && keamananSubmenu === 'portal'
                      ? isDark ? 'bg-cyan-500/20 text-cyan-400 font-semibold border-l-2 border-cyan-400' : 'bg-cyan-50 text-cyan-800 font-semibold border-l-2 border-cyan-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <DoorClosed className="w-4 h-4 shrink-0 text-purple-400" />
                  <span className="flex-1 text-left">4. Data Portal Gerbang</span>
                </button>

                {/* Data Satpam */}
                <button
                  onClick={() => handleSubmenuClick('keamanan', () => setKeamananSubmenu('satpam'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'keamanan' && keamananSubmenu === 'satpam'
                      ? isDark ? 'bg-cyan-500/20 text-cyan-400 font-semibold border-l-2 border-cyan-400' : 'bg-cyan-50 text-cyan-800 font-semibold border-l-2 border-cyan-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-4 h-4 shrink-0 text-blue-400" />
                  <span className="flex-1 text-left">5. Data Personel Satpam</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400">
                    {badgeCounts.satpamTotal} Satpam
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* 4. MENU ANGGARAN */}
          <div className="pt-2">
            <div className="flex items-center justify-between px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Menu C: Anggaran</span>
              </span>
              <button 
                onClick={() => setIsAnggaranExpanded(!isAnggaranExpanded)}
                className="p-1 rounded hover:bg-slate-800/40 text-slate-400"
                title="Buka/Tutup Submenu Anggaran"
              >
                {isAnggaranExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            </div>

            {isAnggaranExpanded && (
              <div className="space-y-1 mt-1 pl-2">
                {/* Semua Anggaran */}
                <button
                  onClick={() => handleSubmenuClick('anggaran', () => setAnggaranSubmenu('all'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'anggaran' && anggaranSubmenu === 'all'
                      ? isDark ? 'bg-amber-500/20 text-amber-400 font-semibold border-l-2 border-amber-400' : 'bg-amber-50 text-amber-800 font-semibold border-l-2 border-amber-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <PieChart className="w-4 h-4 shrink-0 text-amber-400" />
                  <span className="flex-1 text-left">Ikhtisar Anggaran</span>
                </button>

                {/* 1. Anggaran K3 */}
                <button
                  onClick={() => handleSubmenuClick('anggaran', () => setAnggaranSubmenu('k3'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'anggaran' && anggaranSubmenu === 'k3'
                      ? isDark ? 'bg-amber-500/20 text-amber-400 font-semibold border-l-2 border-amber-400' : 'bg-amber-50 text-amber-800 font-semibold border-l-2 border-amber-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span className="flex-1 text-left">1. Anggaran K3</span>
                </button>

                {/* 2. Anggaran Keamanan */}
                <button
                  onClick={() => handleSubmenuClick('anggaran', () => setAnggaranSubmenu('keamanan'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'anggaran' && anggaranSubmenu === 'keamanan'
                      ? isDark ? 'bg-amber-500/20 text-amber-400 font-semibold border-l-2 border-amber-400' : 'bg-amber-50 text-amber-800 font-semibold border-l-2 border-amber-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 shrink-0 text-cyan-400" />
                  <span className="flex-1 text-left">2. Anggaran Keamanan</span>
                </button>

                {/* 3. Rencana Anggaran */}
                <button
                  onClick={() => handleSubmenuClick('anggaran', () => setAnggaranSubmenu('rencana'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'anggaran' && anggaranSubmenu === 'rencana'
                      ? isDark ? 'bg-amber-500/20 text-amber-400 font-semibold border-l-2 border-amber-400' : 'bg-amber-50 text-amber-800 font-semibold border-l-2 border-amber-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 shrink-0 text-blue-400" />
                  <span className="flex-1 text-left">3. Rencana (Pagu)</span>
                </button>

                {/* 4. Realisasi Anggaran */}
                <button
                  onClick={() => handleSubmenuClick('anggaran', () => setAnggaranSubmenu('realisasi'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'anggaran' && anggaranSubmenu === 'realisasi'
                      ? isDark ? 'bg-amber-500/20 text-amber-400 font-semibold border-l-2 border-amber-400' : 'bg-amber-50 text-amber-800 font-semibold border-l-2 border-amber-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span className="flex-1 text-left">4. Realisasi</span>
                </button>

                {/* 5. Sisa Anggaran */}
                <button
                  onClick={() => handleSubmenuClick('anggaran', () => setAnggaranSubmenu('sisa'))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentSection === 'anggaran' && anggaranSubmenu === 'sisa'
                      ? isDark ? 'bg-amber-500/20 text-amber-400 font-semibold border-l-2 border-amber-400' : 'bg-amber-50 text-amber-800 font-semibold border-l-2 border-amber-600'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Coins className="w-4 h-4 shrink-0 text-yellow-400" />
                  <span className="flex-1 text-left">5. Sisa Anggaran</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Panel: Theme Switcher & Export */}
        <div className={`p-3.5 border-t space-y-2.5 ${
          isDark ? 'border-slate-800 bg-slate-950/70' : 'border-slate-200 bg-slate-50'
        }`}>
          {/* Quick Print/Export Button */}
          <button
            onClick={onOpenExport}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700' 
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            <span>Cetak / Ekspor Rekap</span>
          </button>

          {/* Theme Switcher Segmented Control */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Tampilan Mode:</span>
            <div className={`inline-flex rounded-lg p-0.5 border ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-200 border-slate-300'
            }`}>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  isDark ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Beralih ke Mode Gelap"
              >
                <Moon className="w-3 h-3" />
                <span>Gelap</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  !isDark ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Beralih ke Mode Terang"
              >
                <Sun className="w-3 h-3 text-amber-500" />
                <span>Terang</span>
              </button>
            </div>
          </div>

          {/* User Profile Stamp */}
          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/40">
            <div>
              <p className="font-semibold text-slate-300">Posko K3L & Kam</p>
              <p className="text-[10px] text-slate-400">Team Leader Lapangan</p>
            </div>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" title="Koneksi Live" />
          </div>
        </div>

      </aside>
    </>
  );
};
