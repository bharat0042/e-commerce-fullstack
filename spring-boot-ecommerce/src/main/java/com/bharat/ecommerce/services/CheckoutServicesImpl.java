package com.bharat.ecommerce.services;

import com.bharat.ecommerce.dao.CustomerRepository;
import com.bharat.ecommerce.dto.Purchase;
import com.bharat.ecommerce.dto.PurchaseResponse;
import com.bharat.ecommerce.entity.Customer;
import com.bharat.ecommerce.entity.Order;
import com.bharat.ecommerce.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServicesImpl implements CheckoutServices {

    private CustomerRepository customerRepository;

    @Autowired
    public void setCustomerRepository(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order order = purchase.getOrder();
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setTrackingNumber(orderTrackingNumber);
        Set<OrderItem> orderItemSet = purchase.getOrderItems();
        orderItemSet.forEach(item -> order.add(item));
        order.setShippingAddress(purchase.getShippingAddress());
        Customer customer = purchase.getCustomer();
        customer.addOrder(order);
        customerRepository.save(customer);
        PurchaseResponse purchaseResponse = new PurchaseResponse();
        purchaseResponse.setOrderTrackingNumber(orderTrackingNumber);
        return purchaseResponse;
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
