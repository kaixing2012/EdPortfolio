import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import products from '../../../../assets/mockbase/shop/products.json';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productList: any[] = products;
  private baseUri = `http://${window.location.hostname}:8000/api/`;

  headers: HttpHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {}

  getProductList(useMockService: boolean) {
    if (useMockService) {
      const productObservable = new Observable((observer) => {
        setTimeout(() => {
          observer.next(this.productList);
        }, 100);
      });

      return productObservable;
    } else {
      let requestUri = `${this.baseUri}wonder/`;
      return this.httpClient.get(requestUri);
    }
  }
}
