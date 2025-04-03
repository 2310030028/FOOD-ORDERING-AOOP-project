package com.aoop_project.response;

import lombok.Data;

@Data
public class MessageResponse {


    private String message;

    public void setMessage(String restaurantDeletedSuccessfully) {
        this.message=restaurantDeletedSuccessfully;
    }
}
