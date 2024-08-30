
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  showData: boolean = true;
  button: string = 'Mostrar';
  data: boolean = false;
  mail: boolean = false;
  user: any;
  newEmail: any = "";
  newPassword: any = "";
  newPassword2: any = "";
  userM: any = {
    email: '',
    password: ''
  };
  listOfSales: any;
  modalRef?: BsModalRef;
  constructor(private customerService: CustomerService,
    private userService: UserService,
    private errorService: ErrorService,
    private toastr: ToastrService,) {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    this.userM.email = "";
    this.userM.password = "";
  }

  ngOnInit(): void {

  }


  userModifier() {
    if ((this.newPassword != '' && this.newPassword2 != '') || (this.newEmail != '')) {
      if (this.newEmail != "") {
        this.userM.email = this.newEmail;
        this.customerService.updateCustomers(this.user.dni, this.userM).subscribe({
          next: (res: any) => {
            this.user.email = this.userM.email;
            localStorage.setItem('user', JSON.stringify(this.user));
            this.toastr.success(`Mail Modificado a: ${this.userM.email}`);

            this.newPassword = '';
            this.newPassword2 = '';
            this.newEmail = '';

          }, error: (e: HttpErrorResponse) => {
            this.toastr.error(`ERROR  ${this.userM.email}`);
            this.errorService.msjError(e);
          }
        });

      } if ((this.newPassword != '' && this.newPassword2 != '')) {
        if (this.newPassword === this.newPassword2) {
          this.userM.password = this.newPassword;

          this.customerService.updateCustomers(this.user.dni, this.userM).subscribe({
            next: () => {
              this.toastr.success(`Contraseña modificada`);

              this.newPassword = '';
              this.newPassword2 = '';
              this.newEmail = '';

            }, error: () => {
              this.toastr.error("Ocurrio un Error");
            }
          });
        } else {
          this.toastr.error(`Las contraseñas deben Coincidir`)
        };
      }

    } else {
      this.toastr.error('Los campos son obligatorios')

    }


  }

  showPasswords(pass1: any, pass2: any) {
    if (pass1.type == 'text') {
      pass1.type = 'password';
      pass2.type = 'password';
      this.button = 'Ocultar'
    } else {
      pass1.type = 'text';
      pass2.type = 'text';
      this.button = 'Mostrar'
    }


  }

}
