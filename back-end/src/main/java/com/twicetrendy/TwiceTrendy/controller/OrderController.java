package com.twicetrendy.TwiceTrendy.controller;

import com.twicetrendy.TwiceTrendy.data.Order;
import com.twicetrendy.TwiceTrendy.data.Product;
import com.twicetrendy.TwiceTrendy.data.User;
import com.twicetrendy.TwiceTrendy.dto.OrderDto;
import com.twicetrendy.TwiceTrendy.service.OrderService;
import com.twicetrendy.TwiceTrendy.service.ProductService;
import com.twicetrendy.TwiceTrendy.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.twicetrendy.TwiceTrendy.controller.ResponseHandler.*;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequestMapping(value = "")
@CrossOrigin
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final ProductService productService;

    public OrderController(final OrderService orderService, final UserService userService, final ProductService productService) {
        this.orderService = orderService;
        this.userService = userService;
        this.productService = productService;
    }

    //get all orders
    @GetMapping("/orders")
    public ResponseEntity<Object> getOrders() {
        List<Order> dbOrders = orderService.getAll();
        if (dbOrders.isEmpty()) {
            return handleNotFound("There are no orders saved");
        } else {
            return generateResponseWithData("Orders were found successfully", HttpStatus.OK, dbOrders);
        }
    }

    //get order by id
    @GetMapping("/order/{id}")
    public ResponseEntity<Object> get(@PathVariable final Integer id) {
        Order dbOrder = orderService.get(id);
        if (dbOrder != null) {
            return generateResponseWithData("Order was found successfully", HttpStatus.OK, dbOrder);
        } else {
            return handleNotFound("There is no order with such id");
        }
    }

    @PostMapping("/orders")
    public ResponseEntity<Object> create(@RequestBody final OrderDto order) throws IOException {
        if (orderService.getOrderByProductAndUserId(order.productId, order.userId).isPresent()) {
            return handleNotAcceptable("There is already such an order");
        }
        //find user by userid
        User user = userService.get(order.userId);
        //TO DO : check if the product is already ordered, if not - write in the db that it's ordered

        //find product by productid
        Product product = productService.get(order.productId);
        product.setStatus("Sold");
        productService.updateOrderedProduct(product);

        Order createdOrder = orderService.create(new Order(user, product, order.address));

        return generateResponseWithData("Order was created successfully", HttpStatus.OK, createdOrder);
    }

//order request:
//{
//    "userId": 2,
//    "productId": 2,
//    "address": "Kumata 87, Sofia"
//}

    @GetMapping("/orders/user/{id}")
    public ResponseEntity<Object> getOrdersByUserId(@PathVariable final Integer id) {
        List<Order> dbOrders = orderService.getOrdersWithUserId(id);
        if (dbOrders.isEmpty()) {
            return generateGeneralResponse("This user has made no orders", NO_CONTENT);
        } else {
            return generateResponseWithData(String.format("Orders of user with id %d were found successfully", id),
                    HttpStatus.OK, dbOrders);
        }
    }

    @GetMapping("/orders/product/{id}")
    public ResponseEntity<Object> getOrdersByProductId(@PathVariable final Integer id) {
        List<Order> dbOrders = orderService.getOrdersWithProductId(id);
        if (dbOrders.isEmpty()) {
            return generateGeneralResponse("This product has made no orders", NO_CONTENT);
        } else {
            return generateResponseWithData(String.format("Orders of product with id %d were found successfully", id),
                    HttpStatus.OK, dbOrders);
        }
    }

    @DeleteMapping("/orders/{id}")
    public ResponseEntity<Object> delete(@PathVariable final Integer id) {
        this.orderService.delete(id);
        return generateGeneralResponse("Successfully deleted this order!", HttpStatus.OK);
    }
}
