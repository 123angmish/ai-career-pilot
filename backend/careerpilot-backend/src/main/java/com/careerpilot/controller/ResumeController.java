package com.careerpilot.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import com.careerpilot.entity.Resume;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import com.careerpilot.dto.ResumeResponse;
import com.careerpilot.service.ResumeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/resumes")
@SecurityRequirement(name = "Bearer Authentication")	
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    private String getEmail(Authentication authentication) {
        if (authentication != null && authentication.getName() != null && !authentication.getName().equalsIgnoreCase("anonymousUser")) {
            return authentication.getName();
        }
        return "demo@careerpilot.dev";
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResumeResponse> uploadResume(
            @RequestPart("file") MultipartFile file,
            Authentication authentication) throws IOException {

        String email = getEmail(authentication);

        ResumeResponse response = resumeService.uploadResume(file, email);

        return ResponseEntity.ok(response);
    }
    @GetMapping("/my-resume")
    public ResponseEntity<ResumeResponse> getMyResume(
            Authentication authentication) {

        String email = getEmail(authentication);

        ResumeResponse response = resumeService.getMyResume(email);

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadResume(
            @PathVariable Long id) throws IOException {

        Resume resume = resumeService.downloadResume(id);

        Path path = Paths.get(resume.getFilePath());

        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            throw new RuntimeException("File not found");
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resume.getFileName() + "\"")
                .body(resource);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResume(
            @PathVariable Long id,
            Authentication authentication) throws IOException {

        String email = getEmail(authentication);

        resumeService.deleteResume(id, email);

        return ResponseEntity.ok("Resume deleted successfully");
    }
}