import { Component, HostListener, OnInit } from '@angular/core';

import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  innerWidth: any;
  isMobileMode: boolean;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }
}
