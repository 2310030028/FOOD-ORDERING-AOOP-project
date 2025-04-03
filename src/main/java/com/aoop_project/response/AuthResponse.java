package com.aoop_project.response;

import com.aoop_project.model.USER_ROLE;
import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private String message;
    private USER_ROLE role;

    public void setJwt(String jwt) {
        this.jwt=jwt;
    }

    public void setMessage(String registrationSuccess) {
        this.message=registrationSuccess;
    }

    public void setRole(USER_ROLE role) {
        this.role=role;
    }
    // Getters and Setters
    public String getJwt() {
        return jwt;
    }

 

    public String getMessage() {
        return message;
    }


    public USER_ROLE getRole() {
        return role;
    }


}
