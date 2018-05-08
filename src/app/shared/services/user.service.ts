import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import * as requestConstant from './server-configuration';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService implements OnDestroy {
  private _serverUrl;
  private _publishUrl;
  private _productsUrl;
  private readonly apiUrl = './assets/json/config.json';

  constructor(private http: Http) { }

  loadConfig(): Observable<any> {
    return this.http.get(this.apiUrl).map(res => {
      const data = res.json();
      this._serverUrl = data['serverUrl'];
      this._publishUrl = data['publishUrl'];
      this._productsUrl = data['productsUrl'];
      return res.json();
    });
  }

  getCurrentUser() {
    return localStorage.getItem('user');
  }
  setCurrentUser(user) {
    return localStorage.setItem('user', user);
  }
  getCurrentProduct() {
    return localStorage.getItem('product');
  }
  setCurrentProduct(product) {
    return localStorage.setItem('product', product);
  }
  get serverUrl() {
    return this._serverUrl;
  }
  get publishUrl() {
    return this._publishUrl;
  }
  get productsUrl() {
    return this._productsUrl;
  }
  ngOnDestroy() {
    localStorage.removeItem('user');
    localStorage.removeItem('product');
  }
}
