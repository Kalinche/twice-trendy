package com.twicetrendy.TwiceTrendy.service;

import com.twicetrendy.TwiceTrendy.data.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    Product get(int id);

    Product create(Product product);

    Product update(Product product);

    List<Product> getAll();

    void delete(int id);

    void saveAll(List<Product> products);

    Optional<Product> findByProductId(int id);
}
