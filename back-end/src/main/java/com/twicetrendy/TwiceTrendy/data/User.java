package com.twicetrendy.TwiceTrendy.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.twicetrendy.TwiceTrendy.dto.UserDto;
import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "phone", length = 15)
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

    @Column(name = "passwordhash")
    private String passwordhash;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Product> products = new LinkedHashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Order> orders;

    {
        orders = new LinkedHashSet<>();
    }

    public User() {

    }

    public void applyChangesFromDto(UserDto dto) {
        if (dto.name != null) {
            this.name = dto.name;
        }

        if (dto.address != null) {
            this.address = dto.address;
        }

        if (dto.phone != null) {
            this.phone = dto.phone;
        }
    }

    public User(String name, String email, String address, String phone, String passwordhash) {
        setName(name);
        setAddress(address);
        setEmail(email);
        setPasswordhash(passwordhash);
        setPhone(phone);
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public String getPasswordhash() {
        return passwordhash;
    }

    public void setPasswordhash(String passwordhash) {

        this.passwordhash = passwordhash;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}