import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { NavebarComponent } from '../../navebar/navebar.component';
import { FormsModule } from '@angular/forms';

interface Pharmacy {
  pharmacyName: string;
  deliveryArea: string;
}

@Component({
  selector: 'app-nb',
  standalone: true,
  imports: [NavebarComponent, FormsModule],
  templateUrl: './nb.component.html',
  styleUrl: './nb.component.css'
})
export class NbComponent {
  nearbyPharmacies: Pharmacy[] = [];

  roshtaFileName: string | null = null;
  roshtaFile: File | null = null;
  userAddress1: string = '';
  userName: string = '';
  userAddress: string = '';
  speicalLocation: string = '';
  phoneNumber: string = '';     // رقم الهاتف
  medicineName: string = '';    // اسم العلاج
  success: boolean = false;
  locations: string[] = [ 'قنا'];
  price: number = 0;
  secondLocationsList: string[] = [];
  secondLocation: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // ✅ استقبال اسم العلاج من البحث
    this.route.queryParams.subscribe(params => {
      if (params['name']) {
        this.medicineName = params['name'];
      }
    });

    const savedName = localStorage.getItem('roshtaFileName');
    if (savedName) this.roshtaFileName = savedName;
    if (this.speicalLocation) {
      this.loadNearbyPharmacies();
      this.updateSecondLocationsList();
    }
  }

  updateSecondLocationsList() {
    const locationsMap: { [key: string]: string[] } = {
   
      'قنا': ['الشؤون', 'المساكن', 'دردشة','الجامعة','التأمين','البنك الاهلي']
    };

    this.secondLocationsList = locationsMap[this.speicalLocation] || [];
    this.secondLocation = '';
  }

  updateUserAddress() {
    if (this.secondLocation) {
      if (!this.userAddress1 || this.userAddress1.trim() === '') {
        this.userAddress = this.secondLocation;
      } else {
        if (!this.userAddress1.includes(this.secondLocation)) {
          this.userAddress = this.secondLocation + ' - ' + this.userAddress1;
        }
      }
    }
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

  // ✅ الإرسال
  submitOrder(): void {
    if (!this.userName || !this.userAddress || !this.phoneNumber || !this.speicalLocation || !this.medicineName) {
      Swal.fire({
        icon: 'warning',
        title: 'معلومات ناقصة',
        text: 'يرجى ملء جميع الحقول وكتابة اسم العلاج.',
        confirmButtonText: 'موافق'
      });
      return;
    }

    Swal.fire({
      title: 'تأكيد إرسال الطلب',
      html: `
        <p>هل أنت متأكد من إرسال الطلب؟</p>
        <ul style="text-align: right; direction: rtl;">
          <li><b>الاسم:</b> ${this.userName}</li>
          <li><b>العنوان:</b> ${this.userAddress}</li>
          <li><b>رقم الهاتف:</b> ${this.phoneNumber}</li>
          <li><b>المنطقة:</b> ${this.speicalLocation}</li>
          <li><b>اسم العلاج:</b> ${this.medicineName}</li>
        </ul>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'إرسال',
      cancelButtonText: 'إلغاء'
    }).then(result => {
      if (result.isConfirmed) {
        // ⬇️ نعمل ملف وهمي باسم العلاج ونبعتو كأنه صورة
        const fakeFile = new File(
          [this.medicineName],
          `${this.medicineName}.txt`,
          { type: 'text/plain' }
        );

        const formData = new FormData();
        formData.append('Image', fakeFile);

        const params = new HttpParams()
          .set('UserName', this.userName)
          .set('Address', this.userAddress)
          .set('SpeicalLocation', this.speicalLocation)
          .set('PhoneNumber', this.phoneNumber)
          .set('Date', new Date().toISOString())
          .set('Status', 'قيد المعالجة')
          .set('price', this.price.toString());

        this.http.post('https://elagy-apii.runasp.net/api/Roshta', formData, { params }).subscribe({
          next: res => {
            localStorage.setItem('userInfo', JSON.stringify({
              userName: this.userName,
              userAddress: this.userAddress,
              phoneNumber: this.phoneNumber,
              speicalLocation: this.speicalLocation,
              medicineName: this.medicineName
            }));

            Swal.fire({
              icon: 'success',
              title: 'تم إرسال الطلب بنجاح!',
              confirmButtonText: 'تابع طلبك'
            }).then(() => {
              this.router.navigate(['/order_done']);
            });

            this.success = true;
          },
          error: err => {
            Swal.fire({
              icon: 'error',
              title: 'فشل في إرسال الطلب',
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
    this.http.get<Pharmacy[]>(`https://elagy-apii.runasp.net/api/Pharmacy/Nearby?Address=${addressEncoded}`)
      .subscribe(data => {
        this.nearbyPharmacies = data;
        console.log('Nearby Pharmacies:', this.nearbyPharmacies);
      });
    this.updateSecondLocationsList();
  }
}
