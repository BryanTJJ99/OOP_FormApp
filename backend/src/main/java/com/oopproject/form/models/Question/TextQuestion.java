package com.oopproject.form.models.Question;

public class TextQuestion extends Question {

    public TextQuestion(String questionId, int questionOrder, String questionTitle, String questionType, boolean isRequired, String conditionalParentId, String conditionalParentCondition,
            Date createdAt, Date updatedAt, Date deletedAt) {
        super(questionId, questionOrder, questionTitle, questionType, isRequired, conditionalParentId, conditionalParentCondition, createdAt, updatedAt, deletedAt);
    }

}
