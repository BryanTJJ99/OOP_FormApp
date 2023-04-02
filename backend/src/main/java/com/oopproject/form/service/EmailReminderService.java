package com.oopproject.form.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.oopproject.form.models.FormResponse.FormResponse;
import com.oopproject.form.models.FormTemplate.FormTemplate;
import com.oopproject.form.models.Project.Project;
import com.oopproject.form.models.User.User;

@Component
public class EmailReminderService {

    // @Autowired
    // private FormRepository formRepository;

    @Autowired
    private FormResponseService formResponseService;

    @Autowired
    private EmailService emailService;

    @Autowired
    @Qualifier("admin")
    private AdminService adminService;

    @Autowired
    private FormTemplateService formTemplateService;

    @Autowired
    private ProjectService projectService;

    // @Scheduled(fixedRate = 60000)
    // // @Scheduled(cron = "0 0 0 * * ?")
    // public void sendEmailReminders() {

    // Date today = new Date();
    // Calendar reminder = Calendar.getInstance();
    // reminder.setTime(today);
    // reminder.add(Calendar.DATE, 14);
    // Date reminderDate = reminder.getTime();

    // List<FormResponse> formsDueSoon =
    // formResponseService.getFormsWithinDateRange(today, reminderDate);

    // for (FormResponse formResponse : formsDueSoon) {
    // Date vendorDeadline = formResponse.getVendorDeadline();

    // long dateDiffMilli = vendorDeadline.getTime() - reminderDate.getTime();
    // long dateDiff = TimeUnit.DAYS.convert(dateDiffMilli, TimeUnit.MILLISECONDS);

    // int threeDayInterval[] = { 14, 11, 8 };

    // boolean sendEmail = false;
    // for (int day : threeDayInterval) {
    // if (day == dateDiff) {
    // sendEmail = true;
    // }
    // }

    // if (dateDiff <= 7 || sendEmail) {
    // User vendor = adminService.findById(formResponse.getVendorId());
    // String vendorEmail = vendor.getEmail();

    // String formTemplateId = formResponse.getFormTemplateId();
    // Optional<FormTemplate> formTemplateOptional =
    // formTemplateService.getFormTemplateById(formTemplateId);
    // String formName = "";

    // if (formTemplateOptional.isPresent()) {
    // FormTemplate formTemplate = formTemplateOptional.get();
    // formName = formTemplate.getFormName();
    // }

    // String projectId = formResponse.getProjectId();
    // Project project = projectService.getProjectById(projectId);
    // String projectName = project.getProjectName();

    // emailService.sendEmailReminder(vendorEmail, formName, projectName,
    // vendorDeadline);
    // }

    // }

    // }
}
