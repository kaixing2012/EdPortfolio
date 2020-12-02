import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../routing/app-routing.module';
import { MaterialModule } from '../../modules/material/material.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

import { ShopComponent } from './shop.component';

@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    ProductModule,
    CartModule,
  ],
})
export class ShopModule {}
