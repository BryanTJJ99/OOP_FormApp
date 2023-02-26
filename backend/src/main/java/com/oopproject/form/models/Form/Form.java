package com.oopproject.form.models.Form;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.oopproject.form.models.Section.Section;

@Document(collection = "Form")
public class Form {
    @Id
    private String formId;
    private String formName;
    @DocumentReference
    private List<Section> sections;

    public Form(String formId, String formName, List<Section> sections) {
        this.formId = formId;
        this.formName = formName;
        this.sections = sections;
    }

    public String getFormId() {
        return formId;
    }

    public void setFormId(String formId) {
        this.formId = formId;
    }

    public String getFormName() {
        return formName;
    }

    public void setFormName(String formName) {
        this.formName = formName;
    }

    public List<Section> getSections() {
        return sections;
    }

    public void setSections(List<Section> sections) {
        this.sections = sections;
    }

}