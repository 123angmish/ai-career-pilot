package com.careerpilot.ai.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class SkillExtractorService {

    private static final List<String> SKILLS = List.of(
            "Java",
            "Spring Boot",
            "Spring",
            "Hibernate",
            "JPA",
            "MySQL",
            "React",
            "JavaScript",
            "HTML",
            "CSS",
            "JWT",
            "Spring Security",
            "REST API",
            "Git",
            "GitHub",
            "Docker",
            "AWS",
            "Microservices",
            "MongoDB",
            "Python"
    );

    public List<String> extractSkills(String text) {

        List<String> foundSkills = new ArrayList<>();

        for (String skill : SKILLS) {
            if (text.toLowerCase().contains(skill.toLowerCase())) {
                foundSkills.add(skill);
            }
        }

        return foundSkills;
    }
}