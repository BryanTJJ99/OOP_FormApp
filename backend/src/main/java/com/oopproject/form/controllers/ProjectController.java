package com.oopproject.form.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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
    @Qualifier("project")
    private ProjectService projectService;
    // @Autowired
    // @Qualifier("admin")
    // private AdminService adminService;

    @GetMapping("/allProjects")
    @CrossOrigin
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }


    @GetMapping("/{id}")
    @CrossOrigin
    public Project getProjectById(@PathVariable String id) {
        return projectService.getProjectById(id);
    }


    @PostMapping("/create")
    @CrossOrigin
    @ResponseStatus(HttpStatus.CREATED)
    public Project createProject(@RequestBody Project project) {
        return projectService.addProject(project);
    }


}
