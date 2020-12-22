import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../models/shop/product.model';

import products from '../../../../assets/mockbase/shop/products.json';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productList: any[] = products;
  private baseUri = `http://${window.location.hostname}:8000/api/`;
  private headers: HttpHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {}

  getProductList(useMockService: boolean) {
    if (useMockService) {
      const productObservable = new Observable<Product[]>((observer) => {
        setTimeout(() => {
          observer.next(this.productList);
        }, 100);
      });

      return productObservable;
    } else {
      let requestUri = `${this.baseUri}shop/product/`;
      return this.httpClient.get<Product[]>(requestUri);
    }
  }
}
