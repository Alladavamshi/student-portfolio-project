package com.example.studentportfoliobackend.security;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.example.studentportfoliobackend.entity.Role;
import com.example.studentportfoliobackend.entity.User;
import com.example.studentportfoliobackend.repository.UserRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuth2LoginSuccessHandler
        implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public OAuth2LoginSuccessHandler(
            JwtUtil jwtUtil,
            UserRepository userRepository) {

        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException, ServletException {

        OAuth2User oAuth2User =
                (OAuth2User) authentication.getPrincipal();

        String email =
                oAuth2User.getAttribute("email");

        String name =
                oAuth2User.getAttribute("name");

        // Save user first time login
        if (!userRepository.existsByEmail(email)) {

            User user = new User();

            user.setName(name);
            user.setEmail(email);

            user.setPassword("GOOGLE_LOGIN");

            user.setRole(Role.STUDENT);

            userRepository.save(user);
        }

        String token =
                jwtUtil.generateToken(email);

        response.sendRedirect(
                "http://localhost:3000/oauth-success?token="
                        + token
        );
    }
}