import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MyProductsPageComponent } from './my-products-page.component'

const routes: Routes = [{path: '', component: MyProductsPageComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProductsRoutingModule { }
