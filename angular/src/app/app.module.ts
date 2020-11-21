import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './modules/routing/app-routing.module';
import { MaterialModule } from '../app/modules/material/material.module';
import { ShoppingCarModule } from './modules/shopping-car/shopping-car.module'
import { LifestyleModule } from '../app/modules/lifestyle/lifestyle.module'
import { HomeModule } from '../app/modules/home/home.module'

import { AppComponent } from './app.component';
import { NavigatorComponent } from './shared/components/navigator/navigator.component'

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    HomeModule,
    LifestyleModule,
    ShoppingCarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
