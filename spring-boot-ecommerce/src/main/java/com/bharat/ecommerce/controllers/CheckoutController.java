package com.bharat.ecommerce.controllers;

import com.bharat.ecommerce.dto.Purchase;
import com.bharat.ecommerce.dto.PurchaseResponse;
import com.bharat.ecommerce.services.CheckoutServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/checkout")
@CrossOrigin("http://localhost:4200")
public class CheckoutController {

    CheckoutServices checkoutServices;

    @Autowired
    public CheckoutController(CheckoutServices checkoutServices) {
        this.checkoutServices = checkoutServices;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        return checkoutServices.placeOrder(purchase);
    }
}
