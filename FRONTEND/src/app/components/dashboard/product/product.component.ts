import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  listPoduct: Product[] = [];

  constructor(private _productServise: ProductService) {



  }

  ngOnInit(): void {
    this.getAll();
  }

   getAll() {


    this._productServise.getAllProducts().subscribe({
      next: (data) => {
        this.listPoduct=data
        console.log(this.listPoduct)
      },
      error: (err) => {
        console.log(err)
      }
    })
}
}

