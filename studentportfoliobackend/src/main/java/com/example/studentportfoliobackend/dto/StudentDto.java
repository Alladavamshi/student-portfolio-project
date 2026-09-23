package com.example.studentportfoliobackend.dto;


import lombok.Data;

@Data
public class StudentDto {

    private String name;
    private String email;
    private String phone;
    private String course;
    private String skills;
    private String about;
}