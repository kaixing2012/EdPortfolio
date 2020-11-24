import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './modules/routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/modules/material/material.module';
import { ShoppingCarModule } from './modules/shopping-car/shopping-car.module';
import { LifestyleModule } from '../app/modules/lifestyle/lifestyle.module';
import { HomeModule } from '../app/modules/home/home.module';
import { MapModule } from '../app/modules/map/map.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    HomeModule,
    MapModule,
    LifestyleModule,
    ShoppingCarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
