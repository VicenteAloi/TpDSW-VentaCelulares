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
  buttonDisable: boolean = false;
  productsCart: any[] = [];
  modalRef?: BsModalRef;
  isCollapsed = true;
  constructor(private cartService: CartService, private modalService: BsModalService, private sellService: SalesService, private alertService: ToastrService, private router: Router) { }
  ngOnInit() {
    this.cartService.products.subscribe((products) => {
      this.productsCart = products
    });
    // let index = this.productsCart.findIndex(elem => elem.stock < elem.quantity);
    // if(index != -1){this.buttonDisable = true}
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
        if (this.productsCart[i].stock >= Number(this.productsCart[i].quantity)) {
          cartSell.push(newSale);
        } else {
          this.alertService.info(`El producto: ${this.productsCart[i].brand}--${this.productsCart[i].model} no cumple con el stock para esta compra`).onAction
        }
      }
      if (cartSell.length > 0) {
        if (cartSell.length < this.productsCart.length) {
          this.alertService.info('Hay productos que no cumplian con el stock, por lo tanto no concretaron la compra').onAction
        }
        this.sellService.postSell(cartSell).subscribe({
          complete: (() => {
            this.cartService.clearCart();
            this.alertService.success('Compra registrada con exito!')
          }),
          error: (() => console.log('Ocurrio un error'))
        });
      } else {
        this.alertService.error('Ningun producto cumple con el stock').onAction;
      }
    } else {
      let confirmar = this.alertService.info('Antes de Comprar debe Loguearse').onAction;
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
