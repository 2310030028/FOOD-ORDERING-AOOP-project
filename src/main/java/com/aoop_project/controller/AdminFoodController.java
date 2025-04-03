package com.aoop_project.controller;

import com.aoop_project.model.Food;
import com.aoop_project.model.Restaurant;
import com.aoop_project.model.User;
import com.aoop_project.request.CreateFoodRequest;
import com.aoop_project.response.MessageResponse;
import com.aoop_project.service.FoodService;
import com.aoop_project.service.RestaurantService;
import com.aoop_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {
   @Autowired
    private FoodService foodService;
   @Autowired
   private UserService userService;

   @Autowired
   private RestaurantService restaurantService;

   @PostMapping
   public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req, @RequestHeader("Authorization") String jwt) throws Exception{
       User user=userService.findUserByJwtToken(jwt);

       Restaurant restaurant=restaurantService.findRestaurantById(req.getRestaurantId());

       Food food= foodService.createFood(req,req.getCategory(),restaurant);
       return new ResponseEntity<>(food, HttpStatus.CREATED);

   }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteFood(@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws Exception{
        User user=userService.findUserByJwtToken(jwt);


      foodService.deleteFood(id);
      MessageResponse res=new MessageResponse();
      res.setMessage("Food Deleted Successfully");
        return new ResponseEntity<>(res, HttpStatus.CREATED);

    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFoodAvailability(@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws Exception{
        User user=userService.findUserByJwtToken(jwt);


        Food food=foodService.updateAvailabilityStatus(id);

        return new ResponseEntity<>(food, HttpStatus.CREATED);

    }
}
