import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subcategories } from '../Models/subCategories';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;

  getSubcategories(): Observable<Subcategories[]>{
    return this.http.get<Subcategories[]>(this.baseUrl + "SubCategories/GetSubCategories");
  }

  getSubcategorie(subCategoryId): Observable<Subcategories[]>{
    return this.http.get<Subcategories[]>(this.baseUrl +"SubCategories/GetSubCategory"+ subCategoryId);
  }

  updateSubcateg(subcategories){
    return this.http.put(`${this.baseUrl+"SubCategories/UpdateSubCategory"}/${subcategories.subCategoryId}`,subcategories);
  }
  
  deleteSubcateg(id){
    return this.http.delete(`${this.baseUrl+"SubCategories/DeleteSubGategory"}/${id}`);
  }

  addSubcateg(subcategories){
      return this.http.post<Subcategories>(this.baseUrl+"SubCategories/AddSubCategory",subcategories);
    }

}
