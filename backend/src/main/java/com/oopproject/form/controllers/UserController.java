package com.oopproject.form.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.oopproject.form.models.User.User;
import com.oopproject.form.service.UserService;
// import com.oopproject.form.service.AdminService;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

}
