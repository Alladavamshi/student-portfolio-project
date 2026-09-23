package com.example.studentportfoliobackend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.studentportfoliobackend.entity.Student;
import com.example.studentportfoliobackend.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // =========================
    // ADD STUDENT
    // =========================
    @PostMapping("/add")
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        return ResponseEntity.ok(studentService.saveStudent(student));
    }

    // =========================
    // GET ALL STUDENTS
    // =========================
    @GetMapping("/all")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    // =========================
    // GET STUDENT BY ID
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    // =========================
    // DELETE STUDENT (ADMIN ONLY)
    // =========================
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Student Deleted Successfully");
    }

    // =========================
    // UPDATE STUDENT
    // =========================
    @PutMapping("/update/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        return ResponseEntity.ok(studentService.updateStudent(id, student));
    }

    // =========================
    // UPLOAD IMAGE
    // =========================
    @PostMapping("/upload/{id}")
    public ResponseEntity<Student> uploadImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {

        return ResponseEntity.ok(studentService.uploadImage(id, file));
    }

    // =========================
    // GET IMAGE
    // =========================
    @GetMapping("/image/{fileName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String fileName) {
        return ResponseEntity.ok(studentService.getImage(fileName));
    }

    // =========================
    // DASHBOARD STATS
    // =========================
    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        return ResponseEntity.ok(studentService.getDashboardStats());
    }
    @GetMapping("/my-profile")
    public ResponseEntity<Student> getMyProfile() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return ResponseEntity.ok(
                studentService.getStudentByEmail(email)
        );
    }
}