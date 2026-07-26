// Matches backend ResumeAnalysisResponse
export interface ResumeAnalysisApiResponse {
  extractedText: string;
  skills: string[];
  atsScore: number;
  missingSkills: string[];
  suggestions: string[];
  recommendedJobs: RecommendedJob[];
  aiSuggestions: string; // JSON string from Gemini
}

export interface RecommendedJob {
  jobId: number;
  title: string;
  company: string;
  location: string;
  matchPercentage: number;
}

// Parsed from aiSuggestions JSON string
export interface AIResumeReview {
  professionalSummary: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  projectImprovements: string[];
  grammarSuggestions: string[];
  atsTips: string[];
}

// Combined, fully parsed analysis object used in components
export interface ParsedResumeAnalysis {
  extractedText: string;
  skills: string[];
  atsScore: number;
  missingSkills: string[];
  suggestions: string[];
  recommendedJobs: RecommendedJob[];
  aiReview: AIResumeReview | null;
}
