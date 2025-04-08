package com.aoop_project.service;

import com.aoop_project.model.Order;
import com.aoop_project.model.User;
import com.aoop_project.request.OrderRequest;

import java.net.http.WebSocketHandshakeException;
import java.util.List;

public interface OrderService {
    public Order createOrder(OrderRequest order, User user) throws  Exception;

    public Order updateOrder(Long orderId,String orderStatus) throws Exception;

    public void cancelOrder(Long orderId) throws Exception;

    public List<Order> getUsersOrder(Long userId) throws Exception;
    public List<Order> getRestaurantsOrder(Long restaurantId,String orderStatus) throws Exception;

    public Order findOrderById (Long orderId) throws  Exception;
}
