package com.oopproject.form.models.Question;

import java.util.List;

public class MultiSelectQuestion extends Question {
    private List<String> options;
    private List<String> response;

    public MultiSelectQuestion(String questionStatement, String questionType, boolean isRequiredField,
            String documents, boolean isMultiSelectQuestion, List<String> options, List<String> response) {
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

    public List<String> getResponse() {
        return response;
    }

    public void setResponse(List<String> response) {
        this.response = response;
    }

}
