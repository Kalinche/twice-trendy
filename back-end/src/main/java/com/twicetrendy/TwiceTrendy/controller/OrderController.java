package com.twicetrendy.TwiceTrendy.controller;

import com.twicetrendy.TwiceTrendy.data.Order;
import com.twicetrendy.TwiceTrendy.dto.OrderDto;
import com.twicetrendy.TwiceTrendy.service.OrderService;
import com.twicetrendy.TwiceTrendy.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "")
@CrossOrigin
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    public OrderController(final OrderService orderService, final UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    //get all offers
    @GetMapping("/orders")
    public List<Order> get() throws Exception {
        return orderService.getAll();
    }

    //get offer by id
    @GetMapping("/order/{id}")
    public Order get(@PathVariable final Integer id) {
        try {
            return orderService.get(id);
        } catch (final NoSuchElementException e) {
            throw new IllegalArgumentException(
                    String.format("Order with ID %d not found.", id));
        }
    }

    @PostMapping("/order")
    public ResponseEntity<Void> create(@RequestBody final OrderDto offer) throws IOException {
//        if (offerService.get(offer.name).isPresent()) {
//            throw new IllegalArgumentException(
//                    String.format("An image with url '%s' already exists.",
//                            offer.name));
//        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
