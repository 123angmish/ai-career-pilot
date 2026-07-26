package com.careerpilot.ai.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.careerpilot.ai.dto.InterviewRequest;
import com.careerpilot.ai.dto.InterviewResponse;
import com.careerpilot.ai.dto.TechnicalQuestion;
import com.careerpilot.ai.dto.HRQuestion;
import com.careerpilot.ai.dto.CodingQuestion;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class InterviewService {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private ObjectMapper objectMapper;

    public InterviewResponse generateInterview(InterviewRequest request) {

        String json = geminiService.generateInterviewQuestions(
                request.getJobRole(),
                request.getExperienceLevel());

        try {
            if (json != null && json.startsWith("{") && json.endsWith("}")) {
                return objectMapper.readValue(json, InterviewResponse.class);
            }
        } catch (Exception e) {
            System.out.println("Gemini JSON parsing failed, using smart fallback generator: " + e.getMessage());
        }

        return createFallbackInterview(request.getJobRole(), request.getExperienceLevel());
    }

    private InterviewResponse createFallbackInterview(String role, String exp) {
        InterviewResponse resp = new InterviewResponse();

        TechnicalQuestion t1 = new TechnicalQuestion();
        t1.setQuestion("Explain core principles and architectural best practices relevant to a " + exp + " " + role + ".");
        t1.setAnswer("Focus on scalability, clean architecture, modular design, separation of concerns, robust error handling, and performance optimization.");

        TechnicalQuestion t2 = new TechnicalQuestion();
        t2.setQuestion("How do you manage state, concurrency, and async data flow in modern " + role + " applications?");
        t2.setAnswer("Use immutable state management, async/await constructs, efficient caching mechanisms, and optimistic UI updates.");

        resp.setTechnicalQuestions(List.of(t1, t2));

        HRQuestion h1 = new HRQuestion();
        h1.setQuestion("Tell me about a time you had a technical disagreement with a team member. How was it resolved?");
        h1.setAnswer("Use the STAR method: Situation, Task, Action (focused on data-driven benchmarks and open communication), and Result.");

        HRQuestion h2 = new HRQuestion();
        h2.setQuestion("Where do you see your career as a " + role + " evolving over the next 2-3 years?");
        h2.setAnswer("Focus on deepening technical domain mastery, mentoring junior developers, and taking ownership of complex architectural decisions.");

        resp.setHrQuestions(List.of(h1, h2));

        CodingQuestion c1 = new CodingQuestion();
        c1.setQuestion("Given an array of values, find two items that meet the target condition in optimal time complexity.");
        c1.setApproach("Use a HashMap / HashSet to store visited complements for O(N) time and O(N) space complexity.");
        c1.setSolution("function findPairs(arr, target) { const set = new Set(); for(const x of arr) { if(set.has(target - x)) return [target - x, x]; set.add(x); } return []; }");

        resp.setCodingQuestions(List.of(c1));

        resp.setInterviewTips(List.of(
            "Structure your behavioral answers with the STAR method (Situation, Task, Action, Result).",
            "Clarity and communication are just as important as technical precision.",
            "Ask insightful questions about engineering culture and team workflow at the end."
        ));

        resp.setCommonMistakes(List.of(
            "Jumping straight into code without clarifying edge cases.",
            "Failing to discuss trade-offs and performance complexities.",
            "Not speaking out loud while solving algorithmic problems."
        ));

        return resp;
    }
}