package com.oopproject.form.models.Form;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.oopproject.form.models.Section.Section;

@Document(collection = "FormTemplate")
public class FormTemplate {
    @Id
    private String formTemplateId;
    private String formName;
    @DocumentReference
    private List<Section> sections;

    public FormTemplate(String formTemplateId, String formName, List<Section> sections) {
        this.formTemplateId = formTemplateId;
        this.formName = formName;
        this.sections = sections;
    }

    public String getFormTemplateId() {
        return formTemplateId;
    }

    public void setFormTemplateId(String formTemplateId) {
        this.formTemplateId = formTemplateId;
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