import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    let div = document.getElementById('test')
    if (div.getBoundingClientRect().top < 0) {
      document.getElementById('tes2').style.backgroundImage = "url(/assets/images/home-dark-row.jpg)"
    } else {
      document.getElementById('tes2').style.backgroundImage = "url(/assets/images/home-cover.jpg)";
    }
  }

}
