package com.twicetrendy.TwiceTrendy.service;

import com.twicetrendy.TwiceTrendy.data.Order;

import java.util.List;

public interface OrderService {
    Order get(int id);

    Order create(Order offer);

    Order update(Order offer);

    List<Order> getAll();

    void delete(int id);

    //void deleteAllOrdersWithUserId(int userId);

    List<Order> getOrdersWithUserId(int id);

    Order getOrderByProductAndUserId(int productId, int userId);

    List <Order> getOrdersWithProductId(int id);
}
