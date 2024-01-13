package com.twicetrendy.TwiceTrendy.service;

import com.twicetrendy.TwiceTrendy.data.User;

import java.util.Optional;

public interface UserService {
    User get(int id);

    User get(String email, String password);

    User create(User create);

    void delete(int id);

    //methods used in the controller
    Optional<User> findByUserId(Integer userId);

    Optional<User> findByEmail(String email);
}
