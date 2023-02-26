package com.oopproject.form.service;

import java.util.List;
import java.util.Optional;

import com.oopproject.form.models.Form.Form;

public interface FormService {
    public List<Form> getAllForms();

    public Optional<Form> getFormById(String id);

    public void addForm(Form form);

}
