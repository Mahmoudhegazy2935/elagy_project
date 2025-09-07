import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.service';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class Cart2Service {
  addToCart(searchedProduct: Product) {
    throw new Error('Method not implemented.');
  }
  private cartProducts: any[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http:HttpClient) {
    this.loadCart();
   }

  createNewCart(orderModel:any) {
    return this.http.post(environment.baseApi + 'Cart' , orderModel,)
  }




  loadCart() {
    const storedCart = localStorage.getItem('cart');
    this.cartProducts = storedCart ? JSON.parse(storedCart) : [];
    this.cartCountSubject.next(this.cartProducts.length);
  }

  updateCart(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartProducts = cart;
    this.cartCountSubject.next(this.cartProducts.length);
  }

  getCart() {
    return this.cartProducts;
  }
}
