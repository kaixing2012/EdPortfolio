import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  @Input() isMobileSize: boolean;

  isCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  onCollapse() {
    this.isCollapsed = !this.isCollapsed
  }
}
