import React from 'react';
import { PLN_SAFETY_GOLDEN_RULES } from '../data/mockHsseData';
import { ShieldCheck, PhoneCall, AlertOctagon, CheckCircle2, Zap } from 'lucide-react';

export const GoldenRulesModal: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Header Banner with generated image asset */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-current" />
              <span>Budaya Keselamatan Kerja PT PLN (Persero)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              PLN Safety Golden Rules & Life-Saving Principles
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              "Tidak Ada yang Lebih Berharga dari Jiwa Manusia". Seluruh insan PLN UPT Madiun, mitra kerja, dan tenaga alih daya wajib mematuhi 6 Aturan Emas Keselamatan Kerja demi mewujudkan Zero Accident berkelanjutan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1.5 bg-cyan-950/80 text-cyan-300 border border-cyan-800 rounded-lg font-medium">
              Standar Transmisi UIT JBM
            </span>
            <span className="px-3 py-1.5 bg-emerald-950/80 text-emerald-300 border border-emerald-800 rounded-lg font-medium">
              Sertifikasi SMK3 & ISO 45001
            </span>
            <span className="px-3 py-1.5 bg-yellow-950/80 text-yellow-300 border border-yellow-800 rounded-lg font-medium">
              Zero Tolerance to Unsafe Behavior
            </span>
          </div>
        </div>

        {/* Realistic image asset of Indonesian safety technician */}
        <div className="relative min-h-[220px] bg-slate-950">
          <img
            src="/src/assets/images/pln_safety_technician_1792143777654.jpg"
            alt="Petugas Keselamatan Kerja K3 UPT Madiun"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
          <div className="absolute bottom-3 left-3 right-3 text-[11px] text-slate-300">
            <span className="font-semibold text-white block">Inspektur K3L UPT Madiun</span>
            <span>Verifikasi kepatuhan APD & JSA lapangan</span>
          </div>
        </div>
      </div>

      {/* The 6 Golden Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLN_SAFETY_GOLDEN_RULES.map((rule) => (
          <div
            key={rule.number}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-cyan-500">
                  {rule.number}
                </span>
                <span className="p-1.5 bg-cyan-950 text-cyan-400 rounded-lg">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug">
                {rule.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {rule.desc}
              </p>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg text-[11px] text-slate-400">
              <strong className="text-yellow-400 block mb-0.5">Ketentuan Pelaksanaan:</strong>
              {rule.ruleDetail}
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Contacts & Hospital Referral Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-rose-400" />
          <h3 className="text-base font-bold text-white">
            Kontak Darurat & Jalur Evakuasi K3 UPT Madiun
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[11px]">Posko Tanggap Darurat K3 UPT Madiun</span>
            <span className="text-sm font-bold font-mono text-cyan-400 block">(0351) 462-991 / 0812-3456-7890</span>
            <span className="text-[11px] text-slate-400 block">Stanby 24 Jam - Gedung UPT Madiun</span>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[11px]">Dispatcher Pengatur Beban (AP2B/UIP2B)</span>
            <span className="text-sm font-bold font-mono text-yellow-400 block">(031) 853-2211 (Ext. 204)</span>
            <span className="text-[11px] text-slate-400 block">Koordinasi Manuver & Emergency Trip</span>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[11px]">RS Rujukan Utama (RSUD dr. Soedono Madiun)</span>
            <span className="text-sm font-bold font-mono text-rose-400 block">(0351) 464-325 / IGD 118</span>
            <span className="text-[11px] text-slate-400 block">Jl. Dr. Soetomo No. 59, Kota Madiun</span>
          </div>
        </div>
      </div>

    </div>
  );
};
