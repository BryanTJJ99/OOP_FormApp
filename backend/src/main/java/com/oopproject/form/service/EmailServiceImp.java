package com.oopproject.form.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailServiceImp implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendEmailReminder(String vendorEmail, String formName, String projectName, Date deadline) {

        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setTo(vendorEmail);
        mailMessage.setFrom("oopG1T3@gmx.com");
        mailMessage.setSubject("Reminder: Form " + formName + " Deadline Approaching");
        mailMessage
                .setText("Hi there,\n\nThis is a friendly reminder that the deadline for completing Form: " + formName
                        + " for Project: " + projectName + " is approaching. The deadline is " + deadline
                        + ". Please complete the form before the deadline.\n\nThanks!");

        javaMailSender.send(mailMessage);
    }

    @Override
    public void sendCustomEmail(String vendorEmail, String customSubject, String customMessage) {

        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setTo(vendorEmail);
        System.out.println(vendorEmail);
        mailMessage.setFrom("oopG1T3@gmx.com");
        mailMessage.setSubject(customSubject);
        mailMessage.setText(customMessage);

        javaMailSender.send(mailMessage);

    }

    @Override
    public void sendAccountCreationEmail(String userEmail, String username, String password) {

        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setTo(userEmail);
        mailMessage.setFrom("oopG1T3@gmx.com");
        mailMessage.setSubject("Quantum Leap Account Creation");
        mailMessage.setText(
                "Your Quantum Leap Account has been created. Please access your account using the following credentials:\nUsername: "
                        + username + "\nPassword: " + password);

        javaMailSender.send(mailMessage);
    }
}
