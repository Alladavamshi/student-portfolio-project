package com.example.studentportfoliobackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.studentportfoliobackend.entity.Role;
import com.example.studentportfoliobackend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    long countByRole(Role role);

    // FOR FORGOT PASSWORD
    Optional<User> findByResetToken(String resetToken);
}