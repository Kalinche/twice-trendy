package com.twicetrendy.TwiceTrendy.service;

import com.twicetrendy.TwiceTrendy.data.Order;
import com.twicetrendy.TwiceTrendy.repository.JpaOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JpaOrderService implements OrderService {

    private final JpaOrderRepository repository;

    public JpaOrderService(JpaOrderRepository repository) {
        this.repository = repository;
    }

    //get an order by id
    @Override
    public Order get(int id) {
        Optional<Order> order = repository.findById(id);
        if (order.isPresent()) {
            Order o = order.get();
            o.setIdUser();
            o.setIdProduct();
            return o;
        }
        return null;
    }

    //create a new order
    @Override
    public Order create(Order order) {
        Order o =repository.saveAndFlush(order);
        o.setIdProduct();
        o.setIdUser();
        return o;
    }

    //get all orders
    @Override
    public List<Order> getAll() {
        List<Order> orders = repository.findAll();
        for (Order o : orders) {
            o.setIdUser();
            o.setIdProduct();
        }
        return orders;
    }

    //update a image
    @Override
    public Order update(Order order) {
        Order dbOrder = get(order.getId());
        repository.saveAndFlush(dbOrder);
        dbOrder.setIdProduct();
        dbOrder.setIdUser();
        return dbOrder;
    }

    //delete an order by id
    @Override
    public void delete(int id) {
        repository.deleteById(id);
    }

    @Override
    public List<Order> getOrdersWithUserId(int id) {
        List<Order> orders = repository.findOrderByUserId(id);
        for (Order o : orders) {
            o.setIdUser();
            o.setIdProduct();
        }
        return orders;
    }

    @Override
    public Order getOrderByProductAndUserId(int productId, int userId) {
        Optional<Order> order = repository.findOrderByProductIdAndUserId(productId, userId);
        if (order.isEmpty()) {
            return null;
        }
        Order o = order.get();
        o.setIdProduct();
        o.setIdUser();
        return o;
    }

    @Override
    public List<Order> getOrdersWithProductId(int id) {
        List<Order> orders = repository.findOrderByProductId(id);
        for (Order o : orders) {
            o.setIdUser();
            o.setIdProduct();
        }
        return orders;
    }
}
