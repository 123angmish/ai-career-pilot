package com.careerpilot.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.careerpilot.dto.JobRequest;
import com.careerpilot.entity.Job;
import com.careerpilot.repository.JobRepository;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public Job addJob(JobRequest request) {

        Job job = new Job();

        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());
        job.setSalary(request.getSalary());
        job.setExperience(request.getExperience());
        job.setDescription(request.getDescription());
        job.setSkillsRequired(request.getSkillsRequired());
        job.setApplicationDeadline(request.getApplicationDeadline());

        // Automatically set the posted date
        job.setPostedDate(LocalDateTime.now());

        return jobRepository.save(job);
    }
    
    public List<Job> getAllJobs() {

        return jobRepository.findAll();

    }
    
    public Job getJobById(Long id) {

        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

    }
    public Job updateJob(Long id, JobRequest request) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());
        job.setSalary(request.getSalary());
        job.setExperience(request.getExperience());
        job.setDescription(request.getDescription());
        job.setSkillsRequired(request.getSkillsRequired());
        job.setApplicationDeadline(request.getApplicationDeadline());

        return jobRepository.save(job);
    }
    public void deleteJob(Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        jobRepository.delete(job);
    }
    public List<Job> searchByTitle(String title) {
        return jobRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Job> searchByCompany(String company) {
        return jobRepository.findByCompanyContainingIgnoreCase(company);
    }

    public List<Job> searchByLocation(String location) {
        return jobRepository.findByLocationContainingIgnoreCase(location);
    }
    public List<Job> filterByJobType(String jobType) {

        return jobRepository.findByJobTypeIgnoreCase(jobType);
    }
}