package com.MyNotes.exceptions;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class ResourceNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	String resourceName;
	String fieldName;
	long value;

	public ResourceNotFoundException(String resourceName, String fieldName, long value) {
		super(String.format("%s not found with %s : %s", resourceName, fieldName, value));
		this.resourceName = resourceName;
		this.fieldName = fieldName;
		this.value = value;
	}

}
