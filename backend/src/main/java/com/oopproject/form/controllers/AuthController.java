package com.oopproject.form.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oopproject.form.models.ERole;
import com.oopproject.form.models.Role;
import com.oopproject.form.models.User;
import com.oopproject.form.payload.request.LoginRequest;
import com.oopproject.form.payload.request.SignupRequest;
import com.oopproject.form.payload.response.JwtResponse;
import com.oopproject.form.payload.response.MessageResponse;
import com.oopproject.form.repositories.RoleRepository;
import com.oopproject.form.repositories.UserRepository;
import com.oopproject.form.security.jwt.JwtUtils;
import com.oopproject.form.services.UserDetailsImpl;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												userDetails.getId(), 
												userDetails.getUsername(), 
												userDetails.getEmail(), 
												roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), 
							signUpRequest.getEmail(),
							encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER);
			if (userRole == null) {
				throw new RuntimeException("Error: Role is not found.");
			}
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
						Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN);
					if (adminRole == null) {
						throw new RuntimeException("Error: Role is not found.");
					}
					roles.add(adminRole);

					break;
				case "vendor":
					Role vendorRole = roleRepository.findByName(ERole.ROLE_VENDOR);
					if (vendorRole == null) {
						throw new RuntimeException("Error: Role is not found.");
					}
					roles.add(vendorRole);

						break;
				case "approver":
					Role approverRole = roleRepository.findByName(ERole.ROLE_APPROVER);
					if (approverRole == null) {
						throw new RuntimeException("Error: Role is not found.");
					}
					roles.add(approverRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER);
						if (userRole == null) {
							throw new RuntimeException("Error: Role is not found.");
						}
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}
