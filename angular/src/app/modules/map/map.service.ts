import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import placeList from '../../../assets/jsonFiles/placeList.json'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private placeList = placeList

  headers: HttpHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {

  }

  getCountryNames() {
    const nameListObservable = new Observable((observer) => {
      setTimeout(() => {
        let names = this.placeList.map((place) => place.CountryName);
        observer.next(names);
      }, 100);
    });

    return nameListObservable;
  }

  getCountryByName(countryName: string) {
    const nameObservable = new Observable((observer) => {
      setTimeout(() => {
        let names = this.placeList.find((place) => place.CountryName === countryName);
        observer.next(names);
      }, 100);
    });

    return nameObservable;
  }
}


  // private searchLngLatBaseURL = `https://www.google.com`;
  // let requestingUri = `${this.searchLngLatBaseURL}/search?q=${placeName}`
  // return this.httpClient.get(requestingUri, {
  //   headers: this.headers,
  // });