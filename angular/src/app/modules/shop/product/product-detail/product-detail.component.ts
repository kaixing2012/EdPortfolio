import { Component, HostListener, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppService } from 'src/app/app.service';

import { ProductService } from 'src/app/shared/services/product/product.service';

export interface DialogData {
  productItem: any;
  category: any;
  gender: any;
}

export interface ProductModel {
  productItem: any;
  category: any;
  gender: any;
  color: any;
  size: any;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  isMobileMode: boolean;
  productModel: ProductModel;

  products: any[];
  colors: object[];
  sizes: object[];
  imageUrl: string;

  clientColorOptions = [];
  currentColorIndex = 0;

  clientSizeOptions = [];
  currentSizeIndex = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    private appService: AppService,
    private productSetvice: ProductService
  ) {}

  ngOnInit(): void {
    this.getRelatedModels();
    this.isMobileMode = this.appService.checkUpMobileSize(window);
    this.imageUrl = this.data.productItem.coverUrl;

    this.productModel = {
      productItem: this.data.productItem,
      category: this.data.category,
      gender: this.data.gender,
      color: this.clientColorOptions[this.currentColorIndex],
      size: this.clientSizeOptions[this.currentSizeIndex],
    };
  }

  getRelatedModels() {
    this.productSetvice
      .getProductList(this.appService.getUseMockeService())
      .subscribe(
        (products: any) => {
          this.products = products.filter(
            (product) =>
              product.productItem.id === this.data.productItem.id &&
              product.gender.name === this.data.gender.name
          );

          this.colors = [
            ...new Map(
              this.products.map((obj) => [
                obj.color.name,
                { object: obj.color, image: obj.productImage },
              ])
            ).values(),
          ];

          this.sizes = [
            ...new Map(
              this.products.map((obj) => [obj.size.name, { object: obj.size }])
            ).values(),
          ];
        },
        (err) => {
          console.log(err);
        }
      );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let window = event.target as Window;
    this.isMobileMode = this.appService.checkUpMobileSize(window);
  }

  onColorClick(imageUrlIn: string) {
    this.imageUrl = imageUrlIn;
  }

  onAddToCart() {
    if (!this.productModel.color || !this.productModel.size) {
      alert(`
        Please, select your 
        Color or Size or Both

        p.s. Cart function is coming soon
      `);
    } else {
      alert(`
        The following is your order:
          Product Item: ${this.productModel.productItem.name}
          category: ${this.productModel.category.name}
          gender: ${this.productModel.gender.name}
          color: ${this.productModel.color.name}
          size: ${this.productModel.size.name.toUpperCase()}

        p.s. Cart function is coming soon
      `);
    }
  }

  productDetailCls() {
    return {
      'desktop-product-detail': !this.isMobileMode,
      'mobile-product-detail': this.isMobileMode,
    };
  }

  productDetailImgCls() {
    return {
      'desktop-product-detail-img': !this.isMobileMode,
      'mobile-product-detail-img': this.isMobileMode,
    };
  }

  productDetailDescriptionCls() {
    return {
      'desktop-product-detail-description': !this.isMobileMode,
      'mobile-product-detail-description': this.isMobileMode,
    };
  }

  dynamicAddActiveCls(model: any, object: any) {
    if (model) {
      if (model.id === object.id) return 'active';
    }
  }

  dynamicBackgroundColor(color: string) {
    return {
      backgroundColor: color,
    };
  }
}
