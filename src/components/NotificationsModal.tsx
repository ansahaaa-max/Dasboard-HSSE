import React from 'react';
import { 
  X, 
  Bell, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  Flame, 
  Video, 
  HardHat, 
  ChevronRight 
} from 'lucide-react';
import { MainNavSection } from '../types/dashboard';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: MainNavSection, submenu?: string) => void;
  theme: 'dark' | 'light';
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  theme,
}) => {
  if (!isOpen) return null;
  const isDark = theme === 'dark';

  const alerts = [
    {
      id: 'AL-01',
      category: 'APD Jatuh Tempo Uji',
      icon: <HardHat className="w-4 h-4 text-amber-400" />,
      title: 'Sarung Tangan Isolasi Karet 36 kV - UPT Madiun',
      description: 'Masa uji dielektrik 6 bulan akan habis pada 20 Oktober 2026. Batch re-test Pusertif harus segera dikirim.',
      urgency: 'Tinggi',
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      action: () => {
        onNavigate('k3', 'apd');
        onClose();
      }
    },
    {
      id: 'AL-03',
      category: 'CCTV Offline / Terputus',
      icon: <Video className="w-4 h-4 text-amber-400" />,
      title: 'Kamera Pintu Gerbang Dermaga Pantai - GI 150 kV Pacitan',
      description: 'Kabel UTP korosi garam laut terputus pada sambungan tiang lampu. Perbaikan dijadwalkan besok.',
      urgency: 'Sedang',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      action: () => {
        onNavigate('keamanan', 'cctv');
        onClose();
      }
    },
    {
      id: 'AL-04',
      category: 'Program K3 Tertunda',
      icon: <AlertTriangle className="w-4 h-4 text-blue-400" />,
      title: 'Pelatihan & Refreshment Bantuan Hidup Dasar (BHD)',
      description: 'Menunggu konfirmasi jadwal instruktur dokter spesialis okupasi RSUD Soedono untuk tanggal 22 Oktober 2026.',
      urgency: 'Sedang',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      action: () => {
        onNavigate('k3', 'program');
        onClose();
      }
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className={`relative w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header */}
        <div className={`px-5 py-4 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100">Notifikasi & Peringatan Dini HSSE</h3>
              <p className="text-[11px] text-slate-400">Pekerjaan terkendala & jadwal inspeksi jatuh tempo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Alerts */}
        <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
          {alerts.map((al) => (
            <div
              key={al.id}
              onClick={al.action}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700' 
                  : 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                  {al.icon}
                  <span>{al.category}</span>
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${al.badgeColor}`}>
                  {al.urgency}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-100 leading-snug">{al.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{al.description}</p>
              
              <div className="mt-3 pt-2 border-t border-slate-800/40 flex items-center justify-between text-[11px] text-cyan-400">
                <span>Klik untuk langsung menuju data</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        <div className={`p-3 border-t text-center text-xs text-slate-400 ${
          isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50'
        }`}>
          Sistem Notifikasi Terhubung 24/7 dengan Petugas Posko K3L
        </div>
      </div>
    </div>
  );
};
