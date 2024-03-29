package com.twicetrendy.TwiceTrendy.repository;

import com.twicetrendy.TwiceTrendy.data.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaProductRepository extends JpaRepository<Product, Integer> {
    Product findProductById(final Integer id);
    void deleteById(final Integer id);
    List<Product> findProductByUserId(final Integer userId);
}
