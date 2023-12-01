
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos: any = [];
  private myAppUrl: string;
  private myApiUrl: string;

  private prod: BehaviorSubject<product[]> = new BehaviorSubject<product[]>([]);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Products'
  }
  postProducto(formDataProduct: FormData) {
    //ACA MANDAMOS MEDIANTE UN POST A LA API
    console.log(formDataProduct)
    //return this.http.post('http://localhost:3001/api/Products', formDataProduct);
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, formDataProduct);
  }

  retraiveProducts() {
    //this.http.get('http://localhost:3001/api/Products')
    this.http.get(`${this.myAppUrl}${this.myApiUrl}`).subscribe(products => {
      this.productos = products;
      this.prod.next(this.productos)
    });
    console.log(this.prod); //Prueba de BehaviorSubject<Product[]> para saber si anda
    return this.prod.asObservable();
  }

  deleteProducto(producto: product) {
    const id = producto.id;
    //return this.http.delete(`http://localhost:3001/api/Products/${id}`);
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  updateProduct(productModify: product) {
    const id = productModify.id
    //return this.http.put(`http://localhost:3001/api/Products/${id}`, productModify)
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`, productModify)
  }

}
