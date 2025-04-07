package com.aoop_project.repository;

import com.aoop_project.model.Cart;
import com.aoop_project.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {



}
