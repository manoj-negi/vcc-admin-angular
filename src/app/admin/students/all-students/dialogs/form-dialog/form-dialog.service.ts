import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Roles,Countries,Products } from './form-dialog.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>('http://192.168.29.54:8081/api/v1/role');
  }

  getCountries(): Observable<Countries[]> {
    return this.http.get<Countries[]>('http://192.168.29.54:8081/api/v1/country');
  }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>('http://192.168.29.54:8081/api/v1/product');
  }
}



