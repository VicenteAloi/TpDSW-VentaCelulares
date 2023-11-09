import { LocalizedString } from '@angular/compiler';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})



export class ProductInformationComponent {

  productList: product[] = [];
  productString: any;
  search: any;
  constructor(private productService: ProductService, private router: Router) {
    this.getProductList();
  }
  findProduct(item: product) {
    this.productService.setProduct(item);
    this.router.navigate([`dashboard/shopping/${item.id}`])
  }
  getUrl(image: string) {
    return `http://localhost:3001/static/${image}`
  }

  async getProductList() {
    this.productString = localStorage.getItem('ProductList');
    this.productList = JSON.parse(this.productString);
    this.search = localStorage.getItem('Search');
  }

}
