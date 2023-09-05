package com.MyNotes.payloads;

import java.util.LinkedList;
import java.util.List;
import com.MyNotes.entity.Note;
import com.MyNotes.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class CategoryDto {
	
	private int id;

	private String name;

	private User user;

	private List<Note> notes = new LinkedList<>();
}
