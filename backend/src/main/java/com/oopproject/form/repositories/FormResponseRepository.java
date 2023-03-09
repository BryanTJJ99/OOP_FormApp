package com.oopproject.form.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.oopproject.form.models.FormResponse.FormResponse;

public interface FormResponseRepository extends MongoRepository<FormResponse, String> {
    FormResponse findByFormTemplateIdAndVendorProjectId(String formTemplateId, String vendorProjectId); 
    List<FormResponse> findAll(); 
}