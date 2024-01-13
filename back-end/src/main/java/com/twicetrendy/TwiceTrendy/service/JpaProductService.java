package com.twicetrendy.TwiceTrendy.service;

import com.twicetrendy.TwiceTrendy.data.Product;
import com.twicetrendy.TwiceTrendy.repository.JpaProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JpaProductService implements ProductService {

    private JpaProductRepository jpaProductRepository;

    public JpaProductService(JpaProductRepository jpaProductRepository) {
        this.jpaProductRepository = jpaProductRepository;
    }

    @Override
    public Product get(int id) {
        Product product = jpaProductRepository.findProductById(id);
        return product;
    }

    @Override
    public Product create(Product product) {
        return jpaProductRepository.saveAndFlush(product);
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

    @Override
    public Optional<Product> findByProductId(int id) {
        return jpaProductRepository.findById(id);
    }
}
