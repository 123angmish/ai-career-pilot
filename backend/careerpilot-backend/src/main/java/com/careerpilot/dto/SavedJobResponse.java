package com.careerpilot.dto;

import java.time.LocalDateTime;

public class SavedJobResponse {

    private Long savedJobId;
    private Long jobId;
    private String jobTitle;
    private String company;
    private String location;
    private LocalDateTime savedDate;

    public SavedJobResponse() {
    }

    public SavedJobResponse(Long savedJobId,
                            Long jobId,
                            String jobTitle,
                            String company,
                            String location,
                            LocalDateTime savedDate) {

        this.savedJobId = savedJobId;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.company = company;
        this.location = location;
        this.savedDate = savedDate;
    }

    public Long getSavedJobId() {
        return savedJobId;
    }

    public void setSavedJobId(Long savedJobId) {
        this.savedJobId = savedJobId;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getSavedDate() {
        return savedDate;
    }

    public void setSavedDate(LocalDateTime savedDate) {
        this.savedDate = savedDate;
    }
}