package com.twicetrendy.TwiceTrendy.controller;

import com.twicetrendy.TwiceTrendy.data.User;
import com.twicetrendy.TwiceTrendy.dto.UserDto;
import com.twicetrendy.TwiceTrendy.service.OrderService;
import com.twicetrendy.TwiceTrendy.service.ProductService;
import com.twicetrendy.TwiceTrendy.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.twicetrendy.TwiceTrendy.controller.ResponseHandler.*;

@RestController
@CrossOrigin
@RequestMapping(value = "")
public class UserController {

    private final UserService userService;
    private final OrderService orderService;
    private final ProductService productService;

    public UserController(final UserService userService, OrderService orderService, ProductService productService) {
        this.userService = userService;
        this.orderService = orderService;
        this.productService = productService;
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable final Integer id) {
        User dbUser = userService.get(id);
        if (dbUser != null) {
            return generateResponseWithData("User was found successfully", HttpStatus.OK, dbUser);
        } else {
            return handleNotFound("There is no user with such id");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody final UserDto user) {
        User dbUser = this.userService.get(user.email, user.password);
        if (dbUser != null) {
            return generateResponseForLogIn("Successful log in", HttpStatus.OK, dbUser.getId());
        } else {
            return generateGeneralResponse("There is no such user", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody final UserDto user) {
        if (this.userService.findByEmail(user.email).isPresent()) {
            return handleNotAcceptable("This email has already been registered");
        } else {
            this.userService.create(new User(user.name, user.email, user.address, user.phone, user.password));
            return generateGeneralResponse("Successful registration", HttpStatus.OK);
        }
    }

    //with requests the attributes' names should match the DTOs!!!
    //post request example body -> working for register

//    {
//        "id": 8,
//        "name": "John Smith",
//        "email": "a@df6f.d",
//        "phone": "2333",
//        "address": "fd",
//        "password": "23g2"
//    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Object> delete(@PathVariable final Integer id) {
        this.userService.delete(id);
        return generateGeneralResponse("Successfully deleted this user and all products and orders attached", HttpStatus.OK);
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<Object> updateProduct(@PathVariable final Integer id, @RequestBody final UserDto user) {
        userService.update(id, user);
        return generateGeneralResponse("Successfully updated this user", HttpStatus.OK);
    }
}
