package com.oopproject.form.service;

import java.util.List;

import com.oopproject.form.models.User.User;

public interface UserService {
    public List<User> findAllUsers();

    public User findByUsername(String username);

    public User updateUser(String username, User updatedUser);

    public User addUser(User user);
}
