package com.careerpilot.dto;

import java.time.LocalDateTime;

public class ApplicationResponse {

    private Long applicationId;
    private String jobTitle;
    private String company;
    private LocalDateTime appliedDate;
    private String status;

    public ApplicationResponse() {
    }

    public ApplicationResponse(Long applicationId,
                               String jobTitle,
                               String company,
                               LocalDateTime appliedDate,
                               String status) {

        this.applicationId = applicationId;
        this.jobTitle = jobTitle;
        this.company = company;
        this.appliedDate = appliedDate;
        this.status = status;
    }

	public Long getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(Long applicationId) {
		this.applicationId = applicationId;
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

	public LocalDateTime getAppliedDate() {
		return appliedDate;
	}

	public void setAppliedDate(LocalDateTime appliedDate) {
		this.appliedDate = appliedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "ApplicationResponse [applicationId=" + applicationId + ", jobTitle=" + jobTitle + ", company=" + company
				+ ", appliedDate=" + appliedDate + ", status=" + status + "]";
	}

    
}