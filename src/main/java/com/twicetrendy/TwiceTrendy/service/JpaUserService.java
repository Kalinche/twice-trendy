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

    //get a tag via id
    @Override
    public User get(int id) {
        Optional<User> tag = jpaUserRepository.findById(id);
        if (tag.isPresent()) {
            return tag.get();
        }
        throw new NoSuchElementException(
                "Tag with ID: " + id + " was not found!");
    }

    //get a tag via its name
    @Override
    public User get(String name, String password) {
        Optional<User>user = jpaUserRepository.findByNameAndPasswordhash(name, password);
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
    public Optional<User> findByUserId(Integer tagId) {
        return Optional.empty();
    }

    @Override
    public Optional<User> findByUserName(String name) {
        return Optional.empty();
    }
}
