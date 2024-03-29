package com.oopproject.form.models.FormTemplate;

import java.util.List;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import com.oopproject.form.models.Section.Section;
import com.oopproject.form.models.User.User;
import com.oopproject.form.models.SectionListDeserializer;
import com.oopproject.form.models.QuestionDeserializer;
import com.oopproject.form.models.Question.Question;

@Getter @Setter
@Document(collection = "FormTemplate")
public class FormTemplate {
    @Id
    private String formTemplateId;
    private String formName;
    private String formDescription; 
    private String createdBy;
    private Date createdAt; 
    private Date updatedAt; 
    private Date deletedAt; 
    // @JsonManagedReference
    @DocumentReference
    @JsonDeserialize(using = SectionListDeserializer.class)
    private List<Section> sections;
    @DocumentReference
    @JsonDeserialize(using = QuestionDeserializer.class)
    private List<Question> questions;


    // public FormTemplate(String formTemplateId, String formName, String formDescripti5on, String createdBy, Date createdAt, Date updatedAt, Date deletedAt, List<Section> sections) {
    //     this.formTemplateId = formTemplateId;
    //     this.formName = formName;
    //     this.formDescription = formDescription;
    //     this.createdBy = createdBy;
    //     this.createdAt = createdAt; 
    //     this.updatedAt = updatedAt; 
    //     this.deletedAt = deletedAt; 
    //     this.sections = sections;
    // }

    // public String getFormTemplateId() {
    //     return formTemplateId;
    // }

    // public void setFormTemplateId(String formTemplateId) {
    //     this.formTemplateId = formTemplateId;
    // }

    // public String getFormName() {
    //     return formName;
    // }

    // public void setFormName(String formName) {
    //     this.formName = formName;
    // }

    // public List<Section> getSections() {
    //     return sections;
    // }

    // public void setSections(List<Section> sections) {
    //     this.sections = sections;
    // }

}