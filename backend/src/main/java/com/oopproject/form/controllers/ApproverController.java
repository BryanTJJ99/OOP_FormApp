package com.oopproject.form.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import com.oopproject.form.models.User.User;
import com.oopproject.form.service.UserService;
import com.oopproject.form.service.AdminService;
import com.oopproject.form.service.ApproverService;

@RestController
@CrossOrigin
@RequestMapping("/approver")
public class ApproverController extends AdminController {

    @Autowired
    @Qualifier("approver")
    private ApproverService approverService;

    // todo: implement approveForm and rejectForm
    // @PatchMapping("/approve-form")
    // @CrossOrigin
    // public boolean approveForm() {
    // return false;
    // }
    // @PatchMapping("/reject-form")
    // @CrossOrigin
    // public boolean rejectForm() {
    // return false;
    // }

}
