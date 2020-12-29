import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '../../models/shop/category.model';

import categories from '../../../../assets/mockbase/shop/categories.json';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _categoryList: Category[] = categories;
  private _baseUri = `http://${window.location.hostname}:8000/api/`;
  private _headers: HttpHeaders = new HttpHeaders({});

  constructor(private _httpClient: HttpClient) {}

  getCategoryList(useMockService: boolean) {
    if (useMockService) {
      const categoryObservable = new Observable<Category[]>((observer) => {
        setTimeout(() => {
          observer.next(this._categoryList);
        }, 100);
      });

      return categoryObservable;
    } else {
      let requestUri = `${this._baseUri}shop/category/`;
      return this._httpClient.get<Category[]>(requestUri);
    }
  }
}
