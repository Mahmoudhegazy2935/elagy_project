import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Roshta } from '../../../models/roshta';
import Swal from 'sweetalert2';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-pharmacy-roshta',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './pharmacy-roshta.component.html',
  styleUrl: './pharmacy-roshta.component.css'
})
export class PharmacyRoshtaComponent {
  menuOpen = false;
  showDropdown = false;
  deliveryArea=localStorage.getItem('pharmacyaddress');// e.g., passed from parent pharmacy home
  pharmacy_name=localStorage.getItem('pharmacyName');
  roshtas: Roshta[] = [];
  expandedRoshtaIds: number[] = [];
  acceptedRoshtas: any[] = [];
  showAccepted = false;
  private destroy$ = new Subject<void>();


  constructor(private http: HttpClient) {}

ngOnInit(): void {
  timer(0, 10000) // Immediately and every 10 seconds
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.http.get<Roshta[]>('http://localhost:5208/api/Roshta').subscribe(data => {
        const now = new Date();
        const updatedRoshtas: Roshta[] = [];

        data.forEach(roshta => {
          const roshtaDate = new Date(roshta.date);
          const diffInMs = now.getTime() - roshtaDate.getTime();
          const diffInHours = diffInMs / (1000 * 60 * 60);

          if (
            roshta.speicalLocation === this.deliveryArea &&
            roshta.status === 'قيد المعالجة'
          ) {
            if (diffInHours > 3) {
              // Set status to 'نأسف لاتوجد استجابة'
              const updated = { ...roshta, status: 'نأسف لاتوجد استجابة' };
              this.http.put(`http://localhost:5208/api/Roshta/${roshta.id}`, { status: updated.status })
                .subscribe(() => {
                  console.log(`Roshta ${roshta.id} updated due to timeout`);
                  this.refreshRoshtas(); // Refresh after update
                });
            } else {
              // 👇 Set isAboutToExpire flag
              (roshta as any).isAboutToExpire = diffInHours >= 2.5 && diffInHours < 3;
              updatedRoshtas.push(roshta);
            }
          }
        });

        this.roshtas = updatedRoshtas;
      });
    });

  const storedRoshtas = localStorage.getItem('acceptedRoshtas');
  this.acceptedRoshtas = storedRoshtas ? JSON.parse(storedRoshtas) : [];
}


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  toggleRoshta(orderId: number): void {
    if (this.expandedRoshtaIds.includes(orderId)) {
      this.expandedRoshtaIds = this.expandedRoshtaIds.filter(id => id !== orderId);
    } else {
      this.expandedRoshtaIds.push(orderId);
    }
    localStorage.setItem('expandedRoshtaIds', JSON.stringify(this.expandedRoshtaIds));
  }

  acceptRoshta(orderId: number, enteredPrice: number): void {
    if (!enteredPrice || enteredPrice <= 0) {
      alert('يرجى إدخال سعر صحيح للروشتة قبل القبول.');
      return;
    }

    const updatedStatus = {
      status: 'تم القبول',
      price: enteredPrice
    };

    this.http.put(`http://localhost:5208/api/Roshta/${orderId}`, updatedStatus)
      .subscribe({
        next: () => {
          const roshta = this.roshtas.find(r => r.id === orderId);
          if (roshta) {
            roshta.status = updatedStatus.status;
            roshta.price = enteredPrice;

            const accepted = JSON.parse(localStorage.getItem('acceptedRoshtas') || '[]');
            accepted.push(roshta);
            localStorage.setItem('acceptedRoshtas', JSON.stringify(accepted));

            // تحديث بيانات الروشتات المتاحة في الواجهة
            this.refreshRoshtas();
            this.updateAcceptedRoshtas();

            console.log(`Roshta ${orderId} accepted with price ${enteredPrice}.`);
          } else {
            console.error(`Roshta with ID ${orderId} not found in local data.`);
          }
        },
        error: err => {
          console.error(`Error updating roshta ${orderId}:`, err);
          alert('حدث خطأ أثناء تحديث حالة الروشتة. يرجى المحاولة لاحقاً.');
        }
      });
  }

  // دالة لتحديث الطلبات
  refreshRoshtas(): void {
    this.http.get<any[]>('http://localhost:5208/api/Roshta').subscribe(data => {
      this.roshtas = data.filter(order =>
        order.speicalLocation === this.deliveryArea &&
        order.status === 'قيد المعالجة'
      );
    });
  }

  updateAcceptedRoshtas(): void {
    this.acceptedRoshtas = JSON.parse(localStorage.getItem('acceptedRoshtas') || '[]');
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
    if (this.isYesterday(dateStr)) return 'أمس';
    return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' }).format(date);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  openImage(imagePath: string): void {
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
