package com.oopproject.form.models.Question;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter @Setter
@Document(collection = "Question")
// @Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class Question {
    @Id
    private String questionId; 
    private int questionOrder; 
    private int belongsToSection; 
    private String questionTitle;
    private String questionType; 
    @JsonProperty("isRequired")
    private boolean isRequired;
    private String conditionalParentId; 
    private String conditionalParentCondition; 
    private Date createdAt; 
    private Date updatedAt; 
    private Date deletedAt; 
    // formId;
       
    // public Question(String questionId, int questionOrder, String questionTitle, String questionType, boolean isRequired, String conditionalParentId, String conditionalParentCondition,
    //         Date createdAt, Date updatedAt, Date deletedAt) {
    //     this.questionId = questionId; 
    //     this.questionOrder = questionOrder; 
    //     this.questionTitle = questionTitle; 
    //     this.questionType = questionType; 
    //     this.isRequired = isRequired; 
    //     this.conditionalParentId = conditionalParentId;
    //     this.conditionalParentCondition = conditionalParentCondition; 
    //     this.createdAt = createdAt; 
    //     this.updatedAt = updatedAt; 
    //     this.deletedAt = deletedAt; 
    // }

    // @Override
    // public String toString() {
    //     return "Question [questionStatement=" + questionStatement + ", category=" + category
    //             + ", isRequiredField=" + isRequiredField + ", documents=" + documents + "]";
    // }

}
