package com.oopproject.form.models.Project;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.oopproject.form.models.FormResponse.FormResponse;
import com.oopproject.form.models.FormTemplate.FormTemplate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "Project")
public class Project {
    @Id
    private String projectID;
    private String projectName;
    private String projectDescription;
    @DocumentReference
    private String vendorId;
    @DocumentReference
    private ArrayList<FormResponse> formResponses;

    // Do we need to instantiate forms cause a project may not have forms associated
    // with it
    public Project(String projectName, String projectDescription, String vendorId,
            ArrayList<FormResponse> formResponses) {
        // this.projectID = projectID;
        this.projectName = projectName;
        this.projectDescription = projectDescription;
        this.vendorId = vendorId;
        this.formResponses = new ArrayList<FormResponse>();
    }

    public String getProjectID() {
        return projectID;
    }

    public void setProjectID(String projectID) {
        this.projectID = projectID;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public ArrayList<FormResponse> getFormResponses() {
        return formResponses;
    }

}