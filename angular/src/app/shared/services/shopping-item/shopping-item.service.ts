import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import shoppingItems from '../../../../assets/mockbase/shop/shopping-items.json';

@Injectable({
  providedIn: 'root',
})
export class ShoppingItemService {
  private shoppingItemList: any[] = shoppingItems;
  private baseUri = `http://${window.location.hostname}:8000/api/`;

  headers: HttpHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {}

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
