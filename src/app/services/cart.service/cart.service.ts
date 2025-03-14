import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [
    { id: 1, name: 'هاي فريش 10 مل', price: 62, quantity: 1, image: 'https://th.bing.com/th/id/OIP.TMXncRx-pf5dY_34vho8OwHaM0?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
    { id: 2, name: 'بندول ', price: 72, quantity: 1, image: 'https://th.bing.com/th/id/R.10994b27783949a951a78233c0c43838?rik=yY6iRmSO316O0g&pid=ImgRaw&r=0' }
  ];

  private cartSubject = new BehaviorSubject<Product[]>(this.cart);
  cart$ = this.cartSubject.asObservable();

  getCart() {
    return this.cart;
  }

  updateQuantity(id: number, quantity: number) {
    const item = this.cart.find(p => p.id === id);
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next([...this.cart]);
    }
  }

  removeItem(id: number) {
    this.cart = this.cart.filter(p => p.id !== id);
    this.cartSubject.next([...this.cart]);
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
