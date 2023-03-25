package com.oopproject.form.service;

import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EmailReminderService {

    // @Autowired
    // private FormRepository formRepository;

    @Autowired
    private EmailService emailService;

    // @Scheduled(cron = "0 0 0 * * ?")
    // public void sendEmailReminders() {
    // String vendorEmail = "zxchan.2021@scis.smu.edu.sg";
    // String formName = "Test Scheduler";
    // Calendar deadline = Calendar.getInstance();
    // deadline.set(2023, 03, 23);
    // Date deadlineDate = deadline.getTime();

    // emailService.sendEmailReminder(vendorEmail, formName, deadlineDate);

    // }
}
