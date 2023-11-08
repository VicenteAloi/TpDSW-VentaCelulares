import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { product } from 'src/app/interfaces/product';
import { user } from 'src/app/interfaces/user';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  listProducts: product[] = [];
  public oneProduct: product | undefined;
  modalRef: BsModalRef | undefined;
  usera: any;
  errorService: any;



  constructor(private productService: ProductService,
    private modalService: BsModalService,
    private userService: UserService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.getUser();

    this.usera = localStorage.getItem('user');
    this.usera = (JSON.parse(this.usera))
  }

  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.listProducts = data;
    })
  }

  findProduct(item: product) {
    this.productService.setProduct(item);
    this.router.navigate([`dashboard/shopping/${item.id}`])
  }

  productInfo(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getUser() {
    this.userService.getThisUser();
  }

  getUrl(image:string){
    return `http://localhost:3001/static/${image}`
  }







}
