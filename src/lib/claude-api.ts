import { supabase } from "@/integrations/supabase/client";

export interface AnalysisResult {
  overallScore: number;
  overallSummary: string;
  atsCompatibility: {
    score: number;
    status: string;
    criticalIssues: Array<{ issue: string; fix: string; impact: string }>;
    warnings: Array<{ issue: string; fix: string; impact: string }>;
    suggestions: Array<{ suggestion: string; benefit: string; impact: string }>;
  };
  keywordAnalysis: {
    matchRate: number;
    foundKeywords: string[];
    missingKeywords: Array<{ keyword: string; priority: string; mentions: number; context: string }>;
  };
  skillsGap: {
    score: number;
    strongMatches: Array<{ skill: string; rating: number; evidence: string }>;
    skillsToHighlight: string[];
    missingSkills: string[];
  };
  experienceMatch: {
    score: number;
    wins: string[];
    gaps: string[];
  };
  formatAnalysis: {
    score: number;
    goodPoints: string[];
    issues: string[];
  };
  recommendations: Array<{
    priority: string;
    title: string;
    description: string;
    impact: number;
    howTo: string;
  }>;
}

const convertPDFToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeResumePDF = async (
  pdfFile: File,
  jobDescription: string
): Promise<AnalysisResult> => {
  const base64PDF = await convertPDFToBase64(pdfFile);

  const { data, error } = await supabase.functions.invoke("analyze-resume", {
    body: { base64PDF, jobDescription },
  });

  if (error) {
    console.error("analyze-resume function error:", error);
    throw new Error(error.message || "Failed to analyze resume. Please try again.");
  }

  return data as AnalysisResult;
};
