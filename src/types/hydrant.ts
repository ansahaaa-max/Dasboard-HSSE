import { ULTGUnit } from './hsse';

export type BudgetType = 'AO' | 'AI'; // Anggaran Operasi vs Anggaran Investasi

export type HydrantProjectStatus =
  | 'Perencanaan & Pengadaan'
  | 'Sipil & Rumah Pompa'
  | 'Instalasi Pipa & Pillar'
  | 'Testing & Commissioning'
  | 'Selesai 100%'
  | 'Kritis / Deviasi Negatif';

export interface HydrantMilestone {
  nama: string;
  bobot: number; // percentage (sum = 100)
  progres: number; // percentage (0 - 100)
  status: 'Selesai' | 'Sedang Berjalan' | 'Belum Mulai';
}

export interface HydrantTechnicalSpec {
  kapasitasTandonAir: string; // e.g. "120 m³"
  tekananJaringanSiaga: string; // e.g. "8.5 Bar"
  statusJockeyPump: 'Normal Siaga' | 'Uji Coba' | 'Perbaikan';
  statusElectricPump: 'Normal Siaga' | 'Uji Coba' | 'Perbaikan';
  statusDieselPump: 'Normal Siaga' | 'Uji Coba' | 'Perbaikan';
  jumlahPillarHydrant: number;
  delugeTrafoReady: boolean;
  boxHydrantLengkap: number;
}

export interface HydrantProject {
  id: string;
  code: string;
  budgetType: BudgetType;
  title: string;
  substationLocation: string; // e.g. GI 150 kV Manisrejo
  ultg: ULTGUnit;
  vendorName: string;
  spkContractNo: string;
  contractDate: string;
  startDate: string;
  targetCompletionDate: string;
  paguAnggaran: number; // in IDR
  realisasiKeuangan: number; // in IDR
  progresFisik: number; // percentage (0 - 100)
  targetFisikSdHariIni: number; // percentage as of today (16 Oktober 2026)
  deviasiFisik: number; // progresFisik - targetFisikSdHariIni
  status: HydrantProjectStatus;
  milestones: HydrantMilestone[];
  spec: HydrantTechnicalSpec;
  lastUpdateDate: string;
  kendalaLapangan?: string;
  tindakLanjut?: string;
}
