package com.twicetrendy.TwiceTrendy.data;

import com.twicetrendy.TwiceTrendy.dto.ProductDto;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "images")
    private String images;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userid")
    private User user;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "size", length = 50)
    private String size;

    @Column(name = "color", length = 50)
    private String color;

    @Column(name = "brand", length = 50)
    private String brand;

    //TO DO:
    //create enums for condition and status

    //condition is 'New', 'Used'
    @Column(name = "condition", length = 50)
    private String condition;

    //we have product status - available/sold
    @Column(name = "status", length = 20)
    private String status;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<Order> orders;

    {
        orders = new LinkedHashSet<>();
    }

    public Product() {}

    public void applyChangesFromDto(ProductDto dto) {
        if (dto.images != null) {
            this.images = dto.images;
        }

        if (dto.name != null) {
            this.name = dto.name;
        }

        if (dto.description != null) {
            this.description = dto.description;
        }

        if (dto.price != 0) {
            this.price = new BigDecimal(dto.price);
        }

        if (dto.size != null) {
            this.size = dto.size;
        }

         if (dto.color != null) {
             this.color = dto.color;
         }

         if (dto.brand != null) {
             this.brand = dto.brand;
         }

         if (dto.condition != null) {
             this.condition = dto.condition;
         }

        this.status = "Available";//we have the product available by default when creating this ??(think of corner cases)
    }

    //we have both userId and author - name of the user created
    public Product(String images, User user, String name, String description,
                   double price, String size, String color, String brand, String condition) {
        this.images = images;
        this.user = user;
        this.name = name;
        this.description = description;
        this.price = new BigDecimal(price);
        this.size = size;
        this.color = color;
        this.brand = brand;
        this.condition = condition;
        this.status = "Available";//we have the product available by default when creating this ??(think of corner cases)
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public double getPrice() {
        return price.doubleValue();
    }

    public void setPrice(double price) {
        this.price = new BigDecimal(price);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}