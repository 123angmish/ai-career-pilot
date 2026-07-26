package com.careerpilot.controller;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.careerpilot.dto.ApplicantResponse;

import com.careerpilot.dto.ApplicationResponse;
import com.careerpilot.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply/{jobId}")
    public ResponseEntity<ApplicationResponse> applyForJob(
            @PathVariable Long jobId,
            Authentication authentication) {

        String email = authentication.getName();

        ApplicationResponse response =
                applicationService.applyForJob(jobId, email);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/my-applications")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                applicationService.getMyApplications(email));
    }
    
    @DeleteMapping("/{applicationId}")
    public ResponseEntity<String> withdrawApplication(
            @PathVariable Long applicationId,
            Authentication authentication) {

        String email = authentication.getName();

        applicationService.withdrawApplication(applicationId, email);

        return ResponseEntity.ok("Application withdrawn successfully");
    }
    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicantResponse>> getApplicantsByJob(
            @PathVariable Long jobId) {

        return ResponseEntity.ok(
                applicationService.getApplicantsByJob(jobId));
    }
}