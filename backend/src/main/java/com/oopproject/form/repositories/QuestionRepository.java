package com.oopproject.form.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.oopproject.form.models.Question;

public interface QuestionRepository extends MongoRepository<Question, String> {
}
