import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cooperatives } from '../Models/cooperatives';
import { Subcategories } from '../Models/subCategories';

@Injectable({
  providedIn: 'root'
})
export class CooperativesService {

  constructor(private http:HttpClient) { }
  baseUrl = environment.apiUrl;

  getCooperatives(): Observable<Cooperatives[]>{
    return this.http.get<Cooperatives[]>(this.baseUrl + "Cooperatives/GetCooperatives");
  }

  getCooperative(cooperativeId): Observable<Cooperatives[]>{
    return this.http.get<Cooperatives[]>(this.baseUrl +"Cooperatives/GetCooperative"+ cooperativeId);
  }

  updateCooperative(cooperatives){
    return this.http.put(`${this.baseUrl+"Cooperatives/UpdateCooperative"}/${cooperatives.cooperativeId}`,cooperatives);
  }
  
  deleteCooperative(id){
    return this.http.delete(`${this.baseUrl+"Cooperatives/DeleteCooperative"}/${id}`);
  }

  addCooperative(cooperatives){
      return this.http.post<Cooperatives>(this.baseUrl+"Cooperatives/AddCooperative",cooperatives);
    }
}
