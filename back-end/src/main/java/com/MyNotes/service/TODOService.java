package com.MyNotes.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.MyNotes.payloads.TODODto;

@Service
public interface TODOService {

	public boolean addTodo(String username,TODODto TodoDto);

	public boolean deleteTodo(int id,String username);

	public boolean updateTodoDescription(TODODto dto);
	
	public boolean updateTodoCompletion(TODODto dto);
	
	public List<TODODto> getTodos(String username);
	
	

}
