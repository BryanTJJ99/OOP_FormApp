package com.oopproject.form.models.Question;

import java.util.List;

public class SingleSelectQuestion extends Question {
    private List<String> options;
    private String response;

    public SingleSelectQuestion(String questionStatement, String questionType, boolean isRequiredField,
            String documents, boolean isSingleSelectQuestion, List<String> options, String response) {
        super(questionStatement, questionType, isRequiredField, documents);
        this.options = options;
        this.response = response;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public String getSingleSelectResponse() {
        return response;
    }

    public void setSingleSelectResponse(String response) {
        this.response = response;
    }

}
