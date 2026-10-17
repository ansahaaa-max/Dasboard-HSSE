import React, { useState } from 'react';
import { HydrantProject, BudgetType } from '../types/hydrant';
import { ULTGUnit } from '../types/hsse';
import { X, Flame, ShieldCheck, Building2 } from 'lucide-react';

interface NewHydrantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newProject: HydrantProject) => void;
  theme?: 'dark' | 'light';
}

export const NewHydrantModal: React.FC<NewHydrantModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  theme = 'dark',
}) => {
  if (!isOpen) return null;
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [budgetType, setBudgetType] = useState<BudgetType>('AI');
  const [substationLocation, setSubstationLocation] = useState('GI 150 kV Manisrejo');
  const [ultg, setUltg] = useState<ULTGUnit>('ULTG Madiun');
  const [vendorName, setVendorName] = useState('PT Rekatama Mandiri Teknik');
  const [spkContractNo, setSpkContractNo] = useState('088.PJ/DAN.02.01/UPT-MDN/2026');
  const [paguAnggaran, setPaguAnggaran] = useState(1200000000);
  const [startDate, setStartDate] = useState('01 Agustus 2026');
  const [targetCompletionDate, setTargetCompletionDate] = useState('30 November 2026');
  const [progresFisik, setProgresFisik] = useState(65.0);
  const [targetFisik, setTargetFisik] = useState(60.0);
  const [kapasitasTandonAir, setKapasitasTandonAir] = useState('100 m³');
  const [jumlahPillarHydrant, setJumlahPillarHydrant] = useState(6);
  const [kendala, setKendala] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Mohon masukkan nama pekerjaan hydrant!');
      return;
    }

    const randomSuffix = Math.floor(10 + Math.random() * 90);
    const newProject: HydrantProject = {
      id: `HYD-${budgetType}-2026-${randomSuffix}`,
      code: `PRJ/UPTM-${budgetType}/HYD/2026/${randomSuffix}`,
      budgetType,
      title: title.trim(),
      substationLocation: substationLocation.trim(),
      ultg,
      vendorName: vendorName.trim(),
      spkContractNo: spkContractNo.trim(),
      contractDate: '15 Juli 2026',
      startDate,
      targetCompletionDate,
      paguAnggaran: Number(paguAnggaran),
      realisasiKeuangan: Math.round(Number(paguAnggaran) * (Number(progresFisik) / 100) * 0.85),
      progresFisik: Number(progresFisik),
      targetFisikSdHariIni: Number(targetFisik),
      deviasiFisik: Number((Number(progresFisik) - Number(targetFisik)).toFixed(1)),
      status: Number(progresFisik) >= 100 
        ? 'Selesai 100%' 
        : Number(progresFisik) >= 85 
        ? 'Testing & Commissioning' 
        : 'Instalasi Pipa & Pillar',
      milestones: [
        { nama: 'Pekerjaan Sipil Rumah Pompa & Tandon Air', bobot: 30, progres: Math.min(100, Number(progresFisik) * 1.2), status: 'Selesai' },
        { nama: 'Pemasangan Pipa Loop & Pillar Hydrant', bobot: 35, progres: Math.min(100, Number(progresFisik)), status: 'Sedang Berjalan' },
        { nama: 'Instalasi Fire Pump Set (Diesel, Electric, Jockey)', bobot: 20, progres: Math.max(0, Number(progresFisik) - 30), status: 'Sedang Berjalan' },
        { nama: 'Testing, Commissioning & Pelatihan Petugas GI', bobot: 15, progres: 0, status: 'Belum Mulai' },
      ],
      spec: {
        kapasitasTandonAir,
        tekananJaringanSiaga: '8.5 Bar',
        statusJockeyPump: 'Normal Siaga',
        statusElectricPump: 'Normal Siaga',
        statusDieselPump: 'Uji Coba',
        jumlahPillarHydrant: Number(jumlahPillarHydrant),
        delugeTrafoReady: true,
        boxHydrantLengkap: Number(jumlahPillarHydrant),
      },
      lastUpdateDate: '16 Oktober 2026',
      kendalaLapangan: kendala.trim() || undefined,
      tindakLanjut: kendala.trim() ? 'Koordinasi percepatan dengan vendor pelaksana.' : undefined,
    };

    onSubmit(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className={`border rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-950 text-rose-400 border border-rose-800 rounded-lg">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Tambah Pekerjaan Hydrant (AO / AI)</h3>
              <p className="text-xs text-slate-400">Pendaftaran proyek proteksi kebakaran hydrant UPT Madiun</p>
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
          
          {/* Budget Type Selector: AO vs AI */}
          <div className="flex items-center gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="font-semibold text-slate-300">Sumber Anggaran:</span>
            <div className="flex items-center gap-2">
              <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                budgetType === 'AI' ? 'bg-purple-950 border-purple-600 text-purple-300 font-bold' : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}>
                <input
                  type="radio"
                  name="budgetType"
                  value="AI"
                  checked={budgetType === 'AI'}
                  onChange={() => setBudgetType('AI')}
                  className="hidden"
                />
                <span>Anggaran Investasi (AI) - Pembangunan Baru / Deluge</span>
              </label>

              <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                budgetType === 'AO' ? 'bg-emerald-950 border-emerald-600 text-emerald-300 font-bold' : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}>
                <input
                  type="radio"
                  name="budgetType"
                  value="AO"
                  checked={budgetType === 'AO'}
                  onChange={() => setBudgetType('AO')}
                  className="hidden"
                />
                <span>Anggaran Operasi (AO) - Pemeliharaan & Overhaul</span>
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-200 mb-1">
              Nama Pekerjaan Hydrant <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Pembangunan Instalasi Deluge Water Spray Trafo 1-2 GI Manisrejo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Location & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Lokasi Gardu Induk (GI)</label>
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
                <option value="Kantor UPT Madiun">Kantor UPT Madiun</option>
              </select>
            </div>
          </div>

          {/* Vendor and SPK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Mitra Kontraktor Pelaksana</label>
              <input
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Nomor SPK / Kontrak</label>
              <input
                type="text"
                value={spkContractNo}
                onChange={(e) => setSpkContractNo(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Budget Pagu & Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Pagu Anggaran (IDR)</label>
              <input
                type="number"
                step="1000000"
                value={paguAnggaran}
                onChange={(e) => setPaguAnggaran(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Tanggal Mulai</label>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Target Selesai</label>
              <input
                type="text"
                value={targetCompletionDate}
                onChange={(e) => setTargetCompletionDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Progress Targets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Progres Fisik Aktual s.d. Hari Ini (%)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={progresFisik}
                onChange={(e) => setProgresFisik(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Target Rencana Sesuai Kurva-S (%)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={targetFisik}
                onChange={(e) => setTargetFisik(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Spec: Tandon & Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Kapasitas Tandon Air</label>
              <input
                type="text"
                value={kapasitasTandonAir}
                onChange={(e) => setKapasitasTandonAir(e.target.value)}
                placeholder="Contoh: 100 m³"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Jumlah Pillar Hydrant</label>
              <input
                type="number"
                min="1"
                max="50"
                value={jumlahPillarHydrant}
                onChange={(e) => setJumlahPillarHydrant(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block font-semibold text-slate-200 mb-1">Catatan Lapangan & Status Kesiapan</label>
            <textarea
              rows={2}
              value={kendala}
              onChange={(e) => setKendala(e.target.value)}
              placeholder="Catatan koordinasi padam, pengadaan material, atau pengujian..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-sm"
            >
              Simpan Proyek Hydrant
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
