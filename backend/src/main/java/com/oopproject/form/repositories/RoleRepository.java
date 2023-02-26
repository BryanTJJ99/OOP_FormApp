package com.oopproject.form.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.oopproject.form.models.ERole;
import com.oopproject.form.models.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
  Role findByName(ERole name);
}
