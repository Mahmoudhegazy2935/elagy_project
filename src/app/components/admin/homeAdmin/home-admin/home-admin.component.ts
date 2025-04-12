import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavebarAdminComponent } from '../../../navebar-admin/navebar-admin/navebar-admin.component';
import { PharmacyAdminServicesService } from '../Pharmacy-admin/PharmacyAdminServices/pharmacy-admin-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-admin',
   standalone: true,
  imports: [NavebarAdminComponent,RouterModule,CommonModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {
    pharmacyCount: number = 0;
  
    constructor(private pharmacyAdminServicesService: PharmacyAdminServicesService) {}
  
    ngOnInit(): void {
      this.pharmacyAdminServicesService.getPharmacies().subscribe(pharmacies => {
        this.pharmacyCount = pharmacies.length;
      });
    }
  }


