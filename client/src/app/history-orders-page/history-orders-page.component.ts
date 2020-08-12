import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core'
import { MaterializeService, MaterialInstance} from '../shared/classes/materialilze.service'
import { OrderService } from '../shared/services/order.service'
import { UserOperationService } from '../shared/services/user-operation.service'
import { Order, Message } from '../shared/services/interfaces'
import { Observable } from 'rxjs'

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
    /* this.collapsiblePo = MaterializeService.collapsiblePopout() */
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
