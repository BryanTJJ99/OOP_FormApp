package com.oopproject.form.models;

import java.util.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import java.io.IOException;

import com.oopproject.form.models.Section.Section;
import com.oopproject.form.models.FormTemplate.FormTemplate;
import com.oopproject.form.controllers.SectionController;

public class SectionListDeserializer extends StdDeserializer<List<Section>> {

    private SectionController sectionController;

    public SectionListDeserializer(SectionController sectionController) {
        super(List.class);
        System.out.println("----ATTENTION----");
        System.out.println(sectionController);
        this.sectionController = sectionController;
    }

    @Override
    public List<Section> deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonNode node = jp.getCodec().readTree(jp);
        ArrayNode sectionsNode = (ArrayNode) node;
        List<Section> sections = new ArrayList<>();
        for (JsonNode sectionNode : sectionsNode) {
            System.out.println("----------------ouhefohiuefiuoueffeef----------------");
            // Section section = new Section();
            // section.setSectionId(sectionNode.get("sectionId").asText());
            // section.setSectionName(sectionNode.get("sectionName").asText());
            // section.setSectionDescription(sectionNode.get("sectionDescription").asText());
            // section.setAssignedTo(sectionNode.get("assignedTo").asText());
            // String createdAtString = sectionNode.get("createdAt").asText();
            // DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // adjust the pattern to match the actual date format
            // LocalDate createdAt = LocalDate.parse(createdAtString, formatter);
            // section.setCreatedAt(createdAt);
            // String updatedAtString = sectionNode.get("updatedAt").asText();
            // LocalDate updatedAt = LocalDate.parse(updatedAtString, formatter);
            // section.setUpdatedAt(updatedAt);

            // section.setQuestions(sectionNode.get("questions").);
            System.out.println(sectionNode);
            Section section = sectionController.createSectionFromFormTemplate(sectionNode);
            sections.add(section);
        }
        System.out.println(sections);
        return sections;
    }
}
