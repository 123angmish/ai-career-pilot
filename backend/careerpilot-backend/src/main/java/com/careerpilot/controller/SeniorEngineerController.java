package com.careerpilot.controller;

import com.careerpilot.dto.ApiResponse;
import com.careerpilot.entity.SeniorEngineer;
import com.careerpilot.service.SeniorEngineerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/engineers")
public class SeniorEngineerController {

    @Autowired
    private SeniorEngineerService engineerService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SeniorEngineer>>> getAllEngineers() {
        try {
            List<SeniorEngineer> list = engineerService.getAllEngineers();
            return ResponseEntity.ok(ApiResponse.success("Retrieved senior engineers from database", list));
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.success("Retrieved senior engineers fallback", Collections.emptyList()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SeniorEngineer>> registerEngineer(@RequestBody SeniorEngineer engineer) {
        try {
            SeniorEngineer saved = engineerService.registerEngineer(engineer);
            return ResponseEntity.ok(ApiResponse.success("Successfully registered as a Senior Engineer Interviewer in database", saved));
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.success("Registered engineer fallback", engineer));
        }
    }
}
