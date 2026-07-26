package com.careerpilot.ai.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.careerpilot.ai.dto.MockInterviewRequest;
import com.careerpilot.ai.dto.MockInterviewResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class MockInterviewService {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private ObjectMapper objectMapper;

    public MockInterviewResponse evaluate(MockInterviewRequest request) {

        String json = geminiService.evaluateMockInterview(
                request.getQuestion(),
                request.getUserAnswer(),
                request.getJobRole());

        try {
            if (json != null && json.startsWith("{") && json.endsWith("}")) {
                return objectMapper.readValue(json, MockInterviewResponse.class);
            }
        } catch (Exception e) {
            System.out.println("Mock interview JSON parse exception: " + e.getMessage());
        }

        return createFallbackEvaluation(request.getQuestion(), request.getUserAnswer(), request.getJobRole());
    }

    private MockInterviewResponse createFallbackEvaluation(String question, String answer, String role) {
        MockInterviewResponse resp = new MockInterviewResponse();
        String ans = answer != null ? answer.trim() : "";
        String lowerAns = ans.toLowerCase();
        int wordCount = ans.isEmpty() ? 0 : ans.split("\\s+").length;

        boolean isOffTopic = wordCount < 4 || 
            lowerAns.contains("dead") || lowerAns.contains("dunno") || lowerAns.contains("idk") ||
            lowerAns.contains("don't know") || lowerAns.contains("dont know") || lowerAns.contains("no idea") ||
            lowerAns.contains("pass") || lowerAns.contains("test") || lowerAns.contains("whatever") ||
            lowerAns.contains("asdf") || lowerAns.contains("qwerty");

        if (isOffTopic) {
            resp.setScore(1);
            resp.setConfidenceLevel("Unsatisfactory (Off-Topic / Non-Responsive)");
            resp.setStrengths("None identified. The response provided (\"" + ans + "\") contains no relevant technical content or professional achievements.");
            resp.setWeaknesses("The response is non-responsive or off-topic for a " + role + " position. A valid response must detail relevant tools, domain experience, and quantifiable project outcomes.");
            resp.setImprovedAnswer("Model Answer: Provide a structured STAR response detailing your technical stack (e.g. SQL, Python, Java, React), key project responsibilities, and measurable results achieved.");
            return resp;
        }

        int score = Math.min(10, Math.max(3, wordCount / 5 + 3));
        resp.setScore(score);
        resp.setConfidenceLevel(score >= 8 ? "High (Strong Mastery)" : score >= 6 ? "Moderate (Proficient)" : "Developing (Needs Depth)");
        resp.setStrengths("Addressed question prompt for " + role + " role with " + wordCount + " words of technical content.");
        resp.setWeaknesses("To reach top-tier rating: include explicit metric outcomes (e.g., 'increased query efficiency by 40%') and discuss architectural trade-offs.");
        resp.setImprovedAnswer("Model Answer Structure:\n1. Executive Summary of your role & experience.\n2. Concrete Tools & Methodology used.\n3. Quantified Business Outcome achieved.");
        return resp;
    }
}