import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  getAll(userName, productsUrl) {
    return this.http.get(`${productsUrl}?user=${userName}`).map(res => res.json());
  }

}
