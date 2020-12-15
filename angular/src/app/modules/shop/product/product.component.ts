import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';

import { ProductDetailComponent } from './product-detail/product-detail.component';

import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';

import { AppService } from 'src/app/app.service';
import { SizeService } from 'src/app/shared/services/size/size.service';
import { ColorService } from 'src/app/shared/services/color/color.service';
import { GenderService } from 'src/app/shared/services/gender/gender.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @ViewChildren('checkbox') checkboxes!: QueryList<any>;

  products = [];
  genders = [];
  sizes = [];
  colors = [];
  categories = [];
  displayList: any[] = [];

  isFilterOpened: boolean = true;
  isMobileMode: boolean;

  tabChangeEvent: MatTabChangeEvent;
  genderStr: string;

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
    this.getSizes();
    this.getColors();
    this.getGenders();
    this.getCategories();
    this.getProducts();
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }

  getSizes() {
    this.sizeService
      .getSizeList(this.appService.getUseMockeService())
      .subscribe(
        (sizes: any[]) => {
          this.sizes = sizes;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getGenders() {
    this.genderService
      .getGenderList(this.appService.getUseMockeService())
      .subscribe(
        (genders: any[]) => {
          this.genders = genders;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getColors() {
    this.colorService
      .getColorList(this.appService.getUseMockeService())
      .subscribe(
        (colors: any[]) => {
          this.colors = colors;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCategories() {
    this.categoryService
      .getCategoryList(this.appService.getUseMockeService())
      .subscribe(
        (categories: any[]) => {
          this.categories = categories;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getProducts() {
    this.productService
      .getProductList(this.appService.getUseMockeService())
      .subscribe(
        (products: any[]) => {
          this.products = products;
          this.getDisplayItemsByCheckboxFilter();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getDisplayItemsByGender(genderStr: string) {
    let result = [];

    this.products
      .filter((product) => product.gender.name === genderStr)
      .forEach((product) => {
        let itemAlreadyIn = result.find(
          (item) => item.productItem.id === product.productItem.id
        );

        if (itemAlreadyIn) {
          itemAlreadyIn.attribute += `-${product.color.name}-${product.size.name}-${product.category.name}`;
        } else {
          result.push({
            productItem: product.productItem,
            category: product.category,
            attribute: `${product.color.name}-${product.size.name}-${product.category.name}`,
          });
        }
      });

    return result;
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

  onOpenDialog(productItem: any, category: any, gender: any) {
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
    this.genderStr = event.tab.textLabel.toLowerCase();
    this.getDisplayItemsByCheckboxFilter();
  }

  onCheckChange(event?: MatCheckboxChange) {
    this.getDisplayItemsByCheckboxFilter();
  }
}
