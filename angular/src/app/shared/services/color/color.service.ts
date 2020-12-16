import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Color } from '../../models/shop/color.model';

import colors from '../../../../assets/mockbase/shop/colors.json';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private colorList: Color[] = colors;
  private baseUri = `http://${window.location.hostname}:8000/api/`;

  headers: HttpHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {}

  getColorList(useMockService: boolean) {
    if (useMockService) {
      const colorObservable = new Observable<Color[]>((observer) => {
        setTimeout(() => {
          observer.next(this.colorList);
        }, 100);
      });

      return colorObservable;
    } else {
      let requestUri = `${this.baseUri}shop/color/`;
      return this.httpClient.get<Color[]>(requestUri);
    }
  }
}
