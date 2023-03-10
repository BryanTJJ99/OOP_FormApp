package com.oopproject.form.controllers;

// import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.oopproject.form.models.Question.Question;
import com.oopproject.form.service.QuestionService;

@RestController
@CrossOrigin
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    // @GetMapping("/{formId}/questions")
    // @CrossOrigin
    // public List<Question> getAllQuestions(@PathVariable String username) {
    // return QuestionService.findAllQuestions();
    // }

    @PostMapping("/create-question")
    @CrossOrigin
    public Question addQuestion(@RequestBody Question question) {
        return questionService.addQuestion(question);
    }

    // @PatchMapping("/user/{username}/update")
    // public User updateUser(@PathVariable String username, @RequestBody User
    // updatedUser) {
    // return UserService.updateUser(username, updatedUser);
    // }
}
