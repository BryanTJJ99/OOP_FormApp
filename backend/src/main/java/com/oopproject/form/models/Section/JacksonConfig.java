// package com.oopproject.form.models.Section;

// import com.fasterxml.jackson.databind.Module;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.fasterxml.jackson.databind.module.SimpleModule;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import com.oopproject.form.models.Question.Question;
// import com.oopproject.form.models.QuestionDeserializer;


// @Configuration
// public class JacksonConfig {
//     @Bean
//     public Module questionDeserializerModule() {
//         SimpleModule module = new SimpleModule();
//         module.addDeserializer(Question.class, new QuestionDeserializer());
//         return module;
//     }

//     @Bean
//     public ObjectMapper objectMapper() {
//         ObjectMapper objectMapper = new ObjectMapper();
//         objectMapper.registerModule(questionDeserializerModule());
//         return objectMapper;
//     }
// }

