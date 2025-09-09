import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Roshta } from '../../../models/roshta';
import Swal from 'sweetalert2';
import { Subject, takeUntil, timer } from 'rxjs';
import { SpinnerComponent } from "../../spinner/spinner.component";

@Component({
  selector: 'app-pharmacy-roshta',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, SpinnerComponent],
  templateUrl: './pharmacy-roshta.component.html',
  styleUrl: './pharmacy-roshta.component.css'
})
export class PharmacyRoshtaComponent { menuOpen = false;
  showDropdown = false;
  deliveryArea = localStorage.getItem('pharmacyaddress'); 
  pharmacy_name = localStorage.getItem('pharmacyName');
  roshtas: Roshta[] = [];
  expandedRoshtaIds: number[] = [];
  acceptedRoshtas: any[] = [];
  showAccepted = false;
  loading: boolean = false;
  selectedStreet: string = ''; 
  streetsForArea: string[] = []; 

  private destroy$ = new Subject<void>();

  locationsMap: { [key: string]: string[] } = {
    'نجع حمادي': ['شارع أحمد شوقي', 'حي السلام', 'المنطقة الصناعية'],
    'قنا': ['الشؤون', 'المساكن', 'البانزيون', 'السيد', 'حوض عشرة', 'المعبر'],
    'دشنا': ['كوبري الجبانة', 'كوبري حلاوة', 'المركز'],
    'اولاد عمرو': ['الشارع العام', 'حي المعلمين'],
    'الوقف': ['حي النور', 'شارع 15 مايو']
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loading = true;
    this.streetsForArea = this.locationsMap[this.deliveryArea || ''] || [];

    timer(0, 10000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.http.get<Roshta[]>('https://elagy-apii.runasp.net/api/Roshta').subscribe(data => {
          this.loading = false;
          const now = new Date();
          const updatedRoshtas: Roshta[] = [];

          data.forEach(roshta => {
            const roshtaDate = new Date(roshta.date);
            const diffInMs = now.getTime() - roshtaDate.getTime();
            const diffInHours = diffInMs / (1000 * 60 * 60);
            const mainStreet = this.getMainStreet(roshta.address);

            if (
              roshta.speicalLocation === this.deliveryArea &&
              roshta.status === 'قيد المعالجة' &&
              (!this.selectedStreet || mainStreet === this.selectedStreet)
            ) {
              if (diffInHours > 3) {
                const updated = { ...roshta, status: 'نأسف لاتوجد استجابة' };
                this.http.put(`https://elagy-apii.runasp.net/api/Roshta/${roshta.id}`, { status: updated.status })
                  .subscribe(() => {
                    console.log(`Roshta ${roshta.id} updated due to timeout`);
                    this.refreshRoshtas();
                  });
              } else {
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
      status: `تم القبول - ${this.pharmacy_name}-العنوان : ${this.deliveryArea}` ,
      price: enteredPrice
    };

    this.http.put(`https://elagy-apii.runasp.net/api/Roshta/${orderId}`, updatedStatus)
      .subscribe({
        next: () => {
          const roshta = this.roshtas.find(r => r.id === orderId);
          if (roshta) {
            roshta.status = updatedStatus.status;
            roshta.price = enteredPrice;

            const accepted = JSON.parse(localStorage.getItem('acceptedRoshtas') || '[]');
            accepted.push(roshta);
            localStorage.setItem('acceptedRoshtas', JSON.stringify(accepted));

            this.refreshRoshtas();
            this.updateAcceptedRoshtas();

            console.log(`Roshta ${orderId} accepted with price ${enteredPrice}.`);
          }
        },
        error: err => {
          console.error(`Error updating roshta ${orderId}:`, err);
          alert('حدث خطأ أثناء تحديث حالة الروشتة. يرجى المحاولة لاحقاً.');
        }
      });
  }

  refreshRoshtas(): void {
    this.loading = true;
    this.http.get<Roshta[]>('https://elagy-apii.runasp.net/api/Roshta').subscribe(data => {
      this.loading = false;
      this.roshtas = data.filter(order => {
        const mainStreet = this.getMainStreet(order.address);
        return order.speicalLocation === this.deliveryArea &&
               order.status === 'قيد المعالجة' &&
               (!this.selectedStreet || mainStreet === this.selectedStreet);
      });
    });
  }

  updateAcceptedRoshtas(): void {
    this.acceptedRoshtas = JSON.parse(localStorage.getItem('acceptedRoshtas') || '[]');
  }

  getMainStreet(address: string): string {
    return address.split('-')[0].trim();
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
      imageUrl: `https://elagy-apii.runasp.net/${imagePath}`,
      imageAlt: 'صورة الروشتة',
      showCloseButton: true,
      confirmButtonText: 'إغلاق',
      width: '60%',
      customClass: {
        image: 'w-100'
      }
    });
  }

  // ✅ لو الملف صورة
  isImageFile(path: string): boolean {
    const lower = path.toLowerCase();
    return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.gif') || lower.endsWith('.webp');
  }

  // ✅ لو الملف نص (نجيب اسم العلاج بس)
  getFileName(path: string): string {
    const fileName = path.split('\\').pop()?.split('/').pop() || path;
    return fileName.split('-').pop() || fileName;
  }
}
