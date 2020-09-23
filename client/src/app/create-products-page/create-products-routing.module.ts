import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CreateProductsPageComponent } from './create-products-page.component'

const routes: Routes = [{path: '', component: CreateProductsPageComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateProductshRoutingModule { }
