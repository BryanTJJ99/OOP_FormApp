package com.oopproject.form.service;

import java.util.Date;
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
        return formTemplateRepository.findAllActiveFormTemplate();
    }

    @Override
    public Optional<FormTemplate> getFormTemplateById(String id) {
        return formTemplateRepository.findById(id);
    }

    @Override
    public void addFormTemplate(FormTemplate formTemplate) {
        formTemplateRepository.save(formTemplate);
    }

    @Override
    public FormTemplate deleteFormTemplate(String formTemplateId) { 
        FormTemplate formTemplateToDelete = formTemplateRepository.findById(formTemplateId).get(); 
        if (formTemplateToDelete != null) { 
            formTemplateToDelete.setDeletedAt(new Date());
        }
        return formTemplateRepository.save(formTemplateToDelete);
    }

    @Override
    public FormTemplate updateFormTemplate(FormTemplate formTemplateToUpdate) {
        String formTemplateToEditID = formTemplateToUpdate.getFormTemplateId();
        FormTemplate updatedFormTemplate = formTemplateRepository.findById(formTemplateToEditID).get();
        if (updatedFormTemplate != null) {
            updatedFormTemplate.setFormName(formTemplateToUpdate.getFormName());
            updatedFormTemplate.setFormDescription(formTemplateToUpdate.getFormDescription());
            updatedFormTemplate.setUpdatedAt(new Date());
            updatedFormTemplate.setSections(formTemplateToUpdate.getSections());
            updatedFormTemplate.setQuestions(formTemplateToUpdate.getQuestions());
            return formTemplateRepository.save(updatedFormTemplate);
        }
        return null;

    }
}
