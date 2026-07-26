export interface JDMatchRequest {
  resumeId: string;
  jobDescription: string;
}

export interface JDMatchApiResponse {
  matchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  gaps: string[];
  tailoringSuggestions: string[];
}

export interface JDMatchResult extends JDMatchApiResponse {
  analyzedAt: string;
}

export type MatchStatus = 'Excellent match' | 'Good match' | 'Average match' | 'Needs improvement';

export function getMatchStatus(score: number): MatchStatus {
  if (score >= 95) return 'Excellent match';
  if (score >= 80) return 'Good match';
  if (score >= 60) return 'Average match';
  return 'Needs improvement';
}
