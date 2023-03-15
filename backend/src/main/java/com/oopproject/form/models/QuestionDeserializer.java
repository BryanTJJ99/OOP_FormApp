package com.oopproject.form.models;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import java.io.IOException;

import com.oopproject.form.models.Question.FileQuestion;
import com.oopproject.form.models.Question.MultiSelectQuestion;
import com.oopproject.form.models.Question.Question;
import com.oopproject.form.models.Question.ScaleQuestion;
import com.oopproject.form.models.Question.SingleSelectQuestion;
import com.oopproject.form.models.Question.TextQuestion;

public class QuestionDeserializer extends StdDeserializer<Question> {

    public QuestionDeserializer() {
        this(null);
    }

    public QuestionDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public Question deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonNode node = jp.getCodec().readTree(jp);
        String type = node.get("questionType").asText();

        // determine which concrete subclass to use based on the type field
        if ("text".equals(type) || "textarea".equals(type)) {
            return jp.getCodec().treeToValue(node, TextQuestion.class);
        } else if ("radio".equals(type) || "dropdown".equals(type)) {
            return jp.getCodec().treeToValue(node, SingleSelectQuestion.class);
        } else if ("checkbox".equals(type)) {
            return jp.getCodec().treeToValue(node, MultiSelectQuestion.class);
        } else if ("scale".equals(type)) {
            return jp.getCodec().treeToValue(node, ScaleQuestion.class);
        } else if ("file".equals(type)) {
            return jp.getCodec().treeToValue(node, FileQuestion.class);
        } else {
            throw new IllegalArgumentException("Unknown question type: " + type);
        }
    }
}

