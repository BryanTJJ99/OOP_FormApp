package com.oopproject.form.models.Question;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.TypeAlias;

@Getter @Setter
// @TypeAlias("textQuestion")
public class TextQuestion extends Question {
    // public TextQuestion(String questionId, int questionOrder, String questionTitle, String questionType, boolean isRequired, String conditionalParentId, String conditionalParentCondition,
    //         Date createdAt, Date updatedAt, Date deletedAt) {
    //     super(questionId, questionOrder, questionTitle, questionType, isRequired, conditionalParentId, conditionalParentCondition, createdAt, updatedAt, deletedAt);
    // }
}
