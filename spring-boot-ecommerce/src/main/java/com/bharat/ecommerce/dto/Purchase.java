package com.bharat.ecommerce.dto;

import com.bharat.ecommerce.entity.Address;
import com.bharat.ecommerce.entity.Customer;
import com.bharat.ecommerce.entity.Order;
import com.bharat.ecommerce.entity.OrderItem;

import java.util.Set;

public class Purchase {

    private Customer customer;

    private Address shippingAddress;

    private Order order;

    private Set<OrderItem> orderItems;

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    @Override
    public String toString() {
        return "Purchase{" +
                "customer=" + customer +
                ", shippingAddress=" + shippingAddress +
                ", order=" + order +
                ", orderItemSet=" + orderItems +
                '}';
    }
}
