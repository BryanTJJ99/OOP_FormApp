package com.oopproject.form.controllers;

// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @CrossOrigin(origins = "*", maxAge = 3600)
// @RestController
// @RequestMapping("/api/test")
// public class TestController {
// 	@GetMapping("/all")
// 	public String allAccess() {
// 		return "Public Content.";
// 	}
	
// 	@GetMapping("/user")
// 	@PreAuthorize("hasRole('VENDOR') or hasRole('ADMIN') or hasRole('APPROVER')")
// 	public String userAccess() {
// 		return "User Content.";
// 	}

// 	@GetMapping("/vendor")
// 	@PreAuthorize("hasRole('VENDOR')")
// 	public String moderatorAccess() {
// 		return "Vendor Board.";
// 	}

// 	@GetMapping("/admin")
// 	@PreAuthorize("hasRole('ADMIN')")
// 	public String adminAccess() {
// 		return "Admin Board.";
// 	}

// 	@GetMapping("/approver")
// 	@PreAuthorize("hasRole('APPROVER')")
// 	public String approverAccess() {
// 		return "Approver Board.";
// 	}
// }
