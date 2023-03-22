package com.oopproject.form.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.oopproject.form.models.User.User;
import com.oopproject.form.repositories.AdminRepository;

@Service
@Qualifier("admin")
public class AdminServiceImp extends UserServiceImp implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public List<User> findAllUsers() {
        return adminRepository.findAll();
    }

    @Override
    public List<User> findNotDeleted() {
        return adminRepository.findNotDeleted();
    }

    @Override
    public List<User> findAllActiveVendors() {
        return adminRepository.findAllActiveVendors();
    }

    @Override
    public List<User> findTopNVendors(int userNum) {
        List<User> allActiveVendors = adminRepository
                .findAllActiveVendorsByCreatedAt(Sort.by(Sort.Direction.DESC, "createdAt"));
        if (userNum >= allActiveVendors.size()) {
            return allActiveVendors;
        }
        return allActiveVendors.subList(0, userNum);
    }

    @Override
    public User findByUsername(String username) {
        // System.out.println("admin service imp: " + username);
        return adminRepository.findByUsername(username);
    }

    @Override
    public User findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    @Override
    public User updateUser(User userToUpdate) {
        String userToEditID = userToUpdate.getId();
        User updatedUser = adminRepository.findById(userToEditID).get();
        if (updatedUser != null) {
            updatedUser.setUsername(userToUpdate.getUsername());
            updatedUser.setEmail(userToUpdate.getEmail());
            updatedUser.setRole(userToUpdate.getRole());
            return adminRepository.save(updatedUser);
        }
        return null;
    }

    @Override
    public User deleteUser(User userToDelete) {
        String userToDeleteID = userToDelete.getId();
        User deletedUser = adminRepository.findById(userToDeleteID).get();
        if (deletedUser != null) {
            deletedUser.setDeletedAt(new Date());
        }
        return adminRepository.save(deletedUser);
    }

    @Override
    public User addUser(User user) {
        // User createdbyUser = adminRepository.findByUsername("testAdmin1");
        // hardcoded to test. must change
        // user.setCreatedBy(createdbyUser);
        return adminRepository.save(user);
    }

}
