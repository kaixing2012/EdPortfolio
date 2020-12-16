import { Component, HostListener, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Product } from 'src/app/shared/models/shop/product.model';
import { ProductDesign } from 'src/app/shared/models/shop/product-design.model';

import { AppService } from 'src/app/app.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

export interface DialogDat {
  productItem: any;
  category: any;
  gender: any;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productDesign: ProductDesign = {
    colorsAndImages: [],
    sizes: [],
  };

  product: Product;

  imageUrl: string;
  isMobileMode: boolean;

  clientColorOptions = [];
  currentColorIndex = 0;

  clientSizeOptions = [];
  currentSizeIndex = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDat,
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    private appService: AppService,
    private productSetvice: ProductService
  ) {}

  ngOnInit(): void {
    this.getRelatedModels();
    this.isMobileMode = this.appService.checkUpMobileSize(window);
    this.imageUrl = this.data.productItem.coverUrl;

    this.product = {
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
        (products: Product[]) => {
          let filteredProducts = products.filter(
            (product) =>
              product.productItem.id === this.data.productItem.id &&
              product.gender.name === this.data.gender.name
          );

          this.productDesign.colorsAndImages = [
            ...new Map(
              filteredProducts.map((product) => [
                product.productItem.name,
                { color: product.color, image: product.productImage },
              ])
            ).values(),
          ];

          this.productDesign.sizes = [
            ...new Map(
              filteredProducts.map((obj) => [obj.size.name, obj.size])
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
    if (!this.product.color || !this.product.size) {
      alert(`
        Please, select your 
        Color or Size or Both

        p.s. Cart function is coming soon
      `);
    } else {
      alert(`
        The following is your order:
          Product Item: ${this.product.productItem.name}
          category: ${this.product.category.name}
          gender: ${this.product.gender.name}
          color: ${this.product.color.name}
          size: ${this.product.size.name.toUpperCase()}

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

  dynamicAddActiveCls(currentObj: any, toActivateObj: any) {
    if (currentObj) {
      if (currentObj.id === toActivateObj.id) return 'active';
    }
  }

  dynamicBackgroundColor(color: string) {
    return {
      backgroundColor: color,
    };
  }
}
