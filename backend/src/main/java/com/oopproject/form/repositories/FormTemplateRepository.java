package com.oopproject.form.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.oopproject.form.models.FormTemplate.FormTemplate;

public interface FormTemplateRepository extends MongoRepository<FormTemplate, String> {
    List<FormTemplate> findAll(); 
}
