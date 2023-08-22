package com.MyNotes.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.MyNotes.payloads.CategoryDto;

@Service
public interface CategoryService {

	public boolean addCategory(String username,CategoryDto categoryDto);
	
	public boolean deleteCategory(int id,String username);
	
	public boolean updateCategoryName(String updateName,int id,String username);
	
	public List<CategoryDto> getCategories(String username);
	
	public CategoryDto getCategory(String name,String username);
}
