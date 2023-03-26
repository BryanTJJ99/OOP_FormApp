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
    public Project getProjectById(String projectId) {
        Optional<Project> optionalProject = projectRepository.findById(projectId);
        return optionalProject.isPresent() ? optionalProject.get() : null;
    }

    @Override
    public Project updateProject(Project projectToUpdate) {
        String projectToEditID = projectToUpdate.getProjectID();
        Project updatedProject = projectRepository.findById(projectToEditID).get();
        if (updatedProject != null) {
            updatedProject.setProjectName(projectToUpdate.getProjectName());
            updatedProject.setProjectDescription(projectToUpdate.getProjectDescription());
            return projectRepository.save(updatedProject);
        }
        return null;
    }

}