package com.twicetrendy.TwiceTrendy.service;

import com.twicetrendy.TwiceTrendy.data.Product;
import com.twicetrendy.TwiceTrendy.dto.ProductDto;

import java.util.List;

public interface ProductService {
    Product get(int id);

    Product create(Product product);

    Product update(int id, ProductDto product);

    Product updateOrderedProduct(Product productToUpdate);

    List<Product> getAll();

    List<Product> getProductsWithUserId(int id);

    void delete(int id);
}
