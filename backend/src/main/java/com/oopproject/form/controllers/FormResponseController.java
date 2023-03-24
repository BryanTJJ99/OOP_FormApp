package com.oopproject.form.controllers;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import com.oopproject.form.models.FormResponse.FormResponse;
import com.oopproject.form.service.FormResponseService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RequestMethod;

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

    @PostMapping("/initialise")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
    @ResponseStatus(HttpStatus.CREATED)
    public void initialiseForm(@RequestBody FormResponse formResponse) {
        formResponseService.addFormResponse(formResponse);
    }

    @PostMapping("/create")
    @CrossOrigin
    public void createForm(@RequestBody FormResponse formResponse) {
        formResponseService.addFormResponse(formResponse);
    }

    @PostMapping("/edit")
    @CrossOrigin
    public FormResponse updateFormAnswer(@RequestBody FormResponse formResponse) {
        return formResponseService.updateFormAnswer(formResponse);
    }

    
    // @PostMapping("/create")
    // @CrossOrigin
    // public void createForm(@RequestPart("formResponse") String formResponseData, @RequestPart("fileMap") Map<String, Object> fileMap) throws JsonProcessingException {
    //     System.out.println("--------woeifowejfioe--------");
    //     ObjectMapper mapper = new ObjectMapper();
    //     FormResponse formResponse = mapper.readValue(formResponseData, FormResponse.class);
    //     System.out.println(fileMap);
    //     formResponseService.addFormResponse(formResponse);
    // }

    // @PostMapping("/updateFiles/{id}")
    // @CrossOrigin
    // public void updateFiles(@RequestBody Map<String, MultipartFile> fileMap, @PathVariable String id) throws IOException { 
    //     for (Map.Entry<String, MultipartFile> entry : fileMap.entrySet()) { 
    //         String key = entry.getKey();
    //         MultipartFile file = entry.getValue();

    //         byte[] bytes = file.getBytes();
    //         String base64 = Base64.getEncoder().encodeToString(bytes);

    //         formResponseService.updateFormAnswerValue(id, key, base64);
    //     }
    // }

}
