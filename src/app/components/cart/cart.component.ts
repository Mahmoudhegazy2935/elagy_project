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
      
   }
   this.getCartTotal()
  }

  getCartTotal() {
    this.total = 0;
    for (let x of this.cartProducts) {
      this.total += x.price * x.amount;
    }
  }
  


  addAmount(index:number) {
    this.cartProducts[index].amount++
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }
  minsAmount(index:number) {
    this.cartProducts[index].amount--
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
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
  
    // بناء نموذج الطلب
    let Model = {
      userId: 5,  // هنا بتبعت معرف المستخدم
      date: new Date().toISOString(),  // استخدم .toISOString() لتنسيق التاريخ بشكل عالمي
      products: products
    };
  
    // استدعاء الـ API
    this.cart2Service.createNewCart(Model).subscribe(res => {
        this.success = true;  // في حالة نجاح الطلب
        console.log("تم إضافة السلة بنجاح", res);
      },
      error => {
        this.success = false;  // في حالة فشل الطلب
        console.error("حدث خطأ أثناء إضافة السلة", error);
      }
    );
  
    console.log("نموذج السلة:", Model);  // طباعة الموديل في الـ console لمراجعة البيانات
  }
  
}
