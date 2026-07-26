package com.careerpilot.dto;

import java.time.LocalDateTime;

public class ApplicantResponse {

    private Long applicationId;
    private String fullName;
    private String email;
    private LocalDateTime appliedDate;
    private String status;

    public ApplicantResponse() {
    }

    public ApplicantResponse(Long applicationId,
                             String fullName,
                             String email,
                             LocalDateTime appliedDate,
                             String status) {

        this.applicationId = applicationId;
        this.fullName = fullName;
        this.email = email;
        this.appliedDate = appliedDate;
        this.status = status;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
}