package com.careerpilot.ai.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ATSScoreService {

    public  static final List<String> REQUIRED_SKILLS = List.of(
            "Java",
            "Spring Boot",
            "Hibernate",
            "JPA",
            "MySQL",
            "REST API",
            "Git",
            "GitHub",
            "JWT",
            "Spring Security",
            "Docker",
            "AWS",
            "Microservices",
            "React"
    );

    public int calculateScore(List<String> detectedSkills) {

        int matched = 0;

        for (String skill : REQUIRED_SKILLS) {
            if (detectedSkills.contains(skill)) {
                matched++;
            }
        }

        return (matched * 100) / REQUIRED_SKILLS.size();
    }
}