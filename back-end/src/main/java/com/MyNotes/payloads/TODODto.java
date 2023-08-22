package com.MyNotes.payloads;

import com.MyNotes.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class TODODto {
	
	private int id;

	private String title;
	
	private String description;
	
	private String isCompleted;
	
	private User belongsTo;
}
