package com.MyNotes.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.MyNotes.security.CustomUserDetailsService;


@Configuration
class AppConfig {
    @Bean
    public UserDetailsService userDetailsService() {
       return new CustomUserDetailsService();
//       UserDetails userDetails = User.builder().
//               username("DURGESH")
//               .password(passwordEncoder().encode("DURGESH")).roles("ADMIN").
//               build();
//       return new InMemoryUserDetailsManager(userDetails);

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }
    
    @Bean
	public ModelMapper getMapper() {
		return new ModelMapper();
	}
}