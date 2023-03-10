package com.oopproject.form.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oopproject.form.models.Question.Question;
import com.oopproject.form.repositories.QuestionRepository;

@Service
public class QuestionService {
    @Autowired
    QuestionRepository questionRepository;

    public Question addQuestion(Question question) {
        System.out.println("add question");
        return questionRepository.save(question);
    }
}
