package com.MyNotes.entity;

import java.util.LinkedList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String name;
	
	private String username;
	
	private String RegistrationDate;
	
	private String role;
	
	private String password;
	
	private String rawPassword;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
	@JsonManagedReference
	private List<Category> categories=new LinkedList<>();
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "belongsTo")
	@JsonManagedReference
	private List<TODO> todos=new LinkedList<>();
	 
}
