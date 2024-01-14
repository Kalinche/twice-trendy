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

import static com.twicetrendy.TwiceTrendy.controller.ResponseHandler.*;

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
    public ResponseEntity<Object> getProductById(@PathVariable final Integer id) {
        Product dbProduct = productService.get(id);
        if (dbProduct != null) {
            return generateResponseWithData("Product was found successfully", HttpStatus.OK, dbProduct);
        } else {
            return handleNotFound("There is no product with such id");
        }
    }

    @GetMapping("/products")
    public ResponseEntity<Object> getProducts() {
        List<Product> dbProducts = productService.getAll();
        if (dbProducts.isEmpty()) {
            return handleNotFound("There are no products saved");
        } else {
            return generateResponseWithData("Products were found successfully", HttpStatus.OK, dbProducts);
        }
    }

    //TO DO
    //when saving products, currently we have to save with urls that are <=256 chars (need to update database)
    @PostMapping("/products")
    public ResponseEntity<Object> saveProduct(@RequestBody final ProductDto product) {
        //getting user that created the product by the userID
        User dbUser = this.userService.get(product.userID);
        if (dbUser == null) {
            return handleNotAcceptable("User isn't registered in the database");
        }
        Product newProduct = new Product(
                product.imagesURL,
                dbUser,
                product.name,
                product.description,
                product.price,
                product.size,
                product.color,
                product.brand,
                product.condition
        );
        //check if this product is already saved in the db
        productService.create(newProduct);
        return generateResponseWithData("Product was saved successfully", HttpStatus.OK, newProduct.getId());
    }

//{
//    "id": 97,
//    "imagesURL": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fbillyj.com.au%2Fproducts%2Fsunny-daze-dress-black&psig=AOvVaw3WObtzambMioUS0zHsFove&ust=1705173933840000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLDLkofK2IMDFQAAAAAdAAAAABAI",
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

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Object> delete(@PathVariable final Integer id) {
        this.productService.delete(id);
        return generateGeneralResponse("Successfully deleted this product and all orders attached", HttpStatus.OK);
    }
}
