package com.careerpilot.ai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.careerpilot.ai.dto.JDMatchRequest;
import com.careerpilot.ai.dto.JDMatchResponse;
import com.careerpilot.ai.service.JDMatchService;

@RestController
@RequestMapping("/api/v1/resumes")
public class JDMatchController {

    @Autowired
    private JDMatchService jdMatchService;

    @PostMapping("/match-jd")
    public JDMatchResponse matchResume(
            Authentication authentication,
            @RequestBody JDMatchRequest request) {

        String email = (authentication != null && authentication.getName() != null && !authentication.getName().equalsIgnoreCase("anonymousUser"))
                ? authentication.getName() : "demo@careerpilot.dev";

        return jdMatchService.matchResume(email, request);
    }
}