package com.careerpilot.ai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.careerpilot.ai.dto.MockInterviewRequest;
import com.careerpilot.ai.dto.MockInterviewResponse;
import com.careerpilot.ai.service.MockInterviewService;

@RestController
@RequestMapping("/api/ai")
public class MockInterviewController {

    @Autowired
    private MockInterviewService mockInterviewService;

    @PostMapping("/mock-interview")
    public MockInterviewResponse evaluateInterview(
            @RequestBody MockInterviewRequest request) {

        return mockInterviewService.evaluate(request);
    }
}