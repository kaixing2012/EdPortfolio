import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingCarComponent } from '../shopping-car/shopping-car.component';
import { LifestyleComponent } from '../lifestyle/lifestyle.component';
import { HomeComponent } from 'src/app/modules/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'shopping-car', component: ShoppingCarComponent },
  { path: 'lifestyle', component: LifestyleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
