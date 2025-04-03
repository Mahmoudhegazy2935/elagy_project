import { Component, OnInit } from '@angular/core';
import { PreviousOperations } from '../../../models/previous-operations';
import{PreviousOperationsService} from '../../../services/previous-operations.service/previous-operations.service'; // 
import { NavebarComponent } from '../../navebar/navebar.component';
import{RouterModule} from '@angular/router';
@Component({
  selector: 'app-previous-operations',
  standalone: true,
  imports: [NavebarComponent],
  templateUrl: './previous-operations.component.html',
  styleUrl: './previous-operations.component.css'
})
export class PreviousOperationsComponent implements OnInit{

  cart: PreviousOperations[] = [];
  protected_price : number = 0;
  shipping: number=10;

  constructor(private PreviousOperationsService:PreviousOperationsService ) {}
  ngOnInit() {
    this.PreviousOperationsService.cart$.subscribe((PreviousOperationsComponent: PreviousOperations[]) => {
      this.cart = PreviousOperationsComponent;
      // this. protected_price = this.PreviousOperationsService.getTotal();
    });
  }


}
