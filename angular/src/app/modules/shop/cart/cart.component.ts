import { Component, OnInit } from '@angular/core';

import { ShoppingCart } from 'src/app/shared/models/shop/shopping-cart.model';
import { ShoppingItem } from 'src/app/shared/models/shop/shopping-item.model';

import { AppService } from 'src/app/app.service';
import { ShoppingService } from 'src/app/shared/services/shopping/shopping.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  shoppingItems: ShoppingItem[] = [];
  subtotal: number = 0;
  shipping: number = 60;
  total: number = 0;

  constructor(
    private appService: AppService,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.getShoppingItems();
  }

  getShoppingItems() {
    this.shoppingService
      .viewMyCart(this.appService.getUseMockeService())
      .subscribe(
        (carts: ShoppingCart[]) => {
          this.shoppingItems = carts[0].cartItems;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getImageUrl(image: string) {
    console.log(image);
    return image ? image : '';
  }

  getItemSub(price: number, amount: number) {
    return `NT$${price * amount}`;
  }

  getSubtotal() {
    if (this.shoppingItems.length > 1)
      this.subtotal = this.shoppingItems
        .map((item) => {
          return item.product.productItem.price * item.amount;
        })
        .reduce((prev, next) => prev + next);
    else
      [this.subtotal] = this.shoppingItems.map((item) => {
        return item.product.productItem.price * item.amount;
      });

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
    alert('this function is coming soon');
  }

  onCheckOut() {
    alert('this function is coming soon');
  }

  onSaveCart() {
    alert('this function is coming soon');
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
