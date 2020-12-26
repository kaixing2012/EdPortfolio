import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../routing/app-routing.module';
import { MaterialModule } from '../../../modules/material/material.module';

import { CartComponent } from './cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
})
export class CartModule {}
