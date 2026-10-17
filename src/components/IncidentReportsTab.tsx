import React, { useState } from 'react';
import { IncidentReport, IncidentCategory, IncidentSeverity, IncidentStatus } from '../types/hsse';
import { 
  AlertTriangle, 
  Search, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  FileText, 
  ChevronRight,
  Filter,
  UserCheck
} from 'lucide-react';

interface IncidentReportsTabProps {
  incidents: IncidentReport[];
  onOpenNewIncident: () => void;
  onSelectIncident: (incident: IncidentReport) => void;
  onUpdateStatus: (incidentId: string, status: IncidentStatus) => void;
}

export const IncidentReportsTab: React.FC<IncidentReportsTabProps> = ({
  incidents,
  onOpenNewIncident,
  onSelectIncident,
  onUpdateStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [severityFilter, setSeverityFilter] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Near Miss',
    'Unsafe Condition',
    'Unsafe Action',
    'First Aid / Luka Ringan',
    'Environmental / Tumpahan Minyak',
  ];

  const statuses = [
    'Semua',
    'Dilaporkan',
    'Investigasi Berjalan',
    'Tindakan Korektif (CAPA)',
    'Selesai (Closed)',
  ];

  const filteredIncidents = incidents.filter((inc) => {
    const matchesSearch =
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.chronology.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'Semua' || inc.category === categoryFilter;
    const matchesStatus = statusFilter === 'Semua' || inc.status === statusFilter;
    const matchesSeverity = severityFilter === 'Semua' || inc.severity === severityFilter;

    return matchesSearch && matchesCategory && matchesStatus && matchesSeverity;
  });

  const getSeverityBadge = (severity: IncidentSeverity) => {
    switch (severity) {
      case 'Kritis':
        return <span className="text-rose-400 font-bold">Tingkat Kritis</span>;
      case 'Mayor':
        return <span className="text-amber-400 font-semibold">Tingkat Mayor</span>;
      case 'Moderat':
        return <span className="text-yellow-400 font-medium">Tingkat Moderat</span>;
      default:
        return <span className="text-emerald-400 font-medium">Tingkat Minor</span>;
    }
  };

  const getStatusBadge = (status: IncidentStatus) => {
    switch (status) {
      case 'Selesai (Closed)':
        return (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-300 font-medium bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Selesai (Closed)
          </span>
        );
      case 'Tindakan Korektif (CAPA)':
        return (
          <span className="inline-flex items-center gap-1 text-xs text-amber-300 font-medium bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Tindakan Korektif (CAPA)
          </span>
        );
      case 'Investigasi Berjalan':
        return (
          <span className="inline-flex items-center gap-1 text-xs text-cyan-300 font-medium bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            Investigasi Berjalan
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs text-rose-300 font-medium bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            Baru Dilaporkan
          </span>
        );
    }
  };

  const openCount = incidents.filter(i => i.status !== 'Selesai (Closed)').length;
  const closedCount = incidents.filter(i => i.status === 'Selesai (Closed)').length;

  return (
    <div className="space-y-6">

      {/* Header and Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block">Total Laporan Terintegrasi</span>
          <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
            {incidents.length} <span className="text-xs font-normal text-slate-400">Kasus</span>
          </div>
          <span className="text-xs text-cyan-400 mt-1 block">Tahun Berjalan 2026</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block">Tindakan Korektif (CAPA) Berjalan</span>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-1 tabular-nums">
            {openCount} <span className="text-xs font-normal text-slate-400">Kasus Aktif</span>
          </div>
          <span className="text-xs text-slate-400 mt-1 block">Target penyelesaian &le; 14 hari</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block">Kasus Ditutup & Tervalidasi</span>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
            {closedCount} <span className="text-xs font-normal text-slate-400">Kasus (Closed)</span>
          </div>
          <span className="text-xs text-emerald-400 mt-1 block">Verifikasi Pengawas K3 Selesai</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Kecelakaan Fatal (LTI)</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
              0 <span className="text-xs font-normal text-emerald-300">Nihil Kecelakaan</span>
            </div>
          </div>
          <button
            onClick={onOpenNewIncident}
            className="mt-2 w-full py-1.5 text-xs font-semibold text-rose-200 bg-rose-950/80 hover:bg-rose-900 border border-rose-800 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>+ Buat Laporan Insiden Baru</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari ID laporan, lokasi, judul, pelapor, atau kronologi insiden..."
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

          <button
            onClick={onOpenNewIncident}
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shrink-0 shadow-sm"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>+ Lapor Insiden / Near Miss</span>
          </button>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-medium">Kategori:</span>
            <div className="flex items-center gap-1 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                    categoryFilter === cat
                      ? 'bg-rose-950 text-rose-300 border border-rose-800 font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <span className="text-slate-700 hidden lg:inline">|</span>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-medium">Status:</span>
            <div className="flex items-center gap-1 flex-wrap">
              {statuses.map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                    statusFilter === st
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {(categoryFilter !== 'Semua' || statusFilter !== 'Semua' || searchQuery) && (
            <button
              onClick={() => {
                setCategoryFilter('Semua');
                setStatusFilter('Semua');
                setSearchQuery('');
              }}
              className="text-xs text-rose-400 hover:underline ml-auto"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Incident List */}
      {filteredIncidents.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center space-y-3">
          <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">Tidak ada laporan insiden yang cocok</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Tidak ditemukan laporan kejadian dengan filter yang aktif saat ini.
          </p>
          <button
            onClick={() => {
              setCategoryFilter('Semua');
              setStatusFilter('Semua');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800 rounded-lg hover:bg-cyan-900 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredIncidents.map((incident) => {
            const isClosed = incident.status === 'Selesai (Closed)';

            return (
              <div
                key={incident.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all space-y-4"
              >
                {/* Top Row: Unboxed metadata per constitution */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-cyan-400 font-semibold">{incident.id}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-200 font-medium">{incident.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{incident.incidentDate}, {incident.incidentTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{incident.ultg}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {getSeverityBadge(incident.severity)}
                    {getStatusBadge(incident.status)}
                  </div>
                </div>

                {/* Main Content */}
                <div>
                  <h4 
                    onClick={() => onSelectIncident(incident)}
                    className="text-base font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {incident.title}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{incident.location}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>Pelapor: <strong>{incident.reporterName}</strong> ({incident.reporterRole})</span>
                  </div>
                </div>

                {/* Chronology Summary Box */}
                <div className="p-3 bg-slate-950/70 border border-slate-800/60 rounded-lg text-xs space-y-2">
                  <div>
                    <span className="text-slate-400 font-medium block">Kronologi Singkat:</span>
                    <p className="text-slate-200 leading-relaxed mt-0.5">
                      {incident.chronology}
                    </p>
                  </div>

                  {incident.rootCause && (
                    <div className="pt-1.5 border-t border-slate-800/80">
                      <span className="text-amber-400 font-medium block">Akar Masalah (Root Cause):</span>
                      <p className="text-slate-300 mt-0.5">
                        {incident.rootCause}
                      </p>
                    </div>
                  )}

                  {incident.correctiveAction && (
                    <div className="pt-1.5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-cyan-400 font-medium block">Tindakan Korektif & Preventif (CAPA):</span>
                        <p className="text-slate-200 mt-0.5">{incident.correctiveAction}</p>
                      </div>
                      <div className="text-right sm:text-right shrink-0">
                        <span className="text-[11px] text-slate-400 block">PIC: {incident.capaPic}</span>
                        <span className="text-[11px] font-mono text-yellow-300 block">Target: {incident.targetDeadline}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                    <span>Investigator: <strong className="text-slate-300">{incident.investigator}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectIncident(incident)}
                      className="px-3 py-1.5 text-xs text-cyan-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Form Investigasi Lengkap</span>
                    </button>

                    {!isClosed && (
                      <button
                        onClick={() => onUpdateStatus(incident.id, 'Selesai (Closed)')}
                        className="px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950 border border-emerald-700 hover:bg-emerald-900 rounded-md transition-colors whitespace-nowrap"
                      >
                        Tandai Selesai & Tutup Kasus
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
