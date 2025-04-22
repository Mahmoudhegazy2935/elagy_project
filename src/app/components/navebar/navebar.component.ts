import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navebar.component.html',
  styleUrl: './navebar.component.css'
})
export class NavebarComponent {
  menuOpen = false;
  cartProducts: any[] = [];
cartCount: number = 0;
userName = localStorage.getItem('userName');

ngOnInit() {
  this.getCartProducts();
}

getCartProducts() {
  if ("cart" in localStorage) {
    this.cartProducts = JSON.parse(localStorage.getItem("cart")!);

    this.cartProducts = this.cartProducts.map(item => ({
      ...item,
      amount: Number(item.amount) || 1
    }));

    this.updateCartCount();
  }

}

updateCartCount() {
  this.cartCount = this.cartProducts.length; // only number of distinct items
}


toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

}
