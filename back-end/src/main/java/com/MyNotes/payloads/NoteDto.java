package com.MyNotes.payloads;

import com.MyNotes.entity.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class NoteDto {
	
	private int id;

	private String title;

	private String content;

	private String createdDate;

	private String LastModifiedDate;

	private Category category;
}
