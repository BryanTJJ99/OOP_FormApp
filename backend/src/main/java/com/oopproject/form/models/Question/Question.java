package com.oopproject.form.models.Question;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Question")
public abstract class Question {
    private String questionStatement;
    private String category;
    private boolean isRequiredField;
    // formId;
    private String documents;

    public Question(String questionStatement, String category, boolean isRequiredField,
            String documents) {
        this.questionStatement = questionStatement;
        this.isRequiredField = isRequiredField;
        this.documents = documents;
    }

    public String getQuestionStatement() {
        return questionStatement;
    }

    public void setQuestionStatement(String questionStatement) {
        this.questionStatement = questionStatement;
    }

    public boolean isRequiredField() {
        return isRequiredField;
    }

    public void setRequiredField(boolean isRequiredField) {
        this.isRequiredField = isRequiredField;
    }

    public String getDocuments() {
        return documents;
    }

    public void setDocuments(String documents) {
        this.documents = documents;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Question [questionStatement=" + questionStatement + ", category=" + category
                + ", isRequiredField=" + isRequiredField + ", documents=" + documents + "]";
    }

}
