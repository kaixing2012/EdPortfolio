import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { AppService } from 'src/app/app.service';

import { Product } from '../../models/shop/product.model';
import { ShoppingCart } from '../../models/shop/shopping-cart.model';
import { ShoppingItem } from '../../models/shop/shopping-item.model';

import shoppingCarts from '../../../../assets/mockbase/shop/shopping-carts.json';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private shoppingCartList: any = shoppingCarts;
  private baseUri = `http://${window.location.hostname}:8000/api/`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.cookieService.get('csrftoken'),
    }),
    observe: 'response' as 'body',
  };

  private cartBehaviour = new BehaviorSubject<ShoppingCart>({} as ShoppingCart);
  private itemCountBehaviour = new BehaviorSubject<number>(0);

  cart = this.cartBehaviour.asObservable();
  itemCount = this.itemCountBehaviour.asObservable();

  constructor(
    private httpClient: HttpClient,
    private appService: AppService,
    private cookieService: CookieService
  ) {
    this.getCart();
    this.getItemCount();
  }

  getCart() {
    this.viewMyCart(this.appService.getUseMockeService()).subscribe(
      (response) =>
        this.setCart(response.body ? response.body : ({} as ShoppingCart)),
      (err) => {
        console.log(err);
      }
    );
  }

  setCart(cart: ShoppingCart) {
    this.cartBehaviour.next(cart);
  }

  getItemCount() {
    this.viewMyCart(this.appService.getUseMockeService()).subscribe(
      (response) =>
        this.setItemCount(response.body ? response.body.cartItems.length : 0),
      (err) => {
        console.log(err);
      }
    );
  }

  setItemCount(count: number) {
    this.itemCountBehaviour.next(count);
  }

  viewMyCart(useMockService: boolean) {
    if (useMockService) {
      const shoppingCart = new Observable<HttpResponse<ShoppingCart>>(
        (observer) => {
          setTimeout(() => {
            let httpResponse = new HttpResponse<ShoppingCart>({
              body: this.shoppingCartList,
            });
            observer.next(httpResponse);
          }, 100);
        }
      );

      return shoppingCart;
    } else {
      let requestUri = `${this.baseUri}shop/shopping-cart/view-my-cart/`;
      return this.httpClient.get<HttpResponse<ShoppingCart>>(
        requestUri,
        this.httpOptions
      );
    }
  }

  addToCart(product: Product, amount: number) {
    let requestUri = `${this.baseUri}shop/shopping-item/add-to-cart/`;
    let body = JSON.stringify({
      product: product,
      amount: amount,
    });
    return this.httpClient.post<HttpResponse<ShoppingItem>>(
      requestUri,
      body,
      this.httpOptions
    );
  }

  removeFromCart(shoppingItem: ShoppingItem) {
    let requestUri = `${this.baseUri}shop/shopping-item/remove-from-cart/`;
    let body = JSON.stringify({
      shoppingItem: shoppingItem,
    });
    return this.httpClient.post<HttpResponse<ShoppingItem>>(
      requestUri,
      body,
      this.httpOptions
    );
  }

  updateYourCart(shoppingItems: ShoppingItem[]) {
    let requestUri = `${this.baseUri}shop/shopping-item/update-your-cart/`;
    let body = JSON.stringify({
      shoppingItems: shoppingItems,
    });
    return this.httpClient.post<HttpResponse<ShoppingItem[]>>(
      requestUri,
      body,
      this.httpOptions
    );
  }

  getMsgByStatus(status: number) {
    let msg = '';

    switch (status) {
      case 201:
        msg = 'New item was just added to your cart';
        break;

      case 209:
        msg = 'Item was successfully removed from your cart';
        break;

      case 210:
        msg = 'Items were successfully updated in your cart';
        break;

      case 302:
        msg = 'Found same item in your cart';
        break;

      case 403:
        msg = 'You are Forbidden';
        break;

      case 404:
        msg = 'Cannot found the item you requested';
        break;

      default:
        if (status >= 500) msg = 'Somthing happened in server side';
        break;
    }

    return msg;
  }
}
