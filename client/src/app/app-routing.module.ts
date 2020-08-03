import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component'
import { ShopMainLayoutComponent } from './shared/layouts/shop-main-layout/shop-main-layout.component'
import { MainPageComponent } from './main-page/main-page.component'
import { CreateProductsPageComponent } from './create-products-page/create-products-page.component'
import { AuthPageComponent } from './auth-page/auth-page.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import { MyProductsPageComponent } from './my-products-page/my-products-page.component'
import { AuthGuard } from './shared/classes/auth.guard'
import { ProductFormPageComponent } from './my-product-form-page/product-form-page.component'
import { CategoryPageComponent } from './category-page/products-page.component'
import { ProductPageComponent } from './product-page/product-page.component'
import { OrderPageComponent } from './order-page/order-page.component'
import { ProfilePageComponent } from './profile-page/profile-page.component'


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', component: MainPageComponent},
      {path: 'login', component: AuthPageComponent},
      {path: 'register', component: RegisterPageComponent},
    ]
  },
  {path: '', component: ShopMainLayoutComponent, canActivate: [AuthGuard], children: [
    {path: 'catalog', component: MainPageComponent},
    {path: 'createProducts', component: CreateProductsPageComponent},
    {path: 'myProducts', component: MyProductsPageComponent},
    {path: 'myProduct/:id', component: ProductFormPageComponent},
    {path: 'profile', component: ProfilePageComponent},
    {path: 'category/:categoryName', component: CategoryPageComponent},
    {path: 'product/:id', component: ProductPageComponent},
    {path: 'order', component: OrderPageComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule, FormsModule],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
