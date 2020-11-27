import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('coverFrame') coverFrame: ElementRef;
  @ViewChild('frontFrame') frontFrame: ElementRef;
  @ViewChild('selfie') selfie: ElementRef;
  @ViewChild('detail') detail: ElementRef;

  isMobileMode: boolean;

  skillIcons = [
    {
      class: 'fa-angular',
      name: 'Angular',
    },
    {
      class: 'fa-js-square',
      name: 'JavaScript',
    },
    {
      font: 'C#',
      name: 'ASP.Net',
    },
    {
      font: 'Dj',
      name: 'Django',
    },
    {
      class: 'fa-python',
      name: 'Python',
    },
    {
      class: 'fa-docker',
      name: 'Docker',
    },
  ];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }

  // @HostListener('window:scroll', ['$event'])
  // onScroll(event: Event) {
  //   console.log('fff');
  //   if (this.frontFrame.nativeElement.getBoundingClientRect().top < 0) {
  //     this.coverFrame.nativeElement.style.backgroundImage =
  //       'url(/assets/images/home-dark-row.jpg)';
  //     this.appService.isfrontFrameTouchTop = true;
  //     if (!this.isMobileMode) {
  //       this.selfie.nativeElement.style.display = 'initial';
  //       this.detail.nativeElement.style.display = 'initial';

  //       setTimeout(() => {
  //         this.selfie.nativeElement.style.transform = 'scale(.7)';
  //         this.selfie.nativeElement.style.boxShadow =
  //           'inset 0 0 100px 50px #000000';
  //         this.detail.nativeElement.style.transform = 'scale(.7)';
  //       }, 100);
  //     }
  //   } else {
  //     this.coverFrame.nativeElement.style.backgroundImage =
  //       'url(/assets/images/home-cover.jpg)';
  //     this.appService.isfrontFrameTouchTop = false;
  //   }
  // }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }
}
