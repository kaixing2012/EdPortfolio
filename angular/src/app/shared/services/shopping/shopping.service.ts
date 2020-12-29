import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { AppService } from 'src/app/app.service';

import { Product } from '../../models/shop/product.model';
import { ShoppingCart } from '../../models/shop/shopping-cart.model';
import { ShoppingItem } from '../../models/shop/shopping-item.model';

import shoppingCart from '../../../../assets/mockbase/shop/shopping-carts.json';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private _shoppingCart: any = shoppingCart;
  private _baseUri = `http://${window.location.hostname}:8000/api/`;
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this._cookieService.get('csrftoken'),
    }),
    observe: 'response' as 'body',
  };

  private _cartBehaviour = new BehaviorSubject<ShoppingCart>(
    {} as ShoppingCart
  );
  private _itemCountBehaviour = new BehaviorSubject<number>(0);

  cart = this._cartBehaviour.asObservable();
  itemCount = this._itemCountBehaviour.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _cookieService: CookieService
  ) {
    this.getCart();
    this.getItemCount();
  }

  getCart() {
    this.viewMyCart(this._appService.getUseMockeService()).subscribe(
      (response) =>
        this.setCart(response.body ? response.body : ({} as ShoppingCart)),
      (err) => {
        this.setCart({} as ShoppingCart);
        console.log(err);
      }
    );
  }

  setCart(cart: ShoppingCart) {
    this._cartBehaviour.next(cart);
  }

  getItemCount() {
    this.viewMyCart(this._appService.getUseMockeService()).subscribe(
      (response) =>
        this.setItemCount(response.body ? response.body.cartItems.length : 0),
      (err) => {
        this.setItemCount(0);
        console.log(err);
      }
    );
  }

  setItemCount(count: number) {
    this._itemCountBehaviour.next(count);
  }

  viewMyCart(useMockService: boolean) {
    if (useMockService) {
      const _shoppingCart = new Observable<HttpResponse<ShoppingCart>>(
        (observer) => {
          setTimeout(() => {
            let httpResponse = new HttpResponse<ShoppingCart>({
              body: this._shoppingCart,
            });
            observer.next(httpResponse);
          }, 100);
        }
      );

      return _shoppingCart;
    } else {
      let requestUri = `${this._baseUri}shop/shopping-cart/view-my-cart/`;
      return this._httpClient.get<HttpResponse<ShoppingCart>>(
        requestUri,
        this._httpOptions
      );
    }
  }

  addToCart(product: Product, amount: number) {
    let requestUri = `${this._baseUri}shop/shopping-item/add-to-cart/`;
    let body = JSON.stringify({
      product: product,
      amount: amount,
    });
    return this._httpClient.post<HttpResponse<ShoppingItem>>(
      requestUri,
      body,
      this._httpOptions
    );
  }

  removeFromCart(shoppingItem: ShoppingItem) {
    let requestUri = `${this._baseUri}shop/shopping-item/remove-from-cart/`;
    let body = JSON.stringify({
      shoppingItem: shoppingItem,
    });
    return this._httpClient.post<HttpResponse<ShoppingItem>>(
      requestUri,
      body,
      this._httpOptions
    );
  }

  updateYourCart(shoppingItems: ShoppingItem[]) {
    let requestUri = `${this._baseUri}shop/shopping-item/update-your-cart/`;
    let body = JSON.stringify({
      shoppingItems: shoppingItems,
    });
    return this._httpClient.post<HttpResponse<ShoppingItem[]>>(
      requestUri,
      body,
      this._httpOptions
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
