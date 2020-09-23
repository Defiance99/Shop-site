import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AuthGuard } from './shared/classes/auth.guard'

import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component'
import { ShopMainLayoutComponent } from './shared/layouts/shop-main-layout/shop-main-layout.component'
/* import { MainPageComponent } from './main-page/main-page.component'
import { CreateProductsPageComponent } from './create-products-page/create-products-page.component'
import { AuthPageComponent } from './auth-page/auth-page.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import { MyProductsPageComponent } from './my-products-page/my-products-page.component'
import { CategoryPageComponent } from './category-page/products-page.component'
import { ProductPageComponent } from './product-page/product-page.component'
import { OrderPageComponent } from './order-page/order-page.component'
import { ProfilePageComponent } from './profile-page/profile-page.component'
import { HistoryOrdersPageComponent } from './history-orders-page/history-orders-page.component'
import { FavoritePageComponent } from './favorite-page/favorite-page.component' */


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      /* {path: '', component: MainPageComponent}, */
      /* {path: 'login', component: AuthPageComponent}, */
      /* {path: 'register', component: RegisterPageComponent}, */
      {path: '', loadChildren: () => import('./main-page/main-routing.module').then(m => m.MainRoutingModule)},
      {path: 'login', loadChildren: () => import('./auth-page/auth-routing.module').then(m => m.AuthRoutingModule)},
      {path: 'register', loadChildren: () => import('./register-page/register-routing.module').then(m => m.RegisterRoutingModule)}
    ]
  },
  {
    path: '', component: ShopMainLayoutComponent, canActivate: [AuthGuard], children: [
    /* {path: 'catalog', component: MainPageComponent},
    {path: 'createProducts', component: CreateProductsPageComponent},
    {path: 'myProducts', component: MyProductsPageComponent},
    {path: 'profile', component: ProfilePageComponent},
    {path: 'category/:categoryName', component: CategoryPageComponent},
    {path: 'product/:id', component: ProductPageComponent},
    {path: 'order', component: OrderPageComponent},
    {path: 'historyOrders', component: HistoryOrdersPageComponent},
    {path: 'favorite', component: FavoritePageComponent}, */
    {path: 'catalog', loadChildren: () => import('./main-page/main-routing.module').then(m => m.MainRoutingModule)},
    {path: 'createProducts', loadChildren: () => import('./create-products-page/create-products-routing.module').then(m => m.CreateProductshRoutingModule)},
    {path: 'myProducts', loadChildren: () => import('./my-products-page/my-products-routing.module').then(m => m.MyProductsRoutingModule)},
    {path: 'profile', loadChildren: () => import('./profile-page/profile-routing.module').then(m => m.ProfileRoutingModule)},
    {path: 'category/:categoryName', loadChildren: () => import('./category-page/category-routing.module').then(m => m.CategoryRoutingModule)},
    {path: 'product/:id', loadChildren: () => import('./product-page/product-routing.module').then(m => m.ProductRoutingModule)},
    {path: 'order', loadChildren: () => import('./order-page/order-routing.module').then(m => m.OrderRoutingModule)},
    {path: 'historyOrders', loadChildren: () => import('./history-orders-page/history-orders-routing.module').then(m => m.HistoryOrdersRoutingModule)},
    {path: 'favorite', loadChildren: () => import('./favorite-page/favorite-routing.module').then(m => m.FavoriteRoutingModule)},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: "enabled",
    preloadingStrategy: PreloadAllModules,
  }),
  ReactiveFormsModule, FormsModule],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
