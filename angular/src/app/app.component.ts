import { HostListener, OnInit } from '@angular/core';
import { Component } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EdPortfolio';
  innerWidth: any;
  isMobileMode: boolean;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.isMobileMode = this.appService.checkUpMobileSize(window)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window
    this.isMobileMode = this.appService.checkUpMobileSize(window)
  }
}
