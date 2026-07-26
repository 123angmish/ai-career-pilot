package com.careerpilot.ai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.careerpilot.ai.dto.InterviewRequest;
import com.careerpilot.ai.dto.InterviewResponse;
import com.careerpilot.ai.service.InterviewService;

@RestController
@RequestMapping("/api/ai")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @PostMapping("/interview")
    public InterviewResponse generateInterview(
            @RequestBody InterviewRequest request) {

        return interviewService.generateInterview(request);
    }
}