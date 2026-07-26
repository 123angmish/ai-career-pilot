package com.careerpilot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.careerpilot.dto.JobRequest;
import com.careerpilot.entity.Job;
import com.careerpilot.service.JobService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    // Add a new job
    @PostMapping
    public ResponseEntity<Job> addJob(@Valid @RequestBody JobRequest request) {

        Job job = jobService.addJob(request);

        return new ResponseEntity<>(job, HttpStatus.CREATED);
    }

    // Get all jobs
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {

        return ResponseEntity.ok(jobService.getAllJobs());
    }

    // Get job by ID
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {

        return ResponseEntity.ok(jobService.getJobById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id,
                                         @RequestBody JobRequest request) {

        return ResponseEntity.ok(jobService.updateJob(id, request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id) {

        jobService.deleteJob(id);

        return ResponseEntity.ok("Job deleted successfully");
    }
    @GetMapping("/search/title")
    public ResponseEntity<List<Job>> searchByTitle(@RequestParam String title) {

        return ResponseEntity.ok(jobService.searchByTitle(title));
    }
    
    @GetMapping("/search/company")
    public ResponseEntity<List<Job>> searchByCompany(@RequestParam String company) {

        return ResponseEntity.ok(jobService.searchByCompany(company));
    }
    @GetMapping("/search/location")
    public ResponseEntity<List<Job>> searchByLocation(@RequestParam String location) {

        return ResponseEntity.ok(jobService.searchByLocation(location));
    }
    @GetMapping("/filter")
    public ResponseEntity<List<Job>> filterByJobType(@RequestParam String jobType) {

        return ResponseEntity.ok(jobService.filterByJobType(jobType));
    }
}