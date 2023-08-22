package com.MyNotes.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.MyNotes.payloads.TODODto;
import com.MyNotes.payloads.UserDto;

@Service
public interface TODOService {

	public TODODto addTodo(TODODto TodoDto);

	public boolean deleteTodo(String title,UserDto user);

	public boolean updateTodo(int todoId,TODODto todo, UserDto dto);

	public List<TODODto> getTodos(UserDto user);
	
	

}
