import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  isLinear = false;
  isMobileMode = false;

  customerFormGroup: FormGroup = new FormGroup({});
  shippingFormGroup: FormGroup = new FormGroup({});
  paymentFormGroup: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _appService: AppService,
    private _paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.payment$ = this._paymentService.payment;
    this.payment$.subscribe(
      (payment) => {
        this.shippingFormGroup.patchValue({
          shippingPostalCode: payment.shippingPostalCode,
          shippingStreet: payment.shippingStreet,
          shippingDistrict: payment.shippingDistrict,
          shippingCity: payment.shippingCity,
        });

        this.customerFormGroup.patchValue({
          customerName: payment.customerName,
          contactNo: payment.contactNo,
          contactEmail: payment.contactEmail,
        });
      },
      (err) => {}
    );

    this.isMobileMode = this._appService.checkUpMobileSize(window);

    this._setCustomerFormValidations();
    this._setShippingFormValidations();
    this._setPaymentFormValidations();
  }

  private _setCustomerFormValidations() {
    let customerName = new FormControl('', [Validators.required]);

    let contactNo = new FormControl('', [Validators.required]);

    let contactEmail = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.customerFormGroup = this._formBuilder.group({
      customerName: customerName,
      contactNo: contactNo,
      contactEmail: contactEmail,
    });
  }

  private _setShippingFormValidations() {
    let shippingPostalCode = new FormControl('', [Validators.required]);

    let shippingStreet = new FormControl('', [Validators.required]);

    let shippingDistrict = new FormControl('', [Validators.required]);

    let shippingCity = new FormControl('', [Validators.required]);

    this.shippingFormGroup = this._formBuilder.group({
      shippingPostalCode: shippingPostalCode,
      shippingStreet: shippingStreet,
      shippingDistrict: shippingDistrict,
      shippingCity: shippingCity,
    });
  }

  private _setPaymentFormValidations() {
    let cardholderName = new FormControl('Edward Y. Rogers', [
      Validators.required,
    ]);

    let cardNumber = new FormControl('4012-3456-7890-0000', [
      Validators.required,
    ]);

    let cardExpiration = new FormControl('01/20', [Validators.required]);

    let cardCvv = new FormControl('123', [Validators.required]);

    this.paymentFormGroup = this._formBuilder.group({
      cardholderName: cardholderName,
      cardNumber: cardNumber,
      cardExpiration: cardExpiration,
      cardCvv: cardCvv,
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this._appService.checkUpMobileSize(window);
  }

  onOpenSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      // panelClass: 'snackbar',
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onSave(payment: Payment) {
    payment = this.mapFormsToPaymentObj(payment);
    this._paymentService.updateMyPayment(payment).subscribe(
      (response) => {
        let msg = this._paymentService.getMsgByStatus(response.status);
        this.onOpenSnackBar(msg, 'Close');
        this._paymentService.getPayment();
      },
      (err) => {
        let msg = this._paymentService.getMsgByStatus(err.status);
        this.onOpenSnackBar(msg, 'Close');
        console.log(err);
      }
    );
  }

  onPay(payment: Payment) {
    payment = this.mapFormsToPaymentObj(payment);
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
