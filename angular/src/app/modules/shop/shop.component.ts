import { Component, HostListener, OnInit } from '@angular/core';

import { observable, Observable } from 'rxjs';

import { ShoppingCart } from 'src/app/shared/models/shop/shopping-cart.model';

import { AppService } from 'src/app/app.service';
import { ShoppingService } from 'src/app/shared/services/shopping/shopping.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  itemCount$: Observable<number> = new Observable();

  innerWidth: number = 0;
  isMobileMode: boolean = false;

  constructor(
    private appService: AppService,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.isMobileMode = this.appService.checkUpMobileSize(window);
    this.itemCount$ = this.shoppingService.itemCount;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }
}
