package com.example.studentportfoliobackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {

    private String token;
    private String role;
	public JwtResponse() {
		super();
	}
	public JwtResponse(String token, String role) {
		super();
		this.token = token;
		this.role = role;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "JwtResponse [token=" + token + ", role=" + role + "]";
	}
    
}
