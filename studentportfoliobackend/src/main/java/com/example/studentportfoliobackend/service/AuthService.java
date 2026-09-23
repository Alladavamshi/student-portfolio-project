package com.example.studentportfoliobackend.service;

import com.example.studentportfoliobackend.dto.JwtResponse;
import com.example.studentportfoliobackend.dto.LoginRequest;
import com.example.studentportfoliobackend.dto.RegisterRequest;
import com.example.studentportfoliobackend.entity.Role;
import com.example.studentportfoliobackend.entity.User;
import com.example.studentportfoliobackend.repository.UserRepository;
import com.example.studentportfoliobackend.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.UUID;
import com.example.studentportfoliobackend.entity.User;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // REGISTER
    public User register(RegisterRequest request) {

        if (userRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setRole(Role.STUDENT);

        return userRepo.save(user);
    }

    // LOGIN
    public JwtResponse login(LoginRequest request) {

        System.out.println("EMAIL = " + request.getEmail());

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid Email"));

        System.out.println("DB PASSWORD = " + user.getPassword());

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            System.out.println("PASSWORD NOT MATCHED");

            throw new RuntimeException("Invalid Password");
        }

        String token =
                jwtUtil.generateToken(user.getEmail());

        return new JwtResponse(
                token,
                user.getRole().name()
        );
    }
    
 // ===============================
 // FORGOT PASSWORD - STEP 1
 // Generate Reset Token
 // ===============================
 public String forgotPassword(String email) {

     User user = userRepo.findByEmail(email)
             .orElseThrow(() -> new RuntimeException("User not found"));

     // generate random token
     String token = UUID.randomUUID().toString();

     user.setResetToken(token);

     userRepo.save(user);

     // Normally you would send email here
     return token; // (for now return token to frontend)
 }

 // ===============================
 // RESET PASSWORD - STEP 2
 // ===============================
 public String resetPassword(String token, String newPassword) {

     User user = userRepo.findByResetToken(token)
             .orElseThrow(() -> new RuntimeException("Invalid token"));

     user.setPassword(passwordEncoder.encode(newPassword));

     // clear token after use
     user.setResetToken(null);

     userRepo.save(user);

     return "Password reset successful";
 }
}