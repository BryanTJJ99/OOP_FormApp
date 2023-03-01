package com.oopproject.form.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.oopproject.form.models.User.User;
import com.oopproject.form.service.UserService;
import com.oopproject.form.service.AdminService;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController extends UserController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/allUsers")
    @CrossOrigin
    public List<User> getAllUsers() {
        return adminService.findAllUsers();
    }

    // @GetMapping("/user/{username}")
    // @CrossOrigin
    // public User getUser(@PathVariable String username) {
    // return adminService.findByUsername(username);
    // }

    @PostMapping("/create-user")
    @CrossOrigin
    public User addUser(@RequestBody User user) {
        user.setCreated_at(new Date());
        return adminService.addUser(user);
    }

    // @PostMapping("/create-admin")
    // @CrossOrigin
    // public User addAdmin(@RequestBody Admin admin) {
    // admin.setCreated_at(new Date());
    // return adminService.addUser(admin);
    // }

    // @PatchMapping("/user/{username}/update")
    // public User updateUser(@PathVariable String username, @RequestBody User
    // updatedUser) {
    // return adminService.updateUser(username, updatedUser);
    // }

}
