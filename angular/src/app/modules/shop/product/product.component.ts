import {
  Component,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';

import { Observable } from 'rxjs';

import { ProductDetailComponent } from './product-detail/product-detail.component';

import { Size } from '../../../shared/models/shop/size.model';
import { Color } from '../../../shared/models/shop/color.model';
import { Gender } from '../../../shared/models/shop/gender.model';
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
  @ViewChildren('checkbox') checkboxes = new QueryList<MatCheckbox>();

  sizes$ = new Observable<Size[]>();
  colors$ = new Observable<Color[]>();
  genders$ = new Observable<Gender[]>();
  categories$ = new Observable<Category[]>();
  displayProducts$ = new Observable<ProductDisplay[]>();

  isFilterOpened: boolean = true;
  isMobileMode: boolean = false;

  private genderStr: string = 'women';

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
    this.sizes$ = this.sizeService.getSizeList(
      this.appService.getUseMockeService()
    );

    this.colors$ = this.colorService.getColorList(
      this.appService.getUseMockeService()
    );

    this.genders$ = this.genderService.getGenderList(
      this.appService.getUseMockeService()
    );

    this.categories$ = this.categoryService.getCategoryList(
      this.appService.getUseMockeService()
    );

    this.displayProducts$ = this.productService.displayProducts;
    this.productService.getDisplayProducts(this.genderStr, this.checkboxes);

    this.isMobileMode = this.appService.checkUpMobileSize(window);
    this.isFilterOpened = this.isMobileMode ? false : true;
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
    this.dialog.open(ProductDetailComponent, {
      width: '100%',
      data: {
        productItem: productItem,
        category: category,
        gender: gender,
      },
    });
  }

  onTabChange(event: MatTabChangeEvent) {
    this.genderStr = event.tab.textLabel.toLowerCase();
    this.productService.getDisplayProducts(this.genderStr, this.checkboxes);
  }

  onCheckChange(event: MatCheckboxChange) {
    this.productService.getDisplayProducts(this.genderStr, this.checkboxes);
  }
}
