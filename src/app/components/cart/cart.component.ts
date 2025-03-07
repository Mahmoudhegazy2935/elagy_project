import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { NavebarComponent } from "../navebar/navebar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
   standalone: true,
  imports: [NavebarComponent,RouterModule],

  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  protected_price : number = 0;
  shipping: number=10;
 
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((products: Product[]) => {
      this.cart = products;
      this. protected_price = this.cartService.getTotal();
    });
  }

  updateQuantity(product: Product, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(product.id, quantity);
    }
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
  }

  
}
