package com.careerpilot.ai.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.careerpilot.ai.dto.CoverLetterRequest;
import com.careerpilot.entity.Resume;
import com.careerpilot.entity.User;
import com.careerpilot.repository.ResumeRepository;
import com.careerpilot.repository.UserRepository;
import com.careerpilot.ai.util.PdfExtractor;

@Service
public class CoverLetterService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PdfExtractor pdfExtractor;

    @Autowired
    private GeminiService geminiService;

    public String generateCoverLetter(String email, CoverLetterRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String resumeText = "Candidate Name: " + user.getFullName();
        try {
            Resume resume = resumeRepository.findByUser(user).orElse(null);
            if (resume != null && resume.getFilePath() != null) {
                String extracted = pdfExtractor.extractText(resume.getFilePath());
                if (extracted != null && !extracted.isBlank()) {
                    resumeText = extracted;
                }
            }
        } catch (Exception e) {
            System.out.println("Could not extract resume PDF: " + e.getMessage());
        }

        String coverLetter = geminiService.generateCoverLetter(
                resumeText,
                request.getJobRole(),
                request.getCompanyName()
        );

        if (coverLetter.contains("An error occurred") || coverLetter.startsWith("No ")) {
            return String.format(
                "Dear Hiring Manager at %s,\n\nI am writing to express my strong interest in the %s position. With a background as a dedicated professional committed to delivering high-quality software solutions and driving team impact, I am confident in my ability to contribute effectively from day one.\n\nIn my previous projects, I have demonstrated strong analytical problem-solving, clean code craftsmanship, and effective cross-functional collaboration. I am particularly drawn to %s because of your innovation and industry leadership.\n\nI look forward to the opportunity to discuss how my skills and experience align with your technical goals.\n\nSincerely,\n%s",
                request.getCompanyName(), request.getJobRole(), request.getCompanyName(), user.getFullName()
            );
        }

        return coverLetter;
    }
}