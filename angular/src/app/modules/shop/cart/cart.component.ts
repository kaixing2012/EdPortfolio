import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

import { ShoppingItem } from 'src/app/shared/models/shop/shopping-item.model';

import { AppService } from 'src/app/app.service';
import { ShoppingService } from 'src/app/shared/services/shopping/shopping.service';
import { ShoppingCart } from 'src/app/shared/models/shop/shopping-cart.model';
import { PaymentService } from 'src/app/shared/services/payment/payment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  shoppingCart$ = new Observable<ShoppingCart>();
  subtotal: number = 0;
  shipping: number = 60;
  total: number = 0;

  constructor(
    private _snackBar: MatSnackBar,
    private _appService: AppService,
    private _shoppingService: ShoppingService,
    private _payementService: PaymentService
  ) {}

  ngOnInit(): void {
    this.shoppingCart$ = this._shoppingService.cart;
  }

  getImageUrl(image: string) {
    return image ? image : '';
  }

  getItemSub(price: number, amount: number) {
    return `NT$${price * amount}`;
  }

  getSubtotal(shoppingItems: ShoppingItem[]) {
    if (shoppingItems) {
      this.subtotal =
        shoppingItems.length > 0
          ? shoppingItems
              .map((item) => {
                return item.product.productItem.price * item.amount;
              })
              .reduce((prev, next) => prev + next)
          : (this.subtotal = 0);
    }

    return `NT$${this.subtotal}`;
  }

  getShipping() {
    if (this.subtotal > 1000) {
      this.shipping = 0;
      return 'Free';
    } else {
      this.shipping = 60;
      return `NT$${this.shipping}`;
    }
  }

  getTotal() {
    this.total = this.subtotal + this.shipping;
    return `NT$${this.total}`;
  }

  onRemoveItem(shoppingItem: ShoppingItem) {
    this._shoppingService.removeFromCart(shoppingItem).subscribe(
      (response) => {
        let msg = this._shoppingService.getMsgByStatus(response.status);
        this.onOpenSnackBar(msg, 'Close');
        this._shoppingService.getItemCount();
        this._shoppingService.getCart();
      },
      (err) => {
        let msg = this._shoppingService.getMsgByStatus(err.status);
        this.onOpenSnackBar(msg, 'Close');
        console.log(err);
      }
    );
  }

  onSaveItems(shoppingItems: ShoppingItem[]) {
    this._shoppingService.updateYourCart(shoppingItems).subscribe(
      (response) => {
        let msg = this._shoppingService.getMsgByStatus(response.status);
        this.onOpenSnackBar(msg, 'Close');
        this._shoppingService.getCart();
      },
      (err) => {
        let msg = this._shoppingService.getMsgByStatus(err.status);
        this.onOpenSnackBar(msg, 'Close');
        console.log(err);
      }
    );
  }

  onCheckOut(cart: ShoppingCart) {
    this._shoppingService.updateYourCart(cart.cartItems).subscribe(
      (response) => {
        let msg = this._shoppingService.getMsgByStatus(response.status);
        this.onOpenSnackBar(msg, 'Close');
        this._shoppingService.getCart();

        this._payementService.careteMyPayment().subscribe(
          (response) => {
            this._payementService.getPayment();
          },
          (err) => {
            let msg = this._payementService.getMsgByStatus(err.status);
            this.onOpenSnackBar(msg, 'Close');
            console.log(err);
          }
        );
      },
      (err) => {
        let msg = this._shoppingService.getMsgByStatus(err.status);
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

  onAddAmount(shoppingItem: ShoppingItem) {
    if (shoppingItem.product.stock) {
      if (shoppingItem.amount < shoppingItem.product.stock)
        shoppingItem.amount += 1;
    }
  }

  onSubtractAmount(shoppingItem: ShoppingItem) {
    if (shoppingItem.amount > 1) shoppingItem.amount -= 1;
  }

  dynamicBackgroundColor(color: string) {
    return {
      backgroundColor: color,
    };
  }
}
