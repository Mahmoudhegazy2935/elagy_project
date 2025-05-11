import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service/auth.service';
import { CommonModule } from '@angular/common'; // Needed for *ngIf, etc.
import { Cart2Service } from '../../services/cart2.service/cart2.service';

@Component({
  selector: 'app-navebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navebar.component.html',
  styleUrl: './navebar.component.css'
})
export class NavebarComponent implements OnInit {
  menuOpen = false;
  cartCount = 0;
  userName = localStorage.getItem('UserName');
  showDropdown = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: Cart2Service
  ) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  handleClick() {
    if (this.authService.isLoggedIn()) {
      this.authService.logout1();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  get buttonLabel(): string {
    return this.authService.isLoggedIn() ? 'تسجيل الخروج' : 'تسجيل الدخول';
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
