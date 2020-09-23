import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { FavoritePageComponent } from './favorite-page.component'

const routes: Routes = [{path: '', component: FavoritePageComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteRoutingModule { }
