import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs'
import {tap} from 'rxjs/operators'

import {Product, Profile, Order, Message} from './interfaces'
import { Form } from '@angular/forms'

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {}

  removeOrderProduct(id: string): Observable<Message>{
    return this.http.delete<Message>(`/api/order/myOrder/${id}`)
  }

  getMyOrder(): Observable<Order> {
    return this.http.get<Order>("/api/order/myOrder")
  }

  addToOrder(product: {}) {
    return this.http.post("/api/order/addToOrder", product)
  }

  checkout(orderPrice: Number) {
    const params = new HttpParams()
      .set("orderPrice", orderPrice.toString())

    return this.http.get("/api/order/checkout", {params})
  }

  getMyOrdersHistory(): Observable<Order[]> {
    return this.http.get<Order[]>("/api/order/history")
  }
}
