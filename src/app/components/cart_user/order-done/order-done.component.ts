import { routes } from './../../../app.routes';
import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from '../../../models/order.model';
import { HttpClient } from '@angular/common/http';
import { NavebarComponent } from "../../navebar/navebar.component";
import { RouterModule } from '@angular/router';
import { Roshta } from '../../../models/roshta';
import Swal from 'sweetalert2';


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
  roshtas: Roshta[] = [];
  orders_apper:boolean=true;

  nearbyPharmacies: Pharmacy[] = [];
  savedInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  userName = this.savedInfo.userName || '';
  userAddress = this.savedInfo.userAddress || '';
  phoneNumber = this.savedInfo.phoneNumber || '';
  speicalLocation = this.savedInfo.speicalLocation || '';
  today = new Date().toISOString().split('T')[0]; // Example: '2025-04-28'


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRoshtas();
    this.loadOrders();
    this.loadNearbyPharmacies();
  }
  loadOrders() {
    const today = new Date();
    this.http.get<Order[]>('http://localhost:5208/api/Cart').subscribe(data => {
      this.orders = data.filter(order => {
        const orderDate = new Date(order.date);
        return order.userName.trim() === this.userName.trim() &&
               order.address.trim() === this.userAddress.trim() &&
               order.phoneNumber.trim() === this.phoneNumber.trim() &&
               order.speicalLocation.trim() === this.speicalLocation.trim() &&
               orderDate.toDateString() === today.toDateString();
      });
    });
  }
  
  loadRoshtas() {
    const today = new Date();
    this.http.get<Roshta[]>('http://localhost:5208/api/Roshta').subscribe(data => {
      this.roshtas = data.filter(roshta => {
        const roshtaDate = new Date(roshta.date);
        return roshta.userName.trim() === this.userName.trim() &&
               roshta.address.trim() === this.userAddress.trim() &&
               roshta.phoneNumber.trim() === this.phoneNumber.trim() &&
               roshta.speicalLocation.trim() === this.speicalLocation.trim() &&
               roshtaDate.toDateString() === today.toDateString();
      });
    });
  }
  


  loadNearbyPharmacies() {
    const addressEncoded = encodeURIComponent(this.speicalLocation);
    this.http.get<Pharmacy[]>(`http://localhost:5208/api/Pharmacy/Nearby?Address=${addressEncoded}`)
      .subscribe(data => {
        this.nearbyPharmacies = data;
      });
  }

  getTotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + (item.priceProduct * item.quantity), 0);
  }

  openImage(imagePath?: string): void {
    if (!imagePath) return;

    Swal.fire({
      imageUrl: `http://localhost:5208/${imagePath}`,
      imageAlt: 'صورة الروشتة',
      showCloseButton: true,
      confirmButtonText: 'إغلاق',
      width: '60%',
      customClass: {
        image: 'w-100'
      }
    });
  }


}
