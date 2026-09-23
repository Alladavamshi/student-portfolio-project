package com.example.studentportfoliobackend.service;

import java.util.List;
import java.util.UUID;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.example.studentportfoliobackend.entity.Student;
import com.example.studentportfoliobackend.entity.Role;
import com.example.studentportfoliobackend.repository.StudentRepository;
import com.example.studentportfoliobackend.repository.UserRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    @Autowired
    private UserRepository userRepository;

    private final String UPLOAD_DIR = "uploads/";

    public Student saveStudent(Student student) {
        return repository.save(student);
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student getStudentById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }

    public Student updateStudent(Long id, Student student) {

        Student existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student Not Found"));

        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setPhone(student.getPhone());
        existing.setCourse(student.getCourse());
        existing.setSkills(student.getSkills());
        existing.setAbout(student.getAbout());
        existing.setImageName(student.getImageName());

        return repository.save(existing);
    }

    public Student uploadImage(Long id, MultipartFile file) {

        Student student = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        try {
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path path = Paths.get(UPLOAD_DIR, fileName);
            Files.write(path, file.getBytes());

            student.setImageName(fileName);

            return repository.save(student);

        } catch (Exception e) {
            throw new RuntimeException("Upload failed: " + e.getMessage());
        }
    }

    public byte[] getImage(String fileName) {
        try {
            Path path = Paths.get(UPLOAD_DIR, fileName);
            return Files.readAllBytes(path);
        } catch (IOException e) {
            throw new RuntimeException("Image not found");
        }
    }

    public Map<String, Long> getDashboardStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("students", repository.count());
        stats.put("admins", userRepository.countByRole(Role.ADMIN));
        stats.put("users", userRepository.countByRole(Role.STUDENT)); // FIXED

        return stats;
    }
    public Student getStudentByEmail(String email) {

        return repository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Student Not Found"));

    }
}