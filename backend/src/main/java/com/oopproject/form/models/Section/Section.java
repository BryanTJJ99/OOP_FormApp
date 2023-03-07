package com.oopproject.form.models.Section;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.oopproject.form.models.Question.Question;

@Document(collection = "Section")
public class Section {
    @Id
    private String sectionId;
    private String sectionName;
    private String sectionDescription; 
    private String assignedTo;
    private Date createdAt; 
    private Date updatedAt; 
    private Date deletedAt; 
    // assignedTo refers to 'admin', 'vendor', or 'approver'
    @DocumentReference
    private List<Question> questions;

    public Section(String sectionId, String sectionName, String sectionDescription, String assignedTo, Date createdAt, Date updatedAt, Date deletedAt, List<Question> questions) {
        this.sectionId = sectionId;
        this.sectionName = sectionName;
        this.sectionDescription = sectionDescription; 
        this.assignedTo = assignedTo;
        this.questions = questions;
    }

    public String getSectionId() {
        return sectionId;
    }

    public void setSectionId(String sectionId) {
        this.sectionId = sectionId;
    }

    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setUserAccess(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

}