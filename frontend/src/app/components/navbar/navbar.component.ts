import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/interfaces/user';
import { CartService } from 'src/app/services/cart.service';

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
  constructor(private router: Router, private cartService: CartService) {

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


  userPurchases() {
    this.router.navigate([`dashboard/userPurchases/${this.user.id}`])
  }

  userProfileModifier() {
    this.router.navigate([`dashboard/userProfile/:${this.dni}`])
  }
}
