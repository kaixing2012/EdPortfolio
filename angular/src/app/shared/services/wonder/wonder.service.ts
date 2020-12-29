import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Wonder } from '../../models/map/wonder.model';

import wonders from '../../../../assets/mockbase/map/wonders.json';

@Injectable({
  providedIn: 'root',
})
export class WonderService {
  private _wonderList: any[] = wonders;
  private _baseUri = `http://${window.location.hostname}:8000/api/`;
  private _headers: HttpHeaders = new HttpHeaders({});

  constructor(private _httpClient: HttpClient) {}

  getWonderList(useMockService: boolean) {
    if (useMockService) {
      const nameSetObservable = new Observable<Wonder[]>((observer) => {
        setTimeout(() => {
          observer.next(this._wonderList);
        }, 100);
      });

      return nameSetObservable;
    } else {
      let requestUri = `${this._baseUri}map/wonder/`;
      return this._httpClient.get<Wonder[]>(requestUri);
    }
  }

  getWonderDetail(id: string, useMockService: boolean) {
    if (useMockService) {
      const dataObservable = new Observable<Wonder>((observer) => {
        setTimeout(() => {
          let parsedId = parseInt(id);
          let names = this._wonderList.find((data) => data.id === parsedId);
          observer.next(names);
        }, 100);
      });

      return dataObservable;
    } else {
      let requestUri = `${this._baseUri}map/wonder/${id}`;
      return this._httpClient.get<Wonder>(requestUri);
    }
  }
}
