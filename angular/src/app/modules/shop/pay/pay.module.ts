import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../modules/material/material.module';

import { PayComponent } from './pay.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [PayComponent, ConfirmDialogComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class PayModule {}
