import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { OnInit } from '@angular/core';
// import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { newProduct } from '../../../interfaces/product';
import { ProductService } from '../../../services/product.service';
@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,FormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{

  nameProduct="";
  priceProduct="";
  descriptionProduct="";
  imgProduct="";
  barcode="";
  posAvalible:boolean=true;
  categorie="";
  alertText="";
  alertTextOK="";
  priceProductParced:number=0



  // vamos aca creando las variables de el formulario new product


  constructor(private _serviceProduct:ProductService) {

  }
  ngOnInit(): void {

  }

  newProduct(){

    if (this.nameProduct==""||this.priceProduct==""||this.posAvalible==null||this.categorie=="") {
        this.alertText="Faltan Campos Obligatorios"
      return

    }
    if (!parseFloat(this.priceProduct)) {
      this.alertText="Error en el Precio"
      return
    }


    try {

      const newProduct:newProduct={
        nameProduct:this.nameProduct,
        descriptionProduct:this.descriptionProduct,
        barcode:this.barcode,
        statusProduct:"1",
        priceProduct:parseFloat(this.priceProduct),
        imgProduct:this.imgProduct,
        posAvalible:this.posAvalible,
        categorie:this.categorie
      }
      this._serviceProduct.createProduct(newProduct).subscribe({

        next:(data)=>{
        
          this.alertTextOK="Producto Creado con Exito"
            
        },
        error:(data)=> {
          console.log(newProduct)
            this.alertText="Error al crear el producto"

            console.log("Error al crea el producto");
            
            console.log(data)
        },
      })

    } catch (error) {

      console.log(error)

    }

  }



}
