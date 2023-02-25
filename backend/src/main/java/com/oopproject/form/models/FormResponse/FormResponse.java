package com.oopproject.form.models.FormResponse;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

public class FormResponse {
    @Id
    private String formResponseId;
    @DocumentReference
    private String vendorId;
    @DocumentReference
    private String formId;
    @DocumentReference
    private String reviewedBy;
    @DocumentReference
    private String approvedBy;
}
