package com.careerpilot.ai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerpilot.ai.dto.ResumeAnalysisResponse;
import com.careerpilot.ai.service.ResumeAnalyzerService;

@RestController
@RequestMapping("/api/ai")
public class ResumeAnalyzerController {

    @Autowired
    private ResumeAnalyzerService resumeAnalyzerService;

    @GetMapping("/analyze")
    public ResponseEntity<ResumeAnalysisResponse> analyze(Authentication authentication) {

        String email = (authentication != null && authentication.getName() != null && !authentication.getName().equalsIgnoreCase("anonymousUser"))
                ? authentication.getName() : "demo@careerpilot.dev";

        return ResponseEntity.ok(
                resumeAnalyzerService.analyzeResume(email)
        );
    }
}