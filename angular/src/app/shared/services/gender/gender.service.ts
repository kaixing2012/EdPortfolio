import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Gender } from '../../models/shop/gender.model';

import genders from '../../../../assets/mockbase/shop/genders.json';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private genderList: Gender[] = genders;
  private baseUri = `http://${window.location.hostname}:8000/api/`;
  private headers: HttpHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {}

  getGenderList(useMockService: boolean) {
    if (useMockService) {
      const genderObservable = new Observable<Gender[]>((observer) => {
        setTimeout(() => {
          observer.next(this.genderList);
        }, 100);
      });

      return genderObservable;
    } else {
      let requestUri = `${this.baseUri}shop/gender/`;
      return this.httpClient.get<Gender[]>(requestUri);
    }
  }
}
