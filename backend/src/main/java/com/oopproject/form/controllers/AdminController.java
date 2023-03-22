package com.oopproject.form.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import com.oopproject.form.models.User.User;
// import com.oopproject.form.service.UserService;
import com.oopproject.form.service.AdminService;

@RestController
@CrossOrigin
@RequestMapping("/api/admin")
public class AdminController extends UserController {

    @Autowired
    @Qualifier("admin")
    private AdminService adminService;

    @GetMapping("/allUsers")
    @CrossOrigin
    public List<User> getAllUsers() {
        return adminService.findNotDeleted();
    }

    @GetMapping("/allVendors")
    @CrossOrigin
    public List<User> getAllVendors() {
        return adminService.findAllActiveVendors();
    }

    @GetMapping("/lastNUsers/{userNum}")
    @CrossOrigin
    public List<User> getLastNUsers(@PathVariable int userNum) {
        return adminService.findTopNVendors(userNum);
    }

    @GetMapping("/user/{username}")
    @CrossOrigin
    public User getUser(@PathVariable String username) {
        return adminService.findByUsername(username);
    }

    @PostMapping("user/create")
    @CrossOrigin
    public User addUser(@RequestBody User user) {
        user.setCreatedAt(new Date());
        return adminService.addUser(user);
    }

    @PatchMapping("user/edit")
    @CrossOrigin
    public User updateUser(@RequestBody User updatedUser) {
        return adminService.updateUser(updatedUser);
    }

    @PatchMapping("user/delete")
    @CrossOrigin
    public User deleteUser(@RequestBody User deletedUser) {
        return adminService.deleteUser(deletedUser);
    }

}
