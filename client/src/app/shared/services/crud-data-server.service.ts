import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/index'

import {Product} from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class CrudDataServerService {

  constructor(private http: HttpClient) {}

  create(product: Product) {

  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/product/products')
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/product/productByCategory/${category}`)
  }
}
