package com.oopproject.form.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.oopproject.form.models.Project.Project;
import com.oopproject.form.repositories.ProjectRepository;

@Service
@Qualifier("project")
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project addProject(Project project) {
        return projectRepository.save(project);
    }


    @Override
    public Optional<Project> getProjectById(String id) {
        return projectRepository.findById(id);
    }

}