package com.twicetrendy.TwiceTrendy.service;

import com.twicetrendy.TwiceTrendy.data.Product;

import java.util.List;

public interface ProductService {
    Product get(int id);

    Product create(Product product);

    Product update(Product product);

    List<Product> getAll();

    void delete(int id);
}
