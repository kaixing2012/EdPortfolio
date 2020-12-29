import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmPaymentDialog } from 'src/app/shared/models/shop/confirm-payment-dialog.model';

import { PaymentService } from 'src/app/shared/services/payment/payment.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmPaymentDialog,
    private _snackBar: MatSnackBar,
    private _paymentService: PaymentService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onConfirm() {
    this._paymentService.confirmMyPayment(this.data.payment).subscribe(
      (response) => {
        let msg = this._paymentService.getMsgByStatus(response.status);
        this.onOpenSnackBar(msg, 'Close');

        this._router.navigateByUrl('/portfolio/shop/product');
      },
      (err) => {
        let msg = this._paymentService.getMsgByStatus(err.status);
        this.onOpenSnackBar(msg, 'Close');
        console.log(err);
      }
    );
  }

  onOpenSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      // panelClass: 'snackbar',
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
