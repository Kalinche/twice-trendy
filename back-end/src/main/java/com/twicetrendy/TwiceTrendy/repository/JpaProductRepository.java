package com.twicetrendy.TwiceTrendy.repository;

import com.twicetrendy.TwiceTrendy.data.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaProductRepository extends JpaRepository<Product, Integer> {
    Product findProductById(final Integer id);
}
