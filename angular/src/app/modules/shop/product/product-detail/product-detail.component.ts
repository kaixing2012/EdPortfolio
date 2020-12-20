import { Component, HostListener, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Product } from 'src/app/shared/models/shop/product.model';
import { ProductDesign } from 'src/app/shared/models/shop/product-design.model';
import { ProductDialog } from 'src/app/shared/models/shop/product-dialog.model';

import { AppService } from 'src/app/app.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ShoppingItemService } from 'src/app/shared/services/shopping-item/shopping-item.service';
import { HttpResponse } from '@angular/common/http';

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
  filteredProducts: Product[];

  imageUrl: string;
  isMobileMode: boolean;

  clientColorOptions = [];
  currentColorIndex = 0;

  clientSizeOptions = [];
  currentSizeIndex = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductDialog,
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    private snackBar: MatSnackBar,
    private appService: AppService,
    private productService: ProductService,
    private shoppingItemService: ShoppingItemService
  ) {}

  ngOnInit(): void {
    this.getRelatedModels();
    this.isMobileMode = this.appService.checkUpMobileSize(window);
    this.imageUrl = this.data.productItem.cover;

    this.product = {
      productItem: this.data.productItem,
      category: this.data.category,
      gender: this.data.gender,
      color: this.clientColorOptions[this.currentColorIndex],
      size: this.clientSizeOptions[this.currentSizeIndex],
    };
  }

  getRelatedModels() {
    this.productService
      .getProductList(this.appService.getUseMockeService())
      .subscribe(
        (products: Product[]) => {
          this.filteredProducts = products.filter(
            (product) =>
              product.productItem.id === this.data.productItem.id &&
              product.gender.name === this.data.gender.name
          );

          this.productDesign.colorsAndImages = [
            ...new Map(
              this.filteredProducts.map((product) => [
                product.color.id,
                {
                  color: product.color,
                  productImage: product.productImage,
                },
              ])
            ).values(),
          ];

          this.productDesign.sizes = [
            ...new Map(
              this.filteredProducts.map((product) => [
                product.size.id,
                product.size,
              ])
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
      let msg = 'Please, select your Color or Size or Both';
      this.onOpenSnackBar(msg, 'Close');
    } else {
      let productPicked = this.filteredProducts.find(
        (product) =>
          product.productItem.id === this.product.productItem.id &&
          product.category.id === this.product.category.id &&
          product.gender.id === this.product.gender.id &&
          product.color.id === this.product.color.id &&
          product.size.id === this.product.size.id
      );

      let amount = 1;

      this.shoppingItemService.addShoppingItem(productPicked, amount).subscribe(
        (response: HttpResponse<any>) => {
          let body = response.body;

          if (body) {
            let msg = body.message;
            this.onOpenSnackBar(msg, 'Close');
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onOpenSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      // panelClass: 'snackbar',
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
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
