import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product';
import { NavebarComponent } from "../navebar/navebar.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cart2Service } from '../../services/cart2.service/cart2.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
   standalone: true,
  imports: [NavebarComponent,RouterModule,CommonModule,FormsModule],

  templateUrl:'./cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  amount: any;
  constructor(private cart2Service:Cart2Service) { }
  cartProducts:any[] = [];
  total:number = 0;
  success:boolean = false

  ngOnInit(): void {
    this.getCartProducts()
  }

  getCartProducts() {

    if("cart" in localStorage){
      this.cartProducts=JSON.parse(localStorage.getItem("cart")!)

      this.cartProducts = this.cartProducts.map(item => ({
        ...item,
        amount: Number(item.amount) || 1
      }));


   }
   this.getCartTotal()
  }

  getCartTotal() {
    this.total = 0;

    for (let x of this.cartProducts) {
      const price = Number(x.price);
      const amount = Number(x.amount);
      if (!isNaN(price) && !isNaN(amount)) {
        this.total += price * amount;
      }
    }

  }



  addAmount(index:number) {
    this.cartProducts[index].amount++
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }
  minsAmount(index: number) {
    if (this.cartProducts[index].amount > 1) {
      this.cartProducts[index].amount--;
      this.getCartTotal();
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
  }
  detectChange() {
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }


  deleteProduct(index:number) {
    this.cartProducts.splice(index , 1)
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }

  clearCart() {
    this.cartProducts = []
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }

  addCart() {
    if (this.cartProducts.length === 0) {
      console.warn("سلة الشراء فارغة!");  // تأكد من أن السلة مش فارغة
      return;
    }

    // تحويل بيانات المنتجات إلى شكل مناسب
    let products = this.cartProducts.map(item => {
      return { productId: item.id, quantity: item.amount };  // استخدم `id` و `amount` بدلاً من `item.item.id`
    });


  }

}
