import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.scss']
})
export class PanelAdministradorComponent {
  admin: any;
  component = 'admin';
  constructor(private router: Router, private toastr: ToastrService) {
    this.isAdmin()
  }

  isAdmin() {
    this.admin = localStorage.getItem('user');
    this.admin = JSON.parse(this.admin);
    if (!this.admin) {
      this.router.navigate(['/dashboard']);
      return this.toastr.error('Acceso Denegado');
    } else {
      if (!this.admin.isAdmin) {
        this.router.navigate(['/dashboard']);
        return this.toastr.error('Acceso Denegado');
      } else {
        return true
      }
    }
  }


}
