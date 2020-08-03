import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs'
import {tap} from 'rxjs/operators'

import {Product, Profile, Order} from './interfaces'
import { Form } from '@angular/forms'

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {}

  getMyOrder() {
    return this.http.get<Order>("/api/order/myOrder")
  }

  addToOrder(product: {}) {
    return this.http.post("/api/order/addToOrder", product)
  }
}
