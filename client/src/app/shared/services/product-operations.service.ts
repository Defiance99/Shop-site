import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs'
import {tap} from 'rxjs/operators'

import {Product, Profile, Message, Comment} from '../interfaces'
import { Form } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class ProductOperationsService {

  constructor(private http: HttpClient) {}

  addCommentToProduct(form: any, productId: string, stars: number) {
    let comment = {
      form, productId, stars
    }

    return this.http.post<Comment>('/api/comment/createComment', comment)
  }

  getCommentsByProductId(id: string): Observable<Comment> {
    return this.http.get<Comment>(`/api/comment/getCommentsByProductId/${id}`)
  }
}
