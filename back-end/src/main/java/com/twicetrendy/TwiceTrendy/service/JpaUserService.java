package com.twicetrendy.TwiceTrendy.service;

import com.twicetrendy.TwiceTrendy.data.User;
import com.twicetrendy.TwiceTrendy.dto.UserDto;
import com.twicetrendy.TwiceTrendy.repository.JpaUserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JpaUserService implements UserService {

    private final JpaUserRepository jpaUserRepository;

    public JpaUserService(JpaUserRepository jpaUserRepository) {
        this.jpaUserRepository = jpaUserRepository;
    }

    //get a user via id
    @Override
    public User get(int id) {
        Optional<User> tag = jpaUserRepository.findById(id);
        //throw an exception and then catch it in the controller
        return tag.orElse(null);//this returns null if user is not present
    }

    //get a user via its name
    @Override
    public User get(String email, String password) {
        Optional<User> user = jpaUserRepository.findByEmailAndPasswordhash(email, password);
        //check if Optional<User> user is present
        return user.get();
    }

    //create a new user
    @Override
    public User create(User user) {
        return jpaUserRepository.saveAndFlush(user);
    }

    @Override
    public User update(int id, UserDto user) {
        //get the user from the db
        User dbUser = jpaUserRepository.findById(id).get();
        //apply the changes from the request
        dbUser.applyChangesFromDto(user);
        jpaUserRepository.saveAndFlush(dbUser);
        return dbUser;
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
    public Optional<User> findByEmail(String email) {
        return jpaUserRepository.findByEmail(email);
    }
}
