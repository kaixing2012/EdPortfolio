import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { Payment } from 'src/app/shared/models/shop/payment.model';

import { AppService } from 'src/app/app.service';
import { PaymentService } from '../../../shared/services/payment/payment.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
})
export class PayComponent implements OnInit {
  payment$ = new Observable<Payment>();
  isLinear = false;
  isMobileMode = false;
  customerFormGroup: FormGroup = new FormGroup({});
  shippingFormGroup: FormGroup = new FormGroup({});
  paymentFormGroup: FormGroup = new FormGroup({});

  customerFormFields = [
    {
      label: 'Full Name',
      placeholder: 'Ex. Edward Y. Rogers',
      formControlName: 'fullName',
    },
    {
      label: 'Phone Number',
      placeholder: 'Ex. 0901234567',
      formControlName: 'phoneNumber',
    },
    {
      label: 'Email Address',
      placeholder: 'Ex. example@email.com',
      formControlName: 'emailAddress',
    },
  ];

  shippingFormFields = [
    {
      label: 'Zip/Postal Code',
      placeholder: 'Ex. 100',
      formControlName: 'code',
    },
    {
      label: 'Street',
      placeholder: 'Ex. 1 Main St.',
      formControlName: 'street',
    },
    {
      label: 'District',
      placeholder: 'Ex. Wanhua Dist.',
      formControlName: 'district',
    },
    {
      label: 'City',
      placeholder: 'Ex. Taipei City',
      formControlName: 'city',
    },
  ];

  paymentFormFields = [
    {
      label: 'Cardholder Name',
      placeholder: 'Ex. Edward Y. Rogers',
      formControlName: 'cardholderName',
    },
    {
      label: 'Card Number',
      placeholder: 'Ex. 4012-3456-7890-0000',
      formControlName: 'cardNumber',
    },
    {
      label: 'Expiration',
      placeholder: 'Ex. 01/20',
      formControlName: 'expiration',
    },
    {
      label: 'CVV',
      placeholder: 'Ex. 123',
      formControlName: 'cvv',
    },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private appService: AppService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.payment$ = this.paymentService.payment;

    this.payment$.subscribe(
      (payment) => {
        this.customerFormGroup.patchValue({
          fullName: payment.customerName,
          phoneNumber: payment.contactNo,
          emailAddress: payment.contactEmail,
        });

        this.shippingFormGroup.patchValue({
          code: payment.shippingPostalCode,
          street: payment.shippingStreet,
          district: payment.shippingDistrict,
          city: payment.shippingCity,
        });
      },
      (err) => {}
    );

    this.customerFormGroup = this._formBuilder.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
    });

    this.shippingFormGroup = this._formBuilder.group({
      code: ['', Validators.required],
      street: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
    });

    this.paymentFormGroup = this._formBuilder.group({
      cardholderName: ['Edward Y. Rogers', Validators.required],
      cardNumber: ['4012-3456-7890-0000', Validators.required],
      expiration: ['01/20', Validators.required],
      cvv: ['123', Validators.required],
    });

    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }

  onPay(payment: any) {
    // payment.body.customerName = this.customerFormGroup.value.fullName;
    console.log(this.customerFormGroup);
    console.log(payment);
    alert('Functionality for this is coming soon');
  }
}
