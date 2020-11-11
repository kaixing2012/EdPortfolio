import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  isMobileSize: boolean = false;
  isCollapsed: boolean = false;

  private innerWidth: number

  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= 767.98) {
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

    if (this.innerWidth >= 767.98) {
      this.isMobileSize = false;
    }
    else {
      this.isMobileSize = true;
    }
  }

  onCollapse() {
    this.isCollapsed = !this.isCollapsed
  }
}
