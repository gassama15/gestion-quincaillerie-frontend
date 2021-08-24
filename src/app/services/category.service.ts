import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = `${environment.api}/category`

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl);
  }

  addCategory(category: Category):Observable<Category>{
    // let params = new FormData();
    // params.append('libelle', category.libelle);

    return this.http.post<Category>(`${this.baseUrl}/new`, category);
  }

  updateCategory(category: Category): Observable<Category>{
    return this.http.put<Category>(`${this.baseUrl}/update`, category);
  }
}
