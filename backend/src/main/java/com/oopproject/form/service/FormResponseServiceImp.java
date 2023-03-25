package com.oopproject.form.service;

import java.util.*;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oopproject.form.models.FormResponse.FormResponse;
import com.oopproject.form.repositories.FormResponseRepository;

@Service
public class FormResponseServiceImp implements FormResponseService {
    @Autowired
    private FormResponseRepository formResponseRepository;

    @Override
    public List<FormResponse> getAllFormResponses() {
        return formResponseRepository.findAll();
    }

    @Override
    public Optional<FormResponse> getFormResponseById(String id) {
        return formResponseRepository.findById(id);
    }

    @Override
    public Optional<FormResponse> getFormResponsebyFormTemplateAndVendorProject(String formTemplateId, String vendorProjectId) {
        return formResponseRepository.findByFormTemplateIdAndVendorProjectId(formTemplateId, vendorProjectId);
    }

    @Override
    public void addFormResponse(FormResponse formResponse) {
        formResponseRepository.save(formResponse);
    }

    @Override
    public FormResponse updateFormAnswer(FormResponse formResponseToUpdate) {
        String formResponseToEditID = formResponseToUpdate.getFormResponseId();
        FormResponse updatedFormResponse = formResponseRepository.findById(formResponseToEditID).get();
        if (updatedFormResponse != null) {
            updatedFormResponse.setFormAnswer(formResponseToUpdate.getFormAnswer());
            updatedFormResponse.setUpdatedAt(formResponseToUpdate.getUpdatedAt());
            updatedFormResponse.setDeletedAt(formResponseToUpdate.getDeletedAt());
            return formResponseRepository.save(updatedFormResponse);
        }
        return null;
        
    }


    // @Override 
    // public void updateFormAnswerValue(String id, String key, Object value) { 
    //     formResponseRepository.updateFormAnswerValue(id, key, value);
    // }
}
