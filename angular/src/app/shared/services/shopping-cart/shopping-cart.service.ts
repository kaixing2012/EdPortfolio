import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import shoppingCarts from '../../../../assets/mockbase/shop/shopping-carts.json';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private shoppingCartList: any[] = shoppingCarts;
  private baseUri = `http://${window.location.hostname}:8000/api/`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.cookieService.get('csrftoken'),
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  getShoppingCartList(useMockService: boolean) {
    if (useMockService) {
      const shoppingCart = new Observable((observer) => {
        setTimeout(() => {
          observer.next(this.shoppingCartList);
        }, 100);
      });

      return shoppingCart;
    } else {
      let requestUri = `${this.baseUri}shop/shopping-cart/view-my-cart/`;
      return this.httpClient.get(requestUri, this.httpOptions);
    }
  }
}
