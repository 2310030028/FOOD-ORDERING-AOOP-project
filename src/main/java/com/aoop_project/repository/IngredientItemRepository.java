package com.aoop_project.repository;

import com.aoop_project.model.IngredientsItem;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface IngredientItemRepository extends JpaRepository<IngredientsItem,Long> {

    List<IngredientsItem> findByRestaurantId(Long id);
}
