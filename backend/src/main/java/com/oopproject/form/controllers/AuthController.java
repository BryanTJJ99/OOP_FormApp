package com.oopproject.form.controllers;

// import java.util.List;
// import java.util.stream.Collectors;
// import java.util.Date;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.AuthenticationManager;
// import
// org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.oopproject.form.models.User.Roles;
// import com.oopproject.form.models.User.User;
// import com.oopproject.form.payload.request.LoginRequest;
// import com.oopproject.form.payload.request.SignupRequest;
// import com.oopproject.form.payload.response.JwtResponse;
// import com.oopproject.form.payload.response.MessageResponse;
// import com.oopproject.form.service.AdminService;
// import com.oopproject.form.service.EmailService;
// import com.oopproject.form.security.jwt.JwtUtils;
// import com.oopproject.form.service.UserDetailsImpl;

// import jakarta.validation.Valid;

// @CrossOrigin(origins = "*", maxAge = 3600)
// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {
// @Autowired
// AuthenticationManager authenticationManager;

// @Autowired
// AdminService adminService

// @Autowired
// EmailService emailService

// @Autowired
// PasswordEncoder encoder;

// @Autowired
// JwtUtils jwtUtils;

// @PostMapping("/signin")
// public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest
// loginRequest) {

// Authentication authentication = authenticationManager.authenticate(
// new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
// loginRequest.getPassword()));

// SecurityContextHolder.getContext().setAuthentication(authentication);
// String jwt = jwtUtils.generateJwtToken(authentication);

// UserDetailsImpl userDetails = (UserDetailsImpl)
// authentication.getPrincipal();
// List<String> roles = userDetails.getAuthorities().stream()
// .map(item -> item.getAuthority())
// .collect(Collectors.toList());

// return ResponseEntity.ok(new JwtResponse(jwt,
// userDetails.getId(),
// userDetails.getUsername(),
// userDetails.getEmail(),
// roles));
// }

// @PostMapping("/createUser")
// public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest
// signUpRequest) {
// if (adminRepository.findByUsername(signUpRequest.getUsername())) {
// return ResponseEntity
// .badRequest()
// .body(new MessageResponse("Error: Username is already taken!"));
// }

// if (adminRepository.findByEmail(signUpRequest.getEmail())) {
// return ResponseEntity
// .badRequest()
// .body(new MessageResponse("Error: Email is already in use!"));
// }

// // Create new user's account
// User user = new User();

// user.setUsername(signUpRequest.getUsername());
// user.setEmail(signUpRequest.getEmail());
// user.setPassword(encoder.encode(signUpRequest.getPassword()));
// user.setCountry(signUpRequest.getCountry());
// user.setCreatedAt(new Date());

// String strRole = signUpRequest.getRole().toLowerCase();
// if (strRole == null) {
// throw new RuntimeException("Error: Role is not found.");
// } else {
// switch (strRole) {
// case "admin":
// user.setRole(Roles.ROLE_ADMIN);
// break;
// case "approver":
// user.setRole(Roles.ROLE_APPROVER);
// break;
// case "vendor":
// user.setRole(Roles.ROLE_VENDOR);
// break;
// default:
// throw new RuntimeException("Error: Role is not found.");
// }
// }

// adminService.addUser(user);

// emailService.sendAccountCreationEmail(signUpRequest.getEmail(),
// signUpRequest.getUsername(), signUpRequest.getPassword());

// return ResponseEntity.ok(new MessageResponse("User registered
// successfully!"));
// }
// }
