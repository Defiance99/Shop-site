import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs'
import {tap} from 'rxjs/operators'

import {User} from './interfaces'
import { Router } from '@angular/router'


@Injectable()
export class AuthService {

  private token = null


  constructor(private http: HttpClient) {

  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/user/register', user)
  }

  login(user: User): Observable<{token: string}> { //observable
    return this.http.post<{token: string}>('/api/user/login', user)
      .pipe(
        tap( ({token}) => {
          localStorage.setItem('auth-token', token)
          this.setToken(token)
        })
      )
  }

  updateUser(user) {
    return this.http.patch("/api/user/updateUserInfo", user)
  }


  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logOut() {
    this.setToken(null)
    localStorage.clear()
  }
}
