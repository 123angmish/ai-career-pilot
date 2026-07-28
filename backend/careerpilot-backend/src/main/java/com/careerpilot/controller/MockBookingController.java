package com.careerpilot.controller;

import com.careerpilot.dto.ApiResponse;
import com.careerpilot.entity.MockBooking;
import com.careerpilot.service.MockBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mock-bookings")
public class MockBookingController {

    @Autowired
    private MockBookingService bookingService;

    @PostMapping
    public ResponseEntity<ApiResponse<MockBooking>> createBooking(
            @RequestBody MockBooking booking,
            Authentication auth) {
        String email = (auth != null && auth.getName() != null && !auth.getName().equals("anonymousUser"))
                ? auth.getName() : "demo@careerpilot.dev";
        booking.setCandidateEmail(email);

        MockBooking saved = bookingService.createBooking(booking);
        return ResponseEntity.ok(ApiResponse.success("Mock interview session booked and persisted in database", saved));
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<ApiResponse<List<MockBooking>>> getMyBookings(Authentication auth) {
        String email = (auth != null && auth.getName() != null && !auth.getName().equals("anonymousUser"))
                ? auth.getName() : "demo@careerpilot.dev";

        List<MockBooking> list = bookingService.getBookingsByCandidate(email);
        return ResponseEntity.ok(ApiResponse.success("Retrieved candidate mock bookings from database", list));
    }
}
