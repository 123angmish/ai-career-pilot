package com.careerpilot.repository;

import com.careerpilot.entity.MockBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MockBookingRepository extends JpaRepository<MockBooking, Long> {
    List<MockBooking> findByCandidateEmailOrderByCreatedAtDesc(String candidateEmail);
}
