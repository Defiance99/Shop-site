import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core'
import { MaterializeService, MaterialInstance} from '../shared/classes/materialilze.service'
import { OrderService } from '../shared/services/order.service'
import { Order } from '../shared/services/interfaces'

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("collapsible") collapsibleRef: ElementRef
  @ViewChild("modal") modalRef: ElementRef
  orderPrice: number = 0
  items: any
  modal: MaterialInstance
  collapsible: MaterialInstance

  constructor(private order: OrderService) { }

  ngOnInit(): void {
    this.order.getMyOrder().subscribe(
      (data: Order) => {
        if (data) this.items = data[0].list
        else this.items = null
      },
      (err) => MaterializeService.toast(err.error.message)
    )
  }

  ngOnDestroy() {
    this.collapsible.destroy()
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.collapsible = MaterializeService.initCollapsiblePopout(this.collapsibleRef)
    this.modal = MaterializeService.initModal(this.modalRef)
  }

  delProduct(id: string) {
    this.order.removeOrderProduct(id).subscribe(
      (message) => {
        this.computePrice()
        MaterializeService.toast(message.message)
      },
      (err) => MaterializeService.toast(err.error.message)
    )
  }

  computePrice() {
    this.orderPrice = this.items.reduce(
      (total: Number, product: any) => total += product.cost, 0)
  }

  checkout() {
    this.order.checkout(this.orderPrice).subscribe(
      (message) => {
        MaterializeService.toast("Заказ выполнен")
        this.clear()
      },
      (err) => MaterializeService.toast(err.error.message)
    )
  }

  clear() {
    this.items = null
  }
}
