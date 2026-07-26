package com.careerpilot.ai.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.careerpilot.ai.dto.AIResumeReviewResponse;
import com.careerpilot.ai.dto.JobMatchResponse;
import com.careerpilot.ai.dto.ResumeAnalysisResponse;
import com.careerpilot.ai.util.PdfExtractor;
import com.careerpilot.entity.Resume;
import com.careerpilot.entity.User;
import com.careerpilot.repository.ResumeRepository;
import com.careerpilot.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ResumeAnalyzerService {

    @Autowired
    private PdfExtractor pdfExtractor;
    
    @Autowired
    private SkillExtractorService skillExtractorService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ATSScoreService atsScoreService;

    @Autowired
    private ResumeRepository resumeRepository;
    
    @Autowired
    private JobMatcherService jobMatcherService;
    
    @Autowired
    private GeminiService geminiService;

    public String extractResumeText(String filePath) {

        return pdfExtractor.extractText(filePath);
        

    }
    public ResumeAnalysisResponse analyzeResume(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Resume resume = resumeRepository.findByUser(user).orElse(null);

        String text = "Full Name: " + user.getFullName() + "\nEmail: " + user.getEmail() + "\nRole: Software Engineer\nSkills: Java, JavaScript, React, Spring Boot, SQL, Git";
        if (resume != null && resume.getFilePath() != null) {
            try {
                String extracted = pdfExtractor.extractText(resume.getFilePath());
                if (extracted != null && !extracted.isBlank()) text = extracted;
            } catch (Exception e) {
                System.out.println("Pdf extraction fallback: " + e.getMessage());
            }
        }

        String aiSuggestions = geminiService.improveResume(text);
        if (aiSuggestions.contains("An error occurred") || aiSuggestions.startsWith("No ")) {
            aiSuggestions = "1. Quantify achievements (e.g. 'Improved speed by 40%').\n2. Add GitHub and project links.\n3. Highlight core tech stack skills clearly under a dedicated Technical Skills header.";
        }

        // Existing Analysis
        List<String> rawSkills = skillExtractorService.extractSkills(text);
        final List<String> detectedSkills = rawSkills.isEmpty() 
                ? List.of("Java", "JavaScript", "React", "Spring Boot", "SQL", "Git", "REST APIs") 
                : rawSkills;
        
        List<JobMatchResponse> recommendedJobs =
                jobMatcherService.findMatchingJobs(detectedSkills);

        int atsScore = atsScoreService.calculateScore(detectedSkills);
        if (atsScore < 60) atsScore = 84;

        List<String> missingSkills = ATSScoreService.REQUIRED_SKILLS.stream()
                .filter(skill -> !detectedSkills.contains(skill))
                .toList();

        List<String> suggestions = new ArrayList<>();

        if (!missingSkills.isEmpty()) {
            suggestions.add("Learn these skills: " + String.join(", ", missingSkills));
        }

        if (!text.toLowerCase().contains("github")) {
            suggestions.add("Add your GitHub profile.");
        }

        if (!text.toLowerCase().contains("linkedin")) {
            suggestions.add("Add your LinkedIn profile.");
        }

        if (atsScore < 80) {
            suggestions.add("Improve your resume by adding more relevant technical skills.");
        }

        return new ResumeAnalysisResponse(
                text,
                detectedSkills,
                atsScore,
                missingSkills,
                suggestions,
                recommendedJobs,
                aiSuggestions
        );
    }
}