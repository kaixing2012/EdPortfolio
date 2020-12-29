import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Gender } from '../../models/shop/gender.model';

import genders from '../../../../assets/mockbase/shop/genders.json';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private _genderList: Gender[] = genders;
  private _baseUri = `http://${window.location.hostname}:8000/api/`;
  private _headers: HttpHeaders = new HttpHeaders({});

  constructor(private _httpClient: HttpClient) {}

  getGenderList(useMockService: boolean) {
    if (useMockService) {
      const genderObservable = new Observable<Gender[]>((observer) => {
        setTimeout(() => {
          observer.next(this._genderList);
        }, 100);
      });

      return genderObservable;
    } else {
      let requestUri = `${this._baseUri}shop/gender/`;
      return this._httpClient.get<Gender[]>(requestUri);
    }
  }
}
