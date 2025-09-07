import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login_pages/user-login/login-page.component';
import { IntroPageComponent } from './components/intro-page/intro-page.component';
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
import { PharmacyAdminsregisterComponent } from './components/admin/homeAdmin/Pharmacy-admin/PharmacyAdmivComponents/pharmacy-adminsregister/pharmacy-adminsregister.component';
import { PharmaciesWithUsComponent } from './components/admin/homeAdmin/Pharmacies with us/pharmacies-with-us/pharmacies-with-us.component';
import { UpdateProductComponent } from './components/admin/homeAdmin/update_product/update-product/update-product.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { PharmacyGuard } from './guards/pharmacy.guard';
import { AdminGuard } from './guards/admin.guard';
import { NbComponent } from './components/cart_user/nb/nb.component';



export const routes: Routes = [

  // Public
  { path: '', component: IntroPageComponent },
  { path: 'intro', component: IntroPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'np', component: NbComponent },
  { path: 'forgot_the_password', component: ForgotThePasswordComponent, title: 'forgot_the_password' },
  { path: 'PharmacyRegistration', component: PharmacyRegistrationComponent, title: 'Pharmacy-Registration' },

  // User
  { path: 'home', component: HomeComponent,},
  { path: 'userhome/:id', component: SinglProductComponent,},
  { path: 'product/:name', component: SinglProductComponent,},
  { path: 'cart', component: CartComponent },
  { path: 'finsh_ordre', component: FinishOrderComponent, title: 'finsh_ordre' },
  { path: 'order_done', component: OrderDoneComponent,},
  { path: 'roshta', component: RoshtaComponent },

  // Pharmacy
  { path: 'pharmacy_home', component: PharmacyHomeComponent, canActivate: [PharmacyGuard] },
  { path: 'pharmacy_roshta', component: PharmacyRoshtaComponent, canActivate: [PharmacyGuard] },


  // Admin
  { path: 'HomeAdminComponent', component: HomeAdminComponent, canActivate: [AdminGuard], title: 'admin' },
  { path: 'PharmacyListComponent', component: PharmacyListComponent, canActivate: [AdminGuard], title: 'PharmacyList' },
  { path: 'UsirAdmin', component: UsirAdminComponentComponent, canActivate: [AdminGuard], title: 'usar admin' },
  { path: 'AddPharmacy', component: AddPharmacyComponent, canActivate: [AdminGuard] },
  { path: 'orders_admin', component: OrdersAdminComponent, canActivate: [AdminGuard] },
  { path: 'Addproduct', component: AddproductComponent, canActivate: [AdminGuard] },
  { path: 'PharmacyAdminsregister', component: PharmacyAdminsregisterComponent, canActivate: [AdminGuard] },
  { path: 'PharmaciesWithUsComponent', component: PharmaciesWithUsComponent, canActivate: [AdminGuard] },
  { path: 'UpdateProductComponent', component: UpdateProductComponent, canActivate: [AdminGuard] },

  // Error handling
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: NotFoundComponent }

];
