package com.MyNotes.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.MyNotes.entity.Category;
import com.MyNotes.entity.Note;
import com.MyNotes.entity.User;
import com.MyNotes.exceptions.CategoryException;
import com.MyNotes.exceptions.ResourceNotFoundException;
import com.MyNotes.payloads.NoteDto;
import com.MyNotes.repository.CategoryRepository;
import com.MyNotes.repository.NoteRepository;
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

	@Autowired
	NoteRepository repository;

	@Override
	public boolean addNote(String username, String categoryName, NoteDto noteDto) {
		User user = userRepository.findByUsername(username).get();
		Category category=null;
		List<Category> categories = user.getCategories();
		for(Category c: categories) {
			if(c.getName().equals(categoryName)) {
				category=c;
				break;
			}
		}
		noteDto.setCreatedDate(LocalDate.now() + "");
		if (category == null) {
			throw new CategoryException("Category","Category doesn't exist", HttpStatus.BAD_REQUEST);
		} else {
			noteDto.setCategory(category);
			Note map = mapper.map(noteDto, Note.class);
			category.getNotes().add(map);
			categoryRepository.save(category);
		}
		return true;
	}

	@Override
	public boolean deleteNote(int noteId, String username, String categoryName) {
		Note note = checkNotePresent(noteId, categoryName, username);
		if (note == null) {
			throw new ResourceNotFoundException("note id", "particular note id", noteId);
		} else {
			note.setCategory(null);
			userRepository.findByUsername(username).get().getCategories().forEach(category -> {
				if (category.getName().equals(categoryName)) {
					category.getNotes().remove(note);
				}
			});
			repository.delete(note);
		}
		return true;
	}

	@Override
	public boolean updateTitle(int noteId, String title) {
		Optional<Note> optionalNote = repository.findById(noteId);
		if(optionalNote.isEmpty()) {
			throw new ResourceNotFoundException("In modifying note","Note id",noteId);
		}else {
			Note note = optionalNote.get();
			note.setTitle(title);
			note.setLastModifiedDate(LocalDate.now()+"");
			repository.save(note);
		}
		return true;
	}

	
	@Override
	public boolean updateContent(int noteId, String content) {
		Optional<Note> optionalNote = repository.findById(noteId);
		if(optionalNote.isEmpty()) {
			throw new ResourceNotFoundException("In modifying note","Note id",noteId);
		}else {
			Note note = optionalNote.get();
			note.setContent(content);
			note.setLastModifiedDate(LocalDate.now()+"");
			repository.save(note);
		}
		return true;
	}

	@Override
	public NoteDto getNote(int nId) {
		Optional<Note> note = repository.findById(nId);
		if(note.isEmpty()) {
			throw new ResourceNotFoundException("Notes","id",nId);
		}else {
			Note note2 = note.get();
			note2.setCategory(null);
			return mapper.map(note2,NoteDto.class);
		}
	}

	public Note checkNotePresent(int noteId, String categoryName, String username) {
		Category categoryObj = null;
		List<Category> categories = userRepository.findByUsername(username).get().getCategories();
		for (Category c : categories) {
			if (c.getName().equals(categoryName)) {
				categoryObj = c;
			}
		}
		if (categoryObj == null) {
			throw new CategoryException("finding category", "category name not exist !!!", HttpStatus.BAD_REQUEST);
		} else {
			List<Note> notes = categoryObj.getNotes();
			for (Note n : notes) {
				if ((n.getId() + "").equals(noteId + "")) {
					return n;
				}
			}
		}
		return null;
	}

}
