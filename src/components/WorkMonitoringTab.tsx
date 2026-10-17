import React, { useState } from 'react';
import { WorkJob, ULTGUnit, JobStatus } from '../types/hsse';
import { 
  Search, 
  Filter, 
  MapPin, 
  Zap, 
  Users, 
  Clock, 
  ShieldAlert, 
  CheckCircle, 
  AlertOctagon, 
  ChevronRight, 
  LayoutGrid, 
  ListFilter, 
  HardHat, 
  PlusCircle,
  FileCheck2,
  Lock
} from 'lucide-react';

interface WorkMonitoringTabProps {
  jobs: WorkJob[];
  onSelectJob: (job: WorkJob) => void;
  onOpenNewJob: () => void;
  onTriggerSWA: (jobId: string) => void;
  onResolveSWA: (jobId: string) => void;
  onCompleteJob: (jobId: string) => void;
}

export const WorkMonitoringTab: React.FC<WorkMonitoringTabProps> = ({
  jobs,
  onSelectJob,
  onOpenNewJob,
  onTriggerSWA,
  onResolveSWA,
  onCompleteJob,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUltg, setSelectedUltg] = useState<string>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [selectedRisk, setSelectedRisk] = useState<string>('Semua');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const ultgOptions = ['Semua', 'ULTG Madiun', 'ULTG Ponorogo', 'ULTG Pacitan', 'ULTG Ngawi'];
  const statusOptions = ['Semua', 'Aktif / Berlangsung', 'Safety Briefing / TBM', 'SWA (Dihentikan)', 'Selesai'];
  const riskOptions = ['Semua', 'Kritis', 'Tinggi', 'Sedang', 'Rendah'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.substationLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.workingPermitNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.pengawasK3.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUltg = selectedUltg === 'Semua' || job.ultg === selectedUltg;
    const matchesStatus = selectedStatus === 'Semua' || job.status === selectedStatus;
    const matchesRisk = selectedRisk === 'Semua' || job.riskLevel === selectedRisk;

    return matchesSearch && matchesUltg && matchesStatus && matchesRisk;
  });

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Kritis':
        return <span className="text-rose-400 font-bold">Risiko Kritis</span>;
      case 'Tinggi':
        return <span className="text-amber-400 font-semibold">Risiko Tinggi</span>;
      case 'Sedang':
        return <span className="text-yellow-300 font-medium">Risiko Sedang</span>;
      default:
        return <span className="text-emerald-400 font-medium">Risiko Rendah</span>;
    }
  };

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'Aktif / Berlangsung':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-cyan-300 font-medium bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            Sedang Berlangsung
          </span>
        );
      case 'Safety Briefing / TBM':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-medium bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Safety Briefing / TBM
          </span>
        );
      case 'SWA (Dihentikan)':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-rose-300 font-bold bg-rose-950 px-2 py-0.5 rounded border border-rose-700 animate-pulse">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            SWA DIHENTIKAN
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-medium bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            Selesai Aman
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 font-medium bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Filter and Controls Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama pekerjaan, Gardu Induk, No. Izin Kerja (PTW), atau Pengawas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Reset
              </button>
            )}
          </div>

          {/* Right Action buttons: View Switcher & New PTW */}
          <div className="flex items-center gap-2.5 self-end lg:self-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-lg">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'cards' ? 'bg-cyan-950 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tampilan Kartu"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'table' ? 'bg-cyan-950 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tampilan Tabel"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onOpenNewJob}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Izin Kerja Baru (PTW)</span>
            </button>
          </div>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-800/80 text-xs">
          
          {/* ULTG Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-medium">Unit:</span>
            <div className="flex items-center gap-1 flex-wrap">
              {ultgOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedUltg(opt)}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                    selectedUltg === opt
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <span className="text-slate-700 hidden sm:inline">|</span>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-medium">Status:</span>
            <div className="flex items-center gap-1 flex-wrap">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                    selectedStatus === status
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <span className="text-slate-700 hidden sm:inline">|</span>

          {/* Risk Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Tingkat Risiko:</span>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-300 text-xs focus:outline-none focus:border-cyan-500"
            >
              {riskOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters helper */}
          {(selectedUltg !== 'Semua' || selectedStatus !== 'Semua' || selectedRisk !== 'Semua' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedUltg('Semua');
                setSelectedStatus('Semua');
                setSelectedRisk('Semua');
                setSearchQuery('');
              }}
              className="text-xs text-cyan-400 hover:underline ml-auto"
            >
              Reset Semua Filter
            </button>
          )}

        </div>
      </div>

      {/* Showing count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Menampilkan <strong className="text-white font-mono">{filteredJobs.length}</strong> pekerjaan transmisi</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
          Data terhubung langsung dengan sistem pengawasan K3 lapangan
        </span>
      </div>

      {/* Main Content: Cards or Table */}
      {filteredJobs.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center space-y-3">
          <HardHat className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">Tidak ada pekerjaan yang sesuai dengan kriteria</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Coba ubah kata kunci pencarian atau reset filter ULTG dan status pekerjaan.
          </p>
          <button
            onClick={() => {
              setSelectedUltg('Semua');
              setSelectedStatus('Semua');
              setSelectedRisk('Semua');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800 rounded-lg hover:bg-cyan-900 transition-colors"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : viewMode === 'cards' ? (
        /* Cards Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredJobs.map((job) => {
            const apdPassedCount = Object.values(job.apdChecklist).filter(Boolean).length;
            const isSwa = job.status === 'SWA (Dihentikan)';

            return (
              <div
                key={job.id}
                className={`bg-slate-900/90 border rounded-xl p-5 transition-all flex flex-col justify-between ${
                  isSwa
                    ? 'border-rose-700/80 bg-rose-950/20 shadow-lg shadow-rose-950/30'
                    : 'border-slate-800 hover:border-slate-700 hover:shadow-md hover:shadow-black/20'
                }`}
              >
                <div className="space-y-3">
                  {/* Top metadata row: Unboxed text per constitution */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 border-b border-slate-800/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-cyan-400 font-semibold">{job.workingPermitNo}</span>
                      <span aria-hidden="true">·</span>
                      <span>{job.ultg}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-yellow-400">{job.voltage}</span>
                    </div>
                    <div>
                      {getStatusBadge(job.status)}
                    </div>
                  </div>

                  {/* Title and location */}
                  <div>
                    <h4 
                      onClick={() => onSelectJob(job)}
                      className="text-base font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer leading-snug"
                    >
                      {job.title}
                    </h4>
                    
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{job.substationLocation}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-400">{job.condition}</span>
                    </div>
                  </div>

                  {/* SWA Notice Box if Stopped */}
                  {isSwa && (
                    <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-lg text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-rose-300 font-bold">
                        <AlertOctagon className="w-4 h-4 text-rose-400" />
                        <span>Pekerjaan Dihentikan Pengawas K3 (SWA Active)</span>
                      </div>
                      <p className="text-rose-200/90 leading-relaxed">
                        {job.swaReason}
                      </p>
                    </div>
                  )}

                  {/* Job Details Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs py-2 bg-slate-950/60 rounded-lg px-3 border border-slate-800/60">
                    <div>
                      <span className="text-slate-500 block">Tim Pelaksana</span>
                      <span className="text-slate-200 font-medium truncate block">{job.teamName} ({job.personnelCount} orang)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Pengawas K3</span>
                      <span className="text-slate-200 font-medium truncate block">{job.pengawasK3}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Pengawas Pekerjaan</span>
                      <span className="text-slate-200 font-medium truncate block">{job.pengawasPekerjaan}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Tingkat Risiko</span>
                      <div>{getRiskBadge(job.riskLevel)}</div>
                    </div>
                  </div>

                  {/* Progress and K3 Indicators */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Progress Pekerjaan</span>
                      <span className="font-mono text-white font-semibold">{job.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isSwa ? 'bg-rose-500' : job.progress === 100 ? 'bg-emerald-500' : 'bg-cyan-500'
                        }`} 
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* APD and Safety Checklist mini bar */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>TBM & JSA: <strong className="text-emerald-300">Valid</strong></span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>APD: <strong className="text-slate-200 font-mono">{apdPassedCount}/8</strong></span>
                    </div>
                    <div className="font-mono text-xs">
                      <span className="text-slate-400">Kepatuhan:</span>{' '}
                      <span className={`font-semibold ${job.complianceScore >= 95 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {job.complianceScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => onSelectJob(job)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                  >
                    <span>Buka Detail & Checklist K3</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {/* SWA Button: Toggle Stop / Release */}
                    {isSwa ? (
                      <button
                        onClick={() => onResolveSWA(job.id)}
                        className="px-2.5 py-1 text-xs font-semibold text-emerald-300 bg-emerald-950 border border-emerald-700 hover:bg-emerald-900 rounded transition-colors whitespace-nowrap"
                      >
                        Cabut SWA (Lanjut)
                      </button>
                    ) : job.status !== 'Selesai' ? (
                      <button
                        onClick={() => onTriggerSWA(job.id)}
                        className="px-2.5 py-1 text-xs font-semibold text-rose-300 bg-rose-950/70 border border-rose-800 hover:bg-rose-900 rounded transition-colors whitespace-nowrap"
                        title="Terapkan Stop Work Authority jika terdeteksi bahaya kritis"
                      >
                        Terapkan SWA
                      </button>
                    ) : null}

                    {job.status !== 'Selesai' && (
                      <button
                        onClick={() => onCompleteJob(job.id)}
                        className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded transition-colors whitespace-nowrap"
                      >
                        Selesaikan
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* High-Density Data Grid (Table Mode per SaaS Reference) */
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4">No. PTW / Izin</th>
                  <th className="py-3 px-4">Pekerjaan & Lokasi</th>
                  <th className="py-3 px-4">Unit ULTG</th>
                  <th className="py-3 px-4">Tegangan</th>
                  <th className="py-3 px-4">Pengawas K3</th>
                  <th className="py-3 px-4 text-center">Tingkat Risiko</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Progress</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredJobs.map((job) => (
                  <tr 
                    key={job.id} 
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-cyan-400 font-semibold whitespace-nowrap">
                      {job.workingPermitNo}
                    </td>
                    <td className="py-3 px-4">
                      <div 
                        onClick={() => onSelectJob(job)} 
                        className="font-medium text-white hover:text-cyan-300 cursor-pointer max-w-sm truncate"
                        title={job.title}
                      >
                        {job.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-xs">
                        {job.substationLocation}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">{job.ultg}</td>
                    <td className="py-3 px-4 font-mono text-yellow-400 whitespace-nowrap">{job.voltage}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{job.pengawasK3}</td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {getRiskBadge(job.riskLevel)}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {getStatusBadge(job.status)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-white whitespace-nowrap tabular-nums">
                      {job.progress}%
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onSelectJob(job)}
                        className="px-2.5 py-1 text-xs text-cyan-400 hover:text-white bg-slate-800 hover:bg-cyan-900 rounded transition-colors"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
