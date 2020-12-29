import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Size } from '../../models/shop/size.model';

import sizes from '../../../../assets/mockbase/shop/sizes.json';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  private _sizeList: Size[] = sizes;
  private _baseUri = `http://${window.location.hostname}:8000/api/`;
  private _headers: HttpHeaders = new HttpHeaders({});

  constructor(private _httpClient: HttpClient) {}

  getSizeList(useMockService: boolean) {
    if (useMockService) {
      const sizeObservable = new Observable<Size[]>((observer) => {
        setTimeout(() => {
          observer.next(this._sizeList);
        }, 100);
      });

      return sizeObservable;
    } else {
      let requestUri = `${this._baseUri}shop/size/`;
      return this._httpClient.get<Size[]>(requestUri);
    }
  }
}
