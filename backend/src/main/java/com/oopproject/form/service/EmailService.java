package com.oopproject.form.service;

import java.util.Date;

public interface EmailService {
    public void sendEmailReminder(String vendorEmail, String formName, Date deadline);

    public void sendCustomEmail(String vendorEmail, String formName, String customSubject, String customMessage);
}
