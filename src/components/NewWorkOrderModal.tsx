import React, { useState } from 'react';
import { WorkJob, ULTGUnit, VoltageLevel, WorkType } from '../types/hsse';
import { X, ShieldCheck, HardHat, AlertCircle } from 'lucide-react';

interface NewWorkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newJob: WorkJob) => void;
}

export const NewWorkOrderModal: React.FC<NewWorkOrderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [substationLocation, setSubstationLocation] = useState('GI 150 kV Manisrejo (Madiun)');
  const [ultg, setUltg] = useState<ULTGUnit>('ULTG Madiun');
  const [voltage, setVoltage] = useState<VoltageLevel>('150 kV (SUTT)');
  const [workType, setWorkType] = useState<WorkType>('Pemeliharaan Bay Trafo');
  const [condition, setCondition] = useState<'Padam' | 'Bertegangan' | 'Tanpa Tegangan'>('Padam');
  const [teamName, setTeamName] = useState('Tim Har GI ULTG Madiun');
  const [personnelCount, setPersonnelCount] = useState(6);
  const [pengawasK3, setPengawasK3] = useState('Ahmad Faisal, S.T.');
  const [pengawasPekerjaan, setPengawasPekerjaan] = useState('Budi Santoso');
  const [pengawasManuver, setPengawasManuver] = useState('Dedi Kurniawan');
  const [riskLevel, setRiskLevel] = useState<'Kritis' | 'Tinggi' | 'Sedang' | 'Rendah'>('Tinggi');
  const [startTime, setStartTime] = useState('08:00 WIB');
  const [targetEndTime, setTargetEndTime] = useState('16:00 WIB');
  const [notes, setNotes] = useState('Telah divalidasi dengan SOP keselamatan transmisi dan pengetesan bebas tegangan.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Mohon isi nama pekerjaan!');
      return;
    }

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newJob: WorkJob = {
      id: `WO-2026-10-${randomSuffix}`,
      title: title.trim(),
      substationLocation,
      ultg,
      voltage,
      type: workType,
      condition,
      teamName,
      personnelCount: Number(personnelCount),
      pengawasK3,
      pengawasPekerjaan,
      pengawasManuver,
      workingPermitNo: `WP/UPTM/${ultg.replace('ULTG ', '').substring(0, 3).toUpperCase()}/2026/10/${randomSuffix}`,
      riskLevel,
      status: 'Safety Briefing / TBM',
      progress: 0,
      startTime,
      targetEndTime,
      tbmPassed: true,
      jsaApproved: true,
      hiradcValid: true,
      complianceScore: 100,
      apdChecklist: {
        helmChinstrap: true,
        sepatuSafety: true,
        fullBodyHarness: riskLevel === 'Kritis' || riskLevel === 'Tinggi',
        detectorTegangan: true,
        groundingCluster: condition === 'Padam',
        rompiReflektif: true,
        sarungTanganIsolasi: true,
        kacamataPelindung: true,
      },
      notes: notes.trim(),
      historyLogs: [
        {
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
          action: 'Working Permit (PTW) diterbitkan dan disetujui Pengawas K3',
          author: pengawasK3
        }
      ]
    };

    onSubmit(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Registrasi Izin Kerja Baru (Permit to Work)</h3>
              <p className="text-xs text-slate-400">Penerbitan izin kerja pekerjaan transmisi PT PLN UPT Madiun</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* Job Title */}
          <div>
            <label className="block font-semibold text-slate-200 mb-1">
              Nama & Uraian Pekerjaan <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Pemeliharaan Bay Trafo 1 150/20 kV & Pengujian Tahanan Isolasi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Location & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Lokasi Gardu Induk / SUTT</label>
              <input
                type="text"
                value={substationLocation}
                onChange={(e) => setSubstationLocation(e.target.value)}
                placeholder="Contoh: GI 150 kV Manisrejo"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Unit Layanan Transmisi (ULTG)</label>
              <select
                value={ultg}
                onChange={(e) => setUltg(e.target.value as ULTGUnit)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                <option value="ULTG Madiun">ULTG Madiun</option>
                <option value="ULTG Ponorogo">ULTG Ponorogo</option>
                <option value="ULTG Pacitan">ULTG Pacitan</option>
                <option value="ULTG Ngawi">ULTG Ngawi</option>
              </select>
            </div>
          </div>

          {/* Voltage & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Level Tegangan</label>
              <select
                value={voltage}
                onChange={(e) => setVoltage(e.target.value as VoltageLevel)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                <option value="150 kV (SUTT)">150 kV (SUTT)</option>
                <option value="70 kV (SUTT)">70 kV (SUTT)</option>
                <option value="500 kV (SUTET)">500 kV (SUTET)</option>
                <option value="20 kV (Trafo/Penyulang)">20 kV (Trafo)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-200 mb-1">Jenis Pekerjaan</label>
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value as WorkType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                <option value="Pemeliharaan Bay Trafo">Pemeliharaan Bay Trafo</option>
                <option value="PDKB (Bertegangan)">PDKB (Bertegangan)</option>
                <option value="Working at Height (Tower)">Working at Height (Tower)</option>
                <option value="ROW / Tebang Pohon Kritis">ROW / Tebang Pohon</option>
                <option value="Inspeksi Termovisi">Inspeksi Termovisi</option>
                <option value="Pengujian Relay Proteksi">Pengujian Proteksi</option>
                <option value="Hot Work (Pengelasan)">Hot Work (Pengelasan)</option>
                <option value="Cold Work / Sipil">Cold Work / Sipil</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-200 mb-1">Kondisi Peralatan</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                <option value="Padam">Padam (Outage)</option>
                <option value="Bertegangan">Bertegangan (PDKB)</option>
                <option value="Tanpa Tegangan">Tanpa Tegangan (Sipil)</option>
              </select>
            </div>
          </div>

          {/* Team and Supervisors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Nama Tim Pelaksana</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Jumlah Personil (Orang)</label>
              <input
                type="number"
                min={1}
                max={50}
                value={personnelCount}
                onChange={(e) => setPersonnelCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Supervisors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Pengawas K3</label>
              <input
                type="text"
                value={pengawasK3}
                onChange={(e) => setPengawasK3(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Pengawas Pekerjaan</label>
              <input
                type="text"
                value={pengawasPekerjaan}
                onChange={(e) => setPengawasPekerjaan(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Pengawas Manuver</label>
              <input
                type="text"
                value={pengawasManuver}
                onChange={(e) => setPengawasManuver(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Risk Level & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Tingkat Risiko</label>
              <select
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                <option value="Kritis">Kritis</option>
                <option value="Tinggi">Tinggi</option>
                <option value="Sedang">Sedang</option>
                <option value="Rendah">Rendah</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Jam Mulai</label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Target Selesai</label>
              <input
                type="text"
                value={targetEndTime}
                onChange={(e) => setTargetEndTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-semibold text-slate-200 mb-1">Catatan Keselamatan / Arahan JSA</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Bottom Submit */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors shadow-sm"
            >
              Terbitkan Izin Kerja (PTW)
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
