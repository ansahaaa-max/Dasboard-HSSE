import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle, Plus, Edit2 } from 'lucide-react';
import { ULTGLocation } from '../types/dashboard';

interface UnifiedDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: 'apd' | 'fire' | 'program' | 'cctv' | 'sarpras' | 'portal' | 'satpam' | 'anggaran' | 'indicator' | 'indicator-sec' | null;
  editItem?: any | null;
  onSave: (entityType: string, data: any) => void;
  theme: 'dark' | 'light';
}

const LOCATIONS: ULTGLocation[] = [
  'Kantor UPT Madiun',
  'GI 150 kV Manisrejo',
  'GI 150 kV Dolopo',
  'GI 150 kV Ponorogo',
  'GI 150 kV Pacitan',
  'GI 150 kV Ngawi',
  'GITET 500 kV Ngawi',
  'GI 150 kV Magetan',
  'GI 150 kV Caruban',
  'GI 150 kV Trenggalek',
];

export const UnifiedDataModal: React.FC<UnifiedDataModalProps> = ({
  isOpen,
  onClose,
  entityType,
  editItem,
  onSave,
  theme,
}) => {
  if (!isOpen || !entityType) return null;

  const isDark = theme === 'dark';
  const isEditing = Boolean(editItem);

  // Form State
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (editItem) {
      setFormData({ ...editItem });
    } else {
      // Default empty state based on entityType
      const idPrefix = entityType.toUpperCase().slice(0, 3);
      const defaultId = `${idPrefix}-${Math.floor(100 + Math.random() * 900)}`;

      if (entityType === 'apd') {
        setFormData({
          id: defaultId,
          namaApd: '',
          jenis: 'Pelindung Kepala',
          lokasi: 'GI 150 kV Manisrejo',
          jumlah: 10,
          kondisi: 'Baik',
          statusKelayakan: 'Layak Pakai',
          tanggalPemeriksaan: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
          masaBerlaku: 'Oktober 2028',
          kebutuhanPengadaan: 0,
          pic: 'Team Leader K3',
          keterangan: 'Tersimpan di lemari APD',
        });
      } else if (entityType === 'fire') {
        setFormData({
          id: defaultId,
          kodePeralatan: `FIRE-${Math.floor(10 + Math.random() * 90)}`,
          jenis: 'APAR Powder',
          lokasi: 'GI 150 kV Manisrejo',
          posisiDetail: 'Gedung Kontrol',
          jumlah: 2,
          kondisi: 'Siaga Normal',
          statusPemeriksaan: 'Lulus Uji',
          tanggalPemeriksaan: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
          jadwalPemeliharaanBerikutnya: '15 April 2027',
          temuanInspeksi: 'Tekanan jarum normal di zona hijau',
          tindakLanjutPerbaikan: 'Pembersihan berkala',
          pic: 'Petugas K3L',
        });
      } else if (entityType === 'program') {
        setFormData({
          id: defaultId,
          namaPekerjaan: '',
          jenisProgram: 'Safety Patrol',
          lokasi: 'GI 150 kV Manisrejo',
          tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
          pic: 'Supervisor K3',
          progres: 50,
          status: 'Sedang Berjalan',
          kendala: '',
          tindakanPerbaikan: 'Lakukan pengawasan berlapis dan pemasangan safety line',
        });
      } else if (entityType === 'cctv') {
        setFormData({
          id: defaultId,
          kodeKamera: `CAM-${Math.floor(10 + Math.random() * 90)}`,
          namaKamera: '',
          lokasi: 'GI 150 kV Manisrejo',
          unitKerja: 'ULTG Madiun',
          jenisKamera: 'PTZ Outdoor',
          kondisi: 'Baik',
          statusOperasional: 'Aktif Online',
          tanggalPemeriksaan: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
          pic: 'Staff Keamanan',
          keterangan: 'Kamera pengawas perimeter sudut barat',
          tindakLanjut: 'Pemeriksaan rutin kabel FO',
          koordinatLat: -7.6324,
          koordinatLng: 111.5342,
          ipAddress: '10.35.12.115',
          streamingProtocol: 'RTSP (Encrypted)',
        });
      } else if (entityType === 'sarpras') {
        setFormData({
          id: defaultId,
          namaSarpras: '',
          kategori: 'Perlengkapan Patroli',
          lokasi: 'GI 150 kV Manisrejo',
          jumlah: 2,
          kondisi: 'Baik',
          statusKelayakan: 'Layak Pakai',
          tanggalPemeriksaan: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
          pic: 'Danru Satpam',
          keterangan: 'Peralatan operasional pos pengamanan',
        });
      } else if (entityType === 'portal') {
        setFormData({
          id: defaultId,
          kodePortal: `PORTAL-${Math.floor(10 + Math.random() * 90)}`,
          namaPortal: '',
          lokasi: 'GI 150 kV Manisrejo',
          jenisPortal: 'Automatic Barrier Gate',
          kondisiFisik: 'Baik',
          statusOperasional: 'Beroperasi Normal',
          tanggalPemeriksaan: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
          pic: 'Koordinator Satpam',
          catatanPerbaikan: 'Motor penggerak normal beroperasi',
        });
      } else if (entityType === 'satpam') {
        setFormData({
          id: `SEC-${Math.floor(100 + Math.random() * 900)}`,
          namaPersonel: '',
          perusahaanPenyedia: 'PT Haleyora Power (BUJP Resmi)',
          lokasiPenugasan: 'GI 150 kV Manisrejo',
          statusAktif: 'Aktif',
          shiftPenugasan: 'Shift 1 (Pagi)',
          kualifikasiGada: 'Gada Pratama',
          noKtaSatpam: `KTA-POLDA-${Math.floor(1000 + Math.random() * 9000)}`,
          masaBerlakuKta: '15 Desember 2028',
          noHp: '0812-3456-7890',
          koordinatorPic: 'Danru Satpam UPT Madiun',
        });
      } else if (entityType === 'anggaran') {
        setFormData({
          id: `ANG-${Math.floor(100 + Math.random() * 900)}`,
          kategoriUtama: 'K3',
          programKerja: '',
          jenisAnggaran: 'AO (Anggaran Operasi)',
          paguAnggaran: 100000000,
          realisasiAnggaran: 80000000,
          sisaAnggaran: 20000000,
          persentaseRealisasi: 80,
          bulan: 'Oktober 2026',
          statusRealisasi: 'Sesuai Rencana',
          keterangan: 'Realisasi penyerapan anggaran tahun berjalan',
        });
      } else if (entityType === 'indicator' || entityType === 'indicator-sec') {
        setFormData({
          id: `IND-${Math.floor(100 + Math.random() * 900)}`,
          category: 'Kepatuhan Operasi',
          indicator: '',
          currentScore: 4.2,
          targetScore: 4.5,
          status: 'Memenuhi',
          gapDescription: '',
          followUpPlan: '',
          pic: 'Team Leader HSSE',
          targetDate: '31 Desember 2026',
        });
      }
    }
  }, [entityType, editItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(entityType, formData);
    onClose();
  };

  const getModalTitle = () => {
    const titles: Record<string, string> = {
      apd: 'Alat Pelindung Diri (APD)',
      fire: 'Peralatan Fire Prevention & Hydrant',
      program: 'Program K3 Lainnya',
      cctv: 'Kamera CCTV Keamanan',
      sarpras: 'Sarana & Prasarana Keamanan',
      portal: 'Portal / Gerbang Keamanan',
      satpam: 'Personel Satpam Pengamanan',
      anggaran: 'Mata Anggaran K3 & Keamanan',
      indicator: 'Indikator Maturity Level K3',
      'indicator-sec': 'Indikator Maturity Level Keamanan',
    };
    return `${isEditing ? 'Perbarui' : 'Tambah'} ${titles[entityType] || 'Data'}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden my-8 ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
        }`}>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              {isEditing ? <Edit2 className="w-4 h-4 text-cyan-400" /> : <Plus className="w-4 h-4 text-emerald-400" />}
              <span>{getModalTitle()}</span>
            </h3>
            <p className="text-xs text-slate-400">PT PLN (Persero) UPT Madiun</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* APD FIELDS */}
          {entityType === 'apd' && (
            <>
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Nama APD & Model</label>
                <input
                  type="text"
                  required
                  value={formData.namaApd || ''}
                  onChange={(e) => setFormData({ ...formData, namaApd: e.target.value })}
                  placeholder="Contoh: Helm Keselamatan V-Gard + Chinstrap"
                  className={`w-full px-3 py-2 rounded-lg border outline-none ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Jenis APD</label>
                  <select
                    value={formData.jenis || 'Pelindung Kepala'}
                    onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="Pelindung Kepala">Pelindung Kepala</option>
                    <option value="Pelindung Jatuh">Pelindung Jatuh</option>
                    <option value="Pelindung Kaki">Pelindung Kaki</option>
                    <option value="Pelindung Tangan Isolasi">Pelindung Tangan Isolasi</option>
                    <option value="Detektor Listrik">Detektor Listrik</option>
                    <option value="Pelindung Mata & Wajah">Pelindung Mata & Wajah</option>
                    <option value="Pakaian Kerja / Rompi">Pakaian Kerja / Rompi</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Lokasi Penyimpanan</label>
                  <select
                    value={formData.lokasi || 'GI 150 kV Manisrejo'}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Jumlah Unit</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.jumlah || 1}
                    onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) || 0 })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Kondisi</label>
                  <select
                    value={formData.kondisi || 'Baik'}
                    onChange={(e) => setFormData({ ...formData, kondisi: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="Baik">Baik</option>
                    <option value="Rusak Ringan">Rusak Ringan</option>
                    <option value="Rusak Berat">Rusak Berat</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Kelayakan</label>
                  <select
                    value={formData.statusKelayakan || 'Layak Pakai'}
                    onChange={(e) => setFormData({ ...formData, statusKelayakan: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="Layak Pakai">Layak Pakai</option>
                    <option value="Perlu Kalibrasi / Uji">Perlu Kalibrasi / Uji</option>
                    <option value="Tidak Layak">Tidak Layak</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Tgl Pemeriksaan</label>
                  <input
                    type="text"
                    value={formData.tanggalPemeriksaan || ''}
                    onChange={(e) => setFormData({ ...formData, tanggalPemeriksaan: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Masa Berlaku / Exp</label>
                  <input
                    type="text"
                    value={formData.masaBerlaku || ''}
                    onChange={(e) => setFormData({ ...formData, masaBerlaku: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">PIC Penanggung Jawab</label>
                <input
                  type="text"
                  value={formData.pic || ''}
                  onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
                  placeholder="Nama PIC / Petugas K3"
                  className={`w-full px-3 py-2 rounded-lg border outline-none ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>
            </>
          )}

          {/* FIRE / HYDRANT FIELDS */}
          {entityType === 'fire' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Kode Peralatan</label>
                  <input
                    type="text"
                    required
                    value={formData.kodePeralatan || ''}
                    onChange={(e) => setFormData({ ...formData, kodePeralatan: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Jenis Peralatan</label>
                  <select
                    value={formData.jenis || 'APAR Powder'}
                    onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="APAR Powder">APAR Powder</option>
                    <option value="APAR CO2">APAR CO2</option>
                    <option value="APAR Foam">APAR Foam</option>
                    <option value="Hydrant Pillar">Hydrant Pillar</option>
                    <option value="Pompa Hydrant Diesel">Pompa Hydrant Diesel</option>
                    <option value="Pompa Hydrant Elektrik">Pompa Hydrant Elektrik</option>
                    <option value="Pompa Jockey">Pompa Jockey</option>
                    <option value="Tandon Air">Tandon Air</option>
                    <option value="Deluge System">Deluge System</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Lokasi Gardu Induk</label>
                  <select
                    value={formData.lokasi || 'GI 150 kV Manisrejo'}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Posisi Detail</label>
                  <input
                    type="text"
                    value={formData.posisiDetail || ''}
                    onChange={(e) => setFormData({ ...formData, posisiDetail: e.target.value })}
                    placeholder="Contoh: Switchyard Bay Trafo 1"
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Kondisi</label>
                  <select
                    value={formData.kondisi || 'Siaga Normal'}
                    onChange={(e) => setFormData({ ...formData, kondisi: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="Siaga Normal">Siaga Normal</option>
                    <option value="Perlu Perbaikan">Perlu Perbaikan</option>
                    <option value="Kosong / Bertekanan Rendah">Kosong / Bertekanan Rendah</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Status Pemeriksaan</label>
                  <select
                    value={formData.statusPemeriksaan || 'Lulus Uji'}
                    onChange={(e) => setFormData({ ...formData, statusPemeriksaan: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="Lulus Uji">Lulus Uji</option>
                    <option value="Dalam Pemeliharaan">Dalam Pemeliharaan</option>
                    <option value="Jatuh Tempo Periksa">Jatuh Tempo Periksa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">Temuan Inspeksi</label>
                <textarea
                  rows={2}
                  value={formData.temuanInspeksi || ''}
                  onChange={(e) => setFormData({ ...formData, temuanInspeksi: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border outline-none ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>
            </>
          )}

          {/* PROGRAM K3 FIELDS */}
          {entityType === 'program' && (
            <>
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Nama Pekerjaan / Program K3</label>
                <input
                  type="text"
                  required
                  value={formData.namaPekerjaan || ''}
                  onChange={(e) => setFormData({ ...formData, namaPekerjaan: e.target.value })}
                  placeholder="Contoh: Inspeksi K3 Switchyard Triwulan IV"
                  className={`w-full px-3 py-2 rounded-lg border outline-none ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Jenis Program</label>
                  <select
                    value={formData.jenisProgram || 'Safety Patrol'}
                    onChange={(e) => setFormData({ ...formData, jenisProgram: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="Inspeksi K3">Inspeksi K3</option>
                    <option value="Safety Patrol">Safety Patrol</option>
                    <option value="Audit K3">Audit K3</option>
                    <option value="JSA">JSA (Job Safety Analysis)</option>
                    <option value="Pelatihan & Sosialisasi K3">Pelatihan & Sosialisasi K3</option>
                    <option value="Program Keselamatan Pekerjaan">Program Keselamatan Pekerjaan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Lokasi</label>
                  <select
                    value={formData.lokasi || 'GI 150 kV Manisrejo'}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Progres ({formData.progres || 0}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.progres || 0}
                    onChange={(e) => setFormData({ ...formData, progres: parseInt(e.target.value) || 0 })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Status</label>
                  <select
                    value={formData.status || 'Sedang Berjalan'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="Selesai">Selesai</option>
                    <option value="Sedang Berjalan">Sedang Berjalan</option>
                    <option value="Terkendala">Terkendala</option>
                    <option value="Direncanakan">Direncanakan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">Kendala (Jika ada)</label>
                <input
                  type="text"
                  value={formData.kendala || ''}
                  onChange={(e) => setFormData({ ...formData, kendala: e.target.value })}
                  placeholder="Deskripsi kendala teknis atau pengadaan"
                  className={`w-full px-3 py-2 rounded-lg border outline-none ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">Tindakan Perbaikan</label>
                <textarea
                  rows={2}
                  value={formData.tindakanPerbaikan || ''}
                  onChange={(e) => setFormData({ ...formData, tindakanPerbaikan: e.target.value })}
                  placeholder="Rencana tindak lanjut dan mitigasi"
                  className={`w-full px-3 py-2 rounded-lg border outline-none ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>
            </>
          )}

          {/* CCTV FIELDS */}
          {entityType === 'cctv' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Kode Kamera</label>
                  <input
                    type="text"
                    required
                    value={formData.kodeKamera || ''}
                    onChange={(e) => setFormData({ ...formData, kodeKamera: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Nama / Posisi Kamera</label>
                  <input
                    type="text"
                    required
                    value={formData.namaKamera || ''}
                    onChange={(e) => setFormData({ ...formData, namaKamera: e.target.value })}
                    placeholder="Contoh: Kamera Switchyard 150kV"
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Lokasi</label>
                  <select
                    value={formData.lokasi || 'GI 150 kV Manisrejo'}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Jenis Kamera</label>
                  <select
                    value={formData.jenisKamera || 'PTZ Outdoor'}
                    onChange={(e) => setFormData({ ...formData, jenisKamera: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="PTZ Outdoor">PTZ Outdoor</option>
                    <option value="Fixed Bullet">Fixed Bullet</option>
                    <option value="Dome Indoor">Dome Indoor</option>
                    <option value="Thermal Camera">Thermal Camera</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Status Operasional</label>
                  <select
                    value={formData.statusOperasional || 'Aktif Online'}
                    onChange={(e) => setFormData({ ...formData, statusOperasional: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="Aktif Online">Aktif Online</option>
                    <option value="Offline / Gangguan">Offline / Gangguan</option>
                    <option value="Pemeliharaan">Pemeliharaan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">IP Address (Terproteksi)</label>
                  <input
                    type="text"
                    value={formData.ipAddress || ''}
                    onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                    placeholder="10.35.12.xxx"
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>
              </div>
            </>
          )}

          {/* SATPAM FIELDS */}
          {entityType === 'satpam' && (
            <>
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Nama Personel Satpam</label>
                <input
                  type="text"
                  required
                  value={formData.namaPersonel || ''}
                  onChange={(e) => setFormData({ ...formData, namaPersonel: e.target.value })}
                  placeholder="Nama lengkap satpam"
                  className={`w-full px-3 py-2 rounded-lg border outline-none ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Vendor BUJP</label>
                  <select
                    value={formData.perusahaanPenyedia || 'PT Haleyora Power'}
                    onChange={(e) => setFormData({ ...formData, perusahaanPenyedia: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="PT Haleyora Power">PT Haleyora Power</option>
                    <option value="PT Garda Utama Sejahtera">PT Garda Utama Sejahtera</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Lokasi Penugasan</label>
                  <select
                    value={formData.lokasiPenugasan || 'GI 150 kV Manisrejo'}
                    onChange={(e) => setFormData({ ...formData, lokasiPenugasan: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Kualifikasi Gada</label>
                  <select
                    value={formData.kualifikasiGada || 'Gada Pratama'}
                    onChange={(e) => setFormData({ ...formData, kualifikasiGada: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="Gada Pratama">Gada Pratama</option>
                    <option value="Gada Madya">Gada Madya</option>
                    <option value="Gada Utama">Gada Utama</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Shift Penugasan</label>
                  <select
                    value={formData.shiftPenugasan || 'Shift 1 (Pagi)'}
                    onChange={(e) => setFormData({ ...formData, shiftPenugasan: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="Shift 1 (Pagi)">Shift 1 (Pagi)</option>
                    <option value="Shift 2 (Siang)">Shift 2 (Siang)</option>
                    <option value="Shift 3 (Malam)">Shift 3 (Malam)</option>
                    <option value="Non-Shift">Non-Shift</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* ANGGARAN FIELDS */}
          {entityType === 'anggaran' && (
            <>
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Program Kerja Anggaran</label>
                <input
                  type="text"
                  required
                  value={formData.programKerja || ''}
                  onChange={(e) => setFormData({ ...formData, programKerja: e.target.value })}
                  placeholder="Contoh: Pengadaan APD & Kalibrasi Sarung Tangan 20kV"
                  className={`w-full px-3 py-2 rounded-lg border outline-none ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Kategori Utama</label>
                  <select
                    value={formData.kategoriUtama || 'K3'}
                    onChange={(e) => setFormData({ ...formData, kategoriUtama: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="K3">K3</option>
                    <option value="Keamanan">Keamanan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Jenis Anggaran</label>
                  <select
                    value={formData.jenisAnggaran || 'AO (Anggaran Operasi)'}
                    onChange={(e) => setFormData({ ...formData, jenisAnggaran: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="AO (Anggaran Operasi)">AO (Anggaran Operasi)</option>
                    <option value="AI (Anggaran Investasi)">AI (Anggaran Investasi)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Pagu Rencana (Rp)</label>
                  <input
                    type="number"
                    value={formData.paguAnggaran || 0}
                    onChange={(e) => {
                      const pagu = parseFloat(e.target.value) || 0;
                      const real = formData.realisasiAnggaran || 0;
                      setFormData({
                        ...formData,
                        paguAnggaran: pagu,
                        sisaAnggaran: Math.max(0, pagu - real),
                        persentaseRealisasi: pagu > 0 ? Math.round((real / pagu) * 1000) / 10 : 0
                      });
                    }}
                    className={`w-full px-3 py-2 rounded-lg border outline-none font-mono ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Realisasi (Rp)</label>
                  <input
                    type="number"
                    value={formData.realisasiAnggaran || 0}
                    onChange={(e) => {
                      const real = parseFloat(e.target.value) || 0;
                      const pagu = formData.paguAnggaran || 0;
                      setFormData({
                        ...formData,
                        realisasiAnggaran: real,
                        sisaAnggaran: Math.max(0, pagu - real),
                        persentaseRealisasi: pagu > 0 ? Math.round((real / pagu) * 1000) / 10 : 0
                      });
                    }}
                    className={`w-full px-3 py-2 rounded-lg border outline-none font-mono ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl font-semibold border ${
                isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md active:scale-95"
            >
              Simpan Data
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
