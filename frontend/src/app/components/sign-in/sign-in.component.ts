import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  password: string = '';
  email: string = '';
  dni: string = '';
  name: string = '';
  surname: string = '';
  isAdmin: boolean = false;
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) {

  }

  addUser() {
    console.log(this.password, this.confirmPassword, this.email)
    if (this.password == '' || this.confirmPassword == '' || this.email == '') {
      this.toastr.error('Todos los Campos son Obligatorios', 'Error');
      return;
    }

    if (this.password != this.confirmPassword) {
      this.toastr.error('Las Password Ingresadas son Distintas', 'Error');
      return;
    }


    const user: any = {
      dni: this.dni,
      email: this.email,
      password: this.password,
      name: this.name,
      surname: this.surname,
      isAdmin: this.isAdmin
    }

    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`Registrado Exitosamente`, 'Usuario Registrado');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    })

  }


}
