import { Component, HostListener, OnInit } from '@angular/core';

import { AppService } from 'src/app/app.service';
import { ShoppingItemService } from 'src/app/shared/services/shopping-item/shopping-item.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  innerWidth: any;
  isMobileMode: boolean;
  shoppingItemCount: number;

  constructor(
    private appService: AppService,
    private shoppingItemService: ShoppingItemService
  ) {}

  ngOnInit(): void {
    this.isMobileMode = this.appService.checkUpMobileSize(window);
    this.shoppingItemService
      .getShoppingItemList(this.appService.getUseMockeService())
      .subscribe((data: []) => (this.shoppingItemCount = data.length));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }
}
