package com.oopproject.form.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.oopproject.form.models.User;
import com.oopproject.form.repositories.UserRepository;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/allUsers")
    @CrossOrigin
    public List<User> getAllPosts() {
        return userRepository.findAll();
    }

    @PostMapping("/create-user")
    @CrossOrigin
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
