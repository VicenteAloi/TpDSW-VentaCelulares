
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environments';
import { product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})



export class ProductInformationComponent {
  private myApiUrl: string;
  productList: product[] = [];
  productString: any;
  search: any;
  constructor(private productService: ProductService, private router: Router, private activateRoute: ActivatedRoute) {
    this.myApiUrl = environment.endpoint;
    this.activateRoute.params.subscribe((param) => {
      this.search = param;
    });

    this.getProductList();
  }
  findProduct(item: product) {
    this.productService.setProduct(item);
    this.router.navigate([`dashboard/shopping/${item.id}`])
  }
  getUrl(image: string) {
    return `${this.myApiUrl}static/${image}`
  }

  async getProductList() {
    this.productService.getProductsByName(this.search.name).subscribe((data) => {
      this.productList = data;
      localStorage.setItem('Search', this.search.name)
    });
  }

}
