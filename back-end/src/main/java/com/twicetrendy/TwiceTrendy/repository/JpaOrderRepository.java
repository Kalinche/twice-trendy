package com.twicetrendy.TwiceTrendy.repository;

import com.twicetrendy.TwiceTrendy.data.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaOrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findOrderById(final Integer id);
}
