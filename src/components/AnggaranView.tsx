import React, { useState } from 'react';
import { 
  Coins, 
  TrendingUp, 
  PieChart, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  ShieldAlert, 
  Filter, 
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { AnggaranItem, AnggaranSubmenu } from '../types/dashboard';

interface AnggaranViewProps {
  submenu: AnggaranSubmenu;
  setSubmenu: (sub: AnggaranSubmenu) => void;
  anggaranList: AnggaranItem[];
  onOpenAddModal: () => void;
  onEditItem?: (item: AnggaranItem) => void;
  onDeleteItem?: (id: string) => void;
  searchQuery: string;
  theme: 'dark' | 'light';
}

export const AnggaranView: React.FC<AnggaranViewProps> = ({
  submenu,
  setSubmenu,
  anggaranList,
  onOpenAddModal,
  onEditItem,
  onDeleteItem,
  searchQuery,
  theme,
}) => {
  const isDark = theme === 'dark';

  // Filter based on selected submenu
  let filteredList = [...anggaranList];

  if (submenu === 'k3') {
    filteredList = filteredList.filter(a => a.kategoriUtama === 'K3');
  } else if (submenu === 'keamanan') {
    filteredList = filteredList.filter(a => a.kategoriUtama === 'Keamanan');
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredList = filteredList.filter(a => 
      a.programKerja.toLowerCase().includes(q) || 
      a.jenisAnggaran.toLowerCase().includes(q) || 
      a.keterangan.toLowerCase().includes(q)
    );
  }

  // Currency Formatter
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Computations
  const totalPaguK3 = anggaranList
    .filter(a => a.kategoriUtama === 'K3')
    .reduce((acc, curr) => acc + curr.paguAnggaran, 0);

  const totalRealisasiK3 = anggaranList
    .filter(a => a.kategoriUtama === 'K3')
    .reduce((acc, curr) => acc + curr.realisasiAnggaran, 0);

  const totalPaguKeamanan = anggaranList
    .filter(a => a.kategoriUtama === 'Keamanan')
    .reduce((acc, curr) => acc + curr.paguAnggaran, 0);

  const totalRealisasiKeamanan = anggaranList
    .filter(a => a.kategoriUtama === 'Keamanan')
    .reduce((acc, curr) => acc + curr.realisasiAnggaran, 0);

  const totalPaguGabungan = totalPaguK3 + totalPaguKeamanan;
  const totalRealisasiGabungan = totalRealisasiK3 + totalRealisasiKeamanan;
  const totalSisaGabungan = totalPaguGabungan - totalRealisasiGabungan;
  const persentaseTotal = totalPaguGabungan > 0 
    ? Math.round((totalRealisasiGabungan / totalPaguGabungan) * 1000) / 10 
    : 0;

  // Monthly realization trends (Jan - Oct 2026)
  const monthlyTrends = [
    { bulan: 'Jan 2026', realisasi: 310000000, target: 350000000 },
    { bulan: 'Feb 2026', realisasi: 340000000, target: 350000000 },
    { bulan: 'Mar 2026', realisasi: 420000000, target: 400000000 },
    { bulan: 'Apr 2026', realisasi: 380000000, target: 400000000 },
    { bulan: 'Mei 2026', realisasi: 490000000, target: 450000000 },
    { bulan: 'Jun 2026', realisasi: 520000000, target: 500000000 },
    { bulan: 'Jul 2026', realisasi: 440000000, target: 450000000 },
    { bulan: 'Agt 2026', realisasi: 480000000, target: 450000000 },
    { bulan: 'Sep 2026', realisasi: 510000000, target: 500000000 },
    { bulan: 'Okt 2026', realisasi: 505500000, target: 500000000 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Submenu Tabs Navigation */}
      <div className={`p-1.5 rounded-2xl border flex flex-wrap items-center gap-1.5 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <button
          onClick={() => setSubmenu('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'all'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>Semua Anggaran</span>
        </button>

        <button
          onClick={() => setSubmenu('k3')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'k3'
              ? 'bg-emerald-600 text-white shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>1. Anggaran K3</span>
        </button>

        <button
          onClick={() => setSubmenu('keamanan')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'keamanan'
              ? 'bg-cyan-600 text-white shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>2. Anggaran Keamanan</span>
        </button>

        <button
          onClick={() => setSubmenu('rencana')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'rencana'
              ? 'bg-blue-600 text-white shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>3. Rencana (Pagu)</span>
        </button>

        <button
          onClick={() => setSubmenu('realisasi')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'realisasi'
              ? 'bg-emerald-600 text-white shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>4. Realisasi</span>
        </button>

        <button
          onClick={() => setSubmenu('sisa')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'sisa'
              ? 'bg-amber-600 text-white shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>5. Sisa Anggaran</span>
        </button>
      </div>

      {/* Top 4 KPI Cards (Format Mata Uang Rupiah) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pagu */}
        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-xs text-slate-400">Total Pagu Anggaran (K3 + Kam)</div>
          <div className="text-xl font-extrabold font-mono text-amber-400 mt-1 truncate" title={formatRupiah(totalPaguGabungan)}>
            {formatRupiah(totalPaguGabungan)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            K3: {formatRupiah(totalPaguK3)} &bull; Kam: {formatRupiah(totalPaguKeamanan)}
          </div>
        </div>

        {/* Total Realisasi */}
        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-xs text-slate-400">Total Realisasi Penyerapan</div>
          <div className="text-xl font-extrabold font-mono text-emerald-400 mt-1 truncate" title={formatRupiah(totalRealisasiGabungan)}>
            {formatRupiah(totalRealisasiGabungan)}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">
            {persentaseTotal}% dari Total Pagu
          </div>
        </div>

        {/* Sisa Anggaran */}
        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-xs text-slate-400">Total Sisa Anggaran Tersedia</div>
          <div className="text-xl font-extrabold font-mono text-cyan-400 mt-1 truncate" title={formatRupiah(totalSisaGabungan)}>
            {formatRupiah(totalSisaGabungan)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Dana standby s.d. Desember 2026
          </div>
        </div>

        {/* Persentase Realisasi */}
        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-xs text-slate-400">Persentase Realisasi Rata-Rata</div>
          <div className="text-3xl font-extrabold font-mono text-yellow-400 mt-1">
            {persentaseTotal}%
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${persentaseTotal}%` }} />
          </div>
        </div>
      </div>

      {/* GRAFIK REALISASI ANGGARAN PER BULAN (JAN - OKT 2026) */}
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/40 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-100">Grafik Realisasi Anggaran Per Bulan (Tahun 2026)</h3>
            <p className="text-xs text-slate-400">Tren penyerapan Anggaran Operasi (AO) & Anggaran Investasi (AI) UPT Madiun</p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Nilai dalam Rupiah (IDR)
          </span>
        </div>

        {/* Bar Graphic Chart */}
        <div className="mt-6 space-y-3.5">
          {monthlyTrends.map((m) => (
            <div key={m.bulan} className="space-y-1 text-xs">
              <div className="flex items-center justify-between font-semibold">
                <span className="text-slate-300 w-24 shrink-0">{m.bulan}</span>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-emerald-400">{formatRupiah(m.realisasi)}</span>
                  <span className="text-slate-500">Target: {formatRupiah(m.target)}</span>
                </div>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden flex">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (m.realisasi / 600000000) * 100)}%` }}
                  title={`${m.bulan}: ${formatRupiah(m.realisasi)}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RINCIAN TABEL ANGGARAN PER PROGRAM & KATEGORI */}
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/40 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-100">Rincian Anggaran Per Program Kerja & Kategori (AO/AI)</h3>
            <p className="text-xs text-slate-400">Pagu, realisasi, sisa anggaran, dan persentase penyerapan dana</p>
          </div>
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Item Anggaran</span>
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`border-b text-[11px] uppercase tracking-wider ${
              isDark ? 'border-slate-800 text-slate-400 bg-slate-950/40' : 'border-slate-200 text-slate-600 bg-slate-50'
            }`}>
              <tr>
                <th className="py-3 px-3">Kode & Kategori</th>
                <th className="py-3 px-3">Nama Program Kerja</th>
                <th className="py-3 px-3">Jenis Anggaran</th>
                <th className="py-3 px-3 text-right">Pagu Rencana</th>
                <th className="py-3 px-3 text-right">Realisasi (Rp)</th>
                <th className="py-3 px-3 text-right">Sisa Anggaran</th>
                <th className="py-3 px-3 text-center">% Realisasi</th>
                <th className="py-3 px-3">Status & Keterangan</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 font-normal">
              {filteredList.map((ang) => (
                <tr key={ang.id} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-mono font-bold text-amber-400">{ang.id}</div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ang.kategoriUtama === 'K3'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-cyan-500/10 text-cyan-400'
                    }`}>
                      {ang.kategoriUtama}
                    </span>
                  </td>
                  <td className="py-3 px-3 max-w-sm">
                    <div className="font-semibold text-slate-100">{ang.programKerja}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Bulan: {ang.bulan}</div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      ang.jenisAnggaran.startsWith('AO') 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {ang.jenisAnggaran}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-200 whitespace-nowrap">
                    {formatRupiah(ang.paguAnggaran)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400 whitespace-nowrap">
                    {formatRupiah(ang.realisasiAnggaran)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-semibold text-cyan-400 whitespace-nowrap">
                    {formatRupiah(ang.sisaAnggaran)}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <div className="font-mono font-bold text-yellow-400">{ang.persentaseRealisasi}%</div>
                    <div className="w-16 bg-slate-800 rounded-full h-1 mx-auto mt-1 overflow-hidden">
                      <div className="bg-yellow-400 h-1 rounded-full" style={{ width: `${ang.persentaseRealisasi}%` }} />
                    </div>
                  </td>
                  <td className="py-3 px-3 max-w-xs space-y-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                      {ang.statusRealisasi}
                    </span>
                    <div className="text-[11px] text-slate-300">{ang.keterangan}</div>
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEditItem && onEditItem(ang)}
                        className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
                        title="Edit Item Anggaran"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteItem && onDeleteItem(ang.id)}
                        className="p-1 rounded hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                        title="Hapus Data"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
