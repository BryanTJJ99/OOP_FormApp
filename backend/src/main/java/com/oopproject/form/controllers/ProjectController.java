package com.oopproject.form.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.oopproject.form.models.FormResponse.FormResponse;
import com.oopproject.form.models.Project.Project;
import com.oopproject.form.models.User.User;
import com.oopproject.form.service.AdminService;
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

    @PostMapping("/create")
    @CrossOrigin
    @ResponseBody
    public void createProject(@RequestParam String projectName,
            @RequestParam String projectDescription,
            @RequestParam String vendorUsername,
            @RequestParam ArrayList<FormResponse> formResponses) {
        final String uri = "http://localhost:8080/api/admin/user/asdf";
        RestTemplate restTemplate = new RestTemplate();
        System.out.println(restTemplate.getForObject(uri, String.class));
        // System.out.println(result);
        // System.out.println("projectName: " + projectName);
        // System.out.println("projectDescription: " + projectDescription);
        // System.out.println("vendorUsername: " + vendorUsername);
        // User vendor = adminService.findByUsername(vendorUsername);
        // System.out.println("vendor: " + vendor);
        // String vendorId = vendor.getId();
        // System.out.println("vendorId: " + vendorId);
        // Project newProject = new Project(projectName, projectDescription, vendorId,
        // formResponses);
        // projectService.addProject(newProject);
    }

}
