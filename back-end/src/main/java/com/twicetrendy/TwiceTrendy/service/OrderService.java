package com.twicetrendy.TwiceTrendy.service;

import com.twicetrendy.TwiceTrendy.data.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    Order get(int id);

    Order create(Order offer);

    Order update(Order offer);

    List<Order> getAll();

    void delete(int id);

    Optional<Order> getOrderByProductAndUserId(int productId, int userId);
}
