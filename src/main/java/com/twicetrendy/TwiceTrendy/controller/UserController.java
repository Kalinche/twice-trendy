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

    @PostMapping("login")
    public ResponseEntity<Void> create(@RequestBody final UserDto user) throws IOException {
        this.userService.get(user.username, user.password);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("register")
    public ResponseEntity<Void> register(@RequestBody final UserDto user) throws IOException {
        if (this.userService.findByUserId(user.id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
        } else {
            this.userService.create(new User(user.username, user.email, user.address, user.phone, user.password));
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * post request example body -> not working
     *{
     *   "id": 3,
     *   "username": "John Smith",
     *   "email": "a@df.d",
     *   "phone": "2333",
     *   "address": "fd",
     *   "passwordhash": "232"
     * }
     */

    @DeleteMapping("users/{userId}")
    public ResponseEntity<Void> delete(@PathVariable final Integer id) throws IOException {
        this.userService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
