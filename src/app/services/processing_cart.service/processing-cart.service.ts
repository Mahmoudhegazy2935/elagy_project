import { Injectable } from '@angular/core';
import { ProcessingCart } from '../../models/processing-cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessingCartService {
  private cart: ProcessingCart[] = [
    { id: 1, name: 'هاي فريش 10 مل', price: 62, quantity: 1, image: 'https://th.bing.com/th/id/OIP.TMXncRx-pf5dY_34vho8OwHaM0?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',state:'تم قبول الطلب ' },
    { id: 2, name: 'بندول ', price: 72, quantity: 1, image: 'https://th.bing.com/th/id/R.10994b27783949a951a78233c0c43838?rik=yY6iRmSO316O0g&pid=ImgRaw&r=0',state:'خرج الطلب ' }
  ];
  getCart() {
    return this.cart;
  }
  private cartSubject = new BehaviorSubject<ProcessingCart[]>(this.cart);
  cart$ = this.cartSubject.asObservable();
  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
 
}
