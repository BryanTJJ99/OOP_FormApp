package com.oopproject.form.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

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

    @CrossOrigin
    public Question createQuestionFromSection(Question question) { 
        System.out.println("----------------iuwefonwweuihuwvw----------------");
        questionService.addQuestion(question);
        // ObjectMapper objectMapper = new ObjectMapper(); 
        // Question question = null; 
        // try { 
        //     // question = objectMapper.treeToValue(node, Question.class); 
        //     questionService.addQuestion(question);
        // } catch (JsonProcessingException e) { 
        //     e.printStackTrace();
        // }
        return question; 
    }
}
