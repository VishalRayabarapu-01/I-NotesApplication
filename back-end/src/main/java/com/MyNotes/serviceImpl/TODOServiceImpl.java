package com.MyNotes.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.MyNotes.entity.TODO;
import com.MyNotes.entity.User;
import com.MyNotes.exceptions.ResourceNotFoundException;
import com.MyNotes.payloads.TODODto;
import com.MyNotes.repository.TODORepository;
import com.MyNotes.repository.UserRepository;
import com.MyNotes.service.TODOService;

@Service
public class TODOServiceImpl implements TODOService {
	
	@Autowired
	UserRepository userRepository;

	@Autowired
	ModelMapper mapper;
	
	@Autowired
	TODORepository repository;
	
	@Override
	public boolean addTodo(String username,TODODto todoDto) {
		User user = userRepository.findByUsername(username).get();
		todoDto.setBelongsTo(user);
		todoDto.setIsCompleted("false");
		user.getTodos().add(mapper.map(todoDto,TODO.class));
		List<TODO> todos = userRepository.save(user).getTodos();
		for(TODO t: todos) {
			if(t.getDescription().equals(todoDto.getDescription())) {
				return true;
			}
		}
		return false;
	}

	@Override
	public boolean deleteTodo(int id,String username) {
		TODO todo = repository.findById(id).orElseThrow(()->new ResourceNotFoundException("At deleting note","proper id",id));
		User user = userRepository.findByUsername(username).get();
		todo.setBelongsTo(null);
		user.getTodos().remove(todo);
		repository.delete(todo);
		Optional<TODO> findById = repository.findById(id);
		if(findById.isPresent()) {
			return false;
		}
		return true;
	}

	@Override
	public boolean updateTodoDescription(TODODto todo) {
		TODO repoTodo = repository.findById(todo.getId()).orElseThrow(()->new ResourceNotFoundException("At deleting note","proper id",todo.getId()));
		repoTodo.setDescription(todo.getDescription());
		TODO savedTodo = repository.save(repoTodo);
		if(savedTodo.getDescription().equals(todo.getDescription())) {
			return true;
		}
		return false;
	}

	@Override
	public List<TODODto> getTodos(String usrname) {
		return userRepository.findByUsername(usrname).get().getTodos().stream().map((todo)->{
			return mapper.map(todo,TODODto.class);
		}).collect(Collectors.toList());
		
	}

	@Override
	public boolean updateTodoCompletion(TODODto todo) {
		TODO repoTodo = repository.findById(todo.getId()).orElseThrow(()->new ResourceNotFoundException("At deleting note","proper id",todo.getId()));
		repoTodo.setIsCompleted(todo.getIsCompleted());
		TODO savedTodo = repository.save(repoTodo);
		if(savedTodo.getIsCompleted().equals(todo.getIsCompleted())) {
			return true;
		}
		return false;
	}

}
