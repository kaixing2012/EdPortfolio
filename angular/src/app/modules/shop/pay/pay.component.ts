import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { Payment } from 'src/app/shared/models/shop/payment.model';

import { AppService } from 'src/app/app.service';
import { PaymentService } from '../../../shared/services/payment/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
})
export class PayComponent implements OnInit {
  payment$ = new Observable<Payment>();
  isLinear = true;
  isMobileMode = false;
  customerFormGroup: FormGroup = new FormGroup({});
  shippingFormGroup: FormGroup = new FormGroup({});
  paymentFormGroup: FormGroup = new FormGroup({});

  customerFormFields = [
    {
      label: 'Full Name',
      placeholder: 'Ex. Edward Y. Rogers',
      formControlName: 'customerName',
    },
    {
      label: 'Phone Number',
      placeholder: 'Ex. 0901234567',
      formControlName: 'contactNo',
    },
    {
      label: 'Email Address',
      placeholder: 'Ex. example@email.com',
      formControlName: 'contactEmail',
    },
  ];

  shippingFormFields = [
    {
      label: 'Zip/Postal Code',
      placeholder: 'Ex. 100',
      formControlName: 'shippingPostalCode',
    },
    {
      label: 'Street',
      placeholder: 'Ex. 1 Main St.',
      formControlName: 'shippingStreet',
    },
    {
      label: 'District',
      placeholder: 'Ex. Wanhua Dist.',
      formControlName: 'shippingDistrict',
    },
    {
      label: 'City',
      placeholder: 'Ex. Taipei City',
      formControlName: 'shippingCity',
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
      formControlName: 'cardExpiration',
    },
    {
      label: 'CVV',
      placeholder: 'Ex. 123',
      formControlName: 'cardCvv',
    },
  ];

  constructor(
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private appService: AppService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.payment$ = this.paymentService.payment;

    this.payment$.subscribe(
      (payment) => {
        this.customerFormGroup.patchValue({
          customerName: payment.customerName,
          contactNo: payment.contactNo,
          contactEmail: payment.contactEmail,
        });

        this.shippingFormGroup.patchValue({
          shippingPostalCode: payment.shippingPostalCode,
          shippingStreet: payment.shippingStreet,
          shippingDistrict: payment.shippingDistrict,
          shippingCity: payment.shippingCity,
        });
      },
      (err) => {}
    );

    this.customerFormGroup = this._formBuilder.group({
      customerName: ['', Validators.required],
      contactNo: ['', Validators.required],
      contactEmail: ['', Validators.required],
    });

    this.shippingFormGroup = this._formBuilder.group({
      shippingPostalCode: ['', Validators.required],
      shippingStreet: ['', Validators.required],
      shippingDistrict: ['', Validators.required],
      shippingCity: ['', Validators.required],
    });

    this.paymentFormGroup = this._formBuilder.group({
      cardholderName: ['Edward Y. Rogers', Validators.required],
      cardNumber: ['4012-3456-7890-0000', Validators.required],
      cardExpiration: ['01/20', Validators.required],
      cardCvv: ['123', Validators.required],
    });

    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }

  onOpenSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      // panelClass: 'snackbar',
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onSave(payment: Payment) {
    payment = this.mapFormsToPaymentObj(payment);
    this.paymentService.updateMyPayment(payment).subscribe(
      (response) => {
        let msg = this.paymentService.getMsgByStatus(response.status);
        this.onOpenSnackBar(msg, 'Close');
        this.paymentService.getPayment();
      },
      (err) => {
        let msg = this.paymentService.getMsgByStatus(err.status);
        this.onOpenSnackBar(msg, 'Close');
        console.log(err);
      }
    );
  }

  onPay(payment: Payment) {
    alert('Functionality for this is coming soon');
  }

  mapFormsToPaymentObj(payment: Payment) {
    payment.customerName = this.customerFormGroup.value.customerName;
    payment.contactNo = this.customerFormGroup.value.contactNo;
    payment.contactEmail = this.customerFormGroup.value.contactEmail;

    payment.shippingPostalCode = this.shippingFormGroup.value.shippingPostalCode;
    payment.shippingStreet = this.shippingFormGroup.value.shippingStreet;
    payment.shippingDistrict = this.shippingFormGroup.value.shippingDistrict;
    payment.shippingCity = this.shippingFormGroup.value.shippingCity;

    payment.cardholderName = this.paymentFormGroup.value.cardholderName;
    payment.cardNumber = this.paymentFormGroup.value.cardNumber;
    payment.cardExpiration = this.paymentFormGroup.value.cardExpiration;
    payment.cardCvv = this.paymentFormGroup.value.cardCvv;

    return payment;
  }
}
