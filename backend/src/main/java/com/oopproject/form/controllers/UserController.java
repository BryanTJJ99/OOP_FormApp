package com.oopproject.form.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.oopproject.form.models.User;
import com.oopproject.form.service.UserService;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService UserService;

    @GetMapping("/allUsers")
    @CrossOrigin
    public List<User> getAllUsers() {
        return UserService.findAllUsers();
    }

    @GetMapping("/user/{username}")
    @CrossOrigin
    public User getUser(@PathVariable String username) {
        return UserService.findByUsername(username);
    }

    @PostMapping("/create-user")
    @CrossOrigin
    public User addUser(@RequestBody User user) {
        return UserService.addUser(user);
    }

    @PatchMapping("/user/{username}/update")
    public User updateUser(@PathVariable String username, @RequestBody User updatedUser) {
        return UserService.updateUser(username, updatedUser);
    }
}
