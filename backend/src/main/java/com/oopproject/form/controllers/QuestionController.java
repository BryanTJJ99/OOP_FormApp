package com.oopproject.form.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.oopproject.form.models.Question.Question;
import com.oopproject.form.service.QuestionService;

@RestController
@CrossOrigin
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @GetMapping("/{id}")
    @CrossOrigin
    public Optional<Question> getQuestionById(@PathVariable String id) { 
        return questionService.getQuestionById(id); 
    }

    @PostMapping("/create")
    @CrossOrigin
    public void createQuestion(@RequestBody Question question) { 
        questionService.addQuestion(question);
    }
}
