package com.twicetrendy.TwiceTrendy.repository;

import com.twicetrendy.TwiceTrendy.data.Product;
import com.twicetrendy.TwiceTrendy.data.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findById(final Integer id);
    Optional<Product> findByName(final String name);
}