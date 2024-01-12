package com.twicetrendy.TwiceTrendy.service;

import com.twicetrendy.TwiceTrendy.data.User;
import com.twicetrendy.TwiceTrendy.repository.JpaUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class JpaUserService implements UserService {

    private JpaUserRepository jpaUserRepository;

    public JpaUserService(JpaUserRepository jpaUserRepository) {
        this.jpaUserRepository = jpaUserRepository;
    }

    //get a user via id
    @Override
    public User get(int id) {
        Optional<User> tag = jpaUserRepository.findById(id);
        if (tag.isPresent()) {
            return tag.get();
        }
        throw new NoSuchElementException(
                "User with ID: " + id + " was not found!");
    }

    //get a user via its name
    @Override
    public User get(String name, String password) {
        Optional<User> user = jpaUserRepository.findByNameAndPasswordhash(name, password);
        return user.get();
    }

    //create a new user
    @Override
    public User create(User user) {
        return jpaUserRepository.saveAndFlush(user);
    }

    //delete a user by id
    @Override
    public void delete(int id) {
        jpaUserRepository.deleteById(id);
    }

    @Override
    public Optional<User> findByUserId(Integer userId) {
        return jpaUserRepository.findById(userId);
    }

    @Override
    public Optional<User> findByUserName(String name) {
        return jpaUserRepository.findByName(name);
    }
}
