package com.MyNotes.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.MyNotes.entity.Category;
import com.MyNotes.entity.Note;
import com.MyNotes.entity.User;
import com.MyNotes.payloads.NoteDto;
import com.MyNotes.payloads.UserDto;
import com.MyNotes.repository.CategoryRepository;
import com.MyNotes.repository.UserRepository;
import com.MyNotes.service.NoteService;

@Service
public class NoteServiceImpl implements NoteService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ModelMapper mapper;
	
	@Autowired
	CategoryRepository categoryRepository;

	@Override
	public boolean addNote(String username, String categoryName, NoteDto noteDto) {
		User user = userRepository.findByUsername(username).get();
		List<Category> collect = user.getCategories().stream().filter(cat -> cat.getName().equals(categoryName)).collect(Collectors.toList());
		noteDto.setCreatedDate(LocalDate.now()+"");
		Category category ;
		if(collect.isEmpty()) {
			category=null;
		}else {
			category = collect.get(0);
		}
		if(category==null) {
			category=new Category();
			category.setName("default");
			category.setUser(user);
			noteDto.setCategory(category);
			category.getNotes().add(mapper.map(noteDto, Note.class));
			category.getUser().getCategories().add(category);
			categoryRepository.save(category);
		}else {
			noteDto.setCategory(category);
			Note map = mapper.map(noteDto, Note.class);
			category.getNotes().add(map);
			categoryRepository.save(category);
		}
		return true;
	}

	@Override
	public boolean deleteNote(int noteId, UserDto user) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean updateNote(int noteId, NoteDto NoteDto, UserDto dto) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<NoteDto> getNotes(UserDto user) {
		// TODO Auto-generated method stub
		return null;
	}

}
