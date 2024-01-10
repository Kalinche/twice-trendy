package com.twicetrendy.TwiceTrendy.service;

import com.twicetrendy.TwiceTrendy.data.Order;
import com.twicetrendy.TwiceTrendy.data.Product;
import com.twicetrendy.TwiceTrendy.repository.JpaProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JpaProductService implements ProductService {

    private JpaProductRepository jpaProductRepository;

    public JpaProductService(JpaProductRepository jpaProductRepository) {
        this.jpaProductRepository = jpaProductRepository;
    }

    @Override
    public Product get(int id) {
        return null;
    }

    @Override
    public Product create(Product product) {
        return null;
    }

    @Override
    public Product update(Product product) {
        return null;
    }

    //get all products
    @Override
    public List<Product> getAll() {
        return jpaProductRepository.findAll();
    }

    @Override
    public void delete(int id) {

    }

    @Override
    public void saveAll(List<Product> products) {

    }
}
