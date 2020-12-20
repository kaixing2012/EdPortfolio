import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './modules/routing/app-routing.module';
import { ShopModule } from './modules/shop/shop.module';
import { MaterialModule } from '../app/modules/material/material.module';
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
    ShopModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
