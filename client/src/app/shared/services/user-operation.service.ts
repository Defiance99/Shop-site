import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs'
import {tap} from 'rxjs/operators'

import {Product, Profile, Message} from './interfaces'
import { Form } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class UserOperationService {

  constructor(private http: HttpClient) {}

  create(form, image): Observable<any> {
    let fd = new FormData()

    if(form.image) {
      fd.append("image", image, image.name)
    }

    fd.append("nameProduct", form.nameProduct)
    fd.append("category", form.category)
    fd.append("cost", String(form.cost))
    fd.append("describe", form.describe)

    return this.http.post<Product>('/api/product/createProducts', fd)
  }

  getMyProducts() {
    return this.http.get<Product>('/api/product/myProducts')
  }

  myProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`/api/product/myProduct/${id}`)
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`/api/product/${id}`)
  }

  getUserInfo(): Observable<Profile> {
    return this.http.get<Profile>("/api/user/userInfo")
  }

  getMyOrder() {
    return this.http.get("/api/order/myOrder")
  }

  removeOrderProduct(id: string): Observable<Message>{
    return this.http.delete<Message>(`/api/order/myOrder/${id}`)
  }
}
