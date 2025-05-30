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
  private apiUrl = 'http://localhost:5208/api/Product';
  private apisear = 'http://localhost:5208/api/Product/search';





  constructor(private httpClient: HttpClient) {}

  getProductByName(name: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apisear, {
      params: { name }
    });
  }



  //search products
  searchProduct(name: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apisear}?name=${name}`);
  }


  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  createProduct(formData: FormData): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, formData);
  }
  
  getproductbyid(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, productData: FormData): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/${id}`, productData);
  }
  
  deleteproduct(productid: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${productid}`);
  }
}
