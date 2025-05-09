import { Component } from '@angular/core';
import { NavebarComponent } from "../../navebar/navebar.component";
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Pharmacy {
  pharmacyName: string;
  deliveryArea: string;
}

@Component({
  selector: 'app-roshta',
  standalone: true,
  imports: [NavebarComponent, FormsModule],
  templateUrl: './roshta.component.html',
  styleUrl: './roshta.component.css'
})
export class RoshtaComponent {
  nearbyPharmacies: Pharmacy[] = [];

  roshtaFileName: string | null = null;
  roshtaFile: File | null = null;

  userName: string = '';
  userAddress: string = '';
  speicalLocation: string = '';
  phoneNumber: string = '';
  success: boolean = false;
  locations: string[] = ['نجع حمادي', 'قنا', 'دشنا', 'اولاد عمرو', 'الوقف'];
  price: number = 0;

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    // Restore optional saved image name
    const savedName = localStorage.getItem('roshtaFileName');
    if (savedName) this.roshtaFileName = savedName;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.roshtaFile = file;
      this.roshtaFileName = file.name;
      localStorage.setItem('roshtaFileName', file.name);
    }
  }

  deleteRoshta(): void {
    this.roshtaFile = null;
    this.roshtaFileName = null;
    localStorage.removeItem('roshtaFileName');
  }

  submitOrder(): void {
    if (!this.userName || !this.userAddress || !this.phoneNumber || !this.speicalLocation || !this.roshtaFile) {
      Swal.fire({
        icon: 'warning',
        title: 'معلومات ناقصة',
        text: 'يرجى ملء جميع الحقول وتحميل الروشتة.',
        confirmButtonText: 'موافق'
      });
      return;
    }

    Swal.fire({
      title: 'تأكيد إرسال الروشتة',
      html: `
        <p>هل أنت متأكد من إرسال الروشتة؟</p>
        <ul style="text-align: right; direction: rtl;">
          <li><b>الاسم:</b> ${this.userName}</li>
          <li><b>العنوان:</b> ${this.userAddress}</li>
          <li><b>رقم الهاتف:</b> ${this.phoneNumber}</li>
          <li><b>المنطقة:</b> ${this.speicalLocation}</li>
          <li><b>اسم الملف:</b> ${this.roshtaFileName}</li>
        </ul>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'إرسال',
      cancelButtonText: 'إلغاء'
    }).then(result => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('Image', this.roshtaFile!);

        const params = new HttpParams()
          .set('UserName', this.userName)
          .set('Address', this.userAddress)
          .set('SpeicalLocation', this.speicalLocation)
          .set('PhoneNumber', this.phoneNumber)
          .set('Date', new Date().toISOString())
          .set('Status', 'قيد المعالجة')
          .set('price', this.price.toString());

        this.http.post('http://localhost:5208/api/Roshta', formData, { params }).subscribe({
          next: res => {
            localStorage.setItem('userInfo', JSON.stringify({
              userName: this.userName,
              userAddress: this.userAddress,
              phoneNumber: this.phoneNumber,
              speicalLocation: this.speicalLocation
            }));
            if (this.nearbyPharmacies.length > 0) {
              this.clearRoshtaFile();
              Swal.fire({
                icon: 'success',
                title: 'تم إرسال الروشتة بنجاح!',
                html: `
                  <p>سيتم التواصل معك من أقرب صيدلية قريبة</p>
                  <p>شكرًا لطلبك 🎉</p>
                `,
                confirmButtonText: 'تابع طلبك'
              }).then(() => {
                this.router.navigate(['/order_done']);
              });
            } else {
              Swal.fire({
                icon: 'info',
                title: 'لا توجد صيدليات قريبة',
                html: `
                  <p>تم تسجيل الطلب وسنعمل على توفير صيدلية في منطقتك.</p>
                `,
                confirmButtonText: 'العودة'
              });
            }

            this.success = true;
          },
          error: err => {
            Swal.fire({
              icon: 'error',
              title: 'فشل في إرسال الروشتة',
              text: 'حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.',
              confirmButtonText: 'موافق'
            });
            console.error(err);
          }
        });
      }
    });
  }


  clearRoshtaFile(): void {
    this.roshtaFile = null;
    this.roshtaFileName = null;
    localStorage.removeItem('roshtaFileName');
  }

  loadNearbyPharmacies() {
    const addressEncoded = encodeURIComponent(this.speicalLocation);
    this.http.get<Pharmacy[]>(`http://localhost:5208/api/Pharmacy/Nearby?Address=${addressEncoded}`)
      .subscribe(data => {
        this.nearbyPharmacies = data;
        console.log('Nearby Pharmacies:', this.nearbyPharmacies);
      });
  }
}
