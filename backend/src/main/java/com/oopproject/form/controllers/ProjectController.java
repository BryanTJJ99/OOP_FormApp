package com.oopproject.form.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oopproject.form.models.Project.Project;
import com.oopproject.form.service.ProjectService;

// import com.oopproject.form.models.Form.Form;
// import com.oopproject.form.service.FormService;

@RestController
@CrossOrigin


@RequestMapping("/project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;


    
    @GetMapping("/allProjects")
    @CrossOrigin
    public List<Project> getAllProjects(){
        return projectService.getAllProjects();
    }

    @PostMapping("/create")
    @CrossOrigin
    public void createProject(@RequestBody Project project){

        projectService.addProject(project);
    }

    
}
