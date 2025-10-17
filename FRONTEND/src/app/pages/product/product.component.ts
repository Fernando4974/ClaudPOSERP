import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { Product } from '../../interfaces/product';
import { OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, CommonModule,NavbarComponent,SidebarComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  listProduct: Product[] = []

constructor(private productService: ProductService) {

}


ngOnInit(): void {
  this.getAll();
  }

  getAll() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.listProduct = data
        console.log(this.listProduct)
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

}
