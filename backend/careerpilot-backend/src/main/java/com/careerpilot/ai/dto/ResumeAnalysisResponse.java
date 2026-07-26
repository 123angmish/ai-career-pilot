package com.careerpilot.ai.dto;

import java.util.List;

public class ResumeAnalysisResponse {

    private String extractedText;
    private List<String> skills;

    private int atsScore;
    private List<String> missingSkills;
    private List<String> suggestions;
    private List<JobMatchResponse> recommendedJobs;
    private String aiSuggestions;

    public ResumeAnalysisResponse() {
    }

    public ResumeAnalysisResponse(String extractedText,
                                  List<String> skills,
                                  int atsScore,
                                  List<String> missingSkills,
                                  List<String> suggestions) {
        this.extractedText = extractedText;
        this.skills = skills;
        this.atsScore = atsScore;
        this.missingSkills = missingSkills;
        this.suggestions = suggestions;
    }
    
    public ResumeAnalysisResponse(
            String extractedText,
            List<String> skills,
            int atsScore,
            List<String> missingSkills,
            List<String> suggestions,
            List<JobMatchResponse> recommendedJobs) {

        this.extractedText = extractedText;
        this.skills = skills;
        this.atsScore = atsScore;
        this.missingSkills = missingSkills;
        this.suggestions = suggestions;
        this.recommendedJobs = recommendedJobs;
    }
    
    

    public ResumeAnalysisResponse(String extractedText, List<String> skills, int atsScore, List<String> missingSkills,
			List<String> suggestions, List<JobMatchResponse> recommendedJobs, String aiSuggestions) {
		super();
		this.extractedText = extractedText;
		this.skills = skills;
		this.atsScore = atsScore;
		this.missingSkills = missingSkills;
		this.suggestions = suggestions;
		this.recommendedJobs = recommendedJobs;
		this.aiSuggestions = aiSuggestions;
	}

    
	public String getAiSuggestions() {
		return aiSuggestions;
	}

	public void setAiSuggestions(String aiSuggestions) {
		this.aiSuggestions = aiSuggestions;
	}

	public String getExtractedText() {
        return extractedText;
    }

    public void setExtractedText(String extractedText) {
        this.extractedText = extractedText;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public int getAtsScore() {
        return atsScore;
    }

    public void setAtsScore(int atsScore) {
        this.atsScore = atsScore;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }

	public List<JobMatchResponse> getRecommendedJobs() {
		return recommendedJobs;
	}

	public void setRecommendedJobs(List<JobMatchResponse> recommendedJobs) {
		this.recommendedJobs = recommendedJobs;
	}
    
}