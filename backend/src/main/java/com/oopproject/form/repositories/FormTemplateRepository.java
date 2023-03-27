package com.oopproject.form.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.oopproject.form.models.FormTemplate.FormTemplate;

public interface FormTemplateRepository extends MongoRepository<FormTemplate, String> {
    List<FormTemplate> findAll(); 

    @Query("{ deletedAt : { $exists : false } }")
    List<FormTemplate> findAllActiveFormTemplate(); 
}
