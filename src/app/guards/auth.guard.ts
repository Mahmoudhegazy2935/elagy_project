import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
     const role = localStorage.getItem('role');
     console.log('AuthGuard role:', role); // 🔍 Log it
    if (role==='undefined') {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
