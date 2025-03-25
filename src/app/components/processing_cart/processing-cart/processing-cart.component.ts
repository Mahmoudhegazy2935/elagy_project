import { Component, OnInit } from '@angular/core';
import { ProcessingCart } from '../../../models/processing-cart';
import { ProcessingCartService } from '../../../services/processing_cart.service/processing-cart.service';
import { NavebarComponent } from "../../navebar/navebar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-processing-cart',
  standalone: true,
  imports: [NavebarComponent,RouterModule],
  styleUrls: ['./processing-cart.component.css'],
  templateUrl: './processing-cart.component.html'
})
export class ProcessingCartComponent implements OnInit{
  
    cart: ProcessingCart[] = [];
    protected_price : number = 0;
    shipping: number=10;
  
    constructor(private processingCartService:ProcessingCartService ) {}
  
    ngOnInit() {
      this.processingCartService.cart$.subscribe((ProcessingCarts: ProcessingCart[]) => {
        this.cart = ProcessingCarts;
        this. protected_price = this.processingCartService.getTotal();
      });
    }

}
