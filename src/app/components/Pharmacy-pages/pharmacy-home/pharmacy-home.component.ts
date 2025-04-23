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
  deliveryArea: string = 'قنا'; // e.g., passed from parent pharmacy home
  orders: Order[] = [];
  expandedOrderIds: number[] = [];
  acceptedOrders: Order[] = [];
  showAccepted: boolean = false;


  constructor(private http: HttpClient) {}


ngOnInit(): void {
  this.http.get<Order[]>('http://localhost:5208/api/Cart').subscribe(data => {
    this.orders = data.filter(order =>
      order.speicalLocation === this.deliveryArea &&
      order.status === 'قيد المعالجة'
    );

  });
    const storedOrders = localStorage.getItem('acceptedOrders');
    // const storedExpandedIds = localStorage.getItem('expandedOrderIds');

    this.acceptedOrders = storedOrders ? JSON.parse(storedOrders) : [];
    // this.expandedOrderIds = storedExpandedIds ? JSON.parse(storedExpandedIds) : [];
}

  toggleOrderItems(orderId: number): void {
    if (this.expandedOrderIds.includes(orderId)) {
      this.expandedOrderIds = this.expandedOrderIds.filter(id => id !== orderId);
    } else {
      this.expandedOrderIds.push(orderId);
    }
    localStorage.setItem('expandedOrderIds', JSON.stringify(this.expandedOrderIds));
  }

  acceptOrder(orderId: number): void {
    const updatedStatus = {
      status: 'تم القبول'
    };

    this.http.put(`http://localhost:5208/api/Cart/${orderId}`, updatedStatus)
      .subscribe({
        next: () => {
          const order = this.orders.find(o => o.id === orderId);
          if (order) {
            order.status = updatedStatus.status;


            const acceptedOrders = JSON.parse(localStorage.getItem('acceptedOrders') || '[]');
            acceptedOrders.push(order);
            localStorage.setItem('acceptedOrders', JSON.stringify(acceptedOrders));

            console.log(`Order ${orderId} marked as accepted and saved.`);
          }
        },
        error: err => {
          console.error(`Error updating order ${orderId}`, err);
        }
      });
  }


  isToday(dateStr: string): boolean {
    const date = new Date(dateStr);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isYesterday(dateStr: string): boolean {
    const date = new Date(dateStr);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  }

  formatRelativeDate(dateStr: string): string {
    const date = new Date(dateStr);
    if (this.isToday(dateStr)) {
      return 'Today';
    } else if (this.isYesterday(dateStr)) {
      return 'Yesterday';
    } else {
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
    }
  }


}
