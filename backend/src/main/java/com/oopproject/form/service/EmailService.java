package com.oopproject.form.service;

import java.util.Date;

public interface EmailService {
    public void sendEmailReminder(String vendorEmail, String formName, Date deadline);

    public void sendCustomEmail(String vendorEmail, String customSubject, String customMessage);

    public void sendAccountCreationEmail(String userEmail, String username, String password);
}
