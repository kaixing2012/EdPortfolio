import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../models/shop/product.model';

import shoppingItems from '../../../../assets/mockbase/shop/shopping-items.json';

@Injectable({
  providedIn: 'root',
})
export class ShoppingItemService {
  private shoppingItemList: any[] = shoppingItems;
  private baseUri = `http://${window.location.hostname}:8000/api/`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'X-CSRFToken': this.cookieService.get('csrftoken'),
    }),
    withCredentials: true,
    // observe: 'response' as 'response',
  };

  constructor(
    private httpClient: HttpClient
  ) // private cookieService: CookieService
  {}

  addShoppingItem(product: Product) {
    let requestUri = `${this.baseUri}shop/shopping-item/`;
    return this.httpClient.post(requestUri, product, this.httpOptions);
  }

  // getShoppingItemList(useMockService: boolean) {
  //   if (useMockService) {
  //     const shoppingItem = new Observable((observer) => {
  //       setTimeout(() => {
  //         observer.next(this.shoppingItemList);
  //       }, 100);
  //     });

  //     return shoppingItem;
  //   } else {
  //     let requestUri = `${this.baseUri}shop/product/`;
  //     return this.httpClient.get(requestUri);
  //   }
  // }
}
