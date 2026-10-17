import React, { useState } from 'react';
import { 
  Award, 
  HardHat, 
  Flame, 
  Briefcase, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  UserCheck, 
  Wrench, 
  AlertOctagon, 
  Download, 
  Edit3, 
  Trash2,
  FileText,
  MoreHorizontal
} from 'lucide-react';
import { 
  MaturityOverview, 
  ApdItem, 
  FireEquipmentItem, 
  ProgramK3Item, 
  K3Submenu,
  ULTGLocation 
} from '../types/dashboard';

interface K3ViewProps {
  submenu: K3Submenu;
  setSubmenu: (sub: K3Submenu) => void;
  maturityK3: MaturityOverview;
  apdList: ApdItem[];
  fireList: FireEquipmentItem[];
  programList: ProgramK3Item[];
  onOpenAddModal: (type: 'apd' | 'fire' | 'program' | 'indicator') => void;
  onEditItem?: (type: string, item: any) => void;
  onDeleteItem?: (type: string, id: string) => void;
  searchQuery: string;
  selectedLocation: string;
  theme: 'dark' | 'light';
}

export const K3View: React.FC<K3ViewProps> = ({
  submenu,
  setSubmenu,
  maturityK3,
  apdList,
  fireList,
  programList,
  onOpenAddModal,
  onEditItem,
  onDeleteItem,
  searchQuery,
  selectedLocation,
  theme,
}) => {
  const isDark = theme === 'dark';

  // Local filter for sub-tabs
  const [apdFilterCategory, setApdFilterCategory] = useState<string>('Semua');
  const [apdFilterStatus, setApdFilterStatus] = useState<string>('Semua');
  const [fireFilterType, setFireFilterType] = useState<string>('Semua');
  const [programFilterStatus, setProgramFilterStatus] = useState<string>('Semua');

  const isLocationFiltered = selectedLocation && !selectedLocation.startsWith('Semua');

  // Filter helper functions
  const filterByLoc = <T extends { lokasi?: string }>(items: T[]): T[] => {
    if (!isLocationFiltered) return items;
    return items.filter(it => it.lokasi === selectedLocation);
  };

  // ==========================================
  // TAB 1: MATURITY LEVEL K3
  // ==========================================
  const renderMaturityLevel = () => {
    const unfulfilled = maturityK3.indicators.filter(i => i.status !== 'Memenuhi');

    return (
      <div className="space-y-6">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-xs text-slate-400">Skor Maturity Saat Ini</div>
            <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
              {maturityK3.currentLevel.toFixed(2)}
            </div>
            <div className="text-xs text-slate-400 mt-1">Target Skala 1.0 - 5.0</div>
          </div>

          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-xs text-slate-400">Target Maturity Level 2026</div>
            <div className="text-3xl font-extrabold font-mono text-cyan-400 mt-1">
              {maturityK3.targetLevel.toFixed(2)}
            </div>
            <div className="text-xs text-slate-400 mt-1">Kategori Proaktif / Generatif</div>
          </div>

          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-xs text-slate-400">Pencapaian Target (%)</div>
            <div className="text-3xl font-extrabold font-mono text-yellow-400 mt-1">
              {maturityK3.percentageAchievement}%
            </div>
            <div className="text-xs text-slate-400 mt-1">Tingkat Pemenuhan Kriteria</div>
          </div>

          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-xs text-slate-400">Status Pemenuhan Indikator</div>
            <div className="text-3xl font-extrabold font-mono text-emerald-500 mt-1">
              {maturityK3.fulfilledIndicators} / {maturityK3.totalIndicators}
            </div>
            <div className="text-xs text-rose-400 mt-1">{unfulfilled.length} Indikator Belum Terpenuhi</div>
          </div>
        </div>

        {/* Progress Bar & Historical Chart */}
        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/40 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-100">Grafik Perkembangan Maturity Level K3 (Historis)</h3>
              <p className="text-xs text-slate-400">Peningkatan budaya keselamatan kerja UPT Madiun dari tahun ke tahun</p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Target 2026: Level 4.50
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {maturityK3.historicalScores.map((item) => (
              <div key={item.period} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-200">{item.period}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-emerald-400">Capaian: {item.score.toFixed(2)}</span>
                    <span className="text-slate-400">Target: {item.target.toFixed(2)}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden flex">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-700" 
                    style={{ width: `${(item.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indikator Belum Terpenuhi & Rencana Tindak Lanjut (RTL) */}
        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/40 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-100">Daftar Indikator K3 & Rencana Tindak Lanjut (RTL)</h3>
              <p className="text-xs text-slate-400">Detail kesenjangan (gap) indikator, PIC penanggung jawab, dan tenggat waktu perbaikan</p>
            </div>
            <button
              onClick={() => onOpenAddModal('indicator')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Indikator</span>
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b text-[11px] uppercase tracking-wider ${
                isDark ? 'border-slate-800 text-slate-400 bg-slate-950/40' : 'border-slate-200 text-slate-600 bg-slate-50'
              }`}>
                <tr>
                  <th className="py-3 px-3">Kode & Kategori</th>
                  <th className="py-3 px-3">Nama Indikator</th>
                  <th className="py-3 px-3">Skor / Target</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Kesenjangan (Gap) & RTL</th>
                  <th className="py-3 px-3">PIC</th>
                  <th className="py-3 px-3">Target Selesai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-normal">
                {maturityK3.indicators.map((ind) => (
                  <tr key={ind.id} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-mono font-bold text-cyan-400">{ind.id}</div>
                      <div className="text-[10px] text-slate-400">{ind.category}</div>
                    </td>
                    <td className="py-3 px-3 max-w-xs font-medium text-slate-200">
                      {ind.indicator}
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <span className="font-bold text-emerald-400">{ind.currentScore}</span> / {ind.targetScore}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ind.status === 'Memenuhi'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : ind.status === 'Dalam Proses'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {ind.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 max-w-sm space-y-1">
                      <div className="text-[11px] text-slate-300">
                        <strong className="text-slate-400">Temuan:</strong> {ind.gapDescription}
                      </div>
                      <div className="text-[11px] text-cyan-300">
                        <strong className="text-cyan-400">RTL:</strong> {ind.followUpPlan}
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-medium text-slate-300">
                      {ind.pic}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-slate-400">
                      {ind.targetDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // TAB 2: DATABASE APD
  // ==========================================
  const renderApdDatabase = () => {
    let items = filterByLoc(apdList);

    if (apdFilterCategory !== 'Semua') {
      items = items.filter(a => a.jenis === apdFilterCategory);
    }
    if (apdFilterStatus !== 'Semua') {
      items = items.filter(a => a.statusKelayakan === apdFilterStatus);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(a => 
        a.namaApd.toLowerCase().includes(q) || 
        a.lokasi.toLowerCase().includes(q) || 
        a.pic.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
      );
    }

    const categories = [
      'Semua',
      'Pelindung Kepala',
      'Pelindung Jatuh',
      'Pelindung Kaki',
      'Pelindung Tangan Isolasi',
      'Detektor Listrik',
      'Pelindung Mata & Wajah',
      'Pakaian Kerja / Rompi',
    ];

    const totalApdPcs = items.reduce((acc, curr) => acc + curr.jumlah, 0);
    const totalPengadaan = items.reduce((acc, curr) => acc + curr.kebutuhanPengadaan, 0);

    return (
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Jenis APD:</span>
            <select
              value={apdFilterCategory}
              onChange={(e) => setApdFilterCategory(e.target.value)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border outline-none font-medium ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
              }`}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <span className="text-xs font-semibold text-slate-400 ml-2">Status:</span>
            <select
              value={apdFilterStatus}
              onChange={(e) => setApdFilterStatus(e.target.value)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border outline-none font-medium ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
              }`}
            >
              <option value="Semua">Semua Status Kelayakan</option>
              <option value="Layak Pakai">Layak Pakai</option>
              <option value="Perlu Kalibrasi / Uji">Perlu Kalibrasi / Uji</option>
              <option value="Tidak Layak">Tidak Layak</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-400">
              Total: <strong className="text-emerald-400">{totalApdPcs} Unit</strong> ({items.length} Item) &bull; Usulan Ganti: <strong className="text-rose-400">{totalPengadaan} Unit</strong>
            </div>
            <button
              onClick={() => onOpenAddModal('apd')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-yellow-500 hover:bg-yellow-400 text-slate-950 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah APD</span>
            </button>
          </div>
        </div>

        {/* APD Table */}
        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b text-[11px] uppercase tracking-wider ${
                isDark ? 'border-slate-800 text-slate-400 bg-slate-950/40' : 'border-slate-200 text-slate-600 bg-slate-50'
              }`}>
                <tr>
                  <th className="py-3 px-3">ID APD</th>
                  <th className="py-3 px-3">Nama & Jenis APD</th>
                  <th className="py-3 px-3">Lokasi Penyimpanan</th>
                  <th className="py-3 px-3 text-center">Jumlah</th>
                  <th className="py-3 px-3">Kondisi Fisik</th>
                  <th className="py-3 px-3">Status Kelayakan</th>
                  <th className="py-3 px-3">Tgl Periksa / Masa Berlaku</th>
                  <th className="py-3 px-3 text-center">Kebutuhan Pengadaan</th>
                  <th className="py-3 px-3">PIC Penanggung Jawab</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-normal">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-slate-400">
                      Tidak ada data APD yang cocok dengan filter atau pencarian.
                    </td>
                  </tr>
                ) : (
                  items.map((apd) => (
                    <tr key={apd.id} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                      <td className="py-3 px-3 font-mono font-bold text-cyan-400 whitespace-nowrap">
                        {apd.id}
                      </td>
                      <td className="py-3 px-3 max-w-xs">
                        <div className="font-semibold text-slate-100">{apd.namaApd}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{apd.jenis}</div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3 h-3 text-cyan-500" />
                          <span>{apd.lokasi}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-200">
                        {apd.jumlah}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          apd.kondisi === 'Baik' 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {apd.kondisi}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          apd.statusKelayakan === 'Layak Pakai'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : apd.statusKelayakan === 'Perlu Kalibrasi / Uji'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {apd.statusKelayakan}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px]">
                        <div>Periksa: {apd.tanggalPemeriksaan}</div>
                        <div className="text-slate-400">Exp: {apd.masaBerlaku || '-'}</div>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold">
                        {apd.kebutuhanPengadaan > 0 ? (
                          <span className="text-rose-400 px-1.5 py-0.5 rounded bg-rose-500/20">
                            +{apd.kebutuhanPengadaan} Unit
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-slate-300">
                        {apd.pic}
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onEditItem && onEditItem('apd', apd)}
                            className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
                            title="Edit Data APD"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteItem && onDeleteItem('apd', apd.id)}
                            className="p-1 rounded hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                            title="Hapus Data"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // TAB 3: FIRE PREVENTION (APAR & HYDRANT)
  // ==========================================
  const renderFirePrevention = () => {
    let items = filterByLoc(fireList);

    if (fireFilterType !== 'Semua') {
      items = items.filter(f => f.jenis === fireFilterType);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(f => 
        f.kodePeralatan.toLowerCase().includes(q) || 
        f.jenis.toLowerCase().includes(q) || 
        f.lokasi.toLowerCase().includes(q) ||
        f.pic.toLowerCase().includes(q)
      );
    }

    const fireTypes = [
      'Semua',
      'APAR Powder',
      'APAR CO2',
      'APAR Foam',
      'Hydrant Pillar',
      'Pompa Hydrant Diesel',
      'Pompa Hydrant Elektrik',
      'Pompa Jockey',
      'Tandon Air',
      'Deluge System',
    ];

    return (
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Jenis Peralatan:</span>
            <select
              value={fireFilterType}
              onChange={(e) => setFireFilterType(e.target.value)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border outline-none font-medium ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
              }`}
            >
              {fireTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Total: {items.length} Titik Fire Prevention & Hydrant
            </span>
            <button
              onClick={() => onOpenAddModal('fire')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Peralatan Fire</span>
            </button>
          </div>
        </div>

        {/* Fire Equipment Table */}
        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b text-[11px] uppercase tracking-wider ${
                isDark ? 'border-slate-800 text-slate-400 bg-slate-950/40' : 'border-slate-200 text-slate-600 bg-slate-50'
              }`}>
                <tr>
                  <th className="py-3 px-3">Kode Alat</th>
                  <th className="py-3 px-3">Jenis Peralatan</th>
                  <th className="py-3 px-3">Lokasi & Posisi Detail</th>
                  <th className="py-3 px-3 text-center">Jumlah</th>
                  <th className="py-3 px-3">Kondisi</th>
                  <th className="py-3 px-3">Status Uji / Periksa</th>
                  <th className="py-3 px-3">Tgl Periksa & Jadwal Servis</th>
                  <th className="py-3 px-3">Temuan Inspeksi & RTL</th>
                  <th className="py-3 px-3">PIC</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-normal">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-12 px-4 text-center">
                      <div className="max-w-md mx-auto space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20">
                          <Flame className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-100">Data Menu Hydrant Telah Dikosongkan</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Seluruh data hydrant sebelumnya telah dibersihkan. Menu ini sekarang bersih dan siap untuk Anda update dengan data baru.
                        </p>
                        <button
                          type="button"
                          onClick={() => onOpenAddModal('fire')}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md transition-all active:scale-95"
                        >
                          <Plus className="w-4 h-4" />
                          <span>+ Tambah / Input Data Hydrant Baru</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  items.map((fire) => (
                    <tr key={fire.id} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                      <td className="py-3 px-3 font-mono font-bold text-rose-400 whitespace-nowrap">
                        {fire.kodePeralatan}
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-100 whitespace-nowrap">
                        {fire.jenis}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-200">{fire.lokasi}</div>
                        <div className="text-[10px] text-slate-400">{fire.posisiDetail}</div>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-200">
                        {fire.jumlah}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          fire.kondisi === 'Siaga Normal'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {fire.kondisi}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          fire.statusPemeriksaan === 'Lulus Uji'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : fire.statusPemeriksaan === 'Dalam Pemeliharaan'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {fire.statusPemeriksaan}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px]">
                        <div>Diperiksa: {fire.tanggalPemeriksaan}</div>
                        <div className="text-cyan-400">Jadwal: {fire.jadwalPemeliharaanBerikutnya}</div>
                      </td>
                      <td className="py-3 px-3 max-w-xs space-y-1">
                        <div className="text-[11px] text-slate-300">
                          {fire.temuanInspeksi || '-'}
                        </div>
                        {fire.tindakLanjutPerbaikan && (
                          <div className="text-[10px] text-cyan-300">
                            <strong>TL:</strong> {fire.tindakLanjutPerbaikan}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-slate-300">
                        {fire.pic}
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onEditItem && onEditItem('fire', fire)}
                            className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
                            title="Edit Peralatan"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteItem && onDeleteItem('fire', fire.id)}
                            className="p-1 rounded hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                            title="Hapus Data"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // TAB 4: PROGRAM K3 LAINNYA
  // ==========================================
  const renderProgramK3 = () => {
    let items = filterByLoc(programList);

    if (programFilterStatus !== 'Semua') {
      items = items.filter(p => p.status === programFilterStatus);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(p => 
        p.namaPekerjaan.toLowerCase().includes(q) || 
        p.jenisProgram.toLowerCase().includes(q) || 
        p.lokasi.toLowerCase().includes(q) ||
        p.pic.toLowerCase().includes(q)
      );
    }

    return (
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Status Pekerjaan:</span>
            <select
              value={programFilterStatus}
              onChange={(e) => setProgramFilterStatus(e.target.value)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border outline-none font-medium ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
              }`}
            >
              <option value="Semua">Semua Status</option>
              <option value="Selesai">Selesai</option>
              <option value="Sedang Berjalan">Sedang Berjalan</option>
              <option value="Terkendala">Terkendala</option>
              <option value="Direncanakan">Direncanakan</option>
            </select>
          </div>

          <button
            onClick={() => onOpenAddModal('program')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xs self-start md:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Program K3</span>
          </button>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((prg) => (
            <div 
              key={prg.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {prg.jenisProgram}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    prg.status === 'Selesai'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : prg.status === 'Sedang Berjalan'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : prg.status === 'Terkendala'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-slate-500/20 text-slate-400'
                  }`}>
                    {prg.status}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-100 leading-snug">
                  {prg.namaPekerjaan}
                </h4>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                    {prg.lokasi}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {prg.tanggal}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    {prg.pic}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Progres Pekerjaan</span>
                    <span className="font-mono text-cyan-400">{prg.progres}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full ${
                        prg.status === 'Terkendala' ? 'bg-rose-500' : 'bg-cyan-500'
                      }`}
                      style={{ width: `${prg.progres}%` }}
                    />
                  </div>
                </div>

                {/* Kendala & Tindakan Perbaikan */}
                <div className="mt-4 space-y-1.5 text-xs">
                  {prg.kendala && (
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300">
                      <strong>Kendala Lapangan:</strong> {prg.kendala}
                    </div>
                  )}
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                    <strong>Tindakan Perbaikan:</strong> {prg.tindakanPerbaikan}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-800/40 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-400">{prg.id}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditItem && onEditItem('program', prg)}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                    title="Edit Program"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteItem && onDeleteItem('program', prg.id)}
                    className="p-1.5 rounded hover:bg-rose-900/40 text-slate-400 hover:text-rose-400"
                    title="Hapus Program"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Submenu Tabs Navigation */}
      <div className={`p-1.5 rounded-2xl border flex flex-wrap items-center gap-1.5 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <button
          onClick={() => setSubmenu('maturity')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'maturity'
              ? 'bg-emerald-600 text-white shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>1. Maturity Level K3</span>
        </button>

        <button
          onClick={() => setSubmenu('apd')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'apd'
              ? 'bg-yellow-500 text-slate-950 shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HardHat className="w-4 h-4" />
          <span>2. Database APD</span>
        </button>

        <button
          onClick={() => setSubmenu('fire')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'fire'
              ? 'bg-rose-600 text-white shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>3. Fire Prevention & Hydrant</span>
        </button>

        <button
          onClick={() => setSubmenu('program')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'program'
              ? 'bg-blue-600 text-white shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>4. Program K3 Lainnya</span>
        </button>

        <button
          onClick={() => setSubmenu('other')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'other'
              ? 'bg-violet-600 text-white shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MoreHorizontal className="w-4 h-4" />
          <span>6. Lain-lain</span>
        </button>
      </div>

      {/* Render Submenu Content */}
      {submenu === 'maturity' && renderMaturityLevel()}
      {submenu === 'apd' && renderApdDatabase()}
      {submenu === 'fire' && renderFirePrevention()}
      {submenu === 'program' && renderProgramK3()}
      {submenu === 'other' && (
        <section className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <MoreHorizontal className="w-5 h-5 text-violet-500" />
            <h2 className="text-base font-bold">Lain-lain</h2>
          </div>
          <p className="mt-2 text-sm text-slate-400">Ruang untuk informasi dan kegiatan K3 di luar kategori menu lainnya.</p>
        </section>
      )}
    </div>
  );
};
