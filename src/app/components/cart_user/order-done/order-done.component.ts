import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from '../../../models/order.model';
import { HttpClient } from '@angular/common/http';
import { NavebarComponent } from "../../navebar/navebar.component";
import { RouterModule } from '@angular/router';


interface Pharmacy {
  pharmacyName: string;
  deliveryArea: string;
}

@Component({
  selector: 'app-order-done',
  standalone: true,
  imports: [NavebarComponent,RouterModule],
  templateUrl: './order-done.component.html',
  styleUrl: './order-done.component.css'
})
export class OrderDoneComponent implements OnInit{
  orders: Order[] = [];
  nearbyPharmacies: Pharmacy[] = [];

  savedInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  userName = this.savedInfo.userName || '';
  userAddress = this.savedInfo.userAddress || '';
  phoneNumber = this.savedInfo.phoneNumber || '';
  speicalLocation = this.savedInfo.speicalLocation || '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadNearbyPharmacies();
  }

  loadOrders() {
    this.http.get<Order[]>('http://localhost:5208/api/Cart').subscribe(data => {
      this.orders = data.filter(order =>
        order.userName === this.userName &&
        order.address === this.userAddress &&
        order.phoneNumber === this.phoneNumber &&
        order.speicalLocation === this.speicalLocation
      );
      console.log('Filtered orders:', this.orders);
    });
  }

  loadNearbyPharmacies() {
    const addressEncoded = encodeURIComponent(this.speicalLocation);
    this.http.get<Pharmacy[]>(`http://localhost:5208/api/Pharmacy/Nearby?Address=${addressEncoded}`)
      .subscribe(data => {
        this.nearbyPharmacies = data;
        console.log('Nearby Pharmacies:', this.nearbyPharmacies);
      });
  }

  getTotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + (item.priceProduct * item.quantity), 0);
  }


}
