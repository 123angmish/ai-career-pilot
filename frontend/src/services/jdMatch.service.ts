import api from './api';
import type { ApiResponse } from '../types/common';
import type { JDMatchRequest, JDMatchResult } from '../types/jdMatch';

export const jdMatchService = {
  async analyze(request: JDMatchRequest): Promise<JDMatchResult> {
    const response = await api.post<ApiResponse<any>>('/api/v1/resumes/match-jd', request);
    const result = response.data.data;

    return {
      matchPercentage: result.matchPercentage ?? result.overallMatchScore ?? 0,
      matchedKeywords: result.matchedKeywords ?? result.matchedSkills ?? [],
      missingKeywords: result.missingKeywords ?? result.missingSkills ?? [],
      strengths: result.strengths ?? result.resumeStrengths ?? [],
      gaps: result.gaps ?? result.resumeWeaknesses ?? [],
      tailoringSuggestions: result.tailoringSuggestions ?? result.resumeImprovements ?? [],
      analyzedAt: response.data.timestamp ?? new Date().toISOString(),
    };
  },
};
