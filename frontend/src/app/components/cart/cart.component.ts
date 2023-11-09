import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { sales } from 'src/app/interfaces/sales';
import { SalesService } from '../../services/sales.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  productsCart: any[] = [];
  constructor(private cartService: CartService, private sellService: SalesService, private alertService: ToastrService) { }
  ngOnInit() {
    this.cartService.products.subscribe((products) => {
      this.productsCart = products
    });
  }

  deleteProduct(id: number) {
    this.cartService.deleteProduct(id);
  }

  doSell() {
    let user = localStorage.getItem('user');
    const userParse = JSON.parse(user!);
    const cartSell: sales[] = [];
    for (let i = 0; i < this.productsCart.length; i++) {
      const newSale: sales = {
        idCustomer: userParse.id,
        idProduct: this.productsCart[i].id,
        quantity: Number(this.productsCart[i].quantity),
        idShipping: null
      };
      //para verificar si cargo bien el objeto venta
      cartSell.push(newSale);
    }

    this.sellService.postSell(cartSell).subscribe({
      complete: (() => {
        this.cartService.clearCart();
        this.alertService.success('Compra registrada con exito!')
      }),
      error: (() => console.log('Ocurrio un error'))
    });
  }

  getUrl(image: string) {
    return `http://localhost:3001/static/${image}`
  }
}
