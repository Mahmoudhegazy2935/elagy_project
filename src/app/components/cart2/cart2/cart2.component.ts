import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavebarComponent } from '../../navebar/navebar.component';

@Component({
  selector: 'app-cart2',
  standalone: true,
  imports: [RouterModule,NavebarComponent],
  
  templateUrl: './cart2.component.html',
  styleUrl: './cart2.component.css'
})
export class Cart2Component implements OnInit{
  constructor(private Cart2Service:Cart2Component) { }
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
   console.log(this.cartProducts)
  }
}
