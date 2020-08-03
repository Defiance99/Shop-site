import { Component, OnInit } from '@angular/core'
import { MaterializeService } from '../shared/classes/materialilze.service'
import { OrderService } from '../shared/services/order.service'
import { UserOperationService } from '../shared/services/user-operation.service'
import { Order } from '../shared/services/interfaces'

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  items: Order

  constructor(private order: OrderService, private user: UserOperationService) { }

  ngOnInit(): void {
    this.user.getMyOrder().subscribe(
      (data: Order) => {
        this.items = data[0].list
      },
      (err) => MaterializeService.toast(err.error.message)
    )
  }

  delProduct(id: string) {
    this.user.removeOrderProduct(id).subscribe(
      (message) => MaterializeService.toast("Успешно удалено"),
      (err) => MaterializeService.toast(err.error.message)
    )
  }

}
