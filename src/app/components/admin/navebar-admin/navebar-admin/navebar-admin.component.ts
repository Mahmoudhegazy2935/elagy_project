import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navebar-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navebar-admin.component.html',
  styleUrl: './navebar-admin.component.css'
})
export class NavebarAdminComponent {
  userName = localStorage.getItem('userName');
  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  constructor( private router: Router){}
  clearLocalStorage(): void {
    localStorage.clear(); // مسح كل البيانات
    alert('تم تسجيل الخروج');
    this.router.navigate(['/intro']); // تحويل لصفحة الانترو
  }
}
