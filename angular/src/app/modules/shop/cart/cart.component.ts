import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/app.service';
import { ShoppingItemService } from 'src/app/shared/services/shopping-item/shopping-item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  shoppingItems: [] = [];
  subtotal: number;
  shipping: number = 60;
  total: number;

  constructor(
    private appService: AppService,
    private shoppingItemService: ShoppingItemService
  ) {}

  ngOnInit(): void {
    this.getShoppingItems();
  }

  getShoppingItems() {
    this.shoppingItemService
      .getShoppingItemList(this.appService.getUseMockeService())
      .subscribe(
        (shoppingItems: []) => {
          this.shoppingItems = shoppingItems;
        },
        (err) => {}
      );
  }

  getItemSub(price: number, amount: number) {
    return `NT$${price * amount}`;
  }

  getSubtotal() {
    if (this.shoppingItems.length > 1)
      this.subtotal = this.shoppingItems
        .map((item: any) => {
          return item.product.productItem.price * item.amount;
        })
        .reduce((prev, next) => prev + next);
    else
      [this.subtotal] = this.shoppingItems.map((item: any) => {
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

  onCheckOut() {
    alert('this function is coming soon');
  }

  addAmount(shoppingItem) {
    if (shoppingItem.amount < shoppingItem.product.stock)
      shoppingItem.amount += 1;
  }

  subtractAmount(shoppingItem) {
    if (shoppingItem.amount > 1) shoppingItem.amount -= 1;
  }

  dynamicBackgroundColor(color: string) {
    return {
      backgroundColor: color,
    };
  }
}
