import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../modules/material/material.module';

import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [ProductComponent, ProductDetailComponent],
  imports: [CommonModule, MaterialModule],
})
export class ProductModule {}
