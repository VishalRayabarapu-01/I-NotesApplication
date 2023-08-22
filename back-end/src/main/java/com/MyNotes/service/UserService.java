package com.MyNotes.service;
import org.springframework.stereotype.Service;

import com.MyNotes.payloads.UserDto;

@Service
public interface UserService {

	public UserDto addUser(UserDto UserDto);

	public boolean deleteUser(String username);
	
	public boolean updateName(String updatename,String username);
	
	public boolean updatePassword(String updatename,String username);

	public UserDto getUser(String username);

}
