package com.MyNotes.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.MyNotes.entity.User;
import com.MyNotes.exceptions.ResourceNotFoundException;
import com.MyNotes.repository.UserRepository;


public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user;
		
		Optional<User> optionalUser = userRepository.findByUsername(username);
		
		if(optionalUser.isEmpty()) {
			user = null;
			throw new ResourceNotFoundException("User"," correct username,No.of users ",0);
		}else {
			user=optionalUser.get();
		}
		CustomUserDetails customUserDetails=new CustomUserDetails(user);
		return  customUserDetails;
	}

}
