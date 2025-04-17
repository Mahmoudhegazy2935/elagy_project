import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service/auth.service';
import { NavebarComponent } from "../../../navebar/navebar.component";

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
    // confirmPassword?: FormControl<string>;
    pharmacyName: FormControl<string>;
    pharmacyPhone: FormControl<string>;
    workingHours: FormControl<string>;
    deliveryArea: FormControl<string>;
    managerName: FormControl<string>;
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
      // confirmPassword: this.fb.nonNullable.control('', Validators.required), // فقط للتحقق
    }, { validators: this.passwordMatchValidator });
    
  }
  passwordMatchValidator: ValidatorFn = (form: AbstractControl) => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
  get f() {
    return this.registrationForm.controls;
  }

  
  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';
  
    if (this.registrationForm.invalid) {
      return;
    }
  
    // const formValue = this.registrationForm.getRawValue(); // بيدي القيم زي ما هي
    // delete formValue.confirmPassword; // نحذف confirmPassword يدويًا
  
    this.authService.RegistrationAsPharmacy(FormData).subscribe({
      next: (response: string) => {
        console.log('Response as text:', response);
        this.successMessage = response || 'تم التسجيل بنجاح!';
        this.registrationForm.reset();
        this.submitted = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = error.error || 'فشل في التسجيل';
      }
    });
    
  }
  

  [x: string]: any;

  // قائمة المحافظات
  // governorates: string[] = ['القاهرة', 'الإسكندرية', 'الجيزة', 'الدقهلية', 'قنا'];
 
  // المتغير الذي سيحمل القيمة المختارة
  // selectedGovernorate: string = ''; // يتم تحديثه عندما يختار المستخدم محافظة
 
  // // رسالة تعرض المحافظة المختارة
  // get selectedGovernorateMessage(): string {
  //   return this.selectedGovernorate ? `المحافظة المختارة: ${this.selectedGovernorate}` : 'لم يتم اختيار محافظة';
  // }
 
  m: string[] = ['نجع حمادي', 'قنا', 'دشنا', 'اولاد عمرو', 'الوقف'];
 
  // المتغير الذي سيحمل القيمة المختارة
  selectedm: string = ''; // يتم تحديثه عندما يختار المستخدم محافظة
 
  // رسالة تعرض المحافظة المختارة
  get selectedmMessage(): string {
    return this.selectedm ? `المركز المختارة: ${this.selectedm}` : 'لم يتم اختيار مركز';
  }
 
 }
 
//   get isFormValid(): boolean {
//     return this.registrationForm.valid && this.registrationForm.value.password === this.registrationForm.value.confirmPassword;
//   }

//   onsubmit(): void {
//     if (!this.isFormValid) {
//       alert('Please check the form and make sure passwords match.');
//       return;
//     }

//     this.http.post('http://localhost:5208/RegistrationAsPharmacy', this.registrationForm.value).subscribe({
//       next: () => alert('Registration successful'),
//       error: (err) => {
//         console.error(err);
//         alert('Registration failed');
//       }
//     });
//   }
// }
// function isFormValid() {
//   throw new Error('Function not implemented.');
// }

