import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { AppService } from 'src/app/app.service';

import { Product } from '../../models/shop/product.model';
import { ShoppingCart } from '../../models/shop/shopping-cart.model';

import shoppingCarts from '../../../../assets/mockbase/shop/shopping-carts.json';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private shoppingCartList: any[] = shoppingCarts;
  private baseUri = `http://${window.location.hostname}:8000/api/`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.cookieService.get('csrftoken'),
    }),
  };

  private itemCountBehaviour = new BehaviorSubject<number>(0);
  itemCount = this.itemCountBehaviour.asObservable();

  constructor(
    private httpClient: HttpClient,
    private appService: AppService,
    private cookieService: CookieService
  ) {
    this.getItemCount();
  }

  getItemCount() {
    this.viewMyCart(this.appService.getUseMockeService()).subscribe((cart) =>
      this.setItemCount(cart[0].cartItems.length)
    );
  }

  setItemCount(count: number) {
    this.itemCountBehaviour.next(count);
  }

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

  addToCart(product: Product, amount: number) {
    let requestUri = `${this.baseUri}shop/shopping-item/add-to-cart/`;
    let body = JSON.stringify({
      product: product,
      amount: amount,
    });
    return this.httpClient.post(requestUri, body, this.httpOptions);
  }
}
