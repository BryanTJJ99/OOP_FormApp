package com.oopproject.form.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.oopproject.form.models.Form.Form;

public interface FormResponseRepository extends MongoRepository<FormResponse, String> {
    void save(FormResponse formResponse);
    FormResponse findById(int id); 
    FormResponse findByFormTemplateAndVendorProject(int formTemplateId, int vendorProjectId); 
    List<FormResponse> findAll(); 
}