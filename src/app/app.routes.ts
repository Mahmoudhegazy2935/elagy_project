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

import { HomeAdminComponent } from './components/admin/homeAdmin/home-admin/home-admin.component';

import { PharmacyListComponent } from './components/admin/homeAdmin/Pharmacy-admin/PharmacyAdmivComponents/pharmacy-list/pharmacy-list.component';
import { UsirAdminComponentComponent } from './components/admin/homeAdmin/usirAdmin/usirAdminComponent/usir-admin-component/usir-admin-component.component';


import { FinishOrderComponent } from './components/finish-order/finish-order.component';
import { SinglProductComponent } from './components/singl-product/singl-product.component';
import { PharmacyRegistrationComponent } from './components/login_pages/pharmacy-registration/pharmacy-registration/pharmacy-registration.component';


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
  {path:'intro',component: IntroPageComponent},

  {path:'home', component: HomeComponent},
  { path: 'userhome/:id', component: SinglProductComponent },
  { path: 'product/:name', component: SinglProductComponent },
  {path:'admin_login', component: AdminLoginComponent},
  {path:'pharmacy_login', component: PharmacyLoginComponent},
  { path: 'login', component: LoginPageComponent, title: 'login' },
  { path: 'register', component: RegisterPageComponent, title: 'register' },
  { path: 'forgot_the_password', component: ForgotThePasswordComponent, title: 'forgot_the_password' },
  { path: 'cart', component: CartComponent, title: 'cart' },
  {path:'HomeAdminComponent', component: HomeAdminComponent, title: 'Previous Operations'},

  {path:'PharmacyListComponent',component:PharmacyListComponent,title:'PharmacyList'},
  {path:'UsirAdmin',component:UsirAdminComponentComponent,title:'usar admin'},

  {path:'finsh_ordre', component: FinishOrderComponent, title: 'finsh_ordre'},

  {path:'PharmacyRegistration',component:PharmacyRegistrationComponent,title:'Pharmacy-Registration'}

];
