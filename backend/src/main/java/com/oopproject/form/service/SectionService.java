package com.oopproject.form.service;

import java.util.List;
import java.util.Optional;

import com.oopproject.form.models.Section.Section;;

public interface SectionService {
    public List<Section> getAllSections(); 

    public Optional<Section> getSectionById(String id);

    public void addSection(Section section); 
}
