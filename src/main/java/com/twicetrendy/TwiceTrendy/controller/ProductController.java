package com.twicetrendy.TwiceTrendy.controller;

import com.twicetrendy.TwiceTrendy.data.Product;
import com.twicetrendy.TwiceTrendy.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "")
public class ProductController {
    private final ProductService productService;

    public ProductController(final ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("products/{id}")
    public Product getProductById(@PathVariable final Integer id) throws Exception {
        Product product = productService.get(id);
        return product;
    }

    @GetMapping("products/")
    public List<Product> getProducts() throws Exception {
        List<Product> products = productService.getAll();
        return products;
    }
}
