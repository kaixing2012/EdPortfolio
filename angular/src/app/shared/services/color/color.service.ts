import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Color } from '../../models/shop/color.model';

import colors from '../../../../assets/mockbase/shop/colors.json';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private _colorList: Color[] = colors;
  private _baseUri = `http://${window.location.hostname}:8000/api/`;
  private _headers: HttpHeaders = new HttpHeaders({});

  constructor(private _httpClient: HttpClient) {}

  getColorList(useMockService: boolean) {
    if (useMockService) {
      const colorObservable = new Observable<Color[]>((observer) => {
        setTimeout(() => {
          observer.next(this._colorList);
        }, 100);
      });

      return colorObservable;
    } else {
      let requestUri = `${this._baseUri}shop/color/`;
      return this._httpClient.get<Color[]>(requestUri);
    }
  }
}
