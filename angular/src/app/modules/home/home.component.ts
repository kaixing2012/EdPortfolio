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
  @ViewChild('coverFrame') coverFrame: ElementRef = {} as ElementRef;
  @ViewChild('frontFrame') frontFrame: ElementRef = {} as ElementRef;
  @ViewChild('selfie') selfie: ElementRef = {} as ElementRef;
  @ViewChild('detail') detail: ElementRef = {} as ElementRef;

  isMobileMode: boolean = false;

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

  constructor(private _appService: AppService) {}

  ngOnInit(): void {
    this.isMobileMode = this._appService.checkUpMobileSize(window);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this._appService.checkUpMobileSize(window);
  }
}
