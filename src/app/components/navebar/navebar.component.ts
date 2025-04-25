import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service/auth.service';

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
showDropdown = false;

ngOnInit() {
  this.getCartProducts();
}

constructor(
  private authService: AuthService,
  private router: Router
) {}

handleClick() {
  if (this.authService.isLoggedIn()) {
    this.authService.logout1();
    this.router.navigate(['/login']); // بعد تسجيل الخروج
  } else {
    this.router.navigate(['/login']); // صفحة تسجيل الدخول
  }
}

get buttonLabel(): string {
  return this.authService.isLoggedIn() ? 'تسجيل الخروج' : 'تسجيل الدخول';
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

toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}

}
