import React from 'react';
import { WorkJob, IncidentReport } from '../types/hsse';
import { X, Printer, Download, FileText, CheckCircle2 } from 'lucide-react';
import { CorporateBrandLockup } from './Logos';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: WorkJob[];
  incidents: IncidentReport[];
  safeHours: number;
  daysWithoutLti: number;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  jobs,
  incidents,
  safeHours,
  daysWithoutLti,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    // Generate CSV content for jobs
    const headers = ['No PTW', 'Pekerjaan', 'Lokasi', 'ULTG', 'Tegangan', 'Pengawas K3', 'Status', 'Progress', 'Kepatuhan'];
    const rows = jobs.map(j => [
      `"${j.workingPermitNo}"`,
      `"${j.title}"`,
      `"${j.substationLocation}"`,
      `"${j.ultg}"`,
      `"${j.voltage}"`,
      `"${j.pengawasK3}"`,
      `"${j.status}"`,
      `"${j.progress}%"`,
      `"${j.complianceScore}%"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_HSSE_PLN_UPT_Madiun_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl my-8 print:border-none print:bg-white print:text-black print:m-0 print:w-full">
        
        {/* Header (Hidden on print) */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-base font-bold text-white">Laporan Eksekutif Monitoring HSSE & K3L</h3>
              <p className="text-xs text-slate-400">PT PLN (Persero) Unit Pelaksana Transmisi Madiun</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor CSV</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs text-slate-300 print:max-h-none print:overflow-visible print:text-black">
          
          {/* Corporate Header */}
          <div className="border-b-2 border-slate-700 print:border-black pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <CorporateBrandLockup theme="dark" />
              <div>
                <span className="text-sm font-extrabold tracking-tight text-white print:text-black block">
                  BPI DANANTARA &middot; PT PLN (PERSERO) UIT JBM
                </span>
                <span className="text-xs font-bold text-cyan-400 print:text-black block mt-0.5">
                  UNIT PELAKSANA TRANSMISI MADIUN - BAGIAN K3L & KEAMANAN
                </span>
                <span className="text-[10px] text-slate-400 print:text-gray-600 block mt-0.5">
                  Jl. MT Haryono No. 34, Kota Madiun, Jawa Timur | Telp: (0351) 462-991
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-emerald-400 print:text-green-700 block">
                STATUS: ZERO ACCIDENT
              </span>
              <span className="text-[11px] text-slate-400 print:text-gray-600 block">
                Tanggal Cetak: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Key Executive HSSE Stats */}
          <div>
            <h4 className="text-sm font-bold text-white print:text-black mb-2 uppercase tracking-wide">
              I. Ringkasan Kinerja Keselamatan Kerja (HSSE Performance)
            </h4>
            <div className="grid grid-cols-4 gap-3 print:grid-cols-4">
              <div className="p-3 bg-slate-950 print:bg-gray-100 rounded-lg border border-slate-800 print:border-gray-300">
                <span className="text-[11px] text-slate-400 print:text-gray-600 block">Jam Kerja Selamat</span>
                <span className="text-lg font-bold font-mono text-white print:text-black">{safeHours.toLocaleString('id-ID')} Jam</span>
              </div>
              <div className="p-3 bg-slate-950 print:bg-gray-100 rounded-lg border border-slate-800 print:border-gray-300">
                <span className="text-[11px] text-slate-400 print:text-gray-600 block">Hari Bebas LTI</span>
                <span className="text-lg font-bold font-mono text-emerald-400 print:text-green-700">{daysWithoutLti.toLocaleString('id-ID')} Hari</span>
              </div>
              <div className="p-3 bg-slate-950 print:bg-gray-100 rounded-lg border border-slate-800 print:border-gray-300">
                <span className="text-[11px] text-slate-400 print:text-gray-600 block">Kepatuhan K3 Rata-rata</span>
                <span className="text-lg font-bold font-mono text-cyan-400 print:text-black">98.9%</span>
              </div>
              <div className="p-3 bg-slate-950 print:bg-gray-100 rounded-lg border border-slate-800 print:border-gray-300">
                <span className="text-[11px] text-slate-400 print:text-gray-600 block">Kecelakaan Fatal</span>
                <span className="text-lg font-bold font-mono text-emerald-400 print:text-green-700">0 Kasus</span>
              </div>
            </div>
          </div>

          {/* Active Work Orders */}
          <div>
            <h4 className="text-sm font-bold text-white print:text-black mb-2 uppercase tracking-wide">
              II. Daftar Pekerjaan Lapangan & Status K3 Real-Time
            </h4>
            <table className="w-full text-left border-collapse border border-slate-800 print:border-gray-300">
              <thead className="bg-slate-950 print:bg-gray-200 text-slate-400 print:text-gray-700 font-mono text-[10px]">
                <tr>
                  <th className="border border-slate-800 print:border-gray-300 p-2">No PTW</th>
                  <th className="border border-slate-800 print:border-gray-300 p-2">Pekerjaan</th>
                  <th className="border border-slate-800 print:border-gray-300 p-2">Lokasi / ULTG</th>
                  <th className="border border-slate-800 print:border-gray-300 p-2">Pengawas K3</th>
                  <th className="border border-slate-800 print:border-gray-300 p-2 text-center">Status</th>
                  <th className="border border-slate-800 print:border-gray-300 p-2 text-right">Kepatuhan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-gray-300 text-[11px]">
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="border border-slate-800 print:border-gray-300 p-2 font-mono text-cyan-400 print:text-black font-semibold">
                      {job.workingPermitNo}
                    </td>
                    <td className="border border-slate-800 print:border-gray-300 p-2 font-medium text-white print:text-black">
                      {job.title}
                    </td>
                    <td className="border border-slate-800 print:border-gray-300 p-2">
                      {job.substationLocation} ({job.ultg})
                    </td>
                    <td className="border border-slate-800 print:border-gray-300 p-2">{job.pengawasK3}</td>
                    <td className="border border-slate-800 print:border-gray-300 p-2 text-center font-medium">
                      {job.status}
                    </td>
                    <td className="border border-slate-800 print:border-gray-300 p-2 text-right font-mono font-bold">
                      {job.complianceScore}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Incidents & CAPA */}
          <div>
            <h4 className="text-sm font-bold text-white print:text-black mb-2 uppercase tracking-wide">
              III. Rekapitulasi Pelaporan Insiden & Tindakan Korektif (CAPA)
            </h4>
            <table className="w-full text-left border-collapse border border-slate-800 print:border-gray-300">
              <thead className="bg-slate-950 print:bg-gray-200 text-slate-400 print:text-gray-700 font-mono text-[10px]">
                <tr>
                  <th className="border border-slate-800 print:border-gray-300 p-2">ID Insiden</th>
                  <th className="border border-slate-800 print:border-gray-300 p-2">Tanggal</th>
                  <th className="border border-slate-800 print:border-gray-300 p-2">Kategori</th>
                  <th className="border border-slate-800 print:border-gray-300 p-2">Deskripsi & Lokasi</th>
                  <th className="border border-slate-800 print:border-gray-300 p-2">Tindakan Korektif (CAPA)</th>
                  <th className="border border-slate-800 print:border-gray-300 p-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-gray-300 text-[11px]">
                {incidents.map((inc) => (
                  <tr key={inc.id}>
                    <td className="border border-slate-800 print:border-gray-300 p-2 font-mono text-cyan-400 print:text-black font-semibold">
                      {inc.id}
                    </td>
                    <td className="border border-slate-800 print:border-gray-300 p-2 whitespace-nowrap">{inc.incidentDate}</td>
                    <td className="border border-slate-800 print:border-gray-300 p-2 font-medium">{inc.category}</td>
                    <td className="border border-slate-800 print:border-gray-300 p-2">
                      <span className="font-semibold text-white print:text-black block">{inc.title}</span>
                      <span className="text-[10px] text-slate-400 print:text-gray-600">{inc.location}</span>
                    </td>
                    <td className="border border-slate-800 print:border-gray-300 p-2 text-[10px]">
                      {inc.correctiveAction}
                    </td>
                    <td className="border border-slate-800 print:border-gray-300 p-2 text-center font-medium">
                      {inc.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signatures */}
          <div className="pt-8 grid grid-cols-2 text-center text-xs print:text-black">
            <div>
              <p className="text-slate-400 print:text-gray-600">Disusun oleh:</p>
              <p className="font-semibold text-white print:text-black mt-1">Supervisor Keselamatan Kerja & Lingkungan</p>
              <div className="h-16"></div>
              <p className="font-bold underline text-white print:text-black">Ahmad Faisal, S.T.</p>
              <p className="text-[11px] text-slate-400 print:text-gray-600">Ahli K3 Umum PLN UPT Madiun</p>
            </div>

            <div>
              <p className="text-slate-400 print:text-gray-600">Mengetahui & Menyetujui:</p>
              <p className="font-semibold text-white print:text-black mt-1">Manager Bagian K3L & Kam UPT Madiun</p>
              <div className="h-16"></div>
              <p className="font-bold underline text-white print:text-black">Ir. Hendra Gunawan, M.T.</p>
              <p className="text-[11px] text-slate-400 print:text-gray-600">Manager Bagian K3L</p>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Dokumen Sekarang</span>
          </button>
        </div>

      </div>
    </div>
  );
};
