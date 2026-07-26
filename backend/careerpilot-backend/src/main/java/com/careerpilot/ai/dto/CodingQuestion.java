package com.careerpilot.ai.dto;

public class CodingQuestion {

    private String question;
    private String approach;
    private String solution;

    public CodingQuestion() {
    }

    public CodingQuestion(String question, String approach, String solution) {
        this.question = question;
        this.approach = approach;
        this.solution = solution;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getApproach() {
        return approach;
    }

    public void setApproach(String approach) {
        this.approach = approach;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }
}