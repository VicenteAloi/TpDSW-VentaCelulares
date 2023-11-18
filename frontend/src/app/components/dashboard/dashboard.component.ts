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
    let list: product[] = []
    this.productService.getProducts().subscribe(data => {
      list = data;
      console.log(list) // Muestra todos los productos
    });
    setTimeout(() => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].stock > 0) {
          this.listProducts.push(list[i]) //Agregar el producto con stock >0 al arreglo
        }
      }
    }, 500);

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

  getUrl(image: string) {
    return `http://localhost:3001/static/${image}`
  }







}
