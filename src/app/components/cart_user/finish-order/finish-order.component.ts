// import { Component } from '@angular/core';
// import { NavebarComponent } from "../../navebar/navebar.component";
// import { Cart2Service } from '../../../services/cart2.service/cart2.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import Swal from 'sweetalert2';
// import { HttpClient } from '@angular/common/http';

// interface Pharmacy {
//   pharmacyName: string;
//   deliveryArea: string;
// }

// @Component({
//   selector: 'app-finish-order',
//   standalone: true,
//   imports: [NavebarComponent,RouterModule,CommonModule,FormsModule],
//   templateUrl: './finish-order.component.html',
//   styleUrl: './finish-order.component.css'
// })
// export class FinishOrderComponent {

//    constructor(private cart2Service:Cart2Service,private router: Router,private http: HttpClient) { }
//   cartProducts: any[] = [];
//   userName: string = '';
//   userAddress: string = '';
//   speicalLocation:string='';
//   phoneNumber: string = '';
//   success:boolean = false;
//   total:number = 0;
//   locations: string[] = ['نجع حمادي', 'قنا', 'دشنا', 'اولاد عمرو', 'الوقف'];
//   nearbyPharmacies: Pharmacy[] = [];
//   secondLocation: string = '';
// secondLocationsList: string[] = ['فرشوط', 'قوص', 'قفط', 'نقادة', 'أبوتشت'];
// logSecondLocation() {
//   console.log("📍 العنوان الإضافي المختار:", this.secondLocation);
// }

// ngOnInit() {
//   // Option 1: If using localStorage
//   this.cartProducts = JSON.parse(localStorage.getItem('cart')!) || [];



//   if (this.speicalLocation) {
//     this.loadNearbyPharmacies();
//   }



// }



// submitOrder() {
//   if (!this.userName || !this.userAddress || !this.phoneNumber) {
//     Swal.fire({
//       icon: 'warning',
//       title: 'معلومات ناقصة',
//       text: 'يرجى إدخال الاسم والعنوان ورقم الهاتف.',
//       confirmButtonText: 'حسنًا'
//     });
//     return;
//   }

//   let items = this.cartProducts.map(item => {
//     return {
//       productId: item.id,
//       quantity: item.amount,
//     };
//   });

//   let fullAddress = this.secondLocation // جديد
//   ? `${this.secondLocation} - ${this.userAddress}` // جديد
//   : this.userAddress; // جديد

// let orderModel = {
//   userName: this.userName,
//   address: fullAddress, // جديد
//   speicalLocation: this.speicalLocation,
//   phoneNumber: this.phoneNumber,
//   date: new Date().toISOString(),
//   status: "قيد المعالجة",
//   items: items
// };

//   // Show confirmation popup before sending
//   Swal.fire({
//     title: 'تأكيد الطلب',
//     html: `
//       <p>هل أنت متأكد أنك تريد إرسال الطلب؟</p>
//       <ul style="text-align: right; direction: rtl;">
//         <li><b>الاسم:</b> ${this.userName}</li>
//         <li><b>العنوان:</b> ${this.userAddress}</li>
//         <li><b>رقم الهاتف:</b> ${this.phoneNumber}</li>
//         <li><b>عدد المنتجات:</b> ${items.length}</li>
//       </ul>
//     `,
//     icon: 'question',
//     showCancelButton: true,
//     confirmButtonText: 'إرسال',
//     cancelButtonText: 'إلغاء'
//   }).then(result => {
//     if (result.isConfirmed) {
//       this.cart2Service.createNewCart(orderModel).subscribe(
//         res => {
//           localStorage.setItem('userInfo', JSON.stringify({
//             userName: this.userName,
//             userAddress: this.userAddress,
//             phoneNumber: this.phoneNumber,
//             speicalLocation: this.speicalLocation
//           }));
//           if(this.nearbyPharmacies.length > 0){
//           Swal.fire({
//             icon: 'success',
//             title: 'تم إرسال الطلب بنجاح!',
//             html: `
//                 <p>وسيتم التواصل معك</p>
//                 <p>شكرًا لطلبك 🎉</p>
//               `,
//             text: 'شكرًا لطلبك 🎉',
//             confirmButtonText: 'تابع طلبك'
//           }).then(() => {
//             this.router.navigate(['/order_done']);
//           });
//           this.clearCart();
//           this.success = true;
//         }else{
//           Swal.fire({
//             icon: 'error',
//             title: 'نأسف , لاتوجد صيدليات قريبه ',
//             html: `
//                 <p>وسيتم اخذ العنوان والتعامل مع صيدليات في منطقتك</p>
//               `,
//             text: 'شكرًا لطلبك ',
//             confirmButtonText: 'الذهاب للصفحة الرئيسيه '
//           }).then(() => {
//             this.router.navigate(['/home']);
//           });
//         }
//         },
//         err => {
//           Swal.fire({
//             icon: 'error',
//             title: 'فشل في إرسال الطلب',
//             text: 'حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.',
//             confirmButtonText: 'موافق'
//           });
//           this.success = false;
//           console.log(err)
//         }
//       );

//       console.log("📦 الطلب المرسل:", orderModel);
//     }
//   });
// }
// clearCart() {
//   this.cartProducts = []
//   this.getCartTotal()
//   localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
// };

// getCartTotal() {
//   this.total = 0;

//   for (let x of this.cartProducts) {
//     const price = Number(x.price);
//     const amount = Number(x.amount);
//     if (!isNaN(price) && !isNaN(amount)) {
//       this.total += price * amount;
//       console.log("jh")
//     }
//   }

// }

// loadNearbyPharmacies() {
//   const addressEncoded = encodeURIComponent(this.speicalLocation);
//   this.http.get<Pharmacy[]>(`https://elagy-apii.runasp.net/api/Pharmacy/Nearby?Address=${addressEncoded}`)
//     .subscribe(data => {
//       this.nearbyPharmacies = data;
//       console.log('Nearby Pharmacies:', this.nearbyPharmacies);
//     });
// }

// }
//////////////////////////////////////////////////////////
import { Component } from '@angular/core';
import { NavebarComponent } from "../../navebar/navebar.component";
import { Cart2Service } from '../../../services/cart2.service/cart2.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

interface Pharmacy {
  pharmacyName: string;
  deliveryArea: string;
}

@Component({
  selector: 'app-finish-order',
  standalone: true,
  imports: [NavebarComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './finish-order.component.html',
  styleUrls: ['./finish-order.component.css']
})
export class FinishOrderComponent {

  constructor(private cart2Service: Cart2Service, private router: Router, private http: HttpClient) { }

  cartProducts: any[] = [];
  loading:boolean=false;
  userAddress1:string='';
  userName: string = '';
  userAddress: string = '';
  speicalLocation: string = '';
  phoneNumber: string = '';
  success: boolean = false;
  total: number = 0;
  locations: string[] = ['نجع حمادي', 'قنا', 'دشنا', 'اولاد عمرو', 'الوقف'];

  nearbyPharmacies: Pharmacy[] = [];

  // إضافة مصفوفة العناوين الإضافية
  secondLocationsList: string[] = [];

  secondLocation: string = '';

  ngOnInit() {
    this.cartProducts = JSON.parse(localStorage.getItem('cart')!) || [];

    if (this.speicalLocation) {
      this.loadNearbyPharmacies();
      this.updateSecondLocationsList();
    }
  }

  // تحدّث قائمة العناوين الإضافية بناءً على العنوان العام
  updateSecondLocationsList() {
    const locationsMap: { [key: string]: string[] } = {
      'نجع حمادي': ['شارع أحمد شوقي', 'حي السلام', 'المنطقة الصناعية'],
      'قنا': ['الشؤون', 'المساكن', 'البانزيون','السيد','حوض عشرة','المعبر'],
      'دشنا': ['كوبري الجبانة', 'كوبري حلاوة','المركز'],
      'اولاد عمرو': ['الشارع العام', 'حي المعلمين'],
      'الوقف': ['حي النور', 'شارع 15 مايو']
    };

    this.secondLocationsList = locationsMap[this.speicalLocation] || [];
    // امسح العنوان الإضافي المختار لما يتغير العنوان العام
    this.secondLocation = '';
  }

  loadNearbyPharmacies() {
    this.loading=true;
    if (!this.speicalLocation) return;

    const addressEncoded = encodeURIComponent(this.speicalLocation);
    this.http.get<Pharmacy[]>(`https://elagy-apii.runasp.net/api/Pharmacy/Nearby?Address=${addressEncoded}`)
      .subscribe(data => {
        this.loading=false;
        this.nearbyPharmacies = data;
        console.log('Nearby Pharmacies:', this.nearbyPharmacies);
      });

    this.updateSecondLocationsList();
  }

  // دالة لدمج العنوان الإضافي مع العنوان بالتفصيل
  updateUserAddress() {
    if (this.secondLocation) {
      if (!this.userAddress1 || this.userAddress1.trim() === '') {
        this.userAddress = this.secondLocation;
      } else {
        if (!this.userAddress1.includes(this.secondLocation)) {
          this.userAddress =   this.secondLocation +' - ' + this.userAddress1;
        }
      }
    }
  }

  submitOrder() {
    if (!this.userName || !this.userAddress || !this.phoneNumber) {
      Swal.fire({
        icon: 'warning',
        title: 'معلومات ناقصة',
        text: 'يرجى إدخال الاسم والعنوان ورقم الهاتف.',
        confirmButtonText: 'حسنًا'
      });
      return;
    }

    let items = this.cartProducts.map(item => {
      return {
        productId: item.id,
        quantity: item.amount,
      };
    });

    let orderModel = {
      userName: this.userName,
      address: this.userAddress,
      speicalLocation: this.speicalLocation,
      phoneNumber: this.phoneNumber,
      date: new Date().toISOString(),
      status: "قيد المعالجة",
      items: items
    };

    Swal.fire({
      title: 'تأكيد الطلب',
      html: `
        <p>هل أنت متأكد أنك تريد إرسال الطلب؟</p>
        <ul style="text-align: right; direction: rtl;">
          <li><b>الاسم:</b> ${this.userName}</li>
          <li><b>العنوان:</b> ${this.userAddress}</li>
          <li><b>رقم الهاتف:</b> ${this.phoneNumber}</li>
          <li><b>عدد المنتجات:</b> ${items.length}</li>
        </ul>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'إرسال',
      cancelButtonText: 'إلغاء'
    }).then(result => {
      if (result.isConfirmed) {
        this.cart2Service.createNewCart(orderModel).subscribe(
          res => {
            localStorage.setItem('userInfo', JSON.stringify({
              userName: this.userName,
              userAddress: this.userAddress,
              phoneNumber: this.phoneNumber,
              speicalLocation: this.speicalLocation
            }));

            if (this.nearbyPharmacies.length > 0) {
              Swal.fire({
                icon: 'success',
                title: 'تم إرسال الطلب بنجاح!',
                html: `
                  <p>وسيتم التواصل معك</p>
                  <p>شكرًا لطلبك 🎉</p>
                `,
                text: 'شكرًا لطلبك 🎉',
                confirmButtonText: 'تابع طلبك'
              }).then(() => {
                this.router.navigate(['/order_done']);
              });
              this.clearCart();
              this.success = true;
            } else {
              Swal.fire({
                icon: 'error',
                title: 'نأسف , لاتوجد صيدليات قريبه ',
                html: `
                  <p>وسيتم اخذ العنوان والتعامل مع صيدليات في منطقتك</p>
                `,
                text: 'شكرًا لطلبك ',
                confirmButtonText: 'الذهاب للصفحة الرئيسيه '
              }).then(() => {
                this.router.navigate(['/home']);
              });
            }
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'فشل في إرسال الطلب',
              text: 'حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.',
              confirmButtonText: 'موافق'
            });
            this.success = false;
            console.log(err);
          }
        );

        console.log("📦 الطلب المرسل:", orderModel);
      }
    });
  }

  clearCart() {
    this.cartProducts = [];
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  };

  getCartTotal() {
    this.total = 0;

    for (let x of this.cartProducts) {
      const price = Number(x.price);
      const amount = Number(x.amount);
      if (!isNaN(price) && !isNaN(amount)) {
        this.total += price * amount;
      }
    }
  }
}
