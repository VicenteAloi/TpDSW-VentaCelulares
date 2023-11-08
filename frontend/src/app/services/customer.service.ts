import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private myAppUrl: string;
  private myApiUrl: string;
  behaviorSubject = new BehaviorSubject<any>('');

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/customers'
  }


  getSalesUser(id: any) {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  updateCustomers(dni: any, user: any) {
    return this.http.patch(`${this.myAppUrl}${this.myApiUrl}/${dni}`, user)
  }

}
