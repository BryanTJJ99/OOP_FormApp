package com.oopproject.form.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.oopproject.form.models.Form.FormTemplate;

public interface FormTemplateRepository extends MongoRepository<FormTemplate, String> {
    void save(FormTemplate formTemplate);
    FormTemplate findById(int id);
    List<FormTemplate> findAll(); 
}
