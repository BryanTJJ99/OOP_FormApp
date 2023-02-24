package com.oopproject.form.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.oopproject.form.models.User.User;

public interface UserRepository extends MongoRepository<User, String> {

    User findByUsername(String username);

}
