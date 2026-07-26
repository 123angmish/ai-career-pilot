package com.careerpilot.dto;

public class AdminDashboardResponse {

    private long totalUsers;
    private long totalJobs;
    private long totalApplications;
    private long totalResumes;
    private long totalSavedJobs;

    public AdminDashboardResponse() {
    }

    public AdminDashboardResponse(long totalUsers,
                                  long totalJobs,
                                  long totalApplications,
                                  long totalResumes,
                                  long totalSavedJobs) {
        this.totalUsers = totalUsers;
        this.totalJobs = totalJobs;
        this.totalApplications = totalApplications;
        this.totalResumes = totalResumes;
        this.totalSavedJobs = totalSavedJobs;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalJobs() {
        return totalJobs;
    }

    public void setTotalJobs(long totalJobs) {
        this.totalJobs = totalJobs;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }

    public long getTotalResumes() {
        return totalResumes;
    }

    public void setTotalResumes(long totalResumes) {
        this.totalResumes = totalResumes;
    }

    public long getTotalSavedJobs() {
        return totalSavedJobs;
    }

    public void setTotalSavedJobs(long totalSavedJobs) {
        this.totalSavedJobs = totalSavedJobs;
    }
}