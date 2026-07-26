export interface ResumeDto {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

export interface AtsScoreBreakdown {
  keywordMatch: number; // 0-100
  formatting: number; // 0-100
  structure: number; // 0-100
  quantifiableImpact: number; // 0-100
}

export interface AtsFeedbackItem {
  category: 'KEYWORD' | 'FORMATTING' | 'STRUCTURE' | 'IMPACT';
  severity: 'CRITICAL' | 'WARNING' | 'SUGGESTION';
  message: string;
  suggestion: string;
}

export interface AtsAnalysisDto {
  id: string;
  resumeId: string;
  overallScore: number;
  breakdown: AtsScoreBreakdown;
  feedback: AtsFeedbackItem[];
  analyzedAt: string;
}

export interface SectionAnalysis {
  sectionName: string;
  isPresent: boolean;
  feedback: string;
}

export interface ResumeAnalysisDto {
  id: string;
  resumeId: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  grammarIssuesCount: number;
  sectionAnalyses: SectionAnalysis[];
  analyzedAt: string;
}

export interface JdMatchRequest {
  resumeId: string;
  jobDescription: string;
}

export interface JdMatchResponse {
  matchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  gaps: string[];
  tailoringSuggestions: string[];
}
