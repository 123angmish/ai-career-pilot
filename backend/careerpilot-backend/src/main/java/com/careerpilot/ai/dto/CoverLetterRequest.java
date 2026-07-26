package com.careerpilot.ai.dto;

public class CoverLetterRequest {

    private String companyName;
    private String jobRole;

    public CoverLetterRequest() {}

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }
}