package com.twicetrendy.TwiceTrendy.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid")
    private User userid;

    @Column(name = "name")
    private String name;

    @Column(name = "author")
    private String author;

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

    //condition is 'Excellent', 'Very good', 'Good', 'Like new'
    @Column(name = "condition", length = 50)
    private String condition;

    //we have product status - available/sold
    @Column(name = "status", length = 20)
    private String status;

    @OneToMany(mappedBy = "product")
    private Set<Order> orders;

    {
        orders = new LinkedHashSet<>();
    }

    public Product() {}

    //we have both userId and author - name of the user created
    public Product(String images, User userid, String name, String author, String description,
                   double price, String size, String color, String brand, String condition) {
        this.images = images;
        this.userid = userid;
        this.name = name;
        this.author = author;
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUserid() {
        return userid;
    }

    public void setUserid(User userid) {
        this.userid = userid;
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