package com.careerpilot.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "senior_engineers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeniorEngineer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String company;

    private Integer experienceYears;

    @Column(columnDefinition = "TEXT")
    private String expertise;

    private Double rating;

    private Integer reviewsCount;

    @Column(name = "feeinr")
    private Double feeINR;

    @Column(name = "feeusd")
    private Double feeUSD;

    private String avatarBg;

    @Column(columnDefinition = "TEXT")
    private String availableSlots;

    private String email;
}
