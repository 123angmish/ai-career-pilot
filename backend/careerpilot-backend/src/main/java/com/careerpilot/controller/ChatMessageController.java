package com.careerpilot.controller;

import com.careerpilot.dto.ApiResponse;
import com.careerpilot.entity.ChatMessage;
import com.careerpilot.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mock-chat")
@CrossOrigin(origins = "*")
public class ChatMessageController {

    @Autowired
    private ChatMessageService chatMessageService;

    @GetMapping("/{bookingId}")
    public ResponseEntity<ApiResponse<List<ChatMessage>>> getChatMessages(@PathVariable String bookingId) {
        List<ChatMessage> messages = chatMessageService.getMessagesByBooking(bookingId);
        return ResponseEntity.ok(ApiResponse.success("Retrieved chat history for booking: " + bookingId, messages));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ChatMessage>> sendChatMessage(@RequestBody ChatMessage message) {
        if (message.getBookingId() == null || message.getMessageText() == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Booking ID and message text are required"));
        }
        ChatMessage saved = chatMessageService.saveMessage(message);
        return ResponseEntity.ok(ApiResponse.success("Chat message saved in database", saved));
    }
}
