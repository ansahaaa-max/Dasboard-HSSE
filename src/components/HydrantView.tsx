import React, { useState } from 'react';
import { 
  Droplets, 
  Search, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Layers, 
  Gauge, 
  Building2, 
  MapPin, 
  UserCheck, 
  Edit3, 
  Trash2, 
  Flame, 
  ArrowRight,
  Filter,
  Check,
  Zap,
  Activity,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { HydrantSystemItem, ULTGLocation } from '../types/dashboard';

interface HydrantViewProps {
  hydrantList: HydrantSystemItem[];
  onOpenAddModal: () => void;
  onEditItem: (item: HydrantSystemItem) => void;
  onDeleteItem: (id: string) => void;
  searchQuery: string;
  selectedLocation: string;
  theme: 'dark' | 'light';
}

export const HydrantView: React.FC<HydrantViewProps> = ({
  hydrantList,
  onOpenAddModal,
  onEditItem,
  onDeleteItem,
  searchQuery,
  selectedLocation,
  theme,
}) => {
  const isDark = theme === 'dark';

  // Filters
  const [filterKondisi, setFilterKondisi] = useState<string>('Semua');
  const [filterOperasi, setFilterOperasi] = useState<string>('Semua');
  const [selectedDetailHydrant, setSelectedDetailHydrant] = useState<HydrantSystemItem | null>(null);

  const isLocationFiltered = selectedLocation && !selectedLocation.startsWith('Semua');

  let items = isLocationFiltered 
    ? hydrantList.filter(h => h.lokasi === selectedLocation) 
    : hydrantList;

  if (filterKondisi !== 'Semua') {
    if (filterKondisi === 'Ada Anomali') {
      items = items.filter(h => h.adaAnomali);
    } else {
      items = items.filter(h => h.kondisiTerkini === filterKondisi);
    }
  }

  if (filterOperasi !== 'Semua') {
    items = items.filter(h => h.sistemOperasi === filterOperasi);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    items = items.filter(h => 
      h.namaSistem.toLowerCase().includes(q) ||
      h.kodeInstalasi.toLowerCase().includes(q) ||
      h.lokasi.toLowerCase().includes(q) ||
      h.merkMainPump.toLowerCase().includes(q) ||
      h.merkDieselPump.toLowerCase().includes(q) ||
      h.merkJockeyPump.toLowerCase().includes(q) ||
      h.pipaHydrant.toLowerCase().includes(q) ||
      h.daftarAnomali.toLowerCase().includes(q)
    );
  }

  // Statistics
  const totalSistem = items.length;
  const sistemNormal = items.filter(h => h.kondisiTerkini === 'Siaga Normal (Siap Operasi)').length;
  const sistemAnomali = items.filter(h => h.adaAnomali || h.kondisiTerkini === 'Ada Anomali' || h.kondisiTerkini === 'Kritis / Rusak').length;
  const totalPilar = items.reduce((acc, curr) => acc + (curr.jumlahPilar || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Header Banner Submenu Hydrant */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-colors ${
        isDark 
          ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border-slate-800' 
          : 'bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 border-blue-700 text-white'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase bg-cyan-400 text-slate-950">
                SISTEM PROTEKSI UTAMA HYDRANT
              </span>
              <span className="text-xs text-cyan-200 font-mono">
                150 kV & 500 kV Gardu Induk
              </span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <Droplets className="w-6 h-6 text-cyan-400 shrink-0" />
              <span>Database Spesifikasi Teknis, Kondisi & Anomali Hydrant</span>
            </h2>
            <p className="text-xs sm:text-sm text-cyan-100 max-w-2xl leading-relaxed">
              Monitoring parameter wajib: Merk Pompa (Jockey, Main, Diesel), Pipa Distribusi, Pilar Hydrant, Foot Klep, Sistem Automatis/Manual, serta deteksi anomali operasional di UPT Madiun.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah / Input Data Hydrant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-xs text-slate-400">Total Instalasi Hydrant</div>
          <div className="text-2xl font-extrabold font-mono text-cyan-400 mt-1">
            {totalSistem} Lokasi
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Gardu Induk Terpasang</div>
        </div>

        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-xs text-slate-400">Kondisi Siaga Normal</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400 mt-1">
            {sistemNormal} Sistem
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">
            {totalSistem > 0 ? Math.round((sistemNormal / totalSistem) * 100) : 0}% Kesiapan Operasi
          </div>
        </div>

        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-xs text-slate-400">Total Temuan Anomali</div>
          <div className={`text-2xl font-extrabold font-mono mt-1 ${sistemAnomali > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
            {sistemAnomali} Anomali
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {sistemAnomali > 0 ? 'Perlu Mitigasi & Tindak Lanjut' : 'Nihil Anomali'}
          </div>
        </div>

        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-xs text-slate-400">Total Titik Pilar Hydrant</div>
          <div className="text-2xl font-extrabold font-mono text-blue-400 mt-1">
            {totalPilar} Unit Pilar
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Siaga di Switchyard & Trafo</div>
        </div>
      </div>

      {/* Control Bar: Filter Kondisi & Mode Operasi */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Kondisi Terkini:</span>
          <select
            value={filterKondisi}
            onChange={(e) => setFilterKondisi(e.target.value)}
            className={`text-xs px-2.5 py-1.5 rounded-lg border outline-none font-medium ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
            }`}
          >
            <option value="Semua">Semua Kondisi</option>
            <option value="Siaga Normal (Siap Operasi)">Siaga Normal (Siap Operasi)</option>
            <option value="Ada Anomali">Ada Anomali</option>
            <option value="Kritis / Rusak">Kritis / Rusak</option>
            <option value="Dalam Pemeliharaan">Dalam Pemeliharaan</option>
          </select>

          <span className="text-xs font-semibold text-slate-400 ml-2">Sistem Operasi:</span>
          <select
            value={filterOperasi}
            onChange={(e) => setFilterOperasi(e.target.value)}
            className={`text-xs px-2.5 py-1.5 rounded-lg border outline-none font-medium ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
            }`}
          >
            <option value="Semua">Semua Mode</option>
            <option value="Otomatis">Otomatis (Pressure Switch)</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-xs self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Data Hydrant</span>
        </button>
      </div>

      {/* Main Hydrant Data Display */}
      {items.length === 0 ? (
        <div className={`p-12 rounded-2xl border text-center ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/20">
              <Droplets className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-100">Data Hydrant Belum Tersedia / Baru Saja Dikosongkan</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sub bagian Hydrant ini telah dipisahkan khusus dari Fire Prevention. Silakan klik tombol di bawah untuk memasukkan data spesifikasi teknis (Merk pompa, pipa, pilar, foot klep, otomatis/manual, kondisi terkini, dan anomali).
            </p>
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Input Data Hydrant Sekarang</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {items.map((hydrant) => (
            <div
              key={hydrant.id}
              className={`rounded-2xl border p-5 transition-all ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              {/* Header card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/40 gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {hydrant.kodeInstalasi}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-100">
                      {hydrant.namaSistem}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{hydrant.lokasi}</span>
                    <span>&bull;</span>
                    <span>{hydrant.posisiDetail}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                    hydrant.kondisiTerkini === 'Siaga Normal (Siap Operasi)'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : hydrant.kondisiTerkini === 'Ada Anomali'
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  }`}>
                    {hydrant.kondisiTerkini}
                  </span>

                  <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
                    hydrant.sistemOperasi === 'Otomatis'
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      : 'bg-slate-700/40 text-slate-300 border-slate-600'
                  }`}>
                    {hydrant.sistemOperasi}
                  </span>
                </div>
              </div>

              {/* 5 PARAMETER WAJIB SESUAI PERMINTAAN USER */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-4 text-xs">
                
                {/* 1. MERK HYDRANT (Jockey, Main, Diesel) */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[11px] font-bold text-cyan-400 mb-1.5 flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>1. Merk Pompa Hydrant</span>
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div><span className="text-slate-400">Jockey:</span> <strong className="text-slate-200">{hydrant.merkJockeyPump || '-'}</strong></div>
                    <div><span className="text-slate-400">Main:</span> <strong className="text-slate-200">{hydrant.merkMainPump || '-'}</strong></div>
                    <div><span className="text-slate-400">Diesel:</span> <strong className="text-slate-200">{hydrant.merkDieselPump || '-'}</strong></div>
                  </div>
                </div>

                {/* 2. PIPA HYDRANT */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[11px] font-bold text-cyan-400 mb-1.5 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>2. Pipa Hydrant</span>
                  </div>
                  <div className="text-slate-200 font-medium leading-relaxed">
                    {hydrant.pipaHydrant || '-'}
                  </div>
                </div>

                {/* 3. PILAR HYDRANT */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[11px] font-bold text-cyan-400 mb-1.5 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>3. Pilar Hydrant</span>
                  </div>
                  <div className="text-slate-200 font-medium">
                    {hydrant.pilarHydrant || `${hydrant.jumlahPilar} Pilar`}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Total: {hydrant.jumlahPilar || 0} Unit Pilar
                  </div>
                </div>

                {/* 4. FOOT KLEP (FOOT VALVE) */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[11px] font-bold text-cyan-400 mb-1.5 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" />
                    <span>4. Foot Klep (Foot Valve)</span>
                  </div>
                  <div className="text-slate-200 font-medium leading-relaxed">
                    {hydrant.footKlep || '-'}
                  </div>
                </div>

                {/* 5. SISTEM OPERASI & TEKANAN */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[11px] font-bold text-cyan-400 mb-1.5 flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5" />
                    <span>5. Mode & Tekanan Siaga</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-slate-200 font-bold">{hydrant.sistemOperasi}</div>
                    <div className="text-[11px] text-emerald-400 font-mono font-bold">Tekanan: {hydrant.tekananStatisBar || 8.5} Bar</div>
                    <div className="text-[10px] text-slate-400">Tandon: {hydrant.kapasitasTandonAir || '100 m³'}</div>
                  </div>
                </div>

              </div>

              {/* ANOMALI APA SAJA SECTION */}
              <div className="mt-4 pt-3 border-t border-slate-800/40">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <AlertTriangle className={`w-4 h-4 ${hydrant.adaAnomali ? 'text-amber-400' : 'text-emerald-500'}`} />
                        <span>Kondisi Terkini & Anomali Lapangan:</span>
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        hydrant.adaAnomali
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      }`}>
                        {hydrant.tingkatAnomali || (hydrant.adaAnomali ? 'Ada Anomali' : 'Nihil Anomali')}
                      </span>
                    </div>

                    {hydrant.adaAnomali ? (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs space-y-1">
                        <div><strong>Rincian Anomali:</strong> {hydrant.daftarAnomali}</div>
                        {hydrant.tindakLanjutAnomali && (
                          <div className="text-cyan-300">
                            <strong>Tindak Lanjut Mitigasi:</strong> {hydrant.tindakLanjutAnomali}
                          </div>
                        )}
                        {hydrant.targetSelesaiAnomali && (
                          <div className="text-[11px] text-slate-400 font-mono">
                            Target Penyelesaian: {hydrant.targetSelesaiAnomali}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Sistem beroperasi normal tanpa anomali. Seluruh valve, pompa, dan pilar dalam kondisi prima.</span>
                      </div>
                    )}
                  </div>

                  {/* Actions & PIC */}
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <div className="text-right text-[11px]">
                      <div className="text-slate-400">PIC Penanggung Jawab</div>
                      <div className="font-semibold text-cyan-400">{hydrant.pic}</div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEditItem(hydrant)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                        title="Edit Data Hydrant"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteItem(hydrant.id)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-950/60"
                        title="Hapus Data"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
