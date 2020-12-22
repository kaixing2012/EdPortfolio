import {
  Component,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { ProductDetailComponent } from './product-detail/product-detail.component';

import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';

import { Size } from '../../../shared/models/shop/size.model';
import { Color } from '../../../shared/models/shop/color.model';
import { Gender } from '../../../shared/models/shop/gender.model';
import { Product } from '../../../shared/models/shop/product.model';
import { Category } from '../../../shared/models/shop/category.model';
import { ProductDisplay } from '../../../shared/models/shop/product-display.model';

import { AppService } from 'src/app/app.service';
import { SizeService } from 'src/app/shared/services/size/size.service';
import { ColorService } from 'src/app/shared/services/color/color.service';
import { GenderService } from 'src/app/shared/services/gender/gender.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ProductItem } from 'src/app/shared/models/shop/product-item.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @ViewChildren('checkbox') checkboxes!: QueryList<any>;

  sizes: Size[] = [];
  colors: Color[] = [];
  genders: Gender[] = [];
  products: Product[] = [];
  categories: Category[] = [];
  displayList: ProductDisplay[] = [];

  isFilterOpened: boolean = true;
  isMobileMode: boolean = false;

  private genderStr: string = '';

  constructor(
    public dialog: MatDialog,
    private appService: AppService,
    private sizeService: SizeService,
    private colorService: ColorService,
    private genderService: GenderService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.requestSizes();
    this.requestColors();
    this.requestGenders();
    this.requestCategories();
    this.requestProducts();
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }

  requestSizes() {
    this.sizeService
      .getSizeList(this.appService.getUseMockeService())
      .subscribe(
        (sizes: Size[]) => {
          this.sizes = sizes;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  requestGenders() {
    this.genderService
      .getGenderList(this.appService.getUseMockeService())
      .subscribe(
        (genders: Gender[]) => {
          this.genders = genders;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  requestColors() {
    this.colorService
      .getColorList(this.appService.getUseMockeService())
      .subscribe(
        (colors: Color[]) => {
          this.colors = colors;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  requestCategories() {
    this.categoryService
      .getCategoryList(this.appService.getUseMockeService())
      .subscribe(
        (categories: Category[]) => {
          this.categories = categories;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  requestProducts() {
    this.productService
      .getProductList(this.appService.getUseMockeService())
      .subscribe(
        (products: Product[]) => {
          this.products = products;
          this.getDisplayItemsByCheckboxFilter();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getDisplayItemsByGender(genderStr: string) {
    let productDisplay: ProductDisplay[] = [];

    this.products
      .filter((product) => product.gender.name === genderStr)
      .forEach((product) => {
        let itemAlreadyIn = productDisplay.find(
          (item) => item.productItem.id === product.productItem.id
        );

        if (itemAlreadyIn) {
          itemAlreadyIn.attribute += `-${product.color.name}-${product.size.name}-${product.category.name}`;
        } else {
          productDisplay.push({
            productItem: product.productItem,
            category: product.category,
            attribute: `${product.color.name}-${product.size.name}-${product.category.name}`,
          });
        }
      });

    return productDisplay;
  }

  getDisplayItemsByCheckboxFilter() {
    let allUnchecked = this.checkboxes.filter(
      (box: MatCheckbox) => box.checked === false
    );

    if (allUnchecked.length === this.checkboxes.length) {
      this.displayList = this.getDisplayItemsByGender(this.genderStr);
    } else {
      this.displayList = this.getDisplayItemsByGender(this.genderStr).filter(
        (displayItem) => {
          let box: MatCheckbox;

          let attributes = displayItem.attribute.split('-');

          for (let attr of attributes) {
            for (box of this.checkboxes) {
              if (attr === box.name && box.checked === true) {
                return true;
              }
            }
          }

          return false;
        }
      );
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }

  onOpenFilter() {
    this.isFilterOpened = !this.isFilterOpened;
  }

  onOpenDialog(productItem: ProductItem, category: Category, gender: Gender) {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '100%',
      data: {
        productItem: productItem,
        category: category,
        gender: gender,
      },
    });
  }

  onTabChange(event?: MatTabChangeEvent) {
    if (event) {
      this.genderStr = event.tab.textLabel.toLowerCase();
      this.getDisplayItemsByCheckboxFilter();
    }
  }

  onCheckChange(event?: MatCheckboxChange) {
    this.getDisplayItemsByCheckboxFilter();
  }
}
