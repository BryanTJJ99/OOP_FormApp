package com.oopproject.form.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.oopproject.form.models.Form.Form;

public interface FormRepository extends MongoRepository<Form, String> {

}