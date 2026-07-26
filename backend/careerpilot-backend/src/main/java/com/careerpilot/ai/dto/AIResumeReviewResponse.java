package com.careerpilot.ai.dto;

import java.util.List;

public class AIResumeReviewResponse {

    private String professionalSummary;
    private List<String> strengths;
    private List<String> weaknesses;
    private List<String> missingSkills;
    private List<String> projectImprovements;
    private List<String> grammarSuggestions;
    private List<String> atsTips;
	public AIResumeReviewResponse(String professionalSummary, List<String> strengths, List<String> weaknesses,
			List<String> missingSkills, List<String> projectImprovements, List<String> grammarSuggestions,
			List<String> atsTips) {
		super();
		this.professionalSummary = professionalSummary;
		this.strengths = strengths;
		this.weaknesses = weaknesses;
		this.missingSkills = missingSkills;
		this.projectImprovements = projectImprovements;
		this.grammarSuggestions = grammarSuggestions;
		this.atsTips = atsTips;
	}
	public String getProfessionalSummary() {
		return professionalSummary;
	}
	public void setProfessionalSummary(String professionalSummary) {
		this.professionalSummary = professionalSummary;
	}
	public List<String> getStrengths() {
		return strengths;
	}
	public void setStrengths(List<String> strengths) {
		this.strengths = strengths;
	}
	public List<String> getWeaknesses() {
		return weaknesses;
	}
	public void setWeaknesses(List<String> weaknesses) {
		this.weaknesses = weaknesses;
	}
	public List<String> getMissingSkills() {
		return missingSkills;
	}
	public void setMissingSkills(List<String> missingSkills) {
		this.missingSkills = missingSkills;
	}
	public List<String> getProjectImprovements() {
		return projectImprovements;
	}
	public void setProjectImprovements(List<String> projectImprovements) {
		this.projectImprovements = projectImprovements;
	}
	public List<String> getGrammarSuggestions() {
		return grammarSuggestions;
	}
	public void setGrammarSuggestions(List<String> grammarSuggestions) {
		this.grammarSuggestions = grammarSuggestions;
	}
	public List<String> getAtsTips() {
		return atsTips;
	}
	public void setAtsTips(List<String> atsTips) {
		this.atsTips = atsTips;
	}
	@Override
	public String toString() {
		return "AIResumeReviewResponse [professionalSummary=" + professionalSummary + ", strengths=" + strengths
				+ ", weaknesses=" + weaknesses + ", missingSkills=" + missingSkills + ", projectImprovements="
				+ projectImprovements + ", grammarSuggestions=" + grammarSuggestions + ", atsTips=" + atsTips + "]";
	}

   
}