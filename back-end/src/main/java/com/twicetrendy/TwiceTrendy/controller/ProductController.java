package com.twicetrendy.TwiceTrendy.controller;

import com.twicetrendy.TwiceTrendy.data.Product;
import com.twicetrendy.TwiceTrendy.data.User;
import com.twicetrendy.TwiceTrendy.dto.ProductDto;
import com.twicetrendy.TwiceTrendy.service.ProductService;
import com.twicetrendy.TwiceTrendy.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "")
public class ProductController {
    private final ProductService productService;
    private final UserService userService;

    public ProductController(final ProductService productService, UserService userService) {
        this.productService = productService;
        this.userService = userService;
    }

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable final Integer id) {
        return productService.get(id);
    }

    @GetMapping("/products")//ako imame /products/ ne raboti i vrushta 404 otne mi 1383 godini da se setq
    public List<Product> getProducts() {
        return productService.getAll();
    }

    //TO DO
    //when saving products, currently we have to save with urls that are <=256 chars (need to update database)
    @PostMapping("/products")
    public ResponseEntity<Void> saveProduct(@RequestBody final ProductDto product) {
        //getting user that created the product by the userID
        User dbUser = this.userService.get(product.userID);
        if (dbUser == null) {
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);//change https status but generally we
            //should not be hitting this error because we will always pass the userId of the logged
            //in user
        }
        productService.create(new Product(
                product.imagesURL,
                dbUser,
                product.name,
                product.author,
                product.description,
                product.price,
                product.size,
                product.color,
                product.brand,
                product.condition
        ));
        return new ResponseEntity<>(HttpStatus.OK);
    }

//{
//    "id": 97,
//    "images": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fbillyj.com.au%2Fproducts%2Fsunny-daze-dress-black&psig=AOvVaw3WObtzambMioUS0zHsFove&ust=1705173933840000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLDLkofK2IMDFQAAAAAdAAAAABAI",
//    "name": "dress",
//    "userID": 5,
//    "author": "John Smith",
//    "description": "pretty dress",
//    "price": 1,
//    "size": "XS",
//    "color": "black",
//    "brand": "Shein",
//    "condition": "Like new",
//    "status": "Available"
//}
}
