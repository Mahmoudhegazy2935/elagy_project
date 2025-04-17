

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PharmacyRegistrationComponent } from '../pharmacy-registration/pharmacy-registration.component';


@NgModule({
  declarations: [PharmacyRegistrationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [PharmacyRegistrationComponent]
})
export interface PharmacyRegistrationM {
}
