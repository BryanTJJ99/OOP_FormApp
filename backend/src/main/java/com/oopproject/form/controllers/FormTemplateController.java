package com.oopproject.form.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PatchMapping;

import com.oopproject.form.models.FormTemplate.FormTemplate;
import com.oopproject.form.service.FormTemplateService;

@RestController
@CrossOrigin
@RequestMapping("/formTemplate")
public class FormTemplateController {
    @Autowired
    private FormTemplateService formTemplateService;

    @GetMapping("/all")
    @CrossOrigin
    public List<FormTemplate> getAllFormTemplates() {
        return formTemplateService.getAllFormTemplates();
    }

    @GetMapping("/{id}")
    @CrossOrigin
    public Optional<FormTemplate> getFormTemplateById(@PathVariable String id) {
        return formTemplateService.getFormTemplateById(id);
    }

    @PostMapping("/create")
    @CrossOrigin
    public void createFormTemplate(@RequestBody FormTemplate formTemplate) {
        formTemplateService.addFormTemplate(formTemplate);
    }

    @PostMapping("/delete")
    @CrossOrigin
    public FormTemplate deleteFormTemplate(@RequestBody String formTemplateId) { 
        return formTemplateService.deleteFormTemplate(formTemplateId);
    }

    @PatchMapping("/edit")
    @CrossOrigin
    public FormTemplate updateFormTemplate(@RequestBody FormTemplate formTemplate) {
        return formTemplateService.updateFormTemplate(formTemplate);
    }

}
