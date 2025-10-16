import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
     apiGetAllUrl:string='';
     appUrl:string='';



  constructor(private http:HttpClient) {
    this.appUrl=environment.apiUrl
    this.apiGetAllUrl="api/product/getAll"
  }
  getAllProducts():Observable<Product[]>{
     // const token = localStorage.getItem('token')
     // const headerToken = new HttpHeaders().set('Authorization',`Bearer ${token}`)
     //old manual return mode --> return this.http.get<Product[]>(`${this.appUrl}${this.apiGetAllUrl}`,{headers:headerToken})
    return this.http.get<Product[]>(`${this.appUrl}${this.apiGetAllUrl}`)

  }

}
