package com.bharat.ecommerce.services;

import com.bharat.ecommerce.dto.Purchase;
import com.bharat.ecommerce.dto.PurchaseResponse;

public interface CheckoutServices {

    PurchaseResponse placeOrder(Purchase purchase);
}
