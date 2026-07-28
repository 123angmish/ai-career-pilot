package com.careerpilot.service;

import com.careerpilot.entity.SeniorEngineer;
import com.careerpilot.repository.SeniorEngineerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class SeniorEngineerService {

    @Autowired
    private SeniorEngineerRepository engineerRepository;

    public List<SeniorEngineer> getAllEngineers() {
        try {
            List<SeniorEngineer> list = engineerRepository.findAll();
            if (list.isEmpty()) {
                initDefaultEngineers();
                list = engineerRepository.findAll();
            }
            return list;
        } catch (Exception e) {
            return getDefaultEngineersList();
        }
    }

    public SeniorEngineer registerEngineer(SeniorEngineer engineer) {
        if (engineer.getRating() == null) engineer.setRating(5.0);
        if (engineer.getReviewsCount() == null) engineer.setReviewsCount(1);
        if (engineer.getAvatarBg() == null) engineer.setAvatarBg("from-violet-600 to-indigo-600");
        if (engineer.getAvailableSlots() == null || engineer.getAvailableSlots().trim().isEmpty()) {
            engineer.setAvailableSlots("Tomorrow 5:00 PM, Sunday 10:00 AM, Sunday 3:00 PM");
        }
        try {
            return engineerRepository.save(engineer);
        } catch (Exception e) {
            return engineer;
        }
    }

    private List<SeniorEngineer> getDefaultEngineersList() {
        SeniorEngineer e1 = SeniorEngineer.builder()
                .id(1L)
                .name("Siddharth Sharma")
                .role("Staff Software Engineer")
                .company("Google")
                .experienceYears(9)
                .expertise("System Design, Java Spring Boot, Microservices, Distributed Systems")
                .rating(4.9)
                .reviewsCount(128)
                .feeINR(1499.0)
                .feeUSD(35.0)
                .avatarBg("from-blue-600 to-indigo-600")
                .availableSlots("Today 6:00 PM, Tomorrow 10:00 AM, Tomorrow 4:00 PM, Sunday 11:00 AM")
                .email("siddharth@google.dev")
                .build();

        SeniorEngineer e2 = SeniorEngineer.builder()
                .id(2L)
                .name("Ananya Roy")
                .role("Lead Frontend Architect")
                .company("Microsoft")
                .experienceYears(8)
                .expertise("React & TypeScript, Web Vitals & Performance, UI Architecture, Next.js")
                .rating(4.95)
                .reviewsCount(94)
                .feeINR(1299.0)
                .feeUSD(29.0)
                .avatarBg("from-purple-600 to-pink-600")
                .availableSlots("Today 8:00 PM, Tomorrow 2:00 PM, Saturday 5:00 PM")
                .email("ananya@microsoft.dev")
                .build();

        SeniorEngineer e3 = SeniorEngineer.builder()
                .id(3L)
                .name("Rohan Mehta")
                .role("Principal Data Scientist")
                .company("Amazon")
                .experienceYears(10)
                .expertise("Data Analytics, SQL & Snowflake, Machine Learning, A/B Testing")
                .rating(4.88)
                .reviewsCount(156)
                .feeINR(1699.0)
                .feeUSD(39.0)
                .avatarBg("from-emerald-600 to-teal-600")
                .availableSlots("Tomorrow 11:00 AM, Tomorrow 7:00 PM, Sunday 3:00 PM")
                .email("rohan@amazon.dev")
                .build();

        SeniorEngineer e4 = SeniorEngineer.builder()
                .id(4L)
                .name("Priya Verma")
                .role("Engineering Manager")
                .company("Meta")
                .experienceYears(11)
                .expertise("Executive HR Interview, System Scaling, Leadership & Behavioral, Resume Review")
                .rating(5.0)
                .reviewsCount(210)
                .feeINR(1999.0)
                .feeUSD(49.0)
                .avatarBg("from-amber-500 to-orange-600")
                .availableSlots("Today 9:00 PM, Saturday 10:00 AM, Sunday 6:00 PM")
                .email("priya@meta.dev")
                .build();

        return List.of(e1, e2, e3, e4);
    }

    private void initDefaultEngineers() {
        try {
            engineerRepository.saveAll(getDefaultEngineersList());
        } catch (Exception ignored) {}
    }
}
