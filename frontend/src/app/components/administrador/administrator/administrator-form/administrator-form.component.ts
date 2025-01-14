import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdministratorsService } from '../administrators.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-administrator-form',
  templateUrl: './administrator-form.component.html',
  styleUrls: ['./administrator-form.component.scss']
})
export class AdministratorFormComponent {

  administratorForm = new FormGroup({
    dni: new FormControl(0, Validators.required),
    name: new FormControl("", Validators.required),
    surname: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", Validators.required),
  });
  constructor(private adminService: AdministratorsService, private toastr: ToastrService) { }

  registrarForm() {
    const administrator: any = {
      'dni': this.administratorForm.controls.dni.value,
      'name': this.administratorForm.controls.name.value,
      'surname': this.administratorForm.controls.surname.value,
      'email': this.administratorForm.controls.email.value,
      'password': this.administratorForm.controls.password.value,
      'isAdmin': true
    }
    console.log(administrator);
    this.adminService.postAdministrator(administrator).subscribe({
      complete: () => { 
        this.adminService.retraiveAdministrator();
        this.toastr.success('Administrador cargado correctamente')
       },
      error: (error) => this.toastr.error('Administrador duplicado, DNI o EMAIL duplicados')
    });

  }
}
