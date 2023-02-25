package com.oopproject.form.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oopproject.form.models.User.User;
import com.oopproject.form.repositories.AdminRepository;

@Service
public class AdminServiceImp extends UserServiceImp implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public List<User> findAllUsers() {
        return adminRepository.findAll();
    }

    @Override
    public User findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    @Override
    public User updateUser(String username, User updatedUser) {
        User userToUpdate = adminRepository.findByUsername(username);
        if (userToUpdate != null) {
            userToUpdate.setUsername(username);
            userToUpdate.setEmail(updatedUser.getEmail());
            userToUpdate.setPassword(updatedUser.getPassword());
            userToUpdate.setRole(updatedUser.getRole());
            return adminRepository.save(userToUpdate);
        }
        return null;
    }

    @Override
    public User addUser(User user) {
        User createdbyUser = adminRepository.findByUsername("testAdmin1");
        // hardcoded to test. must change
        user.setCreated_by(createdbyUser);
        return adminRepository.save(user);
    }
}
