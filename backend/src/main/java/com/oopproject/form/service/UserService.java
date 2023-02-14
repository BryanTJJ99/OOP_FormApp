package com.oopproject.form.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oopproject.form.models.User;
import com.oopproject.form.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    // public User updateUser(String username, User updatedUser) {
    // User userToUpdate = userRepository.findByUsername(username);
    // userToUpdate.setRole(updatedUser.getRole());
    // return userRepository.save(userToUpdate);
    // }
}
