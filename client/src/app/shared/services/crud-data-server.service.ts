import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs'
import {tap} from 'rxjs/operators'

import {Product} from './interfaces'

@Injectable({
  providedIn: 'root'
})
export class CrudDataServerService {

  constructor(private http: HttpClient) {}

  create(product: Product) {

  }

  getProducts() {
    return this.http.get('/api/product/getProducts')
  }

  getProductsByCategory(category) {
    return this.http.get<Product>(`/api/product/productByCategory/${category}`)
  }
}
