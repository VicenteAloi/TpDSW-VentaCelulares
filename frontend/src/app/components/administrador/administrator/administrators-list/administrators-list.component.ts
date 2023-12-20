import { Component, TemplateRef } from '@angular/core';
import { AdministratorsService } from '../administrators.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { user } from 'src/app/interfaces/user';

@Component({
  selector: 'app-administrators-list',
  templateUrl: './administrators-list.component.html',
  styleUrls: ['./administrators-list.component.scss']
})
export class AdministratorsListComponent {
  administratorResgisted: user[] = [];
  administrator: any;
  user: any;
  index: number | undefined;

  constructor(private adminService: AdministratorsService, private modalService: BsModalService) {
    this.findAdministrator()
  }

  ngOnInit(): void {
    this.adminService.retraiveAdministrator().subscribe(respuesta => this.administratorResgisted = respuesta);

  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  deleteAdministrator(indice: number) {
    const administrator = this.administratorResgisted[indice];


    this.adminService.deleteAdministrator(administrator).subscribe({
      complete: () => this.adminService.retraiveAdministrator(),
      // error: (error) => console.log(error)
    });

    this.modalRef?.hide()

  };

  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>, index: number) {
    this.administrator = this.administratorResgisted[index];
    this.modalRef = this.modalService.show(template);
  }

  findAdministrator() {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user)
  }

}
