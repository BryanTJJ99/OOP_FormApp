package com.oopproject.form.models.FormResponse;

import java.util.List;
import java.util.Date;
import org.json.simple.JSONObject;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Document;

import com.oopproject.form.models.Section.Section;
import com.oopproject.form.models.User.User;

@Getter @Setter
@Document(collection = "FormResponse")
public class FormResponse {
    @Id 
    private String formResponseId; 
    @DocumentReference
    private String formTemplateId; 
    @DocumentReference
    private String vendorProjectId; 
    @DocumentReference
    private String vendorId; 
    @DocumentReference 
    private String projectId;
    @DocumentReference
    private User reviewedBy; 
    @DocumentReference
    private User approvedBy; 
    private String status; 
    private JSONObject formAnswer; 

    public FormResponse(String formResponseId, String formTemplateId, String vendorProjectId, String vendorId, String projectId, User reviewedBy, User approvedBy, String status, JSONObject formAnswer) {
        this.formResponseId = formResponseId; 
        this.formTemplateId = formTemplateId; 
        this.vendorProjectId = vendorProjectId; 
        this.vendorId = vendorId; 
        this.projectId = projectId;
        this.reviewedBy = reviewedBy; 
        this.approvedBy = approvedBy; 
        this.status = status; 
        this.formAnswer = formAnswer;
    }

    public void makePDF(FormResponse formRespons) {
        //
    }
}
