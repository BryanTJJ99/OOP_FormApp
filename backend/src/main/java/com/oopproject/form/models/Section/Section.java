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
    private List<String> userAccess;
    // userAccess would be which roles can access this section. ie. list of roles
    @DocumentReference
    private List<Question> questions;

    public Section(String sectionId, String sectionName, List<String> userAccess, List<Question> questions) {
        this.sectionId = sectionId;
        this.sectionName = sectionName;
        this.userAccess = userAccess;
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

    public List<String> getUserAccess() {
        return userAccess;
    }

    public void setUserAccess(List<String> userAccess) {
        this.userAccess = userAccess;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

}