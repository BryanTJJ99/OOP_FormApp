package com.oopproject.form.models.Question;

public class TextQuestion extends Question {

    private String response;

    public TextQuestion(String questionStatement, String category, boolean isRequiredField,
            String documents, String response) {
        super(questionStatement, category, isRequiredField, documents);
        this.response = response;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
