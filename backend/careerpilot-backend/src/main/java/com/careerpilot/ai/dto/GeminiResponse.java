package com.careerpilot.ai.dto;

public class GeminiResponse {

    private String response;

    public GeminiResponse() {
    }

    public GeminiResponse(String response) {
        this.response = response;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}