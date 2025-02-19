import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavebarComponent } from "../../navebar/navebar.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, NavebarComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
