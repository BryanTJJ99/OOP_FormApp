package com.oopproject.form.models.Question;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Question")
public class Question {
    private String questionStatement;
    private String questionType;
    private boolean isRequiredField;
    // formId;
    private String response;
    private String documents;

    public Question() {
    }

    public String getQuestionStatement() {
        return questionStatement;
    }

    public void setQuestionStatement(String questionStatement) {
        this.questionStatement = questionStatement;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public boolean isRequiredField() {
        return isRequiredField;
    }

    public void setRequiredField(boolean isRequiredField) {
        this.isRequiredField = isRequiredField;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getDocuments() {
        return documents;
    }

    public void setDocuments(String documents) {
        this.documents = documents;
    }

    @Override
    public String toString() {
        return "Question [questionStatement=" + questionStatement + ", questionType=" + questionType
                + ", isRequiredField=" + isRequiredField + ", response=" + response + ", documents=" + documents + "]";
    }

}
