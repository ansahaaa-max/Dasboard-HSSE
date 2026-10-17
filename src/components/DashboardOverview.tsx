import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Coins, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Award, 
  Video, 
  Users, 
  Wrench, 
  Flame, 
  ArrowUpRight, 
  ChevronRight, 
  HardHat, 
  TrendingUp,
  Activity,
  Calendar,
  AlertOctagon,
  FileCheck2,
  PieChart
} from 'lucide-react';
import { 
  MaturityOverview, 
  ApdItem, 
  FireEquipmentItem, 
  ProgramK3Item, 
  CctvCamera, 
  SarprasKeamananItem, 
  PortalKeamananItem, 
  SatpamPersonel, 
  AnggaranItem,
  MainNavSection,
  K3Submenu,
  KeamananSubmenu,
  AnggaranSubmenu
} from '../types/dashboard';

interface DashboardOverviewProps {
  maturityK3: MaturityOverview;
  maturityKeamanan: MaturityOverview;
  apdList: ApdItem[];
  fireList: FireEquipmentItem[];
  programK3List: ProgramK3Item[];
  cctvList: CctvCamera[];
  sarprasList: SarprasKeamananItem[];
  portalList: PortalKeamananItem[];
  satpamList: SatpamPersonel[];
  anggaranList: AnggaranItem[];
  onNavigate: (section: MainNavSection, submenu?: string) => void;
  onOpenNewItem: () => void;
  theme: 'dark' | 'light';
  selectedLocation: string;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  maturityK3,
  maturityKeamanan,
  apdList,
  fireList,
  programK3List,
  cctvList,
  sarprasList,
  portalList,
  satpamList,
  anggaranList,
  onNavigate,
  onOpenNewItem,
  theme,
  selectedLocation,
}) => {
  const isDark = theme === 'dark';

  // Filter lists based on selectedLocation if not "Semua Lokasi"
  const isFiltered = selectedLocation && !selectedLocation.startsWith('Semua');
  
  const filteredPrograms = isFiltered 
    ? programK3List.filter(p => p.lokasi === selectedLocation) 
    : programK3List;
    
  const filteredCctv = isFiltered 
    ? cctvList.filter(c => c.lokasi === selectedLocation) 
    : cctvList;

  const filteredFire = isFiltered 
    ? fireList.filter(f => f.lokasi === selectedLocation) 
    : fireList;

  const filteredSarpras = isFiltered 
    ? sarprasList.filter(s => s.lokasi === selectedLocation) 
    : sarprasList;

  const filteredSatpam = isFiltered 
    ? satpamList.filter(s => s.lokasiPenugasan === selectedLocation) 
    : satpamList;

  // 1. KPI K3 COMPUTATIONS
  const totalProgramK3 = filteredPrograms.length;
  const programSelesai = filteredPrograms.filter(p => p.status === 'Selesai').length;
  const programBerjalan = filteredPrograms.filter(p => p.status === 'Sedang Berjalan').length;
  const programTerkendala = filteredPrograms.filter(p => p.status === 'Terkendala').length;
  const pencapaianMaturityK3 = maturityK3.percentageAchievement;

  // 2. KPI KEAMANAN COMPUTATIONS
  const totalCctv = filteredCctv.length;
  const cctvBeroperasi = filteredCctv.filter(c => c.statusOperasional === 'Aktif Online').length;
  const cctvGangguan = filteredCctv.filter(c => c.statusOperasional !== 'Aktif Online').length;
  const totalSarpras = filteredSarpras.reduce((acc, curr) => acc + curr.jumlah, 0);
  const totalSatpam = filteredSatpam.length;
  const satpamAktif = filteredSatpam.filter(s => s.statusAktif === 'Aktif').length;
  const pencapaianMaturityKeamanan = maturityKeamanan.percentageAchievement;
  const totalProgramKeamanan = cctvList.length + sarprasList.length + portalList.length;

  // 3. KPI ANGGARAN COMPUTATIONS
  const totalAnggaranK3 = anggaranList
    .filter(a => a.kategoriUtama === 'K3')
    .reduce((acc, curr) => acc + curr.paguAnggaran, 0);

  const totalAnggaranKeamanan = anggaranList
    .filter(a => a.kategoriUtama === 'Keamanan')
    .reduce((acc, curr) => acc + curr.paguAnggaran, 0);

  const totalPaguGabungan = totalAnggaranK3 + totalAnggaranKeamanan;
  
  const totalRealisasi = anggaranList.reduce((acc, curr) => acc + curr.realisasiAnggaran, 0);
  const totalSisa = totalPaguGabungan - totalRealisasi;
  const persentaseRealisasi = totalPaguGabungan > 0 
    ? Math.round((totalRealisasi / totalPaguGabungan) * 1000) / 10 
    : 0;

  // Format currency
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Find constrained/overdue items
  const itemsWithIssues = [
    ...programK3List.filter(p => p.status === 'Terkendala').map(p => ({
      id: p.id,
      title: p.namaPekerjaan,
      category: 'Program K3',
      location: p.lokasi,
      pic: p.pic,
      detail: p.kendala || 'Pekerjaan membutuhkan tindak lanjut pengawas',
      severity: 'high' as const,
      action: () => onNavigate('k3', 'program')
    })),
    ...cctvList.filter(c => c.statusOperasional !== 'Aktif Online').map(c => ({
      id: c.id,
      title: `${c.namaKamera} (${c.kodeKamera})`,
      category: 'CCTV Gangguan',
      location: c.lokasi,
      pic: c.pic,
      detail: c.keterangan,
      severity: 'medium' as const,
      action: () => onNavigate('keamanan', 'cctv')
    })),
    ...fireList.filter(f => f.statusPemeriksaan === 'Dalam Pemeliharaan' || f.kondisi === 'Perlu Perbaikan').map(f => ({
      id: f.id,
      title: `${f.jenis} - ${f.kodePeralatan}`,
      category: 'Peralatan Fire/Hydrant',
      location: f.lokasi,
      pic: f.pic,
      detail: f.temuanInspeksi || 'Tekanan abnormal / aki perlu penggantian',
      severity: 'medium' as const,
      action: () => onNavigate('k3', 'fire')
    })),
  ];

  return (
    <div className="space-y-6">
      
      {/* Location Filter Alert Banner if active */}
      {isFiltered && (
        <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
          isDark 
            ? 'bg-cyan-950/40 border-cyan-800 text-cyan-300' 
            : 'bg-cyan-50 border-cyan-200 text-cyan-900'
        }`}>
          <div className="flex items-center gap-2">
            <span className="font-bold">Filter Lokasi Aktif:</span>
            <span>Menampilkan data khusus <strong>{selectedLocation}</strong></span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/20">
            Terfilter
          </span>
        </div>
      )}

      {/* Hero Welcome & Executive Status */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-colors ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-slate-800' 
          : 'bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 border-blue-700 text-white'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase bg-yellow-400 text-slate-950">
                ZERO ACCIDENT 2026
              </span>
              <span className="text-xs text-blue-200 font-mono">
                PT PLN (Persero) UPT Madiun
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Executive HSSE Dashboard & Komando Manajemen
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              Monitoring terintegrasi K3, Keselamatan Operasi Ketenagalistrikan, Pengamanan Fisik Obvitnas, dan Realisasi Anggaran di 8 Gardu Induk & Jaringan Transmisi UPT Madiun.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className={`p-3 rounded-xl border text-center ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/10 border-white/20 backdrop-blur-xs'
            }`}>
              <div className="text-[10px] uppercase font-bold text-emerald-400">Jam Kerja Selamat</div>
              <div className="text-lg font-black font-mono text-white">3.095.920</div>
              <div className="text-[10px] text-blue-200">Man-Hours Aman</div>
            </div>

            <div className={`p-3 rounded-xl border text-center ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/10 border-white/20 backdrop-blur-xs'
            }`}>
              <div className="text-[10px] uppercase font-bold text-yellow-400">Hari Tanpa LTI</div>
              <div className="text-lg font-black font-mono text-white">1.428</div>
              <div className="text-[10px] text-blue-200">Hari Nihil Kecelakaan</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: KARTU KPI UTAMA (SESUAI POIN 3 PROMPT) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* KPI K3 CARD */}
        <div className={`rounded-2xl border p-5 flex flex-col justify-between transition-all hover:shadow-md ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">KPI K3 (Keselamatan)</h3>
                  <p className="text-[11px] text-slate-400">Indikator Kinerja K3L</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('k3', 'maturity')}
                className="text-xs text-emerald-500 hover:text-emerald-400 font-semibold flex items-center gap-0.5"
              >
                Detail <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[11px] text-slate-400">Total Program K3</div>
                <div className="text-xl font-bold font-mono text-emerald-500">{totalProgramK3}</div>
                <div className="text-[10px] text-slate-400">Program Terdata</div>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[11px] text-slate-400">Pencapaian Maturity</div>
                <div className="text-xl font-bold font-mono text-cyan-400">{pencapaianMaturityK3}%</div>
                <div className="text-[10px] text-slate-400">Skor {maturityK3.currentLevel} / {maturityK3.targetLevel}</div>
              </div>
            </div>

            <div className="space-y-2 mt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Program Selesai
                </span>
                <span className="font-bold font-mono text-emerald-500">{programSelesai}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  Program Berjalan
                </span>
                <span className="font-bold font-mono text-blue-400">{programBerjalan}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                  Program Terkendala
                </span>
                <span className={`font-bold font-mono ${programTerkendala > 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                  {programTerkendala}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/40">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-slate-400">Progres Kepatuhan K3</span>
              <span className="font-bold font-mono text-emerald-400">92.8%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92.8%' }} />
            </div>
          </div>
        </div>

        {/* KPI KEAMANAN CARD */}
        <div className={`rounded-2xl border p-5 flex flex-col justify-between transition-all hover:shadow-md ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">KPI Keamanan (Obvitnas)</h3>
                  <p className="text-[11px] text-slate-400">Pengamanan Fisik & Satpam</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('keamanan', 'cctv')}
                className="text-xs text-cyan-500 hover:text-cyan-400 font-semibold flex items-center gap-0.5"
              >
                Detail <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[11px] text-slate-400">CCTV Beroperasi</div>
                <div className="text-xl font-bold font-mono text-cyan-400">{cctvBeroperasi} / {totalCctv}</div>
                <div className="text-[10px] text-emerald-400">{Math.round((cctvBeroperasi/Math.max(1, totalCctv))*100)}% Online</div>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[11px] text-slate-400">Maturity Keamanan</div>
                <div className="text-xl font-bold font-mono text-cyan-400">{pencapaianMaturityKeamanan}%</div>
                <div className="text-[10px] text-slate-400">Skor {maturityKeamanan.currentLevel} / {maturityKeamanan.targetLevel}</div>
              </div>
            </div>

            <div className="space-y-2 mt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Video className="w-3.5 h-3.5 text-indigo-400" />
                  CCTV Gangguan
                </span>
                <span className={`font-bold font-mono ${cctvGangguan > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                  {cctvGangguan} Unit
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  Total Sarpras Keamanan
                </span>
                <span className="font-bold font-mono text-slate-200">{totalSarpras} Item</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  Personel Satpam Aktif
                </span>
                <span className="font-bold font-mono text-blue-400">{satpamAktif} / {totalSatpam} Org</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/40">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-slate-400">Kesiapan Pengamanan Fisik</span>
              <span className="font-bold font-mono text-cyan-400">93.1%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '93.1%' }} />
            </div>
          </div>
        </div>

        {/* KPI ANGGARAN CARD */}
        <div className={`rounded-2xl border p-5 flex flex-col justify-between transition-all hover:shadow-md ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">KPI Anggaran (AO & AI)</h3>
                  <p className="text-[11px] text-slate-400">Penyerapan Dana K3 & Kam</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('anggaran', 'all')}
                className="text-xs text-amber-500 hover:text-amber-400 font-semibold flex items-center gap-0.5"
              >
                Detail <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[11px] text-slate-400">Total Pagu (K3+Kam)</div>
                <div className="text-base font-bold font-mono text-amber-400 truncate" title={formatRupiah(totalPaguGabungan)}>
                  {formatRupiah(totalPaguGabungan)}
                </div>
                <div className="text-[10px] text-slate-400">AO + AI Th. 2026</div>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[11px] text-slate-400">Total Realisasi</div>
                <div className="text-base font-bold font-mono text-emerald-400 truncate" title={formatRupiah(totalRealisasi)}>
                  {formatRupiah(totalRealisasi)}
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold">{persentaseRealisasi}% Terserap</div>
              </div>
            </div>

            <div className="space-y-2 mt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Anggaran K3</span>
                <span className="font-mono text-slate-300 font-medium">{formatRupiah(totalAnggaranK3)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Anggaran Keamanan</span>
                <span className="font-mono text-slate-300 font-medium">{formatRupiah(totalAnggaranKeamanan)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Sisa Anggaran Belum Terserap</span>
                <span className="font-bold font-mono text-amber-400">{formatRupiah(totalSisa)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/40">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-slate-400">Rasio Penyerapan Anggaran</span>
              <span className="font-bold font-mono text-amber-400">{persentaseRealisasi}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${persentaseRealisasi}%` }} />
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: GRAFIK & ANALITIK KEPATUHAN & MATURITY LEVEL */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Perkembangan Maturity Level K3 & Keamanan (Visual Comparison) */}
        <div className={`lg:col-span-7 rounded-2xl border p-5 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-sm">Grafik Perkembangan Maturity Level K3 & Keamanan</h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Skala 1.0 - 5.0</span>
          </div>

          <div className="mt-5 space-y-4">
            {/* Bar comparison per period */}
            {maturityK3.historicalScores.map((h, idx) => {
              const secHistorical = maturityKeamanan.historicalScores[idx] || { score: 3.8 };
              return (
                <div key={h.period} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-300">{h.period}</span>
                    <div className="flex items-center gap-3 text-[11px] font-mono">
                      <span className="text-emerald-400">K3: {h.score.toFixed(2)}</span>
                      <span className="text-cyan-400">Kam: {secHistorical.score.toFixed(2)}</span>
                      <span className="text-slate-500">Target: {h.target.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Dual Bar Graphic */}
                  <div className="space-y-1">
                    {/* K3 Bar */}
                    <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden flex">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${(h.score / 5) * 100}%` }} 
                        title={`K3 Score: ${h.score}`}
                      />
                    </div>
                    {/* Keamanan Bar */}
                    <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden flex">
                      <div 
                        className="bg-cyan-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${(secHistorical.score / 5) * 100}%` }} 
                        title={`Keamanan Score: ${secHistorical.score}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend and Note */}
          <div className="mt-6 pt-3 border-t border-slate-800/40 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                Maturity Level K3 (Saat Ini: 4.18)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-cyan-500" />
                Maturity Keamanan (Saat Ini: 4.10)
              </span>
            </div>
            <button 
              onClick={() => onNavigate('k3', 'maturity')}
              className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
            >
              Lihat Evaluasi Indikator & RTL <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Realisasi Anggaran Berjalan (Pagu vs Realisasi) */}
        <div className={`lg:col-span-5 rounded-2xl border p-5 flex flex-col justify-between ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm">Alokasi & Realisasi Anggaran</h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">
                AO & AI 2026
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {/* Item 1: Anggaran K3 */}
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-emerald-400">Anggaran K3 (Operasi & Investasi)</span>
                  <span className="font-mono text-slate-300 font-bold">75.7%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75.7%' }} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Realisasi: Rp 2,07 M</span>
                  <span>Pagu: Rp 2,72 M</span>
                </div>
              </div>

              {/* Item 2: Anggaran Keamanan */}
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-cyan-400">Anggaran Keamanan & Satpam</span>
                  <span className="font-mono text-slate-300 font-bold">82.3%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '82.3%' }} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Realisasi: Rp 2,33 M</span>
                  <span>Pagu: Rp 2,83 M</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/40 flex items-center justify-between text-xs">
            <span className="text-slate-400">Total Sisa Dana: <strong>{formatRupiah(totalSisa)}</strong></span>
            <button
              onClick={() => onNavigate('anggaran', 'realisasi')}
              className="text-amber-400 hover:underline font-semibold"
            >
              Rincian Per Program &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: DAFTAR PEKERJAAN MENDEKATI TARGET & MENGALAMI KENDALA (POIN 3 PROMPT) */}
      {/* ========================================================================= */}
      <div className={`rounded-2xl border p-5 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/40 gap-2">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="font-bold text-sm">Pekerjaan & Peralatan Membutuhkan Perhatian / Terkendala</h3>
              <p className="text-[11px] text-slate-400">Daftar item dengan kendala operasional, jadwal perbaikan, atau jatuh tempo inspeksi</p>
            </div>
          </div>

          <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 self-start sm:self-auto">
            {itemsWithIssues.length} Perlu Tindak Lanjut
          </span>
        </div>

        <div className="mt-4 divide-y divide-slate-800/40">
          {itemsWithIssues.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              Semua program K3 dan peralatan keamanan dalam kondisi siaga normal tanpa kendala.
            </div>
          ) : (
            itemsWithIssues.map((item) => (
              <div 
                key={item.id}
                onClick={item.action}
                className={`py-3.5 px-3 flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-xl transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      {item.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-200">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      &bull; {item.location}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {item.detail}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right text-[11px]">
                    <div className="text-slate-400">PIC Penanggung Jawab</div>
                    <div className="font-semibold text-cyan-400">{item.pic}</div>
                  </div>
                  <button 
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                    title="Lihat Detail & Tindak Lanjut"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
