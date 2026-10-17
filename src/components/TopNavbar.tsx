import React from 'react';
import { 
  Menu, 
  Search, 
  MapPin, 
  Bell, 
  Plus, 
  RefreshCw, 
  Moon, 
  Sun, 
  FileSpreadsheet,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { MainNavSection, K3Submenu, KeamananSubmenu, AnggaranSubmenu, ULTGLocation } from '../types/dashboard';

interface TopNavbarProps {
  currentSection: MainNavSection;
  k3Submenu: K3Submenu;
  keamananSubmenu: KeamananSubmenu;
  anggaranSubmenu: AnggaranSubmenu;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenMobileSidebar: () => void;
  onOpenNewItem: () => void;
  onOpenExport: () => void;
  onOpenNotifications: () => void;
  notificationCount: number;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  isSimulating: boolean;
  setIsSimulating: (sim: boolean) => void;
  lastSyncTime: string;
}

export const ALL_LOCATIONS: string[] = [
  'Semua Lokasi (UPT Madiun)',
  'Kantor UPT Madiun',
  'GI 150 kV Manisrejo',
  'GI 150 kV Dolopo',
  'GI 150 kV Ponorogo',
  'GI 150 kV Pacitan',
  'GI 150 kV Ngawi',
  'GITET 500 kV Ngawi',
  'GI 150 kV Magetan',
  'GI 150 kV Caruban',
  'GI 150 kV Trenggalek',
];

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentSection,
  k3Submenu,
  keamananSubmenu,
  anggaranSubmenu,
  selectedLocation,
  setSelectedLocation,
  searchQuery,
  setSearchQuery,
  onOpenMobileSidebar,
  onOpenNewItem,
  onOpenExport,
  onOpenNotifications,
  notificationCount,
  theme,
  setTheme,
  isSimulating,
  setIsSimulating,
  lastSyncTime,
}) => {
  const isDark = theme === 'dark';

  // Compute breadcrumb title
  const getSectionTitle = () => {
    switch (currentSection) {
      case 'dashboard':
        return { group: 'Beranda', name: 'Dashboard Utama HSSE' };
      case 'k3':
        const k3Names: Record<K3Submenu, string> = {
          maturity: '1. Maturity Level K3',
          apd: '2. Database APD',
          fire: '3. Fire Prevention (APAR)',
          hydrant: '4. Sistem & Pekerjaan Hydrant (AO/AI)',
          program: '5. Program K3 Lainnya',
        };
        return { group: 'Menu K3', name: k3Names[k3Submenu] };
      case 'keamanan':
        const secNames: Record<KeamananSubmenu, string> = {
          maturity: '1. Maturity Level Keamanan',
          cctv: '2. Data CCTV Wilayah',
          sarpras: '3. Data Sarpras Keamanan',
          portal: '4. Data Portal Gerbang',
          satpam: '5. Data Personel Satpam',
        };
        return { group: 'Menu Keamanan', name: secNames[keamananSubmenu] };
      case 'anggaran':
        const angNames: Record<AnggaranSubmenu, string> = {
          all: 'Ikhtisar Seluruh Anggaran',
          k3: '1. Anggaran K3',
          keamanan: '2. Anggaran Keamanan',
          rencana: '3. Rencana Anggaran (Pagu)',
          realisasi: '4. Realisasi Anggaran',
          sisa: '5. Sisa Anggaran',
        };
        return { group: 'Menu Anggaran', name: angNames[anggaranSubmenu] };
      default:
        return { group: 'Sistem HSSE', name: 'Monitoring' };
    }
  };

  const currentInfo = getSectionTitle();

  return (
    <header className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
      isDark 
        ? 'bg-slate-900/90 border-slate-800 text-slate-100' 
        : 'bg-white/90 border-slate-200 text-slate-900 shadow-xs'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Page Title Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileSidebar}
            className={`lg:hidden p-2 rounded-lg border transition-colors ${
              isDark 
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' 
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-black'
            }`}
            title="Buka Menu Navigasi"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="font-semibold text-cyan-600 dark:text-cyan-400">PLN UPT Madiun</span>
              <span>/</span>
              <span className="truncate">{currentInfo.group}</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight truncate flex items-center gap-2">
              <span>{currentInfo.name}</span>
            </h1>
          </div>
        </div>

        {/* Center / Right: Filters, Search, and Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Location Selector Filter */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors">
            <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className={`bg-transparent outline-none cursor-pointer font-medium pr-1 text-xs ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              {ALL_LOCATIONS.map((loc) => (
                <option key={loc} value={loc} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Live Search Input */}
          <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs ${
            isDark 
              ? 'bg-slate-800/80 border-slate-700 text-slate-200 focus-within:border-cyan-500' 
              : 'bg-slate-50 border-slate-300 text-slate-800 focus-within:border-blue-500'
          }`}>
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari data, peralatan, PIC..."
              className="bg-transparent outline-none text-xs w-36 lg:w-48 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-200 text-xs px-1"
                title="Hapus pencarian"
              >
                ✕
              </button>
            )}
          </div>

          {/* Telemetry Status Indicator */}
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              isSimulating
                ? isDark 
                  ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80' 
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : isDark
                  ? 'bg-slate-800/60 text-slate-400 border-slate-700'
                  : 'bg-slate-100 text-slate-600 border-slate-300'
            }`}
            title="Klik untuk mematikan/mengaktifkan simulasi real-time"
          >
            <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            <span>Sync: {lastSyncTime}</span>
          </button>

          {/* Notifications / Alerts Button */}
          <button
            onClick={onOpenNotifications}
            className={`relative p-2 rounded-lg border transition-colors ${
              isDark 
                ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700' 
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-black hover:bg-slate-200'
            }`}
            title="Notifikasi Pekerjaan Terkendala & Pemeliharaan Jatuh Tempo"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-xs">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Theme Quick Switcher in Navbar */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2 rounded-lg border transition-colors ${
              isDark 
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
            title={`Beralih ke mode ${isDark ? 'terang' : 'gelap'}`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Tombol Tambah Data (+ Button) */}
          <button
            onClick={onOpenNewItem}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm transition-all ${
              isDark 
                ? 'bg-cyan-600 hover:bg-cyan-500 active:scale-95' 
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Tambah Data</span>
          </button>

        </div>

      </div>

      {/* Mobile Location Selector Bar */}
      <div className="md:hidden px-4 py-2 border-t flex items-center justify-between text-xs gap-2 overflow-x-auto bg-slate-950/20">
        <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
          <MapPin className="w-3.5 h-3.5 text-cyan-500" />
          <span>Lokasi:</span>
        </div>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className={`bg-transparent outline-none font-medium text-xs truncate ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          }`}
        >
          {ALL_LOCATIONS.map((loc) => (
            <option key={loc} value={loc} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
              {loc}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};
