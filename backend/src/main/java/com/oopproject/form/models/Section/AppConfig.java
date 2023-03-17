package com.oopproject.form.models.Section;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.oopproject.form.models.Question.Question;
import com.oopproject.form.models.QuestionDeserializer;
import com.oopproject.form.controllers.QuestionController;


@Configuration
public class AppConfig {

    @Autowired
    private QuestionController questionController;
    
    @Bean
    public QuestionDeserializer questionDeserializer() {
        return new QuestionDeserializer(questionController);
    }
}
