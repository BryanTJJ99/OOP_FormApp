package com.oopproject.form.service;

import java.util.*;
import java.util.List;
import java.util.Optional;

import com.oopproject.form.models.FormResponse.FormResponse;

public interface FormResponseService {
    public List<FormResponse> getAllFormResponses();

    public Optional<FormResponse> getFormResponseById(String id);

    public List<FormResponse> getByVendorIdAndProjectId(String vendorId, String projectId);

    public Optional<FormResponse> getFormResponsebyFormTemplateAndVendorProject(String formTemplateId,
            String vendorProjectId);

    public void addFormResponse(FormResponse form);

    // public void updateFormAnswerValue(String id, String key, Object value);

    public FormResponse updateFormResponse(FormResponse formResponseToUpdate);

    public List<FormResponse> getFormsWithinDateRange(Date start, Date end);

    public FormResponse deleteFormResponse(FormResponse formResponseToDelete);

}
