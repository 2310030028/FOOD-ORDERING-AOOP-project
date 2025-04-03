package com.aoop_project.repository;

import com.aoop_project.model.IngredientsItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientItemRepository extends JpaRepository<IngredientsItem,Long> {
}
