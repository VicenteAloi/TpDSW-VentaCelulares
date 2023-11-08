import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customers: any = [];

  private customer: BehaviorSubject<user[]> = new BehaviorSubject<user[]>([]);
  constructor(private http: HttpClient) { }

  getCustomers() {
    this.http.get('http://localhost:3001/api/Customers').subscribe((value) => {
      this.customers = value;
      this.customer.next(this.customers);
    });
    return this.customer.asObservable();
  }


}
