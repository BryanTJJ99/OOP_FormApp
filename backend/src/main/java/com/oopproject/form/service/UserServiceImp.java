package com.oopproject.form.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oopproject.form.models.User.User;
import com.oopproject.form.repositories.UserRepository;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findByUsername(String username) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public User updateUser(String username, User updatedUser) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public User addUser(User user) {
        User createdbyUser = userRepository.findByUsername("test1");
        // hardcoded to test. must change
        user.setCreated_by(createdbyUser);
        return userRepository.save(user);
    }
}