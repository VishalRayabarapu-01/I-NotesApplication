package com.MyNotes.serviceImpl;

import java.util.Optional;
import java.time.LocalDate; 
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.MyNotes.entity.User;
import com.MyNotes.exceptions.UserException;
import com.MyNotes.payloads.UserDto;
import com.MyNotes.repository.UserRepository;
import com.MyNotes.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	UserRepository repository;
	
	@Autowired
	ModelMapper mapper;

	@Override
	public UserDto addUser(UserDto UserDto) {
		User checkUserPresent = this.checkUserPresent(UserDto.getUsername());
		if(checkUserPresent!=null) {
			throw new UserException("login","Username already exist...",HttpStatus.BAD_REQUEST);
		}
		User mappedUser = mapper.map(UserDto, User.class);
		mappedUser.setRawPassword(mappedUser.getPassword());
		mappedUser.setRole("USER");
		mappedUser.setRegistrationDate(""+LocalDate.now());
		mappedUser.setPassword(encoder.encode(mappedUser.getPassword()));		
		UserDto returnUser = mapper.map(repository.save(mappedUser), UserDto.getClass());
		returnUser.setPassword("");
		returnUser.setRegistrationDate("");
		return returnUser;
	}

	@Override
	public boolean deleteUser(String username) {
		User checkUserPresent = this.checkUserPresent(username);
		if(checkUserPresent!=null) {
			repository.delete(checkUserPresent);
			if(this.checkUserPresent(username)==null) {
				return true;
			}else {
				return false;
			}
		}
		else {
			return false;
		}
	}

	@Override
	public UserDto getUser(String username) {
		User user = repository.findByUsername(username).get();
		UserDto map = mapper.map(user,UserDto.class);
		map.setPassword(user.getRawPassword());
		map.setCategories(null);
		map.setTodos(null);
		return map;
	}
	
	public User checkUserPresent(String username) {
		Optional<User> findByUsername = repository.findByUsername(username);
		User user=null;
		if(findByUsername.isPresent()) {
			return findByUsername.get();
		}
		return user;
	}

	@Override
	public boolean updateName(String updatename,String username) {
		User user = this.checkUserPresent(username);
		if(user!=null) {
			user.setName(updatename);
			repository.save(user);
			return true;
		}
		return false;
	}

	@Override
	public boolean updatePassword(String updatename,String username) {
		User user = this.checkUserPresent(username);
		if(user!=null) {
			user.setRawPassword(updatename);
			user.setPassword(encoder.encode(updatename));
			repository.save(user);
			return true;
		}
		return false;
	}

}
