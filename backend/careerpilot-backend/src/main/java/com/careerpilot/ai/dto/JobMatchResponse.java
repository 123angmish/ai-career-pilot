package com.careerpilot.ai.dto;

public class JobMatchResponse {

    private Long jobId;
    private String title;
    private String company;
    private String location;
    private int matchPercentage;

    public JobMatchResponse() {
    }

    public JobMatchResponse(Long jobId,
                            String title,
                            String company,
                            String location,
                            int matchPercentage) {
        this.jobId = jobId;
        this.title = title;
        this.company = company;
        this.location = location;
        this.matchPercentage = matchPercentage;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public int getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(int matchPercentage) {
        this.matchPercentage = matchPercentage;
    }
}