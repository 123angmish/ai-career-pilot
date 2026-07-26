package com.careerpilot.controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import com.careerpilot.dto.SavedJobResponse;
import com.careerpilot.service.SavedJobService;

@RestController
@RequestMapping("/api/saved-jobs")
public class SavedJobController {

    @Autowired
    private SavedJobService savedJobService;

    @PostMapping("/{jobId}")
    public ResponseEntity<SavedJobResponse> saveJob(
            @PathVariable Long jobId,
            Authentication authentication) {

        String email = authentication.getName();

        SavedJobResponse response =
                savedJobService.saveJob(jobId, email);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<SavedJobResponse>> getSavedJobs(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                savedJobService.getSavedJobs(email));
    }
    @DeleteMapping("/{savedJobId}")
    public ResponseEntity<String> removeSavedJob(
            @PathVariable Long savedJobId,
            Authentication authentication) {

        String email = authentication.getName();

        savedJobService.removeSavedJob(savedJobId, email);

        return ResponseEntity.ok("Saved job removed successfully");
    }
}