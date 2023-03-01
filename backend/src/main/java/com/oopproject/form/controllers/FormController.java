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

import com.oopproject.form.models.Form.Form;
import com.oopproject.form.service.FormService;

@RestController
@CrossOrigin
@RequestMapping("/form")
public class FormController {
    @Autowired
    private FormService formService;

    @GetMapping("/allForms")
    @CrossOrigin
    public List<Form> getAllForms() {
        return formService.getAllForms();
    }

    @GetMapping("/{id}")
    @CrossOrigin
    public Optional<Form> getFormById(@PathVariable String id) {
        return formService.getFormById(id);
    }

    @PostMapping("/create")
    @CrossOrigin
    public void createForm(@RequestBody Form form) {
        formService.addForm(form);
    }

}
