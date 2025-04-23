import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../../models/order.model';


@Component({
  selector: 'app-pharmacy-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pharmacy-home.component.html',
  styleUrl: './pharmacy-home.component.css'
})
export class PharmacyHomeComponent {
  deliveryArea: string = 'قنا المساكن شارع التأمين'; // e.g., passed from parent pharmacy home
  orders: Order[] = [];
  expandedOrderIds: number[] = [];

  constructor(private http: HttpClient) {}


ngOnInit(): void {
  this.http.get<Order[]>('http://localhost:5208/api/Cart').subscribe(data => {
    this.orders = data.filter(order =>
      order.speicalLocation === this.deliveryArea &&
      order.status === 'قيد المعالجة'
    )
    console.log(this.orders);
    ;

  });
}

  toggleOrderItems(orderId: number): void {
    if (this.expandedOrderIds.includes(orderId)) {
      this.expandedOrderIds = this.expandedOrderIds.filter(id => id !== orderId);
    } else {
      this.expandedOrderIds.push(orderId);
    }
  }

  acceptOrder(orderId: number): void {
    const updatedStatus = {
      status: 'تم القبول' // Arabic for "Accepted"
    };

    this.http.put(`http://localhost:5208/api/Cart/${orderId}`, updatedStatus)
      .subscribe({
        next: () => {
          const order = this.orders.find(o => o.id === orderId);
          if (order) {
            order.status = updatedStatus.status; // Mark as accepted visually
          }
          console.log(`Order ${orderId} marked as accepted.`);
        },
        error: err => {
          console.error(`Error updating order ${orderId}`, err);
        }
      });
  }


}
