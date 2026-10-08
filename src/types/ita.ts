export type PillarType = 'open_data' | 'anti_corruption';

export type QuarterType = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export type IndicatorStatus = 'compliant' | 'in_progress' | 'pending' | 'needs_revision';

export interface EvidenceFile {
  id: string;
  title: string;
  fileType: 'pdf' | 'doc' | 'link' | 'excel' | 'image';
  fileSize?: string;
  url: string;
  uploadDate: string;
  docNumber?: string;
  uploadedBy: string;
}

export interface MOITSubItem {
  id: string;
  itemNumber: string;
  name: string;
  requiredFormat: string;
  isCompleted: boolean;
  evidenceFiles: EvidenceFile[];
  notes?: string;
  verifiedBy?: string;
}

export interface MOITIndicator {
  id: string;
  code: string;
  title: string;
  description: string;
  pillar: PillarType;
  quarter: QuarterType;
  department: string;
  weightScore: number;
  status: IndicatorStatus;
  items: MOITSubItem[];
  auditorRemarks?: string;
  lastUpdated: string;
}

export interface HospitalProfile {
  name: string;
  hospitalType: string;
  bedCount: number;
  district: string;
  province: string;
  affiliation: string;
  directorName: string;
  fiscalYear: string;
  targetScore: number;
  coordinatorName: string;
  phone: string;
  email: string;
  website: string;
}

export interface AuditLogItem {
  id: string;
  action: string;
  moitCode: string;
  detail: string;
  user: string;
  timestamp: string;
}
