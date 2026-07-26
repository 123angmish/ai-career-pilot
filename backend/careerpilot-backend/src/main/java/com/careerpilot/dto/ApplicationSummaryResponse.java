package com.careerpilot.dto;

import java.time.LocalDateTime;

public class ApplicationSummaryResponse {

    private Long applicationId;
    private String applicantName;
    private String applicantEmail;
    private String jobTitle;
    private String company;
    private String status;
    private LocalDateTime appliedDate;

    public ApplicationSummaryResponse() {
    }

    public ApplicationSummaryResponse(Long applicationId,
                                      String applicantName,
                                      String applicantEmail,
                                      String jobTitle,
                                      String company,
                                      String status,
                                      LocalDateTime appliedDate) {
        this.applicationId = applicationId;
        this.applicantName = applicantName;
        this.applicantEmail = applicantEmail;
        this.jobTitle = jobTitle;
        this.company = company;
        this.status = status;
        this.appliedDate = appliedDate;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getApplicantEmail() {
        return applicantEmail;
    }

    public void setApplicantEmail(String applicantEmail) {
        this.applicantEmail = applicantEmail;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDateTime appliedDate) {
        this.appliedDate = appliedDate;
    }
}