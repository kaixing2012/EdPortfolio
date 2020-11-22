import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import capitals from '../../../assets/jsonFiles/capitals.json';
import wonders from '../../../assets/jsonFiles/wonders.json';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private dataList = wonders;

  headers: HttpHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {}

  getDataSet() {
    const dataSetObservable = new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.dataList);
      }, 100);
    });

    return dataSetObservable;
  }

  getDataNames() {
    const nameSetObservable = new Observable((observer) => {
      setTimeout(() => {
        let names = this.dataList.map((data) => data.name);
        observer.next(names);
      }, 100);
    });

    return nameSetObservable;
  }

  getDataByName(nameIn: string) {
    const dataObservable = new Observable((observer) => {
      setTimeout(() => {
        let names = this.dataList.find((data) => data.name === nameIn);
        observer.next(names);
      }, 100);
    });

    return dataObservable;
  }
}

// private searchLngLatBaseURL = `https://www.google.com`;
// let requestingUri = `${this.searchLngLatBaseURL}/search?q=${dataName}`
// return this.httpClient.get(requestingUri, {
//   headers: this.headers,
// });
