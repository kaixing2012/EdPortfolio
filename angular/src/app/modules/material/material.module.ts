import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

const matModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    matModules
  ]
})
export class MaterialModule { }
