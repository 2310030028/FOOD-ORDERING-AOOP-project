package com.aoop_project.model;


import com.aoop_project.dto.RestaurantDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
//Getting data from database
@Data
//getter setter method
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;//automatically generates the id

    private String fullName;

    private String email;

    @JsonProperty(access=JsonProperty.Access.WRITE_ONLY)
    private String password;


    private USER_ROLE role = USER_ROLE.ROLE_CUSTOMER;

    @JsonIgnore//Ignoring this because whenever we are fetching the user we don't want to fetch the order
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "customer")//defining relation between user and order entity
    //using mapped by we are telling spring boot that we don't want to create separate table for every order
    private List<Order> orders = new ArrayList<>();

    @ElementCollection
    private List<RestaurantDto>favorites=new ArrayList<>();//to store favourite restaurant

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)//Defining relation between user and address entity
    //if the user gets deleted from database their address must also get removed
    private List<Address> addresses=new ArrayList<>(); //saving the address in the user profile


    public USER_ROLE getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email=email;
    }
    public void setPassword(String password) {
        this.password=password;
    }
    public void setRole(USER_ROLE role) {
        this.role=role;
    }

    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName= fullName;
    }
    public List<RestaurantDto> getFavourites() {
        return favorites;
    }
    public Long getId() {
        return id;
    }
    public List<Address> getAddresses() {
        return addresses;
    }


}
