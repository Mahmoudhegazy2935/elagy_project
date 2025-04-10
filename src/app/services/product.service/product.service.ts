import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  [x: string]: any;
  // private url = 'https://localhost:7074/api';
  private apiUrl = 'https://fakestoreapi.com/products';
  private apisear = 'http://localhost:5208/api/Product/search';





  constructor(private httpClient: HttpClient) {}


  //search products
  searchProduct(name: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apisear}?name=${name}`);
  }


  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl);
  }
  creatproduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, product);
  }
  getproductbyid(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/${id}`, product);
  }
  deleteproduct(productid: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${productid}`);
  }
}
