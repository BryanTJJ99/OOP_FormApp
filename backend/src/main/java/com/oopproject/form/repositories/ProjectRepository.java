package com.oopproject.form.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.oopproject.form.models.Project.Project;

public interface ProjectRepository extends MongoRepository<Project, String> {

}


