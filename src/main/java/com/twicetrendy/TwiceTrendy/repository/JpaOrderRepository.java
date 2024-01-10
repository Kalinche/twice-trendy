package com.twicetrendy.TwiceTrendy.repository;

import com.twicetrendy.TwiceTrendy.data.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JpaOrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findOrderById(final Integer id);
}
