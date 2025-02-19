import { Component } from '@angular/core';
import { NavebarComponent } from "../../navebar/navebar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pharmacy-login',
  standalone: true,
  imports: [RouterModule,NavebarComponent],
  templateUrl: './pharmacy-login.component.html',
  styleUrl: './pharmacy-login.component.css'
})
export class PharmacyLoginComponent {

}
