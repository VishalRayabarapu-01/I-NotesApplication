package com.MyNotes.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.MyNotes.payloads.CategoryDto;
import com.MyNotes.payloads.UserDto;

@Service
public interface CategoryService {

	public boolean addCategory(String username,CategoryDto categoryDto);
	
	public boolean deleteCategory(int id,String username);
	
	public boolean updateCategoryName(String updateName,int id,String username);
	
	public List<CategoryDto> getCateory(UserDto user);
}
