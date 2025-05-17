// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, Input } from '@angular/core';
// import { Observable, Subject, takeUntil, timer } from 'rxjs';
// import { Order } from '../../../models/order.model';
// import { RouterModule } from '@angular/router';


// @Component({
//   selector: 'app-pharmacy-home',
//   standalone: true,
//   imports: [CommonModule,RouterModule],
//   templateUrl: './pharmacy-home.component.html',
//   styleUrl: './pharmacy-home.component.css'
// })
// export class PharmacyHomeComponent {
//   menuOpen = false;
//   showDropdown = false;
//   deliveryArea=localStorage.getItem('pharmacyaddress');// e.g., passed from parent pharmacy home
//   pharmacy_name=localStorage.getItem('pharmacyName');
//   orders: Order[] = [];
//   expandedOrderIds: number[] = [];
//   acceptedOrders: Order[] = [];
//   showAccepted: boolean = false;
//     private destroy$ = new Subject<void>();



//   constructor(private http: HttpClient) {}


// ngOnInit(): void {
//   timer(0, 10000) // run every 10 seconds
//     .pipe(takeUntil(this.destroy$))
//     .subscribe(() => {
//       this.http.get<Order[]>('http://localhost:5208/api/Cart').subscribe(data => {
//         // Step 1: Update orders that are too old
//         data.forEach(order => {
//           if (
//             order.speicalLocation === this.deliveryArea &&
//             order.status === 'قيد المعالجة' &&
//             this.isOlderThan3Hours(order.date)
//           ) {
//             this.http.put(`http://localhost:5208/api/Cart/${order.id}`, { status: 'نأسف لاتوجد استجابة' })
//               .subscribe(() => {
//                 console.log(`Order ${order.id} updated to نأسف لاتوجد استجابة`);
//               });
//           }
//         });

//         // Step 2: Filter and mark active orders
//         this.orders = data
//           .filter(order =>
//             order.speicalLocation === this.deliveryArea &&
//             order.status === 'قيد المعالجة' &&
//             this.isLessThan3HoursOld(order.date)
//           )
//           .map(order => {
//             const orderDate = new Date(order.date);
//             const now = new Date();
//             const diffInHours = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);

//             return {
//               ...order,
//               isAboutToExpire: diffInHours >= 2.5 && diffInHours < 3
//             };
//           });

//         // Step 3: Accepted orders (already accepted)
//         this.acceptedOrders = data.filter(order =>
//           order.speicalLocation === this.deliveryArea &&
//           order.status === 'تم القبول'
//         );

//         // Save to localStorage if needed
//         localStorage.setItem('acceptedOrders', JSON.stringify(this.acceptedOrders));
//       });
//     });

//   const storedOrders = localStorage.getItem('acceptedOrders');
//   this.acceptedOrders = storedOrders ? JSON.parse(storedOrders) : [];
// }



// ngOnDestroy(): void {
//   this.destroy$.next();
//   this.destroy$.complete();
// }


//   toggleOrderItems(orderId: number): void {
//     if (this.expandedOrderIds.includes(orderId)) {
//       this.expandedOrderIds = this.expandedOrderIds.filter(id => id !== orderId);
//     } else {
//       this.expandedOrderIds.push(orderId);
//     }
//     localStorage.setItem('expandedOrderIds', JSON.stringify(this.expandedOrderIds));
//   }

//   acceptOrder(orderId: number): void {
//     const updatedStatus = {
//       status: 'تم القبول'
//     };

//     // إرسال الطلب للـ API لتحديث الحالة
//     this.http.put(`http://localhost:5208/api/Cart/${orderId}`, updatedStatus)
//       .subscribe({
//         next: () => {
//           // العثور على الطلب الذي تم قبوله من داخل قائمة orders
//           const order = this.orders.find(o => o.id === orderId);
//           if (order) {
//             // تحديث حالة الطلب إلى "تم القبول"
//             order.status = updatedStatus.status;

//             // إضافة الطلب إلى قائمة الطلبات المقبولة في الذاكرة المحلية
//             const acceptedOrders = JSON.parse(localStorage.getItem('acceptedOrders') || '[]');
//             acceptedOrders.push(order);
//             localStorage.setItem('acceptedOrders', JSON.stringify(acceptedOrders));

//             // تحديث قائمة الطلبات المقبولة في الواجهة
//             this.updateAcceptedOrders();
//             this.refreshOrders();

//             console.log(`Order ${orderId} marked as accepted and saved.`);
//           } else {
//             console.error(`Order with ID ${orderId} not found in local data.`);
//           }
//         },
//         error: err => {
//           console.error(`Error updating order ${orderId}:`, err);
//           alert('حدث خطأ أثناء تحديث حالة الطلب. يرجى المحاولة لاحقاً.');
//         }
//       });
//   }

//   // دالة لتحديث قائمة الطلبات المقبولة في الواجهة
//   updateAcceptedOrders(): void {
//     // تحديث قائمة الطلبات المقبولة من الذاكرة المحلية
//     this.acceptedOrders = JSON.parse(localStorage.getItem('acceptedOrders') || '[]');
//     // إذا كنت تستخدم عرض أو تصفية هذه الطلبات في واجهة المستخدم، يمكن إضافة مزيد من التصفية هنا
//   }


//   refreshOrders(): void {
//     this.http.get<any[]>('http://localhost:5208/api/Cart').subscribe(data => {
//       this.orders = data.filter(order =>
//         order.speicalLocation === this.deliveryArea &&
//         order.status === 'قيد المعالجة' &&
//         this.isLessThan3HoursOld(order.date)
//       );

//       this.acceptedOrders = data.filter(order =>
//         order.speicalLocation === this.deliveryArea &&
//         order.status === 'تم القبول'
//       );

//       // تحديث التخزين المحلي إن كنت تستخدمه
//       localStorage.setItem('acceptedOrders', JSON.stringify(this.acceptedOrders));
//     });
//   }


//   isToday(dateStr: string): boolean {
//     const date = new Date(dateStr);
//     const today = new Date();
//     return date.toDateString() === today.toDateString();
//   }

//   isYesterday(dateStr: string): boolean {
//     const date = new Date(dateStr);
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);
//     return date.toDateString() === yesterday.toDateString();
//   }

//   formatRelativeDate(dateStr: string): string {
//     const date = new Date(dateStr);
//     if (this.isToday(dateStr)) {
//       return 'اليوم';
//     } else if (this.isYesterday(dateStr)) {
//       return 'أمس';
//     } else {
//       return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
//     }
//   }


//   toggleMenu() {
//     this.menuOpen = !this.menuOpen;
//   }

//   toggleDropdown() {
//     this.showDropdown = !this.showDropdown;
//   }




// isLessThan3HoursOld(dateStr: string): boolean {
//   const date = new Date(dateStr);
//   const now = new Date();
//   const diffMs = now.getTime() - date.getTime();
//   return diffMs < 3 * 60 * 60 * 1000; // 3 hours in milliseconds
// }

// isOlderThan3Hours(dateStr: string): boolean {
//   const date = new Date(dateStr);
//   const now = new Date();
//   const diffMs = now.getTime() - date.getTime();
//   return diffMs >= 3 * 60 * 60 * 1000;
// }


// }


import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable, Subject, takeUntil, timer } from 'rxjs';
import { Order } from '../../../models/order.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pharmacy-home',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './pharmacy-home.component.html',
  styleUrl: './pharmacy-home.component.css'
})
export class PharmacyHomeComponent {
  menuOpen = false;
  showDropdown = false;
  deliveryArea = localStorage.getItem('pharmacyaddress'); // e.g., 'نجع حمادي'
  pharmacy_name = localStorage.getItem('pharmacyName');
  orders: Order[] = [];
  expandedOrderIds: number[] = [];
  acceptedOrders: Order[] = [];
  showAccepted: boolean = false;
  private destroy$ = new Subject<void>();

  selectedStreet: string = '';

  locationsMap: { [key: string]: string[] } = {
    'نجع حمادي': ['شارع أحمد شوقي', 'حي السلام', 'المنطقة الصناعية'],
    'قنا': ['حي الكوثر', 'شارع البحر', 'شارع الثورة'],
    'دشنا': ['الحي الشرقي', 'شارع الجيش'],
    'اولاد عمرو': ['الشارع العام', 'حي المعلمين'],
    'الوقف': ['حي النور', 'شارع 15 مايو']
  };

  get streetsForArea(): string[] {
    return this.deliveryArea ? this.locationsMap[this.deliveryArea] || [] : [];
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    timer(0, 10000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.http.get<Order[]>('http://localhost:5208/api/Cart').subscribe(data => {
          data.forEach(order => {
            if (
              order.speicalLocation === this.deliveryArea &&
              order.status === 'قيد المعالجة' &&
              this.isOlderThan3Hours(order.date)
            ) {
              this.http.put(`http://localhost:5208/api/Cart/${order.id}`, { status: 'نأسف لاتوجد استجابة' })
                .subscribe(() => {
                  console.log(`Order ${order.id} updated to نأسف لاتوجد استجابة`);
                });
            }
          });

          this.orders = data
            .filter(order =>
              order.speicalLocation === this.deliveryArea &&
              order.status === 'قيد المعالجة' &&
              this.isLessThan3HoursOld(order.date)
            )
            .map(order => {
              const orderDate = new Date(order.date);
              const now = new Date();
              const diffInHours = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);
              const mainStreet = order.address?.split('-')[0].trim();
              return {
                ...order,
                mainStreet,
                isAboutToExpire: diffInHours >= 2.5 && diffInHours < 3
              } as any;
            });

          this.acceptedOrders = data.filter(order =>
            order.speicalLocation === this.deliveryArea &&
            order.status === 'تم القبول'
          );

          localStorage.setItem('acceptedOrders', JSON.stringify(this.acceptedOrders));
        });
      });

    const storedOrders = localStorage.getItem('acceptedOrders');
    this.acceptedOrders = storedOrders ? JSON.parse(storedOrders) : [];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    const updatedStatus = { status: 'تم القبول' };

    this.http.put(`http://localhost:5208/api/Cart/${orderId}`, updatedStatus).subscribe({
      next: () => {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
          order.status = updatedStatus.status;

          const acceptedOrders = JSON.parse(localStorage.getItem('acceptedOrders') || '[]');
          acceptedOrders.push(order);
          localStorage.setItem('acceptedOrders', JSON.stringify(acceptedOrders));

          this.updateAcceptedOrders();
          this.refreshOrders();

          console.log(`Order ${orderId} marked as accepted and saved.`);
        } else {
          console.error(`Order with ID ${orderId} not found in local data.`);
        }
      },
      error: err => {
        console.error(`Error updating order ${orderId}:`, err);
        alert('حدث خطأ أثناء تحديث حالة الطلب. يرجى المحاولة لاحقاً.');
      }
    });
  }

  updateAcceptedOrders(): void {
    this.acceptedOrders = JSON.parse(localStorage.getItem('acceptedOrders') || '[]');
  }

  refreshOrders(): void {
    this.http.get<any[]>('http://localhost:5208/api/Cart').subscribe(data => {
      this.orders = data
        .filter(order =>
          order.speicalLocation === this.deliveryArea &&
          order.status === 'قيد المعالجة' &&
          this.isLessThan3HoursOld(order.date)
        )
        .map(order => {
          const mainStreet = order.address?.split('-')[0].trim();
          return { ...order, mainStreet } as any;
        });

      this.acceptedOrders = data.filter(order =>
        order.speicalLocation === this.deliveryArea &&
        order.status === 'تم القبول'
      );

      localStorage.setItem('acceptedOrders', JSON.stringify(this.acceptedOrders));
    });
  }

  getFilteredOrders(): any[] {
    if (!this.selectedStreet) {
      return this.orders;
    }
    return this.orders.filter((order: any) => order.mainStreet === this.selectedStreet);
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
    if (this.isToday(dateStr)) return 'اليوم';
    else if (this.isYesterday(dateStr)) return 'أمس';
    else return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  isLessThan3HoursOld(dateStr: string): boolean {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    return diffMs < 3 * 60 * 60 * 1000;
  }

  isOlderThan3Hours(dateStr: string): boolean {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    return diffMs >= 3 * 60 * 60 * 1000;
  }
}
