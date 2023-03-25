package com.oopproject.form.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.oopproject.form.models.User.User;
import com.oopproject.form.repositories.UserRepository;

@Service
@Qualifier("user")
// @Primary
public class UserServiceImp implements UserService {

}