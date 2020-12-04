import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import categories from '../../../../assets/mockbase/shop/categories.json';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryList: any[] = categories;
  private baseUri = `http://${window.location.hostname}:8000/api/`;

  headers: HttpHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {}

  getCategoryList(useMockService: boolean) {
    if (useMockService) {
      const nameSetObservable = new Observable((observer) => {
        setTimeout(() => {
          observer.next(this.categoryList);
        }, 100);
      });

      return nameSetObservable;
    } else {
      let requestUri = `${this.baseUri}wonder/`;
      return this.httpClient.get(requestUri);
    }
  }
}
