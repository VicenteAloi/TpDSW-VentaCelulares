import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: any;
  id: any;
  dni: any;
  login: any;
  isCollapsed = true;
  productList: product[] = [];
  productString: string = '';
  search: any = '';
  constructor(private router: Router, private cartService: CartService, private productService: ProductService, private toastr: ToastrService) {

    this.user = (localStorage.getItem('user'));
    this.user = JSON.parse(this.user);
    if (this.user) {
      this.id = this.user.id;
      this.dni = this.user.dni;
      this.login = true
    }


  }




  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.cartService.clearCart();
    location.reload();
  }
  singIn() {
    this.router.navigate(['/login'])
  }

  getProductByName(newSearch: any) {
    if (newSearch != '') {
      let oldSearch = localStorage.getItem('Search');

      if (location.pathname == `/dashboard/productsSearch/${oldSearch}`) {
        this.router.navigate([`/dashboard/productsSearch/${newSearch}`])
        setTimeout(() => {
          location.reload();
        }, 500);

      } else {
        this.router.navigate([`/dashboard/productsSearch/${newSearch}`])
      }
    } else {
      this.toastr.error('Debe llenar el cuadro de busqueda');
    }
    ;


  }
  userPurchases() {
    this.router.navigate([`dashboard/userPurchases/${this.user.id}`])
  }

  userProfileModifier() {
    this.router.navigate([`dashboard/userProfile/:${this.dni}`])
  }
}
