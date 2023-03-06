package com.oopproject.form.models.FormResponse;

import java.util.List;
import org.json.simple.JSONObject;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.oopproject.form.models.Section.Section;
import com.oopproject.form.models.User.User;

@Document(collection = "FormResponse")
public class FormResponse {
    @Id 
    private String formResponseId; 
    @DocumentReference
    private String formTemplateId; 
    @DocumentReference
    private String vendorProjectId; 
    @DocumentReference
    private User reviewedBy; 
    @DocumentReference
    private User approvedBy; 
    private String status; 
    private JSONObject formAnswer; 

    public FormResponse(String formResponseId, String formTemplateId, String vendorProjectId, User reviewedBy, User approvedBy, String status, JSONObject formAnswer) {
        this.formResponseId = formResponseId; 
        this.formTemplateId = formTemplateId; 
        this.vendorProjectId = vendorProjectId; 
        this.reviewedBy = reviewedBy; 
        this.approvedBy = approvedBy; 
        this.status = status; 
        this.formAnswer = formAnswer;
    }

    public User getVendor() {
        return vendor;
    }

    public void setVendor(User vendor) {
        this.vendor = vendor;
    }

    public User getReviewedBy() {
        return reviewedBy;
    }

    public void setReviewedBy(User reviewedBy) {
        this.reviewedBy = reviewedBy;
    }

    public User getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(User approvedBy) {
        this.approvedBy = approvedBy;
    }

    public void makePDF(Form form) {
        //
    }
}
