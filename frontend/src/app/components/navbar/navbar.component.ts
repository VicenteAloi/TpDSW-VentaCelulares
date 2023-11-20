import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
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
export class NavbarComponent implements OnInit {
  countProduct = 0;
  pay: boolean = false;
  user: any;
  id: any;
  dni: any;
  login: any;
  isCollapsed = true;
  productList: product[] = [];
  productString: string = '';
  search: any = '';
  showSearchBar: boolean = false;
  constructor(private router: Router, private cartService: CartService, private productService: ProductService, private toastr: ToastrService) {
    this.showSearch();
    this.user = (localStorage.getItem('user'));
    this.user = JSON.parse(this.user);
    if (this.user) {
      this.id = this.user.id;
      this.dni = this.user.dni;
      this.login = true
    }
  }

  ngOnInit(): void {
    this.cartService.countProd.subscribe((data) => {
      this.countProduct = data
    });
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

  showSearch() {
    let search = localStorage.getItem('Search');
    if (location.pathname == '/dashboard/allproducts' || location.pathname == `/dashboard/productsSearch/${search}`) {
      this.showSearchBar = true;
    }
  }
}
