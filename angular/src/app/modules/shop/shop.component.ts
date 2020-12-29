import { Component, HostListener, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

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
    private _appService: AppService,
    private _shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.isMobileMode = this._appService.checkUpMobileSize(window);
    this.itemCount$ = this._shoppingService.itemCount;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this._appService.checkUpMobileSize(window);
  }
}
