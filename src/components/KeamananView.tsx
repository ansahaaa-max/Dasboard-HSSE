import React, { useState } from 'react';
import { 
  Award, 
  Video, 
  Wrench, 
  DoorClosed, 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  MapPin, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  Filter, 
  Eye, 
  EyeOff, 
  PhoneCall, 
  Radio, 
  KeyRound, 
  Camera, 
  Compass
} from 'lucide-react';
import { 
  MaturityOverview, 
  CctvCamera, 
  SarprasKeamananItem, 
  PortalKeamananItem, 
  SatpamPersonel, 
  KeamananSubmenu, 
  ULTGLocation 
} from '../types/dashboard';

interface KeamananViewProps {
  submenu: KeamananSubmenu;
  setSubmenu: (sub: KeamananSubmenu) => void;
  maturityKeamanan: MaturityOverview;
  cctvList: CctvCamera[];
  sarprasList: SarprasKeamananItem[];
  portalList: PortalKeamananItem[];
  satpamList: SatpamPersonel[];
  onOpenAddModal: (type: 'cctv' | 'sarpras' | 'portal' | 'satpam' | 'indicator-sec') => void;
  onEditItem?: (type: string, item: any) => void;
  onDeleteItem?: (type: string, id: string) => void;
  searchQuery: string;
  selectedLocation: string;
  theme: 'dark' | 'light';
}

export const KeamananView: React.FC<KeamananViewProps> = ({
  submenu,
  setSubmenu,
  maturityKeamanan,
  cctvList,
  sarprasList,
  portalList,
  satpamList,
  onOpenAddModal,
  onEditItem,
  onDeleteItem,
  searchQuery,
  selectedLocation,
  theme,
}) => {
  const isDark = theme === 'dark';

  // State for security authorization toggles (Proteksi Informasi Sensitif)
  const [isCctvAuthUnlocked, setIsCctvAuthUnlocked] = useState<boolean>(false);
  const [isSatpamPrivacyUnlocked, setIsSatpamPrivacyUnlocked] = useState<boolean>(false);

  // Filters for sub-tabs
  const [cctvFilterStatus, setCctvFilterStatus] = useState<string>('Semua');
  const [cctvViewMode, setCctvViewMode] = useState<'table' | 'map'>('table');
  const [satpamFilterVendor, setSatpamFilterVendor] = useState<string>('Semua');
  const [satpamFilterStatus, setSatpamFilterStatus] = useState<string>('Semua');

  const isLocationFiltered = selectedLocation && !selectedLocation.startsWith('Semua');

  const filterByLoc = <T extends { lokasi?: string; lokasiPenugasan?: string }>(items: T[]): T[] => {
    if (!isLocationFiltered) return items;
    return items.filter(it => (it.lokasi || it.lokasiPenugasan) === selectedLocation);
  };

  // ==========================================
  // TAB 1: MATURITY LEVEL KEAMANAN
  // ==========================================
  const renderMaturityLevel = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-xs text-slate-400">Skor Maturity Keamanan</div>
            <div className="text-3xl font-extrabold font-mono text-cyan-400 mt-1">
              {maturityKeamanan.currentLevel.toFixed(2)}
            </div>
            <div className="text-xs text-slate-400 mt-1">Target: {maturityKeamanan.targetLevel.toFixed(2)}</div>
          </div>

          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-xs text-slate-400">Tingkat Pencapaian</div>
            <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
              {maturityKeamanan.percentageAchievement}%
            </div>
            <div className="text-xs text-slate-400 mt-1">Sistem Manajemen Pengamanan</div>
          </div>

          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-xs text-slate-400">Pemenuhan Indikator</div>
            <div className="text-3xl font-extrabold font-mono text-yellow-400 mt-1">
              {maturityKeamanan.fulfilledIndicators} / {maturityKeamanan.totalIndicators}
            </div>
            <div className="text-xs text-slate-400 mt-1">Kriteria Terpenuhi</div>
          </div>

          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-xs text-slate-400">Status Obvitnas PLN</div>
            <div className="text-xl font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5" />
              <span>SIAGA PATROLI</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">SMP Perpol 07/2019 Terpenuhi</div>
          </div>
        </div>

        {/* Historical Progress Chart */}
        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/40 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-100">Grafik Perkembangan Maturity Level Keamanan (Historis)</h3>
              <p className="text-xs text-slate-400">Evaluasi Sistem Manajemen Pengamanan Obvitnas UPT Madiun</p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Target Level: 4.40
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {maturityKeamanan.historicalScores.map((h) => (
              <div key={h.period} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-200">{h.period}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-cyan-400">Skor: {h.score.toFixed(2)}</span>
                    <span className="text-slate-400">Target: {h.target.toFixed(2)}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden flex">
                  <div 
                    className="bg-cyan-500 h-full rounded-full transition-all duration-700" 
                    style={{ width: `${(h.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indikator Keamanan Table */}
        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/40 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-100">Daftar Indikator Keamanan & Rencana Tindak Lanjut</h3>
              <p className="text-xs text-slate-400">Kesenjangan pemenuhan, PIC penanggung jawab, dan jadwal perbaikan</p>
            </div>
            <button
              onClick={() => onOpenAddModal('indicator-sec')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-xs self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Indikator</span>
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b text-[11px] uppercase tracking-wider ${
                isDark ? 'border-slate-800 text-slate-400 bg-slate-950/40' : 'border-slate-200 text-slate-600 bg-slate-50'
              }`}>
                <tr>
                  <th className="py-3 px-3">Kode & Bidang</th>
                  <th className="py-3 px-3">Indikator Pengamanan</th>
                  <th className="py-3 px-3">Skor / Target</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Kesenjangan & Tindak Lanjut</th>
                  <th className="py-3 px-3">PIC</th>
                  <th className="py-3 px-3">Target Selesai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-normal">
                {maturityKeamanan.indicators.map((ind) => (
                  <tr key={ind.id} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-mono font-bold text-cyan-400">{ind.id}</div>
                      <div className="text-[10px] text-slate-400">{ind.category}</div>
                    </td>
                    <td className="py-3 px-3 max-w-xs font-medium text-slate-200">
                      {ind.indicator}
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <span className="font-bold text-cyan-400">{ind.currentScore}</span> / {ind.targetScore}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ind.status === 'Memenuhi'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {ind.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 max-w-sm space-y-1">
                      <div className="text-[11px] text-slate-300">
                        <strong>Temuan:</strong> {ind.gapDescription}
                      </div>
                      <div className="text-[11px] text-cyan-300">
                        <strong>RTL:</strong> {ind.followUpPlan}
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-medium text-slate-300">
                      {ind.pic}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-slate-400">
                      {ind.targetDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // TAB 2: DATA CCTV
  // ==========================================
  const renderDataCctv = () => {
    let items = filterByLoc(cctvList);

    if (cctvFilterStatus !== 'Semua') {
      items = items.filter(c => c.statusOperasional === cctvFilterStatus);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(c => 
        c.namaKamera.toLowerCase().includes(q) || 
        c.kodeKamera.toLowerCase().includes(q) || 
        c.lokasi.toLowerCase().includes(q) ||
        c.pic.toLowerCase().includes(q)
      );
    }

    const onlineCount = items.filter(c => c.statusOperasional === 'Aktif Online').length;
    const offlineCount = items.filter(c => c.statusOperasional !== 'Aktif Online').length;

    return (
      <div className="space-y-6">
        {/* Top Control Bar with Security Access Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Status Operasi:</span>
            <select
              value={cctvFilterStatus}
              onChange={(e) => setCctvFilterStatus(e.target.value)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border outline-none font-medium ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
              }`}
            >
              <option value="Semua">Semua Status CCTV</option>
              <option value="Aktif Online">Aktif Online</option>
              <option value="Offline / Gangguan">Offline / Gangguan</option>
              <option value="Pemeliharaan">Dalam Pemeliharaan</option>
            </select>

            {/* Toggle Table vs Map view */}
            <div className={`inline-flex rounded-lg p-0.5 border text-xs ml-2 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-300'
            }`}>
              <button
                onClick={() => setCctvViewMode('table')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  cctvViewMode === 'table' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Daftar Tabel
              </button>
              <button
                onClick={() => setCctvViewMode('map')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors flex items-center gap-1 ${
                  cctvViewMode === 'map' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Peta Persebaran</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Sensitive Data Protection Toggle */}
            <button
              onClick={() => setIsCctvAuthUnlocked(!isCctvAuthUnlocked)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isCctvAuthUnlocked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-xs'
                  : 'bg-slate-800/70 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
              title="Akses terbatas untuk informasi sensitif (IP Address & Streaming URL)"
            >
              {isCctvAuthUnlocked ? <Unlock className="w-3.5 h-3.5 text-amber-400" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{isCctvAuthUnlocked ? 'Kredensial Terbuka (Otoritas)' : 'Proteksi Info IP/Streaming'}</span>
            </button>

            <button
              onClick={() => onOpenAddModal('cctv')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah CCTV</span>
            </button>
          </div>
        </div>

        {/* Notice for Sensitive Info */}
        {!isCctvAuthUnlocked && (
          <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
            isDark ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>
                <strong>Perlindungan Data Obvitnas:</strong> IP address, RTSP streaming link, dan kredensial disamarkan sesuai SOP Keamanan Informasi PLN.
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              Terkunci
            </span>
          </div>
        )}

        {/* MAP VIEW OF MADIUN SUBSTATIONS */}
        {cctvViewMode === 'map' && (
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400" />
                <div>
                  <h4 className="font-bold text-sm text-slate-100">Peta Persebaran Titik Kamera CCTV - Wilayah Kerja UPT Madiun</h4>
                  <p className="text-xs text-slate-400">Koordinat pemantauan Gardu Induk 150kV & GITET 500kV Ngawi</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {onlineCount} Online
                </span>
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> {offlineCount} Gangguan
                </span>
              </div>
            </div>

            {/* Visual Node Grid Map */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((cam) => (
                <div 
                  key={cam.id}
                  className={`p-4 rounded-xl border relative transition-all ${
                    isDark ? 'bg-slate-950/70 border-slate-800 hover:border-cyan-500/50' : 'bg-slate-50 border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-cyan-500/10 text-cyan-400">
                      {cam.kodeKamera}
                    </span>
                    <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                      cam.statusOperasional === 'Aktif Online'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cam.statusOperasional === 'Aktif Online' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                      {cam.statusOperasional}
                    </span>
                  </div>

                  <h5 className="font-bold text-xs text-slate-200">{cam.namaKamera}</h5>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{cam.lokasi} ({cam.unitKerja})</span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/40 text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tipe:</span>
                      <span className="font-medium text-slate-300">{cam.jenisKamera}</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="text-slate-400">Koordinat:</span>
                      <span className="text-cyan-400">{cam.koordinatLat || '-7.62'}, {cam.koordinatLng || '111.52'}</span>
                    </div>
                    {isCctvAuthUnlocked && (
                      <div className="flex justify-between font-mono text-[10px] text-amber-300">
                        <span>IP Address:</span>
                        <span>{cam.ipAddress || '10.35.x.x'}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CCTV TABLE VIEW */}
        {cctvViewMode === 'table' && (
          <div className={`rounded-2xl border overflow-hidden ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className={`border-b text-[11px] uppercase tracking-wider ${
                  isDark ? 'border-slate-800 text-slate-400 bg-slate-950/40' : 'border-slate-200 text-slate-600 bg-slate-50'
                }`}>
                  <tr>
                    <th className="py-3 px-3">Kode & Nama Kamera</th>
                    <th className="py-3 px-3">Lokasi & Unit Kerja</th>
                    <th className="py-3 px-3">Jenis Kamera</th>
                    <th className="py-3 px-3">Kondisi</th>
                    <th className="py-3 px-3">Status Operasi</th>
                    <th className="py-3 px-3">IP / Stream (Proteksi)</th>
                    <th className="py-3 px-3">Tgl Periksa</th>
                    <th className="py-3 px-3">Keterangan & Tindak Lanjut</th>
                    <th className="py-3 px-3">PIC</th>
                    <th className="py-3 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 font-normal">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-400">
                        Tidak ada kamera CCTV yang cocok dengan filter atau pencarian.
                      </td>
                    </tr>
                  ) : (
                    items.map((cam) => (
                      <tr key={cam.id} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="font-mono font-bold text-cyan-400">{cam.kodeKamera}</div>
                          <div className="text-slate-200 font-semibold">{cam.namaKamera}</div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="text-slate-200 font-medium">{cam.lokasi}</div>
                          <div className="text-[10px] text-slate-400">{cam.unitKerja}</div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap font-medium text-slate-300">
                          {cam.jenisKamera}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            cam.kondisi === 'Baik' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                          }`}>
                            {cam.kondisi}
                          </span>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            cam.statusOperasional === 'Aktif Online'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}>
                            {cam.statusOperasional}
                          </span>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px]">
                          {isCctvAuthUnlocked ? (
                            <div className="text-amber-300">
                              <div>{cam.ipAddress || '10.35.12.x'}</div>
                              <div className="text-[10px] text-slate-400">{cam.streamingProtocol || 'RTSP'}</div>
                            </div>
                          ) : (
                            <span className="text-slate-500 flex items-center gap-1">
                              <Lock className="w-3 h-3 text-slate-500" />
                              <span>•••.•••.•••.•••</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap font-mono text-slate-400 text-[11px]">
                          {cam.tanggalPemeriksaan}
                        </td>
                        <td className="py-3 px-3 max-w-xs space-y-1">
                          <div className="text-[11px] text-slate-300">{cam.keterangan}</div>
                          {cam.tindakLanjut && (
                            <div className="text-[10px] text-cyan-300">
                              <strong>TL:</strong> {cam.tindakLanjut}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap text-slate-300">
                          {cam.pic}
                        </td>
                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => onEditItem && onEditItem('cctv', cam)}
                              className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
                              title="Edit Data CCTV"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteItem && onDeleteItem('cctv', cam.id)}
                              className="p-1 rounded hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                              title="Hapus Data"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // TAB 3: DATA SARPRAS KEAMANAN
  // ==========================================
  const renderDataSarpras = () => {
    let items = filterByLoc(sarprasList);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(s => 
        s.namaSarpras.toLowerCase().includes(q) || 
        s.lokasi.toLowerCase().includes(q) || 
        s.kategori.toLowerCase().includes(q)
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Total Sarana & Prasarana Keamanan: <strong className="text-cyan-400">{items.length} Kelompok Sarpras</strong>
          </div>
          <button
            onClick={() => onOpenAddModal('sarpras')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Sarpras</span>
          </button>
        </div>

        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b text-[11px] uppercase tracking-wider ${
                isDark ? 'border-slate-800 text-slate-400 bg-slate-950/40' : 'border-slate-200 text-slate-600 bg-slate-50'
              }`}>
                <tr>
                  <th className="py-3 px-3">ID Sarpras</th>
                  <th className="py-3 px-3">Nama Sarpras & Kategori</th>
                  <th className="py-3 px-3">Lokasi Penempatan</th>
                  <th className="py-3 px-3 text-center">Jumlah</th>
                  <th className="py-3 px-3">Kondisi</th>
                  <th className="py-3 px-3">Status Kelayakan</th>
                  <th className="py-3 px-3">Tgl Periksa</th>
                  <th className="py-3 px-3">Keterangan</th>
                  <th className="py-3 px-3">PIC</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-normal">
                {items.map((s) => (
                  <tr key={s.id} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                    <td className="py-3 px-3 font-mono font-bold text-amber-400 whitespace-nowrap">
                      {s.id}
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <div className="font-semibold text-slate-100">{s.namaSarpras}</div>
                      <div className="text-[10px] text-slate-400">{s.kategori}</div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-300">
                      {s.lokasi}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-200">
                      {s.jumlah}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        s.kondisi === 'Baik' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {s.kondisi}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.statusKelayakan === 'Layak Pakai'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {s.statusKelayakan}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-slate-400 text-[11px]">
                      {s.tanggalPemeriksaan}
                    </td>
                    <td className="py-3 px-3 max-w-xs text-[11px] text-slate-300">
                      {s.keterangan}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-300">
                      {s.pic}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEditItem && onEditItem('sarpras', s)}
                          className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
                          title="Edit Sarpras"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteItem && onDeleteItem('sarpras', s.id)}
                          className="p-1 rounded hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                          title="Hapus Data"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // TAB 4: DATA PORTAL
  // ==========================================
  const renderDataPortal = () => {
    let items = filterByLoc(portalList);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(p => 
        p.namaPortal.toLowerCase().includes(q) || 
        p.kodePortal.toLowerCase().includes(q) || 
        p.lokasi.toLowerCase().includes(q)
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Database Portal & Akses Masuk: <strong className="text-purple-400">{items.length} Gerbang</strong>
          </div>
          <button
            onClick={() => onOpenAddModal('portal')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Portal</span>
          </button>
        </div>

        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b text-[11px] uppercase tracking-wider ${
                isDark ? 'border-slate-800 text-slate-400 bg-slate-950/40' : 'border-slate-200 text-slate-600 bg-slate-50'
              }`}>
                <tr>
                  <th className="py-3 px-3">Kode Portal</th>
                  <th className="py-3 px-3">Nama Portal & Jenis</th>
                  <th className="py-3 px-3">Lokasi</th>
                  <th className="py-3 px-3">Kondisi Fisik</th>
                  <th className="py-3 px-3">Status Operasional</th>
                  <th className="py-3 px-3">Tgl Periksa</th>
                  <th className="py-3 px-3">Catatan Perbaikan</th>
                  <th className="py-3 px-3">PIC</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-normal">
                {items.map((por) => (
                  <tr key={por.id} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                    <td className="py-3 px-3 font-mono font-bold text-purple-400 whitespace-nowrap">
                      {por.kodePortal}
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <div className="font-semibold text-slate-100">{por.namaPortal}</div>
                      <div className="text-[10px] text-slate-400">{por.jenisPortal}</div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-300">
                      {por.lokasi}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        por.kondisiFisik === 'Baik' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {por.kondisiFisik}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        por.statusOperasional === 'Beroperasi Normal'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {por.statusOperasional}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-slate-400 text-[11px]">
                      {por.tanggalPemeriksaan}
                    </td>
                    <td className="py-3 px-3 max-w-xs text-[11px] text-slate-300">
                      {por.catatanPerbaikan}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-300">
                      {por.pic}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEditItem && onEditItem('portal', por)}
                          className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
                          title="Edit Portal"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteItem && onDeleteItem('portal', por.id)}
                          className="p-1 rounded hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                          title="Hapus Data"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // TAB 5: DATA SATPAM
  // ==========================================
  const renderDataSatpam = () => {
    let items = filterByLoc(satpamList);

    if (satpamFilterVendor !== 'Semua') {
      items = items.filter(s => s.perusahaanPenyedia.includes(satpamFilterVendor));
    }
    if (satpamFilterStatus !== 'Semua') {
      items = items.filter(s => s.statusAktif === satpamFilterStatus);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(s => 
        s.namaPersonel.toLowerCase().includes(q) || 
        s.lokasiPenugasan.toLowerCase().includes(q) || 
        s.noKtaSatpam.toLowerCase().includes(q) ||
        s.perusahaanPenyedia.toLowerCase().includes(q)
      );
    }

    return (
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Penyedia BUJP:</span>
            <select
              value={satpamFilterVendor}
              onChange={(e) => setSatpamFilterVendor(e.target.value)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border outline-none font-medium ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
              }`}
            >
              <option value="Semua">Semua Perusahaan BUJP</option>
              <option value="Haleyora">PT Haleyora Power</option>
              <option value="Garda Utama">PT Garda Utama Sejahtera</option>
            </select>

            <span className="text-xs font-semibold text-slate-400 ml-2">Status:</span>
            <select
              value={satpamFilterStatus}
              onChange={(e) => setSatpamFilterStatus(e.target.value)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border outline-none font-medium ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
              }`}
            >
              <option value="Semua">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Cuti">Cuti</option>
              <option value="Non-Aktif">Non-Aktif</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Privacy Protection Toggle for Personnel Contact info */}
            <button
              onClick={() => setIsSatpamPrivacyUnlocked(!isSatpamPrivacyUnlocked)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isSatpamPrivacyUnlocked
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-xs'
                  : 'bg-slate-800/70 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
              title="Akses data kontak & privasi personel satpam"
            >
              {isSatpamPrivacyUnlocked ? <Eye className="w-3.5 h-3.5 text-blue-400" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{isSatpamPrivacyUnlocked ? 'Data Kontak Terbuka' : 'Proteksi Data Pribadi'}</span>
            </button>

            <button
              onClick={() => onOpenAddModal('satpam')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Personel Satpam</span>
            </button>
          </div>
        </div>

        {/* Satpam Table */}
        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b text-[11px] uppercase tracking-wider ${
                isDark ? 'border-slate-800 text-slate-400 bg-slate-950/40' : 'border-slate-200 text-slate-600 bg-slate-50'
              }`}>
                <tr>
                  <th className="py-3 px-3">ID & Nama Personel</th>
                  <th className="py-3 px-3">Perusahaan BUJP</th>
                  <th className="py-3 px-3">Lokasi Penugasan</th>
                  <th className="py-3 px-3">Status & Shift</th>
                  <th className="py-3 px-3">Kualifikasi Gada</th>
                  <th className="py-3 px-3">No KTA & Masa Berlaku</th>
                  <th className="py-3 px-3">Kontak Pribadi (Proteksi)</th>
                  <th className="py-3 px-3">Koordinator / PIC</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-normal">
                {items.map((sat) => (
                  <tr key={sat.id} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-mono font-bold text-blue-400">{sat.id}</div>
                      <div className="font-semibold text-slate-100">{sat.namaPersonel}</div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-300">
                      {sat.perusahaanPenyedia}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-slate-200">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>{sat.lokasiPenugasan}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sat.statusAktif === 'Aktif'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {sat.statusAktif}
                        </span>
                        <span className="text-[10px] text-slate-400">{sat.shiftPenugasan}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {sat.kualifikasiGada}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px]">
                      <div>{sat.noKtaSatpam}</div>
                      <div className="text-slate-400 text-[10px]">Exp: {sat.masaBerlakuKta}</div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px]">
                      {isSatpamPrivacyUnlocked ? (
                        <span className="text-blue-300">{sat.noHp || '0812-xxxx-xxxx'}</span>
                      ) : (
                        <span className="text-slate-500">0812-••••-••••</span>
                      )}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-300">
                      {sat.koordinatorPic}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEditItem && onEditItem('satpam', sat)}
                          className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
                          title="Edit Personel"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteItem && onDeleteItem('satpam', sat.id)}
                          className="p-1 rounded hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                          title="Hapus Data"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Submenu Tabs Navigation */}
      <div className={`p-1.5 rounded-2xl border flex flex-wrap items-center gap-1.5 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <button
          onClick={() => setSubmenu('maturity')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'maturity'
              ? 'bg-cyan-600 text-white shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>1. Maturity Level Keamanan</span>
        </button>

        <button
          onClick={() => setSubmenu('cctv')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'cctv'
              ? 'bg-indigo-600 text-white shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>2. Data CCTV Wilayah</span>
        </button>

        <button
          onClick={() => setSubmenu('sarpras')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'sarpras'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>3. Data Sarpras Keamanan</span>
        </button>

        <button
          onClick={() => setSubmenu('portal')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'portal'
              ? 'bg-purple-600 text-white shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <DoorClosed className="w-4 h-4" />
          <span>4. Data Portal Gerbang</span>
        </button>

        <button
          onClick={() => setSubmenu('satpam')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            submenu === 'satpam'
              ? 'bg-blue-600 text-white shadow-xs'
              : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>5. Data Personel Satpam</span>
        </button>
      </div>

      {/* Render Submenu Content */}
      {submenu === 'maturity' && renderMaturityLevel()}
      {submenu === 'cctv' && renderDataCctv()}
      {submenu === 'sarpras' && renderDataSarpras()}
      {submenu === 'portal' && renderDataPortal()}
      {submenu === 'satpam' && renderDataSatpam()}
    </div>
  );
};
