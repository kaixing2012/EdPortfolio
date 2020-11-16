import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('coverFrame') coverFrame: ElementRef
  @ViewChild('frontFrame') frontFrame: ElementRef
  @ViewChild('selfie') selfie: ElementRef
  @ViewChild('detail') detail: ElementRef

  isMobileMode: boolean
  winInnerWidth: number = window.innerWidth;

  constructor() { }

  ngOnInit(): void {
    if (this.winInnerWidth >= 575.98) {
      this.isMobileMode = false;
    }
    else {
      this.isMobileMode = true;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (this.frontFrame.nativeElement.getBoundingClientRect().top < 0) {
      this.coverFrame.nativeElement.style.backgroundImage = "url(/assets/images/home-dark-row.jpg)"
      if (!this.isMobileMode) {
        this.selfie.nativeElement.style.display = "inline"
        this.detail.nativeElement.style.display = "inline"

        setTimeout(() => {
          this.selfie.nativeElement.style.transform = "scale(.7)"
          this.detail.nativeElement.style.transform = "scale(.7)"

        }, 100);
      }

    } else {
      this.coverFrame.nativeElement.style.backgroundImage = "url(/assets/images/home-cover.jpg)";
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let target = event.target as Window
    if (target.innerWidth >= 575.98) {
      this.isMobileMode = false;
    }
    else {
      this.isMobileMode = true;
    }
  }
}
