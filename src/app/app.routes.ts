import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login_pages/user-login/login-page.component';
import { IntroPageComponent } from './components/intro-page/intro-page.component';
import { AdminLoginComponent } from './components/login_pages/admin-login/admin-login.component';
import { PharmacyLoginComponent } from './components/login_pages/pharmacy-login/pharmacy-login.component';
import { registerAppScopedDispatcher } from '@angular/core/primitives/event-dispatch';
import { RegisterPageComponent } from './components/register/register-page.component';
import { ForgotThePasswordComponent } from './components/login_pages/forgot_the_password/forgot-the-password/forgot-the-password.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProcessingCartComponent } from './components/processing_cart/processing-cart/processing-cart.component';

export const routes: Routes = [
  //admin:pages
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: UserLoginComponent, title: 'login' },
  // { path: 'aboutus', component: AboutUSComponent, title: 'aboutus' },
  // { path: 'contactus', component: ContactUSComponent, title: 'contactus' },
  // { path: '**', component: NotfoundComponent },

  //user:pages
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'',component: IntroPageComponent},
  {path:'home', component: HomeComponent},
  {path:'intro', component: IntroPageComponent},
  {path:'admin_login', component: AdminLoginComponent},
  {path:'pharmacy_login', component: PharmacyLoginComponent},
  { path: 'login', component: LoginPageComponent, title: 'login' },
  { path: 'register', component: RegisterPageComponent, title: 'register' },
  { path: 'forgot_the_password', component: ForgotThePasswordComponent, title: 'forgot_the_password' },
  { path: 'cart', component: CartComponent, title: 'cart' },
  {path:'ProcessingCart', component: ProcessingCartComponent, title: 'Processing Cart'}
];
