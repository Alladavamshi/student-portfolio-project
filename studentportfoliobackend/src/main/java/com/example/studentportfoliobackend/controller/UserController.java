package com.example.studentportfoliobackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.studentportfoliobackend.entity.Role;
import com.example.studentportfoliobackend.entity.User;
import com.example.studentportfoliobackend.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User Deleted Successfully";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/role/{id}")
    public User changeRole(
            @PathVariable Long id,
            @RequestParam Role role) {

        return userService.changeRole(id, role);
    }
}