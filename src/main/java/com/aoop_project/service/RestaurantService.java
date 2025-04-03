package com.aoop_project.service;

import com.aoop_project.dto.RestaurantDto;
import com.aoop_project.model.Restaurant;
import com.aoop_project.model.User;
import com.aoop_project.request.CreateRestaurantRequest;
import org.hibernate.sql.Update;

import java.util.List;

public interface RestaurantService {
    public Restaurant createRestaurant(CreateRestaurantRequest res, User user);

    public Restaurant updateRestaurant(Long restaurantId,CreateRestaurantRequest updatedRestaurant) throws Exception;

    public void deleteRestaurant(Long restaurantId ) throws  Exception;

    public List<Restaurant> getAllRestaurant();

    public List<Restaurant> searchRestaurant(String keyword);

    public Restaurant findRestaurantById(Long id) throws Exception;

    public Restaurant getRestaurantBydUserId(Long userId) throws Exception;

    public RestaurantDto addToFavorites(Long restaurantId,User user)throws Exception;

    public Restaurant updateRestaurantStatus(Long id) throws  Exception;
}
