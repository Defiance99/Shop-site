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

  getMyFavoriteProducts(): Observable<Product> {
    return this.http.get<Product>("/api/favorite/myFavoriteProducts")
  }

  getMyFavoriteComments(): Observable<Comment> {
    return this.http.get<Comment>("/api/favorite/myFavoriteComments")
  }

}
