package com.oopproject.form.models;

import java.util.*;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.node.ArrayNode;
import java.io.IOException;

import com.oopproject.form.models.Question.FileQuestion;
import com.oopproject.form.models.Question.MultiSelectQuestion;
import com.oopproject.form.models.Question.Question;
import com.oopproject.form.models.Question.ScaleQuestion;
import com.oopproject.form.models.Question.SingleSelectQuestion;
import com.oopproject.form.models.Question.TextQuestion;

public class QuestionDeserializer extends JsonDeserializer<List<Question>> {

    // public QuestionDeserializer() {
    //     this(null);
    // }

    // public QuestionDeserializer(Class<?> vc) {
    //     super(vc);
    // }

    @Override
    public List<Question> deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        // JsonNode node = jp.getCodec().readTree(jp);
        // String type = node.get("questionType").asText();
        JsonNode node = jp.getCodec().readTree(jp);
        ArrayNode arrayNode = (ArrayNode) node;
        System.out.println(node);
        // System.out.println(node.getClass().getName());
        // System.out.println(node.get("questionType"));

        List<Question> questions = new ArrayList<>();

        for (JsonNode questionNode : arrayNode) { 
            String type = questionNode.get("questionType").asText();
            System.out.println(questionNode.get("questionType"));

            // determine which concrete subclass to use based on the type field
            if ("text".equals(type) || "textarea".equals(type)) {
                questions.add(jp.getCodec().treeToValue(questionNode, TextQuestion.class));
            } else if ("radio".equals(type) || "dropdown".equals(type)) {
                questions.add(jp.getCodec().treeToValue(questionNode, SingleSelectQuestion.class));
            } else if ("checkbox".equals(type)) {
                questions.add(jp.getCodec().treeToValue(questionNode, MultiSelectQuestion.class));
            } else if ("scale".equals(type)) {
                questions.add(jp.getCodec().treeToValue(questionNode, ScaleQuestion.class));
            } else if ("file".equals(type)) {
                questions.add(jp.getCodec().treeToValue(questionNode, FileQuestion.class));
            } else {
                throw new IllegalArgumentException("Unknown question type: " + type);
            }
        }

        return questions;

    }
}

