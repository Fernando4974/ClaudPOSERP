import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../../components/navbar/navbar.component";
import { GetAllProduct } from '../../../../interfaces/product';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-pos-register',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './pos-register.component.html',
  styleUrl: './pos-register.component.css'
})
export class PosRegisterComponent implements OnInit {
  listProduct:GetAllProduct[] = [];
  selectedProduct: GetAllProduct | null = null
  buttons: number[] = Array.from({ length: 25 }, (_, i) => i + 1);


  constructor(private _productService: ProductService ){}
   ngOnInit(): void {
  this.getAllProducts()

  }// En tu componente del teclado
getAllProducts(){
     this._productService.getAllProducts().subscribe({
      next:(data)=>{
        this.listProduct = data;
       this.assignProductsToButtons()

      },
      error:(err)=> {
        console.log(err)

      },
    })
  }
productsMap: { [key: number]: GetAllProduct } = {};


// Supongamos que ya tienes cargada tu listProduct
assignProductsToButtons() {
  this.listProduct.forEach((product, index) => {
    // Asocia el producto al botón según su posición (1 al 25)
    if (index < 25) {
      if (product.keyNumber = index) {
       this.productsMap[index + 1] = product;
      }

    }
  });
}
onKeyClick(buttonNumber: number) {
    this.selectedProduct = this.productsMap[buttonNumber] || null;
  }

}
