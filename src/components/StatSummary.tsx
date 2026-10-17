import React from 'react';
import { WorkJob, IncidentReport } from '../types/hsse';
import { ShieldCheck, HardHat, AlertTriangle, Activity, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface StatSummaryProps {
  jobs: WorkJob[];
  incidents: IncidentReport[];
  safeHours: number;
  daysWithoutLti: number;
  onFilterByStatus?: (status: string) => void;
  theme?: 'dark' | 'light';
}

export const StatSummary: React.FC<StatSummaryProps> = ({
  jobs,
  incidents,
  safeHours,
  daysWithoutLti,
  onFilterByStatus,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';
  const activeJobs = jobs.filter(j => j.status === 'Aktif / Berlangsung' || j.status === 'Safety Briefing / TBM');
  const swaJobs = jobs.filter(j => j.status === 'SWA (Dihentikan)');
  const openIncidents = incidents.filter(i => i.status !== 'Selesai (Closed)');
  const highRiskJobs = jobs.filter(j => j.riskLevel === 'Kritis' || j.riskLevel === 'Tinggi');

  // Overall compliance calculation based on active/registered jobs
  const avgCompliance = jobs.length > 0 
    ? Math.round(jobs.reduce((acc, j) => acc + j.complianceScore, 0) / jobs.length * 10) / 10
    : 100;

  const cardBg = isDark 
    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-white' 
    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900 shadow-sm';

  const labelColor = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="space-y-4">
      {/* SWA Critical Alert Notification if any active SWA exists */}
      {swaJobs.length > 0 && (
        <div className={`border rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg ${
          isDark 
            ? 'bg-rose-950/70 border-rose-600/80 shadow-rose-950/40 text-white' 
            : 'bg-rose-50 border-rose-300 shadow-rose-200/50 text-slate-900'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isDark ? 'bg-rose-600/20 text-rose-400' : 'bg-rose-100 text-rose-600'}`}>
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  isDark ? 'text-rose-300 bg-rose-900/60' : 'text-rose-700 bg-rose-200/80'
                }`}>
                  Stop Work Authority (SWA) Aktif
                </span>
                <span className={`text-xs ${isDark ? 'text-rose-200' : 'text-rose-700'}`}>
                  {swaJobs.length} Pekerjaan Dihentikan Sementara
                </span>
              </div>
              <p className={`text-sm font-semibold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {swaJobs[0].title} ({swaJobs[0].substationLocation})
              </p>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-rose-200/90' : 'text-rose-800'}`}>
                Alasan Penghentian: {swaJobs[0].swaReason || 'Pelanggaran batas keselamatan kerja.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onFilterByStatus && onFilterByStatus('SWA (Dihentikan)')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Tinjau Tindakan Korektif &rarr;
          </button>
        </div>
      )}

      {/* Main Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Safe Man-Hours */}
        <div className={`border rounded-xl p-4.5 transition-colors ${cardBg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${labelColor}`}>Jam Kerja Selamat (Safe Hours)</span>
            <span className={`p-1.5 rounded-md border ${
              isDark ? 'bg-emerald-950 text-emerald-400 border-emerald-800/60' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-bold font-mono tracking-tight tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {safeHours.toLocaleString('id-ID')}
              <span className={`text-xs font-normal ml-1 ${labelColor}`}>Jam</span>
            </div>
            <div className={`mt-1 flex items-center gap-1.5 text-xs font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{daysWithoutLti.toLocaleString('id-ID')} Hari Tanpa Kecelakaan (LTI)</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Active Real-time Jobs */}
        <div className={`border rounded-xl p-4.5 transition-colors ${cardBg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${labelColor}`}>Pekerjaan Lapangan Aktif</span>
            <span className={`p-1.5 rounded-md border ${
              isDark ? 'bg-cyan-950 text-cyan-400 border-cyan-800/60' : 'bg-cyan-50 text-cyan-700 border-cyan-200'
            }`}>
              <HardHat className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-bold font-mono tracking-tight tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {activeJobs.length}
              <span className={`text-xs font-normal ml-1 ${labelColor}`}>dari {jobs.length} Pekerjaan</span>
            </div>
            <div className={`mt-1 flex items-center gap-2 text-xs ${labelColor}`}>
              <span className={`font-medium ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                {highRiskJobs.length} Pekerjaan Risiko Tinggi
              </span>
              <span aria-hidden="true">·</span>
              <span>1 Tim PDKB</span>
            </div>
          </div>
        </div>

        {/* Metric 3: K3 Compliance Rate */}
        <div className={`border rounded-xl p-4.5 transition-colors ${cardBg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${labelColor}`}>Indeks Kepatuhan K3 (HSSE)</span>
            <span className={`p-1.5 rounded-md border ${
              isDark ? 'bg-blue-950 text-blue-400 border-blue-800/60' : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-bold font-mono tracking-tight tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {avgCompliance}%
              <span className={`text-xs font-normal ml-2 font-sans font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                Memenuhi Target
              </span>
            </div>
            <div className={`mt-1 flex items-center gap-1.5 text-xs ${labelColor}`}>
              <span>Target Korporat: 100% Zero Accident</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Open Incidents & CAPA */}
        <div className={`border rounded-xl p-4.5 transition-colors ${cardBg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${labelColor}`}>Laporan Insiden & Tindak Lanjut</span>
            <span className={`p-1.5 rounded-md border ${
              isDark ? 'bg-amber-950 text-amber-400 border-amber-800/60' : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-bold font-mono tracking-tight tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {openIncidents.length}
              <span className={`text-xs font-normal ml-1 ${labelColor}`}>Perlu Tindak Lanjut</span>
            </div>
            <div className={`mt-1 flex items-center gap-2 text-xs ${labelColor}`}>
              <span className={`font-medium ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                Near Miss / Unsafe Action
              </span>
              <span aria-hidden="true">·</span>
              <span className={`font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>0 Fatal</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
