package com.twicetrendy.TwiceTrendy.service;

import com.twicetrendy.TwiceTrendy.data.Product;
import com.twicetrendy.TwiceTrendy.dto.ProductDto;
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
        Product product = jpaProductRepository.findProductById(id);
        return product;
    }

    @Override
    public Product create(Product product) {
        return jpaProductRepository.saveAndFlush(product);
    }

    @Override
    public Product update(int productId, ProductDto product) {
        //get the product from the db
        Product dbProduct = jpaProductRepository.findProductById(productId);
        //apply the changes from the request
        dbProduct.applyChangesFromDto(product);
        jpaProductRepository.saveAndFlush(dbProduct);
        return dbProduct;
    }

    @Override
    public Product updateOrderedProduct(Product productToUpdate) {
        return jpaProductRepository.saveAndFlush(productToUpdate);
    }

    //get all products
    @Override
    public List<Product> getAll() {
        return jpaProductRepository.findAll();
    }

    @Override
    public List<Product> getProductsWithUserId(int id) {
        return jpaProductRepository.findProductByUserId(id);
    }

    @Override
    public void delete(int id) {
        jpaProductRepository.deleteById(id);
    }

//    @Override
//    public Optional<Product> findByProductId(int id) {
//        return jpaProductRepository.findById(id);
//    }
}
