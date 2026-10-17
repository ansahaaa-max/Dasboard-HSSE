import React, { useState } from 'react';
import { HydrantProject, BudgetType } from '../types/hydrant';
import { 
  Flame, 
  Search, 
  PlusCircle, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Building2, 
  DollarSign, 
  Layers, 
  LayoutGrid, 
  ListFilter,
  ExternalLink,
  ChevronRight,
  Wrench,
  Download
} from 'lucide-react';
import { DriveFolderSyncModal, DRIVE_FOLDER_URL, DRIVE_FOLDER_ID } from './DriveFolderSyncModal';

interface HydrantDashboardTabProps {
  projects: HydrantProject[];
  onSelectProject: (project: HydrantProject) => void;
  onOpenNewProject: () => void;
  onUpdateAllProjects?: (projects: HydrantProject[]) => void;
  theme?: 'dark' | 'light';
}

export const HydrantDashboardTab: React.FC<HydrantDashboardTabProps> = ({
  projects,
  onSelectProject,
  onOpenNewProject,
  onUpdateAllProjects,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  const [isDriveSyncOpen, setIsDriveSyncOpen] = useState(false);
  const [budgetFilter, setBudgetFilter] = useState<'Semua' | BudgetType>('Semua');
  const [ultgFilter, setUltgFilter] = useState<string>('Semua');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    const matchesBudget = budgetFilter === 'Semua' || p.budgetType === budgetFilter;
    const matchesUltg = ultgFilter === 'Semua' || p.ultg === ultgFilter;
    const matchesStatus = statusFilter === 'Semua' || p.status === statusFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.substationLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.vendorName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBudget && matchesUltg && matchesStatus && matchesSearch;
  });

  // KPI Calculations
  const totalPagu = projects.reduce((acc, p) => acc + p.paguAnggaran, 0);
  const totalRealisasiKeuangan = projects.reduce((acc, p) => acc + p.realisasiKeuangan, 0);
  const percentKeuangan = totalPagu > 0 ? Math.round((totalRealisasiKeuangan / totalPagu) * 100) : 0;

  const totalPaguAI = projects.filter(p => p.budgetType === 'AI').reduce((acc, p) => acc + p.paguAnggaran, 0);
  const totalRealisasiAI = projects.filter(p => p.budgetType === 'AI').reduce((acc, p) => acc + p.realisasiKeuangan, 0);

  const totalPaguAO = projects.filter(p => p.budgetType === 'AO').reduce((acc, p) => acc + p.paguAnggaran, 0);
  const totalRealisasiAO = projects.filter(p => p.budgetType === 'AO').reduce((acc, p) => acc + p.realisasiKeuangan, 0);

  const avgProgresFisik = projects.length > 0
    ? (projects.reduce((acc, p) => acc + p.progresFisik, 0) / projects.length).toFixed(1)
    : '0';

  const avgTargetFisik = projects.length > 0
    ? (projects.reduce((acc, p) => acc + p.targetFisikSdHariIni, 0) / projects.length).toFixed(1)
    : '0';

  const deviasiTotal = (Number(avgProgresFisik) - Number(avgTargetFisik)).toFixed(1);
  const isAheadOverall = Number(deviasiTotal) >= 0;

  const criticalProjects = projects.filter(p => p.deviasiFisik < -2);

  const cardContainerClass = isDark
    ? 'bg-slate-900 border-slate-800 text-white'
    : 'bg-white border-slate-200 text-slate-900 shadow-sm';

  const innerPanelClass = isDark
    ? 'bg-slate-950 border-slate-800'
    : 'bg-slate-50 border-slate-200';

  return (
    <div className="space-y-6">

      {/* Hero Header for Hydrant Dashboard */}
      <div className={`p-6 rounded-2xl border transition-colors ${cardContainerClass}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="p-1 rounded bg-rose-600/20 text-rose-500 font-bold uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-500 fill-current" />
                <span>Fire Protection & Hydrant System</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="font-mono text-cyan-400 font-semibold">BPI DANANTARA &middot; PLN UPT MADIUN</span>
              <span className="text-slate-500">·</span>
              <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Google Drive Folder: {DRIVE_FOLDER_ID}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Dashboard Monitoring Progres Pekerjaan Hydrant (AO & AI)
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Monitoring real-time progres fisik dan realisasi keuangan pekerjaan sistem proteksi kebakaran hydrant, water spray deluge trafo daya, rumah pompa, dan pengadaan selang/nosel di seluruh Gardu Induk UPT Madiun bersumber dari folder Google Drive terverifikasi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Direct Google Drive Folder link */}
            <a
              href={DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-slate-950 border-slate-700 text-cyan-300 hover:text-white hover:bg-slate-800' 
                  : 'bg-slate-100 border-slate-300 text-cyan-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title="Buka Folder Google Drive Data Hydrant UPT Madiun"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>Buka Folder Google Drive</span>
            </a>

            {/* Sync / Import Button */}
            <button
              onClick={() => setIsDriveSyncOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-cyan-950/80 border-cyan-800 text-cyan-300 hover:bg-cyan-900' 
                  : 'bg-cyan-50 border-cyan-300 text-cyan-800 hover:bg-cyan-100'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Sinkron / Impor File Drive</span>
            </button>

            <button
              onClick={onOpenNewProject}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Tambah Proyek Hydrant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main KPI Strip for AO & AI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Total Pagu & Keuangan */}
        <div className={`p-4.5 rounded-xl border transition-colors ${cardContainerClass}`}>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Total Pagu Anggaran Hydrant</span>
            <span className="p-1.5 bg-yellow-950/80 text-yellow-400 border border-yellow-800/60 rounded-md">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold font-mono text-yellow-400 tabular-nums">
              Rp {(totalPagu / 1000000000).toFixed(2)} Miliar
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Realisasi Keuangan: <strong className="text-white font-mono">{percentKeuangan}%</strong></span>
              <span className="font-mono text-cyan-400">Rp {(totalRealisasiKeuangan / 1000000000).toFixed(2)} M</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Anggaran Investasi (AI) */}
        <div className={`p-4.5 rounded-xl border transition-colors ${cardContainerClass}`}>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Anggaran Investasi (AI) Hydrant</span>
            <span className="p-1.5 bg-purple-950 text-purple-300 border border-purple-800/60 rounded-md font-bold font-mono text-xs">
              AI
            </span>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold font-mono text-purple-300 tabular-nums">
              Rp {(totalPaguAI / 1000000000).toFixed(2)} Miliar
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Realisasi AI: <strong className="text-white font-mono">{Math.round((totalRealisasiAI / totalPaguAI) * 100)}%</strong></span>
              <span>4 Paket Deluge/Ring</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Anggaran Operasi (AO) */}
        <div className={`p-4.5 rounded-xl border transition-colors ${cardContainerClass}`}>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Anggaran Operasi (AO) Hydrant</span>
            <span className="p-1.5 bg-emerald-950 text-emerald-300 border border-emerald-800/60 rounded-md font-bold font-mono text-xs">
              AO
            </span>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
              Rp {(totalPaguAO / 1000000000).toFixed(2)} Miliar
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Realisasi AO: <strong className="text-white font-mono">{Math.round((totalRealisasiAO / totalPaguAO) * 100)}%</strong></span>
              <span>4 Paket Pemeliharaan</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Rata-Rata Progres Fisik s.d. 16 Okt 2026 */}
        <div className={`p-4.5 rounded-xl border transition-colors ${cardContainerClass}`}>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Rata-rata Progres Fisik</span>
            <span className="p-1.5 bg-cyan-950 text-cyan-400 border border-cyan-800/60 rounded-md">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono text-cyan-400 tabular-nums">{avgProgresFisik}%</span>
              <span className={`text-xs font-mono font-bold flex items-center gap-0.5 ${
                isAheadOverall ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {isAheadOverall ? `+${deviasiTotal}% Ahead` : `${deviasiTotal}% Behind`}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Rencana: <strong className="text-white font-mono">{avgTargetFisik}%</strong></span>
              <span className="text-emerald-400 font-semibold">{projects.length - criticalProjects.length} On-Track</span>
            </div>
          </div>
        </div>

      </div>

      {/* Filter and Search Controls */}
      <div className={`p-4 rounded-xl border space-y-4 ${cardContainerClass}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari pekerjaan hydrant, Gardu Induk (GI), No. SPK, atau Mitra Kontraktor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border rounded-lg pl-9 pr-4 py-2 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors ${
                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Reset
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <div className={`flex items-center p-1 border rounded-lg ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'}`}>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'cards' ? 'bg-cyan-950 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tampilan Kartu"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'table' ? 'bg-cyan-950 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tampilan Tabel"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Segmented Buttons */}
        <div className={`flex flex-wrap items-center gap-4 pt-2 border-t text-xs ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          
          {/* Budget Type Segment */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Anggaran:</span>
            <div className="flex items-center gap-1">
              {(['Semua', 'AI', 'AO'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBudgetFilter(b)}
                  className={`px-3 py-1 rounded transition-colors font-medium ${
                    budgetFilter === b
                      ? b === 'AI'
                        ? 'bg-purple-950 text-purple-300 border border-purple-700 shadow-sm'
                        : b === 'AO'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700 shadow-sm'
                        : 'bg-cyan-950 text-cyan-300 border border-cyan-800 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {b === 'Semua' ? 'Semua (AO & AI)' : b === 'AI' ? 'Anggaran Investasi (AI)' : 'Anggaran Operasi (AO)'}
                </button>
              ))}
            </div>
          </div>

          <span className="text-slate-700 hidden sm:inline">|</span>

          {/* ULTG Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Unit:</span>
            <div className="flex items-center gap-1 flex-wrap">
              {['Semua', 'ULTG Madiun', 'ULTG Ponorogo', 'ULTG Pacitan', 'ULTG Ngawi'].map((u) => (
                <button
                  key={u}
                  onClick={() => setUltgFilter(u)}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                    ultgFilter === u
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-medium'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filter button if active */}
          {(budgetFilter !== 'Semua' || ultgFilter !== 'Semua' || statusFilter !== 'Semua' || searchQuery) && (
            <button
              onClick={() => {
                setBudgetFilter('Semua');
                setUltgFilter('Semua');
                setStatusFilter('Semua');
                setSearchQuery('');
              }}
              className="text-xs text-rose-400 hover:underline ml-auto"
            >
              Reset Filter
            </button>
          )}

        </div>
      </div>

      {/* Showing count & date banner */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Menampilkan <strong className="text-white font-mono">{filteredProjects.length}</strong> paket pekerjaan hydrant UPT Madiun</span>
        <span className="font-mono text-emerald-400 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Status per 16 Oktober 2026</span>
        </span>
      </div>

      {/* Project Grid / Table */}
      {filteredProjects.length === 0 ? (
        <div className={`p-12 rounded-xl border text-center space-y-3 ${cardContainerClass}`}>
          <Flame className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">Tidak ada pekerjaan hydrant yang cocok</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Silakan ubah filter anggaran (AO/AI), unit ULTG, atau kata kunci pencarian.
          </p>
          <button
            onClick={() => {
              setBudgetFilter('Semua');
              setUltgFilter('Semua');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold text-cyan-400 bg-cyan-950 border border-cyan-800 rounded-lg hover:bg-cyan-900"
          >
            Reset Filter
          </button>
        </div>
      ) : viewMode === 'cards' ? (
        /* Cards View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredProjects.map((project) => {
            const isAhead = project.deviasiFisik >= 0;
            const isAI = project.budgetType === 'AI';

            return (
              <div
                key={project.id}
                className={`p-5 rounded-xl border transition-all flex flex-col justify-between space-y-4 ${cardContainerClass}`}
              >
                <div className="space-y-3">
                  
                  {/* Top Metadata Header */}
                  <div className={`flex flex-wrap items-center justify-between gap-2 text-xs border-b pb-2.5 ${
                    isDark ? 'border-slate-800' : 'border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded font-bold font-mono ${
                        isAI 
                          ? 'bg-purple-950 text-purple-300 border border-purple-800' 
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}>
                        {isAI ? 'Anggaran Investasi (AI)' : 'Anggaran Operasi (AO)'}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="font-mono text-cyan-400 font-semibold">{project.code}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400">{project.ultg}</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      project.status === 'Selesai 100%' 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                        : project.status === 'Kritis / Deviasi Negatif'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Location */}
                  <div>
                    <h4 
                      onClick={() => onSelectProject(project)}
                      className="text-base font-bold text-white hover:text-cyan-300 cursor-pointer transition-colors leading-snug"
                    >
                      {project.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{project.substationLocation}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>Mitra: <strong className="text-slate-200">{project.vendorName}</strong></span>
                    </div>
                  </div>

                  {/* Financial & Physical Metrics Grid */}
                  <div className={`p-3 rounded-lg border grid grid-cols-2 gap-2 text-xs ${innerPanelClass}`}>
                    <div>
                      <span className="text-slate-500 block">Pagu Anggaran ({project.budgetType})</span>
                      <span className="font-mono font-bold text-yellow-400 block mt-0.5">
                        Rp {(project.paguAnggaran / 1000000).toLocaleString('id-ID')} Juta
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Realisasi Keuangan</span>
                      <span className="font-mono font-bold text-white block mt-0.5">
                        Rp {(project.realisasiKeuangan / 1000000).toLocaleString('id-ID')} Jt ({Math.round((project.realisasiKeuangan / project.paguAnggaran) * 100)}%)
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Periode Kontrak</span>
                      <span className="text-slate-300 font-medium block mt-0.5">{project.startDate} - {project.targetCompletionDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Deviasi Jadwal Kurva-S</span>
                      <span className={`font-mono font-bold block mt-0.5 ${
                        isAhead ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {isAhead ? `+${project.deviasiFisik}% (Lebih Cepat)` : `${project.deviasiFisik}% (Keterlambatan)`}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar vs Target Today */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Progres Fisik Aktual vs Rencana s.d. 16 Okt</span>
                      <div className="font-mono text-xs">
                        <strong className="text-cyan-400">{project.progresFisik}%</strong>
                        <span className="text-slate-500"> / Target: </span>
                        <strong className="text-slate-300">{project.targetFisikSdHariIni}%</strong>
                      </div>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden relative">
                      {/* Target Marker */}
                      <div 
                        className="absolute top-0 bottom-0 w-1 bg-yellow-400 z-10" 
                        style={{ left: `${project.targetFisikSdHariIni}%` }}
                      ></div>
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          project.progresFisik >= 100 
                            ? 'bg-emerald-500' 
                            : isAhead 
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-500' 
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${project.progresFisik}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Technical Spec Mini Indicator */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-1">
                    <div className="flex items-center gap-2">
                      <span>Tandon: <strong className="text-white">{project.spec.kapasitasTandonAir}</strong></span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>Tekanan: <strong className="text-emerald-400 font-mono">{project.spec.tekananJaringanSiaga}</strong></span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>Pillar: <strong className="text-white font-mono">{project.spec.jumlahPillarHydrant} Unit</strong></span>
                    </div>
                    {project.spec.delugeTrafoReady && (
                      <span className="text-cyan-400 font-medium">Deluge Trafo Ready</span>
                    )}
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className={`flex items-center justify-between gap-2 pt-3 border-t ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}>
                  <button
                    onClick={() => onSelectProject(project)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    <span>Detail & Milestone S-Curve</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Perbarui Progres
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className={`rounded-xl border overflow-hidden shadow ${cardContainerClass}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b uppercase font-mono text-[11px] ${
                isDark ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                <tr>
                  <th className="py-3 px-4">Kode Proyek</th>
                  <th className="py-3 px-4">Pekerjaan & Lokasi</th>
                  <th className="py-3 px-4 text-center">Tipe</th>
                  <th className="py-3 px-4">Unit ULTG</th>
                  <th className="py-3 px-4 text-right">Pagu Anggaran</th>
                  <th className="py-3 px-4 text-right">Keuangan (%)</th>
                  <th className="py-3 px-4 text-right">Fisik (%)</th>
                  <th className="py-3 px-4 text-right">Deviasi</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className={`divide-y text-slate-300 ${isDark ? 'divide-slate-800' : 'divide-slate-200'}`}>
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono text-cyan-400 font-semibold whitespace-nowrap">
                      {p.code}
                    </td>
                    <td className="py-3 px-4">
                      <div 
                        onClick={() => onSelectProject(p)}
                        className="font-medium text-white hover:text-cyan-300 cursor-pointer max-w-xs truncate"
                        title={p.title}
                      >
                        {p.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                        {p.substationLocation} &middot; {p.vendorName}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded font-bold font-mono text-[10px] ${
                        p.budgetType === 'AI' 
                          ? 'bg-purple-950 text-purple-300 border border-purple-800' 
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}>
                        {p.budgetType}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">{p.ultg}</td>
                    <td className="py-3 px-4 text-right font-mono font-medium whitespace-nowrap text-yellow-400">
                      Rp {(p.paguAnggaran / 1000000).toLocaleString('id-ID')} Jt
                    </td>
                    <td className="py-3 px-4 text-right font-mono whitespace-nowrap">
                      {Math.round((p.realisasiKeuangan / p.paguAnggaran) * 100)}%
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold whitespace-nowrap text-cyan-400">
                      {p.progresFisik}%
                    </td>
                    <td className={`py-3 px-4 text-right font-mono font-semibold whitespace-nowrap ${
                      p.deviasiFisik >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {p.deviasiFisik >= 0 ? `+${p.deviasiFisik}%` : `${p.deviasiFisik}%`}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        p.status === 'Selesai 100%' 
                          ? 'bg-emerald-950 text-emerald-300' 
                          : p.status === 'Kritis / Deviasi Negatif'
                          ? 'bg-rose-950 text-rose-300'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onSelectProject(p)}
                        className="px-2.5 py-1 text-xs text-cyan-400 hover:text-white bg-slate-800 hover:bg-cyan-900 rounded transition-colors"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Drive Folder Sync / Import Modal */}
      <DriveFolderSyncModal
        isOpen={isDriveSyncOpen}
        onClose={() => setIsDriveSyncOpen(false)}
        onSyncData={(newProjects) => {
          if (onUpdateAllProjects) {
            onUpdateAllProjects(newProjects);
          }
        }}
        currentProjects={projects}
        theme={theme}
      />

    </div>
  );
};
