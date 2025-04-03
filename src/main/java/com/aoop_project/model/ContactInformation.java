package com.aoop_project.model;

import lombok.Data;

@Data
public class ContactInformation {
    private String email;
    private String mobile;
    private String twitter;
    private String instagram;

    public String getEmail() {
        return email;
    }

    public String getMobile() {
        return mobile;
    }

    public String getTwitter() {
        return twitter;
    }

    public String getInstagram() {
        return instagram;
    }
}
