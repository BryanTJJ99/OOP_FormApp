package com.oopproject.form.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.oopproject.form.models.Section.Section;
import com.oopproject.form.service.SectionService;

@RestController
@CrossOrigin
@RequestMapping("/section")
public class SectionController {
    @Autowired
    private SectionService sectionService; 

    @GetMapping("/{id}")
    @CrossOrigin
    public Optional<Section> getSectionById(@PathVariable String id) { 
        return sectionService.getSectionById(id);
    }

    @PostMapping("/create")
    @CrossOrigin
    public void createSection(@RequestBody Section section) { 
        sectionService.addSection(section);
    }

    @CrossOrigin
    public Section createSectionFromFormTemplate(JsonNode node) { 
        System.out.println("----------------cnwecioecoiewjfowe4h----------------");
        ObjectMapper objectMapper = new ObjectMapper();
        Section section = null;
        try {
            section = objectMapper.treeToValue(node, Section.class);
            sectionService.addSection(section);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return section;
    }
}
