import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { sales } from '../interfaces/sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/sales'
  }

  postSell(cartSell: sales[]) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,cartSell)
  }

  
}
