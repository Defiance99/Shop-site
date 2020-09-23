import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HistoryOrdersPageComponent } from './history-orders-page.component'

const routes: Routes = [{path: '', component: HistoryOrdersPageComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryOrdersRoutingModule { }
