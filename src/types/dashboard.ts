export type ULTGLocation = 
  | 'Kantor UPT Madiun' 
  | 'GI 150 kV Manisrejo' 
  | 'GI 150 kV Dolopo' 
  | 'GI 150 kV Ponorogo' 
  | 'GI 150 kV Pacitan' 
  | 'GI 150 kV Ngawi' 
  | 'GITET 500 kV Ngawi' 
  | 'GI 150 kV Magetan' 
  | 'GI 150 kV Caruban' 
  | 'GI 150 kV Trenggalek';

export type MainNavSection = 'dashboard' | 'k3' | 'keamanan' | 'anggaran';

export type K3Submenu = 'maturity' | 'apd' | 'fire' | 'hydrant' | 'program' | 'other';
export type KeamananSubmenu = 'maturity' | 'cctv' | 'sarpras' | 'portal' | 'satpam';
export type AnggaranSubmenu = 'all' | 'k3' | 'keamanan' | 'rencana' | 'realisasi' | 'sisa';

// ========================
// 1. MATURITY LEVEL
// ========================
export interface MaturityIndicator {
  id: string;
  category: string;
  indicator: string;
  currentScore: number; // 1 to 5
  targetScore: number; // usually 4 or 5
  status: 'Memenuhi' | 'Belum Memenuhi' | 'Dalam Proses';
  gapDescription: string;
  followUpPlan: string;
  pic: string;
  targetDate: string;
}

export interface MaturityOverview {
  currentLevel: number; // e.g. 4.15
  targetLevel: number; // e.g. 4.50
  percentageAchievement: number;
  totalIndicators: number;
  fulfilledIndicators: number;
  historicalScores: { period: string; score: number; target: number }[];
  indicators: MaturityIndicator[];
}

// ========================
// 2. APD (Alat Pelindung Diri)
// ========================
export interface ApdItem {
  id: string;
  namaApd: string;
  jenis: 'Pelindung Kepala' | 'Pelindung Jatuh' | 'Pelindung Kaki' | 'Pelindung Tangan Isolasi' | 'Detektor Listrik' | 'Pelindung Mata & Wajah' | 'Pakaian Kerja / Rompi';
  lokasi: ULTGLocation;
  jumlah: number;
  kondisi: 'Baik' | 'Rusak Ringan' | 'Rusak Berat';
  statusKelayakan: 'Layak Pakai' | 'Perlu Kalibrasi / Uji' | 'Tidak Layak';
  tanggalPemeriksaan: string;
  masaBerlaku?: string;
  kebutuhanPengadaan: number; // jumlah usulan penggantian
  pic: string;
  keterangan: string;
}

// ========================
// 3. FIRE PREVENTION
// ========================
export interface FireEquipmentItem {
  id: string;
  kodePeralatan: string;
  jenis: 'APAR Powder' | 'APAR CO2' | 'APAR Foam' | 'Hydrant Pillar' | 'Pompa Hydrant Diesel' | 'Pompa Hydrant Elektrik' | 'Pompa Jockey' | 'Tandon Air' | 'Deluge System';
  lokasi: ULTGLocation;
  posisiDetail: string; // e.g. "Ruang Kontrol Lantai 1", "Bay Trafo 1"
  jumlah: number;
  kondisi: 'Siaga Normal' | 'Perlu Perbaikan' | 'Kosong / Bertekanan Rendah';
  statusPemeriksaan: 'Lulus Uji' | 'Jatuh Tempo Periksa' | 'Dalam Pemeliharaan';
  tanggalPemeriksaan: string;
  jadwalPemeliharaanBerikutnya: string;
  temuanInspeksi?: string;
  tindakLanjutPerbaikan?: string;
  pic: string;
}

// ========================
// 3b. HYDRANT SYSTEM (SISTEM & PERALATAN HYDRANT)
// ========================
export interface HydrantSystemItem {
  id: string;
  kodeInstalasi: string;
  namaSistem: string; // e.g. "Instalasi Hydrant Utama GI 150 kV Manisrejo"
  lokasi: ULTGLocation;
  posisiDetail: string; // e.g. "Rumah Pompa & Switchyard Trafo 1-2"
  
  // 1. Merk Hydrant (Jockey Pump, Main Pump, Hydrant / Diesel pump)
  merkJockeyPump: string; // e.g. "Grundfos CR 5-20"
  merkMainPump: string;   // e.g. "Ebara 100x80 FS2JA (Elektrik)"
  merkDieselPump: string; // e.g. "Clarke Diesel Fire Engine 1000 GPM"
  
  // 2. Pipa Hydrant
  pipaHydrant: string;    // e.g. "Black Steel Seamless Sch 40 (Loop 6\" & Distribusi 4\")"
  
  // 3. Pilar Hydrant
  pilarHydrant: string;   // e.g. "6 Unit Pillar Two-Way 2.5\" Merk Appron"
  jumlahPilar: number;
  
  // 4. Foot Klep (Foot Valve)
  footKlep: string;       // e.g. "Cast Iron Flange 6\" with Bronze Seat & SS Strainer"
  
  // 5. Automatis atau Manual
  sistemOperasi: 'Otomatis' | 'Manual';
  
  // 6. Kondisi Terkini
  kondisiTerkini: 'Siaga Normal (Siap Operasi)' | 'Ada Anomali' | 'Kritis / Rusak' | 'Dalam Pemeliharaan';
  tekananStatisBar: number; // e.g. 8.5 Bar
  levelTandonPersen: number; // e.g. 95%
  statusJockeyTerkini: 'Siaga Auto' | 'Manual' | 'Mati/Gangguan';
  statusMainPumpTerkini: 'Siaga Auto' | 'Manual' | 'Mati/Gangguan';
  statusDieselPumpTerkini: 'Siaga Auto' | 'Manual' | 'Mati/Gangguan';
  tanggalUpdateKondisi: string;
  
  // 7. Daftar Anomali Apa Saja
  adaAnomali: boolean;
  daftarAnomali: string; // Detail anomali teknis (misal: aki starter drop, packing gland rembes, pilar macet, foot klep bocor)
  tingkatAnomali: 'Nihil / Normal' | 'Anomali Ringan' | 'Anomali Sedang' | 'Anomali Kritis';
  akarPenyebabAnomali?: string;
  tindakLanjutAnomali?: string;
  targetSelesaiAnomali?: string;
  
  // Informasi Umum & PIC
  pic: string;
  statusKelayakan: 'Laik Operasi' | 'Dalam Pemeliharaan' | 'Uji Berkala' | 'Perlu Perbaikan';
  tanggalPemeriksaan: string;
  jadwalPemeriksaanBerikutnya: string;
  catatanPemeliharaan?: string;
}

// ========================
// 4. PROGRAM K3 LAINNYA
// ========================
export interface ProgramK3Item {
  id: string;
  namaPekerjaan: string;
  jenisProgram: 'Inspeksi K3' | 'Safety Patrol' | 'Audit K3' | 'JSA' | 'Pelatihan & Sosialisasi K3' | 'Program Keselamatan Pekerjaan';
  lokasi: ULTGLocation;
  tanggal: string;
  pic: string;
  progres: number; // 0 - 100%
  status: 'Selesai' | 'Sedang Berjalan' | 'Terkendala' | 'Direncanakan';
  kendala?: string;
  tindakanPerbaikan: string;
  dokumentasiFoto?: string;
}

// ========================
// 5. KEAMANAN - CCTV
// ========================
export interface CctvCamera {
  id: string;
  kodeKamera: string;
  namaKamera: string;
  lokasi: ULTGLocation;
  unitKerja: string;
  jenisKamera: 'PTZ Outdoor' | 'Fixed Bullet' | 'Dome Indoor' | 'Thermal Camera';
  kondisi: 'Baik' | 'Kamera Buram' | 'Mati / Rusak' | 'Koneksi Terputus';
  statusOperasional: 'Aktif Online' | 'Offline / Gangguan' | 'Pemeliharaan';
  tanggalPemeriksaan: string;
  pic: string;
  keterangan: string;
  tindakLanjut: string;
  koordinatLat?: number;
  koordinatLng?: number;
  // Restricted access info
  ipAddress?: string;
  streamingProtocol?: string;
}

// ========================
// 6. KEAMANAN - SARPRAS
// ========================
export interface SarprasKeamananItem {
  id: string;
  namaSarpras: string;
  kategori: 'Perimeter Pagar' | 'Penerangan Keamanan' | 'Alat Deteksi Logam' | 'Komunikasi HT' | 'Perlengkapan Patroli' | 'Sistem Kunci / Alarm';
  lokasi: ULTGLocation;
  jumlah: number;
  kondisi: 'Baik' | 'Rusak Ringan' | 'Rusak Berat';
  statusKelayakan: 'Layak Pakai' | 'Perlu Perbaikan' | 'Afkir';
  tanggalPemeriksaan: string;
  pic: string;
  keterangan: string;
}

// ========================
// 7. KEAMANAN - PORTAL
// ========================
export interface PortalKeamananItem {
  id: string;
  kodePortal: string;
  namaPortal: string;
  lokasi: ULTGLocation;
  jenisPortal: 'Automatic Barrier Gate' | 'Sliding Gate Manual' | 'Swing Gate' | 'Turnstile Kartu Akses';
  kondisiFisik: 'Baik' | 'Karat / Rusak Ringan' | 'Motor Rusak';
  statusOperasional: 'Beroperasi Normal' | 'Gangguan Motor' | 'Dioperasikan Manual';
  tanggalPemeriksaan: string;
  pic: string;
  catatanPerbaikan: string;
}

// ========================
// 8. KEAMANAN - SATPAM
// ========================
export interface SatpamPersonel {
  id: string;
  namaPersonel: string;
  perusahaanPenyedia: string; // BUJP
  lokasiPenugasan: ULTGLocation;
  statusAktif: 'Aktif' | 'Cuti' | 'Non-Aktif';
  shiftPenugasan: 'Shift 1 (Pagi)' | 'Shift 2 (Siang)' | 'Shift 3 (Malam)' | 'Non-Shift';
  kualifikasiGada: 'Gada Pratama' | 'Gada Madya' | 'Gada Utama' | 'Belum Diklat';
  noKtaSatpam: string;
  masaBerlakuKta: string;
  noHp?: string; // Restricted
  koordinatorPic: string;
}

// ========================
// 9. ANGGARAN
// ========================
export interface AnggaranItem {
  id: string;
  kategoriUtama: 'K3' | 'Keamanan';
  programKerja: string;
  jenisAnggaran: 'AO (Anggaran Operasi)' | 'AI (Anggaran Investasi)';
  paguAnggaran: number; // Rupiah
  realisasiAnggaran: number; // Rupiah
  sisaAnggaran: number; // pagu - realisasi
  persentaseRealisasi: number;
  bulan: string; // e.g. "Oktober 2026"
  statusRealisasi: 'Sesuai Rencana' | 'Di Bawah Target' | 'Realisasi Penuh';
  keterangan: string;
}
