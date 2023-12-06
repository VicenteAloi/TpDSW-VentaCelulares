import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoService } from '../producto.service';
import { product } from 'src/app/interfaces/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-modificar',
  templateUrl: './formulario-modificar.component.html',
  styleUrls: ['./formulario-modificar.component.scss']
})
export class FormularioModificarComponent implements OnInit {
  constructor(private productoS: ProductoService, private toastr: ToastrService) { }
  @Input() productReceived: any;
  @Output() hideModal = new EventEmitter<boolean>();
  ngOnInit(): void {

  };

  updateProducto(price: any, stock: any, description: any) {
    const productModify: product = {
      id: this.productReceived.id,
      model: this.productReceived.model,
      brand: this.productReceived.brand,
      price: price.value || this.productReceived.price,
      stock: stock.value || this.productReceived.stock,
      description: description.value || this.productReceived.description,
      createdAt: this.productReceived.createdAt,
      quantity:this.productReceived.quantity,
      image: this.productReceived.image
    }
    this.productoS.updateProduct(productModify).subscribe({
      complete: () => {
        this.productoS.retraiveProducts();
        this.toastr.success('Producto Actualizado');
        this.hideModal.emit(true);
      },
      error: (err) => alert('No se realizo correctamente la modificacion')
    });
  }
}
