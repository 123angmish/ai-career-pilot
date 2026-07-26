package com.careerpilot.service;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.careerpilot.dto.ApplicantResponse;
import com.careerpilot.dto.ApplicationResponse;
import com.careerpilot.entity.Application;
import com.careerpilot.entity.Job;
import com.careerpilot.entity.User;
import com.careerpilot.repository.ApplicationRepository;
import com.careerpilot.repository.JobRepository;
import com.careerpilot.repository.UserRepository;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;
    public ApplicationResponse applyForJob(Long jobId, String email) {

        // Find logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Find job
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Prevent duplicate applications
        if (applicationRepository.findByUserAndJob(user, job).isPresent()) {
            throw new RuntimeException("You have already applied for this job");
        }

        // Create application
        Application application = new Application();

        application.setUser(user);
        application.setJob(job);
        application.setAppliedDate(LocalDateTime.now());
        application.setStatus("APPLIED");

        Application saved = applicationRepository.save(application);

        return new ApplicationResponse(
                saved.getId(),
                saved.getJob().getTitle(),
                saved.getJob().getCompany(),
                saved.getAppliedDate(),
                saved.getStatus()
        );
    }
    public List<ApplicationResponse> getMyApplications(String email) {

        // Find logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get all applications
        List<Application> applications = applicationRepository.findByUser(user);

        // Convert Entity to DTO
        return applications.stream()
                .map(application -> new ApplicationResponse(
                        application.getId(),
                        application.getJob().getTitle(),
                        application.getJob().getCompany(),
                        application.getAppliedDate(),
                        application.getStatus()))
                .toList();
    }
    
    public void withdrawApplication(Long applicationId, String email) {

        // Find logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Find application
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        // Security check
        if (!application.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to withdraw this application");
        }

        // Delete application
        applicationRepository.delete(application);
    }
    public List<ApplicantResponse> getApplicantsByJob(Long jobId) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        List<Application> applications = applicationRepository.findByJob(job);

        return applications.stream()
                .map(application -> new ApplicantResponse(
                        application.getId(),
                        application.getUser().getFullName(),
                        application.getUser().getEmail(),
                        application.getAppliedDate(),
                        application.getStatus()))
                .toList();
    }
}