import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import sizes from '../../../../assets/mockbase/shop/sizes.json';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  private sizeList: any[] = sizes;
  private baseUri = `http://${window.location.hostname}:8000/api/`;

  headers: HttpHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {}

  getSizeList(useMockService: boolean) {
    if (useMockService) {
      const sizeObservable = new Observable((observer) => {
        setTimeout(() => {
          observer.next(this.sizeList);
        }, 100);
      });

      return sizeObservable;
    } else {
      let requestUri = `${this.baseUri}size/`;
      return this.httpClient.get(requestUri);
    }
  }
}
