package com.careerpilot.ai.dto;

public class InterviewRequest {

    private String jobRole;
    private String experienceLevel;

    public InterviewRequest() {
    }

    public InterviewRequest(String jobRole, String experienceLevel) {
        this.jobRole = jobRole;
        this.experienceLevel = experienceLevel;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public String getExperienceLevel() {
        return experienceLevel;
    }

    public void setExperienceLevel(String experienceLevel) {
        this.experienceLevel = experienceLevel;
    }
}