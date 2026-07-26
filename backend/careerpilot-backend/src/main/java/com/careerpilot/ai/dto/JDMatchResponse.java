package com.careerpilot.ai.dto;

import java.util.List;

public class JDMatchResponse {
	private int overallMatchScore;
	private String matchLevel;

	private List<String> matchedSkills;
	private List<String> missingSkills;
	private List<String> additionalSkills;

	private int atsScore;
	private List<String> atsKeywordsFound;
	private List<String> missingATSKeywords;

	private List<String> matchingProjects;
	private List<String> recommendedProjects;

	private String experienceMatch;

	private List<String> resumeStrengths;
	private List<String> resumeWeaknesses;
	private List<String> resumeImprovements;

	private List<String> recommendedCourses;
	private List<String> certifications;

	private List<String> interviewPreparationTopics;

	private String hiringRecommendation;
	private String overallFeedback;
	public JDMatchResponse() {
		super();
	}
	public JDMatchResponse(int overallMatchScore, String matchLevel, List<String> matchedSkills,
			List<String> missingSkills, List<String> additionalSkills, int atsScore, List<String> atsKeywordsFound,
			List<String> missingATSKeywords, List<String> matchingProjects, List<String> recommendedProjects,
			String experienceMatch, List<String> resumeStrengths, List<String> resumeWeaknesses,
			List<String> resumeImprovements, List<String> recommendedCourses, List<String> certifications,
			List<String> interviewPreparationTopics, String hiringRecommendation, String overallFeedback) {
		super();
		this.overallMatchScore = overallMatchScore;
		this.matchLevel = matchLevel;
		this.matchedSkills = matchedSkills;
		this.missingSkills = missingSkills;
		this.additionalSkills = additionalSkills;
		this.atsScore = atsScore;
		this.atsKeywordsFound = atsKeywordsFound;
		this.missingATSKeywords = missingATSKeywords;
		this.matchingProjects = matchingProjects;
		this.recommendedProjects = recommendedProjects;
		this.experienceMatch = experienceMatch;
		this.resumeStrengths = resumeStrengths;
		this.resumeWeaknesses = resumeWeaknesses;
		this.resumeImprovements = resumeImprovements;
		this.recommendedCourses = recommendedCourses;
		this.certifications = certifications;
		this.interviewPreparationTopics = interviewPreparationTopics;
		this.hiringRecommendation = hiringRecommendation;
		this.overallFeedback = overallFeedback;
	}
	public int getOverallMatchScore() {
		return overallMatchScore;
	}
	public void setOverallMatchScore(int overallMatchScore) {
		this.overallMatchScore = overallMatchScore;
	}
	public String getMatchLevel() {
		return matchLevel;
	}
	public void setMatchLevel(String matchLevel) {
		this.matchLevel = matchLevel;
	}
	public List<String> getMatchedSkills() {
		return matchedSkills;
	}
	public void setMatchedSkills(List<String> matchedSkills) {
		this.matchedSkills = matchedSkills;
	}
	public List<String> getMissingSkills() {
		return missingSkills;
	}
	public void setMissingSkills(List<String> missingSkills) {
		this.missingSkills = missingSkills;
	}
	public List<String> getAdditionalSkills() {
		return additionalSkills;
	}
	public void setAdditionalSkills(List<String> additionalSkills) {
		this.additionalSkills = additionalSkills;
	}
	public int getAtsScore() {
		return atsScore;
	}
	public void setAtsScore(int atsScore) {
		this.atsScore = atsScore;
	}
	public List<String> getAtsKeywordsFound() {
		return atsKeywordsFound;
	}
	public void setAtsKeywordsFound(List<String> atsKeywordsFound) {
		this.atsKeywordsFound = atsKeywordsFound;
	}
	public List<String> getMissingATSKeywords() {
		return missingATSKeywords;
	}
	public void setMissingATSKeywords(List<String> missingATSKeywords) {
		this.missingATSKeywords = missingATSKeywords;
	}
	public List<String> getMatchingProjects() {
		return matchingProjects;
	}
	public void setMatchingProjects(List<String> matchingProjects) {
		this.matchingProjects = matchingProjects;
	}
	public List<String> getRecommendedProjects() {
		return recommendedProjects;
	}
	public void setRecommendedProjects(List<String> recommendedProjects) {
		this.recommendedProjects = recommendedProjects;
	}
	public String getExperienceMatch() {
		return experienceMatch;
	}
	public void setExperienceMatch(String experienceMatch) {
		this.experienceMatch = experienceMatch;
	}
	public List<String> getResumeStrengths() {
		return resumeStrengths;
	}
	public void setResumeStrengths(List<String> resumeStrengths) {
		this.resumeStrengths = resumeStrengths;
	}
	public List<String> getResumeWeaknesses() {
		return resumeWeaknesses;
	}
	public void setResumeWeaknesses(List<String> resumeWeaknesses) {
		this.resumeWeaknesses = resumeWeaknesses;
	}
	public List<String> getResumeImprovements() {
		return resumeImprovements;
	}
	public void setResumeImprovements(List<String> resumeImprovements) {
		this.resumeImprovements = resumeImprovements;
	}
	public List<String> getRecommendedCourses() {
		return recommendedCourses;
	}
	public void setRecommendedCourses(List<String> recommendedCourses) {
		this.recommendedCourses = recommendedCourses;
	}
	public List<String> getCertifications() {
		return certifications;
	}
	public void setCertifications(List<String> certifications) {
		this.certifications = certifications;
	}
	public List<String> getInterviewPreparationTopics() {
		return interviewPreparationTopics;
	}
	public void setInterviewPreparationTopics(List<String> interviewPreparationTopics) {
		this.interviewPreparationTopics = interviewPreparationTopics;
	}
	public String getHiringRecommendation() {
		return hiringRecommendation;
	}
	public void setHiringRecommendation(String hiringRecommendation) {
		this.hiringRecommendation = hiringRecommendation;
	}
	public String getOverallFeedback() {
		return overallFeedback;
	}
	public void setOverallFeedback(String overallFeedback) {
		this.overallFeedback = overallFeedback;
	}
	@Override
	public String toString() {
		return "JDMatchResponse [overallMatchScore=" + overallMatchScore + ", matchLevel=" + matchLevel
				+ ", matchedSkills=" + matchedSkills + ", missingSkills=" + missingSkills + ", additionalSkills="
				+ additionalSkills + ", atsScore=" + atsScore + ", atsKeywordsFound=" + atsKeywordsFound
				+ ", missingATSKeywords=" + missingATSKeywords + ", matchingProjects=" + matchingProjects
				+ ", recommendedProjects=" + recommendedProjects + ", experienceMatch=" + experienceMatch
				+ ", resumeStrengths=" + resumeStrengths + ", resumeWeaknesses=" + resumeWeaknesses
				+ ", resumeImprovements=" + resumeImprovements + ", recommendedCourses=" + recommendedCourses
				+ ", certifications=" + certifications + ", interviewPreparationTopics=" + interviewPreparationTopics
				+ ", hiringRecommendation=" + hiringRecommendation + ", overallFeedback=" + overallFeedback + "]";
	}
	
	
}