package com.aoop_project.service;

import com.aoop_project.dto.RestaurantDto;
import com.aoop_project.model.Address;
import com.aoop_project.model.Restaurant;
import com.aoop_project.model.User;
import com.aoop_project.repository.AddressRepository;
import com.aoop_project.repository.RestaurantRepository;
import com.aoop_project.repository.UserRepository;
import com.aoop_project.request.CreateRestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImp implements RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;



    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest req, User user) {

        Address address=addressRepository.save(req.getAddress());

        Restaurant restaurant=new Restaurant();
        restaurant.setAddress(address);
        restaurant.setContactInformation(req.getContactInformation());

        restaurant.setCuisineType(req.getCuisineType());
        restaurant.setDescription(req.getDescription());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHours(req.getOpeningHours());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurant.setOwner(user);

        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception {
       Restaurant restaurant=findRestaurantById(restaurantId);

       if(restaurant.getCuisineType()!=null)
       {
           restaurant.setCuisineType(updatedRestaurant.getCuisineType());
       }

        if(restaurant.getDescription()!=null)
        {
            restaurant.setDescription(updatedRestaurant.getDescription());
        }

        if(restaurant.getName()!=null)
        {
            restaurant.setName(updatedRestaurant.getName());
        }

        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {
        Restaurant restaurant=findRestaurantById(restaurantId);
        restaurantRepository.delete(restaurant);

    }

    @Override
    public List<Restaurant> getAllRestaurant() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(Long id) throws Exception {
        Optional<Restaurant> opt=restaurantRepository.findById(id);
        if(opt.isEmpty())
        {
            throw new Exception("Restaurant Not found id"+id);
        }
        return opt.get();
    }

    @Override
    public Restaurant getRestaurantBydUserId(Long userId) throws Exception {
        Restaurant restaurant=restaurantRepository.findByOwnerId(userId);
        if(restaurant==null)
            throw new Exception("Restaurant not found with Owner Id "+userId);

        return restaurant;
    }

    @Override
    public RestaurantDto addToFavorites(Long restaurantId, User user) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        RestaurantDto dto = new RestaurantDto();

        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setTitle(restaurant.getName());
        dto.setId(restaurantId);

        boolean isFavourited = false;
        List<RestaurantDto> favourites = user.getFavourites();
        for (RestaurantDto favorite : favourites) {
            if (favorite.getId().equals(restaurantId)) {
                isFavourited = true;
                break;
            }
        }

// If the restaurant is already favourited, remove it; otherwise, add it to favorites
        if (isFavourited) {
            favourites.removeIf(favorite -> favorite.getId().equals(restaurantId));
        } else {
            favourites.add(dto);
        }
            userRepository.save(user);
            return dto;
        }


    @Override
    public Restaurant updateRestaurantStatus(Long id) throws Exception {
        Restaurant restaurant=findRestaurantById(id);
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);

    }
}
