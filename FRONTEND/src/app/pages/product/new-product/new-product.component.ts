import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { newProduct } from '../../../interfaces/product';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-product',
  standalone: true,
  // IMPORTANTE: Cambiamos FormsModule por ReactiveFormsModule
  imports: [NavbarComponent, SidebarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {

  // Agrupamos todo en un formulario
  productForm = new FormGroup({
    title: new FormControl('', [ Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [ Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
    description: new FormControl(''),
    barcode: new FormControl(''),
    stock: new FormControl('', [ Validators.pattern(/^\d+(\.\d+)?$/)]),
    posAvalible: new FormControl(true),
    categorie: new FormControl(''),
    imgProduct: new FormControl(''),
    numberKey: new FormControl<number | null>(null, [ Validators.max(25)]),
  });

  alertText = "";
  alertTextOK = "";

  constructor(private _serviceProduct: ProductService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.productForm.invalid) {
      this.alertText = "Por favor, revisa los campos obligatorios.";
      return;
    }

    // Extraemos los valores directamente del formulario
    const formValues = this.productForm.value;

    const productToSend: newProduct = {
      title: formValues.title!,
      description: formValues.description || "",
      barcode: formValues.barcode || "",
      price: parseFloat(formValues.price!),
      //imgProduct: formValues.imgProduct || "",
      stock: formValues.stock ? parseInt(formValues.stock.toString(),10) : 0,
      posAvalible: !!formValues.posAvalible,
      categorie: formValues.categorie!,
      numberKey: formValues.numberKey ? parseInt(formValues.numberKey.toString(),10) : 0
    };

    this._serviceProduct.createProduct(productToSend).subscribe({
      next: () => {
        this.alertTextOK = "Producto creado con éxito";
        this.alertText = "";
        this.productForm.reset({ posAvalible: true }); // Limpia el formulario
      },
      error: (err) => {this.alertText = "Error al conectar con el servidor",
      console.log(err);
    }

    });
  }
  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      // Seteas el valor en el formulario (puedes guardar el base64 o el file)
      this.productForm.patchValue({
        imgProduct: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  }
}
}
