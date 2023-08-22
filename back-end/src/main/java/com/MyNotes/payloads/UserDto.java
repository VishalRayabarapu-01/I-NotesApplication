package com.MyNotes.payloads;

import java.util.LinkedList;
import java.util.List;
import com.MyNotes.entity.Category;
import com.MyNotes.entity.TODO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UserDto {

	private String name;

	private String username;

	private String RegistrationDate;

	private String password;

	private List<Category> categories = new LinkedList<>();

	private List<TODO> todos = new LinkedList<>();
}
