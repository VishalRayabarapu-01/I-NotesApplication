package com.MyNotes.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;

@ControllerAdvice
public class GlobalExceptionalController {
	
	@ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> exceptionHandler() {
        return new ResponseEntity<>("Credentials Invalid",HttpStatus.UNAUTHORIZED);
    }
	@ExceptionHandler(SignatureException.class)
    public ResponseEntity<?> exceptionHandl() {
        return new ResponseEntity<>("Signature with local computed signature",HttpStatus.UNAUTHORIZED);
    }

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<?> illegalArgs() {
        return new ResponseEntity<>("Illegal Argument while fetching the username !!",HttpStatus.BAD_REQUEST);
    }
	
	@ExceptionHandler(ExpiredJwtException.class)
	public ResponseEntity<?> expiredToken() {
        return new ResponseEntity<>("Given jwt token is expired !!",HttpStatus.BAD_REQUEST);
    }
	
	@ExceptionHandler(MalformedJwtException.class)
	public ResponseEntity<?> changedToken() {
        return new ResponseEntity<>("Some changed has done in token !! Invalid Token",HttpStatus.BAD_REQUEST);
    }
	
	@ExceptionHandler(UserException.class)
	public ResponseEntity<?> userException(UserException exception) {
        return new ResponseEntity<>(exception.getMessage(),exception.getHttpStatus());
    }
	
	@ExceptionHandler(CategoryException.class)
	public ResponseEntity<?> categoryException(CategoryException exception) {
        return new ResponseEntity<>(exception.getMessage(),exception.getHttpStatus());
    }
	
	
}
