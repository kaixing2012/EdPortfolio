import {
  Component,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

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

  constructor(
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
          this.displayList = this.products;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onOpenFilter() {
    this.isFilterOpened = !this.isFilterOpened;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }

  onChange(event: MatCheckboxChange) {
    let allUnchecked = this.checkboxes.filter(
      (box: MatCheckbox) => box.checked === false
    );

    if (allUnchecked.length === this.checkboxes.length) {
      this.displayList = this.products;
    } else {
      this.displayList = this.products.filter((product) => {
        let box: MatCheckbox;
        for (box of this.checkboxes) {
          if (
            (product.color.name === box.name ||
              product.size.name === box.name ||
              product.category.name === box.name) &&
            box.checked === true
          ) {
            return true;
          }
        }
      });
    }
  }
}
