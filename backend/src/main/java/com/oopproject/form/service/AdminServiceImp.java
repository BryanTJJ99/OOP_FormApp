// package com.oopproject.form.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.oopproject.form.models.User.User;
// import com.oopproject.form.repositories.UserRepository;

// @Service
// public class AdminServiceImp extends UserServiceImp implements AdminService {

// @Autowired
// private UserRepository userRepository;

// @Override
// public User addUser(User user) {
// User createdbyUser = userRepository.findByUsername("test1");
// // hardcoded to test. must change
// user.setCreated_by(createdbyUser);
// return userRepository.save(user);

// }
// }
