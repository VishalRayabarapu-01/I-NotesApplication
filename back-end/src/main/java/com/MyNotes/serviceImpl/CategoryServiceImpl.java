package com.MyNotes.serviceImpl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.MyNotes.entity.Category;
import com.MyNotes.entity.User;
import com.MyNotes.exceptions.CategoryException;
import com.MyNotes.payloads.CategoryDto;
import com.MyNotes.payloads.UserDto;
import com.MyNotes.repository.CategoryRepository;
import com.MyNotes.repository.UserRepository;
import com.MyNotes.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	ModelMapper mapper;

	@Autowired
	CategoryRepository repository;

	@Autowired
	UserRepository userRepository;

	@Override
	public boolean addCategory(String username, CategoryDto categoryDto) {
		User user = userRepository.findByUsername(username).get();
		user.getCategories().forEach((category) -> {
			if (category.getName().equals(categoryDto.getName())) {
				throw new CategoryException("adding category", "category already exist", HttpStatus.NOT_ACCEPTABLE);
			}
		});
		Category map = mapper.map(categoryDto, Category.class);
		map.setUser(user);
		user.getCategories().add(map);

		List<Category> categories = userRepository.save(user).getCategories();
		for (Category c : categories) {
			if (c.getName().equals(categoryDto.getName())) {
				// checks the category is added or not.
				return true;
			}
		}
		return false;
	}

	@Override
	public boolean deleteCategory(int id, String username) {
		User user = userRepository.findByUsername(username).get();
		Category category = repository.findById(id).get();
		if (category.getUser().getUsername().equals(username)) {
			category.setUser(null);
			user.getCategories().remove(category);
			repository.delete(category);
		} else {
			throw new CategoryException("delete category","of some issues Try again!!!",HttpStatus.BAD_REQUEST);
		}
		return true;
	}

	@Override
	public boolean updateCategoryName(String updateName, int id,String username) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<CategoryDto> getCateory(UserDto user) {
		// TODO Auto-generated method stub
		return null;
	}

}
