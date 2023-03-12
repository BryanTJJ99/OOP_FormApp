package com.oopproject.form.service;

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

    // @Override
    // public Optional<FormResponse> getFormResponsebyFormTemplateAndVendorProject(String formTemplateId, String vendorProjectId) {
    //     return formResponseRepository.findByFormTemplateIdAndVendorProjectId(formTemplateId, vendorProjectId);
    // }

    @Override
    public void addFormResponse(FormResponse formResponse) {
        formResponseRepository.save(formResponse);
    }
}
