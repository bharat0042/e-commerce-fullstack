import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl : string = "http://localhost:8080/v1/products";

  private categoryUrl : string = "http://localhost:8080/v1/product-category/";

  constructor(private httpClient : HttpClient) { }

  getProductListByPage(categoryId : number, page : number, size : number) : Observable<GetResponseProducts> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${size}`;

    console.log(searchUrl);

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(categoryId : number) : Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

  getProductListBySearch(key : string) : Observable<Product[]> {

    const searchByKeyUrl = `${this.baseUrl}/search/findByNameContaining?keyword=${key}`;

    return this.httpClient.get<GetResponseProducts>(searchByKeyUrl).pipe(
      map(response => response._embedded.products)
    )
  }


  getProductCategories() : Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProductInfo(id : number) : Observable<Product> {
    const productInfoUrl = `${this.baseUrl}/${id};`
    return this.httpClient.get<Product>(productInfoUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
  products: Product[]
  },
  page : {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}

interface GetResponseProductCategory {
  _embedded: {
  productCategory: ProductCategory[]
  }
}
