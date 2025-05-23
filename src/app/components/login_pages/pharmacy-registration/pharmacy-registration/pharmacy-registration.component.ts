import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service/auth.service';
import { NavebarComponent } from "../../../navebar/navebar.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pharmacy-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, NavebarComponent],
  templateUrl:'./pharmacy-registration.component.html',
  styleUrl: './pharmacy-registration.component.css'
})
export class PharmacyRegistrationComponent {

  // registrationForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';





  registrationForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    pharmacyName: FormControl<string>;
    pharmacyPhone: FormControl<string>;
    workingHours: FormControl<string>;
    deliveryArea: FormControl<string>;
    managerName: FormControl<string>;
    TradeLicense : FormControl<File | null>;
    TaxCard : FormControl<File | null>;
    PharmacyLicense : FormControl<File | null>;
    managerPhone: FormControl<string>;
  }>;


  constructor(private fb: FormBuilder, private authService: AuthService ,private router: Router) {
    this.registrationForm = this.fb.nonNullable.group({
      pharmacyName: this.fb.nonNullable.control('', Validators.required),
      pharmacyPhone: this.fb.nonNullable.control('', Validators.required),
      workingHours: this.fb.nonNullable.control('', Validators.required),
      deliveryArea: this.fb.nonNullable.control('', Validators.required),
      managerName: this.fb.nonNullable.control('', Validators.required),
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      managerPhone: this.fb.nonNullable.control('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]),
      password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
      TradeLicense : this.fb.control<File | null>(null, Validators.required) ,
      TaxCard: this.fb.control<File | null>(null, Validators.required) ,
      PharmacyLicense: this.fb.control<File | null>(null, Validators.required) ,
      // confirmPassword: removed
    });
  }
  // passwordMatchValidator: ValidatorFn = (form: AbstractControl) => {
  //   const password = form.get('password')?.value;
  //   const confirmPassword = form.get('confirmPassword')?.value;
  //   return password === confirmPassword ? null : { passwordMismatch: true };
  // };
  get f() {
    return this.registrationForm.controls;
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.registrationForm.patchValue({ [controlName]: file });
    }
  }

  // onSubmit() {
  //   console.log('Submit clicked');
  //   this.submitted = true;
  //   this.errorMessage = '';
  //   this.successMessage = '';

  //   if (this.registrationForm.invalid) {
  //     console.log('Form is invalid', this.registrationForm.errors);
  //     return;
  //   }

  //   const formValue = this.registrationForm.getRawValue(); // Get values as they are

  //   // Send the formValue directly, it matches the backend model structure
  //   this.authService.RegistrationAsPharmacy(formValue).subscribe({
  //     next: (response: any) => {
  //       console.log('Response :', response);
  //       this.successMessage = 'تم التسجيل بنجاح!';
  //       this.registrationForm.reset();
  //       this.submitted = false;
  //       // this.router.navigate(['/home']);
  //     },
  //     error: (error) => {
  //       console.error('Error:', error);
  //       this.errorMessage = error.error || 'فشل في التسجيل';
  //     }
  //   });
  // }
  onSubmit() {
      // اطبع القيم قبل الإرسال
    const formData = new FormData();
    Object.entries(this.registrationForm.value).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    console.log('Form Data:', formData); // اطبع الـ FormData بعد الإضافة
    this.authService.RegistrationAsPharmacy(formData).subscribe({
      next: (response: any) => {
        console.log('Response :', response);
        this.successMessage = 'تم التسجيل بنجاح!';
        this.registrationForm.reset();
        this.submitted = false;

        // عند النجاح، عرض التنبيه
        this.showAlert();
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = error.error || 'فشل في التسجيل';
      }
    });
  }



  [x: string]: any;



  m: string[] = ['نجع حمادي', 'قنا', 'دشنا', 'اولاد عمرو', 'الوقف'];


  // المتغير الذي سيحمل القيمة المختارة
  selectedm: string = ''; // يتم تحديثه عندما يختار المستخدم محافظة

  // رسالة تعرض المحافظة المختارة
  get selectedmMessage(): string {
    return this.selectedm ? `المركز المختارة: ${this.selectedm}` : 'لم يتم اختيار مركز';
  }


  showAlert() {
    Swal.fire({
      title: 'تم التسجيل',
      text: '     يتم مراجعة بيناتك من قبل المسؤول',
      icon: 'info',  // يمكن تغيير الأيقونة إلى "info" أو أي نوع آخر مثل "success"
      html: `
        <div>
          <i class="fa fa-spinner fa-spin" style="font-size: 50px;"></i>  <!-- ساعة رملية -->
        </div>
    <p>  يتم مراجعة بيناتك من قبل المسؤول وسيتم التواصم معكم</p>
        <p>شكراً لانضمامك ...</p>
      `,
      timerProgressBar: true,  // عرض شريط تقدم مع التوقيت
      confirmButtonText:"حسناً"
    }).then(() => {
      this.router.navigate(['/intro']);
    });
  }


 }

