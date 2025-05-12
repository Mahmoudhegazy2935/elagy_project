import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login_pages/user-login/login-page.component';
import { IntroPageComponent } from './components/intro-page/intro-page.component';
import { PharmacyLoginComponent } from './components/login_pages/pharmacy-login/pharmacy-login.component';
import { registerAppScopedDispatcher } from '@angular/core/primitives/event-dispatch';
import { RegisterPageComponent } from './components/register/register-page.component';
import { ForgotThePasswordComponent } from './components/login_pages/forgot_the_password/forgot-the-password/forgot-the-password.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart_user/cart/cart.component';


import { PharmacyListComponent } from './components/admin/homeAdmin/Pharmacy-admin/PharmacyAdmivComponents/pharmacy-list/pharmacy-list.component';
import { UsirAdminComponentComponent } from './components/admin/homeAdmin/usirAdmin/usirAdminComponent/usir-admin-component/usir-admin-component.component';


import { FinishOrderComponent } from './components/cart_user/finish-order/finish-order.component';
import { SinglProductComponent } from './components/singl-product/singl-product.component';
import { PharmacyRegistrationComponent } from './components/login_pages/pharmacy-registration/pharmacy-registration/pharmacy-registration.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { PharmacyHomeComponent } from './components/Pharmacy-pages/pharmacy-home/pharmacy-home.component';
import { AddPharmacyComponent } from './components/admin/homeAdmin/AddPharmacy/add-pharmacy/add-pharmacy.component';
import { OrderDoneComponent } from './components/cart_user/order-done/order-done.component';
import { OrdersAdminComponent } from './components/admin/homeAdmin/orders-admin/orders-admin.component';
import { RoshtaComponent } from './components/cart_user/roshta/roshta.component';
import { PharmacyRoshtaComponent } from './components/Pharmacy-pages/pharmacy-roshta/pharmacy-roshta.component';
import { AddproductComponent } from './components/admin/homeAdmin/AddProduct/addproduct/addproduct.component';


export const routes: Routes = [

  {path:'',component: IntroPageComponent},
  // {path:'',component: PharmacyHomeComponent},
  {path:'intro',component: IntroPageComponent},

  {path:'home', component: HomeComponent},
  { path: 'userhome/:id', component: SinglProductComponent },
  { path: 'product/:name', component: SinglProductComponent },
  {path:'pharmacy_login', component: PharmacyLoginComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'forgot_the_password', component: ForgotThePasswordComponent, title: 'forgot_the_password' },
  { path: 'cart', component: CartComponent },
  {path:'HomeAdminComponent', component: HomeAdminComponent, title: 'admin'},

  {path:'PharmacyListComponent',component:PharmacyListComponent,title:'PharmacyList'},
  {path:'UsirAdmin',component:UsirAdminComponentComponent,title:'usar admin'},

  {path:'finsh_ordre', component: FinishOrderComponent, title: 'finsh_ordre'},

  {path:'PharmacyRegistration',component:PharmacyRegistrationComponent,title:'Pharmacy-Registration'},
  {path:'AddPharmacy',component:AddPharmacyComponent},
  {path:'pharmacy_home',component:PharmacyHomeComponent},
  {path:'order_done',component:OrderDoneComponent},
  {path:'orders_admin',component:OrdersAdminComponent},
  {path:'roshta',component:RoshtaComponent},
  {path:'pharmacy_roshta',component:PharmacyRoshtaComponent},
  {path:'Addproduct',component:AddproductComponent},





];
