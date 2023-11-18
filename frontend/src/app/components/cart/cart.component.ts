import { Component, TemplateRef } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { sales } from 'src/app/interfaces/sales';
import { SalesService } from '../../services/sales.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  productsCart: any[] = [];
  modalRef?: BsModalRef;
  isCollapsed = true;
  constructor(private cartService: CartService, private modalService: BsModalService, private sellService: SalesService, private alertService: ToastrService, private router: Router) { }
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
    if (user) {
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
    } else {
      let confirmar = confirm('Antes de Comprar debe Loguearse. Quiere que lo redireccionemos al LogIn?');
      if (confirmar) {
        this.router.navigate(['/login'])
      }

    }
    this.modalRef?.hide()


  }

  getUrl(image: string) {
    return `http://localhost:3001/static/${image}`
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
