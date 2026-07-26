package com.careerpilot.service;

import com.careerpilot.entity.MockBooking;
import com.careerpilot.repository.MockBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MockBookingService {

    @Autowired
    private MockBookingRepository bookingRepository;

    public MockBooking createBooking(MockBooking booking) {
        if (booking.getBookingId() == null || booking.getBookingId().isEmpty()) {
            booking.setBookingId("CP-MOCK-" + (int)(100000 + Math.random() * 900000));
        }
        if (booking.getMeetingLink() == null || booking.getMeetingLink().isEmpty()) {
            booking.setMeetingLink("https://meet.google.com/new");
        }
        if (booking.getStatus() == null) {
            booking.setStatus("CONFIRMED");
        }
        return bookingRepository.save(booking);
    }

    public List<MockBooking> getBookingsByCandidate(String candidateEmail) {
        return bookingRepository.findByCandidateEmailOrderByCreatedAtDesc(candidateEmail);
    }

    public List<MockBooking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
