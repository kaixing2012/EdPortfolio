import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

import { ShoppingItem } from 'src/app/shared/models/shop/shopping-item.model';

import { AppService } from 'src/app/app.service';
import { ShoppingService } from 'src/app/shared/services/shopping/shopping.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  shoppingItems$ = new Observable<ShoppingItem[]>();
  subtotal: number = 0;
  shipping: number = 60;
  total: number = 0;

  constructor(
    private snackBar: MatSnackBar,
    private appService: AppService,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.shoppingItems$ = this.shoppingService.cartItems;
  }

  getImageUrl(image: string) {
    return image ? image : '';
  }

  getItemSub(price: number, amount: number) {
    return `NT$${price * amount}`;
  }

  getSubtotal(shoppingItems: ShoppingItem[]) {
    if (shoppingItems.length > 0)
      this.subtotal = shoppingItems
        .map((item) => {
          return item.product.productItem.price * item.amount;
        })
        .reduce((prev, next) => prev + next);
    else this.subtotal = 0;

    return `NT$${this.subtotal}`;
  }

  getShipping() {
    if (this.subtotal > 1000) return 'Free';
    else return `NT$${this.shipping}`;
  }

  getTotal() {
    this.total = this.subtotal + this.shipping;
    return `NT$${this.total}`;
  }

  onRemoveItem(shoppingItem: ShoppingItem) {
    this.shoppingService.removeFromCart(shoppingItem).subscribe(
      (response: any) => {
        if (response) {
          let msg = response.message;
          this.onOpenSnackBar(msg, 'Close');
          this.shoppingService.getItemCount();
          this.shoppingService.getCartItems();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onCheckOut() {
    alert('this function is coming soon');
  }

  onSaveCart() {
    alert('this function is coming soon');
  }

  onOpenSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
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
