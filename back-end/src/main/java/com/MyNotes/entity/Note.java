package com.MyNotes.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Note {

	@Id
	private int id;
	
	private String title;
	
	private String content;
	
	private String createdDate;
	
	private String LastModifiedDate;
	
	@ManyToOne
	@JsonBackReference
	private Category category;
}
