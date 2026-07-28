package com.careerpilot.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
public class RootController {

    @GetMapping(produces = "application/json")
    public ResponseEntity<Map<String, Object>> getRootStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "ONLINE");
        response.put("service", "CareerPilot Enterprise AI Backend Engine");
        response.put("version", "v2.5.0");
        response.put("database", "MySQL & H2 Active");
        response.put("liveFrontendUrl", "https://career-copilot-rosy.vercel.app");
        response.put("githubRepository", "https://github.com/123angmish/ai-career-pilot");
        return ResponseEntity.ok(response);
    }
}
