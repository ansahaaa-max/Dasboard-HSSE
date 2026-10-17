export type ULTGUnit = 'ULTG Madiun' | 'ULTG Ponorogo' | 'ULTG Pacitan' | 'ULTG Ngawi' | 'Kantor UPT Madiun';

export type JobStatus = 
  | 'Aktif / Berlangsung' 
  | 'Safety Briefing / TBM' 
  | 'Selesai' 
  | 'Izin Baru (Pending)' 
  | 'SWA (Dihentikan)';

export type VoltageLevel = '500 kV (SUTET)' | '150 kV (SUTT)' | '70 kV (SUTT)' | '20 kV (Trafo/Penyulang)';

export type WorkType = 
  | 'PDKB (Bertegangan)' 
  | 'Pemeliharaan Bay Trafo' 
  | 'Working at Height (Tower)' 
  | 'ROW / Tebang Pohon Kritis' 
  | 'Pengujian Relay Proteksi' 
  | 'Inspeksi Termovisi' 
  | 'Hot Work (Pengelasan)' 
  | 'Cold Work / Sipil';

export interface ApdChecklist {
  helmChinstrap: boolean;
  sepatuSafety: boolean;
  fullBodyHarness: boolean;
  detectorTegangan: boolean;
  groundingCluster: boolean;
  rompiReflektif: boolean;
  sarungTanganIsolasi: boolean;
  kacamataPelindung: boolean;
}

export interface WorkJob {
  id: string;
  title: string;
  substationLocation: string; // e.g. GI 150 kV Manisrejo
  ultg: ULTGUnit;
  voltage: VoltageLevel;
  type: WorkType;
  condition: 'Bertegangan' | 'Padam' | 'Tanpa Tegangan';
  teamName: string;
  personnelCount: number;
  pengawasK3: string;
  pengawasPekerjaan: string;
  pengawasManuver: string;
  workingPermitNo: string;
  riskLevel: 'Kritis' | 'Tinggi' | 'Sedang' | 'Rendah';
  status: JobStatus;
  progress: number;
  startTime: string;
  targetEndTime: string;
  tbmPassed: boolean;
  jsaApproved: boolean;
  hiradcValid: boolean;
  complianceScore: number;
  apdChecklist: ApdChecklist;
  notes: string;
  swaReason?: string;
  swaTimestamp?: string;
  historyLogs: {
    time: string;
    action: string;
    author: string;
  }[];
}

export type IncidentCategory = 
  | 'Near Miss' 
  | 'Unsafe Action' 
  | 'Unsafe Condition' 
  | 'First Aid / Luka Ringan' 
  | 'Property Damage' 
  | 'Environmental / Tumpahan Minyak' 
  | 'LTI (Lost Time Injury)';

export type IncidentSeverity = 'Kritis' | 'Mayor' | 'Moderat' | 'Minor';

export type IncidentStatus = 
  | 'Dilaporkan' 
  | 'Investigasi Berjalan' 
  | 'Tindakan Korektif (CAPA)' 
  | 'Selesai (Closed)';

export interface IncidentReport {
  id: string;
  title: string;
  incidentDate: string;
  incidentTime: string;
  location: string;
  ultg: ULTGUnit;
  category: IncidentCategory;
  severity: IncidentSeverity;
  status: IncidentStatus;
  reporterName: string;
  reporterRole: string;
  investigator: string;
  chronology: string;
  rootCause: string;
  immediateAction: string;
  correctiveAction: string; // CAPA
  capaPic: string;
  targetDeadline: string;
  completionDate?: string;
  photoUrl?: string;
}

export interface MonthlyTrend {
  month: string;
  inspeksiCount: number;
  tbmCompliance: number; // percentage
  apdCompliance: number; // percentage
  overallCompliance: number; // percentage
  nearMissCount: number;
  incidentCount: number;
}
