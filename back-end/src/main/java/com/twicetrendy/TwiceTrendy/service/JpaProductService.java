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
        product.setIdUser();
        return product;
    }

    @Override
    public Product create(Product product) {
        Product p = jpaProductRepository.saveAndFlush(product);
        p.setIdUser();
        return p;
    }

    @Override
    public Product update(int productId, ProductDto product) {
        //get the product from the db
        Product dbProduct = jpaProductRepository.findProductById(productId);
        //apply the changes from the request
        dbProduct.applyChangesFromDto(product);
        jpaProductRepository.saveAndFlush(dbProduct);
        dbProduct.setIdUser();
        return dbProduct;
    }

    @Override
    public Product updateOrderedProduct(Product productToUpdate) {
        Product product = jpaProductRepository.saveAndFlush(productToUpdate);
        product.setIdUser();
        return product;
    }

    //get all products
    @Override
    public List<Product> getAll() {
        List<Product> products = jpaProductRepository.findAll();
        for (Product p : products) {
            p.setIdUser();
        }
        return products;
    }

    @Override
    public List<Product> getProductsWithUserId(int id) {
        List<Product> products = jpaProductRepository.findProductByUserId(id);
        for (Product p : products) {
            p.setIdUser();
        }
        return products;
    }

    @Override
    public void delete(int id) {
        jpaProductRepository.deleteById(id);
    }
}
