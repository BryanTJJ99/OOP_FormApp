package com.oopproject.form.models.Form;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.oopproject.form.models.Section.Section;
import com.oopproject.form.models.User.User;

@Document(collection = "Form")
public class Form extends FormTemplate {
    @DocumentReference
    private User vendor;
    @DocumentReference
    private User reviewedBy;
    @DocumentReference
    private User approvedBy;

    public Form(String formId, String formName, List<Section> sections, User vendor) {
        super(formId, formName, sections);
        this.vendor = vendor;
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
