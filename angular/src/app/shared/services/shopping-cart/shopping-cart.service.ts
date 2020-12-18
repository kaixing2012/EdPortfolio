import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import shoppingCarts from '../../../../assets/mockbase/shop/shopping-carts.json';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private shoppingCartList: any[] = shoppingCarts;
  private baseUri = `http://${window.location.hostname}:8000/api/`;
  private headers: HttpHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {}

  getShoppingCartList(useMockService: boolean) {
    if (useMockService) {
      const shoppingCart = new Observable((observer) => {
        setTimeout(() => {
          observer.next(this.shoppingCartList);
        }, 100);
      });

      return shoppingCart;
    } else {
      let requestUri = `${this.baseUri}shop/shopping-cart/`;
      return this.httpClient.get(requestUri);
    }
  }
}
