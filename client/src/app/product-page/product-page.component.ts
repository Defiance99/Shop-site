import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Product } from '../shared/services/interfaces'
import { UserOperationService } from '../shared/services/user-operation.service'
import { OrderService } from '../shared/services/order.service'
import { MaterializeService } from '../shared/classes/materialilze.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product: Product
  id: string
  productSub: Subscription
  constructor(private route: ActivatedRoute, private userService: UserOperationService, private order: OrderService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    this.id = id
    this.userService.getProductById(id).subscribe(
      (data) => this.product = data
    )
  }

  ngOnDestroy() {
    if (this.productSub) {
      this.productSub.unsubscribe()
    }
  }

  addToOrder() {
    let product = {
      "productId": this.id,
      "name": this.product.name,
      "cost": this.product.cost,
      "description": this.product.description,
    }
    this.productSub = this.order.addToOrder(product).subscribe(
      () => MaterializeService.toast("Успешно добавлено"),
      (err) => MaterializeService.toast(err.error.message)
    )
  }
}
