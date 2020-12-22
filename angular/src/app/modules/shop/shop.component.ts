import { Component, HostListener, OnInit } from '@angular/core';

import { ShoppingCart } from 'src/app/shared/models/shop/shopping-cart.model';

import { AppService } from 'src/app/app.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  innerWidth: number = 0;
  shoppingItemCount: number = 0;
  isMobileMode: boolean = false;

  constructor(
    private appService: AppService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.getShoppingItemCount();
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }

  getShoppingItemCount() {
    this.shoppingCartService
      .viewMyCart(this.appService.getUseMockeService())
      .subscribe(
        (carts: ShoppingCart[]) =>
          (this.shoppingItemCount = carts[0].cartItems.length)
      );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }
}
