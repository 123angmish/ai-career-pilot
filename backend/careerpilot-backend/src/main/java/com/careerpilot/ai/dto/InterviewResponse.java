package com.careerpilot.ai.dto;

import java.util.List;

public class InterviewResponse {

    private List<TechnicalQuestion> technicalQuestions;

    private List<HRQuestion> hrQuestions;

    private List<CodingQuestion> codingQuestions;

    private List<String> interviewTips;

    private List<String> commonMistakes;

    public InterviewResponse() {
    }

    public List<TechnicalQuestion> getTechnicalQuestions() {
        return technicalQuestions;
    }

    public void setTechnicalQuestions(List<TechnicalQuestion> technicalQuestions) {
        this.technicalQuestions = technicalQuestions;
    }

    public List<HRQuestion> getHrQuestions() {
        return hrQuestions;
    }

    public void setHrQuestions(List<HRQuestion> hrQuestions) {
        this.hrQuestions = hrQuestions;
    }

    public List<CodingQuestion> getCodingQuestions() {
        return codingQuestions;
    }

    public void setCodingQuestions(List<CodingQuestion> codingQuestions) {
        this.codingQuestions = codingQuestions;
    }

    public List<String> getInterviewTips() {
        return interviewTips;
    }

    public void setInterviewTips(List<String> interviewTips) {
        this.interviewTips = interviewTips;
    }

    public List<String> getCommonMistakes() {
        return commonMistakes;
    }

    public void setCommonMistakes(List<String> commonMistakes) {
        this.commonMistakes = commonMistakes;
    }
}