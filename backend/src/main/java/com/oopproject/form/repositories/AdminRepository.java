package com.oopproject.form.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.oopproject.form.models.User.User;

public interface AdminRepository extends MongoRepository<User, String> {

    @Query("{ deleted_at : { $exists : false } }")
    List<User> findNotDeleted();

    User findByUsername(String username);

    User findUserById(String id);

}
