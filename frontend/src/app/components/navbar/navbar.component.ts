import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: any;
  id: any;
  dni: any;
  isCollapsed = true;
  productList: product[] = [];
  productString: string = '';
  constructor(private router: Router, private cartService: CartService, private productService: ProductService) {

    this.user = (localStorage.getItem('user'));
    this.user = JSON.parse(this.user);
    this.id = this.user.id;
    this.dni = this.user.dni
  }




  logOut() {
    localStorage.removeItem('token');
    this.cartService.clearCart();
    this.router.navigate(['/login']);
  }

  getProductByName(thisSearch: string) {
    this.productService.getProductsByName(thisSearch).subscribe(data => {
      this.productList = data;
      localStorage.setItem('ProductList', JSON.stringify(this.productList))
      localStorage.setItem('Search', thisSearch)
      this.router.navigate([`dashboard/productsSearch`])
      console.log(this.productList);
    });


  }
  userPurchases() {
    this.router.navigate([`dashboard/userPurchases/${this.user.id}`])
  }

  userProfileModifier() {
    this.router.navigate([`dashboard/userProfile/:${this.dni}`])
  }
}
