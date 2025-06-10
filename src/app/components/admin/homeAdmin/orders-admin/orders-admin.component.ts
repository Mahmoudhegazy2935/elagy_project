import { Component } from '@angular/core';
import { NavebarAdminComponent } from "../../navebar-admin/navebar-admin/navebar-admin.component";
import { Order } from '../../../../models/order.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-orders-admin',
  standalone: true,
  imports: [NavebarAdminComponent,CommonModule,FormsModule],
  templateUrl: './orders-admin.component.html',
  styleUrl: './orders-admin.component.css'
})
export class OrdersAdminComponent {

  orders: Order[] = [];
  filteredOrders: Order[] = [];
  expandedOrderIds: number[] = [];
  selectedDate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Order[]>('https://elagy-apii.runasp.net/api/Cart').subscribe(data => {
      // Only load accepted orders
      this.orders = data.filter(order => order.status === 'تم القبول');
      this.filteredOrders = [...this.orders]; // default to all
    });
  }

 filterOrdersByDate(): void {
  if (!this.selectedDate) {
    this.filteredOrders = [...this.orders];
    return;
  }

  const selected = this.selectedDate;
  this.filteredOrders = this.orders.filter(order => {
    const orderDate = new Date(order.date).toISOString().split('T')[0];
    return orderDate === selected;
  });
}

  toggleOrderItems(orderId: number): void {
    if (this.expandedOrderIds.includes(orderId)) {
      this.expandedOrderIds = this.expandedOrderIds.filter(id => id !== orderId);
    } else {
      this.expandedOrderIds.push(orderId);
    }
  }

  formatRelativeDate(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'اليوم';
    if (date.toDateString() === yesterday.toDateString()) return 'أمس';

    return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' }).format(date);
  }

}
