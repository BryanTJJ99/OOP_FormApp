package com.oopproject.form.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.oopproject.form.models.Form.Form;
import com.oopproject.form.repositories.FormRepository;

public class FormServiceImp implements FormService {

    @Autowired
    private FormRepository formRepository;

    @Override
    public List<Form> getAllForms() {
        return formRepository.findAll();
    }

    @Override
    public Optional<Form> getFormById(String id) {
        return formRepository.findById(id);
    }

    @Override
    public void addForm(Form form) {
        formRepository.save(form);
    }

}
