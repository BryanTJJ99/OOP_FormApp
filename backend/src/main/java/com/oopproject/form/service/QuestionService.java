package com.oopproject.form.service;

import java.util.Optional;

import com.oopproject.form.models.Question.Question;

public interface QuestionService {
    public Optional<Question> getQuestionById(String id);

    public void addQuestion(Question question);
}
