import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Product } from '../../models/shop/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingItemService {
  private baseUri = `http://${window.location.hostname}:8000/api/`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.cookieService.get('csrftoken'),
    }),
    observe: 'events' as 'events',
  };

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  addShoppingItem(product: Product, amount: number) {
    let requestUri = `${this.baseUri}shop/shopping-item/add-to-cart/`;
    let body = JSON.stringify({
      product: product,
      amount: amount,
    });
    return this.httpClient.post(requestUri, body, this.httpOptions);
  }
}
