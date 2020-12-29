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
  private _mockPayment: any = payment;
  private _baseUri = `http://${window.location.hostname}:8000/api/`;
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this._cookieService.get('csrftoken'),
    }),
    observe: 'response' as 'body',
  };

  private _paymentBehaviour = new BehaviorSubject<Payment>({} as Payment);

  payment = this._paymentBehaviour.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _cookieService: CookieService
  ) {
    this.getPayment();
  }

  getPayment() {
    this.viewMyPayment(this._appService.getUseMockeService()).subscribe(
      (response) =>
        this.setPayment(response.body ? response.body : ({} as Payment)),
      (err) => {
        this.setPayment({} as Payment);
        console.log(err);
      }
    );
  }

  setPayment(payment: Payment) {
    this._paymentBehaviour.next(payment);
  }

  careteMyPayment() {
    let requestUri = `${this._baseUri}shop/payment/create-my-payment/`;
    let body = {};
    return this._httpClient.post<HttpResponse<Payment>>(
      requestUri,
      body,
      this._httpOptions
    );
  }

  viewMyPayment(useMockService: boolean) {
    if (useMockService) {
      const shoppingCart = new Observable<HttpResponse<Payment>>((observer) => {
        setTimeout(() => {
          let httpResponse = new HttpResponse<Payment>({
            body: this._mockPayment,
          });
          observer.next(httpResponse);
        }, 100);
      });

      return shoppingCart;
    } else {
      let requestUri = `${this._baseUri}shop/payment/view-my-payment`;
      return this._httpClient.get<HttpResponse<Payment>>(
        requestUri,
        this._httpOptions
      );
    }
  }

  updateMyPayment(payment: Payment) {
    let requestUri = `${this._baseUri}shop/payment/update-my-payment/`;
    let body = {
      payment: payment,
    };
    return this._httpClient.post<HttpResponse<Payment>>(
      requestUri,
      body,
      this._httpOptions
    );
  }

  confirmMyPayment(payment: Payment) {
    console.log(payment);
    let requestUri = `${this._baseUri}shop/payment/confirm-my-payment/`;
    let body = {
      payment: payment,
    };
    return this._httpClient.post<HttpResponse<Payment>>(
      requestUri,
      body,
      this._httpOptions
    );
  }

  getMsgByStatus(status: number) {
    let msg = '';

    switch (status) {
      // case 201:
      //   msg = 'New item was just added to your cart';
      //   break;

      case 209:
        msg = 'Payment was successfully confirmed and deleted';
        break;

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
