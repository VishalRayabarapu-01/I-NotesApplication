package com.MyNotes.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.MyNotes.payloads.NoteDto;
import com.MyNotes.payloads.UserDto;

@Service
public interface NoteService {

	public NoteDto addNote(NoteDto NoteDto);
	
	public boolean deleteNote(int noteId,UserDto user);
	
	public boolean updateNote(int noteId,NoteDto NoteDto,UserDto dto);
	
	public List<NoteDto> getNotes(UserDto user);
}
