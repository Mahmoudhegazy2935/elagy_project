import { Component } from '@angular/core';
import { NavebarComponent } from "../../../navebar/navebar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-the-password',
  standalone: true,
  imports: [NavebarComponent,RouterModule],
  templateUrl: './forgot-the-password.component.html',
  styleUrl: './forgot-the-password.component.css'
})
export class ForgotThePasswordComponent {


}
