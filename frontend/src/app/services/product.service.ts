import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../interfaces/product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  nullproduct: product = {
    id: 0,
    model: '',
    brand: '',
    description: '',
    price: 0,
    stock: 0,
    image: '',
    quantity: null,
    createdAt: new Date()
  }
  private productInfo: BehaviorSubject<product> = new BehaviorSubject<product>(this.nullproduct);

  setProduct(newProduct: product) {
    this.productInfo.next(newProduct);
  }

  getProduct() {
    return this.productInfo.asObservable();
  }


  @Output() triggerProductInfo: EventEmitter<any> = new EventEmitter();
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/products'
  }

  getProducts(): Observable<product[]> {
    return this.http.get<product[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getProductsByName(name: string): Observable<product[]> {
    return this.http.get<product[]>(`${this.myAppUrl}${this.myApiUrl}/pbn/${name}`)
  }

}
