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

import com.oopproject.form.models.FormResponse.FormResponse;
import com.oopproject.form.service.FormResponseService;

@RestController
@CrossOrigin
@RequestMapping("/formResponse")
public class FormResponseController {
    @Autowired
    private FormResponseService formResponseService;

    @GetMapping("/all")
    @CrossOrigin
    public List<FormResponse> getAllFormResponses() {
        return formResponseService.getAllFormResponses();
    }

    @GetMapping("/{id}")
    @CrossOrigin
    public Optional<FormResponse> getFormResponseById(@PathVariable String id) {
        return formResponseService.getFormResponseById(id);
    }

    @GetMapping("/{formTemplateId}/{vendorProjectId}")
    @CrossOrigin
    public Optional<FormResponse> getFormResponsebyFormTemplateAndVendorProject(@PathVariable("formTemplateId") String formTemplateId, @PathVariable("vendorProjectId") String vendorProjectId) {
        return formResponseService.getFormResponsebyFormTemplateAndVendorProject(formTemplateId, vendorProjectId);
    }

    @PostMapping("/create")
    @CrossOrigin
    public void createForm(@RequestBody FormResponse formResponse) {
        formResponseService.addFormResponse(formResponse);
    }

}
