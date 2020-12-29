import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MatCheckbox } from '@angular/material/checkbox';

import { Product } from '../../models/shop/product.model';
import { ProductDisplay } from '../../models/shop/product-display.model';

import { AppService } from 'src/app/app.service';

import products from '../../../../assets/mockbase/shop/products.json';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _productList: any[] = products;
  private _baseUri = `http://${window.location.hostname}:8000/api/`;
  private _headers: HttpHeaders = new HttpHeaders({});

  private _displayProductBehaviour = new BehaviorSubject<ProductDisplay[]>(
    [] as ProductDisplay[]
  );

  displayProducts = this._displayProductBehaviour.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService
  ) {}

  getDisplayProducts(genderStr: string, checkboxes: QueryList<MatCheckbox>) {
    this.getProductList(this._appService.getUseMockeService()).subscribe(
      (products) => {
        let displayProducts = [] as ProductDisplay[];

        products
          .filter((product) => product.gender.name === genderStr)
          .forEach((product) => {
            let itemAlreadyIn = displayProducts.find(
              (item) => item.productItem.id === product.productItem.id
            );

            if (itemAlreadyIn) {
              itemAlreadyIn.attribute += `-${product.color.name}-${product.size.name}-${product.category.name}`;
            } else {
              displayProducts.push({
                productItem: product.productItem,
                category: product.category,
                attribute: `${product.color.name}-${product.size.name}-${product.category.name}`,
              });
            }
          });

        displayProducts = this.getDisplayItemsByCheckboxFilter(
          checkboxes,
          displayProducts
        );

        this.setDisplayProducts(displayProducts);
      }
    );
  }

  setDisplayProducts(displayProducts: ProductDisplay[]) {
    this._displayProductBehaviour.next(displayProducts);
  }

  getProductList(useMockService: boolean) {
    if (useMockService) {
      const productObservable = new Observable<Product[]>((observer) => {
        setTimeout(() => {
          observer.next(this._productList);
        }, 100);
      });

      return productObservable;
    } else {
      let requestUri = `${this._baseUri}shop/product/`;
      return this._httpClient.get<Product[]>(requestUri);
    }
  }

  getDisplayItemsByCheckboxFilter(
    checkboxes: QueryList<MatCheckbox>,
    displayProducts: ProductDisplay[]
  ) {
    let allUnchecked = checkboxes.filter(
      (box: MatCheckbox) => box.checked === false
    );

    if (allUnchecked.length === checkboxes.length) {
      return displayProducts;
    } else {
      return displayProducts.filter((displayItem) => {
        let attributes = displayItem.attribute.split('-');

        for (let attr of attributes) {
          for (let box of checkboxes) {
            if (attr === box.name && box.checked === true) {
              return true;
            }
          }
        }
        return false;
      });
    }
  }
}
