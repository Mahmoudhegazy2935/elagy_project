import { Component } from '@angular/core';
import { NavebarComponent } from "../../navebar/navebar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterModule,NavebarComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

}
