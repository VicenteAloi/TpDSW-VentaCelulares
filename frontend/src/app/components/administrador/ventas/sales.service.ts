import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { sales } from '../../../interfaces/sales';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private myAppUrl: string;
  private myApiUrl: string;
  sales: any = [];
  salesCustomer: any = [];
  private sell: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private sellCustomer: BehaviorSubject<sales[]> = new BehaviorSubject<sales[]>([]);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Sales'
  }

  getSales() {
    //this.http.get('http://localhost:3001/api/Sales')
    this.http.get(`${this.myAppUrl}${this.myApiUrl}`).subscribe(sales => {
      this.sales = sales;
      this.sell.next(this.sales)
    });
    return this.sell.asObservable()
  }

  getSalesCustomer(dni: any) {
    const dniCustomer = dni.value
    //this.http.get(`http://localhost:3001/api/Sales/${dniCustomer}`)
    this.http.get(`${this.myAppUrl}${this.myApiUrl}/${dniCustomer}`).subscribe(sales => {
      this.salesCustomer = sales;
      this.sellCustomer.next(this.salesCustomer)
    });
    return this.sellCustomer.asObservable()
  }


}
