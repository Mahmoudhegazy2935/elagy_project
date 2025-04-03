import { Injectable } from '@angular/core';
import { PreviousOperations } from '../../models/previous-operations';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviousOperationsService {

  private cart: PreviousOperations[] = [
    { id: 1, name: 'هاي فريش 10 مل', price: 62, quantity: 1, image: 'https://th.bing.com/th/id/R.10994b27783949a951a78233c0c43838?rik=yY6iRmSO316O0g&pid=ImgRaw&r=0',state:'طلب منتهي ',date:'5-10-2015',time:'20:15'},
    { id: 2, name: 'بندول ', price: 72, quantity: 1, image: 'https://th.bing.com/th/id/R.10994b27783949a951a78233c0c43838?rik=yY6iRmSO316O0g&pid=ImgRaw&r=0',state:'طلب منتهي ' ,date:'5-10-2015',time:'20:15'},
    { id: 1, name: 'هاي فريش 10 مل', price: 62, quantity: 1, image: 'https://th.bing.com/th/id/R.10994b27783949a951a78233c0c43838?rik=yY6iRmSO316O0g&pid=ImgRaw&r=0',state:'طلب منتهي ',date:'5-10-2015',time:'20:15'},
    { id: 2, name: 'بندول ', price: 72, quantity: 1, image: 'https://th.bing.com/th/id/R.10994b27783949a951a78233c0c43838?rik=yY6iRmSO316O0g&pid=ImgRaw&r=0',state:'طلب منتهي ' ,date:'5-10-2015',time:'20:15'}
  ];

  getCart() {
    return this.cart;
  }
  private cartSubject = new BehaviorSubject<PreviousOperations[]>(this.cart);
  cart$ = this.cartSubject.asObservable();

  // getTotal(): number {
  //   return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  // }

}
