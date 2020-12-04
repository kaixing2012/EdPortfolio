import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Wonder } from '../../models/wonder.model';

import wonders from '../../../../assets/mockbase/map/wonders.json';

@Injectable({
  providedIn: 'root',
})
export class WonderService {
  private wonderList: Wonder[] = wonders;
  private baseUri = `http://${window.location.hostname}:8000/api/`;

  headers: HttpHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {}

  getWonderList(useMockService: boolean) {
    if (useMockService) {
      const nameSetObservable = new Observable((observer) => {
        setTimeout(() => {
          observer.next(this.wonderList);
        }, 100);
      });

      return nameSetObservable;
    } else {
      let requestUri = `${this.baseUri}wonder/`;
      return this.httpClient.get(requestUri);
    }
  }

  getWonderDetail(id: string, useMockService: boolean) {
    if (useMockService) {
      const dataObservable = new Observable((observer) => {
        setTimeout(() => {
          let parsedId = parseInt(id);
          let names = this.wonderList.find((data) => data.id === parsedId);
          observer.next(names);
        }, 100);
      });

      return dataObservable;
    } else {
      let requestUri = `${this.baseUri}wonder/${id}`;
      return this.httpClient.get(requestUri);
    }
  }
}
