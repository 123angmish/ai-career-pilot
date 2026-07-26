package com.careerpilot.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerpilot.dto.AdminDashboardResponse;
import com.careerpilot.dto.ApplicationStatusResponse;
import com.careerpilot.dto.ApplicationSummaryResponse;
import com.careerpilot.dto.JobSummaryResponse;
import com.careerpilot.dto.UserSummaryResponse;
import com.careerpilot.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public AdminDashboardResponse dashboard() {
        return adminService.getDashboard();
    }
    @GetMapping("/users")
    public List<UserSummaryResponse> getAllUsers() {
        return adminService.getAllUsers();
    }
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {

        return ResponseEntity.ok(
                adminService.deleteUser(userId)
        );
    }
    @GetMapping("/jobs")
    public List<JobSummaryResponse> getAllJobs() {
        return adminService.getAllJobs();
    }
    @GetMapping("/applications")
    public List<ApplicationSummaryResponse> getAllApplications() {
        return adminService.getAllApplications();
    }
    @GetMapping("/analytics/application-status")
    public List<ApplicationStatusResponse> getApplicationStatusAnalytics() {
        return adminService.getApplicationStatusAnalytics();
    }
}