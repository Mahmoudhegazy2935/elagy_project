import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PharmacyGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role');
    if (role === 'Pharmacy') {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
