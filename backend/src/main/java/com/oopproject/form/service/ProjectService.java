package com.oopproject.form.service;

import java.util.List;
import java.util.Optional;

import com.oopproject.form.models.Project.Project;

public interface ProjectService {
    public List<Project> getAllProjects();

    public Project addProject(Project project);

    public Project getProjectById(String projectId);

    public Project updateProject(Project projectToUpdate);

}