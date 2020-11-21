import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { MatToolbar } from '@angular/material/toolbar';

import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  @ViewChild('nav') nav: MatToolbar;

  @Input() isMobileMode: boolean;

  isCollapsed: boolean = false;

  constructor(private appService: AppService) { }

  ngOnInit(): void {

  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // if (this.appService.isfrontFrameTouchTop) {
    //   this.nav._elementRef.nativeElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)"
    // } else {
    //   this.nav._elementRef.nativeElement.style.backgroundColor = "transparent"
    // }
  }

  onCollapse() {
    this.isCollapsed = !this.isCollapsed
  }
}
