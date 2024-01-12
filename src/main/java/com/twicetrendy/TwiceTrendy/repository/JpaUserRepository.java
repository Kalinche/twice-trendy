package com.twicetrendy.TwiceTrendy.repository;

import com.twicetrendy.TwiceTrendy.data.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaUserRepository extends JpaRepository<User, Integer> {
    Optional<User>findById(final Integer id);
    Optional<User>findByName(final String name);
    Optional<User> findByNameAndPasswordhash(final String name, final String password);
}
