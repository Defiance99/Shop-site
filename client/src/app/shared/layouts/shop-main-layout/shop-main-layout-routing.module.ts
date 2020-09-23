import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ShopMainLayoutComponent } from './shop-main-layout.component'

const routes: Routes = [{path: '', component: ShopMainLayoutComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopMainLayoutRoutingModule { }
