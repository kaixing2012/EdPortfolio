import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Size } from '../../models/shop/size.model';

import sizes from '../../../../assets/mockbase/shop/sizes.json';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  private sizeList: Size[] = sizes;
  private baseUri = `http://${window.location.hostname}:8000/api/`;
  private headers: HttpHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {}

  getSizeList(useMockService: boolean) {
    if (useMockService) {
      const sizeObservable = new Observable<Size[]>((observer) => {
        setTimeout(() => {
          observer.next(this.sizeList);
        }, 100);
      });

      return sizeObservable;
    } else {
      let requestUri = `${this.baseUri}shop/size/`;
      return this.httpClient.get<Size[]>(requestUri);
    }
  }
}
