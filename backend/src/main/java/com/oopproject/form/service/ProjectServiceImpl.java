package com.oopproject.form.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.oopproject.form.models.Project.Project;
import com.oopproject.form.repositories.ProjectRepository;

public class ProjectServiceImpl implements ProjectService{

    
    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public void addProject(Project project){
        return projectRepository.save(project);
    }
    
}