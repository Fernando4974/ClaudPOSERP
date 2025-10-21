import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product,newProduct } from '../interfaces/product';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
     apiGetAllUrl:string='';
     apiNewProductUrl:string='';
     appUrl:string='';



  constructor(private http:HttpClient) {
    this.appUrl=environment.apiUrl
    this.apiGetAllUrl="api/product/getAll"
    this.apiNewProductUrl="api/product/register"
  }
  getAllProducts():Observable<Product[]>{
     // const token = localStorage.getItem('token')
     // const headerToken = new HttpHeaders().set('Authorization',`Bearer ${token}`)
     //old manual return mode --> return this.http.get<Product[]>(`${this.appUrl}${this.apiGetAllUrl}`,{headers:headerToken})
    return this.http.get<Product[]>(`${this.appUrl}${this.apiGetAllUrl}`)

  }
  createProduct(newProduct:newProduct):Observable<any>{
    console.log(`${this.appUrl}${this.apiNewProductUrl}`)
    return this.http.post(`${this.appUrl}${this.apiNewProductUrl}`,newProduct)
  }

}
