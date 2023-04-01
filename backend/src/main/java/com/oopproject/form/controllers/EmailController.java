package com.oopproject.form.controllers;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.oopproject.form.service.EmailService;
import com.oopproject.form.models.Email.Email;

@RestController
@CrossOrigin
public class EmailController {
    @Autowired
    private EmailService emailService; 

    @PostMapping("/sendCustomEmail")
    @CrossOrigin
    public void sendCustomEmail(@RequestBody Email emailData) throws Exception {
        emailService.sendCustomEmail(emailData.vendorEmail, emailData.subject, emailData.message);
    }
}

