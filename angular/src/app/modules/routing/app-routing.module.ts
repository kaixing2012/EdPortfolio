import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from '../shop/shop.component';
import { CartComponent } from '../shop/cart/cart.component';
import { ProductComponent } from '../shop/product/product.component';
import { LifestyleComponent } from '../lifestyle/lifestyle.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { MapComponent } from '../map/map.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio/map', component: MapComponent },
  {
    path: 'portfolio/shop',
    component: ShopComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'product',
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
  { path: 'lifestyle', component: LifestyleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
