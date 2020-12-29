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

  private _genderStr: string = 'women';

  constructor(
    public dialog: MatDialog,
    private _appService: AppService,
    private _sizeService: SizeService,
    private _colorService: ColorService,
    private _genderService: GenderService,
    private _categoryService: CategoryService,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.sizes$ = this._sizeService.getSizeList(
      this._appService.getUseMockeService()
    );

    this.colors$ = this._colorService.getColorList(
      this._appService.getUseMockeService()
    );

    this.genders$ = this._genderService.getGenderList(
      this._appService.getUseMockeService()
    );

    this.categories$ = this._categoryService.getCategoryList(
      this._appService.getUseMockeService()
    );

    this.displayProducts$ = this._productService.displayProducts;
    this._productService.getDisplayProducts(this._genderStr, this.checkboxes);

    this.isMobileMode = this._appService.checkUpMobileSize(window);
    this.isFilterOpened = this.isMobileMode ? false : true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this._appService.checkUpMobileSize(window);
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
    this._genderStr = event.tab.textLabel.toLowerCase();
    this._productService.getDisplayProducts(this._genderStr, this.checkboxes);
  }

  onCheckChange(event: MatCheckboxChange) {
    this._productService.getDisplayProducts(this._genderStr, this.checkboxes);
  }
}
