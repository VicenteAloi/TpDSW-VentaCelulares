import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { user } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private myAppUrl: string;
  private myApiUrl: string;

  customers: any = [];

  private customer: BehaviorSubject<user[]> = new BehaviorSubject<user[]>([]);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Customers'
  }

  getCustomers() {
    //this.http.get('http://localhost:3001/api/Customers')
    this.http.get(`${this.myAppUrl}${this.myApiUrl}`).subscribe((value) => {
      this.customers = value;
      this.customer.next(this.customers);
    });
    return this.customer.asObservable();
  }


}
