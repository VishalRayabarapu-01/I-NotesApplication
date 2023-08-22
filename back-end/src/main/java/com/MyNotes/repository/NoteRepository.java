package com.MyNotes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MyNotes.entity.Note;

public interface NoteRepository extends JpaRepository<Note,Integer>{

}
