package com.careerpilot.ai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerpilot.ai.dto.AIRequest;
import com.careerpilot.ai.dto.AIResponse;
import com.careerpilot.ai.service.GeminiService;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/chat")
    public AIResponse chat(@RequestBody AIRequest request) {

        String reply = geminiService.generateResponse(request.getPrompt());

        return new AIResponse(reply);
    }
    @PostMapping("/improve-resume")
    public AIResponse improveResume(@RequestBody AIRequest request) {

        String response = geminiService.improveResume(request.getPrompt());

        return new AIResponse(response);
    }
}