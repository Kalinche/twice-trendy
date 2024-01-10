package com.twicetrendy.TwiceTrendy.service;

import com.twicetrendy.TwiceTrendy.data.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User get(int id);

    User get(String name, String password);

    User create(User create);

    void delete(int id);

    Optional<User> findByUserId(Integer userId);

    Optional<User> findByUserName(String name);
}
