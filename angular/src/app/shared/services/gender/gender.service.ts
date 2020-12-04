import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import genders from '../../../../assets/mockbase/shop/genders.json';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private genderList: any[] = genders;
  private baseUri = `http://${window.location.hostname}:8000/api/`;

  headers: HttpHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {}

  getGenderList(useMockService: boolean) {
    if (useMockService) {
      const nameSetObservable = new Observable((observer) => {
        setTimeout(() => {
          observer.next(this.genderList);
        }, 100);
      });

      return nameSetObservable;
    } else {
      let requestUri = `${this.baseUri}wonder/`;
      return this.httpClient.get(requestUri);
    }
  }
}
