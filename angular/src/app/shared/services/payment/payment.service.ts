import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { Payment } from '../../models/shop/payment.model';

import { AppService } from 'src/app/app.service';

import payment from '../../../../assets/mockbase/shop/payment.json';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private mockPayment: any = payment;
  private baseUri = `http://${window.location.hostname}:8000/api/`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.cookieService.get('csrftoken'),
    }),
    observe: 'response' as 'body',
  };

  private paymentBehaviour = new BehaviorSubject<Payment>({} as Payment);

  payment = this.paymentBehaviour.asObservable();

  constructor(
    private httpClient: HttpClient,
    private appService: AppService,
    private cookieService: CookieService
  ) {
    this.getPayment();
  }

  getPayment() {
    this.viewMyPayment(this.appService.getUseMockeService()).subscribe(
      (response) =>
        this.setPayment(response.body ? response.body : ({} as Payment)),
      (err) => {
        console.log(err);
      }
    );
  }

  setPayment(payment: Payment) {
    this.paymentBehaviour.next(payment);
  }

  careteMyPayment() {
    let requestUri = `${this.baseUri}shop/payment/create-my-payment/`;
    let body = {};
    return this.httpClient.post<HttpResponse<Payment>>(
      requestUri,
      body,
      this.httpOptions
    );
  }

  viewMyPayment(useMockService: boolean) {
    if (useMockService) {
      const shoppingCart = new Observable<HttpResponse<Payment>>((observer) => {
        setTimeout(() => {
          let httpResponse = new HttpResponse<Payment>({
            body: this.mockPayment,
          });
          observer.next(httpResponse);
        }, 100);
      });

      return shoppingCart;
    } else {
      let requestUri = `${this.baseUri}shop/payment/view-my-payment`;
      return this.httpClient.get<HttpResponse<Payment>>(
        requestUri,
        this.httpOptions
      );
    }
  }

  updateMyPayment(payment: Payment) {
    let requestUri = `${this.baseUri}shop/payment/update-my-payment/`;
    let body = {
      payment: payment,
    };
    return this.httpClient.post<HttpResponse<Payment>>(
      requestUri,
      body,
      this.httpOptions
    );
  }

  getMsgByStatus(status: number) {
    let msg = '';

    switch (status) {
      // case 201:
      //   msg = 'New item was just added to your cart';
      //   break;

      // case 209:
      //   msg = 'Item was successfully removed from your cart';
      //   break;

      case 210:
        msg = "You've just seccessfully save your payment information";
        break;

      // case 302:
      //   msg = 'Found same item in your cart';
      //   break;

      case 403:
        msg = 'You are Forbidden';
        break;

      case 404:
        msg = 'Cannot found your shopping cart!';
        break;

      default:
        if (status >= 500) msg = 'Somthing happened in server side';
        break;
    }

    return msg;
  }
}
