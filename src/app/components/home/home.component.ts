import { Component } from '@angular/core';
import { NavebarComponent } from "../navebar/navebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
