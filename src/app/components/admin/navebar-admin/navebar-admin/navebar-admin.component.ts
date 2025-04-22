import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

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


}
