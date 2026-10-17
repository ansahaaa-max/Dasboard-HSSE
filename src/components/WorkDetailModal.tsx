import React, { useState } from 'react';
import { WorkJob, ApdChecklist } from '../types/hsse';
import { 
  X, 
  MapPin, 
  HardHat, 
  ShieldCheck, 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  FileCheck2, 
  UserCheck, 
  Plus, 
  AlertTriangle 
} from 'lucide-react';

interface WorkDetailModalProps {
  job: WorkJob | null;
  onClose: () => void;
  onUpdateJob: (updatedJob: WorkJob) => void;
  onTriggerSWA: (jobId: string, reason: string) => void;
  onResolveSWA: (jobId: string) => void;
}

export const WorkDetailModal: React.FC<WorkDetailModalProps> = ({
  job,
  onClose,
  onUpdateJob,
  onTriggerSWA,
  onResolveSWA,
}) => {
  if (!job) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'apd' | 'logs' | 'swa'>('overview');
  const [newLogText, setNewLogText] = useState('');
  const [newLogAuthor, setNewLogAuthor] = useState('Pengawas K3');
  const [swaReasonInput, setSwaReasonInput] = useState('');

  // Handle APD checkbox toggle
  const handleToggleApd = (key: keyof ApdChecklist) => {
    const updatedApd = {
      ...job.apdChecklist,
      [key]: !job.apdChecklist[key]
    };
    
    // Recalculate compliance score
    const totalItems = Object.keys(updatedApd).length;
    const passedItems = Object.values(updatedApd).filter(Boolean).length;
    const newScore = Math.round((passedItems / totalItems) * 100);

    const updatedJob: WorkJob = {
      ...job,
      apdChecklist: updatedApd,
      complianceScore: newScore,
      historyLogs: [
        {
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
          action: `Inspeksi APD diperbarui: item "${key}" diubah menjadi ${updatedApd[key] ? 'Lengkap' : 'Tidak Lengkap'}`,
          author: 'Petugas Inspeksi K3'
        },
        ...job.historyLogs
      ]
    };

    onUpdateJob(updatedJob);
  };

  // Add new field history log
  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogText.trim()) return;

    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const updatedJob: WorkJob = {
      ...job,
      historyLogs: [
        { time: timeStr, action: newLogText.trim(), author: newLogAuthor },
        ...job.historyLogs
      ]
    };

    onUpdateJob(updatedJob);
    setNewLogText('');
  };

  const isSwa = job.status === 'SWA (Dihentikan)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono text-cyan-400 font-semibold">{job.workingPermitNo}</span>
              <span aria-hidden="true">·</span>
              <span>{job.ultg}</span>
              <span aria-hidden="true">·</span>
              <span className="text-yellow-400 font-mono">{job.voltage}</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1 leading-snug">
              {job.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{job.substationLocation}</span>
              <span aria-hidden="true">·</span>
              <span>Kondisi: <strong className="text-slate-200">{job.condition}</strong></span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation inside modal */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-5 text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-cyan-500 text-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Ringkasan Izin Kerja
          </button>
          <button
            onClick={() => setActiveTab('apd')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'apd'
                ? 'border-cyan-500 text-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Checklist 8 APD & Inspeksi ({job.complianceScore}%)
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'logs'
                ? 'border-cyan-500 text-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Log Aktivitas Lapangan ({job.historyLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('swa')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'swa'
                ? 'border-rose-500 text-rose-400 font-semibold'
                : isSwa
                ? 'border-transparent text-rose-400 hover:text-rose-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Stop Work Authority (SWA)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-5">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              
              {/* SWA Notice if active */}
              {isSwa && (
                <div className="bg-rose-950/70 border border-rose-700 p-4 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                    <AlertOctagon className="w-5 h-5 text-rose-400" />
                    <span>Pekerjaan Sedang Dihentikan Sementara (SWA)</span>
                  </div>
                  <p className="text-xs text-rose-200 leading-relaxed">
                    Alasan: {job.swaReason}
                  </p>
                </div>
              )}

              {/* Personnel & Responsibilities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-500 block">Pengawas K3 Lapangan</span>
                  <span className="text-sm font-semibold text-white mt-0.5 block">{job.pengawasK3}</span>
                  <span className="text-[11px] text-emerald-400 mt-1 block">Tersertifikasi AK3</span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-500 block">Pengawas Pekerjaan</span>
                  <span className="text-sm font-semibold text-white mt-0.5 block">{job.pengawasPekerjaan}</span>
                  <span className="text-[11px] text-slate-400 mt-1 block">Supervisi Teknis</span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-500 block">Pengawas Manuver</span>
                  <span className="text-sm font-semibold text-white mt-0.5 block">{job.pengawasManuver}</span>
                  <span className="text-[11px] text-slate-400 mt-1 block">Operator Switchyard</span>
                </div>
              </div>

              {/* Team and Progress */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Tim Pelaksana: <strong className="text-white">{job.teamName}</strong> ({job.personnelCount} Orang)</span>
                  <span className="text-slate-400">Target Jam: <strong className="text-white font-mono">{job.startTime} - {job.targetEndTime}</strong></span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400">Kemajuan Pekerjaan Lapangan</span>
                    <span className="font-mono text-cyan-400 font-bold">{job.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isSwa ? 'bg-rose-500' : 'bg-cyan-500'}`}
                      style={{ width: `${job.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Safety Pre-requisites validation */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-white block">Validasi Berkas & Kesiapan K3</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 bg-slate-900 rounded border border-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Working Permit (PTW)</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>JSA Tervalidasi</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>TBM Dilaksanakan</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Personil Fit to Work</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="text-xs text-slate-300 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium block mb-1">Instruksi Keselamatan Khusus:</span>
                <p className="leading-relaxed">{job.notes}</p>
              </div>

            </div>
          )}

          {/* TAB 2: APD CHECKLIST */}
          {activeTab === 'apd' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Pemeriksaan Kelayakan 8 APD Lapangan</h4>
                  <p className="text-xs text-slate-400">Klik item untuk memperbarui hasil inspeksi lapangan secara real-time</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Skor Kepatuhan</span>
                  <span className="text-xl font-bold font-mono text-cyan-400">{job.complianceScore}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { key: 'helmChinstrap' as const, label: 'Helm Standar PLN + Chinstrap Kencang', desc: 'Wajib terpasang dan tali dagu terkunci dengan baik' },
                  { key: 'sepatuSafety' as const, label: 'Sepatu Safety Isolasi 20kV / Toe Cap', desc: 'Sol tahan minyak, tahan tusukan, dan uji isolasi' },
                  { key: 'fullBodyHarness' as const, label: 'Full Body Harness & Lanyard Dual Hook', desc: 'Wajib untuk pekerjaan ketinggian > 1.8 meter' },
                  { key: 'detectorTegangan' as const, label: 'High Voltage Detector 150kV / 20kV', desc: 'Uji suara dan lampu indikator berfungsi sebelum dipakai' },
                  { key: 'groundingCluster' as const, label: 'Grounding Cluster Portabel Terpasang', desc: 'Pentanahan lokal bebas tegangan fasa R-S-T' },
                  { key: 'rompiReflektif' as const, label: 'Rompi Reflektif Keselamatan (Hi-Vis)', desc: 'Visibilitas tinggi di area switchyard dan tower' },
                  { key: 'sarungTanganIsolasi' as const, label: 'Sarung Tangan Isolasi Listrik Uji Berkala', desc: 'Bebas kebocoran udara dan masa uji masih berlaku' },
                  { key: 'kacamataPelindung' as const, label: 'Kacamata Pelindung / Arc Flash Shield', desc: 'Pelindung mata dari debu, radiasi busur dan partikel' },
                ].map((item) => {
                  const checked = job.apdChecklist[item.key];
                  return (
                    <div
                      key={item.key}
                      onClick={() => handleToggleApd(item.key)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        checked
                          ? 'bg-slate-950 border-emerald-800/80 hover:border-emerald-600'
                          : 'bg-rose-950/20 border-rose-800/80 hover:border-rose-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 rounded text-cyan-600 focus:ring-0 bg-slate-900 border-slate-700"
                      />
                      <div className="flex-1">
                        <span className={`text-xs font-semibold block ${checked ? 'text-white' : 'text-rose-300'}`}>
                          {item.label}
                        </span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {item.desc}
                        </span>
                        <span className={`text-[10px] font-medium mt-1 inline-block ${checked ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {checked ? '✓ Lulus Inspeksi' : '✗ Tidak Terpasang / Belum Layak'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-4">
              <form onSubmit={handleAddLog} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <span className="text-xs font-semibold text-white block">+ Catat Aktivitas / Temuan K3 Baru</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Contoh: Pengujian tegangan fasa S selesai, kondisi zero voltage..."
                    value={newLogText}
                    onChange={(e) => setNewLogText(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <select
                    value={newLogAuthor}
                    onChange={(e) => setNewLogAuthor(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Pengawas K3">Pengawas K3</option>
                    <option value="Pengawas Pekerjaan">Pengawas Pekerjaan</option>
                    <option value="Pengawas Manuver">Pengawas Manuver</option>
                    <option value="Tim Pelaksana">Tim Pelaksana</option>
                  </select>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors shrink-0"
                  >
                    Simpan Log
                  </button>
                </div>
              </form>

              {/* Log Timeline */}
              <div className="space-y-3 pt-2">
                {job.historyLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs border-l-2 border-slate-700 pl-4 py-1">
                    <span className="font-mono text-cyan-400 shrink-0 font-semibold">{log.time}</span>
                    <div className="flex-1">
                      <p className="text-slate-200">{log.action}</p>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">Dicatat oleh: {log.author}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SWA (STOP WORK AUTHORITY) */}
          {activeTab === 'swa' && (
            <div className="space-y-4">
              <div className="p-4 bg-rose-950/40 border border-rose-800 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-rose-400" />
                  <span>Kewenangan Penghentian Pekerjaan (Stop Work Authority)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sesuai PLN Safety Golden Rule No. 6, setiap personil atau pengawas K3 berhak dan berkewajiban menghentikan pekerjaan tanpa takut dikenakan sanksi jika menemukan kondisi atau tindakan yang berpotensi membahayakan keselamatan jiwa manusia.
                </p>
              </div>

              {isSwa ? (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                    <AlertOctagon className="w-5 h-5" />
                    <span>Pekerjaan Saat Ini Dalam Status DIHENTIKAN</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Alasan: <strong className="text-white">{job.swaReason}</strong>
                  </p>
                  <p className="text-xs text-slate-400">
                    Jika kondisi bahaya sudah dimitigasi dan perbaikan selesai dilakukan, Pengawas K3 dapat mencabut status SWA untuk melanjutkan pekerjaan.
                  </p>
                  <button
                    onClick={() => {
                      onResolveSWA(job.id);
                      setActiveTab('overview');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-emerald-200 bg-emerald-950 border border-emerald-700 hover:bg-emerald-900 rounded-lg transition-colors"
                  >
                    Cabut Status SWA & Lanjutkan Pekerjaan
                  </button>
                </div>
              ) : (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs font-semibold text-white block">Terapkan Perintah Stop Work Authority (SWA)</span>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan secara jelas bahaya kritis yang ditemukan (misal: jarak bebas kurang dari batas aman, APD ketinggian tidak terpasang, dll)..."
                    value={swaReasonInput}
                    onChange={(e) => setSwaReasonInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Pekerjaan akan berstatus SWA dan notifikasi dikirim ke tim</span>
                    <button
                      onClick={() => {
                        if (!swaReasonInput.trim()) {
                          alert('Mohon masukkan alasan penghentian pekerjaan!');
                          return;
                        }
                        onTriggerSWA(job.id, swaReasonInput.trim());
                        setSwaReasonInput('');
                        setActiveTab('overview');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-600 rounded-lg transition-colors"
                    >
                      Hentikan Pekerjaan Sekarang (Terapkan SWA)
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-3.5 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono">
            Status: <strong className="text-white">{job.status}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
