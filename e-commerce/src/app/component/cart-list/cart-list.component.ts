import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  cartList : CartItem[] = [];
  totalPrice : number = 0;
  totalQuantity : number = 0;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.setCartItemList();
  }

  setCartItemList() {
    this.cartList = this.cartService.cartItemList;
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = Number(data.toFixed(2))
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    this.cartService.computeQuantityAndPrice();
  }

  incrementQuantity(item : CartItem) {
    this.cartService.addItemToCart(item);
  }

  decrementQuantity(item : CartItem) {
    this.cartService.decQuantity(item);
  }

  removeItem(item : CartItem) {
    this.cartService.remove(item);
  }
}
