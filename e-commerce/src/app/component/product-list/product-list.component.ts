import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart-service.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId : number = 1;
  previousCategoryId : number = 1;
  currentKey : string = "";
  config: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  }  = {currentPage : 1 , itemsPerPage : 5 , totalItems : 0};


  constructor(private productService : ProductService, private route : ActivatedRoute, private cartService : CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( () => { this.listProducts() } );
  }

  updatePageSize(event: any) {
    let pageSizeValue = (event.target as HTMLSelectElement).value
    this.config.itemsPerPage = Number(pageSizeValue);
    this.config.currentPage = 1;
    this.listProducts();
  }

  pageChanged(curPage : number) {
    this.config.currentPage = Number(curPage);
    this.listProducts();
  }

  listProducts() {

    const hasCategory : boolean = this.route.snapshot.paramMap.has("id");
    const hasSearchKey : boolean = this.route.snapshot.paramMap.has("key");

    if(hasCategory) {
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get("id"));
    }

    if(hasSearchKey) {
      this.currentKey = this.route.snapshot.paramMap.get("key") + "";

      this.productService.getProductListBySearch(this.currentKey).subscribe(
        data => {this.products = data}
      )
    }
    else {
      if(this.previousCategoryId != this.currentCategoryId) {
        this.config.currentPage = 1;
      }
      this.previousCategoryId = this.currentCategoryId;
      this.productService.getProductListByPage(this.currentCategoryId, this.config.currentPage-1, 
                                              this.config.itemsPerPage).subscribe(this.processResult());
    }
  }

  processResult() {
    return (data: { _embedded: { products: Product[]; }; page: { size: number; totalElements: number; number: number; }; }) => {
      this.products = data._embedded.products;
      this.config.itemsPerPage = data.page.size;
      this.config.totalItems = data.page.totalElements;
      this.config.currentPage = Number(data.page.number) + 1;
    };
  }
  
  addToCart(product : Product) {
    this.cartService.addItemToCart(new CartItem(product));
  }
}

