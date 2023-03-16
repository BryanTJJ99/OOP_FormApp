package com.oopproject.form.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.oopproject.form.models.Section.Section;

public interface SectionRepository extends MongoRepository<Section, String> {
    List<Section> findAll(); 
}
