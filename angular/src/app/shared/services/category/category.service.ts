import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '../../models/shop/category.model';

import categories from '../../../../assets/mockbase/shop/categories.json';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryList: Category[] = categories;
  private baseUri = `http://${window.location.hostname}:8000/api/`;
  private headers: HttpHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {}

  getCategoryList(useMockService: boolean) {
    if (useMockService) {
      const categoryObservable = new Observable<Category[]>((observer) => {
        setTimeout(() => {
          observer.next(this.categoryList);
        }, 100);
      });

      return categoryObservable;
    } else {
      let requestUri = `${this.baseUri}shop/category/`;
      return this.httpClient.get<Category[]>(requestUri);
    }
  }
}
