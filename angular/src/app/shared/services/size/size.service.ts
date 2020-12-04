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
      const nameSetObservable = new Observable((observer) => {
        setTimeout(() => {
          observer.next(this.sizeList);
        }, 100);
      });

      return nameSetObservable;
    } else {
      let requestUri = `${this.baseUri}wonder/`;
      return this.httpClient.get(requestUri);
    }
  }
}
