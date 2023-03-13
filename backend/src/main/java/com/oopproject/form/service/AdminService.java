package com.oopproject.form.service;

import java.util.List;

import com.oopproject.form.models.User.User;

public interface AdminService {

    public List<User> findAllUsers();

    public User findByUsername(String username);

    public User updateUser(User userToUpdate);

    public User deleteUser(User userToDelete);

    public User addUser(User user);
}
