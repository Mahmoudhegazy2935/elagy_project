import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavebarComponent } from "../../navebar/navebar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';

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
        localStorage.setItem('authToken', response.token); // Store token
        this.router.navigate(['/home']); // Redirect to dashboard
      },
      error: (error) => {
        this.errorMessage = error.error;
        console.error('Login Error:', error);
      },
    });
  }

}
