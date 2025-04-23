import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavebarAdminComponent } from "../../../../navebar-admin/navebar-admin/navebar-admin.component";
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service/auth.service';

@Component({
  selector: 'app-add-pharmacy',
  standalone: true,
  imports: [RouterModule, NavebarAdminComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './add-pharmacy.component.html',
  styleUrl: './add-pharmacy.component.css'
})
export class AddPharmacyComponent {


  submitted = false;
  successMessage = '';
  errorMessage = '';

  registerForm: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    governorate: FormControl<string>;
    center: FormControl<string>;
    location: FormControl<string>;
    email: FormControl<string>;
    phoneNumber: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;

  constructor(private fb: FormBuilder, private authService: AuthService ,private router: Router) {
    this.registerForm = this.fb.nonNullable.group({
      firstName: this.fb.nonNullable.control('', Validators.required),
      lastName: this.fb.nonNullable.control('', Validators.required),
      governorate: this.fb.nonNullable.control('', Validators.required),
      center: this.fb.nonNullable.control('', Validators.required),
      location: this.fb.nonNullable.control('', Validators.required),
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      phoneNumber: this.fb.nonNullable.control('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]),
      password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: this.fb.nonNullable.control('', Validators.required),
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (form: AbstractControl) => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
  // Custom validator to check if passwords match


  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      return;
    }

    this.authService.addpharmacy(this.registerForm.value).subscribe({
      next: (response) => {

        console.log('Response:', response);

        this.successMessage = response || 'Registration successful!';

        this.registerForm.reset();
        this.submitted = false;

        this.router.navigate(['/home']);

      },
      error: (error) => {
        this.errorMessage = error.error;
        console.error('Error:', error);
      }
    });
}



[x: string]: any;

 // قائمة المحافظات
 governorates: string[] = ['القاهرة', 'الإسكندرية', 'الجيزة', 'الدقهلية', 'قنا'];

 // المتغير الذي سيحمل القيمة المختارة
 selectedGovernorate: string = ''; // يتم تحديثه عندما يختار المستخدم محافظة

 // رسالة تعرض المحافظة المختارة
 get selectedGovernorateMessage(): string {
   return this.selectedGovernorate ? `المحافظة المختارة: ${this.selectedGovernorate}` : 'لم يتم اختيار محافظة';
 }

 m: string[] = ['نجع حمادي', 'قنا', 'دشنا', 'اولاد عمرو', 'الوقف'];

 // المتغير الذي سيحمل القيمة المختارة
 selectedm: string = ''; // يتم تحديثه عندما يختار المستخدم محافظة

 // رسالة تعرض المحافظة المختارة
 get selectedmMessage(): string {
   return this.selectedm ? `المركز المختارة: ${this.selectedm}` : 'لم يتم اختيار مركز';
 }

}
