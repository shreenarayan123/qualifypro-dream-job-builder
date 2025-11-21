export interface Analysis {
  id: string;
  timestamp: string;
  fileName: string;
  overallScore: number;
  results: any;
}

export interface UsageData {
  usageCount: number;
  maxFreeAnalyses: number;
  analyses: Analysis[];
}

const STORAGE_KEY = 'qualifypro_usage';

export const getUsageData = (): UsageData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    usageCount: 0,
    maxFreeAnalyses: 2,
    analyses: []
  };
};

export const canAnalyze = (): boolean => {
  const data = getUsageData();
  return data.usageCount < data.maxFreeAnalyses;
};

export const saveAnalysis = (fileName: string, overallScore: number, results: any): string => {
  const data = getUsageData();
  const id = crypto.randomUUID();
  
  const analysis: Analysis = {
    id,
    timestamp: new Date().toISOString(),
    fileName,
    overallScore,
    results
  };
  
  data.analyses.push(analysis);
  data.usageCount++;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return id;
};

export const getRemainingAnalyses = (): number => {
  const data = getUsageData();
  return Math.max(0, data.maxFreeAnalyses - data.usageCount);
};
