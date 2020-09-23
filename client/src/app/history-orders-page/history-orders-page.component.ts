import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core'
import { MaterializeService, MaterialInstance} from '../shared/classes/materialilze.service'
import { OrderService } from '../shared/services/order.service'
import { Order } from '../shared/interfaces'
import { Observable } from 'rxjs/index'

@Component({
  selector: 'app-history-orders-page',
  templateUrl: './history-orders-page.component.html',
  styleUrls: ['./history-orders-page.component.css']
})
export class HistoryOrdersPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("collapsible") collapsibleRef: ElementRef
  orders$: Observable<Order[]>
  collapsible: MaterialInstance

  constructor(private orderSerivce: OrderService) { }

  ngOnInit(): void {
    this.orders$ = this.orderSerivce.getMyOrdersHistory()
  }

  ngOnDestroy() {
    /* this.collapsible.destroy() */

  }

  ngAfterViewInit() {
    this.collapsible = MaterializeService.initCollapsiblePopout(this.collapsibleRef)
  }

  open() {
    this.collapsible.open()
  }

}
