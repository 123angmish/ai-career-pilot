package com.careerpilot.ai.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.careerpilot.ai.dto.JobMatchResponse;
import com.careerpilot.entity.Job;
import com.careerpilot.repository.JobRepository;

@Service
public class JobMatcherService {

    @Autowired
    private JobRepository jobRepository;

    public List<JobMatchResponse> findMatchingJobs(List<String> resumeSkills) {

        List<JobMatchResponse> matchedJobs = new ArrayList<>();

        List<Job> jobs = jobRepository.findAll();

        for (Job job : jobs) {

            if (job.getSkillsRequired() == null || job.getSkillsRequired().isBlank()) {
                continue;
            }

            List<String> requiredSkills = Arrays.stream(job.getSkillsRequired().split(","))
                    .map(String::trim)
                    .toList();

            int matchedSkills = 0;

            for (String requiredSkill : requiredSkills) {

                for (String resumeSkill : resumeSkills) {

                    if (requiredSkill.equalsIgnoreCase(resumeSkill)) {
                        matchedSkills++;
                        break;
                    }
                }
            }

            int matchPercentage =
                    (matchedSkills * 100) / requiredSkills.size();

            matchedJobs.add(
                    new JobMatchResponse(
                            job.getId(),
                            job.getTitle(),
                            job.getCompany(),
                            job.getLocation(),
                            matchPercentage
                    )
            );
        }

        matchedJobs.sort(
                Comparator.comparing(JobMatchResponse::getMatchPercentage)
                        .reversed()
        );

        return matchedJobs.stream()
                .limit(5)
                .toList();
    }
}