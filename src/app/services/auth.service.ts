import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private baseAddr = environment.apiAddr;

  constructor(private http: HttpClient) { }

  login(user, success_callback, error_callback?) {
    // console.log(user);
    return this.http.post(this.baseUrl + '/login', {
      'email': user.username,
      'password': user.password
    }).subscribe(res => {
      sessionStorage.setItem('auth', JSON.stringify({
        'token': res['access_token'],
        'utype': 'user'
      }));
      success_callback(res);
    }, error => {
      error_callback(error);
    });
  }

  adminLogin(user, success_callback, error_callback?) {
    // console.log(user);
    return this.http.post<any>(this.baseUrl + '/admin-login', {
      'email': user.username,
      'password': user.password
    }).subscribe(res => {
      sessionStorage.setItem('auth', JSON.stringify({
        'token': res['access_token'],
        'utype': 'admin'
      }));
      success_callback(res);
    }, error => {
      error_callback(error);
    });
  }

  logout(callback): void {
    sessionStorage.removeItem('auth');
    callback();
  }

  get isLoggedIn(): boolean {
    const user = this._getUserFromSession();
    if (!user) {
      return false;
    }
    return true;
  }

  get getUserToken(): string {
    const user = this._getUserFromSession();
    return user['token'];
  }

  get getUType(): any {
    const user = this._getUserFromSession();
    // console.log(user);
    if (user) {
      return user['utype'];
    }
  }

  get baseUrl(): String {
    return this.baseAddr + '/api';
  }
  get baseAdd(): String {
    return this.baseAddr;
  }

  private _getUserFromSession(): any {
    return JSON.parse(sessionStorage.getItem('auth'));
  }
}
