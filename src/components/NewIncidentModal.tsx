import React, { useState } from 'react';
import { IncidentReport, ULTGUnit, IncidentCategory, IncidentSeverity } from '../types/hsse';
import { X, AlertTriangle, ShieldAlert } from 'lucide-react';

interface NewIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newIncident: IncidentReport) => void;
}

export const NewIncidentModal: React.FC<NewIncidentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [incidentDate, setIncidentDate] = useState('16 Oktober 2026');
  const [incidentTime, setIncidentTime] = useState('10:30 WIB');
  const [location, setLocation] = useState('GI 150 kV Manisrejo (Madiun)');
  const [ultg, setUltg] = useState<ULTGUnit>('ULTG Madiun');
  const [category, setCategory] = useState<IncidentCategory>('Near Miss');
  const [severity, setSeverity] = useState<IncidentSeverity>('Moderat');
  const [reporterName, setReporterName] = useState('Teknisi K3 Lapangan');
  const [reporterRole] = useState('Petugas K3L');
  const [chronology, setChronology] = useState('');
  const [immediateAction, setImmediateAction] = useState('');
  const [correctiveAction, setCorrectiveAction] = useState('');
  const [capaPic, setCapaPic] = useState('Supervisor K3L & Kam UPT Madiun');
  const [targetDeadline, setTargetDeadline] = useState('23 Oktober 2026');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !chronology.trim()) {
      alert('Mohon lengkapi judul dan kronologi insiden!');
      return;
    }

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newReport: IncidentReport = {
      id: `INC-2026-${randomSuffix}`,
      title: title.trim(),
      incidentDate,
      incidentTime,
      location: location.trim(),
      ultg,
      category,
      severity,
      status: 'Investigasi Berjalan',
      reporterName: reporterName.trim(),
      reporterRole,
      investigator: 'Tim K3L UPT Madiun',
      chronology: chronology.trim(),
      rootCause: 'Sedang dalam proses analisis 5-Why oleh tim investigasi K3.',
      immediateAction: immediateAction.trim() || 'Lokasi telah diamankan dan personil dipastikan aman.',
      correctiveAction: correctiveAction.trim() || 'Evaluasi SOP dan briefing ulang kepada seluruh tim kerja.',
      capaPic,
      targetDeadline,
    };

    onSubmit(newReport);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-950 text-rose-400 border border-rose-800 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Form Pelaporan Insiden & Near Miss (K3L)</h3>
              <p className="text-xs text-slate-400">Pencatatan terpadu kejadian, hampir celaka, dan kondisi berbahaya</p>
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
          
          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-200 mb-1">
              Judul Kejadian / Temuan <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Near Miss: Sling katrol tower tergeser saat pengangkatan isolator"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Date, Time & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Tanggal Kejadian</label>
              <input
                type="text"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Waktu Kejadian</label>
              <input
                type="text"
                value={incidentTime}
                onChange={(e) => setIncidentTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Unit Layanan (ULTG)</label>
              <select
                value={ultg}
                onChange={(e) => setUltg(e.target.value as ULTGUnit)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-rose-500"
              >
                <option value="ULTG Madiun">ULTG Madiun</option>
                <option value="ULTG Ponorogo">ULTG Ponorogo</option>
                <option value="ULTG Pacitan">ULTG Pacitan</option>
                <option value="ULTG Ngawi">ULTG Ngawi</option>
              </select>
            </div>
          </div>

          {/* Location details */}
          <div>
            <label className="block font-semibold text-slate-200 mb-1">Titik Lokasi Spesifik (Gardu / Span Tower)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Contoh: Switchyard Bay Trafo 2 GI 150 kV Manisrejo"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Category & Severity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Kategori Bahaya / Insiden</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IncidentCategory)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-rose-500"
              >
                <option value="Near Miss">Near Miss (Hampir Celaka)</option>
                <option value="Unsafe Condition">Unsafe Condition (Kondisi Berbahaya)</option>
                <option value="Unsafe Action">Unsafe Action (Tindakan Tidak Aman)</option>
                <option value="First Aid / Luka Ringan">First Aid (Luka Ringan / P3K)</option>
                <option value="Property Damage">Property Damage (Kerusakan Aset)</option>
                <option value="Environmental / Tumpahan Minyak">Environmental (Tumpahan Minyak Trafo)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-200 mb-1">Tingkat Keparahan (Severity)</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as IncidentSeverity)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-rose-500"
              >
                <option value="Kritis">Kritis (Potensi Fatality / Padam Luas)</option>
                <option value="Mayor">Mayor (Kerusakan Signifikan / Cedera Berat)</option>
                <option value="Moderat">Moderat (Hampir Celaka / Cedera Ringan)</option>
                <option value="Minor">Minor (Unsafe Behavior / Minor Scratch)</option>
              </select>
            </div>
          </div>

          {/* Reporter details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Nama Pelapor</label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">PIC Tindakan Perbaikan (CAPA)</label>
              <input
                type="text"
                value={capaPic}
                onChange={(e) => setCapaPic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Chronology */}
          <div>
            <label className="block font-semibold text-slate-200 mb-1">
              Kronologi Rinci Kejadian <span className="text-rose-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Ceritakan urutan peristiwa kejadian secara objektif: siapa yang terlibat, peralatan yang digunakan, dan apa yang terjadi..."
              value={chronology}
              onChange={(e) => setChronology(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Immediate Action */}
          <div>
            <label className="block font-semibold text-slate-200 mb-1">Tindakan Langsung Saat Itu (Immediate Action)</label>
            <input
              type="text"
              placeholder="Contoh: Pekerjaan dihentikan, area diisolasi dengan safety tape..."
              value={immediateAction}
              onChange={(e) => setImmediateAction(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Corrective Action */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-200 mb-1">Rencana Tindakan Korektif (CAPA)</label>
              <input
                type="text"
                placeholder="Contoh: Perbaikan slab trench dan pengetatan SOP"
                value={correctiveAction}
                onChange={(e) => setCorrectiveAction(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Target Batas Waktu</label>
              <input
                type="text"
                value={targetDeadline}
                onChange={(e) => setTargetDeadline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>
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
              className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-sm"
            >
              Kirim Laporan Insiden
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
