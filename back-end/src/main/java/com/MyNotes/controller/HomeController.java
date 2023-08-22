package com.MyNotes.controller;

import java.security.Principal;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.MyNotes.payloads.CategoryDto;
import com.MyNotes.payloads.UserDto;
import com.MyNotes.repository.UserRepository;
import com.MyNotes.service.CategoryService;
import com.MyNotes.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/user")
public class HomeController {

	@Autowired
	UserRepository repository;

	@Autowired
	ModelMapper mapper;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	UserService userService;

	@DeleteMapping("/deleteUser")
	public ResponseEntity<?> deleteUser(Principal principal) {
		String username = principal.getName();
		boolean delUser = userService.deleteUser(username);
		HttpStatus httpStatus = (delUser) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(delUser, httpStatus);
	}

	@GetMapping("/get")
	public ResponseEntity<?> getUser(Principal principal) {
		UserDto user = userService.getUser(principal.getName());
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	// doubt not completed...
	@PutMapping("/updateName")
	public ResponseEntity<?> updateName(@RequestBody String passedValue, Principal principal) {
		String message="";
		try {
			JsonNode jsonNode = new ObjectMapper().readTree(passedValue);
			message = jsonNode.get("name").asText();
		} catch (Exception e) {
			 System.out.println("Error processing JSON: " + e.getMessage());
		}
		String username = principal.getName();
		boolean delUser = userService.updateName(message, username);
		HttpStatus httpStatus = (delUser) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(delUser, httpStatus);
	}

	@PutMapping("/updatePassword")
	public ResponseEntity<?> updatePassword(@RequestBody String passedValue, Principal principal) {
		String message="";
		try {
			JsonNode jsonNode = new ObjectMapper().readTree(passedValue);
			message = jsonNode.get("password").asText();
		} catch (Exception e) {
			 System.out.println("Error processing JSON: " + e.getMessage());
		}
		String username = principal.getName();
		boolean delUser = userService.updatePassword(message, username);
		HttpStatus httpStatus = (delUser) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(delUser, httpStatus);
	}
	
	
	@Autowired
	CategoryService categoryService;
	
	@PostMapping("/addCategory")
	public ResponseEntity<?> addCategory(Principal principal,@RequestBody CategoryDto categoryDto){
		 boolean addCategory = categoryService.addCategory(principal.getName(),categoryDto);
		return new ResponseEntity<>(addCategory,HttpStatus.OK);
	}
	
	
	//check after adding notes .....
	@DeleteMapping("/deleteCategory")
	public ResponseEntity<?> deleteCategory(@RequestParam int id,Principal principal) {
		String username = principal.getName();
		boolean deleteCategory = categoryService.deleteCategory(id, username);
		HttpStatus httpStatus = (deleteCategory) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(deleteCategory, httpStatus);
	}

}
