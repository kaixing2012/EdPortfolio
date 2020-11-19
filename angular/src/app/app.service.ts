import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private isMobileMode: boolean;

  constructor() { }

  checkUpMobileSize(window: Window) {
    if (window.innerWidth >= 575.98) {
      this.isMobileMode = false;
    }
    else {
      this.isMobileMode = true;
    }
    return this.isMobileMode
  }
}
