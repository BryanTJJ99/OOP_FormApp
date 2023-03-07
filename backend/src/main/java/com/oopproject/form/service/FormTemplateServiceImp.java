package com.oopproject.form.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oopproject.form.models.FormTemplate.FormTemplate;
import com.oopproject.form.repositories.FormTemplateRepository;

@Service
public class FormTemplateServiceImp implements FormTemplateService {
    @Autowired
    private FormTemplateRepository formTemplateRepository;

    @Override
    public List<FormTemplate> getAllFormTemplates() {
        return formTemplateRepository.findAll();
    }

    @Override
    public Optional<FormTemplate> getFormTemplateById(String id) {
        return formTemplateRepository.findById(id);
    }

    @Override
    public void addFormTemplate(FormTemplate formTemplate) {
        formTemplateRepository.save(formTemplate);
    }
}
