import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/index'

import {Product, Profile, Message} from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class UserOperationService {

  constructor(private http: HttpClient) {}

  getMyFavoriteProducts(): Observable<Product> {
    return this.http.get<Product>("/api/favorite/myFavoriteProducts")
  }

  getMyFavoriteComments(): Observable<Comment> {
    return this.http.get<Comment>("/api/favorite/myFavoriteComments")
  }

}
