package com.careerpilot.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.careerpilot.dto.SavedJobResponse;
import com.careerpilot.entity.Job;
import com.careerpilot.entity.SavedJob;
import com.careerpilot.entity.User;
import com.careerpilot.repository.JobRepository;
import com.careerpilot.repository.SavedJobRepository;
import com.careerpilot.repository.UserRepository;

@Service
public class SavedJobService {

    @Autowired
    private SavedJobRepository savedJobRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    public SavedJobResponse saveJob(Long jobId, String email) {

        // Find logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Find job
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Prevent duplicate saves
        if (savedJobRepository.findByUserAndJob(user, job).isPresent()) {
            throw new RuntimeException("Job already saved");
        }

        // Save job
        SavedJob savedJob = new SavedJob();
        savedJob.setUser(user);
        savedJob.setJob(job);
        savedJob.setSavedDate(LocalDateTime.now());

        SavedJob saved = savedJobRepository.save(savedJob);

        return new SavedJobResponse(
                saved.getId(),
                job.getId(),
                job.getTitle(),
                job.getCompany(),
                job.getLocation(),
                saved.getSavedDate()
        );
    }
    
    public List<SavedJobResponse> getSavedJobs(String email) {

        // Find logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get saved jobs
        List<SavedJob> savedJobs = savedJobRepository.findByUser(user);

        // Convert to DTO
        return savedJobs.stream()
                .map(saved -> new SavedJobResponse(
                        saved.getId(),
                        saved.getJob().getId(),
                        saved.getJob().getTitle(),
                        saved.getJob().getCompany(),
                        saved.getJob().getLocation(),
                        saved.getSavedDate()))
                .toList();
    }
    
    public void removeSavedJob(Long savedJobId, String email) {

        // Find logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Find saved job
        SavedJob savedJob = savedJobRepository.findById(savedJobId)
                .orElseThrow(() -> new RuntimeException("Saved job not found"));

        // Security check
        if (!savedJob.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to remove this saved job");
        }

        // Delete saved job
        savedJobRepository.delete(savedJob);
    }
}