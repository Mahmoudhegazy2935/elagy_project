import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavebarAdminComponent } from '../../../navebar-admin/navebar-admin/navebar-admin.component';

@Component({
  selector: 'app-home-admin',
   standalone: true,
  imports: [NavebarAdminComponent,RouterModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {

}
