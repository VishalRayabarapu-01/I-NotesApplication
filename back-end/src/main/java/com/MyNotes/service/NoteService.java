package com.MyNotes.service;

import org.springframework.stereotype.Service;

import com.MyNotes.payloads.NoteDto;

@Service
public interface NoteService {

	public boolean addNote(String username,String categoryName,NoteDto NoteDto);
	
	public boolean deleteNote(int noteId,String username,String cname);
	
	public boolean updateTitle(int noteId,String title);
	
	public boolean updateContent(int noteId,String content);
	
	public NoteDto getNote(int noteId);
}
