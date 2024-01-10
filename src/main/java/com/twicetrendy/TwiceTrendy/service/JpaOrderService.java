package com.twicetrendy.TwiceTrendy.service;

import com.twicetrendy.TwiceTrendy.data.Order;
import com.twicetrendy.TwiceTrendy.repository.JpaOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class JpaOrderService implements OrderService {

    private JpaOrderRepository repository;

    public JpaOrderService(JpaOrderRepository repository) {
        this.repository = repository;
    }

    //get an order by id
    @Override
    public Order get(int id) {
        Optional<Order> order = repository.findById(id);
        if (order.isPresent()) {
            return order.get();
        }
        throw new NoSuchElementException(
                "Order with ID: " + id + " was not found!");
    }

    //get an image by url
//    @Override
//    public Optional<Offer> get(String url) {
//        return repository.findByUrl(url);
//    }

    //create a new order
    @Override
    public Order create(Order order) {
        return repository.saveAndFlush(order);
    }

    //get all orders
    @Override
    public List<Order> getAll() {
        return repository.findAll();
    }

    //update a image
    @Override
    public Order update(Order order) {
        Order dbOrder = get(order.getId());
        // Check if url is modified and such url already exists.
//        if (!image.getUrl().equals(dbImage.getUrl()) &&
//                repository.findByUrl(image.getUrl()).isPresent()) {
//            throw new IllegalArgumentException(String.format(
//                    "An image with the specified url '%s' already exists.",
//                    image.getUrl()));
//        }
//
//        dbImage.setUrl(image.getUrl());
//        dbImage.setTimeAdded(image.getTimeAdded());
//        dbImage.setService(image.getService());
//        dbImage.setHeight(image.getHeight());
//        dbImage.setWidth(image.getWidth());
//        dbImage.setImageTags(image.getImageTags());
        repository.saveAndFlush(dbOrder);
        return dbOrder;
    }

    //delete an order by id
    @Override
    public void delete(int id) {
        repository.deleteById(id);
    }
}