package com.oopproject.form.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.oopproject.form.models.Question.Question;

public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findAll();
}
