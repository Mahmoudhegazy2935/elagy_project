import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavebarComponent } from "../../navebar/navebar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service/auth.service';
import { BrowserModule } from '@angular/platform-browser';

import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  [key: string]: any;
}
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, NavebarComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        const token = response; // 👈 response is just the token string


        localStorage.setItem('authToken', token);

        const decoded: any = jwtDecode(token);


        const nameArray = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        const role = Array.isArray(nameArray) ? nameArray[0] : 'unknown';
        localStorage.setItem('role', role);
        console.log('role:',role)

        // Redirect based on role
        switch (role.toLowerCase()) {
          case 'Pharmacy':
            this.router.navigate(['/cart']);
            break;
          case 'Admin':
            this.router.navigate(['/HomeAdminComponent']);
            break;
          default:
            this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        this.errorMessage = error.error;
        console.error('Login Error:', error);
      },
    });
  }





}
