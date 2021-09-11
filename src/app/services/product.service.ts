import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = `${environment.api}/product`;
  products = [];
  productSub = new Subject<any[]>();
  numProductByPage: number = 6;

  constructor(private http: HttpClient) {
    this.getProductsFromServer();
  }

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

  getProductById(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/show/${id}`);
  }

  getProductsFromServer(){
    this.http.get<any>(`${this.baseUrl}`).subscribe(
      (data) => {
        this.products = data;
        this.emitProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }


  emitProducts() {
    this.productSub.next(this.products);
  }

  getProductsByPage(numPage: number): Product[]{
    const numOfPage = this.products.length / this.numProductByPage;
    if (numPage > 0 || numPage < numOfPage) {
      const prodResult = this.products.slice(
        numPage*this.numProductByPage,
        (numPage+1)*this.numProductByPage
      );

      return prodResult;
    }
    return null;
  }

}
