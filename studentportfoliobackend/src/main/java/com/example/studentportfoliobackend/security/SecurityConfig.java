package com.example.studentportfoliobackend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
public class SecurityConfig {


@Autowired
private JwtAuthenticationFilter jwtFilter;

@Autowired
private OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http
        .csrf(csrf -> csrf.disable())

        .cors(cors -> {})

        .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

        .authorizeHttpRequests(auth -> auth

            .requestMatchers("/auth/**").permitAll()

            .requestMatchers("/oauth2/**").permitAll()

            .requestMatchers("/login/**").permitAll()

            .requestMatchers("/student/image/**").permitAll()

            .requestMatchers("/student/upload/**").authenticated()

            .requestMatchers("/student/**").authenticated()

            .anyRequest().authenticated()
        )

        .oauth2Login(oauth -> oauth
        	    .successHandler(oAuth2LoginSuccessHandler)
        	)

        .addFilterBefore(
            jwtFilter,
            UsernamePasswordAuthenticationFilter.class
        );

    return http.build();
}

@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

@Bean
public AuthenticationManager authenticationManager(
        AuthenticationConfiguration config)
        throws Exception {

    return config.getAuthenticationManager();
}


}
