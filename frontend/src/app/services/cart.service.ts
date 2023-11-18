import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProducts: any[] = [];

  private productsSubject: BehaviorSubject<any[]>;

  constructor() {
    this.productsSubject = new BehaviorSubject<any[]>([]);
  }

  addProduct(product: any) {
    this.cartProducts.push(product);
    this.productsSubject.next(this.cartProducts);
  }

  get products() {
    return this.productsSubject.asObservable(); // para poder subscribirse desde fuera
  }

  deleteProduct(id: number) {
    const index = this.cartProducts.findIndex(prod => prod.id === id);
    if (index > -1) {
      this.cartProducts.splice(index, 1);
      this.productsSubject.next(this.cartProducts);
    }
  }

  clearCart() {
    this.cartProducts = [];
    this.productsSubject.next(this.cartProducts);
  }
}
