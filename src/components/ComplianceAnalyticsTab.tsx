import React, { useState } from 'react';
import { 
  MONTHLY_COMPLIANCE_TREND, 
  ULTG_COMPLIANCE_DATA, 
  APD_COMPLIANCE_ITEMS 
} from '../data/mockHsseData';
import { 
  TrendingUp, 
  ShieldCheck, 
  HardHat, 
  Award, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  Calendar
} from 'lucide-react';

export const ComplianceAnalyticsTab: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'overall' | 'apd' | 'tbm'>('overall');
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  return (
    <div className="space-y-6">

      {/* Hero Analytics Banner with image asset */}
      <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>Kinerja HSSE & Keselamatan Kerja PT PLN UPT Madiun</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Kepatuhan K3 Kumulatif Mencapai <span className="text-cyan-400 font-mono">98.9%</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Monitoring berkala mencakup kepatuhan Tool Box Meeting (TBM), kelengkapan APD standar transmisi, pengujian bebas tegangan, dan penerapan Life-Saving Rules di seluruh Gardu Induk dan Jalur SUTT/SUTET.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-lg text-center">
              <span className="text-[11px] text-slate-400 block">Kepatuhan TBM</span>
              <span className="text-xl font-bold font-mono text-emerald-400 tabular-nums">99.7%</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-lg text-center">
              <span className="text-[11px] text-slate-400 block">Kepatuhan APD</span>
              <span className="text-xl font-bold font-mono text-cyan-400 tabular-nums">98.5%</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-lg text-center col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-400 block">Close-Out CAPA</span>
              <span className="text-xl font-bold font-mono text-yellow-400 tabular-nums">94.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Trend Chart & ULTG Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 1. Monthly Trend Interactive Chart (2 Columns) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Tren Kepatuhan K3 6 Bulan Terakhir
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluasi audit kepatuhan lapangan UPT Madiun periode Mei - Oktober 2026
              </p>
            </div>

            {/* Metric Switcher Tabs */}
            <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs self-start">
              <button
                onClick={() => setSelectedMetric('overall')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  selectedMetric === 'overall' ? 'bg-cyan-950 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                Kepatuhan Total
              </button>
              <button
                onClick={() => setSelectedMetric('tbm')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  selectedMetric === 'tbm' ? 'bg-cyan-950 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                Briefing / TBM
              </button>
              <button
                onClick={() => setSelectedMetric('apd')}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  selectedMetric === 'apd' ? 'bg-cyan-950 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                Kepatuhan APD
              </button>
            </div>
          </div>

          {/* SVG Line / Bar Visualization */}
          <div className="pt-4">
            <div className="h-64 flex items-end gap-3 sm:gap-6 px-2 border-b border-slate-800 pb-2">
              {MONTHLY_COMPLIANCE_TREND.map((item) => {
                const value = 
                  selectedMetric === 'overall' 
                    ? item.overallCompliance 
                    : selectedMetric === 'tbm' 
                    ? item.tbmCompliance 
                    : item.apdCompliance;

                // Scale value between 90% and 100% for clear graphical nuance
                const minScale = 90;
                const maxScale = 100;
                const heightPercentage = Math.max(10, Math.min(100, ((value - minScale) / (maxScale - minScale)) * 100));

                const isHovered = hoveredMonth === item.month;

                return (
                  <div 
                    key={item.month}
                    className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                    onMouseEnter={() => setHoveredMonth(item.month)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  >
                    {/* Tooltip / value */}
                    <div className="text-[11px] font-mono font-bold text-cyan-300 transition-opacity">
                      {value}%
                    </div>

                    {/* Bar container */}
                    <div className="w-full bg-slate-950/80 rounded-t-lg h-44 flex items-end justify-center p-1 relative border border-slate-800/80 group-hover:border-cyan-500/50 transition-colors">
                      <div 
                        className={`w-full max-w-[42px] rounded-t transition-all duration-300 ${
                          selectedMetric === 'overall'
                            ? 'bg-gradient-to-t from-cyan-600 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-400'
                            : selectedMetric === 'tbm'
                            ? 'bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:from-emerald-500 group-hover:to-teal-300'
                            : 'bg-gradient-to-t from-amber-600 to-yellow-400 group-hover:from-amber-500 group-hover:to-yellow-300'
                        } ${isHovered ? 'ring-2 ring-cyan-400/40' : ''}`}
                        style={{ height: `${heightPercentage}%` }}
                      ></div>
                    </div>

                    {/* X-axis label */}
                    <span className="text-[10px] sm:text-xs text-slate-400 text-center font-medium truncate max-w-[80px]">
                      {item.month.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Chart Legend and Context */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 pt-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-cyan-500 inline-block"></span>
                  <span>Target Korporat K3: &ge; 98.0%</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Update mingguan terverifikasi</span>
                </span>
              </div>
              <span className="font-mono text-emerald-400">Status K3: Memenuhi Ambang Aman</span>
            </div>
          </div>
        </div>

        {/* 2. ULTG Comparison Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-yellow-400" />
              Kepatuhan per Unit Layanan (ULTG)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Distribusi kepatuhan 4 unit layanan transmisi
            </p>
          </div>

          <div className="space-y-3.5 pt-2">
            {ULTG_COMPLIANCE_DATA.map((unit) => (
              <div 
                key={unit.name}
                className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{unit.name}</span>
                  <span className="font-mono font-bold text-cyan-400">{unit.score}%</span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-cyan-500"
                    style={{ width: `${unit.score}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{unit.inspections} Inspeksi Selesai</span>
                  <span className="font-mono text-emerald-400">{unit.safeHours.toLocaleString('id-ID')} Jam Aman</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-lg text-xs text-slate-300">
            <p className="text-cyan-300 font-semibold mb-1">Audit Patroli Terjadwal</p>
            <p className="text-[11px] text-slate-400">
              Tim HSSE UPT Madiun melakukan inspeksi mendadak (Safety Walk & Talk) secara acak pada gardu induk dan tim lapangan minimal 4 kali per bulan.
            </p>
          </div>
        </div>

      </div>

      {/* Grid: Heinrich Incident Pyramid & APD Compliance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 3. Piramida Heinrich K3 (Safety Pyramid) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Piramida Keselamatan Heinrich / Bird
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Struktur rasio kontrol bahaya K3 UPT Madiun Tahun 2026
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-800">
              ZERO FATALITY
            </span>
          </div>

          {/* Pyramid Graphic */}
          <div className="pt-4 space-y-2 flex flex-col items-center">
            
            {/* Level 1: Fatality / LTI */}
            <div className="w-32 bg-slate-800/90 border border-slate-700 rounded-t-lg py-2 px-3 text-center transition-all hover:bg-slate-700">
              <span className="text-[11px] font-bold text-emerald-400 block">0 Kasus</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-tight block">Fatality / LTI</span>
            </div>

            {/* Level 2: Minor / First Aid */}
            <div className="w-48 bg-yellow-950/40 border border-yellow-800/60 py-2 px-3 text-center transition-all hover:bg-yellow-950/60">
              <span className="text-xs font-bold font-mono text-yellow-300 block">1 Kasus</span>
              <span className="text-[10px] text-slate-300 uppercase tracking-tight block">First Aid (Luka Ringan)</span>
            </div>

            {/* Level 3: Near Miss */}
            <div className="w-64 bg-amber-950/40 border border-amber-800/60 py-2 px-3 text-center transition-all hover:bg-amber-950/60">
              <span className="text-xs font-bold font-mono text-amber-300 block">12 Kasus</span>
              <span className="text-[10px] text-slate-300 uppercase tracking-tight block">Near Miss (Hampir Celaka)</span>
            </div>

            {/* Level 4: Unsafe Act & Condition */}
            <div className="w-80 bg-cyan-950/40 border border-cyan-800/60 py-2 px-3 text-center transition-all hover:bg-cyan-950/60">
              <span className="text-xs font-bold font-mono text-cyan-300 block">42 Temuan</span>
              <span className="text-[10px] text-slate-300 uppercase tracking-tight block">Unsafe Action & Condition</span>
            </div>

            {/* Level 5: Safe Behaviors & Culture */}
            <div className="w-full max-w-sm bg-emerald-950/40 border border-emerald-800/60 rounded-b-lg py-2.5 px-4 text-center transition-all hover:bg-emerald-950/60">
              <span className="text-xs font-bold font-mono text-emerald-300 block">3,420+ Observasi</span>
              <span className="text-[10px] text-slate-200 uppercase tracking-tight block">Perilaku Selamat & TBM Sesuai SOP</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center leading-relaxed pt-2">
            Prinsip Heinrich: Dengan mengidentifikasi dan mengoreksi ribuan perilaku tidak aman dan near miss di dasar piramida, potensi terjadinya kecelakaan fatal (LTI) berhasil dicegah hingga 0%.
          </p>
        </div>

        {/* 4. Kepatuhan 8 APD Standar Transmisi PLN */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HardHat className="w-4 h-4 text-yellow-400" />
                Kepatuhan 8 Standar APD Transmisi
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluasi inspeksi fisik perlengkapan keselamatan kerja lapangan
              </p>
            </div>
            <span className="text-xs text-slate-400">Target: <strong className="text-white">100%</strong></span>
          </div>

          <div className="space-y-3 pt-1">
            {APD_COMPLIANCE_ITEMS.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 truncate max-w-[260px] sm:max-w-xs">{item.name}</span>
                  <span className="font-mono text-white font-medium ml-2">{item.compliance}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      item.compliance >= 99 
                        ? 'bg-emerald-500' 
                        : item.compliance >= 97 
                        ? 'bg-cyan-500' 
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${item.compliance}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Semua alat uji tegangan terkalibrasi</span>
            </span>
            <span>Uji Berkala: Pusertif PLN</span>
          </div>
        </div>

      </div>

    </div>
  );
};
