package com.careerpilot.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import com.careerpilot.dto.ChangePasswordRequest;
import com.careerpilot.dto.ChangePasswordRequest;
import com.careerpilot.dto.LoginRequest;
import com.careerpilot.dto.LoginResponse;
import com.careerpilot.dto.ProfileResponse;
import com.careerpilot.dto.UpdateProfileRequest;
import com.careerpilot.dto.UserRegistrationRequest;
import com.careerpilot.dto.UserResponse;
import com.careerpilot.service.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public LoginResponse registerUser(
            @Valid @RequestBody UserRegistrationRequest request) {

        return userService.registerUser(request);
    }
    
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {

        return userService.login(request);

    }
    
    @GetMapping("/profile")
    @SecurityRequirement(name = "Bearer Authentication")
    public ProfileResponse profile(Authentication authentication) {

        return userService.getCurrentUser(authentication.getName());

    }
    @PutMapping("/profile")
    public ResponseEntity<ProfileResponse> updateProfile(
            @RequestBody UpdateProfileRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                userService.updateProfile(request, email));
    }
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                userService.changePassword(request, email));
    }
    @DeleteMapping("/account")
    public ResponseEntity<String> deleteAccount(Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                userService.deleteAccount(email));
    }
}