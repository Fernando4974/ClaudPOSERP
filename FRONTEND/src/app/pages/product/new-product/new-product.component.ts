import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{

  namePoduct="";
  priceProdct="";
  descriptionProduct="";

  // vamos aca creando las variables de el formulario new product


  constructor() {

  }
  ngOnInit(): void {

  }



}
