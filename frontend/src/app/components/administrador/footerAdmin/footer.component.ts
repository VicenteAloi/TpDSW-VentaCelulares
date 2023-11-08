import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../productos/producto.service';
import { CustomersService } from './customers.service';
import { SalesService } from '../ventas/sales.service';

@Component({
  selector: 'app-footerAdmin',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterAdminComponent implements OnInit {
  countProducts: number = 0;
  countCustomers: number = 0;
  countSales = 0;
  fecha: string = new Date().toLocaleDateString('en-GB');
  constructor(private productoS: ProductoService, private customers: CustomersService, private sales: SalesService) { }
  ngOnInit(): void {

    this.productoS.retraiveProducts().subscribe(response => this.countProducts = response.length);
    this.customers.getCustomers().subscribe(response => this.countCustomers = response.length);
    this.sales.getSales().subscribe((resp) => this.countSales = resp.length);
  }
}
