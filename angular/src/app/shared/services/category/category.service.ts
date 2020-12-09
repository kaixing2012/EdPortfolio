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
      const categoryObservable = new Observable((observer) => {
        setTimeout(() => {
          observer.next(this.categoryList);
        }, 100);
      });

      return categoryObservable;
    } else {
      let requestUri = `${this.baseUri}category/`;
      return this.httpClient.get(requestUri);
    }
  }
}
