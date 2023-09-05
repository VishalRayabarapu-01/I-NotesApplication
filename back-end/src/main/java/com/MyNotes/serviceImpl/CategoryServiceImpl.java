package com.MyNotes.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.MyNotes.entity.Category;
import com.MyNotes.entity.User;
import com.MyNotes.exceptions.CategoryException;
import com.MyNotes.payloads.CategoryDto;
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
		Category category = repository.findById(id).orElseThrow(
				() -> new CategoryException("deletion of category", "category doesn't exist", HttpStatus.NOT_FOUND));
		if (category.getUser().getUsername().equals(username)) {
			category.setUser(null);
			user.getCategories().remove(category);
			repository.delete(category);
		} else {
			throw new CategoryException("delete category", "of some issues Try again!!!", HttpStatus.BAD_REQUEST);
		}
		return true;
	}

	@Override
	public boolean updateCategoryName(String updateName, int id, String username) {
		Category category = repository.findById(id).orElseThrow(
				() -> new CategoryException("update category", "Category not found", HttpStatus.NOT_FOUND));
		User user = userRepository.findByUsername(username).get();
		user.getCategories().forEach((item) -> {
			if (item.getName().equals(updateName)) {
				throw new CategoryException("Updating category", "category already exist", HttpStatus.NOT_ACCEPTABLE);
			}
		});
		category.setName(updateName);
		Category updatedCategory = repository.save(category);
		if (updatedCategory.getName().equals(category.getName())) {
			return true;
		}
		return false;
	}

	@Override
	public List<CategoryDto> getCategories(String username) {
		return userRepository.findByUsername(username).get().getCategories().stream().map((category) -> {
			CategoryDto transformedCategory = mapper.map(category, CategoryDto.class);
			transformedCategory.setUser(null);
			return transformedCategory;
		}).collect(Collectors.toList());
	}

	@Override
	public CategoryDto getCategory(String cname, String username) {
		List<Category> collectedCategory = userRepository.findByUsername(username).get().getCategories().stream()
				.filter((category) -> category.getName().equals(cname)).collect(Collectors.toList());
		if(collectedCategory.isEmpty()) {
			throw new CategoryException("finding category","category name : "+cname+"doesn't exist!!",HttpStatus.NOT_FOUND);			
		}
		collectedCategory.get(0).setUser(null);
		return mapper.map(collectedCategory.get(0),CategoryDto.class) ;
	}

}
