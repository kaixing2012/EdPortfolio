import { HostListener, OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EdPortfolio';
  innerWidth: any;
  isMobileSize: boolean;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= 575.98) {
      this.isMobileSize = false;
    }
    else {
      this.isMobileSize = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    if (event != undefined) {
      this.innerWidth = event.target.innerWidth;
    }
    else {
      this.innerWidth = document.body.clientWidth;
    }

    if (this.innerWidth >= 575.98) {
      this.isMobileSize = false;
    }
    else {
      this.isMobileSize = true;
    }
  }
}
