package com.oopproject.form.service;

import java.util.List;
import java.util.Optional;

import com.oopproject.form.models.FormTemplate.FormTemplate;

public interface FormTemplateService {
    public List<FormTemplate> getAllFormTemplates();

    public FormTemplate getFormTemplateById(String id);

    public void addFormTemplate(FormTemplate formTemplate);
}
