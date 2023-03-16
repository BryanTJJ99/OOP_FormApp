package com.oopproject.form.models;

import java.util.*;
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
        this.sectionController = sectionController;
    }

    @Override
    public List<Section> deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonNode node = jp.getCodec().readTree(jp);
        ArrayNode sectionsNode = (ArrayNode) node;
        List<Section> sections = new ArrayList<>();
        for (JsonNode sectionNode : sectionsNode) {
            System.out.println("----------------ouhefohiuefiuoueffeef----------------");
            Section section = sectionController.createSectionFromFormTemplate(sectionNode);
            sections.add(section);
        }
        return sections;
    }
}
