package com.aoop.model;

import com.aoop.dto.RestaurantDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String password;
    private USER_ROLE role;

    @JsonIgnore//Ignoring this because whenever we are fetching the user we don't want to fetch the order
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "customer")//defining relation between user and order entity
    //using mapped by we are telling spring boot that we don't want to create separate table for every order
    private List<Order> orders = new ArrayList<>();

    @ElementCollection
    private List<RestaurantDto>favorites=new ArrayList<>();//to store favourite restaurant

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)//Defining relation between user and address entity
    //if the user gets deleted from database their address must also get removed
    private List<Address> addresses=new ArrayList<>(); //saving the address in the user profile
}
