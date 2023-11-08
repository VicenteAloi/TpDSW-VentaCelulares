
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos: any = [];

  private prod: BehaviorSubject<product[]> = new BehaviorSubject<product[]>([]);
  constructor(private http: HttpClient) { }
  postProducto(formDataProduct: FormData) {
    //ACA MANDAMOS MEDIANTE UN POST A LA API
    console.log(formDataProduct)
    return this.http.post('http://localhost:3001/api/Products', formDataProduct);
  }

  retraiveProducts() {
    this.http.get('http://localhost:3001/api/Products').subscribe(products => {
      this.productos = products;
      this.prod.next(this.productos)
    });
    console.log(this.prod); //Prueba de BehaviorSubject<Product[]> para saber si anda
    return this.prod.asObservable();
  }

  deleteProducto(producto: product) {
    const id = producto.id;
    return this.http.delete(`http://localhost:3001/api/Products/${id}`);
  }

  updateProduct(productModify: product) {
    const id = productModify.id
    return this.http.put(`http://localhost:3001/api/Products/${id}`, productModify)
  }

}
