package com.oopproject.form.models.Question;

import java.util.Date;
import java.util.List;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.Getter;
import lombok.Setter;

import com.oopproject.form.models.Choice.Choice; 

@Getter @Setter
public class MultiSelectQuestion extends Question {
    @DocumentReference
    private List<Choice> choices;

    public MultiSelectQuestion(String questionId, int questionOrder, String questionTitle, String questionType, boolean isRequired, String conditionalParentId, String conditionalParentCondition,
            Date createdAt, Date updatedAt, Date deletedAt, List<Choice> choices) {
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
