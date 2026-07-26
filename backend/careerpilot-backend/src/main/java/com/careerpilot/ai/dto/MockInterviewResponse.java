package com.careerpilot.ai.dto;

public class MockInterviewResponse {

    private int score;
    private String strengths;
    private String weaknesses;
    private String improvedAnswer;
    private String confidenceLevel;

    public MockInterviewResponse() {
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getStrengths() {
        return strengths;
    }

    public void setStrengths(String strengths) {
        this.strengths = strengths;
    }

    public String getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(String weaknesses) {
        this.weaknesses = weaknesses;
    }

    public String getImprovedAnswer() {
        return improvedAnswer;
    }

    public void setImprovedAnswer(String improvedAnswer) {
        this.improvedAnswer = improvedAnswer;
    }

    public String getConfidenceLevel() {
        return confidenceLevel;
    }

    public void setConfidenceLevel(String confidenceLevel) {
        this.confidenceLevel = confidenceLevel;
    }
}