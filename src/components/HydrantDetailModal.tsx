import React, { useState } from 'react';
import { HydrantProject } from '../types/hydrant';
import { 
  X, 
  Flame, 
  MapPin, 
  FileCheck2, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Building2, 
  Activity,
  Layers,
  Wrench
} from 'lucide-react';

interface HydrantDetailModalProps {
  project: HydrantProject | null;
  onClose: () => void;
  onUpdateProject: (updated: HydrantProject) => void;
  theme?: 'dark' | 'light';
}

export const HydrantDetailModal: React.FC<HydrantDetailModalProps> = ({
  project,
  onClose,
  onUpdateProject,
  theme = 'dark',
}) => {
  if (!project) return null;

  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'spec' | 'update'>('overview');

  // Quick edit state for updating progress
  const [progresFisikInput, setProgresFisikInput] = useState(project.progresFisik);
  const [realisasiKeuanganInput, setRealisasiKeuanganInput] = useState(project.realisasiKeuangan);
  const [kendalaInput, setKendalaInput] = useState(project.kendalaLapangan || '');
  const [tindakLanjutInput, setTindakLanjutInput] = useState(project.tindakLanjut || '');

  const handleSaveUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: HydrantProject = {
      ...project,
      progresFisik: Number(progresFisikInput),
      deviasiFisik: Number((Number(progresFisikInput) - project.targetFisikSdHariIni).toFixed(1)),
      realisasiKeuangan: Number(realisasiKeuanganInput),
      kendalaLapangan: kendalaInput.trim(),
      tindakLanjut: tindakLanjutInput.trim(),
      lastUpdateDate: '16 Oktober 2026',
      status: Number(progresFisikInput) >= 100 
        ? 'Selesai 100%' 
        : Number(progresFisikInput) - project.targetFisikSdHariIni < -2 
        ? 'Kritis / Deviasi Negatif' 
        : project.status,
    };
    onUpdateProject(updated);
    setActiveTab('overview');
  };

  const isAhead = project.deviasiFisik >= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className={`border rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-8 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`p-5 border-b flex items-start justify-between gap-4 ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="flex items-center gap-2 text-xs">
              <span className={`px-2 py-0.5 rounded font-bold font-mono ${
                project.budgetType === 'AI'
                  ? 'bg-purple-950 text-purple-300 border border-purple-800'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {project.budgetType === 'AI' ? 'Anggaran Investasi (AI)' : 'Anggaran Operasi (AO)'}
              </span>
              <span className="text-slate-500">·</span>
              <span className="font-mono text-cyan-400 font-semibold">{project.code}</span>
              <span className="text-slate-500">·</span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{project.ultg}</span>
            </div>
            <h3 className={`text-base font-bold mt-1.5 leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {project.title}
            </h3>
            <div className={`flex items-center gap-1.5 text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{project.substationLocation}</span>
              <span aria-hidden="true">·</span>
              <span>Mitra: <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>{project.vendorName}</strong></span>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark ? 'text-slate-400 hover:text-white bg-slate-800' : 'text-slate-500 hover:text-slate-900 bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation */}
        <div className={`flex border-b px-5 text-xs font-medium ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-cyan-500 text-cyan-400 font-semibold'
                : isDark ? 'border-transparent text-slate-400 hover:text-slate-200' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Ringkasan Kontrak & Progres
          </button>
          <button
            onClick={() => setActiveTab('milestones')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'milestones'
                ? 'border-cyan-500 text-cyan-400 font-semibold'
                : isDark ? 'border-transparent text-slate-400 hover:text-slate-200' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Milestone Pekerjaan ({project.milestones.length})
          </button>
          <button
            onClick={() => setActiveTab('spec')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'spec'
                ? 'border-cyan-500 text-cyan-400 font-semibold'
                : isDark ? 'border-transparent text-slate-400 hover:text-slate-200' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Spesifikasi Teknis Hydrant
          </button>
          <button
            onClick={() => setActiveTab('update')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'update'
                ? 'border-cyan-500 text-cyan-400 font-semibold'
                : isDark ? 'border-transparent text-slate-400 hover:text-slate-200' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Perbarui Progres Lapangan
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-5 text-xs">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              
              {/* Progress and Financial KPI Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[11px] text-slate-500 block">Progres Fisik Realisasi</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-cyan-400">{project.progresFisik}%</span>
                    <span className={`text-[10px] font-mono font-semibold ${isAhead ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ({isAhead ? `+${project.deviasiFisik}%` : `${project.deviasiFisik}%`})
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Target s.d. hari ini: {project.targetFisikSdHariIni}%</span>
                </div>

                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[11px] text-slate-500 block">Realisasi Keuangan</span>
                  <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
                    {Math.round((project.realisasiKeuangan / project.paguAnggaran) * 100)}%
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
                    Rp {(project.realisasiKeuangan / 1000000).toLocaleString('id-ID')} Juta
                  </span>
                </div>

                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[11px] text-slate-500 block">Total Pagu Anggaran</span>
                  <div className="text-base font-bold font-mono text-yellow-400 mt-1 truncate">
                    Rp {(project.paguAnggaran / 1000000).toLocaleString('id-ID')} Jt
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Sumber: {project.budgetType} UPT Madiun</span>
                </div>

                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[11px] text-slate-500 block">Batas Waktu Kontrak</span>
                  <div className="text-xs font-bold text-white mt-1">
                    {project.targetCompletionDate}
                  </div>
                  <span className="text-[10px] text-cyan-400 mt-0.5 block">Mulai: {project.startDate}</span>
                </div>
              </div>

              {/* Progress Visual Bar */}
              <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Kurva Kemajuan Fisik vs Rencana (s.d. 16 Oktober 2026)</span>
                  <span className="font-mono text-cyan-400 font-bold">{project.progresFisik}% / {project.targetFisikSdHariIni}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden relative">
                  {/* Target Marker */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-yellow-400 z-10" 
                    style={{ left: `${project.targetFisikSdHariIni}%` }}
                    title={`Target Rencana: ${project.targetFisikSdHariIni}%`}
                  ></div>
                  {/* Realized Bar */}
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
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Mulai: {project.startDate}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 bg-yellow-400 inline-block"></span>
                    <span>Garis Rencana ({project.targetFisikSdHariIni}%)</span>
                  </span>
                  <span>Target Akhir: {project.targetCompletionDate}</span>
                </div>
              </div>

              {/* Contract Information Table */}
              <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="font-semibold text-white block">Informasi Kontrak & Pelaksanaan</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Nomor Kontrak / SPK</span>
                    <span className="font-mono text-white font-medium">{project.spkContractNo}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tanggal Kontrak</span>
                    <span className="text-white font-medium">{project.contractDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Mitra Pelaksana (Vendor)</span>
                    <span className="text-white font-medium">{project.vendorName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Lokasi Gardu Induk</span>
                    <span className="text-white font-medium">{project.substationLocation}</span>
                  </div>
                </div>
              </div>

              {/* Issues & Next Actions */}
              {(project.kendalaLapangan || project.tindakLanjut) && (
                <div className={`p-4 rounded-xl border space-y-2 ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className="font-semibold text-amber-400 block flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Catatan Kendala & Rencana Tindak Lanjut</span>
                  </span>
                  {project.kendalaLapangan && (
                    <div>
                      <span className="text-slate-500 font-medium block">Kendala Lapangan:</span>
                      <p className="text-slate-300 mt-0.5">{project.kendalaLapangan}</p>
                    </div>
                  )}
                  {project.tindakLanjut && (
                    <div className="pt-1.5 border-t border-slate-800">
                      <span className="text-cyan-400 font-medium block">Tindak Lanjut / Action Plan:</span>
                      <p className="text-slate-200 mt-0.5">{project.tindakLanjut}</p>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* TAB 2: MILESTONES */}
          {activeTab === 'milestones' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Rincian Bobot & Progres Milestone Pekerjaan</h4>
                  <p className="text-xs text-slate-400">Total kumulatif bobot 100% sesuai kurva rencana</p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-1 rounded border border-cyan-800">
                  Total Realisasi: {project.progresFisik}%
                </span>
              </div>

              <div className="space-y-2.5 pt-2">
                {project.milestones.map((m, idx) => (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-xl border space-y-2 ${
                      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{idx + 1}. {m.nama}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Bobot: <strong className="text-white font-mono">{m.bobot}%</strong></span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          m.progres === 100 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                            : m.progres > 0 
                            ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {m.progres === 100 ? 'Selesai' : m.progres > 0 ? `${m.progres}%` : 'Belum Mulai'}
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${m.progres === 100 ? 'bg-emerald-500' : 'bg-cyan-500'}`}
                        style={{ width: `${m.progres}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TECHNICAL SPEC */}
          {activeTab === 'spec' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <Flame className="w-4 h-4" />
                <span>Parameter Kesiapan Sistem Proteksi Kebakaran Hydrant</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-3.5 rounded-xl border space-y-1 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-500 block text-[11px]">Kapasitas Bak Tandon Air</span>
                  <span className="text-sm font-bold text-white block">{project.spec.kapasitasTandonAir}</span>
                  <span className="text-[10px] text-cyan-400 block">Menyuplai minimal 60 menit semprotan kontinu</span>
                </div>

                <div className={`p-3.5 rounded-xl border space-y-1 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-500 block text-[11px]">Tekanan Jaringan Pipa Siaga</span>
                  <span className="text-sm font-bold font-mono text-emerald-400 block">{project.spec.tekananJaringanSiaga}</span>
                  <span className="text-[10px] text-slate-400 block">Dipertahankan oleh Jockey Pump otomatis</span>
                </div>

                <div className={`p-3.5 rounded-xl border space-y-1 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-500 block text-[11px]">Pompa Jockey & Elektrik</span>
                  <span className="text-xs font-semibold text-white block">
                    Jockey: <span className="text-emerald-400">{project.spec.statusJockeyPump}</span> | Elektrik: <span className="text-emerald-400">{project.spec.statusElectricPump}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 block">Panel Kontrol Otomatis NFPA-20</span>
                </div>

                <div className={`p-3.5 rounded-xl border space-y-1 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-500 block text-[11px]">Pompa Diesel Darurat (Emergency Fire Pump)</span>
                  <span className="text-xs font-semibold text-white block">
                    Status: <span className={project.spec.statusDieselPump === 'Perbaikan' ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {project.spec.statusDieselPump}
                    </span>
                  </span>
                  <span className="text-[10px] text-slate-400 block">Bekerja otomatis saat pasokan listrik GI padam</span>
                </div>

                <div className={`p-3.5 rounded-xl border space-y-1 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-500 block text-[11px]">Jumlah Pillar Hydrant & Selang</span>
                  <span className="text-sm font-bold font-mono text-white block">
                    {project.spec.jumlahPillarHydrant} Pillar & {project.spec.boxHydrantLengkap} Box Hydrant
                  </span>
                  <span className="text-[10px] text-slate-400 block">Selang kanvas 2.5" x 30m + Variable Nozzle</span>
                </div>

                <div className={`p-3.5 rounded-xl border space-y-1 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-500 block text-[11px]">Sistem Water Spray Deluge Trafo</span>
                  <span className="text-sm font-bold block">
                    {project.spec.delugeTrafoReady ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Terpasang & Siap Operasi</span>
                      </span>
                    ) : (
                      <span className="text-yellow-400 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Dalam Tahap Instalasi</span>
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Proteksi semprotan kabut air pemadaman trafo daya</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: UPDATE PROGRESS */}
          {activeTab === 'update' && (
            <form onSubmit={handleSaveUpdate} className="space-y-4">
              <div className="p-3 bg-cyan-950/40 border border-cyan-800 rounded-xl text-xs space-y-1">
                <span className="font-semibold text-cyan-300 block">Update Progres Fisik & Keuangan Lapangan</span>
                <p className="text-slate-300 text-[11px]">
                  Data yang diperbarui akan langsung tercermin pada S-Curve dashboard dan rekap eksekutif UPT Madiun.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">
                    Progres Fisik Aktual (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={progresFisikInput}
                    onChange={(e) => setProgresFisikInput(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Target rencana s.d. hari ini: {project.targetFisikSdHariIni}%</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-200 mb-1">
                    Realisasi Keuangan (IDR)
                  </label>
                  <input
                    type="number"
                    step="1000000"
                    min="0"
                    max={project.paguAnggaran}
                    value={realisasiKeuanganInput}
                    onChange={(e) => setRealisasiKeuanganInput(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Total Pagu: Rp {project.paguAnggaran.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">Kendala Lapangan Terkini</label>
                <textarea
                  rows={2}
                  value={kendalaInput}
                  onChange={(e) => setKendalaInput(e.target.value)}
                  placeholder="Tuliskan kendala teknis atau perizinan jika ada..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">Rencana Tindak Lanjut (Action Plan)</label>
                <textarea
                  rows={2}
                  value={tindakLanjutInput}
                  onChange={(e) => setTindakLanjutInput(e.target.value)}
                  placeholder="Langkah perbaikan atau koordinasi pemadaman..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-sm"
                >
                  Simpan Pembaruan Progres
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className={`px-6 py-3.5 border-t flex items-center justify-between text-xs ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <span className="text-slate-400">
            Terakhir Diperbarui: <strong className="text-white">{project.lastUpdateDate}</strong>
          </span>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-lg transition-colors font-medium ${
              isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-200 text-slate-700 hover:text-slate-900'
            }`}
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
