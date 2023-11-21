import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../producto.service';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { publications } from 'src/app/interfaces/publications';



@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss']
})
export class FormularioRegistroComponent implements OnInit{

  //PARTE DEL ALERT
  alerts: any[] = [];
 

  //FORMULARIO Y USO DE SERVICE
  productForm:FormGroup;
  constructor(private productoS: ProductoService,public fb: FormBuilder){
    this.productForm = this.fb.group({
      
      model: ['', [Validators.required]],
      brand:['', [Validators.required]],
      price:[0, [Validators.required]],
      stock:[0, [Validators.required]],
      description:['', [Validators.required]],
      file:[null, [Validators.required]]

    });
  }

  ngOnInit(): void {
    
  }

  imageBlob:File | undefined;
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;
  
  onFileUpload(){
    this.imageBlob = this.fileInput.nativeElement.files[0];
    this.productForm.patchValue({
      file : this.imageBlob
    });
    this.productForm.get('file')?.updateValueAndValidity();
  }

  registrarForm(){
    const date = new Date();
    const formData = new FormData();
    formData.append('model',this.productForm.get('model')?.value);
    formData.append('brand',this.productForm.get('brand')?.value);
    formData.append('description',this.productForm.get('description')?.value);
    formData.append('price',this.productForm.get('price')?.value);
    formData.append('stock',this.productForm.get('stock')?.value);
    formData.append('file',this.productForm.get('file')?.value);
    this.productoS.postProducto(formData).subscribe({
      complete: ()=> {
        this.productoS.retraiveProducts();
        this.alerts.push({
            type: 'info',
            msg: `Producto registrado correctamente (added: ${new Date().toLocaleTimeString()})`,
            timeout: 3000
          });
      },
      error: (error)=>{
        alert('No se pudo registrar el producto')
        console.log(error)
      }
  });
  }
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}

