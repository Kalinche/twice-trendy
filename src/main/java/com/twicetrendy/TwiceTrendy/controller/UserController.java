package com.twicetrendy.TwiceTrendy.controller;

import com.twicetrendy.TwiceTrendy.data.User;
import com.twicetrendy.TwiceTrendy.dto.UserDto;
import com.twicetrendy.TwiceTrendy.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping(value = "")
public class UserController {

    private final UserService userService;

    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody final UserDto user) {
        User dbUser = this.userService.get(user.username, user.password);
        if (dbUser != null) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody final UserDto user) {
        if (this.userService.findByUserId(user.id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
        } else {
            this.userService.create(new User(user.username, user.email, user.address, user.phone, user.password));
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //with requests the attributes' names should match the DTOs!!!
    //post request example body -> working for register

//    {
//        "id": 8,
//        "username": "John Smith",
//        "email": "a@df6f.d",
//        "phone": "2333",
//        "address": "fd",
//        "password": "23g2"
//    }

    @DeleteMapping("users/{userId}")
    public ResponseEntity<Void> delete(@PathVariable final Integer id) throws IOException {
        this.userService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
