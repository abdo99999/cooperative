import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../Models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(this.baseUrl + "Products/GetProducts");
  }

  getProduct(productId): Observable<Products[]>{
    return this.http.get<Products[]>(this.baseUrl +"Products/GetProduct"+ productId);
  }

  updateProduct(products){
    return this.http.put(`${this.baseUrl+"Products/UpdateProduct"}/${products.productId}`,products);
  }
  
  deleteProduct(id){
    return this.http.delete(`${this.baseUrl+"Products/DeleteProduct"}/${id}`);
  }

  addProduct(products){
      return this.http.post<Products>(this.baseUrl+"Products/AddProduct",products);
    }
}
