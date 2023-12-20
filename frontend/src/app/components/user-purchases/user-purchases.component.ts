
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/app/environments/environments';
import { CustomerService } from 'src/app/services/customer.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-purchases.component.html',
  styleUrls: ['./user-purchases.component.css']
})
export class UserPurchasesComponent implements OnInit {
  private myApiUrl: string;
  user: any;
  listOfSales: any;
  modalRef?: BsModalRef;
  panelOpenState = false;
  constructor(private customerService: CustomerService,
    private modalService: BsModalService) {
    this.myApiUrl = environment.endpoint;
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

  getUrl(image: string | undefined) {
    return `${this.myApiUrl}/static/${image}`
  }

}
