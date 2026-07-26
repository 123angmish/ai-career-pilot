package com.careerpilot.ai.dto;

public class MockInterviewRequest {

    private String question;
    private String userAnswer;
    private String jobRole;

    public MockInterviewRequest() {
    }

    public MockInterviewRequest(String question, String userAnswer, String jobRole) {
        this.question = question;
        this.userAnswer = userAnswer;
        this.jobRole = jobRole;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(String userAnswer) {
        this.userAnswer = userAnswer;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }
}