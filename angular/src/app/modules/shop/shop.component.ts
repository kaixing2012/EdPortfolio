import { Component, HostListener, OnInit } from '@angular/core';

import { AppService } from 'src/app/app.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  innerWidth: number;
  isMobileMode: boolean;
  shoppingItemCount: number;

  constructor(
    private appService: AppService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.isMobileMode = this.appService.checkUpMobileSize(window);
    this.shoppingCartService
      .getShoppingCartList(this.appService.getUseMockeService())
      .subscribe(
        (cart: any[]) => (this.shoppingItemCount = cart[0].cartItems.length)
      );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }
}
