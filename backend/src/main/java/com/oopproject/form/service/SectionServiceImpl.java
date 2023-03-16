package com.oopproject.form.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oopproject.form.models.Section.Section;
import com.oopproject.form.repositories.SectionRepository;

@Service
public class SectionServiceImpl implements SectionService {
    @Autowired
    private SectionRepository sectionRepository;

    @Override
    public List<Section> getAllSections() { 
        return sectionRepository.findAll();
    }

    @Override
    public Optional<Section> getSectionById(String id) { 
        return sectionRepository.findById(id);
    }

    @Override
    public void addSection(Section section) { 
        sectionRepository.save(section);
    }
}
