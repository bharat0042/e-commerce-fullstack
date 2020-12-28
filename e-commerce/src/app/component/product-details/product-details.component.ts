import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: number = 0;
  product: Product = new Product();

  constructor(private productService : ProductService, private route : ActivatedRoute, private cartService : CartService) { }

  ngOnInit(): void {
    this.getProductInfo();
  }
  

  getProductInfo() {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.productService.getProductInfo(this.id).subscribe(
      (data : Product) => {this.product = data}
    );
  }
  
  addToCart(product : Product) {
    this.cartService.addItemToCart(new CartItem(product));
  }
}
