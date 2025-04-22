import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';



@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.css'
})

export class IntroPageComponent {
  constructor(private router: Router) {}
  role = localStorage.getItem('role');

  onStartClick() {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const nameArray = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        const name = Array.isArray(nameArray) ? nameArray.join(' ') : nameArray;

        localStorage.setItem('userName', name);
        switch (this.role) {
          case 'Pharmacy':
            this.router.navigate(['/cart']);
            break;
          case 'Admin':
            this.router.navigate(['/HomeAdminComponent']);
            break;
          default:
            this.router.navigate(['/home']);
        }
      } catch (err) {
        console.error('Invalid token:', err);
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
