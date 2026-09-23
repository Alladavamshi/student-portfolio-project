package com.example.studentportfoliobackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.studentportfoliobackend.entity.Role;
import com.example.studentportfoliobackend.entity.User;
import com.example.studentportfoliobackend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User changeRole(Long id, Role role) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        user.setRole(role);

        return userRepository.save(user);
    }
}