package com.oopproject.form.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.oopproject.form.models.User.User;

public interface AdminRepository extends MongoRepository<User, String> {

    @Query("{ deletedAt : { $exists : false } }")
    List<User> findNotDeleted();

    @Query("{ deletedAt : { $exists : false }, role : ROLE_VENDOR }")
    List<User> findAllActiveVendors();

    @Query("{ deletedAt : { $exists : false }, role : ROLE_VENDOR }")
    List<User> findAllActiveVendorsByCreatedAt(Sort sort);

    User findByUsername(String username);

    User findByEmail(String email);

    User findUserById(String id);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

}
