package com.MyNotes.controller;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.MyNotes.payloads.CategoryDto;
import com.MyNotes.payloads.NoteDto;
import com.MyNotes.payloads.TODODto;
import com.MyNotes.payloads.UserDto;
import com.MyNotes.repository.UserRepository;
import com.MyNotes.service.CategoryService;
import com.MyNotes.service.NoteService;
import com.MyNotes.service.TODOService;
import com.MyNotes.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
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
		String message = "";
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
		String message = "";
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

	// adding category requires only a name .
	@PostMapping("/addCategory")
	public ResponseEntity<?> addCategory(Principal principal, @RequestBody CategoryDto categoryDto) {
		boolean addCategory = categoryService.addCategory(principal.getName(), categoryDto);
		return new ResponseEntity<>(addCategory, HttpStatus.CREATED);
	}

	// checked after adding notes .....
	// when deleting categories we also delete all notes related to the
	// categories...
	@DeleteMapping("/deleteCategory")
	public ResponseEntity<?> deleteCategory(@RequestParam int id, Principal principal) {
		String username = principal.getName();
		boolean deleteCategory = categoryService.deleteCategory(id, username);
		HttpStatus httpStatus = (deleteCategory) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(deleteCategory, httpStatus);
	}

	@PutMapping("/updateCategory")
	public ResponseEntity<?> updateCategory(@RequestBody CategoryDto categoryDto, Principal principal) {
		boolean result = categoryService.updateCategoryName(categoryDto.getName(), categoryDto.getId(),
				principal.getName());
		HttpStatus httpStatus = (result) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(result, httpStatus);
	}

	@GetMapping("/getCategories")
	public ResponseEntity<?> getCategories(Principal principal) {
		List<CategoryDto> categories = categoryService.getCategories(principal.getName());
		return new ResponseEntity<>(categories, HttpStatus.OK);
	}

	@GetMapping("/getCategory")
	public ResponseEntity<?> getCategory(@RequestBody CategoryDto categoryDto, Principal principal) {
		CategoryDto category = categoryService.getCategory(categoryDto.getName(), principal.getName());
		return new ResponseEntity<>(category, HttpStatus.OK);
	}

	@Autowired
	NoteService noteService;

	// for adding a note we require categoryName and note title and note content.
	@PostMapping("/addNote")
	public ResponseEntity<?> addNote(Principal principal, @RequestBody NoteDto dto, HttpServletRequest request) {
		boolean addNote = noteService.addNote(principal.getName(), request.getHeader("CategoryName"), dto);
		HttpStatus httpStatus = (addNote) ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(addNote, httpStatus);
	}

	@DeleteMapping("/deleteNote")
	public ResponseEntity<?> delNote(Principal principal, @RequestParam int id, @RequestParam String categoryName) {
		boolean deleteNote = noteService.deleteNote(id, principal.getName(), categoryName);
		HttpStatus httpStatus = (deleteNote) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(deleteNote, httpStatus);
	}

	@GetMapping("/getNote")
	public ResponseEntity<?> getNote(@RequestBody NoteDto dto) {
		NoteDto note = noteService.getNote(dto.getId());
		return new ResponseEntity<>(note, HttpStatus.OK);
	}

	@PutMapping("/updateNoteTitle")
	public ResponseEntity<?> updateNoteTitle(@RequestBody NoteDto noteDto) {
		boolean updateTitle = noteService.updateTitle(noteDto.getId(), noteDto.getTitle());
		HttpStatus httpStatus = (updateTitle) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(updateTitle, httpStatus);
	}

	@PutMapping("/updateNoteContent")
	public ResponseEntity<?> updateNoteContent(@RequestBody NoteDto noteDto) {
		boolean updateContent = noteService.updateContent(noteDto.getId(), noteDto.getContent());
		HttpStatus httpStatus = (updateContent) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(updateContent, httpStatus);
	}

	@Autowired
	TODOService todoService;

	@PostMapping("/addTodo")
	public ResponseEntity<?> addTodo(Principal principal, @RequestBody TODODto dto) {
		boolean addTodo = todoService.addTodo(principal.getName(), dto);
		HttpStatus httpStatus = (addTodo) ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(addTodo, httpStatus);
	}

	@DeleteMapping("/deleteTodo")
	public ResponseEntity<?> deleteTodo(Principal principal, @RequestParam int id) {
		boolean deleteTodo = todoService.deleteTodo(id, principal.getName());
		HttpStatus httpStatus = (deleteTodo) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(deleteTodo, httpStatus);
	}

	@GetMapping("/getTodos")
	public ResponseEntity<?> getTodos(Principal principal) {
		List<TODODto> todos = todoService.getTodos(principal.getName()).stream().map((todo) -> {
			todo.setBelongsTo(null);
			return todo;
		}).collect(Collectors.toList());
		return new ResponseEntity<>(todos, HttpStatus.OK);
	}

	// send id and description.
	@PutMapping("/updateTodoDescription")
	public ResponseEntity<?> updateTodo(@RequestBody TODODto dto) {
		boolean updateTodoDescription = todoService.updateTodoDescription(dto);
		HttpStatus httpStatus = (updateTodoDescription) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(updateTodoDescription, httpStatus);
	}

	// send id and iscompletedValue.
	@PutMapping("/updateTodoCompletion")
	public ResponseEntity<?> updateTodoCompletion(@RequestBody TODODto dto) {
		boolean updateTodoCompletion = todoService.updateTodoCompletion(dto);
		HttpStatus httpStatus = (updateTodoCompletion) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(updateTodoCompletion, httpStatus);
	}

}
