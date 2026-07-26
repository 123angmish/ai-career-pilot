package com.careerpilot.ai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.careerpilot.ai.dto.CoverLetterRequest;
import com.careerpilot.ai.dto.CoverLetterResponse;
import com.careerpilot.ai.service.CoverLetterService;

@RestController
@RequestMapping("/api/ai")
public class CoverLetterController {

    @Autowired
    private CoverLetterService coverLetterService;

    @PostMapping("/cover-letter")
    public CoverLetterResponse generateCoverLetter(
            @RequestBody CoverLetterRequest request,
            Authentication authentication) {

        String email = (authentication != null && authentication.getName() != null && !authentication.getName().equalsIgnoreCase("anonymousUser"))
                ? authentication.getName() : "demo@careerpilot.dev";

        String coverLetter = coverLetterService.generateCoverLetter(email, request);

        return new CoverLetterResponse(coverLetter);
    }
}