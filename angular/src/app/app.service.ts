import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private isMobileMode: boolean;
  private _isfrontFrameTouchTop: boolean;

  constructor() {}

  @Input()
  set isfrontFrameTouchTop(val) {
    this._isfrontFrameTouchTop = val;
  }
  get isfrontFrameTouchTop() {
    return this._isfrontFrameTouchTop;
  }

  checkUpMobileSize(window: Window) {
    if (window.innerWidth >= 575.98) {
      this.isMobileMode = false;
    } else {
      this.isMobileMode = true;
    }
    return this.isMobileMode;
  }
}
