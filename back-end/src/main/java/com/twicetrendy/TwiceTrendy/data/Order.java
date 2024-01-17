package com.twicetrendy.TwiceTrendy.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userid")
    private User user;

    @Transient
    private int idUser;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "productid")
    private Product product;

    @Transient
    private int idProduct;

    @Column(name = "address")
    private String address;

    public Order(User user, Product product, String address) {
        this.user = user;
        this.idUser = user.getId();
        this.product = product;
        this.idProduct = product.getId();
        this.address = address;
    }

    public Order() {

    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Product getProduct() {
        return product;
    }

    public int getIdProduct() {
        return idProduct;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setIdUser() {
        this.idUser = user.getId();
    }

    public void setIdProduct() {
        this.idProduct = product.getId();
    }
}