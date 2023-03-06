package com.oopproject.form.models.Question;

import java.util.List;

public class SingleSelectQuestion extends Question {
    @DocumentReference
    private List<Choice> choices;

    public SingleSelectQuestion(String questionId, int questionOrder, String questionTitle, String questionType, boolean isRequired, String conditionalParentId, String conditionalParentCondition,
            Date createdAt, Date updatedAt, Date deletedAt, Choice choices) {
        super(questionId, questionOrder, questionTitle, questionType, isRequired, conditionalParentId, conditionalParentCondition, createdAt, updatedAt, deletedAt);
        this.choices = choices; 
    }

    public List<Choice> getChoices() {
        return choices;
    }

    public void setChoices(List<Choice> choices) {
        this.choices = choices;
    }
}
