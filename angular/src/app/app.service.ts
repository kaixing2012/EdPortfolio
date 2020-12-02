import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private isMobileMode: boolean;
  private useMockService: boolean = false;

  constructor() {}

  checkUpMobileSize(window: Window) {
    if (window.innerWidth >= 768) {
      this.isMobileMode = false;
    } else {
      this.isMobileMode = true;
    }
    return this.isMobileMode;
  }

  getUseMockeService() {
    return this.useMockService;
  }
}
