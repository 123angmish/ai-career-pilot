package com.careerpilot.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mock_bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MockBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String bookingId;

    private Long engineerId;

    private String engineerName;

    private String engineerEmail;

    private String candidateEmail;

    private String timeSlot;

    private String interviewType;

    private Double feePaid;

    private String meetingLink;

    private String status;

    private LocalDateTime createdAt;

    @PrePersist
    public void onPersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.status == null) {
            this.status = "CONFIRMED";
        }
    }
}
