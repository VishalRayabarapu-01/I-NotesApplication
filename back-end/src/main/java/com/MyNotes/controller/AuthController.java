package com.MyNotes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MyNotes.payloads.UserDto;
import com.MyNotes.security.JwtHelper;
import com.MyNotes.security.JwtRequest;
import com.MyNotes.security.JwtResponse;
import com.MyNotes.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtHelper helper;
    
    //used to show the message to console.
    //private Logger logger = LoggerFactory.getLogger(AuthController.class);


    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        this.doAuthenticate(request.getEmail(), request.getPassword());


        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = this.helper.generateToken(userDetails);

//        JwtResponse response = JwtResponse.builder()
//                .jwtToken(token)
//                .username(userDetails.getUsername()).build();
        
        JwtResponse r=new JwtResponse(token,userDetails.getUsername());
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }

    }

    
	@Autowired
	UserService userService;
    
    @PostMapping("/add")
	public ResponseEntity<?> vv(@RequestBody UserDto dto) {
		UserDto addUser = userService.addUser(dto);
		return new ResponseEntity<>(addUser,HttpStatus.CREATED);
	}
    
    
}
