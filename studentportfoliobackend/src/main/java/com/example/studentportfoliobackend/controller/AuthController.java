package com.example.studentportfoliobackend.controller;

import com.example.studentportfoliobackend.dto.JwtResponse;
import com.example.studentportfoliobackend.dto.LoginRequest;
import com.example.studentportfoliobackend.dto.RegisterRequest;
import com.example.studentportfoliobackend.entity.User;
import com.example.studentportfoliobackend.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public User register(
            @Valid @RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public JwtResponse login(
            @Valid @RequestBody LoginRequest request) {

        return authService.login(request);
    }
    
    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");

        return authService.forgotPassword(email);
    }
    
    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody Map<String, String> request) {

        String token = request.get("token");
        String newPassword = request.get("newPassword");

        return authService.resetPassword(token, newPassword);
    }
}