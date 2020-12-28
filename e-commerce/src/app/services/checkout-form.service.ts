import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {

  constructor() { }

  getCreditCardMonths(startMonth : number) : Observable<number[]> {
    let months : number[] = [];

    for(let i = startMonth; i < 13; i++) {
      months.push(i);
    }

    return of(months);
  }

  getCreditCardYears() : Observable<number[]> {
    const startYear : number = (new Date()).getFullYear();
    const endYear : number = startYear + 10;
    let yearList : number[] = [];

    for(let i = startYear; i <= endYear; i++) {
      yearList.push(i);
    }
    return of(yearList);
  }
}
