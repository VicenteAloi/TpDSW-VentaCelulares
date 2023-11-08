import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password: string = '';
  email: string = '';
  isAdmin: boolean = false;
  adminLogin: boolean = false;
  loading: boolean = false;
  type = 'password'
  show: boolean = false;


  constructor(private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private errorService: ErrorService
  ) {
    localStorage.clear();
  }

  login() {
    //Validar que el usuario ingrese datos
    if (this.email == '' || this.password == '') {
      this.toastr.error('Todos los Campos son Obligatorios', 'Error');
      return;
    }


    //Crear el body
    let user: any = {
      password: this.password,
      email: this.email,
      adminLogin: this.adminLogin
    }

    this.loading = true;

    if (this.adminLogin) {

    }

    this.userService.login(user).subscribe({
      next: (res: any) => {
        const { tok, us } = res
        this.userService.setThisUser(us);
        localStorage.setItem('token', tok);
        localStorage.setItem('user', JSON.stringify(us))
        if (this.adminLogin) {
          this.router.navigate([`/admin`])
        } else {
          this.router.navigate([`/dashboard`])
        }
      },
      error: (e: HttpErrorResponse) => {
        this.errorService.msjError(e);
        this.loading = false;
      }
    });


  }

  showPassword(pass: any) {

    if (pass.type == 'password') {
      pass.type = 'text'
    } else {
      pass.type = 'password'
    }
  }



}