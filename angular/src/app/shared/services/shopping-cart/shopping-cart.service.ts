import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { ShoppingCart } from '../../models/shop/shopping-cart.model';

import shoppingCarts from '../../../../assets/mockbase/shop/shopping-carts.json';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private shoppingCartList: ShoppingCart[] = shoppingCarts;
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

  viewMyCart(useMockService: boolean) {
    if (useMockService) {
      const shoppingCart = new Observable<ShoppingCart[]>((observer) => {
        setTimeout(() => {
          observer.next(this.shoppingCartList);
        }, 100);
      });

      return shoppingCart;
    } else {
      let requestUri = `${this.baseUri}shop/shopping-cart/view-my-cart/`;
      return this.httpClient.get<ShoppingCart[]>(requestUri, this.httpOptions);
    }
  }
}
