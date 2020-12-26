import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { AppService } from 'src/app/app.service';

import payment from '../../../../assets/mockbase/shop/payment.json';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private payment: any = payment;
  private baseUri = `http://${window.location.hostname}:8000/api/`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.cookieService.get('csrftoken'),
    }),
    observe: 'response' as 'body',
  };

  // private cartBehaviour = new BehaviorSubject<any>({} as any);

  // cart = this.cartBehaviour.asObservable();

  constructor(
    private httpClient: HttpClient,
    private appService: AppService,
    private cookieService: CookieService
  ) {}

  viewMyPayment(useMockService: boolean) {
    if (useMockService) {
      const shoppingCart = new Observable<HttpResponse<any>>((observer) => {
        setTimeout(() => {
          let httpResponse = new HttpResponse<any>({
            body: this.payment,
          });
          observer.next(httpResponse);
        }, 100);
      });

      return shoppingCart;
    } else {
      let requestUri = `${this.baseUri}shop/payment/view-my-payment/`;
      return this.httpClient.get<HttpResponse<any>>(
        requestUri,
        this.httpOptions
      );
    }
  }
}
