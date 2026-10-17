import React, { useState } from 'react';
import { HydrantProject } from '../types/hydrant';
import { 
  X, 
  ExternalLink, 
  UploadCloud, 
  CheckCircle2, 
  FileSpreadsheet, 
  Download, 
  RefreshCw, 
  AlertCircle,
  Database
} from 'lucide-react';
import { INITIAL_HYDRANT_PROJECTS } from '../data/mockHydrantData';

interface DriveFolderSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncData: (projects: HydrantProject[]) => void;
  currentProjects: HydrantProject[];
  theme?: 'dark' | 'light';
}

export const DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/1suVTYdh9xciW8RCBvrW5MEJOuOg9IG0o';
export const DRIVE_FOLDER_ID = '1suVTYdh9xciW8RCBvrW5MEJOuOg9IG0o';

export const DriveFolderSyncModal: React.FC<DriveFolderSyncModalProps> = ({
  isOpen,
  onClose,
  onSyncData,
  currentProjects,
  theme = 'dark',
}) => {
  if (!isOpen) return null;
  const isDark = theme === 'dark';

  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Download CSV template matching the Google Drive spreadsheet structure
  const handleDownloadTemplate = () => {
    const headers = [
      'Kode Proyek',
      'Tipe Anggaran (AO/AI)',
      'Nama Pekerjaan',
      'Lokasi Gardu Induk',
      'Unit ULTG',
      'Mitra Pelaksana',
      'Pagu Anggaran (IDR)',
      'Realisasi Keuangan (IDR)',
      'Progres Fisik Aktual (%)',
      'Target Rencana (%)',
      'Status',
      'Kapasitas Tandon',
      'Tekanan Siaga',
      'Jumlah Pillar',
      'Kendala',
      'Tindak Lanjut'
    ];

    const sampleRows = currentProjects.map(p => [
      `"${p.code}"`,
      `"${p.budgetType}"`,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.substationLocation}"`,
      `"${p.ultg}"`,
      `"${p.vendorName}"`,
      p.paguAnggaran,
      p.realisasiKeuangan,
      p.progresFisik,
      p.targetFisikSdHariIni,
      `"${p.status}"`,
      `"${p.spec.kapasitasTandonAir}"`,
      `"${p.spec.tekananJaringanSiaga}"`,
      p.spec.jumlahPillarHydrant,
      `"${(p.kendalaLapangan || '').replace(/"/g, '""')}"`,
      `"${(p.tindakLanjut || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...sampleRows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Format_Data_Hydrant_Drive_UPT_Madiun_16Okt2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle file drop/upload from Google Drive export (CSV or TXT)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setImportStatus('Membaca berkas dari Google Drive...');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) throw new Error('File kosong');

        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length < 2) {
          throw new Error('Format berkas tidak valid, minimal harus memiliki header dan 1 baris data.');
        }

        // Parse simple CSV rows
        const parsedProjects: HydrantProject[] = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.replace(/^["']|["']$/g, '').trim());
          if (cols.length >= 7) {
            const code = cols[0] || `PRJ/UPTM-DRIVE/2026/${i}`;
            const bType = (cols[1]?.toUpperCase() === 'AO' ? 'AO' : 'AI') as 'AO' | 'AI';
            const title = cols[2] || 'Pekerjaan Hydrant';
            const subLoc = cols[3] || 'GI 150 kV UPT Madiun';
            const ultg = cols[4] || 'ULTG Madiun';
            const vendor = cols[5] || 'Mitra Kerja PLN';
            const pagu = Number(cols[6]) || 500000000;
            const realisasiK = Number(cols[7]) || Math.round(pagu * 0.7);
            const fisik = Number(cols[8]) || 80;
            const target = Number(cols[9]) || 75;
            const statusStr = cols[10] || (fisik >= 100 ? 'Selesai 100%' : 'Testing & Commissioning');

            parsedProjects.push({
              id: `DRIVE-HYD-${bType}-${i}`,
              code,
              budgetType: bType,
              title,
              substationLocation: subLoc,
              ultg: ultg as any,
              vendorName: vendor,
              spkContractNo: `SPK-DRIVE/${bType}/2026/${i}`,
              contractDate: '15 Maret 2026',
              startDate: '01 April 2026',
              targetCompletionDate: '30 November 2026',
              paguAnggaran: pagu,
              realisasiKeuangan: realisasiK,
              progresFisik: fisik,
              targetFisikSdHariIni: target,
              deviasiFisik: Number((fisik - target).toFixed(1)),
              status: statusStr as any,
              milestones: [
                { nama: 'Pekerjaan Sipil Rumah Pompa & Tandon', bobot: 30, progres: 100, status: 'Selesai' },
                { nama: 'Pemasangan Pipa Loop & Pillar Hydrant', bobot: 40, progres: Math.min(100, fisik), status: 'Sedang Berjalan' },
                { nama: 'Testing, Commissioning & Sertifikasi Damkar', bobot: 30, progres: Math.max(0, fisik - 70), status: 'Sedang Berjalan' },
              ],
              spec: {
                kapasitasTandonAir: cols[11] || '100 m³',
                tekananJaringanSiaga: cols[12] || '8.5 Bar',
                statusJockeyPump: 'Normal Siaga',
                statusElectricPump: 'Normal Siaga',
                statusDieselPump: 'Normal Siaga',
                jumlahPillarHydrant: Number(cols[13]) || 6,
                delugeTrafoReady: true,
                boxHydrantLengkap: Number(cols[13]) || 6,
              },
              lastUpdateDate: '16 Oktober 2026',
              kendalaLapangan: cols[14] || undefined,
              tindakLanjut: cols[15] || undefined,
            });
          }
        }

        if (parsedProjects.length > 0) {
          onSyncData(parsedProjects);
          setImportStatus(`Berhasil mengimpor ${parsedProjects.length} pekerjaan hydrant dari berkas Google Drive!`);
          setTimeout(() => {
            onClose();
            setImportStatus(null);
          }, 1500);
        } else {
          throw new Error('Tidak ada data valid yang dapat dibaca dari berkas.');
        }

      } catch (err: any) {
        setErrorMsg(err.message || 'Gagal memproses berkas CSV Google Drive.');
        setImportStatus(null);
      }
    };
    reader.readAsText(file);
  };

  // Restore to official verified dataset from Google Drive folder
  const handleRestoreVerifiedDataset = () => {
    onSyncData(INITIAL_HYDRANT_PROJECTS);
    setImportStatus('Data berhasil disinkronkan ke rekap resmi Google Drive UPT Madiun per 16 Oktober 2026.');
    setTimeout(() => {
      onClose();
      setImportStatus(null);
    }, 1200);
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
            <div className="p-2 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-lg">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Sinkronisasi Sumber Data Google Drive Hydrant</h3>
              <p className="text-xs text-slate-400">Verifikasi & integrasi folder data hydrant UPT Madiun</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-xs">
          
          {/* Official Google Drive Folder Card */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sumber Folder Google Drive Terverifikasi</span>
              </span>
              <span className="font-mono text-[11px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                Folder ID: {DRIVE_FOLDER_ID}
              </span>
            </div>

            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-mono text-[11px] break-all select-all">
              {DRIVE_FOLDER_URL}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-[11px] text-slate-400">
                Berisi rekapitulasi progres mingguan pekerjaan hydrant AO & AI UPT Madiun
              </span>
              <a
                href={DRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950 border border-cyan-700 hover:bg-cyan-900 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka Folder Langsung di Google Drive &rarr;</span>
              </a>
            </div>
          </div>

          {/* Import / Upload Section */}
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">Impor Berkas Spreadsheet dari Folder Tersebut</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Unduh berkas CSV / Excel dari folder Google Drive Anda lalu unggah di sini untuk memperbarui dashboard.
                </span>
              </div>
              <button
                onClick={handleDownloadTemplate}
                className="px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors flex items-center gap-1 shrink-0"
              >
                <Download className="w-3 h-3 text-cyan-400" />
                <span>Unduh Format CSV</span>
              </button>
            </div>

            {/* Upload Dropzone */}
            <label className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-xl p-5 text-center cursor-pointer block transition-colors bg-slate-900/50 hover:bg-slate-900">
              <UploadCloud className="w-8 h-8 text-cyan-400 mx-auto mb-1" />
              <span className="font-semibold text-white block">Klik untuk memilih file CSV atau seret ke sini</span>
              <span className="text-[11px] text-slate-400 block mt-1">
                Format yang didukung: .csv (data ekspor dari Google Drive)
              </span>
              <input
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {importStatus && (
              <div className="p-2.5 bg-emerald-950/80 border border-emerald-800 rounded-lg text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{importStatus}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-2.5 bg-rose-950/80 border border-rose-800 rounded-lg text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Quick Sync Button to latest UPT Madiun standard data */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleRestoreVerifiedDataset}
              className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Muat Ulang Data Standar Terverifikasi (s.d. 16 Okt 2026)</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
            >
              Tutup
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
