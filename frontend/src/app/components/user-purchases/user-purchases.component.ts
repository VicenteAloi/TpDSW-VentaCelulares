
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerService } from 'src/app/services/customer.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-purchases.component.html',
  styleUrls: ['./user-purchases.component.css']
})
export class UserPurchasesComponent implements OnInit {
  user: any;
  listOfSales: any;
  modalRef?: BsModalRef;
  panelOpenState = false;
  constructor(private customerService: CustomerService,
    private modalService: BsModalService) {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    this.customerService.getSalesUser(this.user.id).subscribe((data) => {
      this.listOfSales = data
    })
  }

  ngOnInit(): void {

  }

  productInfo(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getUrl(image:string|undefined){
    return `http://localhost:3001/static/${image}`
  }

}
