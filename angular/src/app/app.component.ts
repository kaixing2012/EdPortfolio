import { HostListener, OnInit } from '@angular/core';
import { Component } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'EdPortfolio';
  innerWidth: number = 0;
  isMobileMode: boolean = false;

  constructor(
    private _appService: AppService,
    private _cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.isMobileMode = this._appService.checkUpMobileSize(window);
    this.setCsrfToken();
  }

  setCsrfToken() {
    if (this._cookieService.get('csrftoken') === '') {
      let tokenSource =
        '!@#$%^&*()0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let token = this._appService.generateRandomToken(31, tokenSource);

      this._cookieService.set('csrftoken', token);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this._appService.checkUpMobileSize(window);
  }
}
