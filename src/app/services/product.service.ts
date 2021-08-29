import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = `${environment.api}/product`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  addProduct(product: Product):Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}/new`, product);
  }

  updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.baseUrl}/update`, product);
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${product.idProduit}`);
  }

}
