import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServices {

  private purchaseUrl = "http://localhost:8080/v1/checkout/purchase";

  constructor(private httpClient: HttpClient) { }

  saveOrderToDataBase(purchase: Purchase): Observable<any> {
    console.log(JSON.stringify(purchase));
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }
}
