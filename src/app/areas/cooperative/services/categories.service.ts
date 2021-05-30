import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categories } from '../Models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
  getCategories(): Observable<Categories[]>{
    return this.http.get<Categories[]>(this.baseUrl + "Categories/GetCategories");
  }

  getCategorie(categoryId): Observable<Categories[]>{
    return this.http.get<Categories[]>(this.baseUrl +"Categories/GetCategory"+ categoryId);
  }

  updateCateg(categories){
    return this.http.put(`${this.baseUrl+"Categories/UpdateCategory"}/${categories.categoryId}`,categories);
  }
  
  deleteCateg(id){
    return this.http.delete(`${this.baseUrl+"Categories/DeleteGategory"}/${id}`);
  }

  addCateg(categories){
      return this.http.post<Categories>(this.baseUrl+"Categories/AddCategory",categories);
    }

}
