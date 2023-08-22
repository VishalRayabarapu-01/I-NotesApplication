package com.MyNotes.exceptions;

import org.springframework.http.HttpStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class CategoryException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;

	private String resourceName;
	
	private String field;
	
	private HttpStatus httpStatus;
	
	public CategoryException(String name,String field,HttpStatus status) {
		super(String.format("at %s occured because %s",name,field));
		this.field=field;
		resourceName=name;
		httpStatus=status;
	}
	

}
