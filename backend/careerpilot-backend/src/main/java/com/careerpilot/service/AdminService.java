package com.careerpilot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.careerpilot.dto.AdminDashboardResponse;
import com.careerpilot.dto.ApplicationStatusResponse;
import com.careerpilot.dto.ApplicationSummaryResponse;
import com.careerpilot.dto.JobSummaryResponse;
import com.careerpilot.dto.UserSummaryResponse;
import com.careerpilot.entity.Job;
import com.careerpilot.entity.User;
import com.careerpilot.repository.ApplicationRepository;
import com.careerpilot.repository.JobRepository;
import com.careerpilot.repository.ResumeRepository;
import com.careerpilot.repository.SavedJobRepository;
import com.careerpilot.repository.UserRepository;
@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private SavedJobRepository savedJobRepository;

    public AdminDashboardResponse getDashboard() {

        return new AdminDashboardResponse(
                userRepository.count(),
                jobRepository.count(),
                applicationRepository.count(),
                resumeRepository.count(),
                savedJobRepository.count()
        );
    }
    public List<UserSummaryResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(user -> new UserSummaryResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getRole()))
                .toList();
    }
    @Transactional
    public String deleteUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Prevent deleting admin accounts
        if ("ROLE_ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Admin account cannot be deleted");
        }

        // Delete related records
        applicationRepository.deleteByUser(user);
        savedJobRepository.deleteByUser(user);
        resumeRepository.deleteByUser(user);

        // Delete user
        userRepository.delete(user);

        return "User deleted successfully";
    }
    public List<JobSummaryResponse> getAllJobs() {

        return jobRepository.findAll()
                .stream()
                .map(job -> new JobSummaryResponse(
                        job.getId(),
                        job.getTitle(),
                        job.getCompany(),
                        job.getLocation(),
                        job.getJobType(),
                        job.getSalary()))
                .toList();
    }
    @Transactional
    public String deleteJob(Long jobId) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        applicationRepository.deleteByJob(job);

        savedJobRepository.deleteByJob(job);

        jobRepository.delete(job);

        return "Job deleted successfully";
    }
    public List<ApplicationSummaryResponse> getAllApplications() {

        return applicationRepository.findAll()
                .stream()
                .map(application -> new ApplicationSummaryResponse(
                        application.getId(),
                        application.getUser().getFullName(),
                        application.getUser().getEmail(),
                        application.getJob().getTitle(),
                        application.getJob().getCompany(),
                        application.getStatus(),
                        application.getAppliedDate()
                ))
                .toList();
    }
    public List<ApplicationStatusResponse> getApplicationStatusAnalytics() {

        return applicationRepository.countApplicationsByStatus()
                .stream()
                .map(result -> new ApplicationStatusResponse(
                        (String) result[0],
                        (Long) result[1]
                ))
                .toList();
    }
}