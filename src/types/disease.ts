export type PathogenType = 'Fungal' | 'Bacterial' | 'Viral' | 'Pest' | 'Healthy';

export type SeverityLevel = 'None' | 'Mild' | 'Moderate' | 'Severe';

export interface TreatmentPlan {
  organic: string[];
  chemical: string[];
  cultural: string[];
  prevention: string[];
}

export interface DiseaseInfo {
  id: string;
  name: string;
  scientificName: string;
  pathogenType: PathogenType;
  description: string;
  primarySymptoms: string[];
  earlyStageSigns: string[];
  advancedSigns: string[];
  favorableConditions: {
    temperature: string;
    humidity: string;
    spreadVector: string;
  };
  treatment: TreatmentPlan;
  sampleImageUrl: string;
  typicalSeverity: SeverityLevel;
  contagionRisk: 'None' | 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface LesionBox {
  x: number; // percentage 0-100
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
}

export interface DiagnosisResult {
  id: string;
  diseaseId: string;
  diseaseName: string;
  scientificName: string;
  pathogenType: PathogenType;
  confidence: number; // 0 - 100
  severity: SeverityLevel;
  lesionCoveragePercent: number;
  detectedLesions: LesionBox[];
  summary: string;
  keyObservations: string[];
  treatment: TreatmentPlan;
  analysisTimestamp: string;
  sourceType: 'upload' | 'camera' | 'sample';
  imageUri: string;
  processingTimeMs: number;
  aiEngineUsed: 'Gemini Vision AI' | 'AgroVision Neural Edge';
}

export interface SampleLeaf {
  id: string;
  title: string;
  condition: string;
  pathogen: PathogenType;
  imageUrl: string;
  description: string;
}
