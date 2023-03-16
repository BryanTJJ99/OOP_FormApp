package com.oopproject.form.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oopproject.form.models.Question.Question;
import com.oopproject.form.repositories.QuestionRepository;

@Service
public class QuestionServiceImp implements QuestionService {
    @Autowired
    private QuestionRepository questionRepository; 

    @Override
    public Optional<Question> getQuestionById(String id) { 
        return questionRepository.findById(id); 
    }

    @Override
    public void addQuestion(Question question) { 
        questionRepository.save(question);
    }
}
