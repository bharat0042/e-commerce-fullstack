import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countryUrl : string = "http://localhost:8080/v1/countries";

  private stateUrl : string = "http://localhost:8080/v1/states/search/findByCountryId"; 

  constructor(private httpClient : HttpClient) { }

  getCountryList() : Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countryUrl).pipe(
      map((response) => { 
        return response._embedded.countries
      })
    );
  }

  getStateList(countryId : number) : Observable<State[]> {
    const finalUrl = `${this.stateUrl}?id=${countryId}`
    return this.httpClient.get<GetResponseStates>(finalUrl).pipe(
      map((response) => { 
        return response._embedded.states
      })
    );
  }
}

interface GetResponseCountries {
  _embedded : {
    countries : Country[]
  }
}

interface GetResponseStates {
  _embedded : {
    states : State[]
  }
}
